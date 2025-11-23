import { motion } from "framer-motion";
import { Apple } from "lucide-react";

const AppStoreBadges = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      {/* Apple App Store - min 44px touch target */}
      <motion.a
        href="#"
        className="group relative flex items-center gap-3 bg-black text-white px-6 py-3 min-h-[44px] rounded-xl border border-muted-foreground/30 hover:border-primary transition-all cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Download on the App Store"
      >
        <Apple className="w-8 h-8" fill="currentColor" aria-hidden="true" />
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-80">Download on the</span>
          <span className="text-lg font-semibold leading-tight">App Store</span>
        </div>
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary/10 to-accent/10" />
      </motion.a>

      {/* Google Play Store - min 44px touch target */}
      <motion.a
        href="#"
        className="group relative flex items-center gap-3 bg-black text-white px-6 py-3 min-h-[44px] rounded-xl border border-muted-foreground/30 hover:border-primary transition-all cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Get it on Google Play"
      >
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
        </svg>
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-80">GET IT ON</span>
          <span className="text-lg font-semibold leading-tight">Google Play</span>
        </div>
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary/10 to-accent/10" />
      </motion.a>
    </div>
  );
};

export default AppStoreBadges;
