import { WorkflowError } from "@/lib/workflowErrors";

export type WorkflowRunState =
  | "idle"
  | "running"
  | "blocked"
  | "completed"
  | "failed"
  | "cancelled";

export type WorkflowRunEvent =
  | { type: "start" }
  | { type: "step_failed"; error: WorkflowError }
  | { type: "step_blocked" }
  | { type: "resume" }
  | { type: "complete" }
  | { type: "cancel" }
  | { type: "reset" };

const transitions: Record<WorkflowRunState, WorkflowRunEvent["type"][]> = {
  idle: ["start"],
  running: ["step_failed", "step_blocked", "complete", "cancel"],
  blocked: ["resume", "cancel"],
  completed: ["reset"],
  failed: ["reset", "start"],
  cancelled: ["reset", "start"],
};

export function _transitionWorkflowState(
  current: WorkflowRunState,
  event: WorkflowRunEvent,
): WorkflowRunState {
  if (!transitions[current].includes(event.type)) {
    return current;
  }

  switch (event.type) {
    case "start":
      return "running";
    case "step_blocked":
      return "blocked";
    case "resume":
      return "running";
    case "step_failed":
      return "failed";
    case "complete":
      return "completed";
    case "cancel":
      return "cancelled";
    case "reset":
      return "idle";
    default:
      return current;
  }
}

export function _isTerminalWorkflowState(state: WorkflowRunState): boolean {
  return state === "completed" || state === "failed" || state === "cancelled";
}
