import { describe, expect, it } from "vitest";
import { _describeAuthPolicy, _selectAuthStrategy } from "@/lib/authStrategy";

describe("Optional Sync Auth Strategy (TB-154)", () => {
  it("defaults to anonymous when auth disabled", () => {
    const decision = _selectAuthStrategy({
      authMode: "disabled",
      authProviderAvailable: true,
      userSessionActive: false,
    });

    expect(decision.mode).toBe("anonymous_local");
    expect(decision.canSync).toBe(false);
  });

  it("falls back to anonymous when provider unavailable", () => {
    const decision = _selectAuthStrategy({
      authMode: "optional",
      authProviderAvailable: false,
      userSessionActive: false,
    });

    expect(decision.mode).toBe("anonymous_local");
    expect(decision.reason).toContain("fallback");
  });

  it("enables optional sync when session active", () => {
    const decision = _selectAuthStrategy({
      authMode: "optional",
      authProviderAvailable: true,
      userSessionActive: true,
    });

    expect(decision.mode).toBe("optional_sync");
    expect(decision.canSync).toBe(true);
  });

  it("requires login for sync when optional auth available but no session", () => {
    const decision = _selectAuthStrategy({
      authMode: "optional",
      authProviderAvailable: true,
      userSessionActive: false,
    });

    expect(decision.mode).toBe("anonymous_local");
    expect(decision.requiresLoginForSync).toBe(true);
  });

  it("describes selected policy", () => {
    const policy = _describeAuthPolicy();
    expect(policy.defaultMode).toBe("anonymous_local");
    expect(policy.syncLoginMethod).toBe("magic_link");
    expect(policy.anonymousParity).toBe(true);
  });
});
