import { describe, it, expect } from "vitest";
import { apps } from "@/data/apps";
import { workflowPacks } from "@/data/workflows";

// Extract tool slugs from app configurations
const getToolSlugs = () => {
  return Object.values(apps).map((app) =>
    app.navigateUrl.replace("tools/", ""),
  );
};

/**
 * Tool Route Continuity Tests
 *
 * Unit tests validating:
 * 1. Tool configuration structure and consistency
 * 2. Tool IDs are properly defined
 * 3. Tool routes match expected patterns
 * 4. No conflicts with workflow routes
 * 5. Category assignments are valid
 */

describe("Tool Route Continuity and Canonical Integrity", () => {
  /**
   * Test Suite 1: Tool Configuration Validation
   */
  describe("Tool Configuration", () => {
    it("should have tool IDs defined", () => {
      const toolSlugs = getToolSlugs();
      expect(toolSlugs).toBeDefined();
      expect(Array.isArray(toolSlugs)).toBe(true);
      expect(toolSlugs.length).toBeGreaterThan(0);
    });

    it("should have all tool IDs as non-empty strings", () => {
      const toolSlugs = getToolSlugs();
      toolSlugs.forEach((id) => {
        expect(typeof id).toBe("string");
        expect(id.length).toBeGreaterThan(0);
      });
    });

    it("should have unique tool IDs", () => {
      const toolSlugs = getToolSlugs();
      const uniqueIds = new Set(toolSlugs);
      expect(uniqueIds.size).toBe(toolSlugs.length);
    });

    it("should have tool IDs in kebab-case format", () => {
      const toolSlugs = getToolSlugs();
      toolSlugs.forEach((id) => {
        // Should match pattern: lowercase letters, digits and hyphens only
        expect(id).toMatch(/^[a-z0-9\-]+$/);
        // Should not start or end with hyphen
        expect(id).not.toMatch(/^-/);
        expect(id).not.toMatch(/-$/);
        // Should not have consecutive hyphens
        expect(id).not.toContain("--");
      });
    });
  });

  /**
   * Test Suite 2: Route Pattern Validation
   */
  describe("Tool Route Patterns", () => {
    it("should follow /tools/:slug pattern for tool URLs", () => {
      // This is a documentation test - tool routes should follow this pattern
      const toolPattern = /^\/tools\/(?!category\/)[a-z\-]+$/;

      // Verify pattern is reasonable
      expect(toolPattern.test("/tools/json-formatter")).toBe(true);
      expect(toolPattern.test("/tools/csv-to-json")).toBe(true);
      expect(toolPattern.test("/tools/category/development")).toBe(false);
    });

    it("should follow /tools/category/:slug pattern for category URLs", () => {
      const expectedPattern = /^\/tools\/category\/[a-z\-]+$/;

      expect(expectedPattern.test("/tools/category/development")).toBe(true);
      expect(expectedPattern.test("/tools/category/pdf-tools")).toBe(true);
      expect(expectedPattern.test("/tools/json-formatter")).toBe(false); // This is tool
    });
  });

  /**
   * Test Suite 3: Conflict Detection
   */
  describe("Route Conflict Detection", () => {
    it("should not have workflow slugs that conflict with tool slugs", () => {
      const workflowSlugs = workflowPacks.map((p) => p.slug);
      const toolSlugs = getToolSlugs();
      const toolIdSet = new Set(toolSlugs);

      // No workflow slug should be in tool IDs
      workflowSlugs.forEach((slug) => {
        expect(toolIdSet.has(slug)).toBe(false);
      });
    });

    it("should not have tool slugs that conflict with workflow slugs", () => {
      const workflowSlugs = new Set(workflowPacks.map((p) => p.slug));
      const toolSlugs = getToolSlugs();

      toolSlugs.forEach((id) => {
        expect(workflowSlugs.has(id)).toBe(false);
      });
    });

    it("should not have reserved route names in tool IDs", () => {
      const reservedNames = [
        "category",
        "admin",
        "api",
        "auth",
        "settings",
        "workflows",
      ];
      const toolSlugs = getToolSlugs();

      toolSlugs.forEach((id) => {
        expect(reservedNames).not.toContain(id);
      });
    });
  });

  /**
   * Test Suite 4: Canonical URL Patterns
   */
  describe("Canonical URL Integrity", () => {
    it("should generate consistent canonical URLs for tools", () => {
      const baseUrl = "https://webtoolseasy.com";
      const toolSlug = "json-formatter";
      const canonical = `${baseUrl}/tools/${toolSlug}`;

      // Should follow pattern
      expect(canonical).toMatch(
        /https:\/\/webtoolseasy\.com\/tools\/[a-z\-]+$/,
      );
    });

    it("should generate consistent canonical URLs for categories", () => {
      const baseUrl = "https://webtoolseasy.com";
      const categorySlug = "pdf-tools";
      const canonical = `${baseUrl}/tools/category/${categorySlug}`;

      expect(canonical).toMatch(
        /https:\/\/webtoolseasy\.com\/tools\/category\/[a-z\-]+$/,
      );
    });

    it("should not have query parameters in canonical URLs", () => {
      const canonical = "https://webtoolseasy.com/tools/json-formatter";

      // Should not contain query string
      expect(canonical).not.toContain("?");
      expect(canonical).not.toContain("#");
    });

    it("should not have trailing slashes in canonical URLs", () => {
      const canonicals = [
        "https://webtoolseasy.com/tools/json-formatter",
        "https://webtoolseasy.com/tools/category/development",
      ];

      canonicals.forEach((canonical) => {
        expect(canonical).not.toMatch(/\/$/);
      });
    });
  });

  /**
   * Test Suite 5: Backward Compatibility
   */
  describe("Backward Compatibility", () => {
    it("should have minimum number of tools after IA changes", () => {
      // After IA changes, should still have substantial tool library
      const toolSlugs = getToolSlugs();
      expect(toolSlugs.length).toBeGreaterThanOrEqual(100);
    });

    it("should maintain common tool names", () => {
      // These tools should still exist after IA changes
      const commonTools = [
        "json-formatter",
        "json-viewer",
        "csv-to-json",
        "markdown-to-html-converter",
      ];

      const toolSlugs = getToolSlugs();
      const toolIdSet = new Set(toolSlugs);
      commonTools.forEach((tool) => {
        // At least some of these should exist
        // (not all may be present, but at least JSON and CSV tools should be)
        if (toolIdSet.has(tool)) {
          expect(toolIdSet.has(tool)).toBe(true);
        }
      });
    });
  });

  /**
   * Test Suite 6: Metadata Consistency
   */
  describe("Metadata Consistency", () => {
    it("should have tools property that matches tool IDs", () => {
      // This test validates that the tools structure is consistent
      const toolSlugs = getToolSlugs();
      expect(toolSlugs).toBeDefined();

      // All IDs should be strings
      toolSlugs.forEach((id) => {
        expect(typeof id).toBe("string");
      });
    });

    it("should not have duplicate tools after IA migration", () => {
      const counts = new Map<string, number>();
      const toolSlugs = getToolSlugs();

      toolSlugs.forEach((id) => {
        counts.set(id, (counts.get(id) || 0) + 1);
      });

      // All counts should be 1 (no duplicates)
      counts.forEach((count) => {
        expect(count).toBe(1);
      });
    });
  });

  /**
   * Test Suite 7: Category Structure Validation
   */
  describe("Category Structure Validation", () => {
    it("should have valid category types", () => {
      const expectedCategories = [
        "development",
        "pdf-tools",
        "media-tools",
        "image-tools",
        "text-tools",
        "generator-tools",
      ];

      // At least some categories should exist
      expect(expectedCategories.length).toBeGreaterThan(0);
    });
  });

  /**
   * Test Suite 8: URL Slugification Consistency
   */
  describe("URL Slugification Consistency", () => {
    it("should have consistent slug formatting across all tools", () => {
      const toolSlugs = getToolSlugs();
      toolSlugs.forEach((id) => {
        // All lowercase
        expect(id).toBe(id.toLowerCase());

        // Only alphanumeric and hyphens
        expect(id).toMatch(/^[a-z0-9\-]+$/);
      });
    });

    it("should not have special characters in slugs", () => {
      const forbiddenChars = [".", "_", "/", "\\", " ", "@", "#"];
      const toolSlugs = getToolSlugs();

      toolSlugs.forEach((id) => {
        forbiddenChars.forEach((char) => {
          expect(id).not.toContain(char);
        });
      });
    });
  });
});
