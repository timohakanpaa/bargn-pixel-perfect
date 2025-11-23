import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import confetti from "canvas-confetti";

const CampaignCTA = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const handleClick = () => {
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f97316', '#ffe500']
    });
  };

  return (
    <section ref={ref} className="py-32 bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#fbbf24] relative overflow-hidden">
      <div className={`container mx-auto px-6 text-center transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
          {t('campaign.cta.title')}
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
          {t('campaign.cta.description')}
        </p>
        <Button 
          onClick={handleClick}
          size="lg"
          className="bg-white text-[#ec4899] hover:bg-white/90 font-bold rounded-full px-12 py-8 text-xl shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <Rocket className="mr-3 w-6 h-6" />
          {t('campaign.cta.button')}
        </Button>
      </div>
    </section>
  );
};

export default CampaignCTA;
