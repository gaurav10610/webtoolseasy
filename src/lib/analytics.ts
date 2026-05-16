export type AnalyticsPayload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: AnalyticsPayload,
    ) => void;
    plausible?: (
      eventName: string,
      options?: { props?: AnalyticsPayload },
    ) => void;
  }
}

export function trackEvent(eventName: string, props?: AnalyticsPayload): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, props);
    }

    if (typeof window.plausible === "function") {
      window.plausible(eventName, props ? { props } : undefined);
    }
  } catch {
    // Analytics failures must never break product flows.
  }
}
