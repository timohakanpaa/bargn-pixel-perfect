import Navigation from "@/components/Navigation";
import HowItWorksComponent from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/hooks/use-analytics";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";
import { useHowToSchema } from "@/hooks/use-howto-schema";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  useAnalytics(); // Auto-track page view
  useBreadcrumbSchema();
  const { t } = useLanguage();
  
  // Inject HowTo schema for SEO
  useHowToSchema({
    name: "How to Start Saving Money with Bargn",
    description: "Learn how to use Bargn app to get 50% discounts at restaurants, bars, and gyms in Helsinki. Simple 5-step process from download to savings.",
    totalTime: "PT10M", // 10 minutes total
    estimatedCost: {
      currency: "EUR",
      value: "8.80"
    },
    supply: ["Smartphone", "Internet connection"],
    tool: ["Bargn mobile app"],
    image: "https://storage.googleapis.com/gpt-engineer-file-uploads/SWwdRfTou4NwpSgFbdofc5xLsAp1/uploads/1763629516807-accent1.png",
    steps: [
      {
        name: t("how.step1.title"),
        text: `${t("how.step1.description")} ${t("how.step1.bullet1")} ${t("how.step1.bullet2")}`,
        url: "https://bargn.app/how-it-works#step-1"
      },
      {
        name: t("how.step2.title"),
        text: `${t("how.step2.description")} ${t("how.step2.bullet1")} ${t("how.step2.bullet2")}`,
        url: "https://bargn.app/how-it-works#step-2"
      },
      {
        name: t("how.step3.title"),
        text: `${t("how.step3.description")} ${t("how.step3.bullet1")} ${t("how.step3.bullet2")}`,
        url: "https://bargn.app/how-it-works#step-3"
      },
      {
        name: t("how.step4.title"),
        text: `${t("how.step4.description")} ${t("how.step4.bullet1")} ${t("how.step4.bullet2")}`,
        url: "https://bargn.app/how-it-works#step-4"
      },
      {
        name: t("how.step5.title"),
        text: `${t("how.step5.description")} ${t("how.step5.bullet1")} ${t("how.step5.bullet2")}`,
        url: "https://bargn.app/how-it-works#step-5"
      }
    ]
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px]">
        <HowItWorksComponent />
        <Footer />
      </div>
    </div>
  );
};

export default HowItWorks;
