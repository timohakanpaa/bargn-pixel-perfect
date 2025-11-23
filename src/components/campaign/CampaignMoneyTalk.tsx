import { Percent, Shield, Zap } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const CampaignMoneyTalk = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const cards = [
    {
      icon: Percent,
      title: t('campaign.moneyTalk.card1.title'),
      description: t('campaign.moneyTalk.card1.description'),
      gradient: "from-[#ec4899] to-[#f97316]"
    },
    {
      icon: Shield,
      title: t('campaign.moneyTalk.card2.title'),
      description: t('campaign.moneyTalk.card2.description'),
      gradient: "from-[#f97316] to-[#fbbf24]"
    },
    {
      icon: Zap,
      title: t('campaign.moneyTalk.card3.title'),
      description: t('campaign.moneyTalk.card3.description'),
      gradient: "from-[#fbbf24] to-[#ec4899]"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#0f172a] via-[#2d1b4e] to-[#0f172a] relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-white">
            {t('campaign.moneyTalk.title')}
          </h2>
          <p className="text-lg md:text-xl text-[#f97316] font-semibold">
            {t('campaign.moneyTalk.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br from-[#1a1a2e]/90 to-[#2d1b4e]/50 backdrop-blur-sm border border-[#ec4899]/20 rounded-3xl p-8 hover:scale-105 hover:border-[#f97316]/40 transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignMoneyTalk;
