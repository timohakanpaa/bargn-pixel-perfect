import { DollarSign, Users, Wallet, Zap } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const CampaignStats = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const stats = [
    {
      icon: DollarSign,
      value: "40%",
      label: t('campaign.stats.revenueShare'),
      color: "from-[#ffe500] to-[#fbbf24]",
      textColor: "text-[#ffe500]"
    },
    {
      icon: Users,
      value: "200+",
      label: t('campaign.stats.activeCreators'),
      color: "from-[#ec4899] to-[#f97316]",
      textColor: "text-[#ec4899]"
    },
    {
      icon: Wallet,
      value: "€50k+",
      label: t('campaign.stats.paidOut'),
      color: "from-[#f97316] to-[#fb923c]",
      textColor: "text-[#f97316]"
    },
    {
      icon: Zap,
      value: "€5",
      label: t('campaign.stats.minPayout'),
      color: "from-[#ffe500] to-[#f97316]",
      textColor: "text-[#ffe500]"
    }
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-[#0f172a] to-[#1e1b4b] relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-[#1a1a2e]/80 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center hover:scale-105 transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <p className={`${stat.textColor} text-sm font-semibold uppercase tracking-wider`}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignStats;
