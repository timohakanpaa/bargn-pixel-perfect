import { useEffect, useRef, useCallback } from "react";
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

export const useAnalytics = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const sessionId = useRef(getSessionId());

  // Track page view
  const trackPageView = useCallback(async (pagePath?: string, pageTitle?: string) => {
    try {
      await supabase.from("analytics_events").insert({
        session_id: sessionId.current,
        event_type: "page_view",
        event_name: `page_view_${pagePath || location.pathname}`,
        page_path: pagePath || location.pathname,
        page_title: pageTitle || document.title,
        user_agent: navigator.userAgent,
        language,
        referrer: document.referrer || null,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
      });
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }, [location.pathname, language]);

  // Track button click
  const trackButtonClick = useCallback(async (
    buttonName: string,
    buttonText?: string,
    metadata?: Record<string, any>
  ) => {
    try {
      await supabase.from("analytics_events").insert({
        session_id: sessionId.current,
        event_type: "button_click",
        event_name: buttonName,
        page_path: location.pathname,
        page_title: document.title,
        element_text: buttonText,
        user_agent: navigator.userAgent,
        language,
        metadata: metadata || {},
      });
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }, [location.pathname, language]);

  // Track custom event
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      await supabase.from("analytics_events").insert({
        session_id: sessionId.current,
        page_path: location.pathname,
        page_title: document.title,
        user_agent: navigator.userAgent,
        language,
        ...event,
      });
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }, [location.pathname, language]);

  // Track form submission
  const trackFormSubmit = useCallback(async (
    formName: string,
    metadata?: Record<string, any>
  ) => {
    try {
      await supabase.from("analytics_events").insert({
        session_id: sessionId.current,
        event_type: "form_submit",
        event_name: formName,
        page_path: location.pathname,
        page_title: document.title,
        user_agent: navigator.userAgent,
        language,
        metadata: metadata || {},
      });
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
      await supabase.from("analytics_events").insert({
        session_id: sessionId.current,
        event_type: "navigation",
        event_name: `navigate_to_${destination}`,
        page_path: location.pathname,
        page_title: document.title,
        element_text: linkText,
        user_agent: navigator.userAgent,
        language,
        metadata: { destination },
      });
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
