import { Button } from "@/components/ui/button";
import { DollarSign, Rocket, TrendingUp } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import confetti from "canvas-confetti";

const CampaignHero = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    if (isInView) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#f97316', '#ffe500']
      });
    }
  }, [isInView]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f172a]"></div>
      
      {/* Floating icons with parallax */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-32 left-[10%] w-20 h-20 bg-gradient-to-br from-[#ffe500] to-[#f97316] rounded-3xl flex items-center justify-center shadow-glow-yellow blur-[1px] hover:scale-110 transition-transform"
      >
        <DollarSign className="w-10 h-10 text-black" />
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute top-40 right-[10%] w-16 h-16 bg-gradient-to-br from-[#ec4899] to-[#f97316] rounded-3xl flex items-center justify-center shadow-glow-pink blur-[1px] hover:scale-110 transition-transform"
      >
        <TrendingUp className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div 
        style={{ y: y1 }}
        className="absolute bottom-40 left-[15%] w-14 h-14 bg-gradient-to-br from-[#ffe500] via-[#f97316] to-[#ec4899] rounded-3xl flex items-center justify-center shadow-glow-orange blur-[1px] hover:scale-110 transition-transform"
      >
        <Rocket className="w-7 h-7 text-white" />
      </motion.div>

      <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] backdrop-blur-sm border border-[#ffe500]/50 rounded-full px-6 py-3 mb-8 animate-pulse-glow">
          <span className="text-[#ffe500] font-bold uppercase tracking-wider text-sm">
            {t('campaign.hero.badge')}
          </span>
        </div>

        {/* Main headline with gradient */}
        <h1 className="text-6xl md:text-8xl font-black mb-4 leading-tight">
          <span className="bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#fbbf24] bg-clip-text text-transparent">
            {t('campaign.hero.headline')}
          </span>
        </h1>

        {/* Subheadline */}
        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fbbf24] bg-clip-text text-transparent">
            {t('campaign.hero.subheadline')}
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-5xl mx-auto leading-relaxed">
          {t('campaign.hero.description')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            onClick={() => confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#ec4899', '#f97316', '#ffe500']
            })}
            className="bg-gradient-to-r from-[#ec4899] to-[#f97316] text-white font-bold rounded-full px-8 py-6 text-lg shadow-glow-pink hover:scale-110 hover:shadow-glow-orange transition-all duration-300"
          >
            <DollarSign className="mr-2 w-5 h-5" />
            {t('campaign.hero.cta1')}
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-[#f97316] text-[#f97316] font-bold rounded-full px-8 py-6 text-lg hover:bg-[#f97316]/10 transition-all duration-300"
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
