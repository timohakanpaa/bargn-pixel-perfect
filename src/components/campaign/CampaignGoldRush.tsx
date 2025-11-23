import { DollarSign, Lightbulb, Trophy } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const CampaignGoldRush = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  useEffect(() => {
    if (isInView) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF9B7D', '#E94B96', '#FFE500']
      });
    }
  }, [isInView]);

  const benefits = [
    {
      icon: DollarSign,
      title: t('campaign.goldRush.benefit1.title'),
      description: t('campaign.goldRush.benefit1.description'),
      iconGradient: "from-[#E94B96] to-[#FF9B7D]",
      glow: "shadow-[0_0_40px_rgba(233,75,150,0.6)]"
    },
    {
      icon: Lightbulb,
      title: t('campaign.goldRush.benefit2.title'),
      description: t('campaign.goldRush.benefit2.description'),
      iconGradient: "from-[#FF9B7D] to-[#FFE500]",
      glow: "shadow-[0_0_40px_rgba(255,155,125,0.6)]"
    },
    {
      icon: Trophy,
      title: t('campaign.goldRush.benefit3.title'),
      description: t('campaign.goldRush.benefit3.description'),
      iconGradient: "from-[#FFE500] to-[#E94B96]",
      glow: "shadow-[0_0_40px_rgba(255,229,0,0.6)]"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-background-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-[#E94B96] via-[#E94B96] to-[#FF9B7D] bg-clip-text text-transparent">
              The Bargn Influencer{" "}
            </span>
            <span className="bg-gradient-to-r from-[#FF9B7D] to-[#FFE500] bg-clip-text text-transparent">
              Gold Rush
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('campaign.goldRush.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl p-8 hover:border-[#E94B96] hover:shadow-[0_0_40px_rgba(233,75,150,0.4)] transition-all duration-300 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${benefit.iconGradient} rounded-2xl flex items-center justify-center ${benefit.glow}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignGoldRush;
