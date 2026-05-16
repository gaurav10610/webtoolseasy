import { describe, expect, it } from "vitest";
import {
  decodeJwt,
  formatRelativeTime,
  getExpColor,
} from "@/components/devlens/views/JwtView";

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function buildJwt(header: Record<string, unknown>, payload: string): string {
  const headerPart = toBase64Url(JSON.stringify(header));
  const payloadPart = toBase64Url(payload);
  return `${headerPart}.${payloadPart}.signature`;
}

describe("JwtView helpers", () => {
  it("decodes valid JWT header and payload", () => {
    const token = buildJwt(
      { alg: "HS256", typ: "JWT" },
      JSON.stringify({ sub: "123", exp: 1900000000 }),
    );

    const decoded = decodeJwt(token);
    expect(decoded.error).toBeNull();
    expect(decoded.header).toMatchObject({ alg: "HS256", typ: "JWT" });
    expect(decoded.payload).toMatchObject({ sub: "123", exp: 1900000000 });
  });

  it("returns structure error for non three-part token", () => {
    const decoded = decodeJwt("abc.def");
    expect(decoded.error).toBe("Invalid JWT structure");
    expect(decoded.header).toBeNull();
    expect(decoded.payload).toBeNull();
  });

  it("reports payload JSON decode errors", () => {
    const token = buildJwt({ alg: "HS256" }, "not-json");
    const decoded = decodeJwt(token);
    expect(decoded.error).toBe("Payload is not valid JSON");
    expect(decoded.header).toMatchObject({ alg: "HS256" });
    expect(decoded.payload).toBeNull();
  });

  it("formats relative times and expiration colors", () => {
    expect(formatRelativeTime(120, 0)).toContain("minute");
    expect(getExpColor(10, 20)).toBe("text-rose-400");
    expect(getExpColor(250, 0)).toBe("text-amber-400");
    expect(getExpColor(1000, 0)).toBe("text-emerald-400");
  });
});
