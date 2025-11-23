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
    // Members page
    membersHero: "Join 10K+ Legends Who",
    membersHeroSub: "Never Pay Sucker Prices",
    membersHeroDesc: "Welcome to the club where paying full price is basically illegal. Our AI is literally smarter than your ex and finds you deals that'll make your wallet do a happy dance.",
    startSaving: "Start Saving Now",
    becomePartner: "Become a Partner",
    happyMembers: "Happy Members",
    avgSavings: "Average Savings",
    avgAnnualSavings: "Avg Annual Savings",
    partnerOutlets: "Partner Outlets",
    whyLoveUs: "Why You'll Love Us",
    perksThatSlap: "Perks That Actually Slap",
    perksDesc: "We're not just another discount app - we're your financial wingman with benefits that pay for themselves faster than you can say 'broke no more'.",
    unlimitedDiscounts: "Unlimited 'Hell Yeah' Discounts",
    unlimitedDiscountsDesc: "500+ spots where you flex that 50% savings like the financial genius you are",
    aiNotDumb: "AI That's Not Dumb",
    aiNotDumbDesc: "Unlike other apps, our AI actually reads the room and serves recommendations that don't suck",
    vipTreatment: "VIP Treatment (For Real)",
    vipTreatmentDesc: "Cut the line, skip the peasants, get first access to the good stuff before it's cool",
    supportDamn: "Support That Gives a Damn",
    supportDamnDesc: "Real humans who actually solve problems instead of copy-pasting 'have you tried turning it off'",
    pricingTitle: "Pricing That Won't Rob You",
    pricingDesc: "Two options: save money monthly or save even more money yearly. Either way, you're winning at life.",
    monthlyFlex: "Monthly Flex",
    annualPower: "Annual Power Move",
    bestValue: "Best Value",
    perMonth: "/month",
    perYear: "/year",
    saveAnnually: "Save €52.6 annually",
    joinNow: "Join Now",
    cancelAnytime: "Cancel anytime",
    monthsFree: "2 months FREE bonus",
    bothPlans: "Both plans include:",
    bothPlansDesc: "All premium features, unlimited discounts, AI recommendations, priority support, and access to exclusive partners.",
    noHiddenFees: "No hidden fees • Cancel anytime • 30-day money-back guarantee",
    memberStories: "Member Stories",
    realMembers: "Real Members, Real Savings",
    realMembersDesc: "See how our community is saving thousands while living their best life.",
    exclusiveFeatures: "Exclusive Features",
    membersOnlyPerks: "Members-Only Perks",
    membersOnlyPerksDesc: "Access features that regular users can only dream about.",
    earlyAccess: "Early Access to New Partners",
    earlyAccessDesc: "Be the first to discover new restaurants, shops, and services before they're available to the public",
    exclusiveEvents: "Exclusive Member Events",
    exclusiveEventsDesc: "VIP events, networking opportunities, and special experiences designed just for our community",
    limitedOffers: "Limited-Time Member Offers",
    limitedOffersDesc: "Flash sales, bonus discounts, and seasonal promotions exclusive to members",
    faqTitle: "FAQ",
    faqHeading: "Got Questions? We Got Answers",
    faqQ1: "Can I bail if I want?",
    faqA1: "Duh! Cancel whenever you want, no guilt trips or weird exit surveys. We're not your clingy ex.",
    faqQ2: "How does this magic work?",
    faqA2: "Flash that Bargn membership like the VIP you are. Boom - 50% off instantly. No coupons, no hassle, no cap.",
    faqQ3: "Am I trapped in a contract?",
    faqA3: "Hell no! We're not a gym membership. Month-to-month or yearly - your choice. Cancel whenever, we'll still be friends.",
    ctaHeading: "Ready to Graduate From Broke?",
    ctaDesc: "Join the club where paying full price is for beginners. Your future self (and bank account) will literally thank you.",
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
    // Members page
    membersHero: "Liity 10K+ Legendaan",
    membersHeroSub: "Ei Ikinä Maksa Mulkku Hintoja",
    membersHeroDesc: "Tervetuloa klubiin missä täyden hinnan maksaminen on periaatteessa laitonta. Meidän AI on kirjaimellisesti fiksumpi kun sun ex ja löytää sulle diilejä jotka saa sun lompakon tanssimaan.",
    startSaving: "Aloita Säästäminen",
    becomePartner: "Ryhdy Kumppaniksi",
    happyMembers: "Tyytyväistä Jäsentä",
    avgSavings: "Keskisäästöt",
    avgAnnualSavings: "Keskim. Vuosisäästöt",
    partnerOutlets: "Kumppanipaikkoja",
    whyLoveUs: "Miksi Rakastut Meihin",
    perksThatSlap: "Edut Jotka Oikeesti Slappaa",
    perksDesc: "Me ei olla vaan joku random alennusappi - me ollaan sun taloudellinen wingman eduilla jotka maksaa ittensä takasin nopeemmin ku ehdit sanoo 'oon rikki'.",
    unlimitedDiscounts: "Rajattomat 'Vittu Joo' Alennukset",
    unlimitedDiscountsDesc: "500+ paikkaa missä voit flexaa sitä 50% säästöö niinku se talousnero mitä oot",
    aiNotDumb: "AI Joka Ei Oo Tyhmä",
    aiNotDumbDesc: "Toisin ku muut apit, meidän AI oikeesti lukee tilanteen ja tarjoilee suosituksia jotka ei imu",
    vipTreatment: "VIP Kohtelu (Oikeesti)",
    vipTreatmentDesc: "Ohita jono, skipppaa köyhät, saat ensipääsyn parhaaseen kamaan ennenku se on coolia",
    supportDamn: "Tuki Joka Välittää",
    supportDamnDesc: "Oikeita ihmisiä jotka oikeesti ratkoo ongelmia sen sijaan et copypasteis 'ootko koittanu sammuttaa sen'",
    pricingTitle: "Hinnoittelu Joka Ei Ryöstä Sua",
    pricingDesc: "Kaks vaihtoehtoo: säästä rahaa kuukausittain tai säästä vielä enemmän vuosittain. Kumminki voitat elämässä.",
    monthlyFlex: "Kuukausittainen Flexaus",
    annualPower: "Vuosittainen Power Move",
    bestValue: "Paras Tarjous",
    perMonth: "/kk",
    perYear: "/vuosi",
    saveAnnually: "Säästä €52.6 vuodessa",
    joinNow: "Liity Nyt",
    cancelAnytime: "Peruuta koska vaan",
    monthsFree: "2 kuukautta ILMAISEKS bonuksena",
    bothPlans: "Molemmat suunnitelmat sisältää:",
    bothPlansDesc: "Kaikki premium ominaisuudet, rajattomat alennukset, AI suositukset, priority tuki, ja pääsy eksklusiivisiin kumppaneihin.",
    noHiddenFees: "Ei piilomaksuja • Peruuta koska vaan • 30 päivän rahat takas -takuu",
    memberStories: "Jäsentarinoita",
    realMembers: "Oikeita Jäseniä, Oikeita Säästöjä",
    realMembersDesc: "Katso miten meidän yhteisö säästää tuhansia samalla ku elää parasta elämäänsä.",
    exclusiveFeatures: "Eksklusiiviset Ominaisuudet",
    membersOnlyPerks: "Vain Jäsenille -Edut",
    membersOnlyPerksDesc: "Pääsy ominaisuuksiin joista tavalliset käyttäjät voi vaan unelmoida.",
    earlyAccess: "Ennakko-oikeus Uusiin Kumppaneihin",
    earlyAccessDesc: "Ole eka joka löytää uudet ravintolat, kaupat ja palvelut ennenku ne on julkisesti saatavilla",
    exclusiveEvents: "Eksklusiiviset Jäsentapahtumat",
    exclusiveEventsDesc: "VIP tapahtumat, verkostoitumismahdollisuudet ja erikoiskokemuksia suunniteltu vaan meidän yhteisölle",
    limitedOffers: "Rajoitetun Ajan Jäsentarjoukset",
    limitedOffersDesc: "Flash myynti, bonusalennukset ja kausi-kampanjat vaan jäsenille",
    faqTitle: "UKK",
    faqHeading: "Sul On Kysymyksiä? Meil On Vastauksia",
    faqQ1: "Voinks bailaa jos haluan?",
    faqA1: "Duh! Peruuta koska vaan, ei syyllisyysrippei tai outoja exit kyselyjä. Me ei olla sun tahmee ex.",
    faqQ2: "Miten tää taika toimii?",
    faqA2: "Flashaa toi Bargn jäsenyys niinku se VIP mitä oot. Boom - 50% alennust heti. Ei kuponkeja, ei häslingii, ei cap.",
    faqQ3: "Olenko loukkus sopimuksessa?",
    faqA3: "Helvetti ei! Me ei olla kuntosalijäsenyys. Kuukausittain tai vuosittain - sun valinta. Peruuta milloin vaan, ollaan silti kavereita.",
    ctaHeading: "Valmiina Valmistumaan Köyhyydestä?",
    ctaDesc: "Liity klubiin missä täyden hinnan maksaminen on aloittelijoille. Sun tuleva minä (ja pankkitili) kiittää sua kirjaimellisesti.",
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
