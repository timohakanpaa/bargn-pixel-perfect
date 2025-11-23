import { useEffect } from "react";

export const usePartnersSchema = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "partners-schema";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Bargn Partners Program",
      "description": "Join 500+ businesses partnering with Bargn. Zero commission, zero BS, just results.",
      "url": "https://bargn.app/partners",
      "mainEntity": {
        "@type": "Offer",
        "name": "Bargn Business Partnership",
        "description": "Partner with Bargn to reach thousands of customers with zero commission fees",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Bargn",
          "url": "https://bargn.app"
        },
        "itemOffered": {
          "@type": "Service",
          "name": "Business Partnership Platform",
          "description": "Zero commission platform to attract new customers with 50% discounts",
          "provider": {
            "@type": "Organization",
            "name": "Bargn"
          }
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Commission Rate",
            "value": "0%"
          },
          {
            "@type": "PropertyValue",
            "name": "Active Partners",
            "value": "500+"
          },
          {
            "@type": "PropertyValue",
            "name": "Platform Users",
            "value": "10000+"
          }
        ]
      }
    });

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("partners-schema");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
};
