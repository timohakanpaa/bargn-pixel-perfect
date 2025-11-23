import Navigation from "@/components/Navigation";
import HowItWorksComponent from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const HowItWorks = () => {
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
