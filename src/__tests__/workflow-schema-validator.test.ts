import { describe, expect, it } from "vitest";
import { workflowPacks } from "@/data/workflows";
import {
  _validateWorkflowPackCollection,
  _validateWorkflowPackConfig,
} from "@/lib/workflowSchemaValidator";

describe("Workflow config validation and lint utility (TB-003/TB-004)", () => {
  it("validates current workflow pack collection", () => {
    const result = _validateWorkflowPackCollection(workflowPacks);
    expect(result.valid).toBe(true);
  });

  it("detects malformed workflow pack", () => {
    const badPack = {
      ...workflowPacks[0],
      slug: "",
      steps: [{ ...workflowPacks[0].steps[0], id: "" }],
      outputArtifacts: [],
    };

    const result = _validateWorkflowPackConfig(badPack);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});
