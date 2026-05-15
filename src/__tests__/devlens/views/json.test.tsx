import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { JsonView } from "@/components/devlens/views/JsonView";

describe("JsonView", () => {
  it("renders tree view and summary statistics", () => {
    const html = renderToStaticMarkup(
      <JsonView input='{"name":"WebToolsEasy","items":[{"id":1,"tags":["a","b"]}]}' />,
    );

    expect(html).toContain("Tree view");
    expect(html).toContain("Top-level entries: 2");
    expect(html).toContain("Total keys: 4");
    expect(html).toContain("Depth: 5");
    expect(html).toContain("object · 2");
    expect(html).toContain("items");
    expect(html).toContain("tags");
  });

  it("shows parse errors for invalid JSON", () => {
    const html = renderToStaticMarkup(<JsonView input="{not-json}" />);

    expect(html).toContain("Unable to parse JSON");
    expect(html).toContain("Expected property name");
  });
});
