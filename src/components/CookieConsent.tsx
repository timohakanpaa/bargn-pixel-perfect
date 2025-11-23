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
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const savedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("bargn_cookie_consent", JSON.stringify(savedPreferences));
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
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          >
            <div className="max-w-4xl mx-auto bg-background border-2 border-primary rounded-3xl shadow-[0_0_40px_rgba(239,29,242,0.4)] overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 sm:p-8">
                {!showSettings ? (
                  <>
                    {/* Main View */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0">
                        <motion.div
                          animate={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                          className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-coral-purple rounded-2xl flex items-center justify-center shadow-glow-coral"
                        >
                          <Cookie className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
                        </motion.div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                          {t("cookieConsent.title")}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4">
                          {t("cookieConsent.description")}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground/80">
                          {t("cookieConsent.moreInfo")}{" "}
                          <a
                            href="/cookies"
                            className="text-primary hover:underline font-semibold"
                          >
                            {t("cookieConsent.learnMore")}
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="neon"
                        onClick={handleAcceptAll}
                        className="flex-1 rounded-full shadow-[0_0_20px_rgba(255,220,74,0.6)]"
                      >
                        {t("cookieConsent.acceptAll")}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleRejectAll}
                        className="flex-1 rounded-full border-2 hover:border-primary hover:bg-primary/10"
                      >
                        {t("cookieConsent.rejectAll")}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setShowSettings(true)}
                        className="flex-1 rounded-full hover:bg-glass"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        {t("cookieConsent.customize")}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Settings View */}
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                      {t("cookieConsent.settingsTitle")}
                    </h3>

                    <div className="space-y-6 mb-6">
                      {/* Essential Cookies */}
                      <div className="flex items-start justify-between gap-4 p-4 bg-glass rounded-xl border border-glass">
                        <div className="flex-1">
                          <Label className="text-base font-semibold text-foreground mb-1 block">
                            {t("cookieConsent.essential.title")}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t("cookieConsent.essential.description")}
                          </p>
                        </div>
                        <Switch
                          checked={preferences.essential}
                          disabled
                          className="opacity-50 cursor-not-allowed"
                        />
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-start justify-between gap-4 p-4 bg-glass rounded-xl border border-glass">
                        <div className="flex-1">
                          <Label className="text-base font-semibold text-foreground mb-1 block">
                            {t("cookieConsent.analytics.title")}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t("cookieConsent.analytics.description")}
                          </p>
                        </div>
                        <Switch
                          checked={preferences.analytics}
                          onCheckedChange={(checked) =>
                            setPreferences({ ...preferences, analytics: checked })
                          }
                        />
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-start justify-between gap-4 p-4 bg-glass rounded-xl border border-glass">
                        <div className="flex-1">
                          <Label className="text-base font-semibold text-foreground mb-1 block">
                            {t("cookieConsent.marketing.title")}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t("cookieConsent.marketing.description")}
                          </p>
                        </div>
                        <Switch
                          checked={preferences.marketing}
                          onCheckedChange={(checked) =>
                            setPreferences({ ...preferences, marketing: checked })
                          }
                        />
                      </div>
                    </div>

                    {/* Settings Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="neon"
                        onClick={handleSavePreferences}
                        className="flex-1 rounded-full shadow-[0_0_20px_rgba(255,220,74,0.6)]"
                      >
                        {t("cookieConsent.savePreferences")}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setShowSettings(false)}
                        className="flex-1 rounded-full hover:bg-glass"
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
