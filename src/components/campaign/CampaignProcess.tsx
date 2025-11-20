import { Link2, FileText, Megaphone, LineChart, Banknote, AlertTriangle } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const CampaignProcess = () => {
  const { ref, isInView } = useInView();

  const steps = [
    {
      icon: Link2,
      number: "1",
      title: "Saat oman koodin ja/tai linkin"
    },
    {
      icon: FileText,
      number: "2",
      title: "Julkaiset sisältöä (1 pääjulkaisu + 3–5 storya) kampanja-aikana"
    },
    {
      icon: Megaphone,
      number: "3",
      title: "Kerrot yleisöllesi, että he voivat saada alennuksia Bargnin kautta"
    },
    {
      icon: LineChart,
      number: "4",
      title: "Seuraat tuloksia (dashboard / raportointi)"
    },
    {
      icon: Banknote,
      number: "5",
      title: "Saat tilityksen kampanjan päätyttyä"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl md:text-6xl font-black text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
            Mitä teet kampanjassa
          </span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 flex items-center gap-6 hover:scale-105 transition-all duration-300 ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-[#ec4899] to-[#f97316] rounded-full flex items-center justify-center text-2xl font-black text-foreground">
                  {step.number}
                </div>
                <Icon className="w-10 h-10 text-accent flex-shrink-0" />
                <p className="text-lg text-foreground/90 font-medium">{step.title}</p>
              </div>
            );
          })}
        </div>

        <div className={`max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 md:p-12 transition-all duration-1000 delay-500 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Lakivaatimukset ja merkinnät</h3>
              <p className="text-foreground/80 mb-4">Kaikki julkaisut tulee merkitä:</p>
            </div>
          </div>

          <div className="bg-background/50 rounded-2xl p-6 mb-6">
            <p className="text-lg font-bold text-accent mb-4">
              "Mainos – kaupallinen yhteistyö Bargn Oy:n kanssa"
            </p>
          </div>

          <ul className="space-y-3 text-foreground/80">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Käytä annettuja hashtageja ja bränditunnisteita</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Jos brändillä ei ole vielä omaa tiliä, riittää yrityksen nimi tekstimuodossa</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Perustuu KKV:n ja Mainonnan eettisen neuvoston ohjeistuksiin</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CampaignProcess;
