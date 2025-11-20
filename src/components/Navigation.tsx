import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-pink-orange rounded-xl flex items-center justify-center shadow-glow-pink">
              <span className="text-2xl">🎲</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Bargn</h1>
              <p className="text-xs text-muted-foreground">Discover. Save. Repeat</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Members
            </NavLink>
            <NavLink to="/partners" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Partners
            </NavLink>
            <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#blog" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Blog
            </a>
            <NavLink to="/campaign" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Campaign
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
              <button className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-bold">
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                FI
              </button>
            </div>
            <Button variant="ghost" size="icon" className="text-foreground">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground">
              <User className="w-5 h-5" />
            </Button>
            <Button className="bg-gradient-purple-pink text-foreground font-bold rounded-full px-6 shadow-glow-pink hover:scale-105 transition-transform">
              Let's Go
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
