import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Brain, Shield, Heart, Zap, Rocket, Lightbulb, Sparkles, Percent, Users2, Target } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/use-in-view";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { useAnalytics } from "@/hooks/use-analytics";

const About = () => {
  useAnalytics(); // Auto-track page view
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const { ref: storyRef, isInView: storyInView } = useInView({ threshold: 0.1 });
  const { ref: missionRef, isInView: missionInView } = useInView({ threshold: 0.1 });
  const { ref: valuesRef, isInView: valuesInView } = useInView({ threshold: 0.1 });
  const { ref: teamRef, isInView: teamInView } = useInView({ threshold: 0.1 });
  
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    if (!hasTriggeredConfetti) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
        });
        setHasTriggeredConfetti(true);
      }, 800);
    }
  }, [hasTriggeredConfetti]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
    });
  };

  const teamMembers = [
    {
      name: t("about.team.member1.name"),
      role: t("about.team.member1.role"),
      bio: t("about.team.member1.bio"),
      gradient: "from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)]"
    },
    {
      name: t("about.team.member2.name"),
      role: t("about.team.member2.role"),
      bio: t("about.team.member2.bio"),
      gradient: "from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]"
    },
    {
      name: t("about.team.member3.name"),
      role: t("about.team.member3.role"),
      bio: t("about.team.member3.bio"),
      gradient: "from-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)]"
    },
    {
      name: t("about.team.member4.name"),
      role: t("about.team.member4.role"),
      bio: t("about.team.member4.bio"),
      gradient: "from-[hsl(297,89%,60%)] to-[hsl(25,95%,53%)]"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20">
          {/* Giant Gradient Blob */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-purple-yellow opacity-30 blur-[150px] rounded-full animate-pulse-glow"
          />
          
          {/* Floating Icons */}
          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360, y: [0, -20, 0] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity } }}
            className="absolute top-40 left-[10%] w-24 h-24 bg-glass backdrop-blur-2xl border-2 border-secondary rounded-3xl flex items-center justify-center shadow-glow-purple"
          >
            <Brain className="w-12 h-12 text-secondary" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            animate={{ rotate: -360, y: [0, 20, 0] }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity } }}
            className="absolute top-32 right-[10%] w-20 h-20 bg-glass backdrop-blur-2xl border-2 border-accent rounded-full flex items-center justify-center shadow-glow-yellow"
          >
            <Lightbulb className="w-10 h-10 text-accent" />
          </motion.div>

          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360, y: [0, -15, 0] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 3.5, repeat: Infinity } }}
            className="absolute bottom-40 left-[15%] w-28 h-28 bg-glass backdrop-blur-2xl border-2 border-primary rounded-2xl flex items-center justify-center shadow-glow-coral"
          >
            <Sparkles className="w-14 h-14 text-primary" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            animate={{ rotate: -360, y: [0, 18, 0] }}
            transition={{ rotate: { duration: 28, repeat: Infinity, ease: "linear" }, y: { duration: 3.8, repeat: Infinity } }}
            className="absolute bottom-32 right-[12%] w-24 h-24 bg-glass backdrop-blur-2xl border-2 border-secondary rounded-3xl flex items-center justify-center shadow-glow-purple"
          >
            <Rocket className="w-12 h-12 text-secondary" />
          </motion.div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[hsl(297,89%,60%)]/20 to-[hsl(25,95%,53%)]/20 backdrop-blur-xl rounded-full border-2 border-accent/30">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-accent text-lg font-bold uppercase tracking-wider">{t("about.hero.badge")}</span>
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)] bg-clip-text text-transparent">
                {t("about.hero.headline1")}
              </span>
              <br />
              <span className="bg-gradient-to-r from-[hsl(297,89%,60%)] to-[hsl(25,95%,53%)] bg-clip-text text-transparent">
                {t("about.hero.headline2")}
              </span>
              <br />
              <span className="bg-gradient-to-r from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)] bg-clip-text text-transparent opacity-60">
                {t("about.hero.headline3")}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              {t("about.hero.subtext")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button 
                variant="neon" 
                size="lg" 
                className="rounded-full px-12 py-7 text-xl shadow-[0_0_50px_hsl(328_86%_70%_/_0.5)]"
                onClick={triggerConfetti}
              >
                <Zap className="w-6 h-6 mr-2" />
                {t("about.hero.cta1")}
              </Button>
              <Button 
                size="lg" 
                className="rounded-full px-12 py-7 text-xl bg-transparent border-2 border-primary text-primary hover:bg-primary/10"
                onClick={triggerConfetti}
              >
                <Users2 className="w-6 h-6 mr-2" />
                {t("about.hero.cta2")}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section ref={storyRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-secondary font-bold text-lg mb-4 block">{t("about.story.badge")}</span>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground leading-tight">
                  {t("about.story.headline")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("about.story.text")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-video rounded-3xl bg-gradient-to-br from-foreground/10 to-foreground/5 border border-foreground/20 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-pink-orange flex items-center justify-center shadow-glow-pink">
                        <Rocket className="w-12 h-12 text-background" />
                      </div>
                      <div className="text-5xl font-black text-foreground mb-2">{t("about.story.founded")}</div>
                      <div className="text-primary font-bold">{t("about.story.tagline")}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating decorative icons */}
          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360 }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" } }}
            className="absolute bottom-20 left-[8%] w-20 h-20 bg-glass backdrop-blur-2xl border-2 border-accent rounded-2xl flex items-center justify-center shadow-glow-yellow hidden lg:flex"
          >
            <Target className="w-10 h-10 text-accent" />
          </motion.div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <span className="text-primary font-bold text-lg mb-6 block">{t("about.mission.badge")}</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight bg-gradient-to-r from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)] bg-clip-text text-transparent">
                {t("about.mission.headline")}
              </h2>
              <p className="text-lg md:text-xl text-foreground max-w-4xl mx-auto leading-relaxed">
                {t("about.mission.text")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)] flex items-center justify-center shadow-[0_0_40px_hsl(328_86%_70%_/_0.5)]">
                  <Percent className="w-14 h-14 text-background" strokeWidth={3} />
                </div>
                <h3 className="text-5xl font-black mb-3 bg-gradient-to-r from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)] bg-clip-text text-transparent">
                  {t("about.mission.card1.title")}
                </h3>
                <p className="text-muted-foreground">{t("about.mission.card1.desc")}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)] flex items-center justify-center shadow-[0_0_40px_hsl(25_95%_53%_/_0.5)]">
                  <Brain className="w-14 h-14 text-background" strokeWidth={2.5} />
                </div>
                <h3 className="text-4xl font-black mb-3 text-foreground">
                  {t("about.mission.card2.title")}
                </h3>
                <p className="text-muted-foreground">{t("about.mission.card2.desc")}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)] flex items-center justify-center shadow-[0_0_40px_hsl(48_100%_50%_/_0.5)]">
                  <Shield className="w-14 h-14 text-background" strokeWidth={2.5} />
                </div>
                <h3 className="text-4xl font-black mb-3 text-foreground">
                  {t("about.mission.card3.title")}
                </h3>
                <p className="text-muted-foreground">{t("about.mission.card3.desc")}</p>
              </motion.div>
            </div>
          </div>

          {/* Floating decorative icon */}
          <motion.div
            style={{ y: y2 }}
            animate={{ rotate: -360 }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" } }}
            className="absolute bottom-32 right-[8%] w-24 h-24 bg-glass backdrop-blur-2xl border-2 border-accent rounded-3xl flex items-center justify-center shadow-glow-yellow hidden lg:flex"
          >
            <Lightbulb className="w-12 h-12 text-accent" />
          </motion.div>

          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360 }}
            transition={{ rotate: { duration: 35, repeat: Infinity, ease: "linear" } }}
            className="absolute top-32 left-[5%] w-20 h-20 bg-glass backdrop-blur-2xl border-2 border-secondary rounded-full flex items-center justify-center shadow-glow-purple hidden lg:flex"
          >
            <Heart className="w-10 h-10 text-secondary" />
          </motion.div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-24 relative bg-gradient-to-b from-background/50 to-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-secondary font-bold text-lg mb-4 block">{t("about.values.badge")}</span>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
                {t("about.values.headline")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("about.values.subtext")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl bg-gradient-to-b from-background to-background/50 border border-foreground/10 hover:border-foreground/20 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)] flex items-center justify-center mb-6 shadow-[0_0_30px_hsl(328_86%_70%_/_0.4)]">
                  <Lightbulb className="w-8 h-8 text-background" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{t("about.values.card1.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("about.values.card1.desc")}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl bg-gradient-to-b from-background to-background/50 border border-foreground/10 hover:border-foreground/20 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)] flex items-center justify-center mb-6 shadow-[0_0_30px_hsl(25_95%_53%_/_0.4)]">
                  <Shield className="w-8 h-8 text-background" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{t("about.values.card2.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("about.values.card2.desc")}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl bg-gradient-to-b from-background to-background/50 border border-foreground/10 hover:border-foreground/20 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)] flex items-center justify-center mb-6 shadow-[0_0_30px_hsl(48_100%_50%_/_0.4)]">
                  <Heart className="w-8 h-8 text-background" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{t("about.values.card3.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("about.values.card3.desc")}</p>
              </motion.div>
            </div>
          </div>

          {/* Floating decorative icon */}
          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360 }}
            transition={{ rotate: { duration: 28, repeat: Infinity, ease: "linear" } }}
            className="absolute bottom-20 right-[10%] w-24 h-24 bg-glass backdrop-blur-2xl border-2 border-primary rounded-3xl flex items-center justify-center shadow-glow-coral hidden lg:flex"
          >
            <Sparkles className="w-12 h-12 text-primary" />
          </motion.div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-secondary font-bold text-lg mb-4 block">{t("about.team.badge")}</span>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
                {t("about.team.headline")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("about.team.subtext")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-3xl bg-gradient-to-b from-background to-background/50 border border-foreground/10 hover:border-foreground/20 transition-all text-center"
                >
                  <div className={`w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.gradient} p-1 shadow-[0_0_30px_hsl(328_86%_70%_/_0.3)]`}>
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <Users2 className="w-12 h-12 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{member.name}</h3>
                  <div className="text-sm font-medium mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {member.role}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center"
            >
              <Button 
                size="lg" 
                className="rounded-full px-10 py-6 text-lg bg-transparent border-2 border-primary text-primary hover:bg-primary/10"
                onClick={triggerConfetti}
              >
                <Users2 className="w-5 h-5 mr-2" />
                {t("about.team.cta")}
              </Button>
            </motion.div>
          </div>

          {/* Floating decorative icon */}
          <motion.div
            style={{ y: y2 }}
            animate={{ rotate: -360 }}
            transition={{ rotate: { duration: 32, repeat: Infinity, ease: "linear" } }}
            className="absolute top-32 right-[8%] w-24 h-24 bg-glass backdrop-blur-2xl border-2 border-accent rounded-full flex items-center justify-center shadow-glow-yellow hidden lg:flex"
          >
            <Target className="w-12 h-12 text-accent" />
          </motion.div>
        </section>

        {/* Final CTA Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(328,86%,70%)] via-[hsl(297,89%,60%)] via-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]" />
          
          {/* Decorative floating icons on gradient */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: 360 }}
            transition={{ y: { duration: 4, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
            className="absolute top-1/4 left-[5%] w-16 h-16 text-background/30"
          >
            <Zap className="w-full h-full" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: -360 }}
            transition={{ y: { duration: 5, repeat: Infinity }, rotate: { duration: 25, repeat: Infinity, ease: "linear" } }}
            className="absolute top-1/3 right-[8%] w-12 h-12 text-background/30"
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0], rotate: 360 }}
            transition={{ y: { duration: 4.5, repeat: Infinity }, rotate: { duration: 22, repeat: Infinity, ease: "linear" } }}
            className="absolute bottom-1/4 left-[10%] w-14 h-14 text-background/30"
          >
            <Percent className="w-full h-full" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 18, 0], rotate: -360 }}
            transition={{ y: { duration: 5.5, repeat: Infinity }, rotate: { duration: 28, repeat: Infinity, ease: "linear" } }}
            className="absolute top-1/2 right-[15%] w-10 h-10 text-background/30"
          >
            <Users2 className="w-full h-full" />
          </motion.div>

          <div className="relative z-10 container mx-auto px-6 py-32 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black mb-6 text-background"
            >
              {t("about.cta.headline")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-background/90 max-w-3xl mx-auto mb-12"
            >
              {t("about.cta.subtext")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button 
                size="lg" 
                className="rounded-full px-12 py-7 text-xl bg-background text-foreground hover:bg-background/90 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                onClick={triggerConfetti}
              >
                <Zap className="w-6 h-6 mr-2" />
                {t("about.cta.button1")}
              </Button>
              <Button 
                size="lg" 
                className="rounded-full px-12 py-7 text-xl bg-transparent border-2 border-background text-background hover:bg-background/10"
                onClick={triggerConfetti}
              >
                <Users2 className="w-6 h-6 mr-2" />
                {t("about.cta.button2")}
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;