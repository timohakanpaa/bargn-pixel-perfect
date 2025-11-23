import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import UpdateBanner from "@/components/UpdateBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  
  return (
    <>
      <UpdateBanner />
      <nav className="fixed top-[52px] left-0 right-0 z-[100] bg-glass backdrop-blur-2xl border-b border-glass">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-coral-purple rounded-2xl flex items-center justify-center shadow-glow-coral">
              <span className="text-3xl font-bold text-foreground">%</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Bargn</h1>
              <p className="text-xs text-muted-foreground">Discover. Save. Repeat</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink 
              to="/" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
            >
              {t("home")}
            </NavLink>
            <NavLink 
              to="/members" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
            >
              {t("members")}
            </NavLink>
            <NavLink 
              to="/partners" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
            >
              {t("partners")}
            </NavLink>
            <NavLink 
              to="/how-it-works" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
            >
              {t("howItWorks")}
            </NavLink>
            <NavLink 
              to="/about" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
            >
              {t("about")}
            </NavLink>
            <NavLink 
              to="/blog" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
            >
              {t("blog")}
            </NavLink>
            <NavLink 
              to="/campaign" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
            >
              {t("campaign")}
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
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
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navigation;
