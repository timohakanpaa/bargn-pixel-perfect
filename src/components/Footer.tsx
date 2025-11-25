import { Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import bargnLogo from "@/assets/bargn-logo.png";
import { z } from "zod";
import AppStoreBadges from "@/components/AppStoreBadges";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
});

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate email with zod
      const result = newsletterSchema.safeParse({ email });
      
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "Invalid email";
        toast({
          title: "Invalid email",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);
      
      // Simulate newsletter signup
      setTimeout(() => {
        toast({
          title: "Subscribed!",
          description: "You've been added to our newsletter",
        });
        setEmail("");
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background-dark border-t border-primary/20 relative">
      {/* Top gradient glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Col 1: Logo & Social */}
          <div className="text-center sm:text-left">
            <img 
              src={bargnLogo} 
              alt="Bargn logo" 
              className="h-12 sm:h-14 w-auto object-contain mb-4 sm:mb-6 mx-auto sm:mx-0"
              loading="lazy"
            />
            <div className="flex gap-3 justify-center sm:justify-start">
              <a
                href="https://www.instagram.com/bargn_app?igsh=ODhtd2MzaWl5YnZy&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glass backdrop-blur-xl border border-primary/20 rounded-full flex items-center justify-center hover:border-secondary hover:shadow-glow-pink transition-all min-w-[44px] min-h-[44px]"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5 text-primary" aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@bargn_app?_t=8pRBdfvjZcP&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glass backdrop-blur-xl border border-primary/20 rounded-full flex items-center justify-center hover:border-secondary hover:shadow-glow-pink transition-all min-w-[44px] min-h-[44px]"
                aria-label="Follow us on TikTok"
              >
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/bargn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glass backdrop-blur-xl border border-primary/20 rounded-full flex items-center justify-center hover:border-secondary hover:shadow-glow-pink transition-all min-w-[44px] min-h-[44px]"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-primary" aria-hidden="true" />
              </a>
              <a
                href="mailto:info@bargn.app"
                className="w-10 h-10 bg-glass backdrop-blur-xl border border-primary/20 rounded-full flex items-center justify-center hover:border-secondary hover:shadow-glow-pink transition-all min-w-[44px] min-h-[44px]"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Col 2: Newsletter */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold mb-4 text-base sm:text-lg">{t('footer.newsletter.title')}</h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="bg-background/50 border-glass text-white"
                maxLength={255}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-pink-orange text-white hover:shadow-glow-pink transition-all min-h-[44px]"
              >
                {isSubmitting ? "..." : t('footer.newsletter.button')}
              </Button>
            </form>
          </div>

          {/* Col 3: Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold mb-4 text-base sm:text-lg">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-white/60 hover:text-primary transition-colors text-sm sm:text-base">
                  {t('footer.links.privacy')}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white/60 hover:text-primary transition-colors text-sm sm:text-base">
                  {t('footer.links.terms')}
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-white/60 hover:text-primary transition-colors text-sm sm:text-base">
                  {t('footer.links.cookies')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Info */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold mb-4 text-base sm:text-lg">Info</h4>
            <ul className="space-y-2 text-white/60 text-sm sm:text-base">
              <li className="whitespace-pre-line">{t('footer.info.address')}</li>
              <li>{t('footer.info.businessId')}</li>
            </ul>
          </div>
        </div>

        {/* App Store Badges */}
        <div className="mb-8 sm:mb-12">
          <AppStoreBadges />
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
          <p className="text-white/60 text-xs sm:text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-primary font-semibold text-xs sm:text-sm">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
