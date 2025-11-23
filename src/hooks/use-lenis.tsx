import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

// Store Lenis instance globally for access in other hooks
let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const useLenis = () => {
  const rafHandleRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ("ontouchstart" in window ||
        (navigator as any).maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0);

    // Disable smooth scrolling on touch/mobile devices
    if (isTouchDevice) {
      console.log("[Lenis] Disabled on touch device");
      return;
    }

    // Initialize Lenis with smooth, heavy-feel config
    lenisInstance = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      smoothWheel: true,
    } as any);

    // Animation frame loop
    function raf(time: number) {
      lenisInstance?.raf(time);
      rafHandleRef.current = requestAnimationFrame(raf);
    }

    rafHandleRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafHandleRef.current) {
        cancelAnimationFrame(rafHandleRef.current);
      }
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
};
