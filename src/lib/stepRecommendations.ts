/**
 * Smart Next-Step Recommendation Engine
 *
 * Suggests the most relevant next step based on:
 * - Completed steps in current workflow
 * - Step dependencies and prerequisites
 * - Output compatibility between steps
 * - Workflow packs containing complementary tools
 */

import { WorkflowStepConfig, WorkflowPackConfig } from "@/types/workflow";

/**
 * Represents a recommended next step with reasoning
 */
export interface StepRecommendation {
  step: WorkflowStepConfig;
  reason: string;
  confidence: number; // 0-1, higher = more confident recommendation
  isNextInSequence?: boolean; // True if this is the natural next step
  incompletedDependencies?: string[]; // Steps that should be completed first
}

/**
 * Represents a recommendation across different workflows
 */
export interface CrossWorkflowRecommendation {
  targetWorkflowSlug: string;
  targetWorkflowName: string;
  reason: string;
  confidence: number;
  firstSteps: WorkflowStepConfig[];
}

/**
 * Analyzes step compatibility by examining execution modes
 */
export const analyzeStepCompatibility = (
  fromStep: WorkflowStepConfig,
  toStep: WorkflowStepConfig,
): { compatible: boolean; issues: string[] } => {
  const issues: string[] = [];

  // Check if data flow is allowed
  if (
    fromStep.executionMode === "local-only" &&
    toStep.executionMode === "network"
  ) {
    issues.push(
      `Local-only step "${fromStep.id}" cannot feed data to network step "${toStep.id}"`,
    );
  }

  // Output artifacts must be compatible with next step's input
  // This is a placeholder - actual implementation would check artifact types
  if (
    fromStep.executionMode === "export-only" &&
    toStep.executionMode === "local-only"
  ) {
    // Export-only can't be input to local-only without user intervention
    issues.push(
      `Export-only step "${fromStep.id}" requires manual input to feed into "${toStep.id}"`,
    );
  }

  return {
    compatible: issues.length === 0,
    issues,
  };
};

/**
 * Gets recommended next steps within the current workflow
 */
export const getNextStepsInWorkflow = (
  workflow: WorkflowPackConfig,
  completedStepIds: string[],
  currentStepId?: string,
): StepRecommendation[] => {
  const recommendations: StepRecommendation[] = [];
  const completedSet = new Set(completedStepIds);

  // Find the index of current step or start from beginning
  let startIndex = 0;
  if (currentStepId) {
    startIndex = workflow.steps.findIndex((s) => s.id === currentStepId);
  }

  // Find the first incomplete step from start
  for (let i = startIndex; i < workflow.steps.length; i++) {
    const step = workflow.steps[i];

    // Skip already completed steps
    if (completedSet.has(step.id)) {
      continue;
    }

    // Find any incomplete prerequisites (steps before this one)
    const incompletedDeps: string[] = [];
    for (let j = 0; j < i; j++) {
      const prevStep = workflow.steps[j];
      if (!completedSet.has(prevStep.id)) {
        incompletedDeps.push(prevStep.id);
      }
    }

    const reason = `Next step in ${workflow.name} workflow`;

    recommendations.push({
      step,
      reason,
      confidence: 0.95, // High confidence for the immediate next step
      isNextInSequence: true,
      incompletedDependencies:
        incompletedDeps.length > 0 ? incompletedDeps : undefined,
    });

    // Only return the immediate next step
    break;
  }

  return recommendations;
};

/**
 * Suggests completion of workflow based on step analysis
 */
export const shouldCompleteWorkflow = (
  workflow: WorkflowPackConfig,
  completedStepIds: string[],
): boolean => {
  if (completedStepIds.length === 0) {
    return false;
  }

  // Get all export-only steps
  const exportSteps = workflow.steps.filter(
    (s) => s.executionMode === "export-only",
  );

  // If there are export steps, all must be completed
  if (exportSteps.length > 0) {
    const completedSet = new Set(completedStepIds);
    return exportSteps.every((s) => completedSet.has(s.id));
  }

  // If no export steps exist, just need at least one step completed
  return completedStepIds.length > 0;
};

