"use client";

import { alpha, createTheme, type PaletteMode } from "@mui/material/styles";

export type ThemePreference = "light" | "dark" | "system";

export const themeStorageKey = "webtoolseasy-theme-preference";

const getPaletteTokens = (mode: PaletteMode) => {
  const isDark = mode === "dark";

  return {
    mode,
    primary: {
      main: isDark ? "#818cf8" : "#4338ca",
      light: isDark ? "#a5b4fc" : "#6366f1",
      dark: isDark ? "#4f46e5" : "#312e81",
      contrastText: "#ffffff",
    },
    secondary: {
      main: isDark ? "#fdba74" : "#c2410c",
      light: isDark ? "#fed7aa" : "#ea580c",
      dark: isDark ? "#f97316" : "#9a3412",
      contrastText: "#ffffff",
    },
    success: {
      main: isDark ? "#4ade80" : "#15803d",
    },
    warning: {
      main: isDark ? "#fbbf24" : "#d97706",
    },
    error: {
      main: isDark ? "#fb7185" : "#e11d48",
    },
    background: {
      default: isDark ? "#0a0a0b" : "#f8fafc",
      paper: isDark ? "#121214" : "#ffffff",
    },
    text: {
      primary: isDark ? "#f8fafc" : "#0f172a",
      secondary: isDark ? "#cbd5e1" : "#475569",
    },
    divider: isDark ? alpha("#e2e8f0", 0.12) : alpha("#0f172a", 0.1),
  };
};

export const getAppTheme = (mode: PaletteMode) => {
  const palette = getPaletteTokens(mode);
  const isDark = mode === "dark";

  return createTheme({
    palette,
    cssVariables: true,
    spacing: 4,
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: "var(--font-space-grotesk)",
      h1: {
        fontSize: "clamp(2rem, 3.5vw, 3rem)",
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
      },
      h2: {
        fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: "1.125rem",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "0.95rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "0.98rem",
        lineHeight: 1.65,
      },
      body2: {
        fontSize: "0.9rem",
        lineHeight: 1.55,
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
        letterSpacing: "0.01em",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: "smooth",
          },
          body: {
            backgroundImage: isDark
              ? "radial-gradient(circle at top, rgba(79, 70, 229, 0.20), transparent 0, transparent 42%), linear-gradient(180deg, #0a0a0b 0%, #121214 100%)"
              : "radial-gradient(circle at top, rgba(79, 70, 229, 0.08), transparent 0, transparent 42%), linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
          },
          "*::selection": {
            backgroundColor: alpha(palette.primary.main, 0.24),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderBottom: `1px solid ${palette.divider}`,
            boxShadow: isDark
              ? "0 10px 30px rgba(15, 23, 42, 0.45)"
              : "0 10px 30px rgba(15, 23, 42, 0.08)",
            backdropFilter: "blur(12px)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: "none",
            border: `1px solid ${palette.divider}`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            border: `1px solid ${palette.divider}`,
            boxShadow: isDark
              ? "0 18px 40px rgba(2, 6, 23, 0.35)"
              : "0 18px 40px rgba(15, 23, 42, 0.08)",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            minHeight: 40,
            paddingInline: 16,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            backgroundColor: alpha(
              palette.background.paper,
              isDark ? 0.9 : 0.95,
            ),
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "none",
            border: `1px solid ${palette.divider}`,
            "&:before": {
              display: "none",
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecorationColor: alpha(palette.primary.main, 0.35),
            textUnderlineOffset: 3,
          },
        },
      },
    },
  });
};

export const theme = getAppTheme("light");
