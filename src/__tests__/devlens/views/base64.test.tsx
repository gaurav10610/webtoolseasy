import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Base64View } from "@/components/devlens/views/Base64View";

describe("Base64View", () => {
  it("renders decoded JSON and size metadata", () => {
    const input = Buffer.from('{"name":"WebToolsEasy"}').toString("base64");
    const html = renderToStaticMarkup(<Base64View input={input} />);

    expect(html).toContain("Decoded bytes");
    expect(html).toContain("Encoded length");
    expect(html).toContain("Overhead");
    expect(html).toContain("JSON");
    expect(html).toContain("View as JSON");
    expect(html).toContain("WebToolsEasy");
  });

  it("renders encode mode controls and output", () => {
    const html = renderToStaticMarkup(<Base64View input="Hello world!" />);

    expect(html).toContain("Encode");
    expect(html).toContain("Decode");
    expect(html).toContain("Encoded output");
    expect(html).toContain(Buffer.from("Hello world!").toString("base64"));
  });

  it("renders data URL metadata for images", () => {
    const input =
      "data:image/svg+xml;base64," +
      Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>').toString(
        "base64",
      );
    const html = renderToStaticMarkup(<Base64View input={input} />);

    expect(html).toContain("Base64 image preview");
    expect(html).toContain("image/svg+xml");
  });

  it("classifies html text after decoding", () => {
    const input = Buffer.from("<p>Hello</p>").toString("base64");
    const html = renderToStaticMarkup(<Base64View input={input} />);

    expect(html).toContain("HTML");
    expect(html).toContain("Hello");
  });

  it("renders a binary hex preview", () => {
    const input = Buffer.from([0, 1, 2, 3, 255]).toString("base64");
    const html = renderToStaticMarkup(<Base64View input={input} />);

    expect(html).toContain("Binary");
    expect(html).toContain("Hex preview");
    expect(html).toContain("00 01 02 03 ff");
  });
});
