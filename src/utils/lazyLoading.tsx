import dynamic from "next/dynamic";
import { ComponentType, memo } from "react";

// Generic lazy loading wrapper with loading fallback
export function createLazyComponent<T extends object = object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  loadingText?: string
) {
  const LazyComponent = dynamic(importFunc, {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        {loadingText && (
          <span className="ml-3 text-gray-600">{loadingText}</span>
        )}
      </div>
    ),
    ssr: false, // Disable SSR for heavy components
  });

  return memo(LazyComponent);
}

// Preload a component for better UX
export function preloadComponent(
  importFunc: () => Promise<{ default: ComponentType<object> }>
) {
  // Start loading the component
  importFunc();
}

// Intersection Observer hook for lazy loading on scroll
export function useIntersectionObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const { threshold = 0.1, rootMargin = "50px" } = options;

  return (element: HTMLElement | null) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  };
}
