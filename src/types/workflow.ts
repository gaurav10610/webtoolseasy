export type WorkflowStepExecutionMode =
  | "local-only"
  | "network"
  | "export-only";

export interface WorkflowStepConfig {
  id: string;
  title: string;
  description: string;
  executionMode: WorkflowStepExecutionMode;
}

export interface WorkflowPackConfig {
  id: string;
  slug: string;
  name: string;
  summary: string;
  category: "developer" | "content" | "seo" | "document" | "media";
  tags: string[];
  steps: WorkflowStepConfig[];
  outputArtifacts: string[];
}

export interface WorkflowPreset {
  id: string;
  workflowSlug: string;
  name: string;
  createdAt: string;
}

export interface WorkflowRun {
  id: string;
  workflowSlug: string;
  completedStepIds: string[];
  createdAt: string;
  updatedAt: string;
}

export type WorkflowTelemetryEventName =
  | "workflow_opened"
  | "step_completed"
  | "workflow_completed"
  | "export_generated"
  | "preset_saved"
  | "recipe_shared"
  | "template_cloned";

export interface WorkflowTelemetryEvent {
  name: WorkflowTelemetryEventName;
  workflowSlug: string;
  stepId?: string;
  projectId?: string;
  timestamp: string;
}
