/**
 * Migration and Onboarding Framework
 *
 * TB-118: Add migration messaging for old tool users entering workflow-first UI
 * TB-119: Add in-product onboarding tooltip flow for new workflow users
 */

/**
 * Migration messaging for users transitioning from tool-first to workflow-first UI
 */

export interface MigrationMessage {
  id: string;
  type: "alert" | "toast" | "modal" | "inline";
  severity: "info" | "success" | "warning";
  title: string;
  message: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  dismissible: boolean;
  showOnce: boolean;
}

export interface OnboardingTooltip {
  id: string;
  title: string;
  content: string;
  targetElement: string; // CSS selector
  position: "top" | "bottom" | "left" | "right";
  stepNumber: number;
  totalSteps: number;
  nextAction?: () => void;
  skipable: boolean;
}

/**
 * Migration messaging templates for tool users
 */
export const TOOL_TO_WORKFLOW_MIGRATION_MESSAGES: Record<
  string,
  MigrationMessage
> = {
  workflow_discovery: {
    id: "tool-user-workflow-discovery",
    type: "toast",
    severity: "info",
    title: "Try Workflows",
    message:
      "Multi-step workflows combine tools for powerful use cases. Discover workflows that might help you work faster.",
    action: {
      label: "Explore Workflows",
      href: "/workflows",
    },
    dismissible: true,
    showOnce: true,
  },

  workflow_templates: {
    id: "tool-user-templates",
    type: "inline",
    severity: "success",
    title: "Save Time with Templates",
    message:
      "Use pre-built workflow templates to automate common tasks. Clone and customize any template to your needs.",
    action: {
      label: "View Templates",
      href: "/templates",
    },
    dismissible: true,
    showOnce: true,
  },

  workflow_benefits: {
    id: "tool-user-benefits",
    type: "alert",
    severity: "info",
    title: "Enhanced Capabilities",
    message:
      "Workflows let you save presets, share recipes, and build custom multi-step processes that improve your productivity.",
    dismissible: true,
    showOnce: false,
  },

  projects_available: {
    id: "tool-user-projects",
    type: "toast",
    severity: "success",
    title: "Organize with Projects",
    message:
      "Create projects to organize your runs, presets, and artifacts by topic or client.",
    action: {
      label: "Create Project",
      href: "/workspaces",
    },
    dismissible: true,
    showOnce: true,
  },

  workflow_onboarding: {
    id: "first-workflow-user",
    type: "modal",
    severity: "info",
    title: "Welcome to Workflows",
    message:
      "Workflows combine multiple tools into powerful, reusable multi-step processes. Follow this quick guide to get started.",
    dismissible: true,
    showOnce: true,
  },
};

/**
 * Onboarding tooltip sequence for new workflow users
 */
export const WORKFLOW_ONBOARDING_SEQUENCE: OnboardingTooltip[] = [
  {
    id: "onboard-workflow-rail",
    title: "Step-by-Step Execution",
    content:
      "Each workflow consists of organized steps. Click a step to configure it, then run to execute.",
    targetElement: '[data-testid="workflow-step-rail"]',
    position: "right",
    stepNumber: 1,
    totalSteps: 5,
    skipable: true,
  },

  {
    id: "onboard-step-config",
    title: "Configure Step Inputs",
    content:
      "Enter data for this step. Some steps inherit output from previous steps automatically.",
    targetElement: '[data-testid="workflow-config-panel"]',
    position: "left",
    stepNumber: 2,
    totalSteps: 5,
    skipable: true,
  },

  {
    id: "onboard-step-run",
    title: "Execute Step",
    content: "Click Run to execute this step and see the output in real-time.",
    targetElement: '[data-testid="workflow-run-button"]',
    position: "top",
    stepNumber: 3,
    totalSteps: 5,
    skipable: true,
  },

  {
    id: "onboard-step-output",
    title: "View Results",
    content:
      "Step output is displayed here. Use the preview or download to save results.",
    targetElement: '[data-testid="workflow-output-panel"]',
    position: "left",
    stepNumber: 4,
    totalSteps: 5,
    skipable: true,
  },

  {
    id: "onboard-save-preset",
    title: "Save as Preset",
    content:
      "Save this workflow configuration as a preset to run it again later with one click.",
    targetElement: '[data-testid="workflow-save-preset"]',
    position: "top",
    stepNumber: 5,
    totalSteps: 5,
    skipable: false,
  },
];

