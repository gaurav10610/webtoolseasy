"use client";

import { useEffect, useMemo, useState } from "react";
import { AppBox, AppChip, AppText } from "@/components/lib/ui";
import {
  _computeFunnelMetrics,
  _computeWeeklyCompletedWorkflows,
  WorkflowCompletionEvent,
} from "@/lib/workflowMetricsService";

type WorkflowEvent = {
  name: string;
  workflowSlug: string;
  stepId?: string;
  timestamp: string;
};

function readEvents(): WorkflowEvent[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(
      localStorage.getItem("wte_workflow_events") || "[]",
    ) as WorkflowEvent[];
  } catch {
    return [];
  }
}

export default function FounderMetricsDashboard() {
  const [events, setEvents] = useState<WorkflowEvent[]>([]);

  useEffect(() => {
    setEvents(readEvents());
  }, []);

  const completions = useMemo<WorkflowCompletionEvent[]>(
    () =>
      events
        .filter((event) => event.name === "workflow_completed")
        .map((event) => ({
          workflowSlug: event.workflowSlug,
          completedAt: event.timestamp,
        })),
    [events],
  );

  const wcw = useMemo(
    () => _computeWeeklyCompletedWorkflows(completions),
    [completions],
  );

  const funnel = useMemo(() => {
    const starts = events.filter((event) => event.name === "workflow_opened");
    const completed = events.filter(
      (event) => event.name === "workflow_completed",
    );
    const byStepMap = new Map<string, { entered: number; completed: number }>();

    for (const event of events) {
      if (!event.stepId) continue;
      const row = byStepMap.get(event.stepId) || { entered: 0, completed: 0 };
      row.entered += 1;
      if (event.name === "step_completed") {
        row.completed += 1;
      }
      byStepMap.set(event.stepId, row);
    }

    return _computeFunnelMetrics({
      entryCount: starts.length,
      workflowStarts: starts.length,
      completions: completed.length,
      byStep: Array.from(byStepMap.entries()).map(([stepId, row]) => ({
        stepId,
        entered: row.entered,
        completed: row.completed,
      })),
    });
  }, [events]);

  return (
    <div className="w-full flex flex-col gap-4">
      <AppText className="!text-2xl !font-semibold">
        Founder Metrics Dashboard
      </AppText>
      <AppText color="textSecondary">
        Privacy-safe aggregate metrics from local workflow telemetry.
      </AppText>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <AppBox className="app-shell-section">
          <AppText className="!font-semibold">
            Weekly Completed Workflows
          </AppText>
          <AppText className="!text-xl">{wcw}</AppText>
        </AppBox>
        <AppBox className="app-shell-section">
          <AppText className="!font-semibold">Workflow Completion Rate</AppText>
          <AppText className="!text-xl">
            {Math.round(funnel.completionRate * 100)}%
          </AppText>
        </AppBox>
        <AppBox className="app-shell-section">
          <AppText className="!font-semibold">Workflow Drop-off Rate</AppText>
          <AppText className="!text-xl">
            {Math.round(funnel.dropOffRate * 100)}%
          </AppText>
        </AppBox>
      </div>

      <section className="rounded-xl border border-[var(--mui-palette-divider)] p-4">
        <AppText className="!font-semibold !mb-2">Step Drop-off</AppText>
        <div className="flex flex-wrap gap-2">
          {funnel.stepDropOff.length === 0 ? (
            <AppText variant="body2" color="textSecondary">
              No step-level telemetry yet.
            </AppText>
          ) : (
            funnel.stepDropOff.map((step) => (
              <AppChip
                key={step.stepId}
                label={`${step.stepId}: ${Math.round(step.dropOffRate * 100)}%`}
                size="small"
                color={step.dropOffRate > 0.4 ? "warning" : "success"}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
