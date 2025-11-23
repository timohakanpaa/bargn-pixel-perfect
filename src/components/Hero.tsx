import { Button } from "@/components/ui/button";
import { Zap, Users, Pizza, Ticket, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useAnalytics } from "@/hooks/use-analytics";
import AppStoreBadges from "@/components/AppStoreBadges";
import { trackAllPlatforms } from "@/utils/tracking";
import { useEffect, useState } from "react";

const Hero = () => {
  const { t } = useLanguage();
  const { trackButtonClick } = useAnalytics();
  const { scrollY } = useScroll();
  const [isPaused, setIsPaused] = useState(false);
  
  // Pause animations when scrolled past hero section
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsPaused(latest > 800);
    });
    return () => unsubscribe();
  }, [scrollY]);
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-4">
      {/* Giant Blurry Gradient Blob with Pulsing Glow */}
      <motion.div 
        style={{ scale }}
        animate={{
          boxShadow: [
            "0 0 100px 40px rgba(239,29,242,0.4)",
            "0 0 150px 60px rgba(239,29,242,0.6)",
            "0 0 100px 40px rgba(239,29,242,0.4)",
          ]
        }}
        transition={{
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-coral-purple opacity-30 blur-[120px] rounded-full"
      />
      
      {/* Orbiting Floating Icons */}
      <motion.div
        style={{ y: y1 }}
        animate={isPaused ? {} : { 
          rotate: 360,
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-24 sm:top-32 left-[5%] sm:left-[15%] w-20 h-20 sm:w-28 sm:h-28"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 15 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-primary rounded-3xl flex items-center justify-center shadow-glow-coral cursor-pointer"
          aria-label="Pizza discount icon"
        >
          <Pizza className="w-10 h-10 sm:w-14 sm:h-14 text-primary" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        animate={isPaused ? {} : { 
          rotate: -360,
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-32 sm:top-40 right-[5%] sm:right-[15%] w-16 h-16 sm:w-24 sm:h-24"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: -15 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-accent rounded-full flex items-center justify-center shadow-glow-yellow cursor-pointer"
          aria-label="Ticket deals icon"
        >
          <Ticket className="w-8 h-8 sm:w-12 sm:h-12 text-accent" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        animate={isPaused ? {} : { 
          rotate: 360,
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
        }}
        className="absolute bottom-24 sm:bottom-32 left-[10%] sm:left-[20%] w-24 h-24 sm:w-32 sm:h-32"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="w-full h-full bg-glass backdrop-blur-2xl border-2 border-secondary rounded-2xl flex items-center justify-center shadow-glow-purple cursor-pointer"
          aria-label="Mobile app icon"
        >
          <Smartphone className="w-12 h-12 sm:w-16 sm:h-16 text-secondary" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-4 sm:px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-glass backdrop-blur-xl rounded-full border-2 border-glass shadow-glow-yellow"
        >
          <span className="text-accent font-bold mr-2 text-sm sm:text-base">✨</span>
          <span className="text-accent font-bold text-xs sm:text-base">AI THAT ACTUALLY SLAPS</span>
          <span className="text-accent ml-2 text-sm sm:text-base">✨</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black mb-6 sm:mb-8 leading-tight"
        >
          <span className="bg-gradient-coral-purple bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(248,129,112,0.5)]">
            {t("heroHeadline")}
          </span>
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground"
        >
          {t("heroSubhead")}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          {t("heroText")}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20"
        >
          <Button 
            variant="neon"
            className="w-full sm:w-auto rounded-full px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl shadow-[0_0_25px_rgba(255,220,74,0.7)] hover:shadow-[0_0_40px_rgba(255,220,74,1)]"
            onClick={() => {
              trackButtonClick("hero_lets_go_cta", t("letsGo"));
              trackAllPlatforms("button_click", {
                button_name: "hero_lets_go",
                conversion_type: "membership_signup_intent",
                location: "hero_section"
              });
            }}
          >
            <Zap className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
            {t("letsGo")}
          </Button>
          <Button 
            variant="secondary"
            className="w-full sm:w-auto rounded-full px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl"
            onClick={() => {
              trackButtonClick("hero_partner_up_cta", t("partnerUp"));
              trackAllPlatforms("button_click", {
                button_name: "hero_partner_up",
                conversion_type: "partner_signup_intent",
                location: "hero_section"
              });
            }}
          >
            <Users className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
            {t("partnerUp")}
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-6 sm:p-8 shadow-glow-coral hover:border-primary transition-all duration-300"
          >
            <div className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-coral-purple bg-clip-text text-transparent mb-2">
              <AnimatedCounter end={50} suffix="%" />
            </div>
            <div className="text-primary font-bold text-base sm:text-lg">{t("heroDiscountRate")}</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-6 sm:p-8 shadow-glow-purple hover:border-secondary transition-all duration-300"
          >
            <div className="text-5xl sm:text-6xl md:text-7xl font-black text-secondary mb-2">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <div className="text-secondary font-bold text-base sm:text-lg">{t("heroPartners")}</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-6 sm:p-8 shadow-glow-yellow hover:border-accent transition-all duration-300"
          >
            <div className="text-5xl sm:text-6xl md:text-7xl font-black text-accent mb-2">
              <AnimatedCounter end={2} prefix="€" suffix="M+" />
            </div>
          <div className="text-accent font-bold text-base sm:text-lg">{t("heroSaved")}</div>
          </motion.div>
        </motion.div>

        {/* App Store Badges */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <AppStoreBadges />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
