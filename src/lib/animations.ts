/**
 * Animation utility functions and presets
 */

import type { AnimationVariant } from "@/types";

/**
 * Fade in animation variant
 */
export const fadeInVariant: AnimationVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6 },
};

/**
 * Slide up animation variant
 */
export const slideUpVariant: AnimationVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.6 },
};

/**
 * Scale animation variant
 */
export const scaleVariant: AnimationVariant = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.6 },
};

/**
 * Stagger container for child animations
 */
export const staggerContainerVariant = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Get animation variant with custom delay
 */
export function getDelayedAnimation(variant: AnimationVariant, delay: number): AnimationVariant {
  return {
    ...variant,
    transition: {
      ...variant.transition,
      delay,
    },
  };
}

/**
 * Combine animation variants
 */
export function combineVariants(
  base: AnimationVariant,
  override: Partial<AnimationVariant>
): AnimationVariant {
  return {
    initial: { ...base.initial, ...override.initial },
    animate: { ...base.animate, ...override.animate },
    exit: { ...base.exit, ...override.exit },
    transition: { ...base.transition, ...override.transition },
  };
}

/**
 * Rotate animation variant
 */
export const rotateVariant: AnimationVariant = {
  initial: { opacity: 0, rotate: -10 },
  animate: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: -10 },
  transition: { duration: 0.6 },
};

/**
 * Slide right animation variant
 */
export const slideRightVariant: AnimationVariant = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.6 },
};

/**
 * Slide left animation variant
 */
export const slideLeftVariant: AnimationVariant = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.6 },
};

/**
 * Create a stagger animation for arrays
 */
export function createStaggerVariant(duration: number = 0.6, staggerDelay: number = 0.1) {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0,
      },
    },
  };
}

/**
 * Create scroll-triggered animation options
 */
export function getScrollAnimationOptions(onceOnly: boolean = true, margin: string = "-50px") {
  return {
    once: onceOnly,
    margin,
  };
}
