import { UserPlus, MessageCircle, Sparkles, DollarSign } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const CampaignProcess = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const steps = [
    {
      icon: UserPlus,
      number: "1",
      title: t('campaign.process.step1.title'),
      description: t('campaign.process.step1.description'),
      color: "from-[#ffe500] to-[#fbbf24]",
      numberColor: "text-[#ffe500]"
    },
    {
      icon: MessageCircle,
      number: "2",
      title: t('campaign.process.step2.title'),
      description: t('campaign.process.step2.description'),
      color: "from-[#ec4899] to-[#f97316]",
      numberColor: "text-[#ec4899]"
    },
    {
      icon: Sparkles,
      number: "3",
      title: t('campaign.process.step3.title'),
      description: t('campaign.process.step3.description'),
      color: "from-[#f97316] to-[#fbbf24]",
      numberColor: "text-[#f97316]"
    },
    {
      icon: DollarSign,
      number: "4",
      title: t('campaign.process.step4.title'),
      description: t('campaign.process.step4.description'),
      color: "from-[#fbbf24] to-[#ffe500]",
      numberColor: "text-[#fbbf24]"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#0f172a] to-[#000000] relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#ec4899] to-[#fbbf24] bg-clip-text text-transparent">
              {t('campaign.process.title')}
            </span>
          </h2>
          <p className="text-lg text-[#f97316] font-semibold">
            {t('campaign.process.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-glow-pink`}>
                  <Icon className="w-10 h-10 text-black" />
                </div>
                <div className={`text-6xl font-black mb-4 ${step.numberColor}`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignProcess;
