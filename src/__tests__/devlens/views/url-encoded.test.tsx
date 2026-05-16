import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { UrlEncodedView } from "@/components/devlens/views/UrlEncodedView";

describe("UrlEncodedView", () => {
  it("renders decoded query parameters", () => {
    const html = renderToStaticMarkup(
      <UrlEncodedView input="name=WebToolsEasy&note=hello%20world" />,
    );

    expect(html).toContain("Parameters");
    expect(html).toContain("WebToolsEasy");
    expect(html).toContain("hello world");
  });

  it("flags double-encoded values", () => {
    const html = renderToStaticMarkup(
      <UrlEncodedView input="note=hello%2520world" />,
    );

    expect(html).toContain("double-encoded");
    expect(html).toContain("2×");
  });

  it("renders the parsed summary for a full URL", () => {
    const html = renderToStaticMarkup(
      <UrlEncodedView input="https://example.com/search?q=webtools" />,
    );

    expect(html).toContain("https://example.com/search");
    expect(html).toContain("webtools");
  });
});
