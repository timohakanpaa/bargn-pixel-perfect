import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
// Lazy load below-the-fold components for better performance
import { lazy, Suspense } from "react";

const Features = lazy(() => import("@/components/Features"));
const BusinessSection = lazy(() => import("@/components/BusinessSection"));
const Pricing = lazy(() => import("@/components/Pricing"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Footer = lazy(() => import("@/components/Footer"));
import { useAnalytics } from "@/hooks/use-analytics";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";
import { useAggregateRatingSchema } from "@/hooks/use-aggregate-rating-schema";
import { useSoftwareAppSchema } from "@/hooks/use-software-app-schema";
import { useLocalBusinessSchema } from "@/hooks/use-local-business-schema";
import { useHreflang } from "@/hooks/use-hreflang";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useLanguage } from "@/contexts/LanguageContext";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { LazyLoadSection } from "@/hooks/use-lazy-load";

// Loading placeholder component
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  const { t } = useLanguage();
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  
  // Trigger welcome confetti on mount
  useEffect(() => {
    if (!hasTriggeredConfetti) {
      setTimeout(() => {
        triggerWelcomeConfetti();
        setHasTriggeredConfetti(true);
      }, 1000);
    }
  }, [hasTriggeredConfetti]);

  const triggerWelcomeConfetti = () => {
    const duration = 2500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
        colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
        colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
      });
    }, 250);
  };
  
  useAnalytics(); // Auto-track page view
  useBreadcrumbSchema();
  useAggregateRatingSchema();
  useHreflang(["en", "fi", "sv"]); // Multi-language SEO
  
  useMetaTags({
    title: t("heroHeadline") + " | Bargn",
    description: t("heroText"),
    ogTitle: t("heroHeadline") + " | Bargn",
    ogDescription: t("heroText"),
    twitterTitle: t("heroHeadline") + " | Bargn",
    twitterDescription: t("heroText"),
  });
  
  // Inject LocalBusiness schema for AI platforms
  useLocalBusinessSchema({
    name: "Bargn",
    description: "AI-powered discount membership platform offering 50% off at restaurants, bars, gyms, and spas in Helsinki. Smart spending made simple with personalized recommendations.",
    address: {
      streetAddress: "Mannerheimintie 12",
      addressLocality: "Helsinki",
      addressRegion: "Uusimaa",
      postalCode: "00100",
      addressCountry: "FI"
    },
    geo: {
      latitude: 60.1699,
      longitude: 24.9384
    },
    email: "hello@bargn.app",
    priceRange: "€€",
    openingHours: ["Mo-Su 00:00-24:00"],
    paymentAccepted: ["Credit Card", "Debit Card", "Mobile Payment"],
    currenciesAccepted: ["EUR"]
  });
  
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
      <Navigation />
      <div className="pt-[132px]">
        <Hero />
        
        {/* Lazy load below-the-fold components with intersection observer */}
        <LazyLoadSection fallback={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Features />
          </Suspense>
        </LazyLoadSection>
        
        <LazyLoadSection fallback={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <BusinessSection />
          </Suspense>
        </LazyLoadSection>
        
        <LazyLoadSection fallback={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Pricing />
          </Suspense>
        </LazyLoadSection>
        
        <LazyLoadSection fallback={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
        </LazyLoadSection>
        
        <LazyLoadSection fallback={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <FAQ />
          </Suspense>
        </LazyLoadSection>
        
        {/* Final CTA */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-6xl md:text-7xl font-black mb-16 text-primary">
              50% OFF
            </h2>
          </div>
        </section>
        
        <LazyLoadSection fallback={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </LazyLoadSection>
      </div>
    </div>
  );
};

export default Index;
