import { useEffect } from "react";

export interface LocalBusinessSchemaData {
  name: string;
  description: string;
  image?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  email?: string;
  priceRange?: string;
  openingHours?: string[];
  paymentAccepted?: string[];
  currenciesAccepted?: string[];
}

export const useLocalBusinessSchema = (data: LocalBusinessSchemaData) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": data.name,
      "description": data.description,
      "url": "https://bargn.app",
      "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/SWwdRfTou4NwpSgFbdofc5xLsAp1/uploads/1763629516807-accent1.png",
      "image": data.image || "https://storage.googleapis.com/gpt-engineer-file-uploads/SWwdRfTou4NwpSgFbdofc5xLsAp1/social-images/social-1763629445250-color.png",
      "address": data.address ? {
        "@type": "PostalAddress",
        "streetAddress": data.address.streetAddress,
        "addressLocality": data.address.addressLocality,
        "addressRegion": data.address.addressRegion,
        "postalCode": data.address.postalCode,
        "addressCountry": data.address.addressCountry
      } : undefined,
      "geo": data.geo ? {
        "@type": "GeoCoordinates",
        "latitude": data.geo.latitude,
        "longitude": data.geo.longitude
      } : undefined,
      "telephone": data.telephone,
      "email": data.email,
      "priceRange": data.priceRange,
      "openingHours": data.openingHours,
      "paymentAccepted": data.paymentAccepted,
      "currenciesAccepted": data.currenciesAccepted,
      "hasMap": data.geo ? `https://www.google.com/maps?q=${data.geo.latitude},${data.geo.longitude}` : undefined,
      "sameAs": [
        "https://www.instagram.com/bargn_app?igsh=ODhtd2MzaWl5YnZy&utm_source=qr",
        "https://www.tiktok.com/@bargn_app?_t=8pRBdfvjZcP&_r=1",
        "https://www.linkedin.com/company/bargn"
      ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'local-business-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById('local-business-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data]);
};
