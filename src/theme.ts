/**
 * Design tokens for the WebToolsEasy Developer Studio.
 *
 * These tokens are referenced by Tailwind config and inline styles.
 * No MUI dependency — all styling is Tailwind-based.
 */

export const colors = {
  background: {
    primary: "#0A0A0B",
    surface: "#121214",
    elevated: "#1a1a1e",
  },
  border: {
    default: "rgba(255, 255, 255, 0.08)",
    subtle: "rgba(255, 255, 255, 0.04)",
    emphasis: "rgba(255, 255, 255, 0.16)",
  },
  accent: {
    indigo: "#6366f1",
    orange: "#f97316",
  },
  text: {
    primary: "#f8fafc",
    secondary: "#94a3b8",
    muted: "#64748b",
  },
} as const;

export const spacing = {
  borderRadius: {
    sm: "12px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    full: "999px",
  },
} as const;
