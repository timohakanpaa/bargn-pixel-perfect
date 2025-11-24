import Navigation from "@/components/Navigation";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerStats from "@/components/partners/PartnerStats";
import PlatformComparison from "@/components/partners/PlatformComparison";
import PartnershipBenefits from "@/components/partners/PartnershipBenefits";
import CurrentPartners from "@/components/partners/CurrentPartners";
import PartnerTestimonials from "@/components/partners/PartnerTestimonials";
import PartnershipProcess from "@/components/partners/PartnershipProcess";
import PartnerSignup from "@/components/partners/PartnerSignup";
import PartnerCTA from "@/components/partners/PartnerCTA";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/hooks/use-analytics";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { usePartnersSchema } from "@/hooks/use-partners-schema";
import { useHreflang } from "@/hooks/use-hreflang";
import { useLanguage } from "@/contexts/LanguageContext";

const Partners = () => {
  const { t } = useLanguage();
  
  useAnalytics(); // Auto-track page view
  useBreadcrumbSchema();
  usePartnersSchema();
  useHreflang(["en", "fi", "sv"]); // Multi-language SEO
  useMetaTags({
    title: t("partners.hero.headline1") + " | Bargn Partners",
    description: t("partners.hero.body"),
    ogTitle: t("partners.hero.headline1") + " | Bargn Partners",
    ogDescription: t("partners.hero.body"),
    twitterTitle: t("partners.hero.headline1") + " | Bargn Partners",
    twitterDescription: t("partners.hero.body"),
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px]">
        <PartnerHero />
      <PartnerStats />
      <PlatformComparison />
      <PartnershipBenefits />
      <CurrentPartners />
      <PartnerTestimonials />
      <PartnershipProcess />
      <PartnerSignup />
        <PartnerCTA />
        <Footer />
      </div>
    </div>
  );
};

export default Partners;
