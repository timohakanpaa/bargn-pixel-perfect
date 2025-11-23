import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface HreflangTag {
  lang: string;
  href: string;
}

/**
 * Hook to inject hreflang tags for multi-language SEO
 * Critical for AI crawlers to understand language/regional variations
 */
export const useHreflang = (supportedLanguages: string[] = ["en", "fi", "sv"]) => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = "https://bargn.app";
    const currentPath = location.pathname;

    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Add hreflang tags for each supported language
    supportedLanguages.forEach(lang => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      link.href = `${baseUrl}${currentPath}?lang=${lang}`;
      document.head.appendChild(link);
    });

    // Add x-default for default language fallback
    const defaultLink = document.createElement("link");
    defaultLink.rel = "alternate";
    defaultLink.hreflang = "x-default";
    defaultLink.href = `${baseUrl}${currentPath}`;
    document.head.appendChild(defaultLink);

    // Add canonical tag
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${baseUrl}${currentPath}`;
    
    // Remove existing canonical
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    document.head.appendChild(canonical);

    // Add language meta tag
    const htmlLang = document.documentElement.getAttribute("lang");
    if (!htmlLang) {
      document.documentElement.setAttribute("lang", "en");
    }

    // Cleanup function
    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, [location.pathname, supportedLanguages]);
};

/**
 * Helper to generate structured hreflang data for AI platforms
 */
export const generateHreflangSchema = (currentPath: string, languages: string[]) => {
  const baseUrl = "https://bargn.app";
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `${baseUrl}${currentPath}`,
    "inLanguage": languages.map(lang => ({
      "@type": "Language",
      "name": getLanguageName(lang),
      "alternateName": lang
    })),
    "workTranslation": languages.map(lang => ({
      "@type": "WebPage",
      "url": `${baseUrl}${currentPath}?lang=${lang}`,
      "inLanguage": lang
    }))
  };
};

const getLanguageName = (code: string): string => {
  const names: Record<string, string> = {
    "en": "English",
    "fi": "Finnish",
    "sv": "Swedish",
    "no": "Norwegian",
    "da": "Danish",
    "de": "German",
    "fr": "French",
    "es": "Spanish"
  };
  return names[code] || code;
};
