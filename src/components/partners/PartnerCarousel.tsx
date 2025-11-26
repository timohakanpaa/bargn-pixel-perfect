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
  { name: "Casa Italia", logo: casaitalia, color: "#DC143C", url: "" },
  { name: "Treffi", logo: treffi, color: "#1B1F22", url: "" },
  { name: "Atoy Autohuolto", logo: atoy, color: "#E32D4A", url: "" },
  { name: "Elixia", logo: elixia, color: "#0D2B47", url: "https://www.elixia.fi/" },
  { name: "Ole.Fit", logo: olefit, color: "#FF0000", url: "https://www.ole.fit" },
  { name: "Scandic", logo: scandic, color: "#E20714", url: "" },
  { name: "Kotipizza", logo: kotipizza, color: "#00634B", url: "" },
  { name: "Vauhtifarmi", logo: vauhtifarmi, color: "#6B5F4B", url: "" },
  { name: "Escape Room Helsinki", logo: escaperoom, color: "#E30613", url: "" },
  { name: "Cityklinikka", logo: cityklinikka, color: "#B8945F", url: "" },
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
            {allPartners.map((partner, index) => {
              const content = (
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-4">
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{ backgroundColor: `${partner.color}40` }}
                  />
                  
                  <img 
                    src={partner.logo}
                    alt={partner.name}
                    className="relative z-10 w-full h-full object-contain transition-all duration-300 grayscale group-hover:grayscale-0"
                    style={{
                      filter: 'grayscale(100%) brightness(0.8)',
                    }}
                  />
                  
                  {/* Enhanced hover effect */}
                  <style>{`
                    .group:hover img {
                      filter: grayscale(0%) brightness(1) !important;
                      drop-shadow: 0 0 12px ${partner.color}80;
                    }
                  `}</style>
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
