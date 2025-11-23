import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import confetti from "canvas-confetti";

const CampaignCTA = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const handleClick = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FF9B7D', '#E94B96', '#FFE500']
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <section ref={ref} className="py-32 bg-gradient-pink-yellow relative overflow-hidden">
      <div className={`container mx-auto px-6 text-center transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground">
          {t('campaign.cta.title')}
        </h2>
        <p className="text-xl md:text-2xl text-foreground/90 mb-12 max-w-3xl mx-auto">
          {t('campaign.cta.description')}
        </p>
        <Button 
          onClick={handleClick}
          size="lg"
          className="bg-background text-primary hover:bg-background/90 font-bold rounded-full px-12 py-8 text-xl shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <Rocket className="mr-3 w-6 h-6" />
          {t('campaign.cta.button')}
        </Button>
      </div>
    </section>
  );
};

export default CampaignCTA;
