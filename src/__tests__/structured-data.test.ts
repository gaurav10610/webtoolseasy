import { describe, it, expect } from "vitest";
import {
  generateFAQSchema,
  generateHowToSchema,
  generateWorkflowHowToSchema,
  generateWorkflowFAQSchema,
  generateWorkflowStructuredData,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  toJSONLDScript,
  validateSchema,
  mergeStructuredData,
  generateStepFAQ,
} from "@/lib/structuredData";
import { WorkflowPackConfig } from "@/types/workflow";

describe("Structured Data Generation", () => {
  const mockWorkflow: WorkflowPackConfig = {
    id: "test-workflow",
    slug: "test-workflow",
    name: "Test Workflow",
    summary: "A test workflow for processing data",
    category: "developer",
    tags: ["test", "json"],
    steps: [
      {
        id: "step1",
        title: "Input",
        description: "Provide input data",
        executionMode: "local-only",
      },
      {
        id: "step2",
        title: "Process",
        description: "Process the data",
        executionMode: "local-only",
      },
    ],
    outputArtifacts: ["output.json"],
  };

  describe("generateFAQSchema", () => {
    it("generates valid FAQ schema", () => {
      const faqItems = [
        { question: "What is this?", answer: "It's a test" },
        { question: "How does it work?", answer: "It processes data" },
      ];

      const schema = generateFAQSchema(faqItems);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("FAQPage");
      expect(schema.mainEntity).toHaveLength(2);
      expect(schema.mainEntity[0]["@type"]).toBe("Question");
      expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    });

    it("preserves question and answer text", () => {
      const faqItems = [{ question: "Q1", answer: "A1" }];

      const schema = generateFAQSchema(faqItems);

      expect(schema.mainEntity[0].name).toBe("Q1");
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe("A1");
    });
  });

  describe("generateHowToSchema", () => {
    it("generates valid HowTo schema", () => {
      const steps = [
        { name: "Step 1", description: "Do this" },
        { name: "Step 2", description: "Do that" },
      ];

      const schema = generateHowToSchema("My Guide", steps);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("HowTo");
      expect(schema.name).toBe("My Guide");
      expect(schema.step).toHaveLength(2);
      expect(schema.step[0].position).toBe(1);
      expect(schema.step[1].position).toBe(2);
    });

    it("includes optional fields when provided", () => {
      const steps = [{ name: "Step", description: "Do it" }];

      const schema = generateHowToSchema("Guide", steps, {
        description: "A guide",
        time: "PT30M",
        difficulty: "Easy",
      });

      expect(schema.description).toBe("A guide");
      expect(schema.estimatedTime).toBe("PT30M");
      expect(schema.difficulty).toBe("Easy");
    });

    it("omits optional fields when not provided", () => {
      const steps = [{ name: "Step", description: "Do it" }];
      const schema = generateHowToSchema("Guide", steps);

      expect(schema.difficulty).toBeUndefined();
    });
  });

  describe("generateWorkflowHowToSchema", () => {
    it("generates HowTo from workflow config", () => {
      const schema = generateWorkflowHowToSchema(mockWorkflow);

      expect(schema["@type"]).toBe("HowTo");
      expect(schema.name).toBe("Test Workflow");
      expect(schema.description).toBe("A test workflow for processing data");
      expect(schema.step).toHaveLength(2);
      expect(schema.step[0].name).toBe("Input");
      expect(schema.step[1].name).toBe("Process");
    });

    it("calculates difficulty based on step count", () => {
      const schema = generateWorkflowHowToSchema(mockWorkflow);
      expect(schema.difficulty).toBe("Easy"); // 2 steps = Easy
    });

    it("estimates time based on steps", () => {
      const schema = generateWorkflowHowToSchema(mockWorkflow);
      expect(schema.estimatedTime).toBe("PT4M"); // 2 steps * 2 min
    });

    it("includes URLs when baseUrl provided", () => {
      const schema = generateWorkflowHowToSchema(
        mockWorkflow,
        "https://example.com/workflows/test",
      );
      expect(schema.step[0].url).toContain("example.com");
    });
  });

  describe("generateWorkflowFAQSchema", () => {
    it("generates FAQ from workflow config", () => {
      const schema = generateWorkflowFAQSchema(mockWorkflow);

      expect(schema["@type"]).toBe("FAQPage");
      expect(schema.mainEntity.length).toBeGreaterThan(0);
    });

    it("includes question about workflow purpose", () => {
      const schema = generateWorkflowFAQSchema(mockWorkflow);
      const purposes = schema.mainEntity.filter((e: any) =>
        e.name.includes("What is Test Workflow"),
      );
      expect(purposes.length).toBeGreaterThan(0);
    });

    it("includes question about privacy", () => {
      const schema = generateWorkflowFAQSchema(mockWorkflow);
      const privacyQs = schema.mainEntity.filter((e: any) =>
        e.name.toLowerCase().includes("private"),
      );
      expect(privacyQs.length).toBeGreaterThan(0);
    });

    it("mentions step count", () => {
      const schema = generateWorkflowFAQSchema(mockWorkflow);
      const stepQs = schema.mainEntity.filter((e: any) =>
        e.name.includes("steps"),
      );
      expect(stepQs.length).toBeGreaterThan(0);
      expect(stepQs[0].acceptedAnswer.text).toContain("2 steps");
    });
  });

  describe("generateWorkflowStructuredData", () => {
    it("generates combined structured data", () => {
      const data = generateWorkflowStructuredData(mockWorkflow);

      expect(data.howTo).toBeDefined();
      expect(data.faq).toBeDefined();
      expect(data.howTo["@type"]).toBe("HowTo");
      expect(data.faq["@type"]).toBe("FAQPage");
    });
  });

  describe("generateArticleSchema", () => {
    it("generates valid article schema", () => {
      const schema = generateArticleSchema(
        "My Article",
        "Article content here",
      );

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Article");
      expect(schema.headline).toBe("My Article");
      expect(schema.articleBody).toBe("Article content here");
    });

    it("includes optional fields", () => {
      const schema = generateArticleSchema("Article", "Content", {
        description: "Article description",
        author: "John Doe",
        keywords: ["key1", "key2"],
      });

      expect(schema.description).toBe("Article description");
      expect(schema.author.name).toBe("John Doe");
      expect(schema.keywords).toBe("key1, key2");
    });
  });

  describe("generateBreadcrumbSchema", () => {
    it("generates valid breadcrumb schema", () => {
      const items = [
        { name: "Home", url: "https://example.com" },
        { name: "Tools", url: "https://example.com/tools" },
        { name: "JSON Tool", url: "https://example.com/tools/json" },
      ];

      const schema = generateBreadcrumbSchema(items);

      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[1].position).toBe(2);
    });
  });

  describe("generateOrganizationSchema", () => {
    it("generates organization schema with defaults", () => {
      const schema = generateOrganizationSchema();

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Organization");
      expect(schema.name).toBe("WebToolsEasy");
    });

    it("uses provided organization details", () => {
      const schema = generateOrganizationSchema({
        name: "My Company",
        url: "https://mycompany.com",
        description: "We build tools",
      });

      expect(schema.name).toBe("My Company");
      expect(schema.url).toBe("https://mycompany.com");
      expect(schema.description).toBe("We build tools");
    });
  });

  describe("toJSONLDScript", () => {
    it("converts schema to JSON-LD string", () => {
      const schema = { "@type": "Test", name: "Test" };
      const jsonld = toJSONLDScript(schema);

      expect(typeof jsonld).toBe("string");
      expect(jsonld).toContain("@type");
      expect(jsonld).toContain("Test");
    });

    it("formats with indentation", () => {
      const schema = { a: { b: "value" } };
      const jsonld = toJSONLDScript(schema);

      expect(jsonld.includes("  ")).toBe(true); // Has indentation
    });
  });

  describe("validateSchema", () => {
    it("validates FAQ schema with required fields", () => {
      const schema = generateFAQSchema([{ question: "Q", answer: "A" }]);

      const isValid = validateSchema(schema, ["name"]);
      expect(isValid).toBe(true);
    });

    it("fails validation with missing fields", () => {
      const schema = {
        mainEntity: [
          { "@type": "Question" }, // Missing name
        ],
      };

      const isValid = validateSchema(schema, ["name"]);
      expect(isValid).toBe(false);
    });
  });

  describe("mergeStructuredData", () => {
    it("merges multiple schemas into @graph", () => {
      const schema1 = { "@type": "Article" };
      const schema2 = { "@type": "Organization" };

      const merged = mergeStructuredData(schema1, schema2);

      expect(merged["@context"]).toBe("https://schema.org");
      expect(merged["@graph"]).toHaveLength(2);
    });

    it("filters out empty schemas", () => {
      const schema1 = { "@type": "Article" };
      const schema2 = {};

      const merged = mergeStructuredData(schema1, schema2);

      expect(merged["@graph"]).toHaveLength(1);
    });
  });

  describe("generateStepFAQ", () => {
    it("generates FAQ for a single step", () => {
      const step = mockWorkflow.steps[0];
      const faq = generateStepFAQ(step);

      expect(faq).toHaveLength(2);
      expect(faq[0].question).toContain("Input");
      expect(faq[0].answer).toBe("Provide input data");
    });

    it("includes privacy information", () => {
      const step = mockWorkflow.steps[0];
      const faq = generateStepFAQ(step);

      const privacyFaq = faq.find((f) => f.question.includes("locally"));
      expect(privacyFaq).toBeDefined();
      expect(privacyFaq?.answer).toContain("local");
    });
  });

  describe("integration: complete page structure", () => {
    it("generates complete workflow page structured data", () => {
      const data = generateWorkflowStructuredData(
        mockWorkflow,
        "https://example.com/workflows/test",
      );

      expect(data.howTo["@type"]).toBe("HowTo");
      expect(data.faq["@type"]).toBe("FAQPage");

      const howToJSON = toJSONLDScript(data.howTo);
      expect(howToJSON).toContain("Test Workflow");

      const faqJSON = toJSONLDScript(data.faq);
      expect(faqJSON).toContain("FAQPage");
    });
  });
});
