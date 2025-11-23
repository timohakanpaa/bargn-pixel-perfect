import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Sparkles, PartyPopper } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

const SavingsCalculator = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [monthlySpending, setMonthlySpending] = useState(500);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState<{[key: number]: boolean}>({});
  
  // Calculate savings (50% discount on spending)
  const monthlySavings = Math.round(monthlySpending * 0.5);
  const annualSavings = monthlySavings * 12;
  
  // Calculate membership ROI
  const membershipCost = 53; // Annual cost
  const netSavings = annualSavings - membershipCost;
  const roi = Math.round((netSavings / membershipCost) * 100);
  
  // Progress bar percentage (max at €5000 annual savings for visual purposes)
  const progressPercentage = Math.min((annualSavings / 5000) * 100, 100);

  // Confetti celebration thresholds
  const celebrationThresholds = [1000, 2000, 3000, 5000, 10000];

  // Trigger confetti when crossing thresholds
  useEffect(() => {
    celebrationThresholds.forEach((threshold) => {
      if (annualSavings >= threshold && !hasTriggeredConfetti[threshold]) {
        triggerConfetti(threshold);
        setHasTriggeredConfetti(prev => ({ ...prev, [threshold]: true }));
      } else if (annualSavings < threshold && hasTriggeredConfetti[threshold]) {
        // Reset if going below threshold
        setHasTriggeredConfetti(prev => {
          const newState = { ...prev };
          delete newState[threshold];
          return newState;
        });
      }
    });
  }, [annualSavings, hasTriggeredConfetti]);

  const triggerConfetti = (threshold: number) => {
    // Different confetti styles based on threshold
    const count = threshold >= 5000 ? 200 : threshold >= 3000 ? 150 : 100;
    const spread = threshold >= 5000 ? 100 : 70;

    // Fire confetti from multiple positions
    const duration = threshold >= 5000 ? 3000 : 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = count * (timeLeft / duration);

      // Confetti from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
      });
      
      // Confetti from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f88170', '#ef1df2', '#ffe500', '#ff6b9d']
      });
    }, 250);

    // Show toast message
    const messages = {
      1000: { en: "€1K+ in savings! You're on fire! 🔥", fi: "€1K+ säästöissä! Olet tulessa! 🔥" },
      2000: { en: "€2K savings! Financial genius unlocked! 🧠", fi: "€2K säästöjä! Talousnerouden lukitus avattu! 🧠" },
      3000: { en: "€3K+! You're basically a savings legend! ⭐", fi: "€3K+! Oot periaatteessa säästölegenda! ⭐" },
      5000: { en: "€5K+!! ABSOLUTE LEGEND STATUS! 👑", fi: "€5K+!! ABSOLUUTTINEN LEGENDA! 👑" },
      10000: { en: "€10K+!!! ARE YOU EVEN REAL?! 🚀🎉", fi: "€10K+!!! OLETKO EDES OIKEA?! 🚀🎉" }
    };

    toast({
      title: messages[threshold as keyof typeof messages][language as 'en' | 'fi'],
      description: language === "en" 
        ? "Keep sliding to see what's possible!" 
        : "Jatka liukumista nähdäksesi mitä on mahdollista!",
      duration: 3000,
    });
  };

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 md:p-12 hover:border-primary hover:shadow-glow-coral transition-all duration-300 relative overflow-hidden">
      {/* Celebration indicator */}
      {annualSavings >= 3000 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-4 right-4"
        >
          <div className="w-16 h-16 bg-gradient-purple-yellow rounded-full flex items-center justify-center shadow-glow-yellow animate-pulse">
            <PartyPopper className="w-8 h-8 text-foreground" />
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-14 h-14 bg-gradient-purple-yellow rounded-2xl flex items-center justify-center shadow-glow-yellow">
          <TrendingUp className="w-7 h-7 text-foreground" />
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-foreground">
          {language === "en" ? "Savings Calculator" : "Säästölaskuri"}
        </h3>
      </div>

      <p className="text-center text-muted-foreground text-lg mb-8">
        {language === "en" 
          ? "See how much you could save with Bargn membership" 
          : "Katso paljonko voisit säästää Bargn jäsenyydellä"}
      </p>

      {/* Slider Input */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="text-foreground font-bold text-lg">
            {language === "en" ? "Monthly Spending on Dining & Services:" : "Kuukausittaiset kulut ravintolat & palvelut:"}
          </label>
          <div className="text-3xl font-black bg-gradient-coral-purple bg-clip-text text-transparent">
            {formatCurrency(monthlySpending)}
          </div>
        </div>
        
        <Slider
          value={[monthlySpending]}
          onValueChange={(value) => setMonthlySpending(value[0])}
          min={100}
          max={2000}
          step={50}
          className="w-full"
        />
        
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>€100</span>
          <span>€2000</span>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-foreground font-bold">
              {language === "en" ? "Your Annual Savings:" : "Sinun vuosisäästöt:"}
            </span>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-2xl font-black text-accent">
                {formatCurrency(annualSavings)}
              </span>
            </div>
          </div>
          
          <div className="relative h-8 bg-muted rounded-full overflow-hidden border-2 border-glass">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="absolute inset-y-0 left-0 bg-gradient-purple-yellow shadow-glow-yellow"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground"
            >
              {language === "en" ? "Saving" : "Säästät"} {Math.round(progressPercentage)}%
            </motion.div>
          </div>
        </div>

        {/* Breakdown Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-glass backdrop-blur-xl border border-glass rounded-2xl p-4 text-center"
          >
            <div className="text-sm text-muted-foreground mb-1">
              {language === "en" ? "Monthly Savings" : "Kuukausittaiset säästöt"}
            </div>
            <div className="text-2xl font-black text-primary">
              {formatCurrency(monthlySavings)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-glass backdrop-blur-xl border border-glass rounded-2xl p-4 text-center"
          >
            <div className="text-sm text-muted-foreground mb-1">
              {language === "en" ? "Net Profit" : "Nettohyöty"}
            </div>
            <div className="text-2xl font-black text-secondary">
              {formatCurrency(netSavings)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-glass backdrop-blur-xl border border-glass rounded-2xl p-4 text-center"
          >
            <div className="text-sm text-muted-foreground mb-1">
              {language === "en" ? "Return on Investment" : "Tuotto"}
            </div>
            <div className="text-2xl font-black text-accent">
              {roi}%
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-coral-purple/10 border-2 border-primary/30 rounded-2xl p-6 text-center"
        >
          <p className="text-foreground font-bold text-lg">
            {language === "en" 
              ? `You'll save ${formatCurrency(netSavings)} more than what you pay for membership!` 
              : `Säästät ${formatCurrency(netSavings)} enemmän kuin mitä jäsenyys maksaa!`}
          </p>
          <p className="text-muted-foreground mt-2">
            {language === "en"
              ? "That's like getting paid to save money. Big brain moves."
              : "Se on niinku saisit maksua siitä et säästät rahaa. Big brain moves."}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
