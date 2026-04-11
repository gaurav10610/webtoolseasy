"use client";

import { alpha, createTheme, type PaletteMode } from "@mui/material/styles";

export type ThemePreference = "light" | "dark" | "system";

export const themeStorageKey = "webtoolseasy-theme-preference";

const getPaletteTokens = (mode: PaletteMode) => {
  const isDark = mode === "dark";

  return {
    mode,
    primary: {
      main: isDark ? "#7dd3fc" : "#0f6cbd",
      light: isDark ? "#bae6fd" : "#5aa9e6",
      dark: isDark ? "#0369a1" : "#084c8d",
      contrastText: isDark ? "#082f49" : "#ffffff",
    },
    secondary: {
      main: isDark ? "#c4b5fd" : "#6f42c1",
      light: isDark ? "#ddd6fe" : "#8b5fd6",
      dark: isDark ? "#7c3aed" : "#4c2889",
      contrastText: "#ffffff",
    },
    success: {
      main: isDark ? "#4ade80" : "#1a7f37",
    },
    warning: {
      main: isDark ? "#fbbf24" : "#b7791f",
    },
    error: {
      main: isDark ? "#f87171" : "#c62828",
    },
    background: {
      default: isDark ? "#0b1120" : "#f4f7fb",
      paper: isDark ? "#111827" : "#ffffff",
    },
    text: {
      primary: isDark ? "#f8fafc" : "#0f172a",
      secondary: isDark ? "#cbd5e1" : "#475569",
    },
    divider: isDark ? alpha("#e2e8f0", 0.14) : alpha("#0f172a", 0.1),
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
      fontFamily: "var(--font-roboto)",
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
              ? "radial-gradient(circle at top, rgba(14, 116, 144, 0.18), transparent 0, transparent 42%), linear-gradient(180deg, #0b1120 0%, #111827 100%)"
              : "radial-gradient(circle at top, rgba(15, 108, 189, 0.10), transparent 0, transparent 42%), linear-gradient(180deg, #f8fbff 0%, #f4f7fb 100%)",
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
