import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { ShieldCheck, CreditCard, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import bargnLogo from "@/assets/bargn-logo.png";

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/fZu9AT5Oobc1fY65Lu3ZK04";

const Checkout = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFi = language === "fi";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError(isFi ? "Anna kelvollinen sähköpostiosoite" : "Please enter a valid email");
      return;
    }
    if (!termsAccepted) {
      setError(isFi ? "Sinun tulee hyväksyä ehdot" : "You must accept the terms");
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase.from("checkout_leads").insert({
        email: email.trim().toLowerCase(),
        terms_accepted: termsAccepted,
      });

      if (dbError) throw dbError;

      // Redirect to Stripe
      window.location.href = STRIPE_CHECKOUT_URL;
    } catch {
      setError(isFi ? "Jokin meni pieleen. Yritä uudelleen." : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const benefits = isFi
    ? [
        "Jopa 50% alennukset ravintoloista ja palveluista",
        "Pääsy kaikkiin kumppanietumme välittömästi",
        "Voit peruuttaa milloin tahansa",
      ]
    : [
        "Up to 50% discounts on restaurants & services",
        "Instant access to all partner benefits",
        "Cancel anytime",
      ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <Link to="/" className="mb-6">
        <img src={bargnLogo} alt="Bargn" className="h-10" />
      </Link>

      {/* Main card */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
            {isFi ? "Liity Bargniin 🎉" : "Join Bargn 🎉"}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {isFi
              ? "Olet ottamassa käyttöön Bargn-jäsenyyttä. Syötä sähköpostisi ja siirry turvalliseen maksuun."
              : "You're about to activate your Bargn membership. Enter your email and proceed to secure payment."}
          </p>
        </div>

        {/* Benefits */}
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-4 mb-5">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
            {isFi ? "Mitä saat" : "What you get"}
          </p>
          <ul className="space-y-2">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
              {isFi ? "Sähköpostiosoite *" : "Email address *"}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={isFi ? "nimi@esimerkki.fi" : "name@example.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 text-base"
              autoComplete="email"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {isFi
                ? "Saat vahvistuksen ja jäsentiedot tähän osoitteeseen."
                : "You'll receive your confirmation and membership details here."}
            </p>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-snug cursor-pointer">
              {isFi ? (
                <>
                  Hyväksyn{" "}
                  <Link to="/terms" className="text-primary underline">käyttöehdot</Link>
                  {" "}ja{" "}
                  <Link to="/privacy" className="text-primary underline">tietosuojakäytännön</Link>
                </>
              ) : (
                <>
                  I accept the{" "}
                  <Link to="/terms" className="text-primary underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>
                </>
              )}
            </label>
          </div>

          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}

          <Button
            type="submit"
            variant="neon"
            disabled={loading || !email || !termsAccepted}
            className="w-full h-12 text-base font-bold gap-2"
          >
            {loading ? (
              <span className="animate-pulse">
                {isFi ? "Ohjataan maksuun..." : "Redirecting..."}
              </span>
            ) : (
              <>
                {isFi ? "Siirry maksuun" : "Proceed to Payment"}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        {/* Stripe trust section */}
        <div className="mt-6 rounded-2xl border border-border bg-card/30 backdrop-blur-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-secondary" />
            <span className="text-sm font-bold text-foreground">
              {isFi ? "Turvallinen maksu" : "Secure Payment"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isFi
              ? "Maksu käsitellään Stripen kautta – maailman johtavan maksunvälittäjän. Bargn ei tallenna korttitietojasi. Stripe käyttää pankkitason salausta ja täyttää PCI DSS -turvallisuusstandardit."
              : "Payment is processed by Stripe — the world's leading payment processor. Bargn never stores your card details. Stripe uses bank-level encryption and meets PCI DSS security standards."}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>PCI DSS</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CreditCard className="w-3.5 h-3.5 text-secondary" />
              <span>Visa, Mastercard, Apple Pay</span>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← {isFi ? "Takaisin etusivulle" : "Back to homepage"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
