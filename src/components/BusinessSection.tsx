import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Heart, Users } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const BusinessSection = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Single optimized background element */}
      <div className="absolute inset-0 bg-gradient-coral-purple opacity-10 blur-3xl pointer-events-none" />
      <div className={`container mx-auto px-6 max-w-7xl transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="max-w-5xl mx-auto text-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                {t("businessHeadline")}
              </span>
            </h2>
            <p className="text-2xl text-primary font-bold mb-8">
              {t("businessSubhead")}
            </p>

            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              {t("businessIntro")}
            </p>

            <div className="space-y-6 mb-12 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 bg-glass backdrop-blur-2xl border-2 border-glass hover:border-primary hover:shadow-glow-coral p-6 rounded-2xl transition-all duration-300 hover:scale-105 text-left">
                <div className="w-14 h-14 bg-gradient-coral-purple rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow-coral">
                  <TrendingUp className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t("businessFeature1Title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("businessFeature1Desc")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-glass backdrop-blur-2xl border-2 border-glass hover:border-secondary hover:shadow-glow-coral p-6 rounded-2xl transition-all duration-300 hover:scale-105 text-left">
                <div className="w-14 h-14 bg-gradient-coral rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow-coral">
                  <Shield className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t("businessFeature2Title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("businessFeature2Desc")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-glass backdrop-blur-2xl border-2 border-glass hover:border-accent hover:shadow-glow-yellow p-6 rounded-2xl transition-all duration-300 hover:scale-105 text-left">
                <div className="w-14 h-14 bg-gradient-purple-yellow rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow-yellow">
                  <Heart className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t("businessFeature3Title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("businessFeature3Desc")}
                  </p>
                </div>
              </div>
            </div>

            <Button asChild className="bg-gradient-to-r from-secondary to-accent text-foreground font-bold rounded-full px-8 py-6 text-lg shadow-glow-orange hover:scale-110 hover:shadow-glow-yellow transition-all duration-300">
              <a href="/partners">
                <Users className="mr-2 w-5 h-5" />
                {t("businessCTA")}
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
