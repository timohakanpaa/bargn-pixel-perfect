import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Replace with your actual Facebook Pixel ID
const FB_PIXEL_ID = "YOUR_FACEBOOK_PIXEL_ID";

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export const useFacebookPixel = (hasMarketingConsent: boolean) => {
  const location = useLocation();

  useEffect(() => {
    if (!hasMarketingConsent) {
      // Remove Facebook Pixel scripts if consent is revoked
      const scripts = document.querySelectorAll(
        `script[src*="connect.facebook.net"]`
      );
      scripts.forEach((script) => script.remove());
      
      // Clear fbq
      delete window.fbq;
      delete window._fbq;
      
      return;
    }

    // Load Facebook Pixel only if consent given
    if (!window.fbq && FB_PIXEL_ID !== "YOUR_FACEBOOK_PIXEL_ID") {
      // Initialize fbq
      const fbq: any = function() {
        if (fbq.callMethod) {
          fbq.callMethod.apply(fbq, arguments);
        } else {
          fbq.queue.push(arguments);
        }
      };
      
      if (!window.fbq) window.fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];

      // Load Facebook Pixel script
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      // Initialize pixel
      window.fbq("init", FB_PIXEL_ID);
      window.fbq("track", "PageView");

      console.log("Facebook Pixel loaded with consent");
    }
  }, [hasMarketingConsent]);

  // Track page views
  useEffect(() => {
    if (hasMarketingConsent && window.fbq && FB_PIXEL_ID !== "YOUR_FACEBOOK_PIXEL_ID") {
      window.fbq("track", "PageView");
      console.log("FB Pixel Pageview tracked:", location.pathname);
    }
  }, [location, hasMarketingConsent]);
};

// Helper function to track custom Facebook events
export const trackFacebookEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (window.fbq) {
    window.fbq("track", eventName, eventParams);
    console.log("FB Pixel Event tracked:", eventName, eventParams);
  }
};
