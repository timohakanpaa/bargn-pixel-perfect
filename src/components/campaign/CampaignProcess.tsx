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
      iconGradient: "from-[#FF9B7D] to-[#FFE500]",
      textGradient: "from-[#FF9B7D] to-[#FFE500]",
      glow: "shadow-[0_0_60px_rgba(255,155,125,0.6)]"
    },
    {
      icon: MessageCircle,
      number: "2",
      title: t('campaign.process.step2.title'),
      description: t('campaign.process.step2.description'),
      iconGradient: "from-[#E94B96] to-[#FF9B7D]",
      textGradient: "from-[#E94B96] to-[#FF9B7D]",
      glow: "shadow-[0_0_60px_rgba(233,75,150,0.6)]"
    },
    {
      icon: Sparkles,
      number: "3",
      title: t('campaign.process.step3.title'),
      description: t('campaign.process.step3.description'),
      iconGradient: "from-[#FF9B7D] to-[#8B5CF6]",
      textGradient: "from-[#FF9B7D] to-[#8B5CF6]",
      glow: "shadow-[0_0_60px_rgba(255,155,125,0.6)]"
    },
    {
      icon: DollarSign,
      number: "4",
      title: t('campaign.process.step4.title'),
      description: t('campaign.process.step4.description'),
      iconGradient: "from-[#8B5CF6] to-[#FFE500]",
      textGradient: "from-[#8B5CF6] to-[#FFE500]",
      glow: "shadow-[0_0_60px_rgba(139,92,246,0.6)]"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-background-dark relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#E94B96] to-[#FFE500] bg-clip-text text-transparent">
              {t('campaign.process.title')}
            </span>
          </h2>
          <p className="text-lg text-[#FF9B7D] font-semibold">
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
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${step.iconGradient} rounded-full flex items-center justify-center ${step.glow}`}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
                <div className={`text-6xl font-black mb-4 bg-gradient-to-r ${step.textGradient} bg-clip-text text-transparent`}>
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
