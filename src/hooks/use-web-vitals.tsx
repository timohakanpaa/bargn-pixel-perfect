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

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  timestamp: number;
}

// Store metrics in localStorage for dashboard
const storeMetric = (metric: Metric) => {
  try {
    const stored = localStorage.getItem('web-vitals-history');
    const history: WebVitalsMetric[] = stored ? JSON.parse(stored) : [];
    
    history.push({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      timestamp: Date.now(),
    });
    
    // Keep only last 100 entries
    const trimmed = history.slice(-100);
    localStorage.setItem('web-vitals-history', JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to store web vitals:', error);
  }
};

const sendToAnalytics = (metric: Metric) => {
  // Store metric for dashboard
  storeMetric(metric);
  
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('📊 Core Web Vitals:', {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
      delta: Math.round(metric.delta),
      id: metric.id,
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

  // Send to custom analytics endpoint if needed
  // You can uncomment and modify this to send to your own backend
  /*
  try {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });
    
    // Use sendBeacon if available (doesn't block page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/web-vitals', body);
    } else {
      fetch('/api/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      });
    }
  } catch (error) {
    console.error('Failed to send web vitals:', error);
  }
  */
};

export const useWebVitals = () => {
  useEffect(() => {
    // Track all Core Web Vitals
    onCLS(sendToAnalytics);  // Cumulative Layout Shift
    onINP(sendToAnalytics);  // Interaction to Next Paint (replaces FID)
    onFCP(sendToAnalytics);  // First Contentful Paint
    onLCP(sendToAnalytics);  // Largest Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte
  }, []);
};
