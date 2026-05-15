import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { CsvView } from "@/components/devlens/views/CsvView";

const SAMPLE_CSV = `name,age,city,active
Alice,30,London,true
Bob,25,Paris,false
Carol,35,Berlin,true`;

describe("CsvView", () => {
  it("renders row and column count", () => {
    const html = renderToStaticMarkup(<CsvView input={SAMPLE_CSV} />);
    expect(html).toContain("3"); // 3 data rows
    expect(html).toContain("4"); // 4 columns
  });

  it("renders column headers", () => {
    const html = renderToStaticMarkup(<CsvView input={SAMPLE_CSV} />);
    expect(html).toContain("name");
    expect(html).toContain("age");
    expect(html).toContain("city");
  });

  it("detects delimiter", () => {
    const html = renderToStaticMarkup(<CsvView input={SAMPLE_CSV} />);
    expect(html).toContain("delimiter");
    expect(html).toContain(",");
  });

  it("handles TSV input", () => {
    const tsv = "name\tage\nAlice\t30\nBob\t25";
    const html = renderToStaticMarkup(<CsvView input={tsv} />);
    expect(html).toContain("name");
    expect(html).toContain("age");
  });
});
