import { Star } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

const CampaignTestimonial = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t('campaign.testimonials.testimonial1.name'),
      quote: t('campaign.testimonials.testimonial1.quote'),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aino"
    },
    {
      name: t('campaign.testimonials.testimonial2.name'),
      quote: t('campaign.testimonials.testimonial2.quote'),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ville"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#1e1b4b] to-[#0c0a1f] relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-white">
            {t('campaign.testimonials.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-[#1a1a2e]/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-[#ec4899]"
                />
                <div>
                  <h3 className="font-bold text-white">{testimonial.name}</h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-foreground/80 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignTestimonial;
