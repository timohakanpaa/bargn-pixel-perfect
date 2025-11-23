import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ChatWidget from "@/components/ChatWidget";
import CookieConsent from "@/components/CookieConsent";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { useGoogleAnalytics } from "@/hooks/use-google-analytics";
import Index from "./pages/Index";
import Members from "./pages/Members";
import Partners from "./pages/Partners";
import Campaign from "./pages/Campaign";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogAdmin from "./pages/BlogAdmin";
import ChatAnalytics from "./pages/ChatAnalytics";
import Analytics from "./pages/Analytics";
import Funnels from "./pages/Funnels";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const consent = useCookieConsent();
  const hasAnalyticsConsent = consent?.analytics ?? false;

  // Load Google Analytics based on consent
  useGoogleAnalytics(hasAnalyticsConsent);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/members" element={<Members />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/admin" element={<BlogAdmin />} />
        <Route path="/analytics/chat" element={<ChatAnalytics />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/funnels" element={<Funnels />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatWidget />
      <CookieConsent />
    </>
  );
};

const App = () => (
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

export default App;
