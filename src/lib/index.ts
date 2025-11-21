/**
 * Utility functions barrel export
 */

// Animation utilities
export {
  fadeInVariant,
  slideUpVariant,
  scaleVariant,
  rotateVariant,
  slideRightVariant,
  slideLeftVariant,
  staggerContainerVariant,
  getDelayedAnimation,
  combineVariants,
  createStaggerVariant,
  getScrollAnimationOptions,
} from "./animations";

// Classname utilities
export { cn, buttonStyles, cardStyles, gradientText, getResponsiveClass, sectionPadding, containerClass } from "./classnames";

// Validation utilities
export { isValidEmail, isRequired, minLength, maxLength, getFieldError, validateForm } from "./validation";

// Responsive utilities
export { breakpoints, isMobile, isTablet, isDesktop, getBreakpoint, responsiveSpacing, responsiveText, responsiveGrid } from "./responsive";

// Performance utilities
export {
  debounce,
  throttle,
  memoize,
  lazyLoadImage,
  animateNumber,
  batchDOMUpdates,
  createIntersectionObserver,
  preloadResource,
} from "./performance";
