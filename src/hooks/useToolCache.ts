import { useCallback, useRef } from "react";

/**
 * Uniform localStorage caching system for WebToolsEasy.
 *
 * Design:
 * - Each tool stores its editor data keyed by its ApplicationId.
 * - On first page load WITH query params → honour query params, persist to localStorage, then strip query params from the URL.
 * - On subsequent reloads (no query params) → restore from localStorage so user never loses work.
 * - Every code change is debounce-saved to localStorage automatically.
 *
 * Storage key format: `wte_cache_<applicationId>`
 */

const STORAGE_PREFIX = "wte_cache_";
const DEBOUNCE_MS = 400;

// ── helpers ──────────────────────────────────────────────────────────

function storageKey(applicationId: string): string {
  return `${STORAGE_PREFIX}${applicationId}`;
}

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__wte_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// ── public API ──────────────────────────────────────────────────────

/**
 * Read cached value for a tool.  Returns `null` when nothing is stored.
 */
export function getCachedValue(applicationId: string): string | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    return localStorage.getItem(storageKey(applicationId));
  } catch {
    return null;
  }
}

/**
 * Write a value to the tool cache.
 */
export function setCachedValue(applicationId: string, value: string): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(storageKey(applicationId), value);
  } catch {
    // localStorage may be full — silently ignore
  }
}

/**
 * Remove the cached value for a tool.
 */
export function clearCachedValue(applicationId: string): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.removeItem(storageKey(applicationId));
  } catch {
    // ignore
  }
}

/**
 * Strip the `content` query param from the current URL *without*
 * triggering a page reload (uses replaceState).
 */
export function stripQueryParams(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (url.searchParams.has("content")) {
    url.searchParams.delete("content");
    const newUrl = url.pathname + (url.search || "");
    window.history.replaceState(window.history.state, "", newUrl);
  }
}

// ── React hook ──────────────────────────────────────────────────────

export interface UseToolCacheOptions {
  /** The ApplicationId enum value (string) for this tool. */
  applicationId: string;
  /** Content from the `?content=` query param (already decoded). */
  queryParamContent?: string;
  /** Default / sample value shown on first ever visit. */
  defaultValue?: string;
}

export interface UseToolCacheResult {
  /** The initial code value to populate the editor with. */
  initialCode: string;
  /** Call this whenever the editor content changes – handles debounced persistence. */
  persistCode: (code: string) => void;
  /** Manually clear the cache for this tool. */
  clearCache: () => void;
}

/**
 * Hook that resolves the initial editor content and keeps localStorage
 * in sync as the user types.
 *
 * Priority order:
 *  1. query param content (first visit via shared link)
 *  2. localStorage cache  (page reload / return visit)
 *  3. defaultValue         (first time ever)
 */
export function useToolCache({
  applicationId,
  queryParamContent,
  defaultValue = "",
}: UseToolCacheOptions): UseToolCacheResult {
  // We compute initial value once and store it in a ref so it's stable
  // across re-renders (no effect dependencies needed).
  const initialCodeRef = useRef<string | null>(null);

  if (initialCodeRef.current === null) {
    if (queryParamContent) {
      // Shared link — honour the query param, persist it, strip the URL
      initialCodeRef.current = queryParamContent;
      setCachedValue(applicationId, queryParamContent);
      // defer stripQueryParams so the page is fully rendered first
      if (typeof window !== "undefined") {
        setTimeout(stripQueryParams, 0);
      }
    } else {
      // Check localStorage
      const cached = getCachedValue(applicationId);
      initialCodeRef.current = cached !== null ? cached : defaultValue;
    }
  }

  // Debounced persist
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persistCode = useCallback(
    (code: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCachedValue(applicationId, code);
      }, DEBOUNCE_MS);
    },
    [applicationId],
  );

  const clearCache = useCallback(() => {
    clearCachedValue(applicationId);
  }, [applicationId]);

  return {
    initialCode: initialCodeRef.current!,
    persistCode,
    clearCache,
  };
}
