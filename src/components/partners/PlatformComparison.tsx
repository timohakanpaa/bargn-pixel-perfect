import { useState } from "react";
import { TrendingDown, TrendingUp, DollarSign, Percent } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Slider } from "@/components/ui/slider";

const PlatformComparison = () => {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();
  const [transactionValue, setTransactionValue] = useState(100);
  const [platformCommission, setPlatformCommission] = useState(35);

  // Calculations
  const discountToCustomer = 50; // 50% off
  const customerPays = transactionValue * 0.5;
  
  // Traditional Platform
  const traditionalRevenue = transactionValue * 0.5; // Remaining 50%
  const traditionalCommissionAmount = traditionalRevenue * (platformCommission / 100);
  const traditionalPartnerKeeps = traditionalRevenue - traditionalCommissionAmount;
  const traditionalMargin = (traditionalPartnerKeeps / transactionValue) * 100;

  // Bargn
  const bargnRevenue = transactionValue * 0.5; // Remaining 50%
  const bargnCommissionAmount = 0;
  const bargnPartnerKeeps = bargnRevenue;
  const bargnMargin = (bargnPartnerKeeps / transactionValue) * 100;

  const difference = bargnPartnerKeeps - traditionalPartnerKeeps;
  const percentageGain = ((difference / traditionalPartnerKeeps) * 100);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-background">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="text-accent text-lg font-bold mb-4 uppercase tracking-wider">
            {t("partners.comparison.badge")}
          </p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
            {t("partners.comparison.headline")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("partners.comparison.subheadline")}
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="max-w-4xl mx-auto mb-12 bg-glass backdrop-blur-2xl border-2 border-glass rounded-3xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-foreground font-bold mb-4 text-lg">
                <DollarSign className="inline w-5 h-5 mr-2" />
                {t("partners.comparison.transactionValue")}: €{transactionValue}
              </label>
              <Slider
                value={[transactionValue]}
                onValueChange={(value) => setTransactionValue(value[0])}
                min={50}
                max={500}
                step={10}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground">
                {t("partners.comparison.transactionHelper")}
              </p>
            </div>
            <div>
              <label className="block text-foreground font-bold mb-4 text-lg">
                <Percent className="inline w-5 h-5 mr-2" />
                {t("partners.comparison.platformCommission")}: {platformCommission}%
              </label>
              <Slider
                value={[platformCommission]}
                onValueChange={(value) => setPlatformCommission(value[0])}
                min={25}
                max={45}
                step={5}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground">
                {t("partners.comparison.commissionHelper")}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Traditional Platform */}
          <div className="bg-card/50 backdrop-blur-xl border-2 border-primary/50 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-glow-coral">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-coral rounded-2xl flex items-center justify-center shadow-glow-coral">
                <TrendingDown className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground">
                  {t("partners.comparison.traditional.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("partners.comparison.traditional.subtitle")}
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl">
                <span className="text-muted-foreground">{t("partners.comparison.originalPrice")}</span>
                <span className="text-xl font-bold text-foreground">€{transactionValue}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl">
                <span className="text-muted-foreground">{t("partners.comparison.customerPays")} (50% {t("partners.comparison.off")})</span>
                <span className="text-xl font-bold text-accent">€<AnimatedCounter end={customerPays} duration={500} decimals={2} /></span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl">
                <span className="text-muted-foreground">{t("partners.comparison.revenue")}</span>
                <span className="text-xl font-bold text-foreground">€<AnimatedCounter end={traditionalRevenue} duration={500} decimals={2} /></span>
              </div>
              <div className="flex justify-between items-center p-4 bg-primary/20 rounded-xl border-2 border-primary">
                <span className="text-primary font-semibold">{t("partners.comparison.platformTakes")} ({platformCommission}%)</span>
                <span className="text-xl font-bold text-primary">-€<AnimatedCounter end={traditionalCommissionAmount} duration={500} decimals={2} /></span>
              </div>
            </div>

            {/* Final Result */}
            <div className="p-6 bg-primary/10 rounded-2xl border-2 border-primary">
              <p className="text-sm text-muted-foreground mb-2">{t("partners.comparison.youKeep")}</p>
              <div className="text-5xl font-black text-primary mb-2">
                €<AnimatedCounter end={traditionalPartnerKeeps} duration={1000} decimals={2} />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-primary">
                  <AnimatedCounter end={traditionalMargin} duration={1000} decimals={1} />%
                </div>
                <span className="text-sm text-muted-foreground">{t("partners.comparison.margin")}</span>
              </div>
            </div>
          </div>

          {/* Bargn Platform */}
          <div className="bg-card/50 backdrop-blur-xl border-2 border-accent rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-glow-yellow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-purple-yellow rounded-2xl flex items-center justify-center shadow-glow-yellow animate-pulse-glow">
                <TrendingUp className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground">
                  {t("partners.comparison.bargn.title")}
                </h3>
                <p className="text-sm text-accent font-bold">
                  {t("partners.comparison.bargn.subtitle")}
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl">
                <span className="text-muted-foreground">{t("partners.comparison.originalPrice")}</span>
                <span className="text-xl font-bold text-foreground">€{transactionValue}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl">
                <span className="text-muted-foreground">{t("partners.comparison.customerPays")} (50% {t("partners.comparison.off")})</span>
                <span className="text-xl font-bold text-accent">€<AnimatedCounter end={customerPays} duration={500} decimals={2} /></span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl">
                <span className="text-muted-foreground">{t("partners.comparison.revenue")}</span>
                <span className="text-xl font-bold text-foreground">€<AnimatedCounter end={bargnRevenue} duration={500} decimals={2} /></span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent/20 rounded-xl border-2 border-accent">
                <span className="text-accent font-semibold">{t("partners.comparison.bargnTakes")} (0%)</span>
                <span className="text-xl font-bold text-accent">€<AnimatedCounter end={bargnCommissionAmount} duration={500} decimals={2} /></span>
              </div>
            </div>

            {/* Final Result */}
            <div className="p-6 bg-gradient-purple-yellow rounded-2xl shadow-glow-yellow">
              <p className="text-sm text-foreground/80 mb-2">{t("partners.comparison.youKeep")}</p>
              <div className="text-5xl font-black text-foreground mb-2">
                €<AnimatedCounter end={bargnPartnerKeeps} duration={1000} decimals={2} />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-foreground">
                  <AnimatedCounter end={bargnMargin} duration={1000} decimals={1} />%
                </div>
                <span className="text-sm text-foreground/80">{t("partners.comparison.margin")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Difference Highlight */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-glass backdrop-blur-2xl border-2 border-accent rounded-3xl p-8 text-center shadow-glow-yellow">
            <p className="text-accent font-bold mb-4 text-lg uppercase tracking-wider">
              {t("partners.comparison.difference.title")}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-muted-foreground mb-2">{t("partners.comparison.difference.extraRevenue")}</p>
                <div className="text-5xl font-black text-accent">
                  +€<AnimatedCounter end={difference} duration={1000} decimals={2} />
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">{t("partners.comparison.difference.moreProfit")}</p>
                <div className="text-5xl font-black text-accent">
                  +<AnimatedCounter end={percentageGain} duration={1000} decimals={0} />%
                </div>
              </div>
            </div>
            <p className="text-xl text-foreground mt-6 font-bold">
              {t("partners.comparison.difference.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformComparison;