/**
 * Context-aware migration messaging
 */
export function getMigrationMessageForContext(
  context:
    | "first_visit"
    | "returning_tool_user"
    | "error_recovery"
    | "workflow_complete",
): MigrationMessage | null {
  switch (context) {
    case "first_visit":
      return TOOL_TO_WORKFLOW_MIGRATION_MESSAGES.workflow_discovery;
    case "returning_tool_user":
      return TOOL_TO_WORKFLOW_MIGRATION_MESSAGES.workflow_templates;
    case "error_recovery":
      return TOOL_TO_WORKFLOW_MIGRATION_MESSAGES.workflow_benefits;
    case "workflow_complete":
      return TOOL_TO_WORKFLOW_MIGRATION_MESSAGES.projects_available;
    default:
      return null;
  }
}

/**
 * Track user onboarding progress
 */
export interface OnboardingProgress {
  userId?: string;
  started: boolean;
  completedSteps: string[];
  currentStep: number;
  totalSteps: number;
  completedAt?: Date;
  skipped: boolean;
}

/**
 * Initialize onboarding progress
 */
export function initializeOnboardingProgress(): OnboardingProgress {
  return {
    started: false,
    completedSteps: [],
    currentStep: 0,
    totalSteps: WORKFLOW_ONBOARDING_SEQUENCE.length,
    skipped: false,
  };
}

/**
 * Mark step as completed
 */
export function completeOnboardingStep(
  progress: OnboardingProgress,
  stepId: string,
): OnboardingProgress {
  const newProgress = {
    ...progress,
    started: true,
    completedSteps: [...progress.completedSteps, stepId],
    currentStep: progress.currentStep + 1,
  };

  // Mark as completed if all steps are done
  if (newProgress.currentStep >= newProgress.totalSteps) {
    newProgress.completedAt = new Date();
  }

  return newProgress;
}

/**
 * Skip onboarding
 */
export function skipOnboarding(
  progress: OnboardingProgress,
): OnboardingProgress {
  return {
    ...progress,
    skipped: true,
    completedAt: new Date(),
  };
}

/**
 * Get onboarding completion percentage
 */
export function getOnboardingProgress(progress: OnboardingProgress): number {
  if (progress.totalSteps === 0) return 0;
  return Math.round(
    (progress.completedSteps.length / progress.totalSteps) * 100,
  );
}

/**
 * Determine if user should see migration messaging
 */
export function shouldShowMigrationMessage(userHistory: {
  hasVisitedToolPages: boolean;
  hasRunWorkflows: boolean;
  daysSinceFirstVisit: number;
}): boolean {
  // Show to users who have visited tool pages but never run workflows
  if (userHistory.hasVisitedToolPages && !userHistory.hasRunWorkflows) {
    return true;
  }

  // Show to long-time tool users (7+ days) who haven't explored workflows
  if (
    userHistory.hasVisitedToolPages &&
    !userHistory.hasRunWorkflows &&
    userHistory.daysSinceFirstVisit >= 7
  ) {
    return true;
  }

  return false;
}

/**
 * Determine if user needs onboarding
 */
export function shouldShowOnboarding(userHistory: {
  isNewUser: boolean;
  hasViewedOnboarding: boolean;
  hasCompletedWorkflow: boolean;
}): boolean {
  // Don't show if already completed workflow
  if (userHistory.hasCompletedWorkflow) {
    return false;
  }

  // Show to new users who haven't seen onboarding
  if (userHistory.isNewUser && !userHistory.hasViewedOnboarding) {
    return true;
  }

  return false;
}

/**
 * Get next onboarding tip
 */
export function getNextOnboardingTip(
  progress: OnboardingProgress,
): OnboardingTooltip | null {
  if (progress.currentStep >= WORKFLOW_ONBOARDING_SEQUENCE.length) {
    return null;
  }
  return WORKFLOW_ONBOARDING_SEQUENCE[progress.currentStep];
}

/**
 * Export for testing
 */
export {
  getMigrationMessageForContext as _getMigrationMessageForContext,
  initializeOnboardingProgress as _initializeOnboardingProgress,
  completeOnboardingStep as _completeOnboardingStep,
  skipOnboarding as _skipOnboarding,
  getOnboardingProgress as _getOnboardingProgress,
  shouldShowMigrationMessage as _shouldShowMigrationMessage,
  shouldShowOnboarding as _shouldShowOnboarding,
  getNextOnboardingTip as _getNextOnboardingTip,
};
