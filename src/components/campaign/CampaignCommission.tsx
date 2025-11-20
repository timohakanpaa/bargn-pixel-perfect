import { Repeat, Rocket, Globe, DollarSign, Calculator, Clock, AlertCircle } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const CampaignCommission = () => {
  const { ref, isInView } = useInView();

  const benefits = [
    {
      icon: Repeat,
      title: "Jatkuva korvaus",
      description: "Saat korvauksen jokaisesta ostosta, ei vain yhdestä julkaisusta"
    },
    {
      icon: Rocket,
      title: "Pitkäaikainen tuotto",
      description: "Tuotto voi jatkua myös kampanjan jälkeen, jos yleisösi pysyy aktiivisena"
    },
    {
      icon: Globe,
      title: "Uusi Suomessa",
      description: "Ole ensimmäisten joukossa, jotka hyödyntävät maailmalla laajasti käytettyä mallia"
    }
  ];

  const steps = [
    {
      icon: DollarSign,
      title: "Provisio per asiakas",
      description: "Saat provision jokaisesta uudesta maksavasta asiakkaasta, joka liittyy tai ostaa käyttäen sinun koodiasi/linkkiäsi"
    },
    {
      icon: Calculator,
      title: "Tuottojen laskenta",
      description: "Kun kampanja päättyy, kaikki tuotot lasketaan yhteen ja mahdolliset peruutukset vähennetään"
    },
    {
      icon: Clock,
      title: "Maksuaikataulu",
      description: "Palkkio maksetaan sinulle, kun kampanjan tulokset on vahvistettu"
    },
    {
      icon: AlertCircle,
      title: "Peruutukset",
      description: "Mahdolliset peruutukset (esim. 14 päivän peruutusoikeuden piirissä) vähennetään ennen tilitystä"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f172a]">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl md:text-6xl font-black text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
            Miten palkkio toimii – tulonjakomalli
          </span>
        </h2>

        <div className={`max-w-5xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <p className="text-xl text-center text-foreground/80 mb-12">
            Palkkio maksetaan kampanjan päätyttyä, tulonjakomallin mukaan
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-foreground/80">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <h3 className="text-3xl md:text-4xl font-black text-center mb-12">
            <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
              Miksi tulonjakomalli on hyödyllinen?
            </span>
          </h3>

          <p className="text-xl text-center text-foreground/80 mb-12">
            Ansaitse suoraan tuloksista, ei pelkästään kiinteästä maksusta
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h4>
                  <p className="text-foreground/80">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <p className="text-lg text-center text-foreground/80 italic">
            Tämä malli sopii erityisen hyvin vaikuttajille, jotka haluavat kasvattaa omaa ansaintaansa pitkäjänteisesti ja tulospohjaisesti.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CampaignCommission;
