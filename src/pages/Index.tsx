import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BusinessSection from "@/components/BusinessSection";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { useAnalytics } from "@/hooks/use-analytics";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";
import { useAggregateRatingSchema } from "@/hooks/use-aggregate-rating-schema";
import { useSoftwareAppSchema } from "@/hooks/use-software-app-schema";

const Index = () => {
  useAnalytics(); // Auto-track page view
  useBreadcrumbSchema();
  useAggregateRatingSchema();
  
  // Inject SoftwareApplication schema for mobile app
  useSoftwareAppSchema({
    name: "Bargn - 50% Off Everything",
    description: "AI-powered membership app for 50% discounts at restaurants, bars, gyms, and spas in Helsinki. Get personalized recommendations and unlimited savings.",
    operatingSystem: ["iOS 13.0 or later", "Android 8.0 or later"],
    applicationCategory: "LifestyleApplication",
    aggregateRating: {
      ratingValue: 5.0,
      reviewCount: 10000,
      bestRating: 5,
      worstRating: 5
    },
    offers: {
      price: "8.80",
      priceCurrency: "EUR"
    },
    screenshot: [
      "https://storage.googleapis.com/gpt-engineer-file-uploads/SWwdRfTou4NwpSgFbdofc5xLsAp1/social-images/social-1763629445250-color.png"
    ],
    downloadUrl: {
      ios: "https://apps.apple.com/app/bargn",
      android: "https://play.google.com/store/apps/details?id=fi.bargn.app"
    },
    softwareVersion: "2.0.0",
    releaseNotes: "Enhanced AI recommendations, improved UI/UX, faster performance, and new partner venues.",
    fileSize: "50MB",
    contentRating: "Everyone"
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Preloader />
      <Navigation />
      <div className="pt-[132px]">
        <Hero />
      <Features />
      <BusinessSection />
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
