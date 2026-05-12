import { describe, expect, it } from "vitest";
import { _summarizeExperimentConversion } from "@/lib/workflowExperimentation";

describe("Workflow experimentation utilities (TB-081..085)", () => {
  it("summarizes conversion rates by variant", () => {
    const summary = _summarizeExperimentConversion(
      [
        {
          experimentId: "exp-1",
          variant: "control",
          eventName: "start",
          timestamp: "2026-05-12T00:00:00.000Z",
        },
        {
          experimentId: "exp-1",
          variant: "control",
          eventName: "convert",
          timestamp: "2026-05-12T00:01:00.000Z",
        },
        {
          experimentId: "exp-1",
          variant: "workflow_first",
          eventName: "start",
          timestamp: "2026-05-12T00:02:00.000Z",
        },
      ],
      {
        experimentId: "exp-1",
        startEvent: "start",
        conversionEvent: "convert",
      },
    );

    const control = summary.find((row) => row.variant === "control");
    const treatment = summary.find((row) => row.variant === "workflow_first");

    expect(control?.conversionRate).toBe(1);
    expect(treatment?.conversionRate).toBe(0);
  });
});
