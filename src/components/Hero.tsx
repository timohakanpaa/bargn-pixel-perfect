import { Button } from "@/components/ui/button";
import { Zap, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useAnalytics } from "@/hooks/use-analytics";
import AppStoreBadges from "@/components/AppStoreBadges";
import { trackAllPlatforms } from "@/utils/tracking";
import { useAuth } from "@/hooks/use-auth";
import heroMockup from "@/assets/bargn-hero-mockup.png";

const Hero = () => {
  const { t } = useLanguage();
  const { trackButtonClick } = useAnalytics();
  const { isAdmin } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-4">
      {/* Giant Blurry Gradient Blob */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-coral-purple opacity-30 blur-[120px] rounded-full"
        style={{
          boxShadow: "0 0 120px 50px rgba(239,29,242,0.5)"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 animate-fade-in">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-glass backdrop-blur-xl rounded-full border-2 border-glass shadow-glow-yellow">
              <span className="text-accent font-bold mr-2 text-sm sm:text-base">✨</span>
              <span className="text-accent font-bold text-xs sm:text-base">{t("aiThatSlaps")}</span>
              <span className="text-accent ml-2 text-sm sm:text-base">✨</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-coral-purple bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(248,129,112,0.5)]">
                {t("heroHeadline")}
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              {t("heroSubhead")}
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-12">
              {t("heroText")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-8 lg:mb-0">
              <Button 
                asChild
                variant="neon"
                className="w-full sm:w-auto rounded-full px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl shadow-[0_0_25px_rgba(255,220,74,0.7)] hover:shadow-[0_0_40px_rgba(255,220,74,1)]"
              >
                <a
                  href="https://buy.stripe.com/fZu9AT5Oobc1fY65Lu3ZK04"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackButtonClick("hero_lets_go_cta", t("letsGo"));
                    trackAllPlatforms("button_click", {
                      button_name: "hero_lets_go",
                      conversion_type: "membership_signup_intent",
                      location: "hero_section"
                    });
                  }}
                >
                  <Zap className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                  {t("letsGo")}
                </a>
              </Button>
              <Button 
                asChild
                variant="secondary"
                className="w-full sm:w-auto rounded-full px-4 sm:px-10 py-2.5 sm:py-7 text-xs sm:text-xl"
              >
                <a
                  href="/partners"
                  onClick={() => {
                    trackButtonClick("hero_partner_up_cta", t("partnerUp"));
                    trackAllPlatforms("button_click", {
                      button_name: "hero_partner_up",
                      conversion_type: "partner_signup_intent",
                      location: "hero_section"
                    });
                  }}
                >
                  <Users className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-6 sm:h-6" />
                  <span className="sm:hidden">{t("partnerUpShort")}</span>
                  <span className="hidden sm:inline">{t("partnerUp")}</span>
                </a>
              </Button>
            </div>

            {/* App Store Badges - Admin Only */}
            {isAdmin && (
              <div className="mt-6">
                <AppStoreBadges />
              </div>
            )}
          </div>

          {/* Right side - Phone Mockup */}
          <div className="flex-shrink-0 relative w-[280px] sm:w-[320px] lg:w-[380px]">
            {/* Glow behind phone */}
            <div className="absolute inset-0 bg-gradient-coral-purple opacity-40 blur-[60px] rounded-full scale-75" />
            <img 
              src={appMockup} 
              alt="Bargn app - 50% discounts at restaurants, bars and gyms in Helsinki"
              className="relative z-10 w-full h-auto drop-shadow-[0_0_40px_rgba(239,29,242,0.3)]"
              loading="eager"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-8 max-w-4xl mx-auto mt-12 sm:mt-16 mb-12 sm:mb-16 px-2 sm:px-0">
          <div className="bg-glass backdrop-blur-2xl border border-glass sm:border-2 rounded-xl sm:rounded-3xl p-2 sm:p-8 shadow-glow-coral hover:border-primary sm:hover:scale-105 sm:hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="text-lg sm:text-6xl md:text-7xl font-black bg-gradient-coral-purple bg-clip-text text-transparent mb-0.5 sm:mb-2">
              <AnimatedCounter end={-50} suffix="%" />
            </div>
            <div className="text-primary font-bold text-[8px] sm:text-lg leading-tight">{t("heroDiscountRate")}</div>
          </div>
          
          <div className="bg-glass backdrop-blur-2xl border border-glass sm:border-2 rounded-xl sm:rounded-3xl p-2 sm:p-8 shadow-glow-purple hover:border-secondary sm:hover:scale-105 sm:hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="text-lg sm:text-6xl md:text-7xl font-black text-secondary mb-0.5 sm:mb-2">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <div className="text-secondary font-bold text-[8px] sm:text-lg leading-tight">{t("heroPartners")}</div>
          </div>
          
          <div className="bg-glass backdrop-blur-2xl border border-glass sm:border-2 rounded-xl sm:rounded-3xl p-2 sm:p-8 shadow-glow-yellow hover:border-accent sm:hover:scale-105 sm:hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="text-lg sm:text-6xl md:text-7xl font-black text-accent mb-0.5 sm:mb-2">
              <AnimatedCounter end={2} prefix="€" suffix="M+" />
            </div>
            <div className="text-accent font-bold text-[8px] sm:text-lg leading-tight">{t("heroSaved")}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
