import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const CampaignHero = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f172a]"></div>
      
      <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-8 animate-pulse-glow">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-accent font-bold uppercase tracking-wider text-sm">Ensimmäinen tulonjakopohjinen vaikuttajakampanja Suomessa</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
            Bargn Vaikuttaja-
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
            kampanja
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-4xl mx-auto leading-relaxed">
          Tee sisältöä ravintoloista ja palveluista — tienaa tulonjakomallilla
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button className="bg-gradient-to-r from-[#ec4899] to-[#f97316] text-foreground font-bold rounded-full px-8 py-6 text-lg shadow-glow-pink hover:scale-110 hover:shadow-glow-orange transition-all duration-300 animate-pulse-glow">
            <Sparkles className="mr-2 w-5 h-5" />
            Hae mukaan kampanjaan
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignHero;
