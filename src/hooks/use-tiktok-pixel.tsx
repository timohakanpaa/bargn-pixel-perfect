import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Replace with your actual TikTok Pixel ID
const TIKTOK_PIXEL_ID = "YOUR_TIKTOK_PIXEL_ID";

// Declare ttq function for TypeScript
declare global {
  interface Window {
    ttq?: any;
    TiktokAnalyticsObject?: string;
  }
}

export const useTikTokPixel = (hasMarketingConsent: boolean) => {
  const location = useLocation();

  useEffect(() => {
    if (!hasMarketingConsent) {
      // Remove TikTok Pixel scripts if consent is revoked
      const scripts = document.querySelectorAll(
        `script[src*="analytics.tiktok.com"]`
      );
      scripts.forEach((script) => script.remove());
      
      // Clear ttq
      delete window.ttq;
      delete window.TiktokAnalyticsObject;
      
      return;
    }

    // Load TikTok Pixel only if consent given
    if (!window.ttq && TIKTOK_PIXEL_ID !== "YOUR_TIKTOK_PIXEL_ID") {
      // Initialize TikTok Pixel
      const ttq: any = function() {
        if ((ttq as any).methods) {
          (ttq as any).methods.apply(ttq, arguments);
        } else {
          (ttq as any).queue.push(arguments);
        }
      };
      
      ttq.methods = [
        "page",
        "track",
        "identify",
        "instances",
        "debug",
        "on",
        "off",
        "once",
        "ready",
        "alias",
        "group",
        "enableCookie",
        "disableCookie",
      ];
      
      ttq.setAndDefer = function(instance: any, method: string) {
        instance[method] = function() {
          instance.push([method].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      
      for (let i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
      }
      
      ttq.instance = function(pixelId: string) {
        const instance = ttq._i[pixelId] || [];
        for (let j = 0; j < ttq.methods.length; j++) {
          ttq.setAndDefer(instance, ttq.methods[j]);
        }
        return instance;
      };
      
      ttq.load = function(pixelId: string, options?: any) {
        const scriptId = "tiktok-pixel";
        const existingScript = document.getElementById(scriptId);
        
        if (!existingScript) {
          const script = document.createElement("script");
          script.id = scriptId;
          script.type = "text/javascript";
          script.async = true;
          script.src = "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + pixelId + "&lib=ttq";
          
          const firstScript = document.getElementsByTagName("script")[0];
          firstScript.parentNode?.insertBefore(script, firstScript);
        }
      };
      
      ttq._i = ttq._i || {};
      ttq._i[TIKTOK_PIXEL_ID] = [];
      ttq._u = "https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._o = ttq._o || {};
      ttq.queue = ttq.queue || [];
      
      window.ttq = ttq as any;
      window.TiktokAnalyticsObject = "ttq";

      // Load and initialize
      window.ttq.load(TIKTOK_PIXEL_ID);
      window.ttq.page();

      console.log("TikTok Pixel loaded with consent");
    }
  }, [hasMarketingConsent]);

  // Track page views
  useEffect(() => {
    if (hasMarketingConsent && window.ttq && TIKTOK_PIXEL_ID !== "YOUR_TIKTOK_PIXEL_ID") {
      window.ttq.page();
      console.log("TikTok Pixel Pageview tracked:", location.pathname);
    }
  }, [location, hasMarketingConsent]);
};

// Helper function to track custom TikTok events
export const trackTikTokEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (window.ttq) {
    window.ttq.track(eventName, eventParams);
    console.log("TikTok Pixel Event tracked:", eventName, eventParams);
  }
};
