import { useEffect } from "react";

export interface OfferSchemaData {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  availability: string; // https://schema.org/ItemAvailability
  validFrom?: string; // ISO 8601 date
  validThrough?: string; // ISO 8601 date
  url: string;
  seller: {
    name: string;
    url: string;
  };
  itemOffered?: {
    name: string;
    description: string;
  };
  eligibleRegion?: string;
  priceValidUntil?: string;
}

export const useOfferSchema = (offers: OfferSchemaData[]) => {
  useEffect(() => {
    // Create a Service schema with multiple offers
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Membership Service",
      "name": "Bargn Membership",
      "description": "AI-powered membership for 50% discounts at restaurants, bars, and gyms in Helsinki",
      "provider": {
        "@type": "Organization",
        "name": "Bargn",
        "url": "https://bargn.app"
      },
      "areaServed": {
        "@type": "City",
        "name": "Helsinki",
        "addressCountry": "FI"
      },
      "offers": offers.map(offer => ({
        "@type": "Offer",
        "name": offer.name,
        "description": offer.description,
        "price": offer.price,
        "priceCurrency": offer.priceCurrency,
        "availability": offer.availability,
        "validFrom": offer.validFrom,
        "validThrough": offer.validThrough,
        "url": offer.url,
        "seller": {
          "@type": "Organization",
          "name": offer.seller.name,
          "url": offer.seller.url
        },
        "itemOffered": offer.itemOffered ? {
          "@type": "Service",
          "name": offer.itemOffered.name,
          "description": offer.itemOffered.description
        } : undefined,
        "eligibleRegion": offer.eligibleRegion ? {
          "@type": "Country",
          "name": offer.eligibleRegion
        } : undefined,
        "priceValidUntil": offer.priceValidUntil
      }))
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'offer-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById('offer-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [offers]);
};
