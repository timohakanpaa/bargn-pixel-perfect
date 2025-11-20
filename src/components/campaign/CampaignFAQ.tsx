import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "@/hooks/use-in-view";

const CampaignFAQ = () => {
  const { ref, isInView } = useInView();

  const faqs = [
    {
      question: "Kuinka paljon voin ansaita?",
      answer: "Ansiot riippuvat yleisösi aktiivisuudesta ja siitä, kuinka moni käyttää koodiasi tai linkkiäsi. Keskimääräinen konversio on 5-8%, ja parhaat videot ovat tuoneet yli 300 uutta liittymää."
    },
    {
      question: "Milloin saan palkkioni?",
      answer: "Palkkio maksetaan kampanjan päätyttyä, kun tulokset on vahvistettu ja mahdolliset peruutukset on vähennetty."
    },
    {
      question: "Mitä sisältöä minun pitää tehdä?",
      answer: "Yhteistyöhön kuuluu 1 pääjulkaisu ja 3-5 storya kampanja-aikana. Saat vapaat kädet sisällön toteutukseen, kunhan noudatat brändiohjetta ja lakivaatimuksia."
    },
    {
      question: "Tarvitseeko minulla olla tietty seuraajamäärä?",
      answer: "Emme aseta tiukkaa minimiä seuraajamäärille. Tärkeämpää on aktiivinen ja sitoutunut yleisö sekä halu tehdä laadukasta sisältöä."
    },
    {
      question: "Miten seuraan tuloksiani?",
      answer: "Saat käyttöösi dashboard-työkalun, jossa voit seurata liittymisiä, konversioita ja ansioita reaaliajassa kampanjan aikana."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f172a]">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl md:text-6xl font-black text-center mb-16 transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent">
            Usein kysytyt kysymykset
          </span>
        </h2>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-2xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-bold text-foreground hover:text-accent transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CampaignFAQ;
