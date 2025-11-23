import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import bargnLogo from "@/assets/bargn-logo.png";

const Preloader = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Check if preloader has been shown in this session
    const hasShownPreloader = sessionStorage.getItem("bargn_preloader_shown");
    
    if (hasShownPreloader) {
      setIsVisible(false);
      return;
    }

    // Disable body scrolling
    document.body.style.overflow = "hidden";

    // Animate loading bar from 0 to 100% in 1.5 seconds
    const duration = 1500;
    const startTime = Date.now();
    
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setLoadingProgress(progress);
      
      if (progress < 100) {
        requestAnimationFrame(animateProgress);
      }
    };
    
    requestAnimationFrame(animateProgress);

    // Hide preloader after 2 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("bargn_preloader_shown", "true");
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const loadingText = language === "fi" ? "Ladataan Diilejä..." : "Loading Deals...";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0a0909" }}
        >
          {/* Logo with pulsing animation and neon purple glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-12"
            style={{
              filter: "drop-shadow(0 0 40px rgba(233, 75, 150, 0.8)) drop-shadow(0 0 80px rgba(139, 92, 246, 0.6))",
            }}
          >
            <img
              src={bargnLogo}
              alt="Bargn"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          </motion.div>

          {/* Loading Bar Container */}
          <div className="w-64 sm:w-80 mb-6">
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              {/* Loading Bar Fill with Gradient */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${loadingProgress}%`,
                  background: "linear-gradient(90deg, hsl(25, 95%, 53%) 0%, hsl(48, 100%, 50%) 100%)",
                  boxShadow: "0 0 20px rgba(255, 155, 125, 0.6), 0 0 40px rgba(255, 229, 0, 0.4)",
                }}
              />
            </div>
          </div>

          {/* Loading Text */}
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-white/90 text-lg sm:text-xl font-bold tracking-wide"
          >
            {loadingText}
          </motion.p>

          {/* Progress Percentage */}
          <motion.p
            className="text-white/60 text-sm mt-2 font-mono"
          >
            {Math.round(loadingProgress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
