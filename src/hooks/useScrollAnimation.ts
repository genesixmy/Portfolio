/**
 * Custom hook for scroll-based animations
 * Provides scroll progress and transforms for parallax and fade effects
 */

import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollAnimationOptions {
  offset?: [string, string];
  rangeY?: [number, number];
  rangeOpacity?: [number, number];
}

interface ScrollAnimationReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollYProgress: MotionValue<number>;
  y: MotionValue<number | string>;
  opacity: MotionValue<number>;
}

/**
 * Hook for creating scroll-based animations
 * @param options Configuration for scroll animation behavior
 * @returns Object containing ref and motion values for animation
 */
export function useScrollAnimation(
  options?: ScrollAnimationOptions
): ScrollAnimationReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    offset = ["start end", "end start"],
    rangeY = [100, -100],
    rangeOpacity = [1, 0],
  } = options || {};

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as [string, string],
  });

  const y = useTransform(scrollYProgress, [0, 1], rangeY);
  const opacity = useTransform(scrollYProgress, [0, 0.5], rangeOpacity);

  return {
    containerRef,
    scrollYProgress,
    y,
    opacity,
  };
}
