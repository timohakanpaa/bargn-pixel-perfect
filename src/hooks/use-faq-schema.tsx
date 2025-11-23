import { useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaOptions {
  language?: string;
  url?: string;
}

export const useFAQSchema = (
  faqItems: FAQItem[], 
  schemaId: string = "faq-schema",
  options?: FAQSchemaOptions
) => {
  useEffect(() => {
    // Remove existing schema first
    const existingScript = document.getElementById(schemaId);
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Create new schema with language metadata
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = schemaId;
    
    const schema: any = {
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
    };

    // Add language metadata if provided
    if (options?.language) {
      schema.inLanguage = options.language;
    }

    // Add URL if provided
    if (options?.url) {
      schema.url = options.url;
    }

    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(schemaId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [faqItems, schemaId, options?.language, options?.url]);
};
