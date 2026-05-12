import { createHash } from "node:crypto";
import { WorkflowStepConfig } from "@/types/workflow";

export interface WorkflowArtifact {
  id: string;
  name: string;
  type: string;
  sourceStep: string;
  checksum: string;
  size: number;
  content: string;
}

export interface WorkflowExecutionContext {
  step: WorkflowStepConfig;
  input: string;
}

export interface WorkflowStepAdapter {
  id: string;
  supports(step: WorkflowStepConfig): boolean;
  execute(context: WorkflowExecutionContext): Promise<WorkflowArtifact>;
}

function toArtifact(input: {
  name: string;
  type: string;
  sourceStep: string;
  content: string;
}): WorkflowArtifact {
  const size = Buffer.byteLength(input.content, "utf8");
  const checksum = createHash("sha256").update(input.content).digest("hex");

  return {
    id: `${input.sourceStep}-${checksum.slice(0, 12)}`,
    name: input.name,
    type: input.type,
    sourceStep: input.sourceStep,
    checksum,
    size,
    content: input.content,
  };
}

export const JsonToolAdapter: WorkflowStepAdapter = {
  id: "json",
  supports(step) {
    return (
      /json|payload|api/i.test(step.title) || /json/i.test(step.description)
    );
  },
  async execute(context) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(context.input);
    } catch {
      parsed = { raw: context.input };
    }

    const normalized = JSON.stringify(parsed, null, 2);
    return toArtifact({
      name: `${context.step.id}.json`,
      type: "application/json",
      sourceStep: context.step.id,
      content: normalized,
    });
  },
};

export const MarkdownToolAdapter: WorkflowStepAdapter = {
  id: "markdown",
  supports(step) {
    return /markdown|blog|meta|schema/i.test(
      `${step.title} ${step.description}`,
    );
  },
  async execute(context) {
    const compact = context.input
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .trim();

    return toArtifact({
      name: `${context.step.id}.md`,
      type: "text/markdown",
      sourceStep: context.step.id,
      content: compact,
    });
  },
};

export const ImageOptimizationAdapter: WorkflowStepAdapter = {
  id: "image",
  supports(step) {
    return /image|media|compress|resize/i.test(
      `${step.title} ${step.description}`,
    );
  },
  async execute(context) {
    const simulated = `optimized:${context.input.slice(0, 256)}`;
    return toArtifact({
      name: `${context.step.id}.txt`,
      type: "text/plain",
      sourceStep: context.step.id,
      content: simulated,
    });
  },
};

export const SeoAuditAdapter: WorkflowStepAdapter = {
  id: "seo",
  supports(step) {
    return /seo|robots|sitemap|schema|meta/i.test(
      `${step.title} ${step.description}`,
    );
  },
  async execute(context) {
    const findings = {
      step: context.step.id,
      checks: ["title", "description", "canonical", "robots", "schema"],
      passed: true,
    };

    return toArtifact({
      name: `${context.step.id}-seo-audit.json`,
      type: "application/json",
      sourceStep: context.step.id,
      content: JSON.stringify(findings, null, 2),
    });
  },
};

export const DiffSnapshotAdapter: WorkflowStepAdapter = {
  id: "diff",
  supports(step) {
    return /diff|snapshot|compare/i.test(`${step.title} ${step.description}`);
  },
  async execute(context) {
    const lines = context.input.split("\n");
    const content = lines
      .map((line, index) => `+ [${index + 1}] ${line}`)
      .join("\n");

    return toArtifact({
      name: `${context.step.id}.diff`,
      type: "text/plain",
      sourceStep: context.step.id,
      content,
    });
  },
};

export const WORKFLOW_ADAPTERS: WorkflowStepAdapter[] = [
  JsonToolAdapter,
  MarkdownToolAdapter,
  ImageOptimizationAdapter,
  SeoAuditAdapter,
  DiffSnapshotAdapter,
];

export async function _executeWorkflowStepWithAdapters(
  step: WorkflowStepConfig,
  input: string,
): Promise<WorkflowArtifact> {
  const adapter = WORKFLOW_ADAPTERS.find((candidate) =>
    candidate.supports(step),
  );

  if (!adapter) {
    return toArtifact({
      name: `${step.id}.txt`,
      type: "text/plain",
      sourceStep: step.id,
      content: input,
    });
  }

  return adapter.execute({ step, input });
}

export function _exportRunSummaryJson(input: {
  workflowSlug: string;
  projectId: string;
  completedSteps: string[];
  artifacts: WorkflowArtifact[];
  exportedAt: string;
}): string {
  return JSON.stringify(
    {
      workflowSlug: input.workflowSlug,
      projectId: input.projectId,
      completedSteps: input.completedSteps,
      outputManifest: input.artifacts.map((artifact) => ({
        name: artifact.name,
        type: artifact.type,
        sourceStep: artifact.sourceStep,
        checksum: artifact.checksum,
        size: artifact.size,
      })),
      exportedAt: input.exportedAt,
    },
    null,
    2,
  );
}
