import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Global Lenis instance
let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const scrollToElement = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element && lenisInstance) {
    lenisInstance.scrollTo(element, {
      offset,
      duration: 1.2,
    });
  } else if (element) {
    // Fallback if Lenis not available
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const useSmoothScroll = () => {
  const rafRef = useRef<number>();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};
