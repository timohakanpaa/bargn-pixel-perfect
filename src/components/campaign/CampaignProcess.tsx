import { UserPlus, MessageCircle, Sparkles, DollarSign } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const CampaignProcess = () => {
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

  const steps = [
    {
      icon: UserPlus,
      number: "1",
      title: t('campaign.process.step1.title'),
      description: t('campaign.process.step1.description'),
      gradient: "bg-gradient-orange-yellow"
    },
    {
      icon: MessageCircle,
      number: "2",
      title: t('campaign.process.step2.title'),
      description: t('campaign.process.step2.description'),
      gradient: "bg-gradient-pink-orange"
    },
    {
      icon: Sparkles,
      number: "3",
      title: t('campaign.process.step3.title'),
      description: t('campaign.process.step3.description'),
      gradient: "bg-gradient-coral-purple"
    },
    {
      icon: DollarSign,
      number: "4",
      title: t('campaign.process.step4.title'),
      description: t('campaign.process.step4.description'),
      gradient: "bg-gradient-purple-yellow"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#0f0f23] to-[#000000] relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-pink-yellow bg-clip-text text-transparent">
              {t('campaign.process.title')}
            </span>
          </h2>
          <p className="text-lg text-primary font-semibold">
            {t('campaign.process.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`text-center transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 mx-auto mb-6 ${step.gradient} rounded-full flex items-center justify-center shadow-glow-pink`}
                >
                  <Icon className="w-10 h-10 text-foreground" />
                </motion.div>
                <div className={`text-6xl font-black mb-4 ${step.gradient} bg-clip-text text-transparent`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignProcess;
