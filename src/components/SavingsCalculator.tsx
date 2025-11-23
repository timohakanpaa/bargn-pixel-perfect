import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SavingsCalculator = () => {
  const { language } = useLanguage();
  const [monthlySpending, setMonthlySpending] = useState(500);
  
  // Calculate savings (50% discount on spending)
  const monthlySavings = Math.round(monthlySpending * 0.5);
  const annualSavings = monthlySavings * 12;
  
  // Calculate membership ROI
  const membershipCost = 53; // Annual cost
  const netSavings = annualSavings - membershipCost;
  const roi = Math.round((netSavings / membershipCost) * 100);
  
  // Progress bar percentage (max at €5000 annual savings for visual purposes)
  const progressPercentage = Math.min((annualSavings / 5000) * 100, 100);

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8 md:p-12 hover:border-primary hover:shadow-glow-coral transition-all duration-300">
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
