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
        <h2 className="text-2xl sm:text-5xl md:text-6xl font-black text-center mb-3 sm:mb-6">
          <span className="text-foreground">{t("featuresHeadline")}</span>
        </h2>

        <p className="text-sm sm:text-xl text-center text-secondary mb-8 sm:mb-16 max-w-4xl mx-auto px-2 sm:px-0">
          {t("featuresSubhead")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">
          <TiltCard tiltDegree={12} scale={1.06}>
            <div className="bg-glass backdrop-blur-2xl border border-glass sm:border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-8 hover:border-primary hover:shadow-glow-coral transition-all duration-300 group h-full">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-coral-purple rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 shadow-glow-purple group-hover:animate-pulse-glow">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-foreground group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-sm sm:text-2xl font-bold text-foreground mb-2 sm:mb-4 leading-tight">
                {t("featureAiTitle")}
              </h3>
              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
                {t("featureAiDesc")}
              </p>
            </div>
          </TiltCard>

          <TiltCard tiltDegree={12} scale={1.06}>
            <div className="bg-glass backdrop-blur-2xl border border-glass sm:border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-8 hover:border-secondary hover:shadow-glow-coral transition-all duration-300 group h-full">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-coral rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 shadow-glow-coral group-hover:animate-pulse-glow">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-foreground group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-sm sm:text-2xl font-bold text-foreground mb-2 sm:mb-4 leading-tight">
                {t("featureNoFeesTitle")}
              </h3>
              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
                {t("featureNoFeesDesc")}
              </p>
            </div>
          </TiltCard>

          <TiltCard tiltDegree={12} scale={1.06}>
            <div className="bg-glass backdrop-blur-2xl border border-glass sm:border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-8 hover:border-accent hover:shadow-glow-yellow transition-all duration-300 group h-full">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-purple-yellow rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 shadow-glow-yellow group-hover:animate-pulse-glow">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-foreground group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-sm sm:text-2xl font-bold text-foreground mb-2 sm:mb-4 leading-tight">
                {t("featureRecommendationsTitle")}
              </h3>
              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
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
