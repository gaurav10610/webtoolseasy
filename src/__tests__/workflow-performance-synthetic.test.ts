import { describe, expect, it } from "vitest";
import { _executeWorkflowStepWithAdapters } from "@/lib/workflowAdapters";
import { workflowPacks } from "@/data/workflows";

describe("Workflow synthetic performance tests (TB-093)", () => {
  it("processes moderate payload under synthetic threshold", async () => {
    const step = workflowPacks[0].steps[0];
    const payload = JSON.stringify({
      rows: Array.from({ length: 2000 }, (_, index) => ({
        id: index,
        value: `item-${index}`,
      })),
    });

    const start = Date.now();
    const artifact = await _executeWorkflowStepWithAdapters(step, payload);
    const elapsedMs = Date.now() - start;

    expect(artifact.size).toBeGreaterThan(100);
    expect(elapsedMs).toBeLessThan(2000);
  });
});
