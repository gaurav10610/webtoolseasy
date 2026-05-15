import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { RegexView } from "@/components/devlens/views/RegexView";

describe("RegexView", () => {
  it("renders pattern and flags from slash notation", () => {
    const html = renderToStaticMarkup(<RegexView input="/hello/gi" />);
    expect(html).toContain("/hello/gi");
    expect(html).toContain("g");
    expect(html).toContain("i");
  });

  it("renders explain tab token breakdown", () => {
    const html = renderToStaticMarkup(<RegexView input="/\\d+/" />);
    expect(html).toContain("\\d+");
  });

  it("shows error state for invalid regex", () => {
    const html = renderToStaticMarkup(<RegexView input="/[unclosed/" />);
    expect(html).toContain("Invalid regular expression");
  });

  it("renders raw pattern without slashes", () => {
    const html = renderToStaticMarkup(<RegexView input="[A-Z]+" />);
    expect(html).toContain("[A-Z]+");
  });
});
