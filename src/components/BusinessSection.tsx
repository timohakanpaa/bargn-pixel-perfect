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

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-coral-purple opacity-30 blur-3xl rounded-3xl animate-pulse-glow"></div>
            <div className="relative bg-glass backdrop-blur-2xl border-2 border-glass hover:border-primary hover:shadow-glow-purple rounded-3xl p-8 shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="bg-glass backdrop-blur-xl border border-glass rounded-2xl p-6 mb-4">
                <div className="text-sm text-accent mb-2">You saved 160.00 CHF</div>
                <div className="bg-glass backdrop-blur-sm rounded-xl p-4 mb-4">
                  <input 
                    type="text" 
                    placeholder="Search for an offer or outlet" 
                    className="bg-transparent text-foreground placeholder:text-muted-foreground w-full outline-none"
                  />
                </div>
                <div className="bg-glass backdrop-blur-xl rounded-xl p-4 border border-glass">
                  <img 
                    src="/placeholder.svg" 
                    alt="Cold Stone" 
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-foreground font-bold">Cold Stone</h4>
                      <p className="text-sm text-muted-foreground">1,449 Lausanne, Available</p>
                    </div>
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                      50% OFF
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-glass backdrop-blur-xl border border-glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-foreground font-bold">500+ Partners</span>
                  <span className="text-muted-foreground">Growing Daily</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join restaurants, cafes, gyms, spas, and more in our growing network
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
