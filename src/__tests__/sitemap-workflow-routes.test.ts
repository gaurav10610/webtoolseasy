import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { workflowPacks } from "@/data/workflows";

describe("sitemap workflow/template coverage", () => {
  it("includes workflow and template index routes", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");

    expect(sitemap).toContain("https://webtoolseasy.com/workflows");
    expect(sitemap).toContain("https://webtoolseasy.com/templates");
  });

  it("includes all workflow and template detail URLs", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");

    for (const workflow of workflowPacks) {
      expect(sitemap).toContain(
        `https://webtoolseasy.com/workflows/${workflow.slug}`,
      );
      expect(sitemap).toContain(
        `https://webtoolseasy.com/templates/${workflow.slug}`,
      );
    }
  });
});
