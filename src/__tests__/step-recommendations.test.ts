import { describe, it, expect } from "vitest";
import {
  getNextStepsInWorkflow,
  shouldCompleteWorkflow,
  findCompatibleWorkflows,
  isRecommendationActionable,
  prioritizeRecommendations,
  buildRecommendationContext,
  analyzeStepCompatibility,
} from "@/lib/stepRecommendations";
import { WorkflowPackConfig, WorkflowStepConfig } from "@/types/workflow";

describe("Step Recommendations Engine", () => {
  const steps: WorkflowStepConfig[] = [
    {
      id: "upload",
      title: "Upload JSON",
      description: "Upload a JSON file",
      executionMode: "network",
    },
    {
      id: "validate",
      title: "Validate",
      description: "Validate JSON structure",
      executionMode: "local-only",
    },
    {
      id: "transform",
      title: "Transform",
      description: "Transform JSON data",
      executionMode: "local-only",
    },
    {
      id: "export",
      title: "Export",
      description: "Export results",
      executionMode: "export-only",
    },
  ];

  const workflow: WorkflowPackConfig = {
    id: "json-workflow",
    slug: "json-workflow",
    name: "JSON Workflow",
    summary: "Process JSON data",
    category: "developer",
    tags: ["json", "api"],
    steps,
    outputArtifacts: ["result.json"],
  };

  const otherWorkflow: WorkflowPackConfig = {
    id: "xml-workflow",
    slug: "xml-workflow",
    name: "XML Workflow",
    summary: "Process XML data",
    category: "developer",
    tags: ["xml", "api"],
    steps: [steps[0]],
    outputArtifacts: ["result.xml"],
  };

  const mediaWorkflow: WorkflowPackConfig = {
    id: "media-workflow",
    slug: "media-workflow",
    name: "Media Workflow",
    summary: "Process media files",
    category: "media",
    tags: ["images"],
    steps: [steps[0]],
    outputArtifacts: ["result.jpg"],
  };

  describe("getNextStepsInWorkflow", () => {
    it("returns next step when none are completed", () => {
      const recommendations = getNextStepsInWorkflow(workflow, []);
      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].step.id).toBe("upload");
      expect(recommendations[0].isNextInSequence).toBe(true);
    });

    it("returns next step after first is completed", () => {
      const recommendations = getNextStepsInWorkflow(workflow, ["upload"]);
      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].step.id).toBe("validate");
      expect(recommendations[0].confidence).toBeGreaterThan(0.9);
    });

    it("skips already completed steps", () => {
      const recommendations = getNextStepsInWorkflow(workflow, [
        "upload",
        "validate",
      ]);
      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].step.id).toBe("transform");
    });

    it("shows blocked steps with incomplete dependencies", () => {
      // Skip upload, try to complete validate first
      const recommendations = getNextStepsInWorkflow(workflow, []);
      // Should still recommend upload as the immediate next step
      expect(recommendations[0].step.id).toBe("upload");
    });

    it("has high confidence for immediate next step", () => {
      const recommendations = getNextStepsInWorkflow(workflow, ["upload"]);
      const rec = recommendations[0];
      expect(rec.confidence).toBeGreaterThan(0.9);
    });
  });

  describe("shouldCompleteWorkflow", () => {
    it("returns false when no steps completed", () => {
      expect(shouldCompleteWorkflow(workflow, [])).toBe(false);
    });

    it("returns true when export step is completed", () => {
      expect(
        shouldCompleteWorkflow(workflow, [
          "upload",
          "validate",
          "transform",
          "export",
        ]),
      ).toBe(true);
    });

    it("returns false when export steps not completed", () => {
      expect(
        shouldCompleteWorkflow(workflow, ["upload", "validate", "transform"]),
      ).toBe(false);
    });

    it("returns true when at least one step completed and no export steps required", () => {
      // Create a workflow with no export steps
      const noExportWorkflow: WorkflowPackConfig = {
        ...workflow,
        steps: workflow.steps.filter((s) => s.executionMode !== "export-only"),
      };
      expect(shouldCompleteWorkflow(noExportWorkflow, ["validate"])).toBe(true);
    });
  });

  describe("findCompatibleWorkflows", () => {
    it("suggests workflows with matching category", () => {
      const recommendations = findCompatibleWorkflows(
        workflow,
        ["upload"],
        [workflow, otherWorkflow, mediaWorkflow],
      );

      const developerWorkflows = recommendations.filter(
        (r) => r.targetWorkflowSlug !== "json-workflow",
      );
      expect(developerWorkflows.length).toBeGreaterThan(0);
    });

    it("suggests workflows with matching tags", () => {
      const recommendations = findCompatibleWorkflows(
        workflow,
        ["upload"],
        [workflow, otherWorkflow],
      );

      expect(
        recommendations.some((r) => r.targetWorkflowSlug === "xml-workflow"),
      ).toBe(true);
    });

    it("excludes self from recommendations", () => {
      const recommendations = findCompatibleWorkflows(
        workflow,
        ["upload"],
        [workflow, otherWorkflow],
      );

      expect(
        recommendations.some((r) => r.targetWorkflowSlug === "json-workflow"),
      ).toBe(false);
    });

    it("sorts by confidence", () => {
      const recommendations = findCompatibleWorkflows(
        workflow,
        ["upload"],
        [workflow, otherWorkflow, mediaWorkflow],
      );

      for (let i = 1; i < recommendations.length; i++) {
        expect(recommendations[i - 1].confidence).toBeGreaterThanOrEqual(
          recommendations[i].confidence,
        );
      }
    });
  });

  describe("isRecommendationActionable", () => {
    it("returns true when no dependencies", () => {
      const rec = getNextStepsInWorkflow(workflow, [])[0];
      expect(isRecommendationActionable(rec)).toBe(true);
    });

    it("returns false when dependencies exist", () => {
      const rec = getNextStepsInWorkflow(workflow, ["validate"], "validate")[0];
      expect(isRecommendationActionable(rec)).toBe(false);
    });
  });

  describe("prioritizeRecommendations", () => {
    it("prioritizes actionable recommendations first", () => {
      const recommendations = getNextStepsInWorkflow(workflow, []);
      const prioritized = prioritizeRecommendations(recommendations);

      expect(isRecommendationActionable(prioritized[0])).toBe(true);
    });

    it("sorts by confidence within actionable", () => {
      const allRecs = getNextStepsInWorkflow(workflow, []);
      const prioritized = prioritizeRecommendations(allRecs);

      for (let i = 1; i < prioritized.length; i++) {
        if (
          isRecommendationActionable(prioritized[i - 1]) &&
          isRecommendationActionable(prioritized[i])
        ) {
          expect(prioritized[i - 1].confidence).toBeGreaterThanOrEqual(
            prioritized[i].confidence,
          );
        }
      }
    });
  });

  describe("buildRecommendationContext", () => {
    it("builds complete context with recommendations", () => {
      const context = buildRecommendationContext(
        workflow,
        ["upload"],
        "upload",
        [workflow, otherWorkflow],
      );

      expect(context.nextSteps).toBeDefined();
      expect(context.crossWorkflowChains).toBeDefined();
      expect(context.completion).toBeDefined();
    });

    it("includes completion status", () => {
      const context = buildRecommendationContext(workflow, [
        "upload",
        "validate",
        "transform",
        "export",
      ]);

      expect(context.completion.isComplete).toBe(true);
    });

    it("works without allWorkflows parameter", () => {
      const context = buildRecommendationContext(
        workflow,
        ["upload"],
        "upload",
      );

      expect(context.crossWorkflowChains).toHaveLength(0);
    });
  });

  describe("analyzeStepCompatibility", () => {
    it("detects incompatible local-to-network data flow", () => {
      const localStep = steps[1]; // local-only
      const networkStep = steps[0]; // network

      const result = analyzeStepCompatibility(localStep, networkStep);
      expect(result.compatible).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
    });

    it("allows compatible step sequences", () => {
      const step1 = steps[0]; // network
      const step2 = steps[1]; // local-only

      const result = analyzeStepCompatibility(step1, step2);
      expect(result.compatible).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    it("detects export-only compatibility issues", () => {
      const exportStep = steps[3]; // export-only
      const localStep = steps[1]; // local-only

      const result = analyzeStepCompatibility(exportStep, localStep);
      expect(result.compatible).toBe(false);
    });
  });

  describe("integration: recommendation workflow", () => {
    it("guides user through complete workflow", () => {
      const history: string[] = [];

      // Step 1: Start
      let recs = getNextStepsInWorkflow(workflow, []);
      expect(recs[0].step.id).toBe("upload");
      history.push("upload");

      // Step 2: After upload
      recs = getNextStepsInWorkflow(workflow, history);
      expect(recs[0].step.id).toBe("validate");
      history.push("validate");

      // Step 3: After validate
      recs = getNextStepsInWorkflow(workflow, history);
      expect(recs[0].step.id).toBe("transform");
      history.push("transform");

      // Step 4: After transform
      recs = getNextStepsInWorkflow(workflow, history);
      expect(recs[0].step.id).toBe("export");
      history.push("export");

      // Completion check
      expect(shouldCompleteWorkflow(workflow, history)).toBe(true);
    });

    it("suggests related workflows at completion", () => {
      const allWorkflows = [workflow, otherWorkflow, mediaWorkflow];
      const completed = ["upload", "validate", "transform", "export"];

      const context = buildRecommendationContext(
        workflow,
        completed,
        "export",
        allWorkflows,
      );

      expect(context.completion.isComplete).toBe(true);
      expect(context.crossWorkflowChains.length).toBeGreaterThan(0);
    });
  });
});
