import { Sparkles } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const CampaignAbout = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
              Mikä Bargn on?
            </span>
          </h2>

          <p className="text-xl text-foreground/80 mb-6 leading-relaxed">
            Bargn on jäsenyyspohjainen etu- ja alennuspalvelu, joka kokoaa yhteen ravintolat, majoituksen ja palvelualan tarjoukset yhteen sovellukseen.
          </p>

          <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
            Jäsenet saavat etuja, alennuksia ja pääsyn rajoitettuihin tarjouksiin.
          </p>

          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-accent font-bold">Nyt haemme ambassadoreja mukaan tekemään Bargnin ensimmäistä lanseerauskampanjaa</span>
          </div>
        </div>

        <div className={`max-w-4xl mx-auto mt-16 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 md:p-12 transition-all duration-1000 delay-200 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Hyödyt asiakkaille</h3>
          <p className="text-lg text-foreground/80 mb-8">Miten Bargn-kampanja toimi ravintola-asiakkailla</p>
          
          <div className="bg-background/50 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-foreground mb-4">Esimerkki: Fat Lizard -ravintola</h4>
            <p className="text-foreground/80 mb-4">
              Lähetettiin alennuskoodi sadoille asiakkaalle, joilla oli mahdollisuus saada –50% alennus Bargnin kautta
            </p>
            <p className="text-accent font-bold text-lg">
              Tulokset: 35-40% koodin saaneista käytti etunsa ja saivat alennusta
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignAbout;
