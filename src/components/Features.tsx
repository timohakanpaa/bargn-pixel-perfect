import { Brain, Shield, TrendingUp } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { TiltCard } from "@/components/animations/TiltCard";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-16 sm:py-24 relative overflow-hidden">
      {/* Single optimized background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-coral-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className={`container mx-auto px-4 sm:px-6 max-w-7xl transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-4 sm:mb-6">
          <span className="text-foreground">{t("featuresHeadline")}</span>
        </h2>

        <p className="text-lg sm:text-xl text-center text-secondary mb-12 sm:mb-16 max-w-4xl mx-auto">
          {t("featuresSubhead")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <TiltCard tiltDegree={12} scale={1.06}>
            <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 hover:border-primary hover:shadow-glow-coral transition-all duration-300 group h-full">
              <div className="w-16 h-16 bg-gradient-coral-purple rounded-2xl flex items-center justify-center mb-6 shadow-glow-purple group-hover:animate-pulse-glow">
                <Brain className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t("featureAiTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("featureAiDesc")}
              </p>
            </div>
          </TiltCard>

          <TiltCard tiltDegree={12} scale={1.06}>
            <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 hover:border-secondary hover:shadow-glow-coral transition-all duration-300 group h-full">
              <div className="w-16 h-16 bg-gradient-coral rounded-2xl flex items-center justify-center mb-6 shadow-glow-coral group-hover:animate-pulse-glow">
                <Shield className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t("featureNoFeesTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("featureNoFeesDesc")}
              </p>
            </div>
          </TiltCard>

          <TiltCard tiltDegree={12} scale={1.06}>
            <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 hover:border-accent hover:shadow-glow-yellow transition-all duration-300 group h-full">
              <div className="w-16 h-16 bg-gradient-purple-yellow rounded-2xl flex items-center justify-center mb-6 shadow-glow-yellow group-hover:animate-pulse-glow">
                <TrendingUp className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t("featureRecommendationsTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("featureRecommendationsDesc")}
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