/**
 * Analyzes output compatibility between workflows
 */
export const findCompatibleWorkflows = (
  currentWorkflow: WorkflowPackConfig,
  completedStepIds: string[],
  allWorkflows: WorkflowPackConfig[],
): CrossWorkflowRecommendation[] => {
  const recommendations: CrossWorkflowRecommendation[] = [];
  const lastCompletedStep = currentWorkflow.steps.find((s) =>
    completedStepIds.includes(s.id),
  );

  if (!lastCompletedStep) {
    return recommendations;
  }

  for (const otherWorkflow of allWorkflows) {
    if (otherWorkflow.id === currentWorkflow.id) {
      continue; // Skip self
    }

    // Check if other workflow starts with a compatible input type
    const firstStep = otherWorkflow.steps[0];

    // Simple heuristic: if both workflows deal with similar data types
    // (e.g., JSON workflows can chain to JSON workflows)
    const sharesCategory = currentWorkflow.category === otherWorkflow.category;
    const sharesTag = currentWorkflow.tags.some((t) =>
      otherWorkflow.tags.includes(t),
    );

    if (sharesCategory || sharesTag) {
      recommendations.push({
        targetWorkflowSlug: otherWorkflow.slug,
        targetWorkflowName: otherWorkflow.name,
        reason: `Next workflow in ${currentWorkflow.category} → ${otherWorkflow.category} chain`,
        confidence: sharesCategory ? 0.75 : 0.5,
        firstSteps: [firstStep],
      });
    }
  }

  // Sort by confidence
  return recommendations.sort((a, b) => b.confidence - a.confidence);
};

/**
 * Generates a completion suggestion message
 */
export const getCompletionSuggestion = (
  workflow: WorkflowPackConfig,
  completedStepIds: string[],
): {
  isComplete: boolean;
  message: string;
  nextSuggestion?: CrossWorkflowRecommendation;
} => {
  const allComplete = shouldCompleteWorkflow(workflow, completedStepIds);

  if (!allComplete) {
    const remaining = workflow.steps.filter(
      (s) => !completedStepIds.includes(s.id),
    ).length;
    return {
      isComplete: false,
      message: `${remaining} step${remaining > 1 ? "s" : ""} remaining in this workflow`,
    };
  }

  return {
    isComplete: true,
    message: `Workflow complete! Your ${workflow.name} is ready to export.`,
  };
};

/**
 * Builds recommendation context for UI display
 */
export const buildRecommendationContext = (
  workflow: WorkflowPackConfig,
  completedStepIds: string[],
  currentStepId?: string,
  allWorkflows?: WorkflowPackConfig[],
): {
  nextSteps: StepRecommendation[];
  crossWorkflowChains: CrossWorkflowRecommendation[];
  completion: ReturnType<typeof getCompletionSuggestion>;
} => {
  const nextSteps = getNextStepsInWorkflow(
    workflow,
    completedStepIds,
    currentStepId,
  );

  const crossWorkflowChains = allWorkflows
    ? findCompatibleWorkflows(workflow, completedStepIds, allWorkflows)
    : [];

  const completion = getCompletionSuggestion(workflow, completedStepIds);

  return {
    nextSteps,
    crossWorkflowChains,
    completion,
  };
};

/**
 * Evaluates if a recommendation is actionable (no blocking dependencies)
 */
export const isRecommendationActionable = (
  rec: StepRecommendation,
): boolean => {
  return (
    !rec.incompletedDependencies || rec.incompletedDependencies.length === 0
  );
};

/**
 * Sorts recommendations by actionability and confidence
 */
export const prioritizeRecommendations = (
  recommendations: StepRecommendation[],
): StepRecommendation[] => {
  return [...recommendations].sort((a, b) => {
    // Actionable recommendations first
    const aActionable = isRecommendationActionable(a);
    const bActionable = isRecommendationActionable(b);

    if (aActionable !== bActionable) {
      return aActionable ? -1 : 1;
    }

    // Then by confidence
    return b.confidence - a.confidence;
  });
};
