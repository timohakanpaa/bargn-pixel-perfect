import { DollarSign, Users, Wallet, Zap } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";

const CampaignStats = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  useEffect(() => {
    if (isInView) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9B7D', '#E94B96', '#FFE500']
      });
    }
  }, [isInView]);

  const stats = [
    {
      icon: DollarSign,
      value: 40,
      suffix: "%",
      label: t('campaign.stats.revenueShare'),
      valueColor: "text-[#FFE500]",
      labelColor: "text-[#FF9B7D]",
      iconGradient: "from-[#FFE500] to-[#FF9B7D]",
      glow: "shadow-[0_0_40px_rgba(255,229,0,0.6)]"
    },
    {
      icon: Users,
      value: 200,
      suffix: "+",
      label: t('campaign.stats.activeCreators'),
      valueColor: "text-[#E94B96]",
      labelColor: "text-[#FF9B7D]",
      iconGradient: "from-[#E94B96] to-[#FF9B7D]",
      glow: "shadow-[0_0_40px_rgba(233,75,150,0.6)]"
    },
    {
      icon: Wallet,
      value: 50,
      prefix: "€",
      suffix: "k+",
      label: t('campaign.stats.paidOut'),
      valueColor: "text-[#FF9B7D]",
      labelColor: "text-[#FF9B7D]",
      iconGradient: "from-[#FF9B7D] to-[#FF8C61]",
      glow: "shadow-[0_0_40px_rgba(255,155,125,0.6)]"
    },
    {
      icon: Zap,
      value: 5,
      prefix: "€",
      label: t('campaign.stats.minPayout'),
      valueColor: "text-[#FFE500]",
      labelColor: "text-[#FF9B7D]",
      iconGradient: "from-[#FFE500] to-[#FF9B7D]",
      glow: "shadow-[0_0_40px_rgba(255,229,0,0.6)]"
    }
  ];

  return (
    <section ref={ref} className="py-16 bg-background-dark relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl p-6 text-center hover:border-[#E94B96] hover:shadow-[0_0_40px_rgba(233,75,150,0.4)] transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.iconGradient} rounded-2xl flex items-center justify-center ${stat.glow}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-4xl md:text-5xl font-black ${stat.valueColor} mb-2`}>
                  <AnimatedCounter 
                    end={stat.value} 
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <p className={`${stat.labelColor} text-sm font-semibold uppercase tracking-wider`}>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignStats;
