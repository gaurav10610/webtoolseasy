"use client";

import { getAppTheme, ThemePreference, themeStorageKey } from "@/theme";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(themeStorageKey, preference);
  }, [isReady, preference]);

  const resolvedMode =
    preference === "system" ? (prefersDark ? "dark" : "light") : preference;

  const theme = useMemo(() => getAppTheme(resolvedMode), [resolvedMode]);
  const value = useMemo(
    () => ({ preference, resolvedMode, setPreference }),
    [preference, resolvedMode],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
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
