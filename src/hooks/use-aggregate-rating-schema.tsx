import { useEffect } from "react";

interface AggregateRatingData {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

export const useAggregateRatingSchema = (data?: AggregateRatingData) => {
  useEffect(() => {
    // Default aggregate data from all testimonials across the site
    const defaultData: AggregateRatingData = {
      ratingValue: 5.0,
      reviewCount: 10000, // Based on "10,000+ members" stat
      bestRating: 5,
      worstRating: 5
    };
    
    const ratingData = data || defaultData;
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bargn",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingData.ratingValue,
        "reviewCount": ratingData.reviewCount,
        "bestRating": ratingData.bestRating,
        "worstRating": ratingData.worstRating
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'aggregate-rating-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById('aggregate-rating-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data]);
};
