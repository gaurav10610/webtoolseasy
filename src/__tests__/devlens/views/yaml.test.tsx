import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { YamlView } from "@/components/devlens/views/YamlView";

const SAMPLE_YAML = `
name: Alice
age: 30
roles:
  - admin
  - editor
address:
  city: London
  zip: SW1A 1AA
`.trim();

describe("YamlView", () => {
  it("renders top-level key count", () => {
    const html = renderToStaticMarkup(<YamlView input={SAMPLE_YAML} />);
    expect(html).toContain("3"); // name, age, roles, address — wait, 4 keys. top-level count should be 4
    expect(html).toContain("top-level");
  });

  it("renders object type badge", () => {
    const html = renderToStaticMarkup(<YamlView input={SAMPLE_YAML} />);
    expect(html).toContain("object");
  });

  it("shows parse error for invalid YAML", () => {
    const html = renderToStaticMarkup(<YamlView input="key: [unclosed" />);
    expect(html).toContain("Parse error");
  });

  it("renders array YAML correctly", () => {
    const html = renderToStaticMarkup(
      <YamlView input="- one\n- two\n- three" />,
    );
    expect(html).toContain("array");
    expect(html).toContain("3");
  });
});
