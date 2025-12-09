import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { useGoogleAnalytics } from "@/hooks/use-google-analytics";
import { useFacebookPixel } from "@/hooks/use-facebook-pixel";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";
import { useWebVitals } from "@/hooks/use-web-vitals";
import { lazy, Suspense } from "react";

// Lazy load components for better initial load performance
const Index = lazy(() => import("./pages/Index"));
const Members = lazy(() => import("./pages/Members"));
const Partners = lazy(() => import("./pages/Partners"));
const Campaign = lazy(() => import("./pages/Campaign"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const Auth = lazy(() => import("./pages/Auth"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Funnels = lazy(() => import("./pages/Funnels"));
const Performance = lazy(() => import("./pages/Performance"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppContent = () => {
  const consent = useCookieConsent();
  const hasAnalyticsConsent = consent?.analytics ?? false;
  const hasMarketingConsent = consent?.marketing ?? false;

  // Load Google Analytics based on consent
  useGoogleAnalytics(hasAnalyticsConsent);
  
  // Load Facebook Pixel based on consent
  useFacebookPixel(hasMarketingConsent);
  
  // Load TikTok Pixel based on consent
  useTikTokPixel(hasMarketingConsent);
  
  // Track Core Web Vitals for performance monitoring
  useWebVitals();

  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/members" element={<Members />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/admin" element={<BlogAdmin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/funnels" element={<Funnels />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CookieConsent />
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
