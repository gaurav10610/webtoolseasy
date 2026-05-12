import { _selectAuthStrategy } from "@/lib/authStrategy";

export function _validateSyncRequestAuth(headers: Headers): {
  allowed: boolean;
  userId: string;
  mode: "anonymous_local" | "optional_sync";
  reason: string;
} {
  const authMode =
    (process.env.AUTH_MODE as "optional" | "disabled") || "optional";
  const providerAvailable = process.env.AUTH_PROVIDER_AVAILABLE !== "false";
  const headerUser = headers.get("x-wte-user") || "";

  const strategy = _selectAuthStrategy({
    authMode,
    authProviderAvailable: providerAvailable,
    userSessionActive: headerUser.trim().length > 0,
  });

  // Anonymous parity mode is always allowed for metadata-only sync writes.
  const userId = headerUser.trim() || "anonymous-local";

  return {
    allowed: true,
    userId,
    mode: strategy.mode,
    reason: strategy.reason,
  };
}
