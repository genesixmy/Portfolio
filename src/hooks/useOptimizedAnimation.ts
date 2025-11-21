/**
 * Hook for optimized animations using performance utilities
 */

import { useEffect, useRef, useState } from "react";
import { createIntersectionObserver } from "@/lib";

interface UseOptimizedAnimationOptions {
  threshold?: number;
  margin?: string;
  once?: boolean;
}

/**
 * Custom hook for optimized scroll-triggered animations
 * Uses Intersection Observer to only animate when element is in view
 */
export function useOptimizedAnimation(
  options: UseOptimizedAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    margin = "-50px",
    once = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = createIntersectionObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          hasAnimated.current = true;

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin: margin }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [threshold, margin, once]);

  return { ref, isInView };
}
