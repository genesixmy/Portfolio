/**
 * Performance optimization utilities
 */

/**
 * Debounce function to limit function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Memoize function results
 */
export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Lazy load image with fallback
 */
export function lazyLoadImage(
  src: string,
  fallbackSrc?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => {
      if (fallbackSrc) {
        resolve(fallbackSrc);
      } else {
        reject(new Error(`Failed to load image: ${src}`));
      }
    };
    img.src = src;
  });
}

/**
 * Animate numbers (for counters, statistics, etc.)
 */
export function animateNumber(
  start: number,
  end: number,
  duration: number = 1000,
  onUpdate: (value: number) => void
): void {
  const startTime = Date.now();
  const difference = end - start;

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(start + difference * progress);

    onUpdate(currentValue);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}

/**
 * Batch DOM updates to avoid layout thrashing
 */
export function batchDOMUpdates(
  updates: Array<() => void>
): void {
  requestAnimationFrame(() => {
    updates.forEach((update) => update());
  });
}

/**
 * Create intersection observer for lazy loading
 */
export function createIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, {
    threshold: 0.1,
    ...options,
  });
}

/**
 * Preload resource (image, font, etc.)
 */
export function preloadResource(
  href: string,
  as: "image" | "font" | "script" | "style" = "image"
): void {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
}
