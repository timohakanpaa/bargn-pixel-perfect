import { DollarSign, Users, Zap, TrendingUp } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const PartnershipBenefits = () => {
  const { ref, isInView } = useInView();

  const benefits = [
    {
      icon: DollarSign,
      title: "Zero Commission Fees",
      description: "Yes, you read that right. Z-E-R-O. While others charge you for the privilege of working, we believe in this crazy concept called 'fairness'",
      gradient: "bg-gradient-pink-orange",
      shadow: "shadow-glow-pink"
    },
    {
      icon: Users,
      title: "High-Quality Customer Base",
      description: "These aren't your typical 'Karen wants to speak to the manager' customers. Our members are educated, employed, and actually tip their servers",
      gradient: "bg-gradient-orange-yellow",
      shadow: "shadow-glow-orange"
    },
    {
      icon: Zap,
      title: "Premium Brand Exposure",
      description: "Our AI is basically a digital wingman for your business - smooth, smart, and surprisingly good at closing deals",
      gradient: "bg-gradient-pink-yellow",
      shadow: "shadow-glow-yellow"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics & Insights",
      description: "Dashboard so detailed, you'll know your customers better than their therapists (but way less expensive)",
      gradient: "bg-gradient-purple-pink",
      shadow: "shadow-glow-pink"
    }
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="text-primary text-lg font-bold mb-4">Partnership Benefits</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Why Smart Businesses Ghost Their Old Platforms
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Spoiler alert: It's not just about the money (but seriously, who doesn't love keeping 100% of their revenue?).
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-primary/50 hover:scale-105 hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-16 h-16 ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 ${benefit.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${index === 1 ? 'text-accent' : 'text-foreground'}`}>
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipBenefits;
