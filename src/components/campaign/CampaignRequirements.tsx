import { CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const CampaignRequirements = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const requirements = [
    t('campaign.requirements.req1'),
    t('campaign.requirements.req2'),
    t('campaign.requirements.req3'),
    t('campaign.requirements.req4')
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#1e1b4b] via-[#2d1b4e] to-[#0f172a] relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-white">
            {t('campaign.requirements.title')}
          </h2>
          <p className="text-lg text-[#f97316] font-semibold">
            {t('campaign.requirements.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {requirements.map((req, index) => (
            <div
              key={index}
              className={`bg-[#1a1a2e]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-[#ec4899]" />
              </div>
              <p className="text-lg text-foreground/90">{req}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignRequirements;
