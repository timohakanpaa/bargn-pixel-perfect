import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, Zap, Rocket, Shield, TrendingUp, Award, Lightbulb, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/use-in-view";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

const About = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
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

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "We put our members at the center of everything we do. Your savings are our success.",
      gradient: "from-[hsl(328,86%,70%)] to-[hsl(297,89%,60%)]",
      glow: "shadow-[0_0_40px_hsl(328_86%_70%_/_0.4)]"
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "No hidden fees, no fine print tricks. What you see is what you get – 50% off, period.",
      gradient: "from-[hsl(297,89%,60%)] to-[hsl(25,95%,53%)]",
      glow: "shadow-[0_0_40px_hsl(297_89%_60%_/_0.4)]"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We use cutting-edge AI to make saving money stupidly simple and actually fun.",
      gradient: "from-[hsl(25,95%,53%)] to-[hsl(48,100%,50%)]",
      glow: "shadow-[0_0_40px_hsl(25_95%_53%_/_0.4)]"
    },
    {
      icon: Users,
      title: "Community",
      description: "We're building a movement of smart spenders who refuse to pay full price.",
      gradient: "from-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)]",
      glow: "shadow-[0_0_40px_hsl(48_100%_50%_/_0.4)]"
    }
  ];

  const stats = [
    { icon: Users, number: "10,000+", label: "Happy Members" },
    { icon: Award, number: "500+", label: "Partner Locations" },
    { icon: TrendingUp, number: "€2.5M+", label: "Total Saved" },
    { icon: Star, number: "4.9/5", label: "Member Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20">
          {/* Giant Gradient Blob */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-coral-purple opacity-30 blur-[150px] rounded-full animate-pulse-glow"
          />
          
          {/* Floating Icons */}
          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360, y: [0, -20, 0] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity } }}
            className="absolute top-40 left-[10%] w-24 h-24 bg-glass backdrop-blur-2xl border-2 border-primary rounded-3xl flex items-center justify-center shadow-glow-coral"
          >
            <Target className="w-12 h-12 text-primary" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            animate={{ rotate: -360, y: [0, 20, 0] }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity } }}
            className="absolute top-32 right-[10%] w-20 h-20 bg-glass backdrop-blur-2xl border-2 border-secondary rounded-full flex items-center justify-center shadow-glow-purple"
          >
            <Heart className="w-10 h-10 text-secondary" />
          </motion.div>

          <motion.div
            style={{ y: y1 }}
            animate={{ rotate: 360, y: [0, -15, 0] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 3.5, repeat: Infinity } }}
            className="absolute bottom-40 left-[15%] w-28 h-28 bg-glass backdrop-blur-2xl border-2 border-accent rounded-2xl flex items-center justify-center shadow-glow-yellow"
          >
            <Lightbulb className="w-14 h-14 text-accent" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            animate={{ rotate: -360, y: [0, 18, 0] }}
            transition={{ rotate: { duration: 28, repeat: Infinity, ease: "linear" }, y: { duration: 3.8, repeat: Infinity } }}
            className="absolute bottom-32 right-[12%] w-24 h-24 bg-glass backdrop-blur-2xl border-2 border-primary rounded-3xl flex items-center justify-center shadow-glow-coral"
          >
            <Rocket className="w-12 h-12 text-primary" />
          </motion.div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-accent text-lg font-bold">✨ OUR STORY ✨</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-[hsl(328,86%,70%)] via-[hsl(297,89%,60%)] to-[hsl(25,95%,53%)] bg-clip-text text-transparent">
                We're Tired of
              </span>
              <br />
              <span className="bg-gradient-to-r from-[hsl(25,95%,53%)] via-[hsl(48,100%,50%)] to-[hsl(328,86%,70%)] bg-clip-text text-transparent">
                Paying Full Price
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              So we built something better. A platform where being broke but bougie isn't just acceptable – it's celebrated. 
              Join us in revolutionizing how people save money.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button variant="neon" size="lg" className="rounded-full px-10">
                <Users className="w-5 h-5 mr-2" />
                Join the Movement
              </Button>
              <Button variant="secondary" size="lg" className="rounded-full px-10">
                <Rocket className="w-5 h-5 mr-2" />
                Become a Partner
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-8 rounded-3xl bg-gradient-to-b from-foreground/5 to-foreground/[0.02] border border-foreground/10 hover:border-foreground/20 transition-all"
                  >
                    <StatIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <div className="text-4xl font-black mb-2 bg-gradient-coral-purple bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <span className="text-primary font-bold text-lg mb-4 block">OUR MISSION</span>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
                Making Savings Accessible to Everyone
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We believe everyone deserves to live their best life without breaking the bank. 
                That's why we're on a mission to democratize savings and make premium experiences 
                accessible to all – not just the wealthy elite.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-primary font-bold text-lg mb-4 block">WHAT WE STAND FOR</span>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These aren't just words on a wall. They're the principles we live by every single day.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const ValueIcon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="p-8 rounded-3xl bg-gradient-to-b from-foreground/5 to-foreground/[0.02] border border-foreground/10 hover:border-foreground/20 transition-all"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} ${value.glow} flex items-center justify-center mb-6`}>
                      <ValueIcon className="w-8 h-8 text-background" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-24 relative bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="text-primary font-bold text-lg mb-4 block">THE HUMANS BEHIND THE MAGIC</span>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
                Built by Broke People, For Broke People
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                We're not some corporate suits in a boardroom. We're real people who got tired of 
                watching their bank accounts cry every time we wanted to enjoy life. So we decided 
                to do something about it.
              </p>
              <Button 
                variant="neon" 
                size="lg" 
                className="rounded-full px-10"
                onClick={() => {
                  confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
                  });
                }}
              >
                <Heart className="w-5 h-5 mr-2" />
                Join Our Team
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