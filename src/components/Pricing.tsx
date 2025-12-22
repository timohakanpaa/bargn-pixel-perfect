import { Button } from "@/components/ui/button";
import { Check, Sparkles, MapPin, Crown } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-12 sm:py-24 relative overflow-hidden bg-background">
      {/* Single optimized background element */}
      <div className="absolute inset-0 bg-gradient-coral-purple opacity-10 blur-3xl pointer-events-none" />
      <div className={`container mx-auto px-3 sm:px-6 max-w-6xl transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <h2 className="text-3xl sm:text-6xl md:text-7xl font-black text-center mb-3 sm:mb-6 text-primary">
          {t("pricingHeadline")}
        </h2>
        <p className="text-lg sm:text-2xl text-center text-secondary mb-8 sm:mb-16 px-2">
          {t("pricingSubhead")}
        </p>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 sm:gap-6 mx-auto">
          {/* Monthly Plan */}
          <div className="relative pt-3 sm:pt-4 order-2 md:order-1">
            <div className="h-full flex flex-col bg-glass backdrop-blur-2xl border border-purple/50 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-glow-purple transition-all duration-300">
              <div className="bg-gradient-purple-yellow p-4 sm:p-6 relative min-h-[100px] sm:min-h-[120px] flex flex-col justify-end">
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-accent text-accent-foreground px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap">
                  {t("aiThatSlaps")}
                </div>
                <div className="text-3xl sm:text-5xl mb-1 sm:mb-2">🔄</div>
                <div className="text-xl sm:text-3xl font-black text-foreground">{t("monthlyTitle")}</div>
              </div>
              
              <div className="flex-1 flex flex-col bg-glass backdrop-blur-xl p-4 sm:p-6">
                <p className="text-xs text-secondary mb-3 sm:mb-4">
                  {t("pricingFeatures")}
                </p>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{t("unlimitedDiscountsPricing")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{t("aiRecommendations")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{t("localNetwork")}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-4 sm:mb-5">
                    <span className="text-3xl sm:text-5xl font-black text-accent">
                      <AnimatedCounter end={8.8} prefix="€" duration={2000} />
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{t("monthly")}</span>
                  </div>

                  <Button 
                    asChild
                    className="w-full bg-gradient-pink-orange text-foreground font-bold rounded-full py-4 sm:py-5 text-sm sm:text-base shadow-[0_0_20px_rgba(239,29,242,0.5)] active:scale-95 transition-transform"
                  >
                    <a 
                      href="https://buy.stripe.com/eVq3cva4E2Fv5jsei03ZK00" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {t("joinNow")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Yearly Plan - Recommended (First on mobile) */}
          <div className="relative pt-3 sm:pt-4 order-1 md:order-2">
            {/* Recommended Badge - Outside the card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-accent text-accent-foreground px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 shadow-lg">
                <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {t("recommended")}
              </div>
            </div>
            <div className="h-full flex flex-col bg-glass backdrop-blur-2xl border-2 border-accent rounded-xl sm:rounded-2xl overflow-hidden shadow-glow-coral transition-all duration-300">
              <div className="bg-gradient-coral-purple p-4 sm:p-6 relative min-h-[100px] sm:min-h-[120px] flex flex-col justify-end">
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-background text-foreground px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap">
                  {t("bestValue")}
                </div>
                <div className="text-3xl sm:text-5xl mb-1 sm:mb-2">🏆</div>
                <div className="text-xl sm:text-3xl font-black text-foreground">{t("yearlyTitle")}</div>
              </div>
              
              <div className="flex-1 flex flex-col bg-glass backdrop-blur-xl p-4 sm:p-6">
                <p className="text-xs text-secondary mb-3 sm:mb-4">
                  {t("pricingFeatures")}
                </p>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{t("unlimitedDiscountsPricing")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{t("aiRecommendations")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{t("localNetwork")}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-4 sm:mb-5">
                    <span className="text-3xl sm:text-5xl font-black text-accent">
                      <AnimatedCounter end={53} prefix="€" duration={2000} />
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{t("yearly")}</span>
                  </div>

                  <Button 
                    asChild
                    className="w-full bg-gradient-coral-purple text-foreground font-bold rounded-full py-4 sm:py-5 text-sm sm:text-base shadow-[0_0_20px_rgba(239,29,242,0.5)] active:scale-95 transition-transform"
                  >
                    <a 
                      href="https://buy.stripe.com/6oUdR9a4E7ZP5js6Py3ZK01" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {t("joinNow")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Lifetime Plan */}
          <div className="relative pt-3 sm:pt-4 order-3">
            <div className="h-full flex flex-col bg-glass backdrop-blur-2xl border border-yellow-500/40 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-4 sm:p-6 relative min-h-[100px] sm:min-h-[120px] flex flex-col justify-end">
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-background text-foreground px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap">
                  {t("lifetimeBadge")}
                </div>
                <div className="text-3xl sm:text-5xl mb-1 sm:mb-2">♾️</div>
                <div className="text-xl sm:text-3xl font-black text-foreground">{t("lifetimeTitle")}</div>
              </div>
              
              <div className="flex-1 flex flex-col bg-glass backdrop-blur-xl p-4 sm:p-6">
                <p className="text-xs text-secondary mb-3 sm:mb-4">
                  {t("pricingFeatures")}
                </p>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{t("unlimitedDiscountsPricing")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{t("aiRecommendations")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{t("localNetwork")}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-4 sm:mb-5">
                    <span className="text-3xl sm:text-5xl font-black text-yellow-500">
                      <AnimatedCounter end={278} prefix="€" duration={2000} />
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{t("lifetime")}</span>
                  </div>

                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-foreground font-bold rounded-full py-4 sm:py-5 text-sm sm:text-base shadow-[0_0_20px_rgba(234,179,8,0.5)] active:scale-95 transition-transform"
                  >
                    <a 
                      href="https://buy.stripe.com/fZu9AT5Oobc1fY65Lu3ZK04" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {t("joinNow")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Pricing;