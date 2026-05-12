import { describe, expect, it } from "vitest";
import {
  _isTerminalWorkflowState,
  _transitionWorkflowState,
} from "@/lib/workflowStateMachine";
import { _createWorkflowError } from "@/lib/workflowErrors";

describe("Workflow runner transitions and error handling (TB-088)", () => {
  it("transitions from idle to running to completed", () => {
    const running = _transitionWorkflowState("idle", { type: "start" });
    const completed = _transitionWorkflowState(running, { type: "complete" });

    expect(running).toBe("running");
    expect(completed).toBe("completed");
    expect(_isTerminalWorkflowState(completed)).toBe(true);
  });

  it("handles failure transition", () => {
    const error = _createWorkflowError({
      code: "transform",
      message: "transform failed",
      stepId: "s1",
    });

    const failed = _transitionWorkflowState("running", {
      type: "step_failed",
      error,
    });

    expect(failed).toBe("failed");
    expect(_isTerminalWorkflowState(failed)).toBe(true);
  });

  it("ignores invalid transitions", () => {
    const next = _transitionWorkflowState("idle", { type: "complete" });
    expect(next).toBe("idle");
  });
});
