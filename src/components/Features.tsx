import { Brain, Shield, TrendingUp } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const Features = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <h2 className="text-5xl md:text-6xl font-black text-center mb-6">
          <span className="text-foreground">Why We're Your New Favorite</span>
          <br />
          <span className="text-foreground">Money-Saving App</span>
        </h2>

        <p className="text-xl text-center text-secondary mb-16 max-w-4xl mx-auto">
          Sure, we could bombard you with corporate buzzwords about 'revolutionary solutions,' but here's the real tea: we built an app that actually saves you money without making you jump through hoops. Wild concept, right?
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 hover:border-primary hover:shadow-glow-coral hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-coral-purple rounded-2xl flex items-center justify-center mb-6 shadow-glow-purple group-hover:animate-pulse-glow">
              <Brain className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              AI That Gets Your Vibe
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our AI learns your preferences faster than you can say 'retail therapy.' It knows you're a sucker for artisanal coffee and boutique fitness classes. We're here for it – and we'll help you afford it.
            </p>
          </div>

          <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 hover:border-secondary hover:shadow-glow-coral hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-coral rounded-2xl flex items-center justify-center mb-6 shadow-glow-coral group-hover:animate-pulse-glow">
              <Shield className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              No Hidden Fees, No Sketchy Business
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Here's a crazy idea: what if we didn't charge businesses arm and a leg? Turns out, when partners save money, they can offer you better deals. Economics 101, but apparently we're the only ones who got the memo.
            </p>
          </div>

          <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 hover:border-accent hover:shadow-glow-yellow hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-purple-yellow rounded-2xl flex items-center justify-center mb-6 shadow-glow-yellow group-hover:animate-pulse-glow">
              <TrendingUp className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Recommendations That Don't Suck
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Finally, an AI that doesn't try to sell you random garbage. No more sushi deals when you're allergic to fish, or CrossFit discounts when your idea of exercise is aggressive channel surfing. We get you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
