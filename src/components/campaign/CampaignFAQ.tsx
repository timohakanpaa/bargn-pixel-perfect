import { Plus } from "lucide-react";
import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const CampaignFAQ = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
  
  useEffect(() => {
    // Inject FAQ Schema for Campaign page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": t('campaign.faq.q1'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('campaign.faq.a1')
        }
      }]
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [t]);

  const faqs = [
    {
      question: t('campaign.faq.q1'),
      answer: t('campaign.faq.a1')
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-background-dark relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#E94B96] to-[#FFE500] bg-clip-text text-transparent">
              {t('campaign.faq.title')}
            </span>
          </h2>
          <p className="text-lg text-[#FF9B7D] font-semibold">
            {t('campaign.faq.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-glass backdrop-blur-xl border-2 border-glass rounded-2xl overflow-hidden hover:border-[#E94B96] hover:shadow-[0_0_40px_rgba(233,75,150,0.4)] transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <h3 className="text-xl font-bold text-white pr-8">{faq.question}</h3>
                <Plus 
                  className={`w-6 h-6 text-[#FF9B7D] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignFAQ;
