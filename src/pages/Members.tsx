import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Crown, Users, Percent, CreditCard, Check, Brain, Shield, Zap, Rocket, Gift, Lightbulb, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimatedCounter from "@/components/AnimatedCounter";
import SavingsCalculator from "@/components/SavingsCalculator";

const Members = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="min-h-screen">
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
          className="absolute top-40 left-[10%] w-24 h-24 bg-glass backdrop-blur-2xl border-2 border-secondary rounded-3xl flex items-center justify-center shadow-glow-purple"
        >
          <Crown className="w-12 h-12 text-secondary" />
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          animate={{ rotate: -360, y: [0, 20, 0] }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity } }}
          className="absolute top-32 right-[10%] w-20 h-20 bg-glass backdrop-blur-2xl border-2 border-primary rounded-full flex items-center justify-center shadow-glow-coral"
        >
          <Users className="w-10 h-10 text-primary" />
        </motion.div>

        <motion.div
          style={{ y: y1 }}
          animate={{ rotate: 360, y: [0, -15, 0] }}
          transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity } }}
          className="absolute bottom-40 left-[15%] w-28 h-28 bg-glass backdrop-blur-2xl border-2 border-accent rounded-2xl flex items-center justify-center shadow-glow-yellow"
        >
          <Percent className="w-14 h-14 text-accent" />
        </motion.div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-glass backdrop-blur-xl rounded-full border-2 border-secondary shadow-glow-purple"
          >
            <Crown className="w-5 h-5 text-accent" />
            <span className="text-accent font-bold">EXCLUSIVE MEMBERSHIP</span>
            <Zap className="w-5 h-5 text-accent" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-black mb-4 leading-tight"
          >
            <span className="bg-gradient-coral-purple bg-clip-text text-transparent">
              {t("membersHero")}
            </span>
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-8xl font-black mb-8 bg-gradient-purple-yellow bg-clip-text text-transparent"
          >
            {t("membersHeroSub")}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12"
          >
            {t("membersHeroDesc")}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <Button variant="neon" className="rounded-full px-10 py-7 text-xl group">
              <Crown className="mr-2 w-6 h-6 group-hover:animate-wobble" />
              {t("startSaving")}
            </Button>
            <Button variant="secondary" className="rounded-full px-10 py-7 text-xl border-2 border-primary">
              <Users className="mr-2 w-6 h-6" />
              {t("becomePartner")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-black text-accent mb-2">
                <AnimatedCounter end={10000} suffix="+" />
              </div>
              <div className="text-primary font-bold text-lg">{t("happyMembers")}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-black bg-gradient-coral-purple bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={50} suffix="%" />
              </div>
              <div className="text-secondary font-bold text-lg">{t("avgSavings")}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-black bg-gradient-purple-yellow bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={2400} prefix="€" />
              </div>
              <div className="text-primary font-bold text-lg">{t("avgAnnualSavings")}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-black text-accent mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-secondary font-bold text-lg">{t("partnerOutlets")}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary font-bold text-xl mb-4">{t("whyLoveUs")}</p>
            <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              {t("perksThatSlap")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              {t("perksDesc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: Percent, gradient: "bg-gradient-coral-purple", title: t("unlimitedDiscounts"), desc: t("unlimitedDiscountsDesc") },
              { icon: Brain, gradient: "bg-gradient-coral", title: t("aiNotDumb"), desc: t("aiNotDumbDesc") },
              { icon: Crown, gradient: "bg-gradient-purple-yellow", title: t("vipTreatment"), desc: t("vipTreatmentDesc") },
              { icon: Shield, gradient: "bg-gradient-purple-yellow", title: t("supportDamn"), desc: t("supportDamnDesc") },
            ].map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 hover:border-primary hover:shadow-glow-coral transition-all duration-300"
              >
                <div className={`w-16 h-16 ${perk.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-glow-coral`}>
                  <perk.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{perk.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SavingsCalculator />
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black bg-gradient-purple-yellow bg-clip-text text-transparent mb-6">
              {t("pricingTitle")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("pricingDesc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Monthly Plan */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ rotateY: 5, scale: 1.02 }}
              className="relative group"
              style={{ perspective: 1000 }}
            >
              <div className="absolute inset-0 bg-gradient-coral opacity-30 blur-3xl rounded-3xl" />
              <div className="relative bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl overflow-hidden hover:border-primary hover:shadow-glow-coral transition-all duration-300">
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-coral rounded-2xl flex items-center justify-center mb-6 shadow-glow-coral">
                    <CreditCard className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4">{t("monthlyFlex")}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-6xl font-black bg-gradient-coral-purple bg-clip-text text-transparent">€8.8</span>
                    <span className="text-muted-foreground text-lg">{t("perMonth")}</span>
                  </div>
                  <div className="space-y-4 mb-8">
                    {[t("unlimitedDiscounts"), t("aiNotDumb"), t("supportDamn"), t("vipTreatment"), t("cancelAnytime")].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="neon" className="w-full rounded-full py-6 text-lg">
                    {t("joinNow")}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Annual Plan */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ rotateY: -5, scale: 1.02 }}
              className="relative group"
              style={{ perspective: 1000 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-gradient-purple-yellow px-6 py-2 rounded-full shadow-glow-yellow">
                  <span className="text-foreground font-bold flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    {t("bestValue")}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-purple-yellow opacity-30 blur-3xl rounded-3xl animate-pulse-glow" />
              <div className="relative bg-glass backdrop-blur-2xl border-2 border-secondary rounded-3xl overflow-hidden hover:border-accent hover:shadow-glow-yellow transition-all duration-300">
                <div className="p-8 pt-12">
                  <div className="w-16 h-16 bg-gradient-purple-yellow rounded-2xl flex items-center justify-center mb-6 shadow-glow-yellow">
                    <Crown className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-3xl font-black bg-gradient-purple-yellow bg-clip-text text-transparent mb-4">{t("annualPower")}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-black text-accent">€53</span>
                    <span className="text-muted-foreground text-lg">{t("perYear")}</span>
                  </div>
                  <div className="bg-accent/20 border border-accent rounded-full px-4 py-2 inline-block mb-6">
                    <span className="text-accent font-bold text-sm">{t("saveAnnually")}</span>
                  </div>
                  <div className="space-y-4 mb-8">
                    {[t("unlimitedDiscounts"), t("aiNotDumb"), t("supportDamn"), t("vipTreatment"), t("monthsFree")].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full rounded-full py-6 text-lg bg-gradient-purple-yellow text-foreground font-bold hover:scale-105 transition-transform">
                    {t("joinNow")}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Plans Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 text-center">
              <p className="text-accent font-bold mb-4">{t("bothPlans")}</p>
              <p className="text-foreground mb-4">{t("bothPlansDesc")}</p>
              <p className="text-primary text-sm">{t("noHiddenFees")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary font-bold text-xl mb-4">{t("memberStories")}</p>
            <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              {t("realMembers")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("realMembersDesc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Jessica M., Savings Queen",
                stars: 5,
                text: "Not gonna lie, Bargn made me look like a financial wizard. Saved €1,200 in 6 months while my friends are still paying full price like amateurs. The AI is lowkey telepathic.",
                badge: "Verified Premium Member",
                avatar: "JM"
              },
              {
                name: "David R., VIP Royalty",
                stars: 5,
                text: "VIP life hits different when you're saving €300 on spa weekends. My bank account is finally happy and my stress levels are non-existent. This app is pure serotonin.",
                badge: "Verified VIP Elite Member",
                avatar: "DR"
              },
              {
                name: "Maria L., Deal Detective",
                stars: 5,
                text: "Started with basic plan because I'm cheap but saved €200+ first month. Now I'm that friend who always knows where to get the hookup. Main character energy unlocked.",
                badge: "Verified Basic Member",
                avatar: "ML"
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 hover:border-primary hover:shadow-glow-coral transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-coral-purple rounded-full flex items-center justify-center shadow-glow-purple border-2 border-primary">
                    <span className="text-xl font-bold">{testimonial.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-1">{testimonial.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4 leading-relaxed">"{testimonial.text}"</p>
                <p className="text-primary text-sm font-medium">{testimonial.badge}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Members-Only Perks */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary font-bold text-xl mb-4">{t("exclusiveFeatures")}</p>
            <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              {t("membersOnlyPerks")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("membersOnlyPerksDesc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Rocket, gradient: "bg-gradient-coral-purple", title: t("earlyAccess"), desc: t("earlyAccessDesc") },
              { icon: Users, gradient: "bg-gradient-coral", title: t("exclusiveEvents"), desc: t("exclusiveEventsDesc") },
              { icon: Gift, gradient: "bg-gradient-purple-yellow", title: t("limitedOffers"), desc: t("limitedOffersDesc") },
            ].map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 hover:border-accent hover:shadow-glow-yellow transition-all duration-300"
              >
                <div className={`w-16 h-16 ${perk.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-glow-yellow`}>
                  <perk.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{perk.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary font-bold text-xl mb-4">{t("faqTitle")}</p>
            <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              {t("faqHeading")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl px-8 hover:border-primary transition-colors">
                <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline py-6">
                  {t("faqQ1")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg pb-6">
                  {t("faqA1")}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl px-8 hover:border-secondary transition-colors">
                <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline py-6">
                  {t("faqQ2")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg pb-6">
                  {t("faqA2")}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl px-8 hover:border-accent transition-colors">
                <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline py-6">
                  {t("faqQ3")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg pb-6">
                  {t("faqA3")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-coral-purple opacity-40 blur-3xl" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              {t("ctaHeading")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button variant="neon" size="lg" className="rounded-full px-12 py-7 text-xl">
                <Crown className="mr-2 w-6 h-6" />
                {t("startSaving")}
              </Button>
              <Button variant="secondary" size="lg" className="rounded-full px-12 py-7 text-xl border-2 border-primary">
                <Users className="mr-2 w-6 h-6" />
                {t("becomePartner")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      </div>
    </div>
  );
};

export default Members;
