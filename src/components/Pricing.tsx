import { Button } from "@/components/ui/button";
import { Check, Sparkles, MapPin } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { TiltCard } from "@/components/animations/TiltCard";
import AnimatedCounter from "@/components/AnimatedCounter";
const Pricing = () => {
  const {
    ref,
    isInView
  } = useInView();
  return <section ref={ref} className="py-16 sm:py-24 relative overflow-hidden">
      <div className={`container mx-auto px-4 sm:px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-center mb-4 sm:mb-6 text-primary">
          50% OFF
        </h2>
        <p className="text-xl sm:text-2xl text-center text-secondary mb-12 sm:mb-16">
          Because we're generous like that
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Premium Plan */}
          <TiltCard className="relative group" tiltDegree={15} scale={1.08}>
            <div className="absolute inset-0 bg-gradient-purple-yellow opacity-30 blur-3xl group-hover:opacity-40 transition-opacity rounded-3xl animate-pulse-glow"></div>
            <div className="relative bg-glass backdrop-blur-2xl border-2 border-purple shadow-glow-purple rounded-3xl overflow-hidden hover:shadow-glow-yellow transition-all duration-300">
              <div className="bg-gradient-purple-yellow p-8 relative">
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  AI THAT ACTUALLY SLAPS
                </div>
                <div className="text-6xl mb-4">%</div>
                <div className="text-4xl font-black text-foreground">50% OFF</div>
              </div>
              
              <div className="bg-glass backdrop-blur-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-black text-accent">
                    The VIP Life (But Affordable)
                  </h3>
                  <div className="flex items-center text-accent">
                    <span className="text-2xl font-bold">⭐</span>
                    <span className="ml-2 font-bold">4.9</span>
                  </div>
                </div>

                <p className="text-sm text-secondary mb-6">
                  Hyperpersonalized • Zero Commission • AI Matching
                </p>

                <p className="text-muted-foreground mb-8">
                  Get 50% discounts at hundreds of partner outlets with our AI-powered personalization that learns your preferences.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-1" />
                    <span className="text-foreground">Unlimited 50% discounts</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent mt-1" />
                    <span className="text-foreground">AI-powered recommendations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <span className="text-foreground">Local partner network</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-accent">€8.8








                </span>
                  <span className="text-muted-foreground">/yearly</span>
                </div>

                <Button className="w-full bg-gradient-pink-orange text-foreground font-bold rounded-full py-6 text-lg shadow-[0_0_25px_rgba(239,29,242,0.6)] hover:shadow-[0_0_40px_rgba(239,29,242,0.9)]">
                  Join Now
                </Button>
              </div>
            </div>
          </TiltCard>

          {/* Standard Plan */}
          <TiltCard className="relative group" tiltDegree={15} scale={1.08}>
            <div className="absolute inset-0 bg-gradient-coral-purple opacity-30 blur-3xl group-hover:opacity-40 transition-opacity rounded-3xl"></div>
            <div className="relative bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl overflow-hidden hover:shadow-glow-coral transition-all duration-300">
              <div className="bg-gradient-coral-purple p-8 relative">
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  BEST VALUE
                </div>
                <div className="text-6xl mb-4">%</div>
                <div className="text-4xl font-black text-foreground">50% OFF</div>
              </div>
              
              <div className="bg-glass backdrop-blur-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-black text-muted-foreground">
                    The VIP Life (But Affordable)
                  </h3>
                  <div className="flex items-center text-accent">
                    <span className="text-2xl font-bold">⭐</span>
                    <span className="ml-2 font-bold">4.9</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  Hyperpersonalized • Zero Commission • AI Matching
                </p>

                <p className="text-muted-foreground mb-8">
                  Get 50% discounts at hundreds of partner outlets with our AI-powered personalization that learns your preferences.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-1" />
                    <span className="text-muted-foreground">Unlimited 50% discounts</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent mt-1" />
                    <span className="text-muted-foreground">AI-powered recommendations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <span className="text-muted-foreground">Local partner network</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-accent">
                    <AnimatedCounter end={53} prefix="€" duration={2000} />
                  </span>
                  <span className="text-muted-foreground">/yearly</span>
                </div>

                <Button variant="outline" className="w-full border-accent text-accent font-bold rounded-full py-6 text-lg hover:bg-accent/10">
                  Join Now
                </Button>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>;
};
export default Pricing;