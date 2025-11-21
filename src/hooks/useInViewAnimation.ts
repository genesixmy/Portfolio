/**
 * Custom hook for in-view animations
 * Triggers animations when element enters viewport
 */

import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface InViewAnimationOptions {
  once?: boolean;
  margin?: string;
  amount?: 'some' | 'all';
}

interface InViewAnimationReturn {
  ref: React.RefObject<HTMLDivElement>;
  isInView: boolean;
}

/**
 * Hook for triggering animations when element comes into view
 * @param options Configuration for in-view detection
 * @returns Object containing ref and inView state
 */
export function useInViewAnimation(options?: InViewAnimationOptions): InViewAnimationReturn {
  const ref = useRef<HTMLDivElement>(null);
  const { once = true, margin = '-100px', amount = 'some' } = options || {};

  const isInView = useInView(ref, {
    once,
    margin: margin as any,
    amount: amount as 'some' | 'all',
  });

  return {
    ref,
    isInView,
  };
}
