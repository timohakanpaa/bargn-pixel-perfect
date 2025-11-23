import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

// Store Lenis instance globally for access in other hooks
let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const useLenis = () => {
  useEffect(() => {
    // Only enable on desktop (viewport width > 768px)
    const isDesktop = window.innerWidth > 768;
    if (!isDesktop) return;

    // Initialize Lenis
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    } as any);

    // Animation frame loop
    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
};
