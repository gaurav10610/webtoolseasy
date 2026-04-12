export const TEST_CONSTANTS = {
  TIMEOUT_NAVIGATION: 30000,
  TIMEOUT_COMPONENT: 10000,
  TIMEOUT_ELEMENT: 5000,
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  HOST: "localhost",
  PORT: 3000,
} as const;

export const A11Y_VIOLATIONS = {
  CRITICAL: "critical",
  SERIOUS: "serious",
  MODERATE: "moderate",
} as const;
