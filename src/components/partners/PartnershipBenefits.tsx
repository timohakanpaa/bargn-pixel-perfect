import { DollarSign, Users, Zap, TrendingUp } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnershipBenefits = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const benefits = [
    {
      icon: DollarSign,
      title: t("partners.benefits.benefit1.title"),
      description: t("partners.benefits.benefit1.description"),
      gradient: "bg-gradient-pink-orange",
      shadow: "shadow-glow-pink"
    },
    {
      icon: Users,
      title: t("partners.benefits.benefit2.title"),
      description: t("partners.benefits.benefit2.description"),
      gradient: "bg-gradient-orange-yellow",
      shadow: "shadow-glow-orange"
    },
    {
      icon: Zap,
      title: t("partners.benefits.benefit3.title"),
      description: t("partners.benefits.benefit3.description"),
      gradient: "bg-gradient-pink-yellow",
      shadow: "shadow-glow-yellow"
    },
    {
      icon: TrendingUp,
      title: t("partners.benefits.benefit4.title"),
      description: t("partners.benefits.benefit4.description"),
      gradient: "bg-gradient-purple-pink",
      shadow: "shadow-glow-pink"
    }
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="text-accent text-lg font-bold mb-4 uppercase tracking-wider">{t("partners.benefits.badge")}</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
            {t("partners.benefits.headline")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("partners.benefits.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-card/50 backdrop-blur-xl rounded-3xl p-8 border-2 border-glass hover:border-primary/50 hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-16 h-16 ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 ${benefit.shadow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <benefit.icon className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${index === 1 ? 'text-accent' : 'text-foreground'} group-hover:text-primary transition-colors duration-300`}>
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipBenefits;
