/**
 * Utility functions for managing classnames
 */

/**
 * Merge classnames conditionally
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Common button styles
 */
export const buttonStyles = {
  base: "px-4 py-2 rounded-lg font-medium transition-all duration-300",
  primary: "bg-primary-600 hover:bg-primary-500 text-white",
  secondary: "bg-white/10 hover:bg-white/20 text-white",
  ghost: "bg-transparent hover:bg-white/5 text-white",
};

/**
 * Common card styles
 */
export const cardStyles = {
  base: "rounded-2xl border transition-all duration-300",
  glass: "bg-white/5 backdrop-blur-xl border-white/10 hover:border-primary-500/50",
  solid: "bg-dark-900 border-dark-800 hover:border-dark-700",
};

/**
 * Common text gradient
 */
export const gradientText = "bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent";

/**
 * Get responsive class based on screen size
 */
export function getResponsiveClass(mobile: string, tablet: string, desktop: string): string {
  return cn(mobile, `sm:${tablet}`, `lg:${desktop}`);
}

/**
 * Common section padding
 */
export const sectionPadding = "py-20 md:py-32 px-4 md:px-8";

/**
 * Common container max-width
 */
export const containerClass = "max-w-7xl mx-auto";
