import { describe, it, expect, vi } from "vitest";
import {
  useWorkflowBreadcrumbs,
  useBlogBreadcrumbs,
  validateWorkflowPageSchema,
  previewWorkflowJSON,
} from "@/components/common/JSONLDScript";
import { WorkflowPackConfig } from "@/types/workflow";

describe("JSON-LD Script Generation", () => {
  const mockWorkflow: WorkflowPackConfig = {
    id: "test-workflow",
    slug: "test-workflow",
    name: "Test Workflow",
    summary: "A test workflow",
    category: "developer",
    tags: ["test"],
    steps: [
      {
        id: "step1",
        title: "Input",
        description: "Input step",
        executionMode: "local-only",
      },
    ],
    outputArtifacts: ["output.json"],
  };

  describe("useWorkflowBreadcrumbs hook", () => {
    it("returns breadcrumb array", () => {
      const crumbs = useWorkflowBreadcrumbs(
        mockWorkflow,
        "https://example.com",
      );
      expect(Array.isArray(crumbs)).toBe(true);
      expect(crumbs.length).toBeGreaterThan(0);
      expect(crumbs[0].name).toBe("Home");
    });

    it("includes workflow name in breadcrumbs", () => {
      const crumbs = useWorkflowBreadcrumbs(mockWorkflow);
      const workflowCrumb = crumbs.find((c) => c.name === mockWorkflow.name);
      expect(workflowCrumb).toBeDefined();
    });

    it("includes workflow category", () => {
      const crumbs = useWorkflowBreadcrumbs(mockWorkflow);
      const categoryCrumb = crumbs.find(
        (c) => c.name === mockWorkflow.category,
      );
      expect(categoryCrumb).toBeDefined();
    });

    it("includes workflow slug in URL", () => {
      const crumbs = useWorkflowBreadcrumbs(
        mockWorkflow,
        "https://example.com",
      );
      const workflowCrumb = crumbs.find((c) => c.name === mockWorkflow.name);
      expect(workflowCrumb?.url).toContain(mockWorkflow.slug);
    });

    it("handles base URL without trailing slash", () => {
      const crumbs = useWorkflowBreadcrumbs(
        mockWorkflow,
        "https://example.com",
      );
      expect(crumbs[0].url).toBe("https://example.com");
    });

    it("handles undefined base URL", () => {
      const crumbs = useWorkflowBreadcrumbs(mockWorkflow);
      expect(crumbs[0].url).toBe("/");
    });
  });

  describe("useBlogBreadcrumbs hook", () => {
    it("returns blog breadcrumb array", () => {
      const crumbs = useBlogBreadcrumbs("Test Post", "test-post");
      expect(Array.isArray(crumbs)).toBe(true);
      expect(crumbs[0].name).toBe("Home");
      expect(crumbs[1].name).toBe("Blog");
    });

    it("includes article title", () => {
      const crumbs = useBlogBreadcrumbs("Test Post", "test-post");
      const postCrumb = crumbs.find((c) => c.name === "Test Post");
      expect(postCrumb).toBeDefined();
    });

    it("includes slug in URL", () => {
      const crumbs = useBlogBreadcrumbs("Test Post", "test-post");
      expect(crumbs[crumbs.length - 1].url).toContain("test-post");
    });

    it("handles base URL parameter", () => {
      const crumbs = useBlogBreadcrumbs(
        "Test Post",
        "test-post",
        "https://example.com",
      );
      expect(crumbs[0].url).toBe("https://example.com");
      expect(crumbs[1].url).toContain("example.com");
    });

    it("handles all items have proper structure", () => {
      const crumbs = useBlogBreadcrumbs("Post", "post-slug");
      crumbs.forEach((crumb) => {
        expect(typeof crumb.name).toBe("string");
        expect(typeof crumb.url).toBe("string");
      });
    });
  });

  describe("validateWorkflowPageSchema", () => {
    it("validates complete workflow", () => {
      const result = validateWorkflowPageSchema(mockWorkflow);
      expect(result.isValid).toBe(true);
      expect(result.missingElements).toHaveLength(0);
    });

    it("detects missing name", () => {
      const incomplete = { ...mockWorkflow, name: "" };
      const result = validateWorkflowPageSchema(incomplete);
      expect(result.isValid).toBe(false);
      expect(result.missingElements).toContain("name");
    });

    it("detects missing description", () => {
      const incomplete = { ...mockWorkflow, summary: "" };
      const result = validateWorkflowPageSchema(incomplete);
      expect(result.isValid).toBe(false);
      expect(result.missingElements).toContain("summary");
    });

    it("detects missing steps", () => {
      const incomplete = { ...mockWorkflow, steps: [] };
      const result = validateWorkflowPageSchema(incomplete);
      expect(result.isValid).toBe(false);
      expect(result.missingElements).toContain("steps");
    });

    it("can have multiple missing elements", () => {
      const incomplete = {
        ...mockWorkflow,
        name: "",
        steps: [],
      };
      const result = validateWorkflowPageSchema(incomplete);
      expect(result.isValid).toBe(false);
      expect(result.missingElements.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("previewWorkflowJSON", () => {
    it("generates JSON string", () => {
      const json = previewWorkflowJSON(mockWorkflow);
      expect(typeof json).toBe("string");
      expect(json).toContain("HowTo");
      expect(json).toContain("FAQPage");
    });

    it("includes workflow name in output", () => {
      const json = previewWorkflowJSON(mockWorkflow);
      expect(json).toContain("Test Workflow");
    });

    it("is valid JSON", () => {
      const json = previewWorkflowJSON(mockWorkflow);
      expect(() => JSON.parse(json)).not.toThrow();
    });

    it("includes schema structure", () => {
      const json = previewWorkflowJSON(mockWorkflow);
      const parsed = JSON.parse(json);
      expect(parsed.howTo).toBeDefined();
      expect(parsed.faq).toBeDefined();
    });

    it("howTo has required schema.org fields", () => {
      const json = previewWorkflowJSON(mockWorkflow);
      const parsed = JSON.parse(json);
      expect(parsed.howTo["@context"]).toBe("https://schema.org");
      expect(parsed.howTo["@type"]).toBe("HowTo");
      expect(parsed.howTo.name).toBe("Test Workflow");
      expect(parsed.howTo.step).toBeInstanceOf(Array);
    });

    it("faq has required schema.org fields", () => {
      const json = previewWorkflowJSON(mockWorkflow);
      const parsed = JSON.parse(json);
      expect(parsed.faq["@context"]).toBe("https://schema.org");
      expect(parsed.faq["@type"]).toBe("FAQPage");
      expect(parsed.faq.mainEntity).toBeInstanceOf(Array);
    });

    it("generates different JSON with different baseUrl", () => {
      const json1 = previewWorkflowJSON(mockWorkflow);
      const json2 = previewWorkflowJSON(mockWorkflow, "https://example.com");
      expect(json1).not.toBe(json2);
      expect(json2).toContain("example.com");
    });

    it("respects workflow attributes", () => {
      const customWorkflow = {
        ...mockWorkflow,
        tags: ["tag1", "tag2", "tag3"],
        steps: [
          {
            id: "1",
            title: "Step 1",
            description: "Desc 1",
            executionMode: "local-only" as const,
          },
          {
            id: "2",
            title: "Step 2",
            description: "Desc 2",
            executionMode: "local-only" as const,
          },
          {
            id: "3",
            title: "Step 3",
            description: "Desc 3",
            executionMode: "local-only" as const,
          },
        ],
      };

      const json = previewWorkflowJSON(customWorkflow);
      const parsed = JSON.parse(json);
      expect(parsed.howTo.step).toHaveLength(3);
      expect(parsed.faq.mainEntity.length).toBeGreaterThan(0);
    });
  });

  describe("integration: structured data generation", () => {
    it("generates consistent JSON structure", () => {
      const json = previewWorkflowJSON(mockWorkflow);
      const parsed = JSON.parse(json);

      expect(parsed).toHaveProperty("howTo");
      expect(parsed).toHaveProperty("faq");
    });

    it("handles workflow with multiple steps", () => {
      const multiStepWorkflow: WorkflowPackConfig = {
        ...mockWorkflow,
        steps: [
          {
            id: "1",
            title: "Input Data",
            description: "Provide input",
            executionMode: "local-only",
          },
          {
            id: "2",
            title: "Validate",
            description: "Validate data",
            executionMode: "local-only",
          },
          {
            id: "3",
            title: "Transform",
            description: "Transform data",
            executionMode: "network",
          },
          {
            id: "4",
            title: "Export",
            description: "Export results",
            executionMode: "export-only",
          },
        ],
      };

      const json = previewWorkflowJSON(multiStepWorkflow);
      expect(json).toContain("Transform");
      expect(json).toContain("Validate");

      const parsed = JSON.parse(json);
      expect(parsed.howTo.step).toHaveLength(4);
    });

    it("breadcrumbs helper returns consistent structure", () => {
      const crumbs = useWorkflowBreadcrumbs(mockWorkflow);
      crumbs.forEach((crumb) => {
        expect(crumb).toHaveProperty("name");
        expect(crumb).toHaveProperty("url");
        expect(typeof crumb.name).toBe("string");
        expect(typeof crumb.url).toBe("string");
      });
    });

    it("blog breadcrumbs have correct order", () => {
      const crumbs = useBlogBreadcrumbs("My Post", "my-post");
      expect(crumbs[0].name).toBe("Home");
      expect(crumbs[1].name).toBe("Blog");
      expect(crumbs[2].name).toBe("My Post");
    });
  });
});
