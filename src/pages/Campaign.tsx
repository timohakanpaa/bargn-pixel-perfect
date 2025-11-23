import Navigation from "@/components/Navigation";
import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignStats from "@/components/campaign/CampaignStats";
import CampaignGoldRush from "@/components/campaign/CampaignGoldRush";
import CampaignMoneyTalk from "@/components/campaign/CampaignMoneyTalk";
import CampaignTestimonial from "@/components/campaign/CampaignTestimonial";
import CampaignContentIdeas from "@/components/campaign/CampaignContentIdeas";
import CampaignRequirements from "@/components/campaign/CampaignRequirements";
import CampaignProcess from "@/components/campaign/CampaignProcess";
import CampaignFAQ from "@/components/campaign/CampaignFAQ";
import CampaignCTA from "@/components/campaign/CampaignCTA";
import Footer from "@/components/Footer";
import CampaignFloatingCTA from "@/components/campaign/CampaignFloatingCTA";
import { useAnalytics } from "@/hooks/use-analytics";

const Campaign = () => {
  useAnalytics(); // Auto-track page view
  
  return (
    <div className="min-h-screen bg-background-dark">
      <Navigation />
      <div className="pt-[132px]">
        <CampaignHero />
        <CampaignStats />
        <CampaignGoldRush />
        <CampaignMoneyTalk />
        <CampaignTestimonial />
        <CampaignContentIdeas />
        <CampaignRequirements />
        <CampaignProcess />
        <CampaignFAQ />
        <CampaignCTA />
        <Footer />
        <CampaignFloatingCTA />
      </div>
    </div>
  );
};

export default Campaign;
