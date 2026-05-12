import { describe, expect, it } from "vitest";
import {
  _computeFunnelMetrics,
  _computeWeeklyCompletedWorkflows,
} from "@/lib/workflowMetricsService";

describe("Workflow metrics service (TB-078/TB-079)", () => {
  it("computes WCW over trailing week", () => {
    const now = new Date("2026-05-12T00:00:00.000Z");
    const count = _computeWeeklyCompletedWorkflows(
      [
        { workflowSlug: "a", completedAt: "2026-05-10T00:00:00.000Z" },
        { workflowSlug: "b", completedAt: "2026-05-08T00:00:00.000Z" },
        { workflowSlug: "c", completedAt: "2026-04-20T00:00:00.000Z" },
      ],
      now,
    );

    expect(count).toBe(2);
  });

  it("computes funnel completion and drop-off", () => {
    const result = _computeFunnelMetrics({
      entryCount: 100,
      workflowStarts: 80,
      completions: 44,
      byStep: [
        { stepId: "s1", entered: 80, completed: 70 },
        { stepId: "s2", entered: 70, completed: 44 },
      ],
    });

    expect(result.completionRate).toBeCloseTo(0.55, 3);
    expect(result.dropOffRate).toBeCloseTo(0.45, 3);
    expect(result.stepDropOff).toHaveLength(2);
  });
});
