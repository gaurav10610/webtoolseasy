"use client";

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  WorkflowPackConfig,
  WorkflowProject,
  WorkflowPreset,
  WorkflowRecipeSharePayload,
  WorkflowRun,
} from "@/types/workflow";
import { trackWorkflowEvent } from "@/lib/workflowTelemetry";
import { workflowSamplePayloads } from "@/data/workflowSamples";
import {
  _decodeRecipeSchema,
  _encodeRecipeSchema,
  _serializeRecipe,
  _validateRecipeSchema,
} from "@/lib/recipeSchema";
import {
  _executeWorkflowStepWithAdapters,
  _exportRunSummaryJson,
  WorkflowArtifact,
} from "@/lib/workflowAdapters";
import {
  _migrateStorageEnvelope,
  _parseStorageEnvelope,
  WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION,
} from "@/lib/localStorageMigration";

const RUNS_KEY = "wte_workflow_runs";
const PRESETS_KEY = "wte_workflow_presets";
const ACTIVITY_KEY = "wte_workflow_activity";
const PROJECTS_KEY = "wte_workflow_projects";
const ARTIFACTS_KEY = "wte_workflow_artifacts";

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
    const envelope = _migrateStorageEnvelope(
      _parseStorageEnvelope(localStorage.getItem(key)),
    );
    localStorage.setItem(key, JSON.stringify(envelope));
    if (Array.isArray(fallback) && !Array.isArray(envelope.data)) {
      return fallback;
    }
    return (envelope.data as T) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        version: WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION,
        data: value,
      }),
    );
  } catch {
    // Ignore storage write failures.
  }
}

export function useWorkflowState(workflow: WorkflowPackConfig) {
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [presets, setPresets] = useState<WorkflowPreset[]>([]);
  const [activity, setActivity] = useState<WorkflowActivityItem[]>([]);
  const [projects, setProjects] = useState<WorkflowProject[]>([]);
  const [artifacts, setArtifacts] = useState<WorkflowArtifact[]>([]);
  const [projectId, setProjectId] = useState<string>("local-project-default");
  const [syncStatus, setSyncStatus] = useState<
    "idle" | "syncing" | "synced" | "failed"
  >("idle");

  useEffect(() => {
    setRuns(readStorage(RUNS_KEY, []));
    setPresets(readStorage(PRESETS_KEY, []));
    setActivity(readStorage(ACTIVITY_KEY, []));
    setProjects(
      readStorage<WorkflowProject[]>(PROJECTS_KEY, [
        {
          id: "local-project-default",
          name: "Default Local Project",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]),
    );
    setArtifacts(readStorage(ARTIFACTS_KEY, []));
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
      projectId,
      completedStepIds: [],
      status: "running",
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

  async function completeStep(stepId: string) {
    const now = new Date().toISOString();
    const fallback = {
      id: uuidv4(),
      workflowSlug: workflow.slug,
      projectId,
      completedStepIds: [],
      status: "running",
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
      status:
        completedStepIds.length === workflow.steps.length
          ? "completed"
          : "running",
      updatedAt: now,
    };

    const nextRuns = [updated, ...runs.filter((r) => r.id !== updated.id)];
    setRuns(nextRuns);
    writeStorage(RUNS_KEY, nextRuns);

    const step = workflow.steps.find((item) => item.id === stepId);
    if (step) {
      const artifact = await _executeWorkflowStepWithAdapters(
        step,
        JSON.stringify({
          workflowSlug: workflow.slug,
          projectId,
          stepId,
          completedStepIds,
          timestamp: now,
        }),
      );
      const nextArtifacts = [artifact, ...artifacts].slice(0, 300);
      setArtifacts(nextArtifacts);
      writeStorage(ARTIFACTS_KEY, nextArtifacts);
    }

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

    const payload = _exportRunSummaryJson({
      workflowSlug: workflow.slug,
      projectId,
      completedSteps: activeRun?.completedStepIds ?? [],
      artifacts: artifacts.filter(
        (artifact) =>
          activeRun?.completedStepIds.includes(artifact.sourceStep) ?? false,
      ),
      exportedAt: new Date().toISOString(),
    });

    const blob = new Blob([payload], {
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
    const payload = _serializeRecipe({
      workflowSlug: workflow.slug,
      projectId,
      presetName: `${workflow.name} starter`,
      timestamp: new Date().toISOString(),
      config: {
        template: "starter",
      },
    });
    const recipe = _encodeRecipeSchema(payload);
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
      status: "running",
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

  function cancelRun() {
    if (!activeRun) return;

    const updated: WorkflowRun = {
      ...activeRun,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    };
    const nextRuns = [updated, ...runs.filter((run) => run.id !== updated.id)];
    setRuns(nextRuns);
    writeStorage(RUNS_KEY, nextRuns);
    logActivity("run_cancelled");
  }

  function resetRun() {
    if (!activeRun) return;

    const updated: WorkflowRun = {
      ...activeRun,
      completedStepIds: [],
      status: "idle",
      updatedAt: new Date().toISOString(),
    };
    const nextRuns = [updated, ...runs.filter((run) => run.id !== updated.id)];
    setRuns(nextRuns);
    writeStorage(RUNS_KEY, nextRuns);
    logActivity("run_reset");
  }

  function createProject(name: string) {
    const project: WorkflowProject = {
      id: uuidv4(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const nextProjects = [project, ...projects];
    setProjects(nextProjects);
    writeStorage(PROJECTS_KEY, nextProjects);
    setProjectId(project.id);
    logActivity("project_created");
  }

  async function manualSync() {
    setSyncStatus("syncing");
    try {
      const runPayload = runs.map((run) => ({
        id: run.id,
        projectId: run.projectId,
        updatedAt: run.updatedAt,
        payload: run,
      }));
      const presetPayload = presets.map((preset) => ({
        id: preset.id,
        projectId,
        updatedAt: preset.createdAt,
        payload: preset,
      }));
      const projectPayload = projects.map((project) => ({
        id: project.id,
        projectId: project.id,
        updatedAt: project.updatedAt,
        payload: project,
      }));

      await Promise.all([
        fetch("/api/sync/runs", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ items: runPayload }),
        }),
        fetch("/api/sync/presets", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ items: presetPayload }),
        }),
        fetch("/api/sync/projects", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ items: projectPayload }),
        }),
      ]);

      setSyncStatus("synced");
      logActivity("manual_sync_completed");
    } catch {
      setSyncStatus("failed");
      logActivity("manual_sync_failed");
    }
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

    const decoded = _decodeRecipeSchema(candidate);
    if (!decoded || decoded.workflowSlug !== workflow.slug) return;

    const validation = _validateRecipeSchema(decoded);
    if (!validation.valid) return;

    const payload = decoded as unknown as WorkflowRecipeSharePayload;
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
    cancelRun,
    resetRun,
    downloadSampleData,
    runFromPreset,
    importRecipeFromUrl,
    projects,
    createProject,
    syncStatus,
    manualSync,
    outputManifest: artifacts.filter(
      (artifact) =>
        activeRun?.completedStepIds.includes(artifact.sourceStep) ?? false,
    ),
    recentActivity,
  };
}
