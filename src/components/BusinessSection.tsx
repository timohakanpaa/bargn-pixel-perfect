import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Heart, Users } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const BusinessSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                Why Businesses Actually Love Us
              </span>
            </h2>
            <p className="text-2xl text-primary font-bold mb-8">
              (Plot twist: We're not trying to bankrupt them)
            </p>

            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              While other platforms treat businesses like personal ATMs, we're out here building actual partnerships. Shocking business model: help everyone win instead of just helping ourselves to their wallets.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4 bg-glass backdrop-blur-2xl border-2 border-glass hover:border-primary hover:shadow-glow-coral p-6 rounded-2xl transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-gradient-coral-purple rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow-coral">
                  <TrendingUp className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Real Customers Who Actually Buy Stuff
                  </h3>
                  <p className="text-muted-foreground">
                    Tired of burning cash on ads that attract window shoppers? Our members are pre-qualified spenders who just happen to be allergic to full price. They'll buy, they'll tip, they'll even leave good reviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-glass backdrop-blur-2xl border-2 border-glass hover:border-secondary hover:shadow-glow-coral p-6 rounded-2xl transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-gradient-coral rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow-coral">
                  <Shield className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Zero Commission = More Money for You
                  </h3>
                  <p className="text-muted-foreground">
                    Mind-blowing concept: we make money from member subscriptions, not by skimming off your hard-earned revenue. Apparently this makes us unicorns in the platform world.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-glass backdrop-blur-2xl border-2 border-glass hover:border-accent hover:shadow-glow-yellow p-6 rounded-2xl transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-gradient-purple-yellow rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow-yellow">
                  <Heart className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Members with Their Financial Act Together
                  </h3>
                  <p className="text-muted-foreground">
                    Think about it: people who pay a monthly fee to access discounts clearly understand the value of smart spending. These aren't bargain hunters, they're strategic savers.
                  </p>
                </div>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-secondary to-accent text-foreground font-bold rounded-full px-8 py-6 text-lg shadow-glow-orange hover:scale-110 hover:shadow-glow-yellow transition-all duration-300">
              <Users className="mr-2 w-5 h-5" />
              Partner Up (We're Cool Like That)
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
