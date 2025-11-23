import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route");
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
      {/* Dark Background with Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Neon Spotlight Effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.5) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        {/* Glitching 3D 404 */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Shadow Layers for 3D Effect */}
          <motion.h1
            className="text-[12rem] sm:text-[16rem] font-black text-primary/20 absolute top-2 left-2 blur-sm select-none"
            animate={{
              x: [0, -3, 3, -2, 2, 0],
              y: [0, 2, -2, 3, -3, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            404
          </motion.h1>
          
          {/* Main Number with Glitch Effect */}
          <motion.h1
            className="text-[12rem] sm:text-[16rem] font-black bg-gradient-coral-purple bg-clip-text text-transparent relative select-none"
            style={{
              textShadow: "0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3)",
            }}
            animate={{
              textShadow: [
                "0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3)",
                "0 0 60px hsl(var(--primary) / 0.7), 0 0 100px hsl(var(--primary) / 0.5)",
                "0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            404
          </motion.h1>

          {/* Glitch Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-coral-purple opacity-0 mix-blend-screen"
            animate={{
              opacity: [0, 0.3, 0, 0.2, 0],
              x: [0, -5, 5, -3, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <h1 className="text-[12rem] sm:text-[16rem] font-black select-none">404</h1>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-3xl sm:text-5xl font-bold text-foreground mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t("404.headline")}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {t("404.subtext")}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button
            variant="neon"
            size="lg"
            onClick={() => navigate("/")}
            className="text-lg px-8 py-6 rounded-full shadow-[0_0_30px_rgba(239,29,242,0.6)] hover:shadow-[0_0_50px_rgba(239,29,242,0.8)] transition-all"
          >
            {t("404.cta")}
          </Button>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-50"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Scanline Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.3) 2px, hsl(var(--primary) / 0.3) 4px)",
        }}
        animate={{
          y: [0, 20],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default NotFound;
