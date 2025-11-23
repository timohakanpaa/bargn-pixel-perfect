import { Video, Target, Eye } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const CampaignContentIdeas = () => {
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

  const ideas = [
    {
      icon: Video,
      title: t('campaign.contentIdeas.idea1.title'),
      description: t('campaign.contentIdeas.idea1.description'),
      iconGradient: "from-[#E94B96] to-[#FF9B7D]",
      glow: "shadow-[0_0_40px_rgba(233,75,150,0.6)]"
    },
    {
      icon: Target,
      title: t('campaign.contentIdeas.idea2.title'),
      description: t('campaign.contentIdeas.idea2.description'),
      iconGradient: "from-[#FF9B7D] to-[#FFE500]",
      glow: "shadow-[0_0_40px_rgba(255,155,125,0.6)]"
    },
    {
      icon: Eye,
      title: t('campaign.contentIdeas.idea3.title'),
      description: t('campaign.contentIdeas.idea3.description'),
      iconGradient: "from-[#8B5CF6] to-[#FFE500]",
      glow: "shadow-[0_0_40px_rgba(139,92,246,0.6)]"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-background-dark relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#FF9B7D] to-[#FFE500] bg-clip-text text-transparent">
              {t('campaign.contentIdeas.title')}
            </span>
          </h2>
          <p className="text-lg text-[#FF9B7D] font-semibold">
            {t('campaign.contentIdeas.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ideas.map((idea, index) => {
            const Icon = idea.icon;
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
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${idea.iconGradient} rounded-2xl flex items-center justify-center ${idea.glow}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{idea.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{idea.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignContentIdeas;
