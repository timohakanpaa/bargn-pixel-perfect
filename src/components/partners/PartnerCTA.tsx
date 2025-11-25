import { Button } from "@/components/ui/button";
import { Building2, Users, Crown, Percent, Sparkles, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnerCTA = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#eab308]"></div>
      
      {/* Floating icons */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-background/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float">
        <Crown className="w-8 h-8 text-foreground" />
      </div>
      <div className="absolute top-40 right-32 w-12 h-12 bg-background/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float-reverse">
        <Percent className="w-6 h-6 text-foreground" />
      </div>
      <div className="absolute bottom-32 left-40 w-14 h-14 bg-background/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float">
        <Sparkles className="w-7 h-7 text-foreground" />
      </div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-background/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float-reverse">
        <Zap className="w-8 h-8 text-foreground" />
      </div>
      <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-background/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float">
        <Users className="w-5 h-5 text-foreground" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-foreground mb-8 leading-tight">
          {t("partners.cta.headline")}
        </h2>
        <p className="text-xl md:text-2xl text-foreground/90 mb-12 max-w-3xl mx-auto">
          {t("partners.cta.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            asChild
            className="bg-background text-primary hover:bg-background/90 font-bold rounded-full px-10 py-7 text-lg shadow-2xl hover:scale-110 transition-all duration-300"
          >
            <a 
              href="http://bargn-business.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Building2 className="mr-2 w-6 h-6" />
              {t("partners.cta.applyPartner")}
            </a>
          </Button>
          <Button 
            asChild
            variant="outline" 
            className="border-2 border-foreground text-foreground hover:bg-foreground/10 rounded-full px-10 py-7 text-lg backdrop-blur-sm hover:scale-105 transition-all duration-300"
          >
            <a href="/members">
              <Users className="mr-2 w-6 h-6" />
              {t("partners.cta.joinMember")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerCTA;
