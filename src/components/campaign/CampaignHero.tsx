import { Button } from "@/components/ui/button";
import { DollarSign, Rocket, TrendingUp } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const CampaignHero = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  useEffect(() => {
    if (isInView) {
      // Triple confetti burst
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
    }
  }, [isInView]);

  const handleButtonClick = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF9B7D', '#E94B96', '#FFE500'],
      ticks: 300
    });
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient - using dark purples/blues like screenshots */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#16213e] to-[#0f0f23]"></div>
      
      {/* Giant gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-coral-purple opacity-20 blur-[150px] rounded-full animate-pulse-glow"></div>
      
      {/* Floating icons */}
      <div className="absolute top-32 left-[10%] w-20 h-20 bg-gradient-orange-yellow rounded-3xl flex items-center justify-center shadow-glow-yellow animate-float hover:scale-110 transition-transform">
        <DollarSign className="w-10 h-10 text-background" />
      </div>

      <div className="absolute top-40 right-[10%] w-16 h-16 bg-gradient-pink-orange rounded-3xl flex items-center justify-center shadow-glow-pink animate-float-delayed hover:scale-110 transition-transform">
        <TrendingUp className="w-8 h-8 text-foreground" />
      </div>

      <div className="absolute bottom-40 left-[15%] w-14 h-14 bg-gradient-orange-yellow rounded-3xl flex items-center justify-center shadow-glow-orange animate-float hover:scale-110 transition-transform">
        <Rocket className="w-7 h-7 text-background" />
      </div>

      <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-glass backdrop-blur-xl border-2 border-accent rounded-full px-6 py-3 mb-8 shadow-glow-yellow">
          <span className="text-accent font-bold uppercase tracking-wider text-sm">
            {t('campaign.hero.badge')}
          </span>
        </div>

        {/* Main headline with gradient using homepage colors */}
        <h1 className="text-6xl md:text-8xl font-black mb-4 leading-tight">
          <span className="bg-gradient-pink-orange bg-clip-text text-transparent">
            {t('campaign.hero.headline')}
          </span>
        </h1>

        {/* Subheadline */}
        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-orange-yellow bg-clip-text text-transparent">
            {t('campaign.hero.subheadline')}
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-5xl mx-auto leading-relaxed">
          {t('campaign.hero.description')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            onClick={handleButtonClick}
            variant="neon"
            className="rounded-full px-8 py-6 text-lg group"
          >
            <DollarSign className="mr-2 w-5 h-5 group-hover:animate-wobble" />
            {t('campaign.hero.cta1')}
          </Button>
          <Button 
            onClick={handleButtonClick}
            variant="outline"
            className="border-2 border-primary text-primary font-bold rounded-full px-8 py-6 text-lg hover:bg-primary/10 transition-all duration-300"
          >
            <Rocket className="mr-2 w-5 h-5" />
            {t('campaign.hero.cta2')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignHero;
