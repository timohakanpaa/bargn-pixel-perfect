import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const CampaignCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#eab308]"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-foreground mb-8 leading-tight">
          Liity mukaan ensimmäiseen tulonjakopohjaiseen vaikuttajakampanjaan
        </h2>
        <p className="text-xl md:text-2xl text-foreground/90 mb-12 max-w-3xl mx-auto">
          Ole mukana tekemässä historiaa ja ansaitse todellisen vaikutuksesi mukaan. Hae mukaan nyt!
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            className="bg-background text-primary hover:bg-background/90 font-bold rounded-full px-10 py-7 text-lg shadow-2xl hover:scale-110 transition-all duration-300"
          >
            <Sparkles className="mr-2 w-6 h-6" />
            Hae mukaan kampanjaan
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-foreground text-foreground hover:bg-foreground/10 rounded-full px-10 py-7 text-lg backdrop-blur-sm hover:scale-105 transition-all duration-300"
          >
            Lue lisää
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignCTA;
