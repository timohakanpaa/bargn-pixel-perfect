import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import bargnLogo from "@/assets/bargn-logo.webp";

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

    // Simple progress animation
    let animationFrame: number;
    const duration = 1500;
    const startTime = Date.now();
    
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setLoadingProgress(progress);
      
      if (progress < 100) {
        animationFrame = requestAnimationFrame(animateProgress);
      }
    };
    
    animationFrame = requestAnimationFrame(animateProgress);

    // Hide preloader after 1.8 seconds (shorter for better UX)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("bargn_preloader_shown", "true");
      document.body.style.overflow = "";
    }, 1800);

    // Hard failsafe - force hide after 3 seconds no matter what
    const failsafeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(failsafeTimer);
      cancelAnimationFrame(animationFrame);
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
          transition={{ duration: 0.3, ease: "easeOut" }}
          onAnimationComplete={() => {
            if (!isVisible) {
              document.body.style.overflow = "";
            }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0a0909" }}
        >
          {/* Logo with static glow */}
          <div
            className="mb-12"
            style={{
              filter: "drop-shadow(0 0 40px rgba(233, 75, 150, 0.8)) drop-shadow(0 0 80px rgba(139, 92, 246, 0.6))",
            }}
          >
            <img
              src={bargnLogo}
              alt="Bargn"
              width="160"
              height="160"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          </div>

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
          <p className="text-white/90 text-lg sm:text-xl font-bold tracking-wide">
            {loadingText}
          </p>

          {/* Progress Percentage */}
          <p className="text-white/60 text-sm mt-2 font-mono">
            {Math.round(loadingProgress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
