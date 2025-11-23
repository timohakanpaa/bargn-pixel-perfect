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

const Partners = () => {
  useAnalytics(); // Auto-track page view
  useBreadcrumbSchema();
  usePartnersSchema();
  useHreflang(["en", "fi", "sv"]); // Multi-language SEO
  useMetaTags({
    title: "Bargn Partners - 500+ Businesses Can't Be Wrong",
    description: "While your competitors are still paying hefty commissions, our partners are laughing all the way to the bank. Zero commission. Zero BS. Just results.",
    ogTitle: "Bargn Partners - 500+ Businesses Can't Be Wrong",
    ogDescription: "While your competitors are still paying hefty commissions, our partners are laughing all the way to the bank. Zero commission. Zero BS. Just results.",
    twitterTitle: "Bargn Partners - 500+ Businesses Can't Be Wrong",
    twitterDescription: "While your competitors are still paying hefty commissions, our partners are laughing all the way to the bank. Zero commission. Zero BS. Just results.",
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
