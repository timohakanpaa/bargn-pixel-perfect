import { useEffect, useState, useRef } from 'react';

/**
 * Hook to lazy load components when they enter viewport
 * Improves performance by only loading components when needed
 */
export function useLazyLoad(options: IntersectionObserverInit = {}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Load 100px before entering viewport
        threshold: 0.01,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { shouldLoad, elementRef };
}

/**
 * Wrapper component for lazy loading sections
 */
interface LazyLoadSectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazyLoadSection({ children, fallback, className }: LazyLoadSectionProps) {
  const { shouldLoad, elementRef } = useLazyLoad();

  return (
    <div ref={elementRef} className={className}>
      {shouldLoad ? children : (fallback || <div className="py-24" />)}
    </div>
  );
}
