import { describe, expect, it } from "vitest";
import { workflowPacks, workflowBySlug } from "@/data/workflows";

describe("Workflow pack config validation", () => {
  it("has at least 5 workflow packs", () => {
    expect(workflowPacks.length).toBeGreaterThanOrEqual(5);
  });

  it("ensures each workflow has steps and export artifacts", () => {
    for (const pack of workflowPacks) {
      expect(pack.id.length).toBeGreaterThan(0);
      expect(pack.slug.length).toBeGreaterThan(0);
      expect(pack.name.length).toBeGreaterThan(0);
      expect(pack.steps.length).toBeGreaterThan(0);
      expect(pack.outputArtifacts.length).toBeGreaterThan(0);
    }
  });

  it("ensures step ids are unique per workflow", () => {
    for (const pack of workflowPacks) {
      const ids = pack.steps.map((step) => step.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("maps all slugs through workflowBySlug", () => {
    for (const pack of workflowPacks) {
      expect(workflowBySlug[pack.slug]?.id).toBe(pack.id);
    }
  });
});
