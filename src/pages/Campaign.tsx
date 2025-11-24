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
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useCampaignSchema } from "@/hooks/use-campaign-schema";
import { useHreflang } from "@/hooks/use-hreflang";
import { useLanguage } from "@/contexts/LanguageContext";

const Campaign = () => {
  const { t } = useLanguage();
  
  useAnalytics(); // Auto-track page view
  useBreadcrumbSchema();
  useCampaignSchema();
  useHreflang(["en", "fi", "sv"]); // Multi-language SEO
  useMetaTags({
    title: t("campaign.hero.headline") + " | Bargn Creators",
    description: t("campaign.hero.description"),
    ogTitle: t("campaign.hero.headline") + " | Bargn Creators",
    ogDescription: t("campaign.hero.description"),
    twitterTitle: t("campaign.hero.headline") + " | Bargn Creators",
    twitterDescription: t("campaign.hero.description"),
  });
  
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
