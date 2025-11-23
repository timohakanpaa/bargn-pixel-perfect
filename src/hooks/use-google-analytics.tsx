import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_TRACKING_ID = "G-1LX5LZXTXF";

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

export const useGoogleAnalytics = (hasAnalyticsConsent: boolean) => {
  const location = useLocation();

  useEffect(() => {
    if (!hasAnalyticsConsent) {
      // Remove GA scripts if consent is revoked
      const scripts = document.querySelectorAll(
        `script[src*="googletagmanager.com/gtag"]`
      );
      scripts.forEach((script) => script.remove());
      
      // Clear dataLayer
      if (window.dataLayer) {
        window.dataLayer = [];
      }
      delete window.gtag;
      
      return;
    }

    // Load Google Analytics script only if consent given
    if (!window.gtag) {
      // Create gtag script
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script1);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer?.push(arguments);
      };
      window.gtag("js", new Date().toISOString());
      window.gtag("config", GA_TRACKING_ID, {
        anonymize_ip: true, // GDPR compliance
        cookie_flags: "SameSite=None;Secure",
      });

      console.log("Google Analytics loaded with consent");
    }
  }, [hasAnalyticsConsent]);

  // Track page views
  useEffect(() => {
    if (hasAnalyticsConsent && window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
      console.log("GA Pageview tracked:", location.pathname);
    }
  }, [location, hasAnalyticsConsent]);
};

// Helper function to track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
    console.log("GA Event tracked:", eventName, eventParams);
  }
};
