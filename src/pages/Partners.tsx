import Navigation from "@/components/Navigation";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerStats from "@/components/partners/PartnerStats";
import PartnershipBenefits from "@/components/partners/PartnershipBenefits";
import CurrentPartners from "@/components/partners/CurrentPartners";
import PartnerTestimonials from "@/components/partners/PartnerTestimonials";
import PartnershipProcess from "@/components/partners/PartnershipProcess";
import PartnerSignup from "@/components/partners/PartnerSignup";
import PartnerCTA from "@/components/partners/PartnerCTA";
import Footer from "@/components/Footer";

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PartnerHero />
      <PartnerStats />
      <PartnershipBenefits />
      <CurrentPartners />
      <PartnerTestimonials />
      <PartnershipProcess />
      <PartnerSignup />
      <PartnerCTA />
      <Footer />
    </div>
  );
};

export default Partners;
