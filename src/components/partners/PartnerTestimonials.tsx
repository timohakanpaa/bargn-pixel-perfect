import { Star } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { TiltCard } from "@/components/animations/TiltCard";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnerTestimonials = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t("partners.testimonials.testimonial1.name"),
      business: t("partners.testimonials.testimonial1.business"),
      role: t("partners.testimonials.testimonial1.role"),
      quote: t("partners.testimonials.testimonial1.quote"),
      stars: 5,
      gradient: "from-[#ec4899]/20 to-[#a855f7]/20"
    },
    {
      name: t("partners.testimonials.testimonial2.name"),
      business: t("partners.testimonials.testimonial2.business"),
      role: t("partners.testimonials.testimonial2.role"),
      quote: t("partners.testimonials.testimonial2.quote"),
      stars: 5,
      gradient: "from-[#f97316]/20 to-[#eab308]/20",
      featured: true
    },
    {
      name: t("partners.testimonials.testimonial3.name"),
      business: t("partners.testimonials.testimonial3.business"),
      role: t("partners.testimonials.testimonial3.role"),
      quote: t("partners.testimonials.testimonial3.quote"),
      stars: 5,
      gradient: "from-[#3b82f6]/20 to-[#8b5cf6]/20"
    }
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="text-accent text-lg font-bold mb-4 uppercase tracking-wider">{t("partners.testimonials.badge")}</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
            {t("partners.testimonials.headline")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("partners.testimonials.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TiltCard key={index} tiltDegree={10} scale={1.05}>
              <div
                className={`bg-gradient-to-br ${testimonial.gradient} backdrop-blur-xl rounded-3xl p-8 border-2 border-glass hover:shadow-glow-coral transition-all duration-300 h-full ${testimonial.featured ? 'md:col-span-1' : ''}`}
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
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerTestimonials;
