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
    <section ref={ref} className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-card/50 backdrop-blur-xl border-2 border-border/30 rounded-3xl hover:scale-105 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 ${stat.glow} ${
                isInView ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <stat.icon className="w-8 h-8 text-foreground" />
              </div>
              <div className={`text-5xl font-black mb-2 ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}>
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2000} 
                />
              </div>
              <p className="text-coral font-bold text-lg group-hover:text-primary transition-colors duration-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerStats;
