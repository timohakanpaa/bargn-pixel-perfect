import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

// Store Lenis instance globally for access in other hooks
let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const useLenis = () => {
  const rafHandleRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop (viewport width > 768px)
    const isDesktop = window.innerWidth > 768;
    if (!isDesktop) return;

    // Initialize Lenis with minimal configuration
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

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
