import { describe, it, expect } from "vitest";
import {
  checkTemplateQuality,
  generateQualityReport,
  calculateSimilarity,
  extractPlainText,
  calculateUniqueTerms,
  checkDuplicateTitles as _checkDuplicateTitles,
  checkDuplicateMetaDescriptions as _checkDuplicateMetaDescriptions,
  checkContentOverlap as _checkContentOverlap,
  checkThinContent as _checkThinContent,
} from "@/lib/templateQualityValidator";

describe("Template Quality Validator", () => {
  describe("calculateSimilarity", () => {
    it("should return 1.0 for identical text", () => {
      const result = calculateSimilarity(
        "hello world test",
        "hello world test",
      );
      expect(result).toEqual(1.0);
    });

    it("should return 0 for completely different text", () => {
      const result = calculateSimilarity("apple banana cherry", "xyz abc def");
      expect(result).toEqual(0);
    });

    it("should calculate partial similarity", () => {
      const result = calculateSimilarity(
        "hello world test",
        "hello world other",
      );
      expect(result).toBeGreaterThanOrEqual(0.5);
      expect(result).toBeLessThan(1.0);
    });

    it("should ignore short words", () => {
      const result = calculateSimilarity(
        "the cat in the hat",
        "the dog in the hat",
      );
      // Words >= 3 chars: {the, cat, hat} vs {the, dog, hat}
      // Common: {the, hat} = 2
      // Union: {the, cat, dog, hat} = 4
      // Jaccard: 2/4 = 0.5
      expect(result).toBeCloseTo(0.5, 1);
    });

    it("should handle empty strings", () => {
      const result = calculateSimilarity("", "");
      expect(result).toEqual(0);
    });
  });

  describe("extractPlainText", () => {
    it("should remove HTML tags", () => {
      const result = extractPlainText("<p>Hello <strong>world</strong></p>");
      expect(result).toContain("Hello");
      expect(result).toContain("world");
      expect(result).not.toContain("<");
      expect(result).not.toContain(">");
    });

    it("should remove markdown formatting", () => {
      const result = extractPlainText("**Bold** *italic* `code`");
      expect(result).toContain("Bold");
      expect(result).toContain("italic");
      expect(result).not.toContain("**");
      expect(result).not.toContain("*");
      expect(result).not.toContain("`");
    });

    it("should normalize whitespace", () => {
      const result = extractPlainText("Hello    world   \n  test");
      expect(result).toEqual("Hello world test");
    });

    it("should handle mixed formatting", () => {
      const result = extractPlainText("<p>**Bold text** and [link](url)</p>");
      expect(result).toContain("Bold text");
      expect(result).not.toContain("<");
      expect(result).not.toContain("*");
      expect(result).not.toContain("[");
    });
  });

  describe("calculateUniqueTerms", () => {
    it("should extract unique terms excluding stop words", () => {
      const result = calculateUniqueTerms(
        "the quick brown fox jumps over the lazy dog",
      );
      expect(result.has("quick")).toBe(true);
      expect(result.has("brown")).toBe(true);
      expect(result.has("fox")).toBe(true);
      expect(result.has("the")).toBe(false);
    });

    it("should ignore short words", () => {
      const result = calculateUniqueTerms(
        "a be to go do is at an it or on for as by",
      );
      expect(result.size).toBe(0);
    });

    it("should be case-insensitive", () => {
      const result = calculateUniqueTerms("Python python PYTHON JavaScript");
      expect(result.has("python")).toBe(true);
      expect(result.has("javascript")).toBe(true);
    });

    it("should handle empty text", () => {
      const result = calculateUniqueTerms("");
      expect(result.size).toEqual(0);
    });
  });

  describe("checkDuplicateTitles", () => {
    it("should detect identical titles", () => {
      const items = [
        { id: "item1", name: "JSON Formatter" },
        { id: "item2", name: "JSON Formatter" },
      ];
      const result = _checkDuplicateTitles(items as any);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].type).toEqual("duplicate_title");
    });

    it("should be case-insensitive", () => {
      const items = [
        { id: "item1", name: "JSON Formatter" },
        { id: "item2", name: "json formatter" },
      ];
      const result = _checkDuplicateTitles(items as any);
      expect(result.length).toBeGreaterThan(0);
    });

    it("should allow unique titles", () => {
      const items = [
        { id: "item1", name: "JSON Formatter" },
        { id: "item2", name: "XML Converter" },
      ];
      const result = _checkDuplicateTitles(items as any);
      expect(result).toHaveLength(0);
    });
  });

  describe("checkDuplicateMetaDescriptions", () => {
    it("should detect duplicate meta descriptions", () => {
      const items = [
        { id: "item1", metaDescription: "Convert JSON to XML" },
        { id: "item2", metaDescription: "Convert JSON to XML" },
      ];
      const result = _checkDuplicateMetaDescriptions(items);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].type).toEqual("duplicate_meta");
    });

    it("should ignore empty descriptions", () => {
      const items = [
        { id: "item1", metaDescription: "" },
        { id: "item2", metaDescription: "" },
      ];
      const result = _checkDuplicateMetaDescriptions(items);
      expect(result).toHaveLength(0);
    });

    it("should allow unique descriptions", () => {
      const items = [
        { id: "item1", metaDescription: "Convert JSON to XML" },
        { id: "item2", metaDescription: "Convert XML to JSON" },
      ];
      const result = _checkDuplicateMetaDescriptions(items);
      expect(result).toHaveLength(0);
    });
  });

  describe("checkContentOverlap", () => {
    it("should detect high similarity", () => {
      const items = [
        {
          id: "item1",
          slug: "tool1",
          description:
            "This is a tool that converts JSON to XML and provides many features",
        },
        {
          id: "item2",
          slug: "tool2",
          description:
            "This is a tool that converts JSON to XML with many features",
        },
      ];
      const result = _checkContentOverlap(items, 0.7);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].type).toEqual("content_overlap");
      expect(result[0].similarity).toBeGreaterThan(0.6);
    });

    it("should not flag dissimilar content", () => {
      const items = [
        { id: "item1", slug: "tool1", description: "JSON to XML converter" },
        {
          id: "item2",
          slug: "tool2",
          description: "Image compression utility",
        },
      ];
      const result = _checkContentOverlap(items, 0.7);
      expect(result).toHaveLength(0);
    });

    it("should ignore very short content", () => {
      const items = [
        { id: "item1", slug: "tool1", description: "Small" },
        { id: "item2", slug: "tool2", description: "Small" },
      ];
      const result = _checkContentOverlap(items, 0.7);
      expect(result).toHaveLength(0);
    });
  });

  describe("checkThinContent", () => {
    it("should flag content below word count threshold", () => {
      const items = [
        {
          id: "item1",
          slug: "tool1",
          name: "Tool One",
          description: "This is short",
        },
      ];
      const result = _checkThinContent(items);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].type).toEqual("insufficient_length");
    });

    it("should flag low unique term diversity", () => {
      const items = [
        {
          id: "item1",
          slug: "tool1",
          name: "Tool One",
          description:
            "test test test test test test test test test test test test test test test test test test",
        },
      ];
      const result = _checkThinContent(items);
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((r) => r.type === "low_content_density")).toBe(true);
    });

    it("should flag keyword stuffing", () => {
      const items = [
        {
          id: "item1",
          slug: "tool1",
          name: "Tool One",
          description:
            "json json json json json json json json json json json json json json json json json json json json converter utility tool that handles JSON data",
        },
      ];
      const result = _checkThinContent(items);
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((r) => r.type === "keyword_stuffing")).toBe(true);
    });

    it("should pass substantial content", () => {
      const items = [
        {
          id: "item1",
          slug: "tool1",
          name: "JSON Formatter",
          description:
            "A comprehensive JSON formatting and validation tool designed specifically for developers and engineers. Validates JSON structure thoroughly, detects syntax errors accurately, and provides detailed error messages with solutions. Beautifies minified code with fully configurable indentation and formatting options. Supports multiple output formats including minified, prettified, and custom indentation levels. Perfect for developers working with APIs, configuration files, and data interchange formats everywhere. Features include syntax highlighting with color themes, automatic error detection and correction suggestions, direct clipboard integration for seamless workflow integration throughout. Also supports batch processing of multiple JSON documents simultaneously. Includes presets for popular frameworks and libraries worldwide. Handles edge cases like large files and special characters. Optimized for performance.",
        },
      ];
      const result = _checkThinContent(items);
      expect(result).toHaveLength(0);
    });

    it("should handle empty content", () => {
      const items = [
        { id: "item1", slug: "tool1", name: "Tool", description: "" },
      ];
      const result = _checkThinContent(items);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("checkTemplateQuality (integration)", () => {
    it("should handle empty data", async () => {
      const result = await checkTemplateQuality([], []);
      expect(result).toBeDefined();
      expect(result.summary.totalItems).toEqual(0);
      expect(result.summary.passRate).toEqual(1);
    });

    it("should detect uniqueness issues", async () => {
      const workflows = [
        {
          id: "wf1",
          slug: "formatter",
          name: "JSON Formatter",
          description: "A tool to format JSON data with validation",
        },
        {
          id: "wf2",
          slug: "converter",
          name: "JSON Formatter",
          description: "A tool to convert JSON to XML",
        },
      ];
      const result = await checkTemplateQuality(workflows, []);
      expect(result.uniquenessIssues.length).toBeGreaterThan(0);
    });

    it("should calculate statistics", async () => {
      const workflows = [
        {
          id: "wf1",
          slug: "formatter",
          name: "JSON Formatter",
          description:
            "A tool to format JSON data with extensive validation features and support for multiple output formats",
        },
      ];
      const result = await checkTemplateQuality(workflows, []);
      expect(result.summary.avgContentLength).toBeGreaterThan(0);
      expect(result.summary.avgUniqueTerms).toBeGreaterThan(0);
    });

    it("should generate pass status for quality content", async () => {
      const workflows = [
        {
          id: "wf1",
          slug: "formatter",
          name: "JSON Formatter",
          description:
            "Professional JSON formatting utility providing comprehensive validation and error detection capabilities. Supports beautification and minification with fully customizable indentation levels and formatting styles. Includes advanced syntax highlighting with multiple color themes. Features clipboard integration for seamless developer workflows. Handles large files efficiently with streaming support. Provides detailed error messages and recovery suggestions. Works with nested structures and complex data types. Includes preset configurations for popular JSON standards and frameworks.",
        },
        {
          id: "wf2",
          slug: "converter",
          name: "XML Converter",
          description:
            "Comprehensive XML conversion tool that transforms seamlessly between XML and JSON formats with advanced features. Includes complete schema validation capabilities, proper namespace handling and preservation, CDATA section preservation, attribute mapping with type inference. Perfect for enterprise data interchange and configuration management scenarios. Supports XPath queries and XSLT transformations. Handles complex nested structures with attribute preservation. Includes batch processing for multiple files. Provides detailed validation reports and error recovery mechanisms.",
        },
      ];
      const result = await checkTemplateQuality(workflows, []);
      expect(result.summary.passRate).toEqual(1);
    });
  });

  describe("generateQualityReport", () => {
    it("should generate pass report", () => {
      const result = {
        uniquenessIssues: [],
        thinContentIssues: [],
        summary: {
          totalItems: 5,
          uniquenessViolations: 0,
          thinContentViolations: 0,
          avgContentLength: 150,
          avgUniqueTerms: 45,
          passRate: 1,
        },
      };
      const report = generateQualityReport(result);
      expect(report).toContain("✅ PASS");
      expect(report).toContain("5");
    });

    it("should generate fail report with issues", () => {
      const result = {
        uniquenessIssues: [
          {
            type: "duplicate_title" as const,
            severity: "error" as const,
            item1: "item1",
            item2: "item2",
            field: "title",
            similarity: 1.0,
            message: "Duplicate title found",
          },
        ],
        thinContentIssues: [
          {
            type: "insufficient_length" as const,
            severity: "error" as const,
            itemId: "item3",
            itemName: "Item Three",
            metric: "wordCount",
            value: 20,
            threshold: 100,
            message: "Content too short",
          },
        ],
        summary: {
          totalItems: 3,
          uniquenessViolations: 1,
          thinContentViolations: 1,
          avgContentLength: 50,
          avgUniqueTerms: 15,
          passRate: 0.67,
        },
      };
      const report = generateQualityReport(result);
      expect(report).toContain("🚨 FAIL");
      expect(report).toContain("Duplicate title found");
      expect(report).toContain("Content too short");
    });

    it("should include statistics", () => {
      const result = {
        uniquenessIssues: [],
        thinContentIssues: [],
        summary: {
          totalItems: 10,
          uniquenessViolations: 0,
          thinContentViolations: 0,
          avgContentLength: 200,
          avgUniqueTerms: 60,
          passRate: 1,
        },
      };
      const report = generateQualityReport(result);
      expect(report).toContain("200 words");
      expect(report).toContain("60");
    });
  });
});
