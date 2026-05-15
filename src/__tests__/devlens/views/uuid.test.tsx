import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { UuidView } from "@/components/devlens/views/UuidView";

function makeUuidV7(unixMilliseconds: number) {
  const timestamp = BigInt(unixMilliseconds).toString(16).padStart(12, "0");
  return `${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}-7000-8000-0123456789ab`;
}

describe("UuidView", () => {
  it("renders version 1 timestamp details", () => {
    const html = renderToStaticMarkup(
      <UuidView input="f81d4fae-7dec-11d0-a765-00a0c91e6bf6" />,
    );

    expect(html).toContain("Version 1 timestamp");
    expect(html).toContain("RFC 4122");
    expect(html).toContain("Node:");
    expect(html).toContain("Clock sequence:");
  });

  it("renders version 4 randomness details", () => {
    const html = renderToStaticMarkup(
      <UuidView input="550e8400-e29b-41d4-a716-446655440000" />,
    );

    expect(html).toContain("Random bits");
    expect(html).toContain("122 bits of randomness");
    expect(html).toContain("Generate new UUID v4");
    expect(html).toContain("Generate new UUID v7");
  });

  it("renders version 7 timestamp details", () => {
    const html = renderToStaticMarkup(
      <UuidView input={makeUuidV7(1715779200000)} />,
    );

    expect(html).toContain("Version 7 timestamp");
    expect(html).toContain("2024-");
  });

  it("rejects invalid UUIDs", () => {
    const html = renderToStaticMarkup(<UuidView input="not-a-uuid" />);

    expect(html).toContain("Invalid UUID format");
  });
});
