import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "@/hooks/use-in-view";
import { useFAQSchema } from "@/hooks/use-faq-schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";

const FAQ = () => {
  const { ref, isInView } = useInView();
  const { t, language } = useLanguage();
  const location = useLocation();
  
  const faqData = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4")
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5")
    },
    {
      question: t("faq.q6"),
      answer: t("faq.a6")
    },
    {
      question: t("faq.q7"),
      answer: t("faq.a7")
    },
    {
      question: t("faq.q8"),
      answer: t("faq.a8")
    }
  ];

  /**
   * Inject language-specific FAQPage schema into document <head>
   * 
   * This dynamically creates JSON-LD structured data for Google Search:
   * - When language = "en": English Q&As injected
   * - When language = "fi": Finnish Q&As injected  
   * - When language = "sv": Swedish Q&As injected
   * 
   * Benefits:
   * - FAQ rich snippets in Google Search results
   * - Questions appear directly in SERPs
   * - Better visibility and click-through rates
   * 
   * Schema auto-updates when user switches language.
   * See FAQ_SCHEMA_IMPLEMENTATION.md for details.
   */
  useFAQSchema(faqData, "main-faq-schema", {
    language: language,
    url: `https://bargn.app${location.pathname}`
  });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 max-w-7xl transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-primary">
          {t("faqHeading")}
        </h2>
        <p className="text-center text-muted-foreground text-xl mb-16">
          {t("faq.subheading")}
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem 
              key={index}
              value={`item-${index + 1}`}
              className="bg-background/60 backdrop-blur-sm border-2 border-border rounded-2xl px-6 transition-all duration-300 data-[state=open]:border-[#ef1df2] data-[state=open]:shadow-[0_0_20px_rgba(239,29,242,0.5)]"
            >
              <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground/90 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
