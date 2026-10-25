/**
 * Uniform P2P Connection States and Browser Storage Persistence
 * Provides unified connection states and robust local/session persistence
 * across page reloads for DropStream, BeamSuite, and CodePair.
 */

export type UniformConnectionStatus =
  | "disconnected"
  | "connecting_signaling"
  | "in_room"
  | "connecting_peer"
  | "connected"
  | "reconnecting"
  | "error";

export interface P2PPersistedSession {
  app: "drop" | "beam" | "codepair";
  roomId: string;
  savedAt: number;
  metadata?: Record<string, unknown>;
}

export class P2PPersistence {
  private static PREFIX = "webtoolseasy_p2p_";

  /**
   * Save session data to browser memory (both sessionStorage and localStorage)
   */
  public static saveSession(
    app: "drop" | "beam" | "codepair",
    data: {
      roomId: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    if (typeof window === "undefined") return;

    try {
      const session: P2PPersistedSession = {
        app,
        roomId: data.roomId.toUpperCase().trim(),
        savedAt: Date.now(),
        metadata: data.metadata || {},
      };

      const serialized = JSON.stringify(session);
      window.sessionStorage.setItem(`${this.PREFIX}${app}_active`, serialized);
      window.localStorage.setItem(`${this.PREFIX}${app}_last`, serialized);
    } catch (e) {
      console.warn("[P2PPersistence] Could not save session to storage:", e);
    }
  }

  /**
   * Load active or recently saved session for an app.
   * Checks sessionStorage first (same tab reload), then localStorage (cross-tab/recent).
   * Automatically expires sessions older than 24 hours.
   */
  public static loadSession(
    app: "drop" | "beam" | "codepair",
    maxAgeMs: number = 24 * 60 * 60 * 1000
  ): P2PPersistedSession | null {
    if (typeof window === "undefined") return null;

    try {
      // 1. Check active session in current tab
      const sessionRaw = window.sessionStorage.getItem(
        `${this.PREFIX}${app}_active`
      );
      if (sessionRaw) {
        const parsed = JSON.parse(sessionRaw) as P2PPersistedSession;
        if (Date.now() - parsed.savedAt < maxAgeMs && parsed.roomId) {
          return parsed;
        }
      }

      // 2. Check last session in localStorage
      const localRaw = window.localStorage.getItem(`${this.PREFIX}${app}_last`);
      if (localRaw) {
        const parsed = JSON.parse(localRaw) as P2PPersistedSession;
        if (Date.now() - parsed.savedAt < maxAgeMs && parsed.roomId) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("[P2PPersistence] Could not load session from storage:", e);
    }

    return null;
  }

  /**
   * Clear saved session when the user intentionally leaves or closes a room.
   */
  public static clearSession(app: "drop" | "beam" | "codepair"): void {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.removeItem(`${this.PREFIX}${app}_active`);
      window.localStorage.removeItem(`${this.PREFIX}${app}_last`);
    } catch {}
  }

  /**
   * Synchronize the browser URL bar with the active room without causing a page navigation.
   */
  public static syncUrl(params: Record<string, string | null | undefined>): void {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value);
        } else {
          url.searchParams.delete(key);
        }
      });
      window.history.replaceState(null, "", url.toString());
    } catch (e) {
      console.warn("[P2PPersistence] Could not sync URL:", e);
    }
  }

  /**
   * Save generic state for an app (e.g. CodePair code drafts, DropStream chat messages)
   */
  public static saveState<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        `${this.PREFIX}state_${key}`,
        JSON.stringify({ val: value, time: Date.now() })
      );
    } catch {}
  }

  /**
   * Load generic state for an app
   */
  public static loadState<T>(key: string, maxAgeMs?: number): T | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(`${this.PREFIX}state_${key}`);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (maxAgeMs && Date.now() - parsed.time > maxAgeMs) {
        return null;
      }
      return parsed.val as T;
    } catch {
      return null;
    }
  }

  /**
   * Clear generic state
   */
  public static clearState(key: string): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(`${this.PREFIX}state_${key}`);
    } catch {}
  }
}
