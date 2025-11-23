import { CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const CampaignRequirements = () => {
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

  const requirements = [
    t('campaign.requirements.req1'),
    t('campaign.requirements.req2'),
    t('campaign.requirements.req3'),
    t('campaign.requirements.req4')
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#1a0b2e] via-[#16213e] to-[#0f0f23] relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground">
            {t('campaign.requirements.title')}
          </h2>
          <p className="text-lg text-primary font-semibold">
            {t('campaign.requirements.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className={`bg-glass backdrop-blur-xl border-2 border-glass rounded-2xl p-6 flex items-center gap-4 hover:border-primary hover:shadow-glow-coral transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <p className="text-lg text-foreground">{req}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignRequirements;
