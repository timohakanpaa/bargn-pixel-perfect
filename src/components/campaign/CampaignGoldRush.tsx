import { DollarSign, Lightbulb, Trophy } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const CampaignGoldRush = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const benefits = [
    {
      icon: DollarSign,
      title: t('campaign.goldRush.benefit1.title'),
      description: t('campaign.goldRush.benefit1.description'),
      gradient: "from-[#ec4899] to-[#f97316]"
    },
    {
      icon: Lightbulb,
      title: t('campaign.goldRush.benefit2.title'),
      description: t('campaign.goldRush.benefit2.description'),
      gradient: "from-[#f97316] to-[#fbbf24]"
    },
    {
      icon: Trophy,
      title: t('campaign.goldRush.benefit3.title'),
      description: t('campaign.goldRush.benefit3.description'),
      gradient: "from-[#fbbf24] to-[#ec4899]"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#1e1b4b] to-[#0f172a] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent">
              {t('campaign.goldRush.title').split(' ')[0]} {t('campaign.goldRush.title').split(' ')[1]} {t('campaign.goldRush.title').split(' ')[2]} 
            </span>
            <span className="bg-gradient-to-r from-[#f97316] to-[#fbbf24] bg-clip-text text-transparent">
              {' '}{t('campaign.goldRush.title').split(' ').slice(3).join(' ')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            {t('campaign.goldRush.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`bg-[#1a1a2e]/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignGoldRush;
