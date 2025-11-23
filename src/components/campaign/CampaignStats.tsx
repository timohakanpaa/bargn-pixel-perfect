import { DollarSign, Users, Wallet, Zap } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

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
      value: "40%",
      label: t('campaign.stats.revenueShare'),
      gradient: "bg-gradient-orange-yellow"
    },
    {
      icon: Users,
      value: "200+",
      label: t('campaign.stats.activeCreators'),
      gradient: "bg-gradient-pink-orange"
    },
    {
      icon: Wallet,
      value: "€50k+",
      label: t('campaign.stats.paidOut'),
      gradient: "bg-gradient-coral-purple"
    },
    {
      icon: Zap,
      value: "€5",
      label: t('campaign.stats.minPayout'),
      gradient: "bg-gradient-purple-yellow"
    }
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-[#0f0f23] to-[#1a0b2e] relative">
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
                className={`bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl p-6 text-center hover:border-primary hover:shadow-glow-coral transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 ${stat.gradient} rounded-2xl flex items-center justify-center shadow-glow-coral`}>
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <div className={`text-4xl md:text-5xl font-black ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignStats;
