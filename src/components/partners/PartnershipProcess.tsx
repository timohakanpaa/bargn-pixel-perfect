import { Rocket } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnershipProcess = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="text-accent text-lg font-bold mb-4 uppercase tracking-wider">{t("partners.process.badge")}</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
            {t("partners.process.headline")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("partners.process.description")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-12 hover:scale-105 transition-transform duration-300 shadow-glow-pink">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-pink-orange rounded-2xl flex items-center justify-center shadow-glow-pink animate-pulse-glow">
              <Rocket className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-3xl font-black text-foreground">{t("partners.process.cta")}</h3>
          </div>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {t("partners.process.details")}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-glass backdrop-blur-xl rounded-2xl border-2 border-glass">
              <div className="text-4xl font-black text-accent mb-2">1</div>
              <p className="text-foreground font-semibold">{t("partners.process.step1")}</p>
            </div>
            <div className="text-center p-6 bg-background/50 rounded-2xl border border-border/30">
              <div className="text-4xl font-black text-accent mb-2">2</div>
              <p className="text-foreground font-semibold">{t("partners.process.step2")}</p>
            </div>
            <div className="text-center p-6 bg-background/50 rounded-2xl border border-border/30">
              <div className="text-4xl font-black text-accent mb-2">3</div>
              <p className="text-foreground font-semibold">{t("partners.process.step3")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipProcess;
