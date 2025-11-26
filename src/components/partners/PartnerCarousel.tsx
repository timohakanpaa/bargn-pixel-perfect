import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import casaitalia from "@/assets/partners/casaitalia.png";
import treffi from "@/assets/partners/treffi.svg";
import atoy from "@/assets/partners/atoy.svg";
import elixia from "@/assets/partners/elixia.png";
import olefit from "@/assets/partners/olefit.jpg";
import scandic from "@/assets/partners/scandic.png";
import kotipizza from "@/assets/partners/kotipizza.png";
import vauhtifarmi from "@/assets/partners/vauhtifarmi.png";
import escaperoom from "@/assets/partners/escaperoom.jpg";
import cityklinikka from "@/assets/partners/cityklinikka.jpg";

const partners = [
  { name: "Casa Italia", logo: casaitalia, color: "#DC143C", url: "https://casaitalia.fi/" },
  { name: "Treffi", logo: treffi, color: "#1B1F22", url: "https://treffipub.com" },
  { name: "Atoy Autohuolto", logo: atoy, color: "#E32D4A", url: "https://www.atoyautohuolto.fi/" },
  { name: "Elixia", logo: elixia, color: "#0D2B47", url: "https://www.elixia.fi/" },
  { name: "Ole.Fit", logo: olefit, color: "#FF0000", url: "https://www.ole.fit" },
  { name: "Scandic", logo: scandic, color: "#E20714", url: "https://www.scandichotels.com/fi" },
  { name: "Kotipizza", logo: kotipizza, color: "#00634B", url: "https://www.kotipizza.fi/" },
  { name: "Vauhtifarmi", logo: vauhtifarmi, color: "#6B5F4B", url: "https://www.vauhtifarmi.fi" },
  { name: "Escape Room Helsinki", logo: escaperoom, color: "#E30613", url: "https://escaperoom.fi/" },
  { name: "Cityklinikka", logo: cityklinikka, color: "#B8945F", url: "https://ckl.fi/" },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners, ...partners];

const PartnerCarousel = () => {
  const { language } = useLanguage();
  
  const headline = language === "fi" ? "Vain kunnon lafkat 💅" : "Valid Spots Only 💅";
  const subheadline = language === "fi" 
    ? "500+ paikkaa. Nolla välistävetoa. Emme tee yhteistyötä keskinkertaisten kanssa."
    : "500+ venues. Zero skips. We don't partner with mid.";

  return (
    <section className="relative w-full py-24 overflow-hidden bg-background">
      {/* Radial gradient glow background using design system colors */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-primary/5 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
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
            {allPartners.map((partner, index) => {
              const content = (
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-4 transition-all duration-300 group-hover:border-primary/50">
                  {/* Glow effect on hover using primary gradient colors */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-br from-primary/30 to-purple-600/30"
                  />
                  
                  <img 
                    src={partner.logo}
                    alt={partner.name}
                    className="relative z-10 w-full h-full object-contain transition-all duration-300 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:drop-shadow-[0_0_16px_hsl(var(--primary)/0.6)]"
                  />
                </div>
              );

              return (
                <motion.div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group cursor-pointer block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group cursor-pointer">
                      {content}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8" />
    </section>
  );
};

export default PartnerCarousel;
