import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { TimestampView } from "@/components/devlens/views/TimestampView";

describe("TimestampView", () => {
  it("renders timezone conversions and reverse conversion helpers", () => {
    const html = renderToStaticMarkup(<TimestampView input="1715779200" />);

    expect(html).toContain("ISO 8601");
    expect(html).toContain("RFC 2822");
    expect(html).toContain("Relative time");
    expect(html).toContain("Reverse conversion");
    expect(html).toContain("UTC");
    expect(html).toContain("US/Eastern");
    expect(html).toContain("Asia/Tokyo");
    expect(html).toContain("Unix seconds");
    expect(html).toContain("Unix milliseconds");
    expect(html).toContain("Unix microseconds");
  });

  it("rejects invalid timestamps", () => {
    const html = renderToStaticMarkup(
      <TimestampView input="not-a-timestamp" />,
    );

    expect(html).toContain("Invalid Unix timestamp");
  });
});
