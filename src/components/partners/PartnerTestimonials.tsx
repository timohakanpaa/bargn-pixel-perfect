import { Star } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const PartnerTestimonials = () => {
  const { ref, isInView } = useInView();

  const testimonials = [
    {
      name: "Marco R.",
      business: "Bella Vista Restaurant",
      role: "Verified Business Partner",
      quote: "NGL, I was skeptical about the 'no commission' thing - thought it was too good to be true. Turns out the only thing too good to be true was my old platform's pricing. 40% more customers and I keep ALL the money? That's what I call a glow-up.",
      stars: 5,
      gradient: "from-[#ec4899]/20 to-[#a855f7]/20"
    },
    {
      name: "Sarah K.",
      business: "FitLife Gym & Spa",
      role: "Verified Business Partner",
      quote: "Plot twist: the 'discount' customers turned into our best regulars. These people aren't here to scam free stuff - they genuinely want quality experiences. My revenue went up 60% and my stress levels went down. Chef's kiss!",
      stars: 5,
      gradient: "from-[#f97316]/20 to-[#eab308]/20",
      featured: true
    },
    {
      name: "James M.",
      business: "Urban Style Boutique",
      role: "Verified Business Partner",
      quote: "The analytics are so good, I feel like a business genius (finally!). Turns out data > gut feelings for making money. Who knew? My transaction values are up 35% and I actually understand my customers now. Mind = blown.",
      stars: 5,
      gradient: "from-[#3b82f6]/20 to-[#8b5cf6]/20"
    }
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="text-primary text-lg font-bold mb-4">Partner Success Stories</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Success Stories (Not Paid Actors, We Promise)
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Actual testimonials from actual humans running actual businesses. Revolutionary concept, we know.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${testimonial.gradient} backdrop-blur-sm rounded-3xl p-8 border border-border/30 hover:scale-105 hover:-translate-y-2 transition-all duration-300 ${testimonial.featured ? 'md:col-span-1' : ''}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-orange-yellow rounded-full border-2 border-accent/50"></div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-foreground/90 italic leading-relaxed mb-4">
                "{testimonial.quote}"
              </p>
              <p className="text-sm text-accent font-semibold">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerTestimonials;
