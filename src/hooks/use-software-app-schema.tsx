import { useEffect } from "react";

export interface SoftwareAppSchemaData {
  name: string;
  description: string;
  operatingSystem: string[];
  applicationCategory: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  offers?: {
    price: string;
    priceCurrency: string;
  };
  screenshot?: string[];
  downloadUrl?: {
    ios?: string;
    android?: string;
  };
  softwareVersion?: string;
  releaseNotes?: string;
  fileSize?: string;
  contentRating?: string;
}

export const useSoftwareAppSchema = (data: SoftwareAppSchemaData) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": data.name,
      "description": data.description,
      "operatingSystem": data.operatingSystem.join(", "),
      "applicationCategory": data.applicationCategory,
      "aggregateRating": data.aggregateRating ? {
        "@type": "AggregateRating",
        "ratingValue": data.aggregateRating.ratingValue,
        "reviewCount": data.aggregateRating.reviewCount,
        "bestRating": data.aggregateRating.bestRating,
        "worstRating": data.aggregateRating.worstRating
      } : undefined,
      "offers": data.offers ? {
        "@type": "Offer",
        "price": data.offers.price,
        "priceCurrency": data.offers.priceCurrency
      } : undefined,
      "screenshot": data.screenshot,
      "downloadUrl": [
        data.downloadUrl?.ios,
        data.downloadUrl?.android
      ].filter(Boolean),
      "softwareVersion": data.softwareVersion,
      "releaseNotes": data.releaseNotes,
      "fileSize": data.fileSize,
      "contentRating": data.contentRating,
      "author": {
        "@type": "Organization",
        "name": "Bargn",
        "url": "https://bargn.fi"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Bargn",
        "url": "https://bargn.fi",
        "logo": {
          "@type": "ImageObject",
          "url": "https://storage.googleapis.com/gpt-engineer-file-uploads/SWwdRfTou4NwpSgFbdofc5xLsAp1/uploads/1763629516807-accent1.png"
        }
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'software-app-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById('software-app-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data]);
};
