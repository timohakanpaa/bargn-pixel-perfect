// Centralized tracking utility for all marketing pixels and analytics

import { trackEvent as trackGAEvent } from "@/hooks/use-google-analytics";
import { trackFacebookEvent } from "@/hooks/use-facebook-pixel";
import { trackTikTokEvent } from "@/hooks/use-tiktok-pixel";

/**
 * Track an event across all enabled tracking platforms
 * Only fires on platforms where user has given consent
 */
export const trackAllPlatforms = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  // Google Analytics
  trackGAEvent(eventName, eventParams);
  
  // Facebook Pixel - map to standard Facebook events if possible
  const fbEventMap: Record<string, string> = {
    "button_click": "Lead",
    "form_submit": "SubmitApplication",
    "purchase": "Purchase",
    "add_to_cart": "AddToCart",
    "sign_up": "CompleteRegistration",
    "page_view": "PageView",
  };
  
  const fbEventName = fbEventMap[eventName] || eventName;
  trackFacebookEvent(fbEventName, eventParams);
  
  // TikTok Pixel - map to standard TikTok events if possible
  const ttEventMap: Record<string, string> = {
    "button_click": "ClickButton",
    "form_submit": "SubmitForm",
    "purchase": "CompletePayment",
    "add_to_cart": "AddToCart",
    "sign_up": "CompleteRegistration",
    "page_view": "ViewContent",
  };
  
  const ttEventName = ttEventMap[eventName] || eventName;
  trackTikTokEvent(ttEventName, eventParams);
};

/**
 * Track common e-commerce events
 */
export const trackPurchase = (value: number, currency = "EUR") => {
  trackAllPlatforms("purchase", { value, currency });
};

export const trackSignUp = (method?: string) => {
  trackAllPlatforms("sign_up", { method });
};

export const trackAddToCart = (itemName: string, value: number) => {
  trackAllPlatforms("add_to_cart", { item_name: itemName, value });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackAllPlatforms("button_click", { button_name: buttonName, location });
};
