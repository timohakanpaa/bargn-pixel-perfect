import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

// Get or create a persistent session ID for web vitals
const getSessionId = (): string => {
  const key = 'web-vitals-session-id';
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
};

// Batch metrics and send to backend
const metricsBuffer: Metric[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

const flushMetrics = async () => {
  if (metricsBuffer.length === 0) return;
  const batch = metricsBuffer.splice(0, metricsBuffer.length);

  const sessionId = getSessionId();
  const payload = {
    session_id: sessionId,
    metrics: batch.map(m => ({
      name: m.name,
      value: m.value,
      rating: m.rating,
      delta: m.delta,
      id: m.id,
      page_path: window.location.pathname,
      screen_width: window.screen?.width || null,
      connection_type: (navigator as any).connection?.effectiveType || null,
    })),
  };

  try {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-analytics`;
    const body = JSON.stringify({ webVitals: payload });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      });
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to send web vitals:', error);
    }
  }
};

const sendToAnalytics = (metric: Metric) => {
  metricsBuffer.push(metric);

  // Debounce: flush after 2s of inactivity
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flushMetrics, 2000);

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('📊 Core Web Vitals:', {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  }

  // Send to Google Analytics if available
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
    });
  }
};

export const useWebVitals = () => {
  useEffect(() => {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    // Flush on page unload
    const handleUnload = () => flushMetrics();
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushMetrics();
    });
    window.addEventListener('pagehide', handleUnload);

    return () => {
      window.removeEventListener('pagehide', handleUnload);
      if (flushTimer) clearTimeout(flushTimer);
      flushMetrics();
    };
  }, []);
};
