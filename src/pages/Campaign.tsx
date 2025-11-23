import Navigation from "@/components/Navigation";
import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignTestimonial from "@/components/campaign/CampaignTestimonial";
import CampaignStats from "@/components/campaign/CampaignStats";
import CampaignAbout from "@/components/campaign/CampaignAbout";
import CampaignCommission from "@/components/campaign/CampaignCommission";
import CampaignProcess from "@/components/campaign/CampaignProcess";
import CampaignFAQ from "@/components/campaign/CampaignFAQ";
import CampaignCTA from "@/components/campaign/CampaignCTA";
import Footer from "@/components/Footer";

const Campaign = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px]">
        <CampaignHero />
      <CampaignTestimonial />
      <CampaignStats />
      <CampaignAbout />
      <CampaignCommission />
      <CampaignProcess />
      <CampaignFAQ />
        <CampaignCTA />
        <Footer />
      </div>
    </div>
  );
};

export default Campaign;
