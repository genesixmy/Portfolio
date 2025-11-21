/**
 * Responsive utility functions
 */

/**
 * Breakpoints in pixels
 */
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Check if screen size is mobile
 */
export function isMobile(width: number): boolean {
  return width < breakpoints.md;
}

/**
 * Check if screen size is tablet
 */
export function isTablet(width: number): boolean {
  return width >= breakpoints.md && width < breakpoints.lg;
}

/**
 * Check if screen size is desktop
 */
export function isDesktop(width: number): boolean {
  return width >= breakpoints.lg;
}

/**
 * Get current breakpoint name
 */
export function getBreakpoint(width: number): keyof typeof breakpoints {
  if (width < breakpoints.sm) return "xs";
  if (width < breakpoints.md) return "sm";
  if (width < breakpoints.lg) return "md";
  if (width < breakpoints.xl) return "lg";
  if (width < breakpoints["2xl"]) return "xl";
  return "2xl";
}

/**
 * Common responsive spacing values
 */
export const responsiveSpacing = {
  small: "px-4 py-2 md:px-6 md:py-3",
  medium: "px-6 py-4 md:px-8 md:py-6",
  large: "px-8 py-6 md:px-12 md:py-8",
};

/**
 * Common responsive text sizes
 */
export const responsiveText = {
  sm: "text-sm md:text-base",
  base: "text-base md:text-lg",
  lg: "text-lg md:text-xl",
  xl: "text-xl md:text-2xl",
  "2xl": "text-2xl md:text-3xl",
};

/**
 * Common responsive grid columns
 */
export const responsiveGrid = {
  cols1: "grid-cols-1",
  cols2: "md:grid-cols-2",
  cols3: "lg:grid-cols-3",
  cols4: "xl:grid-cols-4",
};
