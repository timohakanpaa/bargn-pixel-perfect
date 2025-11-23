import { useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export const useFAQSchema = (faqItems: FAQItem[], schemaId: string = "faq-schema") => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = schemaId;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(schemaId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [faqItems, schemaId]);
};
