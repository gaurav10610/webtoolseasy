"use client";

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  WorkflowPackConfig,
  WorkflowPreset,
  WorkflowRecipeSharePayload,
  WorkflowRun,
} from "@/types/workflow";
import { trackWorkflowEvent } from "@/lib/workflowTelemetry";
import { workflowSamplePayloads } from "@/data/workflowSamples";

const RUNS_KEY = "wte_workflow_runs";
const PRESETS_KEY = "wte_workflow_presets";
const ACTIVITY_KEY = "wte_workflow_activity";

interface WorkflowActivityItem {
  id: string;
  workflowSlug: string;
  action: string;
  timestamp: string;
  stepId?: string;
}

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

function encodeRecipe(payload: WorkflowRecipeSharePayload) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function decodeRecipe(encoded: string): WorkflowRecipeSharePayload | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json) as WorkflowRecipeSharePayload;
  } catch {
    return null;
  }
}

export function useWorkflowState(workflow: WorkflowPackConfig) {
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [presets, setPresets] = useState<WorkflowPreset[]>([]);
  const [activity, setActivity] = useState<WorkflowActivityItem[]>([]);
  const [projectId, setProjectId] = useState<string>("local-project-default");

  useEffect(() => {
    setRuns(readStorage(RUNS_KEY, []));
    setPresets(readStorage(PRESETS_KEY, []));
    setActivity(readStorage(ACTIVITY_KEY, []));
  }, []);

  const activeRun = useMemo(() => {
    return runs.find((run) => run.workflowSlug === workflow.slug) ?? null;
  }, [runs, workflow.slug]);

  const recentActivity = useMemo(
    () =>
      activity
        .filter((item) => item.workflowSlug === workflow.slug)
        .slice(0, 8),
    [activity, workflow.slug],
  );

  function logActivity(action: string, stepId?: string) {
    const item: WorkflowActivityItem = {
      id: uuidv4(),
      workflowSlug: workflow.slug,
      action,
      stepId,
      timestamp: new Date().toISOString(),
    };

    const next = [item, ...activity].slice(0, 100);
    setActivity(next);
    writeStorage(ACTIVITY_KEY, next);
  }

  function formatExportFileName() {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    return `${workflow.slug}-${projectId}-${stamp}-summary.json`;
  }

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
    logActivity("run_started");
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
    logActivity("step_completed", stepId);
    if (completedStepIds.length === workflow.steps.length) {
      trackWorkflowEvent(
        "workflow_completed",
        workflow.slug,
        undefined,
        projectId,
      );
      logActivity("run_completed");
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
    logActivity("preset_saved");
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
    a.download = formatExportFileName();
    a.click();
    URL.revokeObjectURL(url);
    logActivity("summary_exported");
  }

  function shareRecipe() {
    const payload: WorkflowRecipeSharePayload = {
      workflowSlug: workflow.slug,
      projectId,
      presetName: `${workflow.name} starter`,
      timestamp: new Date().toISOString(),
    };
    const recipe = encodeRecipe(payload);
    const url = `${window.location.origin}/workflows/${workflow.slug}?template=starter&recipe=${encodeURIComponent(recipe)}`;
    navigator.clipboard.writeText(url).catch(() => {
      // Clipboard may be blocked by browser policy.
    });
    trackWorkflowEvent("recipe_shared", workflow.slug, undefined, projectId);
    logActivity("recipe_shared");
  }

  function cloneTemplate(templateName: string) {
    const preset: WorkflowPreset = {
      id: uuidv4(),
      workflowSlug: workflow.slug,
      name: `${workflow.name} ${templateName}`,
      createdAt: new Date().toISOString(),
    };

    const nextPresets = [preset, ...presets];
    setPresets(nextPresets);
    writeStorage(PRESETS_KEY, nextPresets);
    trackWorkflowEvent("template_cloned", workflow.slug, undefined, projectId);
    logActivity("template_cloned");
  }

  function continueLastRun() {
    if (!activeRun) {
      startRun();
      return;
    }

    const updated: WorkflowRun = {
      ...activeRun,
      updatedAt: new Date().toISOString(),
    };
    const nextRuns = [updated, ...runs.filter((run) => run.id !== updated.id)];
    setRuns(nextRuns);
    writeStorage(RUNS_KEY, nextRuns);
    logActivity("run_continued");
  }

  function downloadSampleData() {
    const sample = workflowSamplePayloads[workflow.slug] ?? {
      workflow: workflow.slug,
      note: "No explicit sample found.",
    };

    const blob = new Blob([JSON.stringify(sample, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${workflow.slug}-sample.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    logActivity("sample_downloaded");
  }

  function runFromPreset(presetId: string) {
    const preset = presets.find((item) => item.id === presetId);
    if (!preset) return;

    startRun();
    logActivity("run_from_preset");
  }

  function importRecipeFromUrl(inputUrl?: string) {
    const raw = inputUrl || "";
    if (!raw) return;

    let candidate = raw;
    try {
      const parsed = new URL(raw);
      candidate = parsed.searchParams.get("recipe") || "";
    } catch {
      // Allow direct recipe token paste.
    }

    const payload = decodeRecipe(candidate);
    if (!payload || payload.workflowSlug !== workflow.slug) return;

    setProjectId(payload.projectId);
    savePreset(payload.presetName);
    logActivity("recipe_imported");
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
    cloneTemplate,
    continueLastRun,
    downloadSampleData,
    runFromPreset,
    importRecipeFromUrl,
    recentActivity,
  };
}
