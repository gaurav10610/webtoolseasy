import { WorkflowPackConfig } from "@/types/workflow";

export interface TemplateQualityResult {
  score: number;
  reasons: string[];
  isPublishable: boolean;
}

function buildSignature(workflow: WorkflowPackConfig): string {
  const normalizedSteps = workflow.steps
    .map((step) => step.title.trim().toLowerCase())
    .join("|");
  return `${workflow.category}:${normalizedSteps}`;
}

export function evaluateTemplateQuality(
  workflow: WorkflowPackConfig,
  allWorkflows: WorkflowPackConfig[],
): TemplateQualityResult {
  let score = 40;
  const reasons: string[] = [];

  if (workflow.steps.length >= 3) {
    score += 20;
  } else {
    reasons.push("Needs at least 3 steps for strong workflow value.");
  }

  if (workflow.tags.length >= 4) {
    score += 15;
  } else {
    reasons.push("Add richer tags to improve discoverability.");
  }

  if (workflow.outputArtifacts.length >= 1) {
    score += 15;
  } else {
    reasons.push("Missing output artifacts definition.");
  }

  if (workflow.summary.length >= 70) {
    score += 10;
  } else {
    reasons.push("Summary should describe the outcome more clearly.");
  }

  const signature = buildSignature(workflow);
  const duplicates = allWorkflows.filter(
    (entry) =>
      entry.slug !== workflow.slug && buildSignature(entry) === signature,
  );
  if (duplicates.length > 0) {
    score -= 40;
    reasons.push("Potential duplicate template detected by step signature.");
  }

  const boundedScore = Math.max(0, Math.min(100, score));
  return {
    score: boundedScore,
    reasons,
    isPublishable: boundedScore >= 60,
  };
}
