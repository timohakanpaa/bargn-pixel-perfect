import { Search, User, Menu, X, ChevronDown, Activity, BarChart3, MessageSquare, GitBranch, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bargnLogo from "@/assets/bargn-logo.png";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Navigation = () => {
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const location = useLocation();
  const {
    isAdmin,
    user
  } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dragThresholdReached, setDragThresholdReached] = useState(false);

  // Haptic feedback helper
  const triggerHaptic = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      triggerHaptic(50); // Light haptic on close
    }
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
  const menuItems = [{
    to: "/",
    label: t("home")
  }, {
    to: "/members",
    label: t("members")
  }, {
    to: "/partners",
    label: t("partners")
  }, {
    to: "/how-it-works",
    label: t("howItWorks")
  }, {
    to: "/about",
    label: t("about")
  }, {
    to: "/campaign",
    label: t("campaign")
  }];
  const adminItems = [{
    to: "/auth",
    label: "Admin Login",
    icon: User
  }, {
    to: "/blog",
    label: "Blog",
    icon: FileText
  }, {
    to: "/blog/admin",
    label: "Blog Admin",
    icon: FileText
  }, {
    to: "/performance",
    label: "Performance",
    icon: Activity
  }, {
    to: "/analytics",
    label: "Analytics",
    icon: BarChart3
  }, {
    to: "/analytics/chat",
    label: "Chat Analytics",
    icon: MessageSquare
  }, {
    to: "/funnels",
    label: "Funnels",
    icon: GitBranch
  }, {
    to: "/site-audit",
    label: "Site Audit",
    icon: ShieldCheck
  }];
  const isAdminRoute = adminItems.some(item => location.pathname === item.to);
  return <>
      <nav className="relative z-[100] bg-glass backdrop-blur-2xl border-b border-glass">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src={bargnLogo} alt="Bargn Logo" className="h-10 sm:h-12 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {menuItems.map(item => <NavLink key={item.to} to={item.to} className="text-sm font-medium text-foreground hover:text-primary transition-colors" activeClassName="text-primary font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full">
                {item.label}
              </NavLink>)}
            
            {/* Admin Dropdown - Only visible to authenticated admins */}
            {isAdmin && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`text-sm font-medium transition-colors flex items-center gap-1 ${isAdminRoute ? "text-primary font-bold" : "text-foreground hover:text-primary"}`}>
                    Admin
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-glass">
                  {adminItems.map(item => {
                  const Icon = item.icon;
                  return <DropdownMenuItem key={item.to} asChild>
                        <NavLink to={item.to} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-foreground hover:text-primary cursor-pointer" activeClassName="text-primary font-bold bg-glass">
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </NavLink>
                      </DropdownMenuItem>;
                })}
                </DropdownMenuContent>
              </DropdownMenu>}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-glass backdrop-blur-xl border border-glass rounded-full px-3 py-1.5">
              <button onClick={() => setLanguage("en")} className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${language === "en" ? "bg-accent text-accent-foreground shadow-glow-yellow" : "text-muted-foreground hover:text-foreground"}`}>
                EN
              </button>
              <span className="text-muted-foreground text-xs">|</span>
              <button onClick={() => setLanguage("fi")} className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${language === "fi" ? "bg-accent text-accent-foreground shadow-glow-yellow" : "text-muted-foreground hover:text-foreground"}`}>
                FI
              </button>
            </div>
            <Button variant="ghost" size="icon" className="text-foreground hover:shadow-glow-coral flex-shrink-0">
              <Search className="w-5 h-5" />
            </Button>
            {!user && <Link to="/auth">
                <Button variant="ghost" size="icon" className="text-foreground hover:shadow-glow-coral flex-shrink-0">
                  <User className="w-5 h-5" />
                </Button>
              </Link>}
            {user && <Button variant="ghost" size="icon" className="text-foreground hover:shadow-glow-coral flex-shrink-0">
                <User className="w-5 h-5" />
              </Button>}
            <Button asChild variant="neon" className="rounded-full px-6 flex-shrink-0">
              <a target="_blank" rel="noopener noreferrer" href="https://buy.stripe.com/fZu9AT5Oobc1fY65Lu3ZK04">
                {t("letsGo")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button - min 44px touch target */}
          <Button variant="ghost" size="icon" className="lg:hidden text-foreground min-w-[44px] min-h-[44px]" onClick={() => {
            const newState = !isMobileMenuOpen;
            setIsMobileMenuOpen(newState);
            triggerHaptic(newState ? 30 : 50); // Light haptic on open, slightly stronger on close
          }} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </Button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[150]" onClick={() => {
          setIsMobileMenuOpen(false);
          triggerHaptic(50);
        }} />

          {/* Menu Content */}
          <motion.div initial={{
          x: "100%"
        }} animate={{
          x: 0
        }} exit={{
          x: "100%"
        }} transition={{
          type: "spring",
          damping: 25,
          stiffness: 200
        }} drag="x" dragConstraints={{
          left: 0,
          right: 0
        }} dragElastic={{
          left: 0,
          right: 0.5
        }} onDrag={(e, {
          offset
        }) => {
          // Trigger haptic when drag threshold is reached (only once)
          if (offset.x > 150 && !dragThresholdReached) {
            triggerHaptic(20);
            setDragThresholdReached(true);
          } else if (offset.x <= 150 && dragThresholdReached) {
            setDragThresholdReached(false);
          }
        }} onDragEnd={(e, {
          offset,
          velocity
        }) => {
          if (offset.x > 150 || velocity.x > 500) {
            triggerHaptic(50); // Stronger haptic on successful close
            setIsMobileMenuOpen(false);
          }
          setDragThresholdReached(false);
        }} className="fixed top-[108px] right-0 bottom-0 w-full sm:w-96 bg-background/95 backdrop-blur-2xl z-[200] border-l border-glass overflow-y-auto cursor-grab active:cursor-grabbing">
            <div className="p-6 space-y-6">
              {/* Language Toggle - Mobile - min 44px touch target */}
              <div className="flex items-center justify-center gap-2 bg-glass backdrop-blur-xl border-2 border-glass rounded-full p-2">
                <button onClick={() => setLanguage("en")} className={`flex-1 px-3 py-3 min-h-[44px] rounded-full text-base font-bold transition-all ${language === "en" ? "bg-accent text-accent-foreground shadow-glow-yellow" : "text-muted-foreground"}`} aria-label="Switch to English">
                  EN
                </button>
                <button onClick={() => setLanguage("fi")} className={`flex-1 px-3 py-3 min-h-[44px] rounded-full text-base font-bold transition-all ${language === "fi" ? "bg-accent text-accent-foreground shadow-glow-yellow" : "text-muted-foreground"}`} aria-label="Switch to Finnish">
                  FI
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => <motion.div key={item.to} initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.05
              }}>
                    <NavLink to={item.to} className="flex items-center px-4 py-4 text-lg font-medium text-foreground hover:bg-glass rounded-xl transition-all" activeClassName="bg-glass text-primary font-bold border-l-4 border-primary">
                      {item.label}
                    </NavLink>
                  </motion.div>)}
              </nav>

              {/* Admin Section - Mobile - Only visible to authenticated admins */}
              {isAdmin && <div className="pt-4 border-t border-glass">
                  <p className="text-xs font-bold text-muted-foreground uppercase px-4 mb-2">Admin</p>
                  <nav className="space-y-2">
                    {adminItems.map((item, index) => {
                  const Icon = item.icon;
                  return <motion.div key={item.to} initial={{
                    opacity: 0,
                    x: 20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    delay: (menuItems.length + index) * 0.05
                  }}>
                          <NavLink to={item.to} className="flex items-center gap-3 px-4 py-4 text-lg font-medium text-foreground hover:bg-glass rounded-xl transition-all" activeClassName="bg-glass text-primary font-bold border-l-4 border-primary">
                            <Icon className="w-5 h-5" />
                            {item.label}
                          </NavLink>
                        </motion.div>;
                })}
                  </nav>
                </div>}

              {/* Mobile Actions - min 44px touch targets */}
              <div className="space-y-3 pt-6 border-t border-glass">
                <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-glass min-h-[44px]" size="lg" aria-label="Search">
                  <Search className="w-5 h-5 mr-3" aria-hidden="true" />
                  Search
                </Button>
                {!user && <Link to="/auth" className="block">
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-glass min-h-[44px]" size="lg" aria-label="Sign In">
                      <User className="w-5 h-5 mr-3" aria-hidden="true" />
                      Sign In
                    </Button>
                  </Link>}
                {user && <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-glass min-h-[44px]" size="lg" aria-label="Account">
                    <User className="w-5 h-5 mr-3" aria-hidden="true" />
                    Account
                  </Button>}
                <Button asChild variant="neon" className="w-full rounded-full shadow-[0_0_25px_rgba(255,220,74,0.7)] min-h-[44px]" size="lg">
                  <a href="https://buy.stripe.com/fZu9AT5Oobc1fY65Lu3ZK04" target="_blank" rel="noopener noreferrer">
                    {t("letsGo")}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>
    </>;
};
export default Navigation;