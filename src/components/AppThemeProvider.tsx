"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemePreference = "light" | "dark" | "system";
export const themeStorageKey = "webtoolseasy-theme-preference";

interface ThemeContextValue {
  preference: ThemePreference;
  resolvedMode: "light" | "dark";
  setPreference: (preference: ThemePreference) => void;
}

const ThemePreferenceContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export function AppThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPrefersDark(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    const storedPreference = window.localStorage.getItem(
      themeStorageKey,
    ) as ThemePreference | null;

    if (
      storedPreference === "light" ||
      storedPreference === "dark" ||
      storedPreference === "system"
    ) {
      setPreference(storedPreference);
    }

    setIsReady(true);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const resolvedMode = useMemo(() => {
    if (preference === "system") {
      return systemPrefersDark ? "dark" : "light";
    }
    return preference;
  }, [preference, systemPrefersDark]);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(themeStorageKey, preference);

    const root = document.documentElement;
    if (resolvedMode === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [isReady, preference, resolvedMode]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  }, []);

  const value = useMemo(
    () => ({ preference, resolvedMode, setPreference }),
    [preference, resolvedMode],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);
  if (!context) {
    throw new Error("useThemePreference must be used within AppThemeProvider");
  }
  return context;
}
