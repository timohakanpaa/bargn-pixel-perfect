import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BusinessSection from "@/components/BusinessSection";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px]">
        <Hero />
      <Features />
      <BusinessSection />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      
      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl md:text-7xl font-black mb-16 text-primary">
            50% OFF
          </h2>
        </div>
      </section>
      
        <Footer />
      </div>
    </div>
  );
};

export default Index;
