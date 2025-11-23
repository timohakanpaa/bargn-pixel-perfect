import { useEffect } from "react";

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToSchemaData {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration format (e.g., "PT10M" for 10 minutes)
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[];
  tool?: string[];
  steps: HowToStep[];
  image?: string;
}

export const useHowToSchema = (data: HowToSchemaData) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": data.name,
      "description": data.description,
      "totalTime": data.totalTime,
      "estimatedCost": data.estimatedCost,
      "supply": data.supply,
      "tool": data.tool,
      "image": data.image,
      "step": data.steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "image": step.image,
        "url": step.url
      }))
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'howto-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById('howto-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data]);
};
