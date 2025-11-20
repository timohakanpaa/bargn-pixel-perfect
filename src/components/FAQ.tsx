import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "@/hooks/use-in-view";

const FAQ = () => {
  const { ref, isInView } = useInView();

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
          <AccordionItem 
            value="item-1" 
            className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary transition-colors"
          >
            <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
              How does this 50% off magic actually work?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">
              We partner with local businesses who'd rather have your patronage than empty tables. Our AI matches you with places you'll actually love, they give you 50% off, everyone wins. Revolutionary stuff, we know.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-2" 
            className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary transition-colors"
          >
            <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
              Is this actually legit or some sketchy pyramid scheme?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">
              100% legit. We make money from membership fees, not by taking massive cuts from businesses. Shocking business model in 2024, but hey, someone had to do it.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-3" 
            className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary transition-colors"
          >
            <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
              What if I'm too broke for the membership fee?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">
              Fair question! If you use it just twice a month, you've already made your money back. We did the math so you don't have to (you're welcome).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-4" 
            className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary transition-colors"
          >
            <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
              Can I cancel anytime or are you gonna hold my money hostage?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">
              Cancel anytime, no questions asked. We're confident enough in our service that we don't need to trap you. Wild concept, right?
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-5" 
            className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary transition-colors"
          >
            <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
              How many partners do you actually have?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">
              500+ and growing daily. Restaurants, cafes, gyms, spas, and more. If you're wondering if your favorite spot is on there, there's a good chance it is.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-6" 
            className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary transition-colors"
          >
            <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
              What's this AI thing everyone keeps talking about?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">
              Our AI learns what you actually like (not what marketing algorithms think you should like) and recommends places you'll genuinely enjoy. No more random suggestions for vegan restaurants when you're a proud carnivore.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
