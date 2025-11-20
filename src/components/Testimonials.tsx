import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-foreground">
          What Our Community Says
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-card to-muted rounded-3xl p-8 border border-primary/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-purple-pink rounded-full flex items-center justify-center shadow-glow-pink border-4 border-primary">
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

          <div className="bg-gradient-to-br from-card to-muted rounded-3xl p-8 border border-secondary/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-orange-yellow rounded-full flex items-center justify-center shadow-glow-orange">
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
