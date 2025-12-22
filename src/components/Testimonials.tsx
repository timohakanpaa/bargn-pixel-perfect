import { Star } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { TiltCard } from "@/components/animations/TiltCard";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-16 sm:py-24 relative overflow-hidden bg-background">
      {/* Single optimized background element - subtle central glow on dark background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-coral-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className={`container mx-auto px-4 sm:px-6 max-w-7xl transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <h2 className="text-2xl sm:text-5xl md:text-6xl font-black text-center mb-8 sm:mb-16 text-foreground">
          {t("testimonials.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
          <TiltCard tiltDegree={10} scale={1.05}>
            <div className="bg-glass backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-glass sm:border-2 hover:border-primary hover:shadow-glow-coral transition-all duration-300 h-full">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-coral-purple rounded-full flex items-center justify-center shadow-glow-purple border-2 sm:border-4 border-primary flex-shrink-0">
                  <span className="text-sm sm:text-2xl font-bold">SK</span>
                </div>
                <div>
                  <h4 className="text-sm sm:text-xl font-bold text-foreground">{t("testimonials.sarah.name")}</h4>
                  <div className="flex gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground italic text-xs sm:text-lg leading-relaxed mb-3 sm:mb-4">
                "{t("testimonials.sarah.quote")}"
              </p>
              
              <p className="text-secondary text-[10px] sm:text-sm font-medium">
                {t("testimonials.sarah.verified")}
              </p>
            </div>
          </TiltCard>

          <TiltCard tiltDegree={10} scale={1.05}>
            <div className="bg-glass backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-glass sm:border-2 hover:border-accent hover:shadow-glow-yellow transition-all duration-300 h-full">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-yellow rounded-full flex items-center justify-center shadow-glow-yellow flex-shrink-0">
                  <span className="text-sm sm:text-2xl font-bold">MR</span>
                </div>
                <div>
                  <h4 className="text-sm sm:text-xl font-bold text-foreground">{t("testimonials.mike.name")}</h4>
                  <div className="flex gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground italic text-xs sm:text-lg leading-relaxed mb-3 sm:mb-4">
                "{t("testimonials.mike.quote")}"
              </p>
              
              <p className="text-secondary text-[10px] sm:text-sm font-medium">
                {t("testimonials.mike.verified")}
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
