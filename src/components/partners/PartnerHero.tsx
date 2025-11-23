import { Building2, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const PartnerHero = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0b2e] via-[#2d1b4e] to-background">
      {/* Large gradient blob */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-pink-orange blur-[120px]" />
      </motion.div>

      {/* Floating icons */}
      <motion.div
        className="absolute top-20 left-[10%] w-20 h-20 bg-gradient-pink-orange rounded-3xl flex items-center justify-center shadow-glow-pink animate-float"
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Building2 className="w-10 h-10 text-foreground" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-[15%] w-24 h-24 bg-gradient-yellow rounded-3xl flex items-center justify-center shadow-glow-yellow animate-float-reverse"
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <DollarSign className="w-12 h-12 text-foreground" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-[8%] w-16 h-16 bg-gradient-coral rounded-2xl flex items-center justify-center shadow-glow-coral animate-float"
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Sparkles className="w-8 h-8 text-foreground" />
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-glass backdrop-blur-xl border-2 border-glass mb-8 shadow-glow-yellow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Building2 className="w-5 h-5 text-accent" />
            <span className="text-accent font-bold text-lg uppercase tracking-wider">
              {t("partners.hero.badge")}
            </span>
            <Sparkles className="w-5 h-5 text-accent" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="bg-gradient-pink-orange bg-clip-text text-transparent">
              {t("partners.hero.headline1")}
            </span>
            <br />
            <span className="bg-gradient-pink-orange bg-clip-text text-transparent">
              {t("partners.hero.headline2")}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-3xl md:text-4xl font-bold text-coral mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("partners.hero.subheadline")}
          </motion.p>

          {/* Body text */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {t("partners.hero.body")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              variant="neon"
              className="text-lg px-10 py-7 rounded-full font-black uppercase tracking-wide"
            >
              <Building2 className="w-6 h-6" />
              {t("partners.hero.cta.primary")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 rounded-full font-bold border-2 border-coral text-coral hover:bg-coral hover:text-foreground bg-background/50 backdrop-blur-xl"
            >
              {t("partners.hero.cta.secondary")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerHero;
