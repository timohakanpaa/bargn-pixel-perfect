import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import UpdateBanner from "@/components/UpdateBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { to: "/", label: t("home") },
    { to: "/members", label: t("members") },
    { to: "/partners", label: t("partners") },
    { to: "/how-it-works", label: t("howItWorks") },
    { to: "/about", label: t("about") },
    { to: "/blog", label: t("blog") },
    { to: "/campaign", label: t("campaign") },
  ];
  
  return (
    <>
      <UpdateBanner />
      <nav className="fixed top-[52px] left-0 right-0 z-[100] bg-glass backdrop-blur-2xl border-b border-glass">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-coral-purple rounded-2xl flex items-center justify-center shadow-glow-coral">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">%</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Bargn</h1>
              <p className="text-xs text-muted-foreground">Discover. Save. Repeat</p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <NavLink 
                key={item.to}
                to={item.to} 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                activeClassName="text-primary font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-glass backdrop-blur-xl border border-glass rounded-full px-4 py-2">
              <button 
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${
                  language === "en" 
                    ? "bg-accent text-accent-foreground shadow-glow-yellow" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button 
                onClick={() => setLanguage("fi")}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${
                  language === "fi" 
                    ? "bg-accent text-accent-foreground shadow-glow-yellow" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FI
              </button>
            </div>
            <Button variant="ghost" size="icon" className="text-foreground hover:shadow-glow-coral">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:shadow-glow-coral">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="neon" className="rounded-full px-6">
              {t("letsGo")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[150]"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-[108px] right-0 bottom-0 w-full sm:w-96 bg-background/95 backdrop-blur-2xl z-[200] border-l border-glass overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Language Toggle - Mobile */}
              <div className="flex items-center justify-center gap-2 bg-glass backdrop-blur-xl border-2 border-glass rounded-full p-2">
                <button 
                  onClick={() => setLanguage("en")}
                  className={`flex-1 px-4 py-3 rounded-full text-base font-bold transition-all ${
                    language === "en" 
                      ? "bg-accent text-accent-foreground shadow-glow-yellow" 
                      : "text-muted-foreground"
                  }`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage("fi")}
                  className={`flex-1 px-4 py-3 rounded-full text-base font-bold transition-all ${
                    language === "fi" 
                      ? "bg-accent text-accent-foreground shadow-glow-yellow" 
                      : "text-muted-foreground"
                  }`}
                >
                  FI
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={item.to}
                      className="flex items-center px-4 py-4 text-lg font-medium text-foreground hover:bg-glass rounded-xl transition-all"
                      activeClassName="bg-glass text-primary font-bold border-l-4 border-primary"
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="space-y-3 pt-6 border-t border-glass">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-foreground hover:bg-glass"
                  size="lg"
                >
                  <Search className="w-5 h-5 mr-3" />
                  Search
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-foreground hover:bg-glass"
                  size="lg"
                >
                  <User className="w-5 h-5 mr-3" />
                  Account
                </Button>
                <Button 
                  variant="neon" 
                  className="w-full rounded-full shadow-[0_0_25px_rgba(255,220,74,0.7)]"
                  size="lg"
                >
                  {t("letsGo")}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default Navigation;
