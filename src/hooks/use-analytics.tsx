import { useEffect, useRef, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

// Session ID stored in sessionStorage to persist across page reloads
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
};

// Event batching and deduplication
interface QueuedEvent {
  type: 'analytics' | 'funnel';
  data: any;
  timestamp: number;
  dedupeKey: string;
}

const eventQueue: QueuedEvent[] = [];
const processedEvents = new Set<string>();
let batchTimeout: ReturnType<typeof setTimeout> | null = null;

const BATCH_DELAY = 300; // ms - wait before sending batch
const DEDUPE_WINDOW = 5000; // ms - time window to prevent duplicates

// Process queued events in batch
const processBatch = async () => {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue.length = 0; // Clear queue

  // Group events by type
  const analyticEvents = eventsToSend.filter(e => e.type === 'analytics').map(e => e.data);
  const funnelEvents = eventsToSend.filter(e => e.type === 'funnel').map(e => e.data);

  // Send batched inserts
  try {
    const promises = [];
    if (analyticEvents.length > 0) {
      promises.push(supabase.from("analytics_events").insert(analyticEvents));
    }
    if (funnelEvents.length > 0) {
      promises.push(supabase.from("funnel_progress").insert(funnelEvents));
    }
    await Promise.all(promises);
  } catch (error) {
    console.error("Batch analytics error:", error);
  }

  // Clean up old dedupe entries
  const now = Date.now();
  Array.from(processedEvents).forEach(key => {
    const [timestamp] = key.split(':');
    if (now - parseInt(timestamp) > DEDUPE_WINDOW) {
      processedEvents.delete(key);
    }
  });
};

// Queue an event for batched sending
const queueEvent = (type: 'analytics' | 'funnel', data: any, dedupeKey: string) => {
  const now = Date.now();
  const fullDedupeKey = `${now}:${dedupeKey}`;

  // Check for duplicate within time window
  const isDuplicate = Array.from(processedEvents).some(key => {
    const [timestamp, existingKey] = key.split(':');
    const timeDiff = now - parseInt(timestamp);
    return timeDiff < DEDUPE_WINDOW && existingKey === dedupeKey;
  });

  if (isDuplicate) {
    console.debug('Duplicate event prevented:', dedupeKey);
    return;
  }

  // Add to queue and dedupe set
  eventQueue.push({ type, data, timestamp: now, dedupeKey });
  processedEvents.add(fullDedupeKey);

  // Schedule batch processing
  if (batchTimeout) clearTimeout(batchTimeout);
  batchTimeout = setTimeout(processBatch, BATCH_DELAY);
};

interface AnalyticsEvent {
  event_type: string;
  event_name: string;
  page_path?: string;
  page_title?: string;
  element_id?: string;
  element_text?: string;
  element_class?: string;
  metadata?: Record<string, any>;
}

interface FunnelStep {
  step_number: number;
  step_name: string;
  page_path?: string;
  event_type: string;
  event_name?: string;
}

interface ConversionFunnel {
  id: string;
  name: string;
  steps: FunnelStep[];
}

