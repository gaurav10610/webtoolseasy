"use client";

import { useEffect } from "react";
import {
  _getExperimentAssignment,
  _trackExperimentEvent,
} from "@/lib/workflowExperimentation";

export default function ExperimentHooks({
  workflowSlug,
  event,
}: Readonly<{
  workflowSlug?: string;
  event: "entry" | "preset" | "recipe" | "privacy";
}>) {
  useEffect(() => {
    const map = {
      entry: {
        experimentId: "exp-workflow-entry-intent",
        variants: ["control", "workflow_first"] as const,
        eventName: "workflow_entry_seen",
      },
      preset: {
        experimentId: "exp-preset-utility",
        variants: ["control", "workflow_first"] as const,
        eventName: "preset_flow_seen",
      },
      recipe: {
        experimentId: "exp-recipe-growth-loop",
        variants: ["control", "workflow_first"] as const,
        eventName: "recipe_share_surface_seen",
      },
      privacy: {
        experimentId: "exp-privacy-message-specificity",
        variants: ["control", "privacy_explicit"] as const,
        eventName: "privacy_message_surface_seen",
      },
    };

    const setup = map[event];
    const assignment = _getExperimentAssignment(setup.experimentId, [
      ...setup.variants,
    ]);
    _trackExperimentEvent({
      experimentId: assignment.experimentId,
      variant: assignment.variant,
      eventName: setup.eventName,
      workflowSlug,
      timestamp: new Date().toISOString(),
    });
  }, [event, workflowSlug]);

  return null;
}
