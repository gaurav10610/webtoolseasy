import { describe, expect, it } from "vitest";
import { compress, decompress } from "@/utils/compress";

describe("compress utils", () => {
  it("round-trips a normal payload", () => {
    const payload = JSON.stringify({ a: 1, b: ["x", "y"], ok: true });
    const encoded = compress(payload);
    const decoded = decompress(encoded);

    expect(decoded).toBe(payload);
  });

  it("round-trips a large payload", () => {
    const payload = "webtoolseasy-".repeat(10000);
    const encoded = compress(payload);
    const decoded = decompress(encoded);

    expect(decoded.length).toBe(payload.length);
    expect(decoded).toBe(payload);
  });

  it("throws for invalid compressed input", () => {
    expect(() => decompress("not-valid-base64url")).toThrow();
  });
});
