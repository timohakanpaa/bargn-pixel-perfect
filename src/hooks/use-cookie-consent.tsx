import { useEffect, useState } from "react";

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
}

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    // Check for existing consent
    const checkConsent = () => {
      const stored = localStorage.getItem("bargn_cookie_consent");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setConsent(parsed);
        } catch (e) {
          console.error("Failed to parse cookie consent:", e);
        }
      }
    };

    // Initial check
    checkConsent();

    // Listen for storage changes (when consent is updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "bargn_cookie_consent") {
        checkConsent();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom event (same tab updates)
    const handleConsentUpdate = () => {
      checkConsent();
    };

    window.addEventListener("cookieConsentUpdated", handleConsentUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cookieConsentUpdated", handleConsentUpdate);
    };
  }, []);

  return consent;
};
