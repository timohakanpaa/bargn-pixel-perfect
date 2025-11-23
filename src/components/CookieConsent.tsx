import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("bargn_cookie_consent");
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("bargn_cookie_consent", JSON.stringify(allAccepted));
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("bargn_cookie_consent", JSON.stringify(onlyEssential));
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const savedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("bargn_cookie_consent", JSON.stringify(savedPreferences));
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    setIsVisible(false);
  };

  const handleClose = () => {
    // Close without saving = reject all except essential
    handleRejectAll();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={handleClose}
          />

          {/* Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-auto md:right-6 md:w-[480px] z-[9999]"
          >
            <div className="bg-background border-2 border-primary rounded-2xl shadow-[0_0_30px_rgba(239,29,242,0.4)] overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-4 sm:p-5">
                {!showSettings ? (
                  <>
                    {/* Main View */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0">
                        <motion.div
                          animate={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                          className="w-10 h-10 bg-gradient-coral-purple rounded-xl flex items-center justify-center shadow-glow-coral"
                        >
                          <Cookie className="w-5 h-5 text-foreground" />
                        </motion.div>
                      </div>
                      
                      <div className="flex-1 pr-6">
                        <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                          {t("cookieConsent.title")}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                          {t("cookieConsent.description")}
                        </p>
                        <p className="text-xs text-muted-foreground/80">
                          {t("cookieConsent.moreInfo")}{" "}
                          <a
                            href="/cookies"
                            className="text-primary hover:underline font-semibold"
                            onClick={() => setIsVisible(false)}
                          >
                            {t("cookieConsent.learnMore")}
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="neon"
                        onClick={handleAcceptAll}
                        size="sm"
                        className="w-full rounded-full shadow-[0_0_15px_rgba(255,220,74,0.6)] text-sm"
                      >
                        {t("cookieConsent.acceptAll")}
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={handleRejectAll}
                          size="sm"
                          className="flex-1 rounded-full border hover:border-primary hover:bg-primary/10 text-xs"
                        >
                          {t("cookieConsent.rejectAll")}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setShowSettings(true)}
                          size="sm"
                          className="flex-1 rounded-full hover:bg-glass text-xs"
                        >
                          <Settings className="w-3 h-3 mr-1" />
                          {t("cookieConsent.customize")}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Settings View */}
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 pr-6">
                      {t("cookieConsent.settingsTitle")}
                    </h3>

                    <div className="space-y-3 mb-4 max-h-[50vh] overflow-y-auto">
                      {/* Essential Cookies */}
                      <div className="flex items-start justify-between gap-3 p-3 bg-glass rounded-lg border border-glass">
                        <div className="flex-1">
                          <Label className="text-sm font-semibold text-foreground mb-0.5 block">
                            {t("cookieConsent.essential.title")}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {t("cookieConsent.essential.description")}
                          </p>
                        </div>
                        <Switch
                          checked={preferences.essential}
                          disabled
                          className="opacity-50 cursor-not-allowed flex-shrink-0"
                        />
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-start justify-between gap-3 p-3 bg-glass rounded-lg border border-glass">
                        <div className="flex-1">
                          <Label className="text-sm font-semibold text-foreground mb-0.5 block">
                            {t("cookieConsent.analytics.title")}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {t("cookieConsent.analytics.description")}
                          </p>
                        </div>
                        <Switch
                          checked={preferences.analytics}
                          onCheckedChange={(checked) =>
                            setPreferences({ ...preferences, analytics: checked })
                          }
                          className="flex-shrink-0"
                        />
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-start justify-between gap-3 p-3 bg-glass rounded-lg border border-glass">
                        <div className="flex-1">
                          <Label className="text-sm font-semibold text-foreground mb-0.5 block">
                            {t("cookieConsent.marketing.title")}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {t("cookieConsent.marketing.description")}
                          </p>
                        </div>
                        <Switch
                          checked={preferences.marketing}
                          onCheckedChange={(checked) =>
                            setPreferences({ ...preferences, marketing: checked })
                          }
                          className="flex-shrink-0"
                        />
                      </div>
                    </div>

                    {/* Settings Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="neon"
                        onClick={handleSavePreferences}
                        size="sm"
                        className="flex-1 rounded-full shadow-[0_0_15px_rgba(255,220,74,0.6)] text-sm"
                      >
                        {t("cookieConsent.savePreferences")}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setShowSettings(false)}
                        size="sm"
                        className="flex-1 rounded-full hover:bg-glass text-sm"
                      >
                        {t("cookieConsent.back")}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
