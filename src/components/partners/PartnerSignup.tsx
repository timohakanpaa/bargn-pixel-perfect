import { useState } from "react";
import { Building2, CheckCircle, Percent, User } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const PartnerSignup = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    venueName: "",
    city: "",
    email: "",
  });

  const steps = [
    {
      icon: User,
      number: 1,
      title: t("partners.signup.steps.step1.title"),
      description: t("partners.signup.steps.step1.description"),
      duration: t("partners.signup.steps.step1.duration"),
      gradient: "bg-gradient-pink-orange",
      glow: "shadow-glow-pink",
    },
    {
      icon: Percent,
      number: 2,
      title: t("partners.signup.steps.step2.title"),
      description: t("partners.signup.steps.step2.description"),
      action: t("partners.signup.steps.step2.action"),
      gradient: "bg-gradient-coral",
      glow: "shadow-glow-coral",
    },
    {
      icon: CheckCircle,
      number: 3,
      title: t("partners.signup.steps.step3.title"),
      description: t("partners.signup.steps.step3.description"),
      action: t("partners.signup.steps.step3.action"),
      gradient: "bg-gradient-purple-yellow",
      glow: "shadow-glow-purple",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.venueName || !formData.city || !formData.email) {
      toast.error(t("partners.signup.form.validation"));
      return;
    }
    
    // Trigger success confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
      });
    }, 250);

    toast.success(t("partners.signup.form.success"));
    setFormData({ venueName: "", city: "", email: "" });
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-background">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="text-accent text-lg font-bold mb-4 uppercase tracking-wider">
            {t("partners.signup.badge")}
          </p>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            {t("partners.signup.headline")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("partners.signup.subheadline")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
              key={index}
              className={`relative p-8 bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl hover:scale-105 transition-all duration-300 ${step.glow}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-purple-yellow rounded-full flex items-center justify-center text-foreground font-black text-xl shadow-glow-yellow">
                {step.number}
              </div>
              <div className={`w-20 h-20 ${step.gradient} rounded-3xl flex items-center justify-center mb-6 animate-pulse-glow`}>
                <step.icon className="w-10 h-10 text-foreground" />
              </div>
                <h3 className="text-2xl font-black mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {step.description}
                </p>
                {step.duration && (
                  <p className="text-accent font-bold text-lg">{step.duration}</p>
                )}
                {step.action && (
                  <p className="text-accent font-bold text-lg">{step.action}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-12 shadow-glow-yellow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-foreground font-bold mb-2 text-lg">
                {t("partners.signup.form.venueName")}
              </label>
              <Input
                type="text"
                value={formData.venueName}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                placeholder={t("partners.signup.form.venueNamePlaceholder")}
                className="bg-background/50 backdrop-blur-xl border-2 border-glass rounded-xl h-14 text-lg focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-foreground font-bold mb-2 text-lg">
                {t("partners.signup.form.city")}
              </label>
              <Input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={t("partners.signup.form.cityPlaceholder")}
                className="bg-background/50 backdrop-blur-xl border-2 border-glass rounded-xl h-14 text-lg focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-foreground font-bold mb-2 text-lg">
                {t("partners.signup.form.email")}
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t("partners.signup.form.emailPlaceholder")}
                className="bg-background/50 backdrop-blur-xl border-2 border-glass rounded-xl h-14 text-lg focus:border-accent"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              variant="neon"
              className="w-full text-xl py-8 rounded-2xl font-black uppercase tracking-wide"
            >
              <Building2 className="w-6 h-6" />
              {t("partners.signup.form.button")}
            </Button>
          </form>

          {/* Benefits checklist */}
          <div className="mt-8 flex flex-wrap gap-6 justify-center text-accent font-bold">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{t("partners.signup.benefits.noApplication")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{t("partners.signup.benefits.instantSetup")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{t("partners.signup.benefits.zeroCommission")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSignup;
