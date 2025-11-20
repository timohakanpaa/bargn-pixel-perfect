import { Button } from "@/components/ui/button";
import { Zap, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Floating Icons */}
      <div className="absolute top-32 left-20 w-24 h-24 bg-gradient-pink-orange rounded-3xl flex items-center justify-center shadow-glow-pink animate-float">
        <span className="text-4xl">%</span>
      </div>
      <div className="absolute top-40 right-32 w-20 h-20 bg-gradient-orange-yellow rounded-full flex items-center justify-center shadow-glow-orange animate-float-reverse">
        <span className="text-3xl">📱</span>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-block mb-8 px-6 py-3 bg-muted/50 backdrop-blur-sm rounded-full border border-border animate-fade-in-up">
          <span className="text-accent font-bold mr-2">✨</span>
          <span className="text-accent font-bold">AI THAT ACTUALLY SLAPS</span>
          <span className="text-accent ml-2">✨</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-[#FF6B9D] via-[#FF8E53] to-[#FFA830] bg-clip-text text-transparent">
            50% Off
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#FF8E53] via-[#FFA830] to-[#FFB84D] bg-clip-text text-transparent">
            Everything
          </span>
        </h1>

        <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FFA830] bg-clip-text text-transparent">
          AI-powered discounts that
          <br />
          actually work
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
          Join thousands who've cracked the code to smart spending. Our AI learns your preferences and serves up personalized 50% discounts at local hotspots. It's like having a deal-hunting sidekick that never sleeps (and never judges your shopping choices).
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Button className="bg-gradient-pink-orange text-foreground font-bold rounded-full px-8 py-6 text-lg shadow-glow-pink hover:scale-110 hover:shadow-glow-pink transition-all duration-300 animate-pulse-glow">
            <Zap className="mr-2 w-5 h-5" />
            Let's Go
          </Button>
          <Button variant="outline" className="border-secondary text-secondary font-bold rounded-full px-8 py-6 text-lg hover:bg-secondary/10 hover:scale-105 transition-all duration-300">
            <Users className="mr-2 w-5 h-5" />
            Partner Up (We're Cool Like That)
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div>
            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#D97706] to-[#F59E0B] bg-clip-text text-transparent mb-2">
              50%
            </div>
            <div className="text-secondary font-bold">Discount Rate</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black text-primary mb-2">
              500+
            </div>
            <div className="text-secondary font-bold">Partners</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black text-secondary mb-2">
              10000+
            </div>
            <div className="text-secondary font-bold">Happy Members</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black text-accent mb-2">
              €2M+
            </div>
            <div className="text-secondary font-bold">Saved Total</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
