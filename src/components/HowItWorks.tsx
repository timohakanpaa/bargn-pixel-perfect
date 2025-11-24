import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/use-in-view";
import { Download, Map, ScanFace, Smartphone, Gift, Shield, Zap, Brain, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";

const HowItWorks = () => {
  const { t } = useLanguage();
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: timelineRef, isInView: timelineInView } = useInView({ threshold: 0.1 });
  const { ref: whyRef, isInView: whyInView } = useInView({ threshold: 0.1 });
  const [hasTriggeredHeroConfetti, setHasTriggeredHeroConfetti] = useState(false);
  const [hasTriggeredBenefitsConfetti, setHasTriggeredBenefitsConfetti] = useState(false);
  const [triggeredSteps, setTriggeredSteps] = useState<Set<number>>(new Set());
  
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
  
  // Trigger confetti when hero comes into view
  useEffect(() => {
    if (heroInView && !hasTriggeredHeroConfetti) {
      triggerWelcomeConfetti();
      setHasTriggeredHeroConfetti(true);
    }
  }, [heroInView, hasTriggeredHeroConfetti]);
  
  // Trigger confetti when benefits section comes into view
  useEffect(() => {
    if (whyInView && !hasTriggeredBenefitsConfetti) {
      triggerWelcomeConfetti();
      setHasTriggeredBenefitsConfetti(true);
    }
  }, [whyInView, hasTriggeredBenefitsConfetti]);
  
  // Parallax scroll refs
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Create different parallax speeds for depth
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.4]);

  const steps = [
    {
      number: 1,
      icon: Download,
      title: t("how.step1.title"),
      description: t("how.step1.description"),
      bullets: [t("how.step1.bullet1"), t("how.step1.bullet2")],
      gradient: "from-[hsl(328,86%,70%)] to-[hsl(25,95%,53%)]",
      cardGradient: "bg-gradient-to-br from-[hsl(328,86%,70%)] to-[hsl(25,95%,53%)]",
      badgeGradient: "bg-gradient-to-r from-[hsl(328,86%,70%)] to-[hsl(25,95%,53%)]",
      glow: "shadow-[0_0_40px_hsl(328_86%_70%_/_0.5)]"
    },
    {
      number: 2,
      icon: Map,
      title: t("how.step2.title"),
      description: t("how.step2.description"),
      bullets: [t("how.step2.bullet1"), t("how.step2.bullet2")],
      gradient: "from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]",
      cardGradient: "bg-gradient-to-br from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]",
      badgeGradient: "bg-gradient-to-r from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]",
      glow: "shadow-[0_0_40px_hsl(25_95%_53%_/_0.5)]"
    },
    {
      number: 3,
      icon: ScanFace,
      title: t("how.step3.title"),
      description: t("how.step3.description"),
      bullets: [t("how.step3.bullet1"), t("how.step3.bullet2")],
      gradient: "from-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)]",
      cardGradient: "bg-gradient-to-br from-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)]",
      badgeGradient: "bg-gradient-to-r from-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)]",
      glow: "shadow-[0_0_40px_hsl(48_100%_50%_/_0.5)]"
    },
    {
      number: 4,
      icon: Smartphone,
      title: t("how.step4.title"),
      description: t("how.step4.description"),
      bullets: [t("how.step4.bullet1"), t("how.step4.bullet2")],
      gradient: "from-[hsl(297,89%,60%)] to-[hsl(25,95%,53%)]",
      cardGradient: "bg-gradient-to-br from-[hsl(297,89%,60%)] to-[hsl(25,95%,53%)]",
      badgeGradient: "bg-gradient-to-r from-[hsl(328,86%,70%)] to-[hsl(25,95%,53%)]",
      glow: "shadow-[0_0_40px_hsl(297_89%_60%_/_0.5)]"
    },
    {
      number: 5,
      icon: Gift,
      title: t("how.step5.title"),
      description: t("how.step5.description"),
      bullets: [t("how.step5.bullet1"), t("how.step5.bullet2")],
      gradient: "from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]",
      cardGradient: "bg-gradient-to-br from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]",
      badgeGradient: "bg-gradient-to-r from-[hsl(25,95%,53%)] to-[hsl(48,100%,70%)]",
      glow: "shadow-[0_0_40px_hsl(25_95%_53%_/_0.5)]"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      iconGradient: "bg-gradient-to-br from-[hsl(297,89%,60%)] to-[hsl(297,89%,70%)]",
      title: t("how.benefit1.title"),
      description: t("how.benefit1.description")
    },
    {
      icon: Zap,
      iconGradient: "bg-gradient-to-br from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]",
      title: t("how.benefit2.title"),
      description: t("how.benefit2.description")
    },
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)]",
      title: t("how.benefit3.title"),
      description: t("how.benefit3.description")
    }
  ];

  // Floating icons for decoration with parallax
  const floatingIcons = [
    { Icon: Download, className: "top-20 left-10 animate-[float_6s_ease-in-out_infinite]", gradient: "from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)]", glow: "shadow-[0_0_60px_hsl(328_86%_70%_/_0.6)]", y: y1, rotate: rotate1 },
    { Icon: Sparkles, className: "top-40 right-20 animate-[float_8s_ease-in-out_infinite]", gradient: "from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]", glow: "shadow-[0_0_60px_hsl(25_95%_53%_/_0.6)]", y: y2, rotate: rotate2 },
    { Icon: Lightbulb, className: "bottom-32 left-20 animate-[float-reverse_7s_ease-in-out_infinite]", gradient: "from-[hsl(297,89%,60%)] to-[hsl(328,86%,70%)]", glow: "shadow-[0_0_60px_hsl(297_89%_60%_/_0.6)]", y: y3, rotate: rotate1 },
    { Icon: Zap, className: "top-1/3 right-10 animate-[float_9s_ease-in-out_infinite]", gradient: "from-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)]", glow: "shadow-[0_0_60px_hsl(48_100%_50%_/_0.6)]", y: y4, rotate: rotate2 },
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Parallax Background Gradients */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[hsl(328,86%,70%)]/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[hsl(297,89%,60%)]/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y3 }}
          className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-[hsl(48,100%,50%)]/15 to-transparent rounded-full blur-3xl"
        />
      </motion.div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative container mx-auto px-6 mb-32">
        {/* Floating Decorative Icons with Parallax */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            style={{ y: item.y, rotate: item.rotate }}
            className={`absolute ${item.className} hidden lg:block`}
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 15 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} ${item.glow} flex items-center justify-center rotate-12`}
            >
              <item.Icon className="w-8 h-8 text-background" />
            </motion.div>
          </motion.div>
        ))}

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(297,89%,60%)]/20 to-[hsl(25,95%,53%)]/20 border border-[hsl(297,89%,60%)]/30">
            <Lightbulb className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold text-accent uppercase tracking-wider">
              {t("how.badge")}
            </span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-br from-[hsl(328,86%,70%)] via-[hsl(297,89%,60%)] to-[hsl(25,95%,53%)] bg-clip-text text-transparent leading-tight">
            {t("how.hero.headline")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("how.hero.description")}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Button 
            size="lg" 
            className="rounded-full px-8 py-6 text-lg font-bold bg-gradient-to-r from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)] hover:opacity-90 transition-opacity shadow-[0_0_40px_hsl(328_86%_70%_/_0.4)]"
          >
            <Zap className="w-5 h-5 mr-2" />
            {t("startSaving")}
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="rounded-full px-8 py-6 text-lg font-bold border-2 border-foreground/20 hover:bg-foreground/5"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {t("becomePartner")}
          </Button>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div ref={timelineRef} className="relative container mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold text-lg mb-4 block">{t("how.timeline.label")}</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground">
            {t("how.timeline.heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("how.timeline.subheading")}
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="space-y-32">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const StepIcon = step.icon;
            const { ref: stepRef, isInView: stepInView } = useInView({ threshold: 0.3 });
            
            // Trigger confetti for each step
            useEffect(() => {
              if (stepInView && !triggeredSteps.has(index)) {
                confetti({
                  particleCount: 50,
                  spread: 70,
                  origin: { x: isEven ? 0.3 : 0.7, y: 0.6 },
                  colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
                });
                setTriggeredSteps(prev => new Set(prev).add(index));
              }
            }, [stepInView, index, isEven]);

            return (
              <motion.div
                key={index}
                ref={stepRef}
                initial={{ opacity: 0, y: 50 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content Side */}
                <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"} text-center lg:text-left`}>
                  <div className={`flex items-center gap-4 mb-6 ${isEven ? "lg:justify-end" : "lg:justify-start"} justify-center`}>
                    <div className={`w-12 h-12 rounded-full ${step.badgeGradient} flex items-center justify-center font-bold text-xl text-background ${step.glow}`}>
                      {step.number}
                    </div>
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <div className={`space-y-3 ${isEven ? "lg:items-end" : "lg:items-start"} flex flex-col items-center lg:items-start`}>
                    {step.bullets.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className={`flex items-center gap-2 ${isEven ? "lg:flex-row-reverse" : ""}`}>
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient}`}></div>
                        <span className="text-accent font-medium">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Card Side with Parallax */}
                <motion.div 
                  className="flex-1 flex justify-center"
                  style={{ y: useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -50 : 50]) }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className={`w-80 h-80 rounded-[3rem] ${step.cardGradient} ${step.glow} flex flex-col items-center justify-center p-8 rotate-3 transition-transform`}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <StepIcon className="w-24 h-24 text-background mb-4" strokeWidth={2} />
                    </motion.div>
                    <p className="text-2xl font-bold text-background text-center">
                      {step.title.split(' ')[0]}
                    </p>
                    <p className="text-background/80 text-center mt-2">
                      {step.bullets[0].split(' ').slice(0, 3).join(' ')}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Why We're Not Idiots Section */}
      <div ref={whyRef} className="relative py-24 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={whyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-bold text-lg mb-4 block">{t("how.why.label")}</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[hsl(25,95%,53%)] via-[hsl(328,86%,70%)] to-[hsl(48,100%,50%)] bg-clip-text text-transparent">
              {t("how.why.heading")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("how.why.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="relative p-8 rounded-3xl bg-gradient-to-b from-foreground/5 to-foreground/[0.02] border border-foreground/10 hover:border-foreground/20 transition-all"
                >
                  <div className={`w-16 h-16 rounded-2xl ${benefit.iconGradient} shadow-[0_0_30px_hsl(328_86%_70%_/_0.3)] flex items-center justify-center mb-6`}>
                    <BenefitIcon className="w-8 h-8 text-background" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;