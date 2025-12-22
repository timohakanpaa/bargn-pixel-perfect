import { Button } from "@/components/ui/button";
import { Check, Sparkles, MapPin, Crown } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { TiltCard } from "@/components/animations/TiltCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-16 sm:py-24 relative overflow-hidden bg-background">
      {/* Single optimized background element */}
      <div className="absolute inset-0 bg-gradient-coral-purple opacity-10 blur-3xl pointer-events-none" />
      <div className={`container mx-auto px-4 sm:px-6 max-w-7xl transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-center mb-4 sm:mb-6 text-primary">
          {t("pricingHeadline")}
        </h2>
        <p className="text-xl sm:text-2xl text-center text-secondary mb-12 sm:mb-16">
          {t("pricingSubhead")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto items-stretch">
          {/* Monthly Plan */}
          <TiltCard className="relative group h-full" tiltDegree={12} scale={1.05}>
            <div className="absolute inset-0 bg-gradient-purple-yellow opacity-20 blur-3xl group-hover:opacity-30 transition-opacity rounded-2xl"></div>
            <div className="relative h-full flex flex-col bg-glass backdrop-blur-2xl border border-purple/50 rounded-2xl overflow-hidden hover:shadow-glow-purple transition-all duration-300">
              <div className="bg-gradient-purple-yellow p-5 sm:p-6 relative">
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                  {t("aiThatSlaps")}
                </div>
                <div className="text-4xl sm:text-5xl mb-2">%</div>
                <div className="text-2xl sm:text-3xl font-black text-foreground">{t("vipLifeShort")}</div>
              </div>
              
              <div className="flex-1 flex flex-col bg-glass backdrop-blur-xl p-5 sm:p-6">
                <p className="text-xs sm:text-sm text-secondary mb-4">
                  {t("pricingFeatures")}
                </p>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{t("unlimitedDiscountsPricing")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{t("aiRecommendations")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{t("localNetwork")}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-4xl sm:text-5xl font-black text-accent">
                    <AnimatedCounter end={8.8} prefix="€" duration={2000} />
                  </span>
                  <span className="text-sm text-muted-foreground">{t("monthly")}</span>
                </div>

                <Button 
                  asChild
                  className="w-full bg-gradient-pink-orange text-foreground font-bold rounded-full py-5 text-base shadow-[0_0_20px_rgba(239,29,242,0.5)] hover:shadow-[0_0_30px_rgba(239,29,242,0.8)] hover:animate-wobble"
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
          </TiltCard>

          {/* Yearly Plan - Recommended */}
          <TiltCard className="relative group h-full" tiltDegree={12} scale={1.05}>
            <div className="absolute inset-0 bg-gradient-coral-purple opacity-30 blur-3xl group-hover:opacity-40 transition-opacity rounded-2xl animate-pulse-glow"></div>
            <div className="relative h-full flex flex-col bg-glass backdrop-blur-2xl border-2 border-accent shadow-glow-coral rounded-2xl overflow-hidden hover:shadow-glow-yellow transition-all duration-300">
              {/* Recommended Badge */}
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-accent text-accent-foreground px-4 py-1.5 rounded-b-xl text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <Crown className="w-3.5 h-3.5" />
                  {t("recommended")}
                </div>
              </div>
              
              <div className="bg-gradient-coral-purple p-5 sm:p-6 relative pt-8">
                <div className="absolute top-3 right-3 bg-background text-foreground px-3 py-1 rounded-full text-xs font-bold">
                  {t("bestValue")}
                </div>
                <div className="text-4xl sm:text-5xl mb-2">%</div>
                <div className="text-2xl sm:text-3xl font-black text-foreground">{t("vipLifeShort")}</div>
              </div>
              
              <div className="flex-1 flex flex-col bg-glass backdrop-blur-xl p-5 sm:p-6">
                <p className="text-xs sm:text-sm text-secondary mb-4">
                  {t("pricingFeatures")}
                </p>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{t("unlimitedDiscountsPricing")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{t("aiRecommendations")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{t("localNetwork")}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-4xl sm:text-5xl font-black text-accent">
                    <AnimatedCounter end={53} prefix="€" duration={2000} />
                  </span>
                  <span className="text-sm text-muted-foreground">{t("yearly")}</span>
                </div>

                <Button 
                  asChild
                  className="w-full bg-gradient-coral-purple text-foreground font-bold rounded-full py-5 text-base shadow-[0_0_20px_rgba(239,29,242,0.5)] hover:shadow-[0_0_30px_rgba(239,29,242,0.8)] hover:animate-wobble"
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
          </TiltCard>

          {/* Lifetime Plan */}
          <TiltCard className="relative group h-full" tiltDegree={12} scale={1.05}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 opacity-30 blur-3xl group-hover:opacity-40 transition-opacity rounded-2xl"></div>
            <div className="relative h-full flex flex-col bg-glass backdrop-blur-2xl border border-yellow-500/40 rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-5 sm:p-6 relative">
                <div className="absolute top-3 right-3 bg-background text-foreground px-3 py-1 rounded-full text-xs font-bold">
                  {t("lifetimeBadge")}
                </div>
                <div className="text-4xl sm:text-5xl mb-2">♾️</div>
                <div className="text-2xl sm:text-3xl font-black text-foreground">{t("lifetimeTitle")}</div>
              </div>
              
              <div className="flex-1 flex flex-col bg-glass backdrop-blur-xl p-5 sm:p-6">
                <p className="text-xs sm:text-sm text-secondary mb-4">
                  {t("pricingFeatures")}
                </p>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{t("unlimitedDiscountsPricing")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{t("aiRecommendations")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{t("localNetwork")}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-4xl sm:text-5xl font-black text-yellow-500">
                    <AnimatedCounter end={278} prefix="€" duration={2000} />
                  </span>
                  <span className="text-sm text-muted-foreground">{t("lifetime")}</span>
                </div>

                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-foreground font-bold rounded-full py-5 text-base shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] hover:animate-wobble"
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
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
export default Pricing;