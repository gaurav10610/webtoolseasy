import { useCallback, useRef } from "react";

// Debounce hook for performance optimization
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}

// Throttle hook for limiting function calls
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastCallRef = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  ) as T;
}

// Performance monitoring utilities
export const performanceUtils = {
  // Mark start of an operation
  mark: (name: string) => {
    if (typeof window !== "undefined" && "performance" in window) {
      performance.mark(`${name}-start`);
    }
  },

  // Mark end and measure duration
  measure: (name: string) => {
    if (typeof window !== "undefined" && "performance" in window) {
      performance.mark(`${name}-end`);
      const measurement = performance.measure(
        name,
        `${name}-start`,
        `${name}-end`
      );

      if (process.env.NODE_ENV === "development") {
        console.log(`${name}: ${measurement.duration.toFixed(2)}ms`);
      }

      return measurement.duration;
    }
    return 0;
  },

  // Measure React component render time
  measureRender: (componentName: string) => ({
    start: () => performanceUtils.mark(`render-${componentName}`),
    end: () => performanceUtils.measure(`render-${componentName}`),
  }),
};

// Bundle size optimization utilities
export const bundleUtils = {
  // Dynamic import with error handling
  dynamicImport: async <T>(
    importFn: () => Promise<T>,
    fallback?: T
  ): Promise<T> => {
    try {
      return await importFn();
    } catch (error) {
      console.error("Dynamic import failed:", error);
      if (fallback) return fallback;
      throw error;
    }
  },

  // Preload critical resources
  preloadResource: (href: string, as: string = "script") => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    }
  },
};

// Memory optimization utilities
export const memoryUtils = {
  // Clean up refs and listeners
  useCleanup: (cleanupFn: () => void) => {
    const cleanupRef = useRef<(() => void) | null>(null);

    // Store cleanup function
    cleanupRef.current = cleanupFn;

    // Return cleanup function that can be called manually
    return useCallback(() => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    }, []);
  },

  // WeakMap cache for component instances
  componentCache: new WeakMap(),

  // Cache expensive computations
  memoizeComputation: <T extends (...args: unknown[]) => unknown>(fn: T): T => {
    const cache = new Map();

    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args);

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = fn(...args);
      cache.set(key, result);

      // Limit cache size
      if (cache.size > 100) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }

      return result;
    }) as T;
  },
};
