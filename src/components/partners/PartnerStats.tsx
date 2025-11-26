import { Building2, Percent, TrendingUp, Users } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnerStats = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const stats = [
    {
      icon: Building2,
      value: 500,
      suffix: "+",
      label: t("partners.stats.activePartners"),
      textColor: "text-[#f59e0b]", // Yellow
      gradient: "bg-gradient-coral",
      glow: "shadow-glow-coral",
    },
    {
      icon: Percent,
      value: 0,
      suffix: "%",
      label: t("partners.stats.commissionFees"),
      textColor: "text-[#ec4899]", // Magenta/Pink
      gradient: "bg-gradient-pink-orange",
      glow: "shadow-glow-pink",
    },
    {
      icon: TrendingUp,
      value: 40,
      suffix: "%",
      label: t("partners.stats.avgIncrease"),
      textColor: "text-[#f97316]", // Coral/Orange
      gradient: "bg-gradient-coral",
      glow: "shadow-glow-coral",
    },
    {
      icon: Users,
      value: 5,
      suffix: "K+",
      label: t("partners.stats.qualityMembers"),
      textColor: "text-[#f59e0b]", // Yellow
      gradient: "bg-gradient-yellow",
      glow: "shadow-glow-yellow",
    },
  ];

  return (
    <section ref={ref} className="py-12 md:py-16 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-glass backdrop-blur-2xl border-2 border-glass rounded-2xl md:rounded-3xl p-4 md:p-6 ${stat.glow} hover:border-primary/50 hover:scale-105 hover:-translate-y-2 transition-all duration-300 ${
                isInView ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`text-3xl md:text-4xl lg:text-5xl font-black mb-1 md:mb-2 ${stat.textColor} transition-transform duration-300`}>
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2000} 
                />
              </div>
              <p className="text-muted-foreground font-semibold text-xs md:text-sm lg:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerStats;
