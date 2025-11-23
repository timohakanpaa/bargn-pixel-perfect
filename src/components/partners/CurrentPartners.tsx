import { CreditCard, Gift, Zap, Play, Building2 } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import AnimatedCounter from "@/components/AnimatedCounter";

const CurrentPartners = () => {
  const { ref, isInView } = useInView();

  const categories = [
    { icon: CreditCard, count: 150, name: "Restaurants & Cafes", gradient: "bg-gradient-pink-orange" },
    { icon: Gift, count: 200, name: "Retail & Fashion", gradient: "bg-gradient-orange-yellow" },
    { icon: Zap, count: 100, name: "Fitness & Wellness", gradient: "bg-gradient-pink-yellow" },
    { icon: Play, count: 50, name: "Entertainment & Events", gradient: "bg-gradient-purple-pink" }
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="text-accent text-lg font-bold mb-4 uppercase tracking-wider">Current Partners</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
            The Cool Kids' Table (And You're Invited)
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From that hipster coffee shop you Instagram to the spa where influencers get 'work done' - yeah, they're all here.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-center group hover:scale-110 transition-transform duration-300"
            >
              <div className={`w-20 h-20 ${category.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-glow-pink group-hover:animate-pulse-glow`}>
                <category.icon className="w-10 h-10 text-foreground" />
              </div>
              <div className="text-3xl font-black text-accent mb-2">
                <AnimatedCounter end={category.count} suffix="+" duration={2000} />
              </div>
              <div className="text-foreground font-semibold">{category.name}</div>
            </div>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden group">
          <img 
            src="/placeholder.svg" 
            alt="Partner venue" 
            width="1200"
            height="400"
            loading="lazy"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-sm bg-background/40 border-t border-border/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-pink-orange rounded-2xl flex items-center justify-center shadow-glow-pink">
                <Building2 className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground">
                  <AnimatedCounter end={500} suffix="+" duration={2000} /> Active Partners
                </h3>
                <p className="text-accent font-semibold">Growing Every Week</p>
              </div>
            </div>
            <p className="text-foreground/80">
              Join restaurants, retail shops, gyms, spas, entertainment venues and more in our thriving network
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentPartners;
