import { Building2, DollarSign, Sparkles, Users, Percent, TrendingUp, Zap, Gift, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

const PartnerHero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Trigger welcome confetti on mount
  useEffect(() => {
    if (!hasTriggeredConfetti) {
      setTimeout(() => {
        triggerWelcomeConfetti();
        setHasTriggeredConfetti(true);
      }, 1000);
    }
  }, [hasTriggeredConfetti]);

  const triggerWelcomeConfetti = () => {
    const duration = 2500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
        colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
        colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
      });
    }, 250);
  };

  const handleCTAClick = () => {
    // Fire confetti on button click
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Giant Blurry Gradient Blob */}
      <motion.div 
        style={{ scale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-coral-purple opacity-30 blur-[120px] rounded-full animate-pulse-glow"
      />
      
      {/* Orbiting Floating Icons */}
      <motion.div
        style={{ y: y1 }}
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-32 left-[15%] w-28 h-28"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 15 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-primary rounded-3xl flex items-center justify-center shadow-glow-coral cursor-pointer"
        >
          <Building2 className="w-14 h-14 text-primary" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        animate={{ 
          rotate: -360,
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-40 right-[15%] w-24 h-24"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: -15 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-accent rounded-full flex items-center justify-center shadow-glow-yellow cursor-pointer"
        >
          <DollarSign className="w-12 h-12 text-accent" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
        }}
        className="absolute bottom-32 left-[20%] w-32 h-32"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-secondary rounded-2xl flex items-center justify-center shadow-glow-purple cursor-pointer"
        >
          <Sparkles className="w-16 h-16 text-secondary" />
        </motion.div>
      </motion.div>

      {/* Additional Confetti-style Floating Icons */}
      <motion.div
        style={{ y: y2 }}
        animate={{ 
          rotate: 360,
          y: [0, -20, 0]
        }}
        transition={{ 
          rotate: { duration: 22, repeat: Infinity, ease: "linear" },
          y: { duration: 3.5, repeat: Infinity }
        }}
        className="absolute bottom-40 right-[18%] w-20 h-20"
      >
        <motion.div
          whileHover={{ scale: 1.3, rotate: 20 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-accent rounded-2xl flex items-center justify-center shadow-glow-yellow cursor-pointer"
        >
          <Percent className="w-10 h-10 text-accent" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        animate={{ 
          rotate: -360,
          y: [0, 15, 0]
        }}
        transition={{ 
          rotate: { duration: 28, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity }
        }}
        className="absolute top-1/3 left-[8%] w-24 h-24"
      >
        <motion.div
          whileHover={{ scale: 1.3, rotate: -20 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-primary rounded-full flex items-center justify-center shadow-glow-coral cursor-pointer"
        >
          <TrendingUp className="w-12 h-12 text-primary" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        animate={{ 
          rotate: 360,
          y: [0, -25, 0]
        }}
        transition={{ 
          rotate: { duration: 26, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity }
        }}
        className="absolute top-1/2 right-[8%] w-28 h-28"
      >
        <motion.div
          whileHover={{ scale: 1.3, rotate: 15 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-secondary rounded-3xl flex items-center justify-center shadow-glow-purple cursor-pointer"
        >
          <Zap className="w-14 h-14 text-secondary" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        animate={{ 
          rotate: -360,
          y: [0, 18, 0]
        }}
        transition={{ 
          rotate: { duration: 24, repeat: Infinity, ease: "linear" },
          y: { duration: 3.8, repeat: Infinity }
        }}
        className="absolute bottom-1/4 left-[12%] w-22 h-22"
      >
        <motion.div
          whileHover={{ scale: 1.3, rotate: -18 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-accent rounded-2xl flex items-center justify-center shadow-glow-yellow cursor-pointer"
        >
          <Gift className="w-11 h-11 text-accent" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        animate={{ 
          rotate: 360,
          y: [0, -18, 0]
        }}
        transition={{ 
          rotate: { duration: 32, repeat: Infinity, ease: "linear" },
          y: { duration: 4.5, repeat: Infinity }
        }}
        className="absolute top-1/4 right-[22%] w-20 h-20"
      >
        <motion.div
          whileHover={{ scale: 1.3, rotate: 25 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-primary rounded-full flex items-center justify-center shadow-glow-coral cursor-pointer"
        >
          <Crown className="w-10 h-10 text-primary" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        animate={{ 
          rotate: -360,
          y: [0, 22, 0]
        }}
        transition={{ 
          rotate: { duration: 27, repeat: Infinity, ease: "linear" },
          y: { duration: 3.2, repeat: Infinity }
        }}
        className="absolute bottom-1/3 right-[12%] w-24 h-24"
      >
        <motion.div
          whileHover={{ scale: 1.3, rotate: -22 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-secondary rounded-3xl flex items-center justify-center shadow-glow-purple cursor-pointer"
        >
          <Star className="w-12 h-12 text-secondary" />
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-8 px-6 py-3 bg-glass backdrop-blur-xl rounded-full border-2 border-glass shadow-glow-yellow"
        >
          <span className="text-accent font-bold mr-2">✨</span>
          <span className="text-accent font-bold uppercase tracking-wider">{t("partners.hero.badge")}</span>
          <span className="text-accent ml-2">✨</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-black mb-8 leading-tight"
        >
          <span className="bg-gradient-coral-purple bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(248,129,112,0.5)]">
            {t("partners.hero.headline1")}
          </span>
          <br />
          <span className="bg-gradient-coral-purple bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(248,129,112,0.5)]">
            {t("partners.hero.headline2")}
          </span>
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
        >
          {t("partners.hero.subheadline")}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
        >
          {t("partners.hero.body")}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button 
            asChild
            variant="neon"
            className="rounded-full px-10 py-7 text-xl"
          >
            <a 
              href="http://bargn-business.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleCTAClick}
            >
              <Building2 className="mr-2 w-6 h-6" />
              {t("partners.hero.cta.primary")}
            </a>
          </Button>
          <Button 
            asChild
            variant="secondary"
            className="rounded-full px-10 py-7 text-xl"
          >
            <a href="/members" onClick={handleCTAClick}>
              <Users className="mr-2 w-6 h-6" />
              {t("partners.hero.cta.secondary")}
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PartnerHero;
