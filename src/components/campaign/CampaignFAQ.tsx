import { Plus } from "lucide-react";
import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const CampaignFAQ = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t('campaign.faq.q1'),
      answer: t('campaign.faq.a1')
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#0c0a1f] via-[#1a0b2e] to-[#0f172a] relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#fbbf24] bg-clip-text text-transparent">
              {t('campaign.faq.title')}
            </span>
          </h2>
          <p className="text-lg text-[#f97316] font-semibold">
            {t('campaign.faq.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#ec4899]/20 rounded-2xl overflow-hidden transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <h3 className="text-xl font-bold text-white pr-8">{faq.question}</h3>
                <Plus 
                  className={`w-6 h-6 text-[#ec4899] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-foreground/80 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignFAQ;