export const useAnalytics = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const sessionId = useRef(getSessionId());
  const [activeFunnels, setActiveFunnels] = useState<ConversionFunnel[]>([]);
  const lastTrackedPath = useRef<string>('');

  // Load active funnels on mount
  useEffect(() => {
    const loadFunnels = async () => {
      const { data, error } = await supabase
        .from("conversion_funnels")
        .select("*")
        .eq("is_active", true);
      
      if (!error && data) {
        setActiveFunnels(data as unknown as ConversionFunnel[]);
      }
    };
    loadFunnels();
  }, []);

  // Track funnel progress automatically
  const trackFunnelProgress = useCallback(async (
    eventType: string,
    eventName?: string,
    pagePath?: string
  ) => {
    if (activeFunnels.length === 0) return;

    const currentPath = pagePath || location.pathname;

    for (const funnel of activeFunnels) {
      // Find matching step
      const matchingStep = (funnel.steps as FunnelStep[]).find(step => {
        const pathMatches = step.page_path === currentPath;
        const eventTypeMatches = step.event_type === eventType;
        const eventNameMatches = !step.event_name || step.event_name === eventName;
        
        return pathMatches && eventTypeMatches && eventNameMatches;
      });

      if (matchingStep) {
        // Check if this is a new step or progression
        const { data: existingProgress } = await supabase
          .from("funnel_progress")
          .select("*")
          .eq("session_id", sessionId.current)
          .eq("funnel_id", funnel.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        const isNewStep = !existingProgress || existingProgress.current_step < matchingStep.step_number;
        const isCompleted = matchingStep.step_number === funnel.steps.length;

        if (isNewStep) {
          const funnelData = {
            session_id: sessionId.current,
            funnel_id: funnel.id,
            current_step: matchingStep.step_number,
            completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
          };
          
          // Use batching with deduplication
          const dedupeKey = `funnel_${funnel.id}_${matchingStep.step_number}_${sessionId.current}`;
          queueEvent("funnel", funnelData, dedupeKey);
        }
      }
    }
  }, [activeFunnels, location.pathname]);

  // Enhanced trackPageView with funnel tracking
  const trackPageView = useCallback(async (pagePath?: string, pageTitle?: string) => {
    const path = pagePath || location.pathname;
    
    // Prevent duplicate page view tracking for same path
    if (lastTrackedPath.current === path) {
      return;
    }
    lastTrackedPath.current = path;
    
    try {
      const eventData = {
        session_id: sessionId.current,
        event_type: "page_view",
        event_name: `page_view_${path}`,
        page_path: path,
        page_title: pageTitle || document.title,
        user_agent: navigator.userAgent,
        language,
        referrer: document.referrer || null,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
      };

      // Use batching with deduplication
      const dedupeKey = `pageview_${path}_${sessionId.current}`;
      queueEvent("analytics", eventData, dedupeKey);

      // Track funnel progress (also uses batching)
      await trackFunnelProgress("page_view", undefined, path);
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }, [language, trackFunnelProgress]);

  // Enhanced trackButtonClick with funnel tracking
  const trackButtonClick = useCallback(async (
    buttonName: string,
    buttonText?: string,
    metadata?: Record<string, any>
  ) => {
    try {
      const eventData = {
        session_id: sessionId.current,
        event_type: "button_click",
        event_name: buttonName,
        page_path: location.pathname,
        page_title: document.title,
        element_text: buttonText,
        user_agent: navigator.userAgent,
        language,
        metadata: metadata || {},
      };

      // Use batching with deduplication
      const dedupeKey = `click_${buttonName}_${Date.now()}`;
      queueEvent("analytics", eventData, dedupeKey);

      // Track funnel progress
      await trackFunnelProgress("button_click", buttonName);
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }, [location.pathname, language, trackFunnelProgress]);

  // Track custom event with funnel tracking
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const eventData = {
        session_id: sessionId.current,
        page_path: location.pathname,
        page_title: document.title,
        user_agent: navigator.userAgent,
        language,
        ...event,
      };

      // Use batching with deduplication
      const dedupeKey = `event_${event.event_type}_${event.event_name}_${Date.now()}`;
      queueEvent("analytics", eventData, dedupeKey);

      // Track funnel progress
      await trackFunnelProgress(event.event_type, event.event_name);
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }, [location.pathname, language, trackFunnelProgress]);

  // Track form submission
  const trackFormSubmit = useCallback(async (
    formName: string,
    metadata?: Record<string, any>
  ) => {
    try {
      const eventData = {
        session_id: sessionId.current,
        event_type: "form_submit",
        event_name: formName,
        page_path: location.pathname,
        page_title: document.title,
        user_agent: navigator.userAgent,
        language,
        metadata: metadata || {},
      };

      // Use batching with deduplication
      const dedupeKey = `form_${formName}_${Date.now()}`;
      queueEvent("analytics", eventData, dedupeKey);
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }, [location.pathname, language]);

  // Track navigation
  const trackNavigation = useCallback(async (
    destination: string,
    linkText?: string
  ) => {
    try {
      const eventData = {
        session_id: sessionId.current,
        event_type: "navigation",
        event_name: `navigate_to_${destination}`,
        page_path: location.pathname,
        page_title: document.title,
        element_text: linkText,
        user_agent: navigator.userAgent,
        language,
        metadata: { destination },
      };

      // Use batching with deduplication
      const dedupeKey = `nav_${destination}_${Date.now()}`;
      queueEvent("analytics", eventData, dedupeKey);
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }, [location.pathname, language]);

  // Auto-track page views on route change
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return {
    trackPageView,
    trackButtonClick,
    trackEvent,
    trackFormSubmit,
    trackNavigation,
    trackFunnelProgress,
    sessionId: sessionId.current,
  };
};

// HOC to wrap buttons with analytics
export const withAnalytics = <P extends object>(
  Component: React.ComponentType<P>,
  eventName: string
) => {
  return (props: P & { onClick?: () => void; children?: React.ReactNode }) => {
    const { trackButtonClick } = useAnalytics();
    
    const handleClick = () => {
      const buttonText = typeof props.children === 'string' ? props.children : eventName;
      trackButtonClick(eventName, buttonText);
      props.onClick?.();
    };

    return <Component {...props} onClick={handleClick} />;
  };
};
