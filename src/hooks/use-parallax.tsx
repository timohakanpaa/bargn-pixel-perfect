import { useEffect, useState, useRef } from 'react';

interface ParallaxOptions {
  speed?: number; // Multiplier for parallax effect (0.5 = slower, 2 = faster)
  direction?: 'up' | 'down';
}

export const useParallax = ({ speed = 0.5, direction = 'up' }: ParallaxOptions = {}) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const windowHeight = window.innerHeight || 1;

      // Calculate parallax offset based on element position in viewport
      const scrollProgress = (windowHeight - elementTop) / (windowHeight + rect.height);
      const parallaxOffset = scrollProgress * 100 * speed;

      setOffset(direction === 'up' ? -parallaxOffset : parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);

  return { ref: elementRef, offset };
};
