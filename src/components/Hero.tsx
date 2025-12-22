import { Button } from "@/components/ui/button";
import { Zap, Users, Pizza, Ticket, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useAnalytics } from "@/hooks/use-analytics";
import AppStoreBadges from "@/components/AppStoreBadges";
import { trackAllPlatforms } from "@/utils/tracking";
import { useAuth } from "@/hooks/use-auth";

const Hero = () => {
  const { t } = useLanguage();
  const { trackButtonClick } = useAnalytics();
  const { isAdmin } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-4">
      {/* Giant Blurry Gradient Blob - Static version */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-coral-purple opacity-30 blur-[120px] rounded-full"
        style={{
          boxShadow: "0 0 120px 50px rgba(239,29,242,0.5)"
        }}
      />
      
      {/* Static Floating Icons - No infinite animations */}
      <div className="absolute top-24 sm:top-32 left-[5%] sm:left-[15%] w-20 h-20 sm:w-28 sm:h-28 hover:scale-110 transition-transform duration-300">
        <div
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-primary rounded-3xl flex items-center justify-center shadow-glow-coral cursor-pointer"
          style={{ transform: "rotate(12deg)" }}
          aria-label="Pizza discount icon"
        >
          <Pizza className="w-10 h-10 sm:w-14 sm:h-14 text-primary" aria-hidden="true" />
        </div>
      </div>

      <div className="absolute top-32 sm:top-40 right-[5%] sm:right-[15%] w-16 h-16 sm:w-24 sm:h-24 hover:scale-110 transition-transform duration-300">
        <div
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-accent rounded-full flex items-center justify-center shadow-glow-yellow cursor-pointer"
          style={{ transform: "rotate(-8deg)" }}
          aria-label="Ticket deals icon"
        >
          <Ticket className="w-8 h-8 sm:w-12 sm:h-12 text-accent" aria-hidden="true" />
        </div>
      </div>

      <div className="absolute bottom-24 sm:bottom-32 left-[10%] sm:left-[20%] w-24 h-24 sm:w-32 sm:h-32 hover:scale-110 transition-transform duration-300">
        <div
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-secondary rounded-2xl flex items-center justify-center shadow-glow-purple cursor-pointer"
          style={{ transform: "rotate(5deg)" }}
          aria-label="Mobile app icon"
        >
          <Smartphone className="w-12 h-12 sm:w-16 sm:h-16 text-secondary" aria-hidden="true" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 animate-fade-in">
        <div className="inline-block mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-glass backdrop-blur-xl rounded-full border-2 border-glass shadow-glow-yellow">
          <span className="text-accent font-bold mr-2 text-sm sm:text-base">✨</span>
          <span className="text-accent font-bold text-xs sm:text-base">{t("aiThatSlaps")}</span>
          <span className="text-accent ml-2 text-sm sm:text-base">✨</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-6 sm:mb-8 leading-tight">
          <span className="bg-gradient-coral-purple bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(248,129,112,0.5)]">
            {t("heroHeadline")}
          </span>
        </h1>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
          {t("heroSubhead")}
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12">
          {t("heroText")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20">
          <Button 
            asChild
            variant="neon"
            className="w-full sm:w-auto rounded-full px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl shadow-[0_0_25px_rgba(255,220,74,0.7)] hover:shadow-[0_0_40px_rgba(255,220,74,1)]"
          >
            <a
              href="https://buy.stripe.com/aFa14n2Cca7X6nw5Lu3ZK02"
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
            className="w-full sm:w-auto rounded-full px-5 sm:px-10 py-4 sm:py-7 text-sm sm:text-xl"
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
              <span className="truncate">{t("partnerUp")}</span>
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-6 sm:p-8 shadow-glow-coral hover:border-primary hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-coral-purple bg-clip-text text-transparent mb-2">
              <AnimatedCounter end={-50} suffix="%" />
            </div>
            <div className="text-primary font-bold text-base sm:text-lg">{t("heroDiscountRate")}</div>
          </div>
          
          <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-6 sm:p-8 shadow-glow-purple hover:border-secondary hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl sm:text-6xl md:text-7xl font-black text-secondary mb-2">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <div className="text-secondary font-bold text-base sm:text-lg">{t("heroPartners")}</div>
          </div>
          
          <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-6 sm:p-8 shadow-glow-yellow hover:border-accent hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl sm:text-6xl md:text-7xl font-black text-accent mb-2">
              <AnimatedCounter end={2} prefix="€" suffix="M+" />
            </div>
          <div className="text-accent font-bold text-base sm:text-lg">{t("heroSaved")}</div>
          </div>
        </div>

        {/* App Store Badges - Admin Only */}
        {isAdmin && (
          <div>
            <AppStoreBadges />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
