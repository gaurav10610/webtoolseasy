"use client";

import {
  WorkflowTelemetryEvent,
  WorkflowTelemetryEventName,
} from "@/types/workflow";

export function trackWorkflowEvent(
  name: WorkflowTelemetryEventName,
  workflowSlug: string,
  stepId?: string,
  projectId?: string,
): WorkflowTelemetryEvent {
  const event: WorkflowTelemetryEvent = {
    name,
    workflowSlug,
    stepId,
    projectId,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const queueKey = "wte_workflow_events";
    try {
      const existing = JSON.parse(
        localStorage.getItem(queueKey) || "[]",
      ) as WorkflowTelemetryEvent[];
      existing.push(event);
      localStorage.setItem(queueKey, JSON.stringify(existing.slice(-500)));
    } catch {
      // Ignore telemetry write errors in private mode or restricted browsers.
    }

    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void })
      .gtag;
    if (typeof gtag === "function") {
      gtag("event", name, {
        workflow_slug: workflowSlug,
        step_id: stepId,
        project_id: projectId,
      });
    }
  }

  return event;
}
