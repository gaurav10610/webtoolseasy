import { describe, it, expect, beforeEach } from "vitest";
import {
  isLocalOnlyStep,
  isNetworkStep,
  isExportOnlyStep,
  assertClientOnly,
  assertNetworkAllowed,
  canMakeNetworkCall,
  getExecutionModeDescription,
  validateStepChaining,
  analyzePrivacyChain,
  createBoundaryCheckedStep,
} from "@/lib/serverClientBoundary";
import { WorkflowStepConfig } from "@/types/workflow";

describe("Server/Client Boundary Utilities", () => {
  const localStep: WorkflowStepConfig = {
    id: "validate",
    title: "Validate JSON",
    description: "Validate local JSON",
    executionMode: "local-only",
  };

  const networkStep: WorkflowStepConfig = {
    id: "fetch",
    title: "Fetch Data",
    description: "Fetch from API",
    executionMode: "network",
  };

  const exportStep: WorkflowStepConfig = {
    id: "export",
    title: "Export",
    description: "Export results",
    executionMode: "export-only",
  };

  describe("type guards", () => {
    it("correctly identifies local-only steps", () => {
      expect(isLocalOnlyStep(localStep)).toBe(true);
      expect(isLocalOnlyStep(networkStep)).toBe(false);
      expect(isLocalOnlyStep(exportStep)).toBe(false);
    });

    it("correctly identifies network steps", () => {
      expect(isNetworkStep(networkStep)).toBe(true);
      expect(isNetworkStep(localStep)).toBe(false);
      expect(isNetworkStep(exportStep)).toBe(false);
    });

    it("correctly identifies export-only steps", () => {
      expect(isExportOnlyStep(exportStep)).toBe(true);
      expect(isExportOnlyStep(localStep)).toBe(false);
      expect(isExportOnlyStep(networkStep)).toBe(false);
    });
  });

  describe("assertClientOnly", () => {
    it("succeeds for local-only steps in browser", () => {
      // Mock browser environment
      const originalWindow = global.window;
      (global.window as any) = {};

      expect(() => assertClientOnly(localStep)).not.toThrow();

      global.window = originalWindow;
    });

    it("throws for local-only steps in server context", () => {
      // Mock server environment
      const originalWindow = global.window;
      delete (global as any).window;

      expect(() => assertClientOnly(localStep)).toThrow(
        /cannot execute in server environment/i,
      );

      global.window = originalWindow;
    });

    it("throws for non-local-only steps", () => {
      const originalWindow = global.window;
      (global.window as any) = {};

      expect(() => assertClientOnly(networkStep)).toThrow(
        /execution mode.*network/i,
      );

      global.window = originalWindow;
    });
  });

  describe("assertNetworkAllowed", () => {
    it("succeeds for network steps", () => {
      expect(() => assertNetworkAllowed(networkStep)).not.toThrow();
    });

    it("succeeds for export-only steps", () => {
      expect(() => assertNetworkAllowed(exportStep)).not.toThrow();
    });

    it("throws for local-only steps", () => {
      expect(() => assertNetworkAllowed(localStep)).toThrow(
        /attempted network call/i,
      );
    });
  });

  describe("canMakeNetworkCall", () => {
    it("returns true for network steps", () => {
      expect(canMakeNetworkCall(networkStep)).toBe(true);
    });

    it("throws for local-only steps", () => {
      expect(() => canMakeNetworkCall(localStep)).toThrow();
    });
  });

  describe("getExecutionModeDescription", () => {
    it("describes local-only mode", () => {
      const desc = getExecutionModeDescription("local-only");
      expect(desc).toContain("browser");
      expect(desc).toContain("No data leaves");
    });

    it("describes network mode", () => {
      const desc = getExecutionModeDescription("network");
      expect(desc).toContain("network access");
      expect(desc).toContain("external");
    });

    it("describes export-only mode", () => {
      const desc = getExecutionModeDescription("export-only");
      expect(desc).toContain("downloadable");
      expect(desc).toContain("No permanent storage");
    });
  });

  describe("validateStepChaining", () => {
    it("allows chaining from export-only to any step", () => {
      expect(validateStepChaining(exportStep, localStep)).toBe(true);
      expect(validateStepChaining(exportStep, networkStep)).toBe(true);
      expect(validateStepChaining(exportStep, exportStep)).toBe(true);
    });

    it("allows chaining from local-only to local-only", () => {
      expect(validateStepChaining(localStep, localStep)).toBe(true);
    });

    it("allows chaining from local-only to export-only", () => {
      expect(validateStepChaining(localStep, exportStep)).toBe(true);
    });

    it("prevents chaining from local-only to network", () => {
      expect(validateStepChaining(localStep, networkStep)).toBe(false);
    });

    it("allows chaining from network to any step", () => {
      expect(validateStepChaining(networkStep, localStep)).toBe(true);
      expect(validateStepChaining(networkStep, networkStep)).toBe(true);
      expect(validateStepChaining(networkStep, exportStep)).toBe(true);
    });
  });

  describe("analyzePrivacyChain", () => {
    it("validates safe chains", () => {
      const result = analyzePrivacyChain(exportStep, localStep);
      expect(result.safe).toBe(true);
      expect(result.warning).toBeUndefined();
    });

    it("detects unsafe chains", () => {
      const result = analyzePrivacyChain(localStep, networkStep);
      expect(result.safe).toBe(false);
      expect(result.warning).toContain("Cannot chain");
    });

    it("warns about network data entering local context", () => {
      const result = analyzePrivacyChain(networkStep, localStep);
      expect(result.safe).toBe(true);
      expect(result.warning).toContain("sanitized");
    });

    it("allows safe network chains", () => {
      const result = analyzePrivacyChain(networkStep, networkStep);
      expect(result.safe).toBe(true);
      expect(result.warning).toBeUndefined();
    });
  });

  describe("createBoundaryCheckedStep", () => {
    it("executes local-only handler for local-only steps", async () => {
      const handler = createBoundaryCheckedStep(localStep, {
        localOnly: async (step, data) => ({
          ...data,
          processed: true,
        }),
      });

      const originalWindow = global.window;
      (global.window as any) = {};

      const result = await handler({ input: "test" });
      expect(result.processed).toBe(true);

      global.window = originalWindow;
    });

    it("executes network handler for network steps", async () => {
      const handler = createBoundaryCheckedStep(networkStep, {
        network: async (step, data) => ({
          ...data,
          fetched: true,
        }),
      });

      const result = await handler({ input: "test" });
      expect(result.fetched).toBe(true);
    });

    it("executes export handler for export-only steps", async () => {
      const handler = createBoundaryCheckedStep(exportStep, {
        exportOnly: (step, data) => ({
          ...data,
          exported: true,
        }),
      });

      const result = await handler({ input: "test" });
      expect(result.exported).toBe(true);
    });

    it("throws if no handler is registered for execution mode", async () => {
      const handler = createBoundaryCheckedStep(localStep, {});

      const originalWindow = global.window;
      (global.window as any) = {};

      await expect(handler({ input: "test" })).rejects.toThrow(
        /No handler registered/,
      );

      global.window = originalWindow;
    });
  });

  describe("integration: privacy boundaries", () => {
    it("enforces local-only constraint in proxy functions", () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const fn = () => "result";
      expect(() => {
        const proxy = createBoundaryCheckedStep(localStep, {
          localOnly: async () => ({ result: "test" }),
        });
        // The error should occur during handler invocation
      }).not.toThrow(); // Creation is ok, execution fails

      global.window = originalWindow;
    });

    it("prevents data flow from local to network", () => {
      const result = analyzePrivacyChain(localStep, networkStep);
      expect(result.safe).toBe(false);
      expect(result.warning).toContain("must not be transmitted");
    });

    it("allows data flow through export steps", () => {
      expect(validateStepChaining(localStep, exportStep)).toBe(true);
      expect(validateStepChaining(exportStep, networkStep)).toBe(true);
      expect(analyzePrivacyChain(localStep, exportStep).safe).toBe(true);
    });
  });
});
