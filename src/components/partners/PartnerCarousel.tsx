import { motion } from "framer-motion";
import { Dumbbell, UtensilsCrossed, Fish, Wine, Coffee, Pizza, IceCream, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const partners = [
  { name: "FitZone Gym", icon: Dumbbell, color: "#FF6B6B" },
  { name: "Burger Palace", icon: UtensilsCrossed, color: "#FFA500" },
  { name: "Sushi Master", icon: Fish, color: "#4ECDC4" },
  { name: "The Night Bar", icon: Wine, color: "#9B59B6" },
  { name: "Cafe Vibes", icon: Coffee, color: "#D4A574" },
  { name: "Pizza Corner", icon: Pizza, color: "#E74C3C" },
  { name: "Sweet Treats", icon: IceCream, color: "#FF85C0" },
  { name: "Style Shop", icon: ShoppingBag, color: "#3498DB" },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners, ...partners];

const PartnerCarousel = () => {
  const { t, language } = useLanguage();
  
  const headline = language === "fi" ? "Vain kunnon lafkat 💅" : "Valid Spots Only 💅";
  const subheadline = language === "fi" 
    ? "500+ paikkaa. Nolla välistävetoa. Emme tee yhteistyötä keskinkertaisten kanssa."
    : "500+ venues. Zero skips. We don't partner with mid.";

  return (
    <section className="relative w-full py-24 overflow-hidden bg-background">
      {/* Radial gradient glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F92D91]/10 via-[#C026D3]/5 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F92D91] to-[#C026D3] bg-clip-text text-transparent [text-shadow:_0_0_20px_rgb(249_45_145_/_40%)]">
          {headline}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subheadline}
        </p>
      </div>

      {/* Carousel container with fade masks */}
      <div className="relative">
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling marquee */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 md:gap-16"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {allPartners.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm">
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{ backgroundColor: `${partner.color}40` }}
                  />
                  
                  <partner.icon 
                    className="w-12 h-12 md:w-16 md:h-16 relative z-10 transition-all duration-300 grayscale group-hover:grayscale-0"
                    style={{ 
                      color: partner.color,
                      filter: 'grayscale(100%)',
                    }}
                    strokeWidth={1.5}
                  />
                  
                  {/* Icon gets color on hover via inline style override */}
                  <style>{`
                    .group:hover svg {
                      filter: grayscale(0%) !important;
                      drop-shadow: 0 0 8px ${partner.color}80;
                    }
                  `}</style>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8" />
    </section>
  );
};

export default PartnerCarousel;
