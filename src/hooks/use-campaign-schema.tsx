import { useEffect } from "react";

export const useCampaignSchema = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "campaign-schema";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Bargn Creator Partnership",
      "description": "Make bank while you create. 40% revenue share for content creators and influencers.",
      "url": "https://bargn.fi/campaign",
      "mainEntity": {
        "@type": "JobPosting",
        "title": "Content Creator Partnership",
        "description": "Earn 40% revenue share by promoting Bargn to your audience. No BS, actual money.",
        "datePosted": "2024-01-01",
        "validThrough": "2025-12-31",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Bargn",
          "url": "https://bargn.fi",
          "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/SWwdRfTou4NwpSgFbdofc5xLsAp1/uploads/1763629516807-accent1.png"
        },
        "jobLocationType": "TELECOMMUTE",
        "applicantLocationRequirements": {
          "@type": "Country",
          "name": "Finland"
        },
        "employmentType": "CONTRACTOR",
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": {
            "@type": "QuantitativeValue",
            "value": "Variable",
            "unitText": "40% Revenue Share"
          }
        },
        "benefits": "40% revenue share on all referred sales, no upfront costs, flexible work schedule, real-time earnings tracking",
        "qualifications": "Active social media presence (Instagram, TikTok, or YouTube), ability to create engaging content, authentic connection with audience",
        "responsibilities": "Create authentic content featuring Bargn, share your unique referral code, engage with your audience about Bargn benefits"
      }
    });

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("campaign-schema");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
};
