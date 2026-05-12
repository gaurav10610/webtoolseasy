"use client";

import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  WorkflowPackConfig,
  WorkflowPreset,
  WorkflowRun,
} from "@/types/workflow";
import { trackWorkflowEvent } from "@/lib/workflowTelemetry";

const RUNS_KEY = "wte_workflow_runs";
const PRESETS_KEY = "wte_workflow_presets";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return (JSON.parse(localStorage.getItem(key) || "") as T) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write failures.
  }
}

export function useWorkflowState(workflow: WorkflowPackConfig) {
  const [runs, setRuns] = useState<WorkflowRun[]>(() =>
    readStorage(RUNS_KEY, []),
  );
  const [presets, setPresets] = useState<WorkflowPreset[]>(() =>
    readStorage(PRESETS_KEY, []),
  );
  const [projectId, setProjectId] = useState<string>("local-project-default");

  const activeRun = useMemo(() => {
    return runs.find((run) => run.workflowSlug === workflow.slug) ?? null;
  }, [runs, workflow.slug]);

  function startRun() {
    const next: WorkflowRun = {
      id: uuidv4(),
      workflowSlug: workflow.slug,
      completedStepIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextRuns = [
      next,
      ...runs.filter((r) => r.workflowSlug !== workflow.slug),
    ];
    setRuns(nextRuns);
    writeStorage(RUNS_KEY, nextRuns);
    trackWorkflowEvent("workflow_opened", workflow.slug, undefined, projectId);
  }

  function completeStep(stepId: string) {
    const now = new Date().toISOString();
    const fallback = {
      id: uuidv4(),
      workflowSlug: workflow.slug,
      completedStepIds: [],
      createdAt: now,
      updatedAt: now,
    };

    const current = activeRun ?? fallback;
    const completedStepIds = Array.from(
      new Set([...current.completedStepIds, stepId]),
    );
    const updated: WorkflowRun = {
      ...current,
      completedStepIds,
      updatedAt: now,
    };

    const nextRuns = [updated, ...runs.filter((r) => r.id !== updated.id)];
    setRuns(nextRuns);
    writeStorage(RUNS_KEY, nextRuns);

    trackWorkflowEvent("step_completed", workflow.slug, stepId, projectId);
    if (completedStepIds.length === workflow.steps.length) {
      trackWorkflowEvent(
        "workflow_completed",
        workflow.slug,
        undefined,
        projectId,
      );
    }
  }

  function savePreset(name: string) {
    const preset: WorkflowPreset = {
      id: uuidv4(),
      workflowSlug: workflow.slug,
      name,
      createdAt: new Date().toISOString(),
    };

    const nextPresets = [preset, ...presets];
    setPresets(nextPresets);
    writeStorage(PRESETS_KEY, nextPresets);
    trackWorkflowEvent("preset_saved", workflow.slug, undefined, projectId);
  }

  function exportSummary() {
    trackWorkflowEvent("export_generated", workflow.slug, undefined, projectId);

    const payload = {
      workflow: workflow.slug,
      projectId,
      completedSteps: activeRun?.completedStepIds ?? [],
      artifacts: workflow.outputArtifacts,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${workflow.slug}-summary.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function shareRecipe() {
    const url = `${window.location.origin}/workflows/${workflow.slug}?template=starter`;
    navigator.clipboard.writeText(url).catch(() => {
      // Clipboard may be blocked by browser policy.
    });
    trackWorkflowEvent("recipe_shared", workflow.slug, undefined, projectId);
  }

  return {
    activeRun,
    presets: presets.filter((preset) => preset.workflowSlug === workflow.slug),
    projectId,
    setProjectId,
    startRun,
    completeStep,
    savePreset,
    exportSummary,
    shareRecipe,
  };
}
