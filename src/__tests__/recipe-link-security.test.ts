import { describe, expect, it } from "vitest";
import {
  _decodeAndVerifyRecipeLink,
  _encodeSignedRecipeLink,
  RECIPE_LINK_LIMITS,
} from "@/lib/recipeLinkSecurity";

describe("Recipe Link Signing and Size Limits (TB-155)", () => {
  const secret = "unit-test-secret";

  it("encodes and verifies a valid token", () => {
    const now = Date.now();
    const { token } = _encodeSignedRecipeLink(
      {
        recipeId: "recipe-1",
        workflowSlug: "api-payload-cleanup",
        version: "1.0.0",
        issuedAt: now,
        expiresAt: now + 1000 * 60 * 60,
        encrypted: true,
      },
      secret,
    );

    const verified = _decodeAndVerifyRecipeLink(token, secret, now + 1000);

    expect(verified.valid).toBe(true);
    expect(verified.payload?.recipeId).toBe("recipe-1");
  });

  it("rejects malformed tokens", () => {
    const verified = _decodeAndVerifyRecipeLink("bad-token", secret);
    expect(verified.valid).toBe(false);
    expect(verified.reason).toContain("Malformed");
  });

  it("rejects invalid signature", () => {
    const now = Date.now();
    const { token } = _encodeSignedRecipeLink(
      {
        recipeId: "recipe-2",
        workflowSlug: "api-payload-cleanup",
        version: "1.0.0",
        issuedAt: now,
        expiresAt: now + 1000 * 60,
        encrypted: false,
      },
      secret,
    );

    const [payload, sig] = token.split(".");
    const tamperedSig = `${sig.slice(0, -1)}${sig.endsWith("a") ? "b" : "a"}`;
    const tampered = `${payload}.${tamperedSig}`;
    const verified = _decodeAndVerifyRecipeLink(tampered, secret);

    expect(verified.valid).toBe(false);
  });

  it("rejects expired token", () => {
    const now = Date.now();
    const { token } = _encodeSignedRecipeLink(
      {
        recipeId: "recipe-3",
        workflowSlug: "api-payload-cleanup",
        version: "1.0.0",
        issuedAt: now,
        expiresAt: now + 10,
        encrypted: false,
      },
      secret,
    );

    const verified = _decodeAndVerifyRecipeLink(token, secret, now + 1000);

    expect(verified.valid).toBe(false);
    expect(verified.reason).toContain("expired");
  });

  it("enforces TTL upper bound", () => {
    const now = Date.now();

    expect(() =>
      _encodeSignedRecipeLink(
        {
          recipeId: "recipe-4",
          workflowSlug: "api-payload-cleanup",
          version: "1.0.0",
          issuedAt: now,
          expiresAt: now + RECIPE_LINK_LIMITS.maxTtlMs + 1,
          encrypted: true,
        },
        secret,
      ),
    ).toThrow(/TTL/);
  });

  it("enforces payload size limits", () => {
    const now = Date.now();
    const hugeId = "r".repeat(3000);

    expect(() =>
      _encodeSignedRecipeLink(
        {
          recipeId: hugeId,
          workflowSlug: "api-payload-cleanup",
          version: "1.0.0",
          issuedAt: now,
          expiresAt: now + 1000 * 60,
          encrypted: false,
        },
        secret,
      ),
    ).toThrow(/payload exceeds size limit/);
  });
});
