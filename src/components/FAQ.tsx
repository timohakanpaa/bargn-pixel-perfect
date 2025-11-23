import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "@/hooks/use-in-view";
import { useFAQSchema } from "@/hooks/use-faq-schema";

const FAQ = () => {
  const { ref, isInView } = useInView();
  
  const faqData = [
    {
      question: "How does this 50% off magic actually work?",
      answer: "We partner with local businesses who'd rather have your patronage than empty tables. Our AI matches you with places you'll actually love, they give you 50% off, everyone wins. Revolutionary stuff, we know."
    },
    {
      question: "Is this actually legit or some sketchy pyramid scheme?",
      answer: "100% legit. We make money from membership fees, not by taking massive cuts from businesses. Shocking business model in 2024, but hey, someone had to do it."
    },
    {
      question: "What if I'm too broke for the membership fee?",
      answer: "Fair question! If you use it just twice a month, you've already made your money back. We did the math so you don't have to (you're welcome)."
    },
    {
      question: "Can I cancel anytime or are you gonna hold my money hostage?",
      answer: "Cancel anytime, no questions asked. We're confident enough in our service that we don't need to trap you. Wild concept, right?"
    },
    {
      question: "How many partners do you actually have?",
      answer: "500+ and growing daily. Restaurants, cafes, gyms, spas, and more. If you're wondering if your favorite spot is on there, there's a good chance it is."
    },
    {
      question: "What's this AI thing everyone keeps talking about?",
      answer: "Our AI learns what you actually like (not what marketing algorithms think you should like) and recommends places you'll genuinely enjoy. No more random suggestions for vegan restaurants when you're a proud carnivore."
    }
  ];

  useFAQSchema(faqData, "main-faq-schema");

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 max-w-5xl transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-primary">
          Questions? We Got Answers
        </h2>
        <p className="text-center text-secondary text-xl mb-16">
          (And they're probably sassier than you expected)
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem 
              key={index}
              value={`item-${index + 1}`}
              className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary transition-colors"
            >
              <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
