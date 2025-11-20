import { Rocket } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const PartnershipProcess = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="text-primary text-lg font-bold mb-4">Partnership Process</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Easier Than Your Morning Coffee Order
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seriously, it's faster than explaining your coffee order to a new barista. No PhD required, no blood sacrifice needed.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-12 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-pink-orange rounded-2xl flex items-center justify-center shadow-glow-pink animate-pulse-glow">
              <Rocket className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-3xl font-black text-foreground">Ready to Get Started?</h3>
          </div>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Fill out a quick application (easier than updating your Instagram bio), we review it (like your ex stalking your stories, but faster), and boom - you're in. Typically takes less time than deciding what to watch on Netflix.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-background/50 rounded-2xl border border-border/30">
              <div className="text-4xl font-black text-accent mb-2">1</div>
              <p className="text-foreground font-semibold">Apply Online</p>
            </div>
            <div className="text-center p-6 bg-background/50 rounded-2xl border border-border/30">
              <div className="text-4xl font-black text-accent mb-2">2</div>
              <p className="text-foreground font-semibold">Quick Review</p>
            </div>
            <div className="text-center p-6 bg-background/50 rounded-2xl border border-border/30">
              <div className="text-4xl font-black text-accent mb-2">3</div>
              <p className="text-foreground font-semibold">Start Earning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipProcess;
