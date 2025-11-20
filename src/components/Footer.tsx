import { NavLink } from "@/components/NavLink";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f172a] border-t border-primary/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-black bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent mb-4">
              Bargn
            </h3>
            <p className="text-foreground/60 text-sm">
              Jäsenyyspohjainen etu- ja alennuspalvelu ravintoloihin ja palveluihin.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Sivut</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-foreground/60 hover:text-accent transition-colors">
                  Etusivu
                </NavLink>
              </li>
              <li>
                <NavLink to="/partners" className="text-foreground/60 hover:text-accent transition-colors">
                  Yrityksille
                </NavLink>
              </li>
              <li>
                <NavLink to="/campaign" className="text-foreground/60 hover:text-accent transition-colors">
                  Vaikuttajakampanja
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Tietoa</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/60 hover:text-accent transition-colors">
                  Tietoa meistä
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-accent transition-colors">
                  Yhteystiedot
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-accent transition-colors">
                  Tietosuoja
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-accent transition-colors">
                  Käyttöehdot
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Seuraa meitä</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center hover:bg-accent/20 hover:border-accent/30 transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center hover:bg-accent/20 hover:border-accent/30 transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center hover:bg-accent/20 hover:border-accent/30 transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="mailto:info@bargn.fi"
                className="w-10 h-10 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center hover:bg-accent/20 hover:border-accent/30 transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5 text-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20 text-center">
          <p className="text-foreground/60 text-sm">
            © 2024 Bargn Oy. Kaikki oikeudet pidätetään.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
