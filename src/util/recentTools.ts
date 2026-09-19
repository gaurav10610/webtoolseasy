const RECENT_TOOLS_KEY = "webtoolseasy_recent_tools";
const MAX_RECENT_TOOLS = 6;

export function recordRecentTool(pageUrl: string): void {
  if (typeof window === "undefined" || !pageUrl) return;
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    // Normalize pageUrl (remove "tools/" prefix if present)
    const normalized = pageUrl.replace(/^tools\//, "").trim();
    if (!normalized) return;

    const updated = [normalized, ...list.filter((id) => id !== normalized)].slice(
      0,
      MAX_RECENT_TOOLS
    );
    localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("webtoolseasy:recent_tools_updated"));
  } catch {
    // Ignore storage errors (e.g. private mode quota restrictions)
  }
}

export function getRecentTools(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearRecentTools(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_TOOLS_KEY);
    window.dispatchEvent(new Event("webtoolseasy:recent_tools_updated"));
  } catch {
    // Ignore storage errors
  }
}
