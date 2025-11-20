import { Quote } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const CampaignTestimonial = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl md:text-6xl font-black text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
            Kokemuksia edellisestä Bargn-kampanjasta
          </span>
        </h2>

        <div className={`max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 md:p-12 transition-all duration-1000 delay-200 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <Quote className="w-12 h-12 text-accent mb-6" />
          
          <blockquote className="text-lg md:text-xl text-foreground/90 mb-6 leading-relaxed">
            "Olin mukana Bargnin ensimmäisessä testikampanjassa viime vuonna. Sain täysin vapaat kädet tehdä sisältöä, ja julkaisin vain yhden videon sekä muutaman storyn."
          </blockquote>

          <blockquote className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed">
            "En odottanut suuria tuloksia — mutta viikossa yli sata seuraajaani liittyi palveluun. Provisioni oli lopulta suurempi kuin useimmissa kiinteähintaisissa yhteistöissä. Tuntui siltä, että työ palkittiin oikeasti oman vaikutuksen mukaan."
          </blockquote>

          <div className="flex items-center gap-4">
            <div>
              <p className="font-bold text-foreground">@saraheino</p>
              <p className="text-foreground/60">lifestyle-vaikuttaja, Instagram & TikTok</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignTestimonial;
