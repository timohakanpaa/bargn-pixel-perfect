import { Button } from "@/components/ui/button";
import { Building2, Users, Sparkles, Percent } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const PartnerHero = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f172a]"></div>
      
      {/* Animated floating icons */}
      <div className="absolute top-32 left-20 w-24 h-24 bg-gradient-pink-orange rounded-3xl flex items-center justify-center animate-float shadow-glow-pink rotate-12">
        <Building2 className="w-12 h-12 text-foreground" />
      </div>
      <div className="absolute top-40 right-32 w-20 h-20 bg-gradient-orange-yellow rounded-2xl flex items-center justify-center animate-float-reverse shadow-glow-orange">
        <Sparkles className="w-10 h-10 text-foreground" />
      </div>
      <div className="absolute bottom-40 left-40 w-28 h-28 bg-gradient-pink-yellow rounded-3xl flex items-center justify-center animate-float shadow-glow-yellow -rotate-12">
        <Percent className="w-14 h-14 text-foreground" />
      </div>

      <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-8 animate-pulse-glow">
          <Building2 className="w-5 h-5 text-accent" />
          <span className="text-accent font-bold uppercase tracking-wider text-sm">Business Partnership ✨</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
            500+ Businesses
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
            Can't Be Wrong
          </span>
          <br />
          <span className="text-foreground/60 text-5xl md:text-6xl">
            (But Your Competition Might Be)
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-4xl mx-auto leading-relaxed">
          Look, while your competitors are still paying hefty commissions and begging for customers, our partners are laughing all the way to the bank. Zero fees, maximum flex, and customers who actually want to be there. Revolutionary? Nah. Common sense? Absolutely.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button className="bg-gradient-to-r from-[#ec4899] to-[#f97316] text-foreground font-bold rounded-full px-8 py-6 text-lg shadow-glow-pink hover:scale-110 hover:shadow-glow-orange transition-all duration-300 animate-pulse-glow">
            <Building2 className="mr-2 w-5 h-5" />
            Apply Now
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-accent/50 text-accent hover:bg-accent/10 rounded-full px-8 py-6 text-lg backdrop-blur-sm hover:scale-105 transition-all duration-300"
          >
            <Users className="mr-2 w-5 h-5" />
            Join as Member
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerHero;
