import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    members: "Members",
    partners: "Partners",
    howItWorks: "How It Works",
    about: "About",
    blog: "Blog",
    campaign: "Campaign",
    letsGo: "Let's Go",
    updateBanner: "Website is under update",
    heroHeadline: "50% Off Everything",
    heroSubhead: "AI-powered discounts that actually work",
    heroText: "Join thousands who've cracked the code to smart spending.",
    heroDiscountRate: "Discount Rate",
    heroPartners: "Partners",
    heroSaved: "Saved",
    partnerUp: "Partner Up (We're Cool Like That)",
  },
  fi: {
    home: "Koti",
    members: "Jäsenet",
    partners: "Kumppanit",
    howItWorks: "Miten Se Toimii",
    about: "Tietoa",
    blog: "Blogi",
    campaign: "Kampanja",
    letsGo: "Aloitetaan",
    updateBanner: "Verkkosivusto päivitetään",
    heroHeadline: "50% Alennus Kaikesta",
    heroSubhead: "AI-vetoisia alennuksia jotka oikeesti toimii",
    heroText: "Liity tuhansien joukkoon jotka on crackannu koodin fiksun kuluttamisen.",
    heroDiscountRate: "Alennusprosentti",
    heroPartners: "Kumppania",
    heroSaved: "Säästetty",
    partnerUp: "Kumppani (Ollaan Cooli Sillä Tavalla)",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
