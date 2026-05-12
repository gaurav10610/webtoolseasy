"use client";

import React from "react";
import { Box, Chip, Typography, Alert, Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import {
  StepRecommendation,
  CrossWorkflowRecommendation,
  buildRecommendationContext,
  isRecommendationActionable,
  prioritizeRecommendations,
} from "@/lib/stepRecommendations";
import { WorkflowPackConfig } from "@/types/workflow";

/**
 * NextStepHint Component
 *
 * Displays the recommended next step in a workflow with
 * visual emphasis on:
 * - What to do next
 * - Why this step is recommended
 * - Any blocking dependencies
 */
export const NextStepHint: React.FC<{
  recommendation: StepRecommendation;
}> = ({ recommendation }) => {
  const actionable = isRecommendationActionable(recommendation);

  return (
    <Alert
      severity={actionable ? "info" : "warning"}
      sx={{
        mb: 2,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          💡 Next Step: {recommendation.step.title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.85 }}>
          {recommendation.reason}
        </Typography>

        {!actionable && recommendation.incompletedDependencies && (
          <Typography
            variant="caption"
            sx={{ mt: 1, display: "block", color: "#d32f2f" }}
          >
            ⚠️ Complete these first:{" "}
            {recommendation.incompletedDependencies.join(", ")}
          </Typography>
        )}

        {actionable && (
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: "block",
              color: "success.main",
              fontWeight: 600,
            }}
          >
            Ready to begin →
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          px: 1,
          py: 0.5,
          bgcolor: "primary.main",
          color: "white",
          borderRadius: 1,
          fontSize: "0.75rem",
          fontWeight: 600,
        }}
      >
        {Math.round(recommendation.confidence * 100)}% match
      </Box>
    </Alert>
  );
};

/**
 * StepRecommendationsList Component
 *
 * Shows multiple next-step recommendations with priority sorting
 */
export const StepRecommendationsList: React.FC<{
  recommendations: StepRecommendation[];
  maxShow?: number;
}> = ({ recommendations, maxShow = 3 }) => {
  if (recommendations.length === 0) {
    return null;
  }

  const prioritized = prioritizeRecommendations(recommendations).slice(
    0,
    maxShow,
  );

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        📋 Recommended Steps
      </Typography>

      {prioritized.map((rec, idx) => (
        <Box key={`${rec.step.id}-${idx}`} sx={{ mb: 1.5 }}>
          <NextStepHint recommendation={rec} />
        </Box>
      ))}

      {recommendations.length > maxShow && (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          +{recommendations.length - maxShow} more options available
        </Typography>
      )}
    </Box>
  );
};

/**
 * CrossWorkflowChain Component
 *
 * Displays suggestion to chain to a related workflow
 * Shows:
 * - Which workflow is recommended
 * - Why it's a good next step
 * - Quick link to start
 */
export const CrossWorkflowChain: React.FC<{
  chain: CrossWorkflowRecommendation;
}> = ({ chain }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        mb: 2,
        bgcolor: "action.hover",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {chain.targetWorkflowName}
        </Typography>
        <Chip
          label={`${Math.round(chain.confidence * 100)}% compatible`}
          size="small"
          variant="outlined"
          color="primary"
        />
      </Box>

      <Typography variant="body2" sx={{ mb: 2 }}>
        {chain.reason}
      </Typography>

      <Typography
        variant="caption"
        sx={{ color: "text.secondary", display: "block", mb: 1.5 }}
      >
        Start with: {chain.firstSteps[0]?.title}
      </Typography>

      <Link href={`/workflows/${chain.targetWorkflowSlug}`}>
        <Button
          size="small"
          variant="outlined"
          endIcon={<ArrowForwardIcon sx={{ fontSize: "1rem" }} />}
        >
          Try this workflow
        </Button>
      </Link>
    </Box>
  );
};

/**
 * ChainingHintsPanel Component
 *
 * Complete panel showing both within-workflow and cross-workflow recommendations
 * Designed for display on workflow completion screens
 */
export const ChainingHintsPanel: React.FC<{
  currentWorkflow: WorkflowPackConfig;
  completedStepIds: string[];
  currentStepId?: string;
  allWorkflows?: WorkflowPackConfig[];
}> = ({ currentWorkflow, completedStepIds, currentStepId, allWorkflows }) => {
  const context = buildRecommendationContext(
    currentWorkflow,
    completedStepIds,
    currentStepId,
    allWorkflows,
  );

  if (
    context.nextSteps.length === 0 &&
    context.crossWorkflowChains.length === 0
  ) {
    return null;
  }

  return (
    <Box sx={{ my: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        🎯 What's Next?
      </Typography>

      <Grid container spacing={2}>
        {/* Next steps within current workflow */}
        {context.nextSteps.length > 0 && (
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                Continue in {currentWorkflow.name}
              </Typography>
              <StepRecommendationsList
                recommendations={context.nextSteps}
                maxShow={2}
              />
            </Box>
          </Grid>
        )}

        {/* Cross-workflow chains */}
        {context.crossWorkflowChains.length > 0 && (
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                Chain to Another Workflow
              </Typography>

              {context.crossWorkflowChains.slice(0, 2).map((chain, idx) => (
                <CrossWorkflowChain key={`chain-${idx}`} chain={chain} />
              ))}

              {context.crossWorkflowChains.length > 2 && (
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  +{context.crossWorkflowChains.length - 2} more workflows
                  available
                </Typography>
              )}
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Completion status */}
      {context.completion.isComplete && (
        <Alert severity="success" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            ✅ {context.completion.message}
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

/**
 * InlineChainingSuggestion Component
 *
 * Lightweight component for suggesting next workflow during step execution
 */
export const InlineChainingSuggestion: React.FC<{
  chain: CrossWorkflowRecommendation;
}> = ({ chain }) => {
  return (
    <Box
      sx={{
        p: 1.5,
        bgcolor: "primary.light",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          After this step, try:
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {chain.targetWorkflowName}
        </Typography>
      </Box>
      <Link href={`/workflows/${chain.targetWorkflowSlug}`}>
        <Button size="small" variant="contained" sx={{ textTransform: "none" }}>
          Learn more
        </Button>
      </Link>
    </Box>
  );
};
