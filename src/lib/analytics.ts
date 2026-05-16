export type AnalyticsPayload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: AnalyticsPayload },
    ) => void;
  }
}

export function trackEvent(eventName: string, props?: AnalyticsPayload): void {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;

  try {
    window.plausible(eventName, props ? { props } : undefined);
  } catch {
    // Analytics failures must never break product flows.
  }
}
