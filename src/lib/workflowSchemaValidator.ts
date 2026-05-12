import { WorkflowPackConfig } from "@/types/workflow";

export interface WorkflowConfigValidationResult {
  valid: boolean;
  errors: string[];
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function _validateWorkflowPackConfig(
  pack: WorkflowPackConfig,
): WorkflowConfigValidationResult {
  const errors: string[] = [];

  if (!isNonEmptyString(pack.id)) errors.push("pack.id is required");
  if (!isNonEmptyString(pack.slug)) errors.push("pack.slug is required");
  if (!isNonEmptyString(pack.name)) errors.push("pack.name is required");
  if (!isNonEmptyString(pack.summary)) errors.push("pack.summary is required");

  if (!Array.isArray(pack.tags) || pack.tags.length === 0) {
    errors.push(`pack ${pack.slug || pack.id} must include at least one tag`);
  }

  if (!Array.isArray(pack.steps) || pack.steps.length === 0) {
    errors.push(`pack ${pack.slug || pack.id} must include at least one step`);
  }

  const stepIds = new Set<string>();
  for (const step of pack.steps || []) {
    if (!isNonEmptyString(step.id)) {
      errors.push(`pack ${pack.slug} has step with missing id`);
      continue;
    }

    if (stepIds.has(step.id)) {
      errors.push(`pack ${pack.slug} has duplicate step id ${step.id}`);
    }
    stepIds.add(step.id);

    if (!isNonEmptyString(step.title)) {
      errors.push(`pack ${pack.slug} step ${step.id} missing title`);
    }
    if (!isNonEmptyString(step.description)) {
      errors.push(`pack ${pack.slug} step ${step.id} missing description`);
    }
  }

  const outputArtifacts = Array.isArray(pack.outputArtifacts)
    ? pack.outputArtifacts
    : [];
  if (outputArtifacts.length === 0) {
    errors.push(`pack ${pack.slug || pack.id} must declare outputArtifacts`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function _validateWorkflowPackCollection(
  packs: WorkflowPackConfig[],
): WorkflowConfigValidationResult {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const pack of packs) {
    const result = _validateWorkflowPackConfig(pack);
    errors.push(...result.errors);

    if (ids.has(pack.id)) {
      errors.push(`duplicate workflow id ${pack.id}`);
    }
    ids.add(pack.id);

    if (slugs.has(pack.slug)) {
      errors.push(`duplicate workflow slug ${pack.slug}`);
    }
    slugs.add(pack.slug);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
