import { Star } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { TiltCard } from "@/components/animations/TiltCard";

const Testimonials = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-16 sm:py-24 relative overflow-hidden">
      <div className={`container mx-auto px-4 sm:px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-12 sm:mb-16 text-foreground">
          What Our Community Says
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <TiltCard tiltDegree={10} scale={1.05}>
            <div className="bg-glass backdrop-blur-2xl rounded-3xl p-8 border-2 border-glass hover:border-primary hover:shadow-glow-coral transition-all duration-300 h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-coral-purple rounded-full flex items-center justify-center shadow-glow-purple border-4 border-primary">
                  <span className="text-2xl font-bold">SK</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">Sarah K., Reformed Full-Price Payer</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground italic text-lg leading-relaxed mb-4">
                "I've saved €500 this month without changing my lifestyle AT ALL. The AI recommendations are so spot-on it's almost creepy. I actually look forward to going out now because I know I'm getting deals that make sense for me."
              </p>
              
              <p className="text-secondary text-sm font-medium">
                Verified Member Since 2024
              </p>
            </div>
          </TiltCard>

          <TiltCard tiltDegree={10} scale={1.05}>
            <div className="bg-glass backdrop-blur-2xl rounded-3xl p-8 border-2 border-glass hover:border-accent hover:shadow-glow-yellow transition-all duration-300 h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-yellow rounded-full flex items-center justify-center shadow-glow-yellow">
                  <span className="text-2xl font-bold">MR</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">Mike R., Local Food Legend</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground italic text-lg leading-relaxed mb-4">
                "Bargn brought us 40% more customers without the usual platform fees that make you question your life choices. Revenue's up, stress is down, and for once my accountant doesn't look like they want to cry."
              </p>
              
              <p className="text-secondary text-sm font-medium">
                Verified Partner Since 2023
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
