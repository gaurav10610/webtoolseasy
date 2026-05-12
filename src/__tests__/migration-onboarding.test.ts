import { describe, it, expect } from "vitest";
import {
  getMigrationMessageForContext as _getMigrationMessageForContext,
  initializeOnboardingProgress as _initializeOnboardingProgress,
  completeOnboardingStep as _completeOnboardingStep,
  skipOnboarding as _skipOnboarding,
  getOnboardingProgress as _getOnboardingProgress,
  shouldShowMigrationMessage as _shouldShowMigrationMessage,
  shouldShowOnboarding as _shouldShowOnboarding,
  getNextOnboardingTip as _getNextOnboardingTip,
  TOOL_TO_WORKFLOW_MIGRATION_MESSAGES,
  WORKFLOW_ONBOARDING_SEQUENCE,
} from "@/lib/migrationAndOnboarding";

describe("Migration and Onboarding Framework", () => {
  describe("Migration Messages (TB-118)", () => {
    it("should provide migration message templates", () => {
      expect(TOOL_TO_WORKFLOW_MIGRATION_MESSAGES).toBeDefined();
      expect(
        Object.keys(TOOL_TO_WORKFLOW_MIGRATION_MESSAGES).length,
      ).toBeGreaterThan(0);
    });

    it("should have workflow_discovery message for first-time users", () => {
      const message = TOOL_TO_WORKFLOW_MIGRATION_MESSAGES.workflow_discovery;
      expect(message).toBeDefined();
      expect(message.id).toEqual("tool-user-workflow-discovery");
      expect(message.type).toEqual("toast");
    });

    it("should have workflow_templates message for templates promotion", () => {
      const message = TOOL_TO_WORKFLOW_MIGRATION_MESSAGES.workflow_templates;
      expect(message).toBeDefined();
      expect(message.type).toEqual("inline");
      expect(message.action?.href).toEqual("/templates");
    });

    it("should have projects_available message for organization", () => {
      const message = TOOL_TO_WORKFLOW_MIGRATION_MESSAGES.projects_available;
      expect(message).toBeDefined();
      expect(message.severity).toEqual("success");
    });

    it("should have workflow_onboarding message for new workflow users", () => {
      const message = TOOL_TO_WORKFLOW_MIGRATION_MESSAGES.workflow_onboarding;
      expect(message.type).toEqual("modal");
      expect(message.showOnce).toBe(true);
    });

    it("should provide context-aware migration messages", () => {
      const firstVisit = _getMigrationMessageForContext("first_visit");
      expect(firstVisit?.id).toEqual("tool-user-workflow-discovery");

      const returning = _getMigrationMessageForContext("returning_tool_user");
      expect(returning?.id).toEqual("tool-user-templates");

      const recovery = _getMigrationMessageForContext("error_recovery");
      expect(recovery?.id).toEqual("tool-user-benefits");

      const complete = _getMigrationMessageForContext("workflow_complete");
      expect(complete?.id).toEqual("tool-user-projects");
    });

    it("should return null for unknown context", () => {
      const message = _getMigrationMessageForContext("invalid_context" as any);
      expect(message).toBeNull();
    });

    it("should have dismissible and showOnce flags", () => {
      Object.values(TOOL_TO_WORKFLOW_MIGRATION_MESSAGES).forEach((msg) => {
        expect(msg.dismissible).toBeDefined();
        expect(msg.showOnce).toBeDefined();
      });
    });
  });

  describe("Onboarding Tooltips (TB-119)", () => {
    it("should provide onboarding sequence", () => {
      expect(WORKFLOW_ONBOARDING_SEQUENCE).toBeDefined();
      expect(WORKFLOW_ONBOARDING_SEQUENCE.length).toBeGreaterThan(0);
    });

    it("should have ordered onboarding steps", () => {
      for (let i = 0; i < WORKFLOW_ONBOARDING_SEQUENCE.length; i++) {
        expect(WORKFLOW_ONBOARDING_SEQUENCE[i].stepNumber).toEqual(i + 1);
      }
    });

    it("should have consistent total steps count", () => {
      const totalSteps = WORKFLOW_ONBOARDING_SEQUENCE[0].totalSteps;
      WORKFLOW_ONBOARDING_SEQUENCE.forEach((step) => {
        expect(step.totalSteps).toEqual(totalSteps);
      });
    });

    it("should have required properties for each tooltip", () => {
      WORKFLOW_ONBOARDING_SEQUENCE.forEach((tooltip) => {
        expect(tooltip.id).toBeDefined();
        expect(tooltip.title).toBeDefined();
        expect(tooltip.content).toBeDefined();
        expect(tooltip.targetElement).toBeDefined();
        expect(["top", "bottom", "left", "right"]).toContain(tooltip.position);
        expect(tooltip.skipable).toBeDefined();
      });
    });

    it("should focus on workflow core concepts", () => {
      const steps = WORKFLOW_ONBOARDING_SEQUENCE;
      expect(steps[0].id).toContain("rail"); // Step execution
      expect(steps[1].id).toContain("config"); // Input configuration
      expect(steps[2].id).toContain("run"); // Execution
      expect(steps[3].id).toContain("output"); // Results viewing
      expect(steps[4].id).toContain("preset"); // Saving
    });
  });

  describe("Onboarding Progress Tracking", () => {
    it("should initialize onboarding progress", () => {
      const progress = _initializeOnboardingProgress();
      expect(progress.started).toBe(false);
      expect(progress.completedSteps).toEqual([]);
      expect(progress.currentStep).toEqual(0);
      expect(progress.skipped).toBe(false);
    });

    it("should track completed steps", () => {
      let progress = _initializeOnboardingProgress();
      progress = _completeOnboardingStep(progress, "step1");

      expect(progress.started).toBe(true);
      expect(progress.completedSteps).toContain("step1");
      expect(progress.currentStep).toEqual(1);
    });

    it("should handle multiple completed steps", () => {
      let progress = _initializeOnboardingProgress();
      progress = _completeOnboardingStep(progress, "step1");
      progress = _completeOnboardingStep(progress, "step2");

      expect(progress.completedSteps).toEqual(["step1", "step2"]);
      expect(progress.currentStep).toEqual(2);
    });

    it("should mark completed when all steps done", () => {
      let progress = _initializeOnboardingProgress();
      for (let i = 0; i < progress.totalSteps; i++) {
        progress = _completeOnboardingStep(progress, `step${i}`);
      }

      expect(progress.completedAt).toBeDefined();
    });

    it("should handle skip action", () => {
      let progress = _initializeOnboardingProgress();
      progress = _skipOnboarding(progress);

      expect(progress.skipped).toBe(true);
      expect(progress.completedAt).toBeDefined();
    });

    it("should calculate progress percentage", () => {
      let progress = _initializeOnboardingProgress();
      expect(_getOnboardingProgress(progress)).toEqual(0);

      progress = _completeOnboardingStep(progress, "step1");
      const percentage = _getOnboardingProgress(progress);
      expect(percentage).toBeGreaterThan(0);
      expect(percentage).toBeLessThanOrEqual(100);
    });

    it("should calculate correct progress percentages", () => {
      let progress = _initializeOnboardingProgress();

      // Complete 1 out of 5 steps = 20%
      progress = _completeOnboardingStep(progress, "step1");
      expect(_getOnboardingProgress(progress)).toEqual(20);

      // Complete 3 out of 5 steps = 60%
      progress = _completeOnboardingStep(progress, "step2");
      progress = _completeOnboardingStep(progress, "step3");
      expect(_getOnboardingProgress(progress)).toEqual(60);
    });

    it("should return 0 for empty onboarding", () => {
      const progress = {
        started: false,
        completedSteps: [],
        currentStep: 0,
        totalSteps: 0,
        skipped: false,
      };
      expect(_getOnboardingProgress(progress)).toEqual(0);
    });
  });

  describe("Migration Decision Logic", () => {
    it("should show migration message for tool-only users", () => {
      const shouldShow = _shouldShowMigrationMessage({
        hasVisitedToolPages: true,
        hasRunWorkflows: false,
        daysSinceFirstVisit: 1,
      });
      expect(shouldShow).toBe(true);
    });

    it("should show migration message for long-time tool users", () => {
      const shouldShow = _shouldShowMigrationMessage({
        hasVisitedToolPages: true,
        hasRunWorkflows: false,
        daysSinceFirstVisit: 10,
      });
      expect(shouldShow).toBe(true);
    });

    it("should not show migration message for workflow users", () => {
      const shouldShow = _shouldShowMigrationMessage({
        hasVisitedToolPages: true,
        hasRunWorkflows: true,
        daysSinceFirstVisit: 1,
      });
      expect(shouldShow).toBe(false);
    });

    it("should not show migration message for new users", () => {
      const shouldShow = _shouldShowMigrationMessage({
        hasVisitedToolPages: false,
        hasRunWorkflows: false,
        daysSinceFirstVisit: 0,
      });
      expect(shouldShow).toBe(false);
    });
  });

  describe("Onboarding Decision Logic", () => {
    it("should show onboarding for new users", () => {
      const shouldShow = _shouldShowOnboarding({
        isNewUser: true,
        hasViewedOnboarding: false,
        hasCompletedWorkflow: false,
      });
      expect(shouldShow).toBe(true);
    });

    it("should not show onboarding if already viewed", () => {
      const shouldShow = _shouldShowOnboarding({
        isNewUser: true,
        hasViewedOnboarding: true,
        hasCompletedWorkflow: false,
      });
      expect(shouldShow).toBe(false);
    });

    it("should not show onboarding for users with completed workflows", () => {
      const shouldShow = _shouldShowOnboarding({
        isNewUser: true,
        hasViewedOnboarding: false,
        hasCompletedWorkflow: true,
      });
      expect(shouldShow).toBe(false);
    });

    it("should not show onboarding for existing users", () => {
      const shouldShow = _shouldShowOnboarding({
        isNewUser: false,
        hasViewedOnboarding: false,
        hasCompletedWorkflow: false,
      });
      expect(shouldShow).toBe(false);
    });
  });

  describe("Onboarding Navigation", () => {
    it("should provide first onboarding tip", () => {
      let progress = _initializeOnboardingProgress();
      const tip = _getNextOnboardingTip(progress);

      expect(tip).toBeDefined();
      expect(tip?.stepNumber).toEqual(1);
    });

    it("should progress through onboarding tips", () => {
      let progress = _initializeOnboardingProgress();

      const tip1 = _getNextOnboardingTip(progress);
      expect(tip1?.stepNumber).toEqual(1);

      progress = _completeOnboardingStep(progress, tip1!.id);
      const tip2 = _getNextOnboardingTip(progress);
      expect(tip2?.stepNumber).toEqual(2);
    });

    it("should return null when onboarding complete", () => {
      let progress = _initializeOnboardingProgress();

      // Complete all steps
      for (let i = 0; i < progress.totalSteps; i++) {
        const tip = _getNextOnboardingTip(progress);
        if (tip) {
          progress = _completeOnboardingStep(progress, tip.id);
        }
      }

      const nextTip = _getNextOnboardingTip(progress);
      expect(nextTip).toBeNull();
    });

    it("should maintain step order", () => {
      for (let i = 0; i < WORKFLOW_ONBOARDING_SEQUENCE.length - 1; i++) {
        const current = WORKFLOW_ONBOARDING_SEQUENCE[i];
        const next = WORKFLOW_ONBOARDING_SEQUENCE[i + 1];
        expect(next.stepNumber).toEqual(current.stepNumber + 1);
      }
    });
  });

  describe("Migration Message Properties", () => {
    it("should have action buttons where appropriate", () => {
      const messages = Object.values(TOOL_TO_WORKFLOW_MIGRATION_MESSAGES);
      const messagesWithActions = messages.filter((m) => m.action);

      expect(messagesWithActions.length).toBeGreaterThan(0);
      messagesWithActions.forEach((msg) => {
        expect(msg.action?.label).toBeDefined();
        expect(msg.action?.href || msg.action?.onClick).toBeDefined();
      });
    });

    it("should have consistent message types", () => {
      const messages = Object.values(TOOL_TO_WORKFLOW_MIGRATION_MESSAGES);
      const validTypes = ["alert", "toast", "modal", "inline"];

      messages.forEach((msg) => {
        expect(validTypes).toContain(msg.type);
      });
    });

    it("should have consistent severity levels", () => {
      const messages = Object.values(TOOL_TO_WORKFLOW_MIGRATION_MESSAGES);
      const validSeverities = ["info", "success", "warning"];

      messages.forEach((msg) => {
        expect(validSeverities).toContain(msg.severity);
      });
    });
  });

  describe("Combined Migration and Onboarding Flow", () => {
    it("should support full user journey from tool to workflow", () => {
      // Step 1: Check if migration message should show
      const needsMigration = _shouldShowMigrationMessage({
        hasVisitedToolPages: true,
        hasRunWorkflows: false,
        daysSinceFirstVisit: 1,
      });
      expect(needsMigration).toBe(true);

      // Step 2: Get first migration message
      const migrationMsg = _getMigrationMessageForContext("first_visit");
      expect(migrationMsg?.id).toEqual("tool-user-workflow-discovery");

      // Step 3: User converts and needs onboarding
      const needsOnboarding = _shouldShowOnboarding({
        isNewUser: false, // Not new, but first workflow
        hasViewedOnboarding: false,
        hasCompletedWorkflow: false,
      });
      expect(needsOnboarding).toBe(false); // Not a new user, so no onboarding

      // Step 4: But a brand new user would get onboarding
      const brandNewNeedsOnboarding = _shouldShowOnboarding({
        isNewUser: true,
        hasViewedOnboarding: false,
        hasCompletedWorkflow: false,
      });
      expect(brandNewNeedsOnboarding).toBe(true);
    });
  });
});
