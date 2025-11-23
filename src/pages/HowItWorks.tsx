import Navigation from "@/components/Navigation";
import HowItWorksComponent from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/hooks/use-analytics";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";

const HowItWorks = () => {
  useAnalytics(); // Auto-track page view
  useBreadcrumbSchema();
  
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
