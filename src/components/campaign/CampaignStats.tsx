import { TrendingUp, Percent, Users } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const CampaignStats = () => {
  const { ref, isInView } = useInView();

  const stats = [
    {
      icon: Users,
      value: "2000+",
      label: "Uutta maksavaa käyttäjää/kk"
    },
    {
      icon: Percent,
      value: "5-8%",
      label: "Keskimääräinen konversio"
    },
    {
      icon: TrendingUp,
      value: "300+",
      label: "Liittymää parhaasta videosta"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f172a]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-foreground/80 text-lg">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignStats;
