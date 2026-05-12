export type AuthMode = "anonymous_local" | "optional_sync";

export interface AuthEnvironment {
  authMode: "optional" | "disabled";
  authProviderAvailable: boolean;
  userSessionActive: boolean;
}

export interface AuthStrategyDecision {
  mode: AuthMode;
  canSync: boolean;
  requiresLoginForSync: boolean;
  reason: string;
}

export function _selectAuthStrategy(
  env: AuthEnvironment,
): AuthStrategyDecision {
  if (env.authMode === "disabled") {
    return {
      mode: "anonymous_local",
      canSync: false,
      requiresLoginForSync: false,
      reason: "Authentication explicitly disabled",
    };
  }

  if (!env.authProviderAvailable) {
    return {
      mode: "anonymous_local",
      canSync: false,
      requiresLoginForSync: false,
      reason: "Auth provider unavailable; fallback to anonymous local mode",
    };
  }

  if (env.userSessionActive) {
    return {
      mode: "optional_sync",
      canSync: true,
      requiresLoginForSync: false,
      reason: "Signed-in session active for optional metadata sync",
    };
  }

  return {
    mode: "anonymous_local",
    canSync: false,
    requiresLoginForSync: true,
    reason: "Optional sync available via magic-link login",
  };
}

export function _describeAuthPolicy(): {
  defaultMode: AuthMode;
  syncLoginMethod: "magic_link";
  anonymousParity: true;
} {
  return {
    defaultMode: "anonymous_local",
    syncLoginMethod: "magic_link",
    anonymousParity: true,
  };
}
