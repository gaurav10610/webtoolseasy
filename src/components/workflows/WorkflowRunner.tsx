"use client";

import { useMemo, useState } from "react";
import { AppBox, AppChip, AppField, AppText } from "@/components/lib/ui";
import { ButtonWithHandler } from "@/components/lib/buttons";
import { WorkflowPackConfig } from "@/types/workflow";
import { useWorkflowState } from "@/hooks/useWorkflowState";

export default function WorkflowRunner({
  workflow,
}: Readonly<{ workflow: WorkflowPackConfig }>) {
  const {
    activeRun,
    presets,
    projectId,
    setProjectId,
    startRun,
    completeStep,
    savePreset,
    exportSummary,
    shareRecipe,
  } = useWorkflowState(workflow);

  const [presetName, setPresetName] = useState(`${workflow.name} starter`);

  const completedCount = activeRun?.completedStepIds.length ?? 0;
  const progressText = `${completedCount}/${workflow.steps.length} completed`;

  const canExport = useMemo(
    () => completedCount === workflow.steps.length,
    [completedCount, workflow.steps.length],
  );

  return (
    <AppBox className="app-shell-section w-full flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <AppChip label={workflow.category} color="primary" variant="outlined" />
        <AppChip label={progressText} color="success" variant="outlined" />
        <AppChip label="Privacy: local-first" color="info" variant="outlined" />
      </div>

      <AppText variant="body2" color="textSecondary">
        {workflow.summary}
      </AppText>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AppField
          size="small"
          label="Project ID"
          value={projectId}
          onChange={(event) => setProjectId(event.target.value)}
          helperText="Metadata-only project grouping. No file content is uploaded."
        />
        <AppField
          size="small"
          label="Preset name"
          value={presetName}
          onChange={(event) => setPresetName(event.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <ButtonWithHandler
          buttonText="Start Run"
          onClick={startRun}
          variant="contained"
          color="primary"
        />
        <ButtonWithHandler
          buttonText="Save Preset"
          onClick={() => savePreset(presetName)}
          variant="outlined"
          color="primary"
        />
        <ButtonWithHandler
          buttonText="Share Recipe Link"
          onClick={shareRecipe}
          variant="outlined"
          color="secondary"
        />
        <ButtonWithHandler
          buttonText="Export Summary"
          onClick={exportSummary}
          variant="contained"
          color="success"
          className={canExport ? "" : "pointer-events-none opacity-60"}
        />
      </div>

      <section className="flex flex-col gap-3">
        {workflow.steps.map((step, index) => {
          const isDone = activeRun?.completedStepIds.includes(step.id) ?? false;
          return (
            <article
              key={step.id}
              className="rounded-xl border border-[var(--mui-palette-divider)] p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <AppText className="!font-semibold">
                    {index + 1}. {step.title}
                  </AppText>
                  <AppText variant="body2" color="textSecondary">
                    {step.description}
                  </AppText>
                  <AppText variant="caption" color="textSecondary">
                    Data flow: {step.executionMode}
                  </AppText>
                </div>
                <div className="flex items-center gap-2">
                  <AppChip
                    size="small"
                    label={isDone ? "Done" : "Pending"}
                    color={isDone ? "success" : "default"}
                  />
                  {!isDone && (
                    <ButtonWithHandler
                      buttonText="Complete Step"
                      onClick={() => completeStep(step.id)}
                      variant="outlined"
                      size="small"
                      className="!py-1"
                    />
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-xl border border-[var(--mui-palette-divider)] p-3">
        <AppText className="!font-semibold !mb-2">Saved Presets</AppText>
        {presets.length === 0 ? (
          <AppText variant="body2" color="textSecondary">
            No presets yet for this workflow.
          </AppText>
        ) : (
          <ul className="list-disc pl-5">
            {presets.map((preset) => (
              <li key={preset.id}>
                <AppText variant="body2">
                  {preset.name} ({new Date(preset.createdAt).toLocaleString()})
                </AppText>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppBox>
  );
}
