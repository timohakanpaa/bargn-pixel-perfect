import { Button } from "@/components/ui/button";
import { Check, Sparkles, MapPin } from "lucide-react";

const Pricing = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl md:text-7xl font-black text-center mb-6 text-primary">
          50% OFF
        </h2>
        <p className="text-2xl text-center text-secondary mb-16">
          Because we're generous like that
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Premium Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-pink-yellow opacity-20 blur-3xl group-hover:opacity-30 transition-opacity rounded-3xl"></div>
            <div className="relative bg-card border-2 border-primary rounded-3xl overflow-hidden">
              <div className="bg-gradient-pink-yellow p-8 relative">
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  AI THAT ACTUALLY SLAPS
                </div>
                <div className="text-6xl mb-4">%</div>
                <div className="text-4xl font-black text-foreground">50% OFF</div>
              </div>
              
              <div className="bg-background p-8">
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
                  <span className="text-5xl font-black text-accent">€53</span>
                  <span className="text-muted-foreground">/yearly</span>
                </div>

                <Button className="w-full bg-gradient-pink-orange text-foreground font-bold rounded-full py-6 text-lg shadow-glow-pink hover:scale-105 transition-transform">
                  Join Now
                </Button>
              </div>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-purple-pink opacity-20 blur-3xl group-hover:opacity-30 transition-opacity rounded-3xl"></div>
            <div className="relative bg-card border border-border rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] p-8 relative">
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  BEST VALUE
                </div>
                <div className="text-6xl mb-4">%</div>
                <div className="text-4xl font-black text-foreground">50% OFF</div>
              </div>
              
              <div className="bg-card p-8">
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
                  <span className="text-5xl font-black text-accent">€53</span>
                  <span className="text-muted-foreground">/yearly</span>
                </div>

                <Button variant="outline" className="w-full border-accent text-accent font-bold rounded-full py-6 text-lg hover:bg-accent/10">
                  Join Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
