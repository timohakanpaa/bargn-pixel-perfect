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
