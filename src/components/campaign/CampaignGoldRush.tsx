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
      gradient: "bg-gradient-pink-orange"
    },
    {
      icon: Lightbulb,
      title: t('campaign.goldRush.benefit2.title'),
      description: t('campaign.goldRush.benefit2.description'),
      gradient: "bg-gradient-orange-yellow"
    },
    {
      icon: Trophy,
      title: t('campaign.goldRush.benefit3.title'),
      description: t('campaign.goldRush.benefit3.description'),
      gradient: "bg-gradient-purple-yellow"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#1a0b2e] to-[#0f0f23] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-pink-yellow bg-clip-text text-transparent">
              {t('campaign.goldRush.title')}
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
                className={`bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl p-8 hover:border-primary hover:shadow-glow-coral transition-all duration-300 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 mb-6 ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-glow-coral`}>
                  <Icon className="w-8 h-8 text-foreground" />
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
