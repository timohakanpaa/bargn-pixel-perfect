import { Building2, DollarSign, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";

const PartnerHero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
            variant="neon"
            className="rounded-full px-10 py-7 text-xl"
          >
            <Building2 className="mr-2 w-6 h-6" />
            {t("partners.hero.cta.primary")}
          </Button>
          <Button 
            variant="secondary"
            className="rounded-full px-10 py-7 text-xl"
          >
            <Users className="mr-2 w-6 h-6" />
            {t("partners.hero.cta.secondary")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PartnerHero;
