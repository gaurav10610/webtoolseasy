import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { XmlView } from "@/components/devlens/views/XmlView";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<root id="1" name="test">
  <item type="a">Hello</item>
  <item type="b">World</item>
</root>`;

describe("XmlView", () => {
  it("renders root element name", () => {
    const html = renderToStaticMarkup(<XmlView input={SAMPLE_XML} />);
    expect(html).toContain("root");
  });

  it("renders element count", () => {
    const html = renderToStaticMarkup(<XmlView input={SAMPLE_XML} />);
    // root, 2 items = 3 open tags
    expect(html).toContain("Elements");
  });

  it("shows parse error for malformed XML", () => {
    const html = renderToStaticMarkup(<XmlView input="<unclosed" />);
    expect(html).toContain("Parse error");
  });

  it("renders attribute count", () => {
    const html = renderToStaticMarkup(<XmlView input={SAMPLE_XML} />);
    expect(html).toContain("Attributes");
  });
});
