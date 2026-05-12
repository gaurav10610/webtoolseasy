export interface WorkflowCompletionEvent {
  workflowSlug: string;
  completedAt: string;
  enteredAt?: string;
  stepsTotal?: number;
  stepsCompleted?: number;
}

export function _computeWeeklyCompletedWorkflows(
  events: WorkflowCompletionEvent[],
  now: Date = new Date(),
): number {
  const oneWeekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  return events.filter((event) => {
    const time = new Date(event.completedAt).getTime();
    return Number.isFinite(time) && time >= oneWeekAgo;
  }).length;
}

export function _computeFunnelMetrics(input: {
  entryCount: number;
  workflowStarts: number;
  completions: number;
  byStep: Array<{ stepId: string; entered: number; completed: number }>;
}) {
  const dropOffRate =
    input.workflowStarts > 0
      ? (input.workflowStarts - input.completions) / input.workflowStarts
      : 0;

  const stepDropOff = input.byStep.map((step) => ({
    stepId: step.stepId,
    dropOffRate:
      step.entered > 0 ? (step.entered - step.completed) / step.entered : 0,
  }));

  return {
    entryCount: input.entryCount,
    workflowStarts: input.workflowStarts,
    completions: input.completions,
    completionRate:
      input.workflowStarts > 0 ? input.completions / input.workflowStarts : 0,
    dropOffRate,
    stepDropOff,
  };
}
