import { Star } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { TiltCard } from "@/components/animations/TiltCard";

const CampaignTestimonial = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  useEffect(() => {
    if (isInView) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9B7D', '#E94B96', '#FFE500']
      });
    }
  }, [isInView]);

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
    <section ref={ref} className="py-24 bg-background-dark relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-white">
            {t('campaign.testimonials.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TiltCard key={index} tiltDegree={10} scale={1.05}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`bg-glass backdrop-blur-xl border-2 border-glass rounded-3xl p-8 hover:border-[#E94B96] hover:shadow-[0_0_40px_rgba(233,75,150,0.4)] transition-all duration-300 h-full ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-[#E94B96] shadow-[0_0_40px_rgba(233,75,150,0.6)]"
                  />
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFE500] text-[#FFE500]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignTestimonial;
