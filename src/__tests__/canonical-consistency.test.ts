import { describe, it, expect } from "vitest";
import {
  checkCanonicalConsistency,
  generateCanonicalReport,
} from "@/lib/canonicalConsistencyChecker";

// Import testing functions
import {
  buildCanonical,
  checkForDuplicates,
  checkTrailingSlashes,
  checkToolUrls,
  checkWorkflowUrls,
  checkBlogUrls,
  checkCrossDomainConflicts,
} from "@/lib/canonicalConsistencyChecker";

describe("Canonical Consistency Checker", () => {
  describe("buildCanonical", () => {
    it("should build canonical URL with leading slash", () => {
      const result = buildCanonical("tools/json-formatter");
      expect(result).toEqual("https://webtoolseasy.com/tools/json-formatter");
    });

    it("should handle trailing slashes", () => {
      const result = buildCanonical("/tools/json-formatter/");
      expect(result).toEqual("https://webtoolseasy.com/tools/json-formatter");
    });

    it("should handle root path", () => {
      const result = buildCanonical("/");
      expect(result).toEqual("https://webtoolseasy.com/");
    });

    it("should support custom base URL", () => {
      const result = buildCanonical("/tools/test", "https://custom.com");
      expect(result).toEqual("https://custom.com/tools/test");
    });
  });

  describe("checkForDuplicates", () => {
    it("should detect duplicate canonicals", () => {
      const paths = new Map([
        [
          "https://webtoolseasy.com/tools/formatter",
          ["/tools/formatter", "/format-tool"],
        ],
      ]);

      const issues = checkForDuplicates(paths);
      expect(issues).toHaveLength(1);
      expect(issues[0].type).toEqual("duplicate_canonical");
      expect(issues[0].severity).toEqual("error");
    });

    it("should allow single path per canonical", () => {
      const paths = new Map([
        ["https://webtoolseasy.com/tools/formatter", ["/tools/formatter"]],
      ]);

      const issues = checkForDuplicates(paths);
      expect(issues).toHaveLength(0);
    });
  });

  describe("checkTrailingSlashes", () => {
    it("should detect paths with and without trailing slashes", () => {
      const paths = new Set([
        "/tools/formatter",
        "/tools/formatter/",
        "/blog/post",
      ]);

      const issues = checkTrailingSlashes(paths);
      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0].type).toEqual("trailing_slash");
    });

    it("should allow root path with trailing slash", () => {
      const paths = new Set(["/"]);

      const issues = checkTrailingSlashes(paths);
      expect(issues).toHaveLength(0);
    });

    it("should not flag single path", () => {
      const paths = new Set(["/tools/formatter"]);

      const issues = checkTrailingSlashes(paths);
      expect(issues).toHaveLength(0);
    });
  });

  describe("checkToolUrls", () => {
    it("should validate tool URL patterns", () => {
      const tools = new Map([
        [
          "json-formatter",
          {
            navigateUrl: "/tools/json-formatter",
            name: "JSON Formatter",
          } as any,
        ],
      ]);

      const issues = checkToolUrls(tools);
      expect(issues).toHaveLength(0);
    });

    it("should detect missing navigateUrl", () => {
      const tools = new Map([
        ["json-formatter", { name: "JSON Formatter" } as any],
      ]);

      const issues = checkToolUrls(tools);
      expect(issues).toHaveLength(1);
      expect(issues[0].type).toEqual("missing_canonical");
    });

    it("should detect incorrect URL pattern", () => {
      const tools = new Map([
        [
          "json-formatter",
          {
            navigateUrl: "/formatters/json",
            name: "JSON Formatter",
          } as any,
        ],
      ]);

      const issues = checkToolUrls(tools);
      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0].type).toEqual("mismatch");
    });

    it("should detect duplicate canonicals across tools", () => {
      const tools = new Map([
        [
          "formatter-1",
          {
            navigateUrl: "/tools/json-formatter",
            name: "Tool 1",
          } as any,
        ],
        [
          "formatter-2",
          {
            navigateUrl: "/tools/json-formatter",
            name: "Tool 2",
          } as any,
        ],
      ]);

      const issues = checkToolUrls(tools);
      expect(issues.length).toBeGreaterThan(0);
      expect(issues.some((i) => i.type === "duplicate_canonical")).toBe(true);
    });
  });

  describe("checkWorkflowUrls", () => {
    it("should validate workflow URL patterns", () => {
      const workflows = [
        {
          id: "wf-api-cleanup",
          slug: "api-payload-cleanup",
          name: "API Cleanup",
        } as any,
      ];

      const issues = checkWorkflowUrls(workflows);
      expect(issues).toHaveLength(0);
    });

    it("should detect missing slug", () => {
      const workflows = [
        {
          id: "wf-api-cleanup",
          name: "API Cleanup",
        } as any,
      ];

      const issues = checkWorkflowUrls(workflows);
      expect(issues).toHaveLength(1);
      expect(issues[0].type).toEqual("missing_canonical");
    });

    it("should warn on non-kebab-case slugs", () => {
      const workflows = [
        {
          id: "wf-api-cleanup",
          slug: "API_Cleanup",
          name: "API Cleanup",
        } as any,
      ];

      const issues = checkWorkflowUrls(workflows);
      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0].type).toEqual("mismatch");
      expect(issues[0].severity).toEqual("warning");
    });
  });

  describe("checkCrossDomainConflicts", () => {
    it("should detect tool vs workflow slug conflicts", () => {
      const toolSlugs = new Set(["formatter", "converter"]);
      const workflowSlugs = new Set(["formatter", "parser"]);
      const blogSlugs = new Set(["tips"]);

      const issues = checkCrossDomainConflicts(
        toolSlugs,
        workflowSlugs,
        blogSlugs,
      );
      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0].message).toContain("tools");
      expect(issues[0].message).toContain("workflows");
    });

    it("should not flag unique slugs across domains", () => {
      const toolSlugs = new Set(["formatter"]);
      const workflowSlugs = new Set(["cleanup"]);
      const blogSlugs = new Set(["tips"]);

      const issues = checkCrossDomainConflicts(
        toolSlugs,
        workflowSlugs,
        blogSlugs,
      );
      expect(issues).toHaveLength(0);
    });
  });

  describe("generateCanonicalReport", () => {
    it("should generate report for valid result", () => {
      const result = {
        isValid: true,
        issues: [],
        summary: {
          totalPaths: 100,
          duplicates: 0,
          mismatches: 0,
          trailingSlashIssues: 0,
        },
      };

      const report = generateCanonicalReport(result);
      expect(report).toContain("✅");
      expect(report).toContain("PASS");
    });

    it("should generate report for invalid result", () => {
      const result = {
        isValid: false,
        issues: [
          {
            type: "duplicate_canonical" as const,
            severity: "error" as const,
            path: "/tools/formatter",
            expected: "https://webtoolseasy.com/tools/formatter",
            message: "Duplicate canonical",
          },
        ],
        summary: {
          totalPaths: 100,
          duplicates: 1,
          mismatches: 0,
          trailingSlashIssues: 0,
        },
      };

      const report = generateCanonicalReport(result);
      expect(report).toContain("🚨");
      expect(report).toContain("FAIL");
      expect(report).toContain("Duplicate canonical");
    });
  });

  describe("checkCanonicalConsistency (integration)", () => {
    it("should handle empty data gracefully", async () => {
      const result = await checkCanonicalConsistency(new Map(), [], []);

      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
      expect(result.summary.totalPaths).toEqual(0);
    });

    it("should combine issues from all domains", async () => {
      const tools = new Map([
        [
          "formatter",
          {
            navigateUrl: "/tools/formatter",
            name: "Formatter",
          } as any,
        ],
      ]);

      const workflows = [
        {
          id: "wf-test",
          slug: "test-workflow",
          name: "Test",
        } as any,
      ];

      const blogs = [{ slug: "blog-post", title: "Blog Post" }];

      const result = await checkCanonicalConsistency(tools, workflows, blogs);

      expect(result.summary.totalPaths).toEqual(3);
      expect(result.isValid).toBe(true);
    });

    it("should detect conflicts across domains", async () => {
      const tools = new Map([
        [
          "formatter",
          {
            navigateUrl: "/tools/guide",
            name: "Formatter",
          } as any,
        ],
      ]);

      const workflows = [
        {
          id: "wf-test",
          slug: "guide",
          name: "Test",
        } as any,
      ];

      const blogs: any[] = [];

      const result = await checkCanonicalConsistency(tools, workflows, blogs);

      expect(result.isValid).toBe(false);
      expect(result.issues.some((i) => i.type === "duplicate_canonical")).toBe(
        true,
      );
    });
  });
});
