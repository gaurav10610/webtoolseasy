import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { JwtView } from "@/components/devlens/views/JwtView";

function base64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

describe("JwtView", () => {
  it("renders decoded header, payload, and claim guidance", () => {
    const now = Math.floor(Date.now() / 1000);
    const token = [
      base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" })),
      base64Url(
        JSON.stringify({
          sub: "123",
          iss: "https://issuer.example",
          aud: "webtoolseasy",
          exp: now + 3600,
          iat: now - 3600,
          email: "demo@example.com",
        }),
      ),
      "signature",
    ].join(".");

    const html = renderToStaticMarkup(<JwtView input={token} />);

    expect(html).toContain("HS256");
    expect(html).toContain("Signature segment present: yes");
    expect(html).toContain("Signature");
    expect(html).toContain("Expires");
    expect(html).toContain("Issued");
    expect(html).toContain("HMAC SHA-256");
    expect(html).toContain("demo@example.com");
  });

  it("shows a raw payload error when the payload is not JSON", () => {
    const token = [
      base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" })),
      base64Url("not-json"),
      "signature",
    ].join(".");

    const html = renderToStaticMarkup(<JwtView input={token} />);

    expect(html).toContain("Payload is not valid JSON");
    expect(html).toContain("Raw decoded payload bytes");
    expect(html).toContain("not-json");
  });

  it("rejects invalid JWT structure", () => {
    const html = renderToStaticMarkup(<JwtView input="just-a-string" />);

    expect(html).toContain("Invalid JWT structure");
  });
});
