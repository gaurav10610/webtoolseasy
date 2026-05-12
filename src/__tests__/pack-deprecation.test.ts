import { describe, expect, it } from "vitest";
import {
  _buildRedirectMap,
  _resolvePackDeprecation,
} from "@/lib/packDeprecation";

describe("Pack Deprecation Policy and Redirects (TB-183)", () => {
  const rules = [
    {
      oldSlug: "legacy-pack",
      newSlug: "modern-pack",
      deprecateAfter: "2026-01-01T00:00:00.000Z",
      sunsetAfter: "2026-06-01T00:00:00.000Z",
      reason: "Replaced by modern implementation",
    },
  ];

  it("returns active before deprecation date", () => {
    const result = _resolvePackDeprecation(
      "legacy-pack",
      rules,
      new Date("2025-12-01T00:00:00.000Z"),
    );

    expect(result.status).toBe("active");
  });

  it("returns deprecated between deprecate and sunset dates", () => {
    const result = _resolvePackDeprecation(
      "legacy-pack",
      rules,
      new Date("2026-03-01T00:00:00.000Z"),
    );

    expect(result.status).toBe("deprecated");
    expect(result.redirectTo).toBe("modern-pack");
  });

  it("returns sunset after sunset date", () => {
    const result = _resolvePackDeprecation(
      "legacy-pack",
      rules,
      new Date("2026-07-01T00:00:00.000Z"),
    );

    expect(result.status).toBe("sunset");
    expect(result.redirectTo).toBe("modern-pack");
  });

  it("builds redirect map for deprecated/sunset packs", () => {
    const redirects = _buildRedirectMap(
      rules,
      new Date("2026-07-01T00:00:00.000Z"),
    );
    expect(redirects["/workflows/legacy-pack"]).toBe("/workflows/modern-pack");
  });
});
