import Navigation from "@/components/Navigation";
import HowItWorksComponent from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/hooks/use-analytics";

const HowItWorks = () => {
  useAnalytics(); // Auto-track page view
  
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
