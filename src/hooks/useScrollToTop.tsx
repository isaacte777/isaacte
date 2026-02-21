import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "./useSmoothScroll";

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    });
  }, [pathname]);
};
