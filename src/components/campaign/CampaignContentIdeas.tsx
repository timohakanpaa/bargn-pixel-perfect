import { Video, Target, Eye } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const CampaignContentIdeas = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const ideas = [
    {
      icon: Video,
      title: t('campaign.contentIdeas.idea1.title'),
      description: t('campaign.contentIdeas.idea1.description'),
      gradient: "from-[#ec4899] to-[#f97316]"
    },
    {
      icon: Target,
      title: t('campaign.contentIdeas.idea2.title'),
      description: t('campaign.contentIdeas.idea2.description'),
      gradient: "from-[#f97316] to-[#fbbf24]"
    },
    {
      icon: Eye,
      title: t('campaign.contentIdeas.idea3.title'),
      description: t('campaign.contentIdeas.idea3.description'),
      gradient: "from-[#fbbf24] to-[#ec4899]"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#0f172a] to-[#1e1b4b] relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#f97316] to-[#fbbf24] bg-clip-text text-transparent">
              {t('campaign.contentIdeas.title')}
            </span>
          </h2>
          <p className="text-lg text-[#f97316] font-semibold">
            {t('campaign.contentIdeas.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ideas.map((idea, index) => {
            const Icon = idea.icon;
            return (
              <div
                key={index}
                className={`bg-[#1a1a2e]/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${idea.gradient} rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{idea.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{idea.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignContentIdeas;
