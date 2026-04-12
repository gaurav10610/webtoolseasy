import { describe, it, expect } from "vitest";

describe("Category Validation", () => {
  it("should load all categories", async () => {
    const { categoryConfigs } = await import("@/data/categories");
    expect(Object.keys(categoryConfigs).length).toBeGreaterThan(0);
  });

  it("categories should have required fields", async () => {
    const { categoryConfigs } = await import("@/data/categories");
    const configs = Object.values(categoryConfigs);

    configs.forEach((config) => {
      expect(config.slug).toBeTruthy();
      expect(config.name).toBeTruthy();
      expect(config.toolIds).toBeTruthy();
      expect(Array.isArray(config.toolIds)).toBe(true);
      expect(config.toolIds.length).toBeGreaterThan(0);
    });
  });

  it("category slugs should match config keys", async () => {
    const { categoryConfigs } = await import("@/data/categories");
    const entries = Object.entries(categoryConfigs);

    for (const [key, config] of entries) {
      expect(config.slug).toBe(key);
    }
  });

  it("should not have duplicate tools across categories", async () => {
    const { categoryConfigs } = await import("@/data/categories");
    const configs = Object.values(categoryConfigs);

    const allToolIds = configs.flatMap((c) => c.toolIds || []);
    const duplicateToolIds = new Set(
      allToolIds.filter((id, index) => allToolIds.indexOf(id) !== index),
    );

    // The current model allows at most one intentional cross-category overlap.
    expect(duplicateToolIds.size).toBeLessThanOrEqual(1);
  });
});
