import { Button } from "@/components/ui/button";
import { Check, Sparkles, MapPin } from "lucide-react";
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Premium Plan - Monthly */}
          <TiltCard className="relative group" tiltDegree={15} scale={1.08}>
            <div className="absolute inset-0 bg-gradient-purple-yellow opacity-30 blur-3xl group-hover:opacity-40 transition-opacity rounded-3xl animate-pulse-glow"></div>
            <div className="relative bg-glass backdrop-blur-2xl border-2 border-purple shadow-glow-purple rounded-3xl overflow-hidden hover:shadow-glow-yellow transition-all duration-300">
              <div className="bg-gradient-purple-yellow p-8 relative">
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  {t("aiThatSlaps")}
                </div>
                <div className="text-6xl mb-4">%</div>
                <div className="text-4xl font-black text-foreground">{t("pricingHeadline")}</div>
              </div>
              
              <div className="bg-glass backdrop-blur-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-black text-accent">
                    {t("vipLife")}
                  </h3>
                  <div className="flex items-center text-accent">
                    <span className="text-2xl font-bold">⭐</span>
                    <span className="ml-2 font-bold">4.9</span>
                  </div>
                </div>

                <p className="text-sm text-secondary mb-6">
                  {t("pricingFeatures")}
                </p>

                <p className="text-muted-foreground mb-8">
                  {t("pricingDesc")}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-1" />
                    <span className="text-foreground">{t("unlimitedDiscountsPricing")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent mt-1" />
                    <span className="text-foreground">{t("aiRecommendations")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <span className="text-foreground">{t("localNetwork")}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-accent">
                    <AnimatedCounter end={8.8} prefix="€" duration={2000} />
                  </span>
                  <span className="text-muted-foreground">{t("monthly")}</span>
                </div>

                <Button 
                  asChild
                  className="w-full bg-gradient-pink-orange text-foreground font-bold rounded-full py-6 text-lg shadow-[0_0_25px_rgba(239,29,242,0.6)] hover:shadow-[0_0_40px_rgba(239,29,242,0.9)] hover:animate-wobble"
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

          {/* Standard Plan */}
          <TiltCard className="relative group" tiltDegree={15} scale={1.08}>
            <div className="absolute inset-0 bg-gradient-coral-purple opacity-30 blur-3xl group-hover:opacity-40 transition-opacity rounded-3xl"></div>
            <div className="relative bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl overflow-hidden hover:shadow-glow-coral transition-all duration-300">
              <div className="bg-gradient-coral-purple p-8 relative">
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  {t("bestValue")}
                </div>
                <div className="text-6xl mb-4">%</div>
                <div className="text-4xl font-black text-foreground">{t("pricingHeadline")}</div>
              </div>
              
              <div className="bg-glass backdrop-blur-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-black text-muted-foreground">
                    {t("vipLife")}
                  </h3>
                  <div className="flex items-center text-accent">
                    <span className="text-2xl font-bold">⭐</span>
                    <span className="ml-2 font-bold">4.9</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  {t("pricingFeatures")}
                </p>

                <p className="text-muted-foreground mb-8">
                  {t("pricingDesc")}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-1" />
                    <span className="text-muted-foreground">{t("unlimitedDiscountsPricing")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent mt-1" />
                    <span className="text-muted-foreground">{t("aiRecommendations")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <span className="text-muted-foreground">{t("localNetwork")}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-accent">
                    <AnimatedCounter end={53} prefix="€" duration={2000} />
                  </span>
                  <span className="text-muted-foreground">{t("yearly")}</span>
                </div>

                <Button 
                  asChild
                  variant="outline" 
                  className="w-full border-accent text-accent font-bold rounded-full py-6 text-lg hover:bg-accent/10 hover:animate-wobble"
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
          <TiltCard className="relative group" tiltDegree={15} scale={1.08}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 via-orange-500/30 to-red-500/30 opacity-30 blur-3xl group-hover:opacity-40 transition-opacity rounded-3xl animate-pulse-glow"></div>
            <div className="relative bg-glass backdrop-blur-2xl border-2 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)] rounded-3xl overflow-hidden hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-8 relative">
                <div className="absolute top-4 right-4 bg-background text-foreground px-4 py-1 rounded-full text-sm font-bold">
                  {t("lifetimeBadge")}
                </div>
                <div className="text-6xl mb-4">♾️</div>
                <div className="text-4xl font-black text-foreground">{t("lifetimeTitle")}</div>
              </div>
              
              <div className="bg-glass backdrop-blur-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-black text-yellow-500">
                    {t("vipLife")}
                  </h3>
                  <div className="flex items-center text-accent">
                    <span className="text-2xl font-bold">⭐</span>
                    <span className="ml-2 font-bold">4.9</span>
                  </div>
                </div>

                <p className="text-sm text-secondary mb-6">
                  {t("pricingFeatures")}
                </p>

                <p className="text-muted-foreground mb-8">
                  {t("pricingDesc")}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-yellow-500 mt-1" />
                    <span className="text-foreground">{t("unlimitedDiscountsPricing")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-500 mt-1" />
                    <span className="text-foreground">{t("aiRecommendations")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-yellow-500 mt-1" />
                    <span className="text-foreground">{t("localNetwork")}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-yellow-500">
                    <AnimatedCounter end={278} prefix="€" duration={2000} />
                  </span>
                  <span className="text-muted-foreground">{t("lifetime")}</span>
                </div>

                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-foreground font-bold rounded-full py-6 text-lg shadow-[0_0_25px_rgba(234,179,8,0.6)] hover:shadow-[0_0_40px_rgba(234,179,8,0.9)] hover:animate-wobble"
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