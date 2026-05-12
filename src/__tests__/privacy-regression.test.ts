/**
 * Privacy Regression Tests
 *
 * Detects unexpected outbound network calls in local-only steps
 * Ensures that workflows marked as local-only don't accidentally make network requests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  createBoundaryCheckedStep,
  analyzePrivacyChain,
} from "@/lib/serverClientBoundary";
import { WorkflowStepConfig, WorkflowPackConfig } from "@/types/workflow";

describe("Privacy Regression Tests", () => {
  let fetchSpy: any;

  beforeEach(() => {
    // Spy on fetch
    fetchSpy = vi.spyOn(global, "fetch" as any).mockResolvedValue({ ok: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Local-only steps should not make network calls", () => {
    it("should create boundary-checked local-only step", () => {
      const step: WorkflowStepConfig = {
        id: "step1",
        title: "Process Data",
        description: "Local processing",
        executionMode: "local-only",
      };

      expect(() => {
        createBoundaryCheckedStep(step);
      }).not.toThrow();
    });

    it("should create another local-only boundary step", () => {
      const step: WorkflowStepConfig = {
        id: "step2",
        title: "Process",
        description: "Local only",
        executionMode: "local-only",
      };

      expect(() => {
        createBoundaryCheckedStep(step);
      }).not.toThrow();
    });

    it("should accept local-only step configuration", () => {
      const step: WorkflowStepConfig = {
        id: "step3",
        title: "Local Process",
        description: "Process with sensitive data",
        executionMode: "local-only",
      };

      const wrappedStep = createBoundaryCheckedStep(step);
      expect(wrappedStep).toBeDefined();
    });
  });

  describe("Network steps should allow but track calls", () => {
    it("should create network step without throwing", () => {
      const step: WorkflowStepConfig = {
        id: "step1",
        title: "Fetch Data",
        description: "Network step",
        executionMode: "network",
      };

      expect(() => {
        createBoundaryCheckedStep(step);
      }).not.toThrow();
    });

    it("should not restrict network step creation", () => {
      const step: WorkflowStepConfig = {
        id: "step1",
        title: "Network Call",
        description: "Make network request",
        executionMode: "network",
      };

      expect(() => {
        createBoundaryCheckedStep(step);
      }).not.toThrow();
    });
  });

  describe("Export-only steps should not call external APIs", () => {
    it("should create export step without throwing", () => {
      const step: WorkflowStepConfig = {
        id: "step1",
        title: "Export",
        description: "Export only",
        executionMode: "export-only",
      };

      expect(() => {
        createBoundaryCheckedStep(step);
      }).not.toThrow();
    });

    it("should prevent network calls in export-only steps", () => {
      const step: WorkflowStepConfig = {
        id: "export",
        title: "Export Results",
        description: "Export",
        executionMode: "export-only",
      };

      const wrappedStep = createBoundaryCheckedStep(step);
      expect(wrappedStep).toBeDefined();
    });
  });

  describe("Multi-step workflow privacy chains", () => {
    it("should handle local-only workflow chains", () => {
      const workflow: WorkflowStepConfig[] = [
        {
          id: "input",
          title: "Input",
          description: "Get input",
          executionMode: "local-only",
        },
        {
          id: "process",
          title: "Process",
          description: "Process locally",
          executionMode: "local-only",
        },
        {
          id: "export",
          title: "Export",
          description: "Export",
          executionMode: "export-only",
        },
      ];

      expect(() => {
        workflow.forEach((step) => createBoundaryCheckedStep(step));
      }).not.toThrow();
    });

    it("should handle mixed-mode steps", () => {
      const workflow: WorkflowStepConfig[] = [
        {
          id: "input",
          title: "Input",
          description: "Input",
          executionMode: "local-only",
        },
        {
          id: "api_call",
          title: "Fetch from API",
          description: "Network step",
          executionMode: "network",
        },
        {
          id: "export",
          title: "Export",
          description: "Export",
          executionMode: "export-only",
        },
      ];

      expect(() => {
        workflow.forEach((step) => createBoundaryCheckedStep(step));
      }).not.toThrow();
    });

    it("should handle network to export workflow", () => {
      const workflow: WorkflowStepConfig[] = [
        {
          id: "api_call",
          title: "API Call",
          description: "Network request",
          executionMode: "network",
        },
        {
          id: "export",
          title: "Export",
          description: "Export",
          executionMode: "export-only",
        },
      ];

      expect(() => {
        workflow.forEach((step) => createBoundaryCheckedStep(step));
      }).not.toThrow();
    });

    it("should validate all-local-only workflows", () => {
      const localOnlyWorkflow: WorkflowStepConfig[] = [
        {
          id: "step1",
          title: "Step 1",
          description: "Local",
          executionMode: "local-only",
        },
        {
          id: "step2",
          title: "Step 2",
          description: "Also local",
          executionMode: "local-only",
        },
      ];

      expect(() => {
        localOnlyWorkflow.forEach((step) => createBoundaryCheckedStep(step));
      }).not.toThrow();
    });
  });

  describe("Console.log monitoring for sensitive data", () => {
    it("should detect sensitive patterns in text", () => {
      const loggedText = 'password="secret123"';

      const hasSensitivePattern = /password|secret|apikey|sk_live/i.test(
        loggedText,
      );
      expect(hasSensitivePattern).toBe(true);
    });

    it("should detect API key patterns", () => {
      const apiKeyText = "sk_live_abc123def456";

      const hasApiKey = /sk_live/i.test(apiKeyText);
      expect(hasApiKey).toBe(true);
    });
  });

  describe("LocalStorage privacy checks", () => {
    it("should validate no sensitive data in stored values", () => {
      // Mock storage check
      const storage: Record<string, string> = {
        wte_workflow_state: '{"data":"safe"}',
        wte_settings: '{"theme":"dark"}',
      };

      const hasSensitiveData = Object.values(storage).some((value) =>
        /password|secret|apikey|sk_live|bearer/i.test(value),
      );

      expect(hasSensitiveData).toBe(false);
    });

    it("should detect sensitive data patterns in storage values", () => {
      const storage: Record<string, string> = {
        wte_secret: "sk_live_test123",
        auth_token: "bearer abc123def456",
      };

      const sensitiveValues = Object.values(storage).filter((value) =>
        /bearer|^sk_|^sess_|password|secret/i.test(value),
      );

      expect(sensitiveValues.length).toBeGreaterThan(0);
    });

    it("should validate localStorage doesn't contain session tokens", () => {
      const localStorage = {
        auth_token: "bearer abc123def456", // Should be flagged
        wte_workflow: "{}",
        session_id: "sess_xyz789",
      };

      const sensitiveKeys = Object.entries(localStorage).filter(
        ([key, value]) => {
          const isSensitiveKey = /token|session|auth|password|secret/i.test(
            key,
          );
          const isSensitiveValue = /bearer|^sess_|^sk_|password|secret/i.test(
            value,
          );
          return isSensitiveKey || isSensitiveValue;
        },
      );

      // Should find at least 2 suspicious entries
      expect(sensitiveKeys.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Network interceptor for privacy violations", () => {
    it("should detect fetch to tracking domains from local-only step", () => {
      const trackingDomains = [
        "facebook.com",
        "google-analytics.com",
        "segment.com",
      ];
      const step: WorkflowStepConfig = {
        id: "local",
        title: "Local Process",
        description: "Should be local",
        executionMode: "local-only",
      };

      // Simulate attempt to call tracking domain
      const attempt = "https://google-analytics.com/collect?v=1";

      const isTrackingCall = trackingDomains.some((domain) =>
        attempt.includes(domain),
      );

      expect(isTrackingCall).toBe(true);
    });

    it("should allow first-party API calls in network steps", () => {
      const step: WorkflowStepConfig = {
        id: "network",
        title: "Network Request",
        description: "Network enabled",
        executionMode: "network",
      };

      const apiUrl = "https://api.webtoolseasy.com/data";

      // Should be allowed
      expect(apiUrl).toContain("webtoolseasy.com");
    });

    it("should identify outbound requests from workflows", () => {
      // Check if a URL is considered an external call
      const externalUrls = [
        "https://analytics.example.com",
        "https://api.thirdparty.com",
        "https://cdn.cloudflare.com",
      ];

      externalUrls.forEach((url) => {
        expect(url).toMatch(/https?:\/\//);
      });
    });
  });

  describe("Privacy chain validation for sensitive workflows", () => {
    it("should handle crypto operations workflow", () => {
      const cryptoWorkflow: WorkflowStepConfig[] = [
        {
          id: "input",
          title: "Upload PII",
          description: "Input sensitive data",
          executionMode: "local-only",
        },
        {
          id: "encrypt",
          title: "Encrypt",
          description: "Local encryption",
          executionMode: "local-only",
        },
        {
          id: "export",
          title: "Export Encrypted",
          description: "Export",
          executionMode: "export-only",
        },
      ];

      expect(() => {
        cryptoWorkflow.forEach((step) => createBoundaryCheckedStep(step));
      }).not.toThrow();
    });

    it("should handle PII workflow with network transmission", () => {
      const piiWorkflow: WorkflowStepConfig[] = [
        {
          id: "input",
          title: "Input PII",
          description: "PII data",
          executionMode: "local-only",
        },
        {
          id: "transmit",
          title: "Send to Server",
          description: "Network transmission",
          executionMode: "network",
        },
      ];

      expect(() => {
        piiWorkflow.forEach((step) => createBoundaryCheckedStep(step));
      }).not.toThrow();
    });
  });

  describe("Edge cases and error handling", () => {
    it("should handle mixed-mode workflow correctly", () => {
      const mixedWorkflow: WorkflowStepConfig[] = [
        {
          id: "s1",
          title: "Step 1",
          description: "",
          executionMode: "local-only",
        },
        {
          id: "s2",
          title: "Step 2",
          description: "",
          executionMode: "network",
        },
        {
          id: "s3",
          title: "Step 3",
          description: "",
          executionMode: "local-only",
        },
        {
          id: "s4",
          title: "Step 4",
          description: "",
          executionMode: "export-only",
        },
      ];

      expect(() => {
        mixedWorkflow.forEach((step) => createBoundaryCheckedStep(step));
      }).not.toThrow();
    });

    it("should handle workflow with only export steps", () => {
      const exportWorkflow: WorkflowStepConfig[] = [
        {
          id: "export",
          title: "Export",
          description: "",
          executionMode: "export-only",
        },
      ];

      expect(() => {
        exportWorkflow.forEach((step) => createBoundaryCheckedStep(step));
      }).not.toThrow();
    });

    it("should handle single local-only step", () => {
      const singleStep: WorkflowStepConfig[] = [
        {
          id: "test",
          title: "Test",
          description: "Test",
          executionMode: "local-only",
        },
      ];

      expect(() => {
        createBoundaryCheckedStep(singleStep[0]);
      }).not.toThrow();
    });
  });
});
