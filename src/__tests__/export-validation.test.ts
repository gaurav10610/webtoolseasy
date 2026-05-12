import { describe, it, expect } from "vitest";
import {
  validateJsonStructure,
  validateFileSize,
  validateSensitiveDataAbsence,
  validateContentQuality,
  validateStepSpecificRequirements,
  validateExportData,
  generateValidationReportText,
  validateMultipleExports,
} from "@/lib/exportValidation";
import { WorkflowStepConfig } from "@/types/workflow";

describe("Export Validation", () => {
  const localStep: WorkflowStepConfig = {
    id: "validate",
    title: "Validate",
    description: "Validate JSON",
    executionMode: "local-only",
  };

  const exportStep: WorkflowStepConfig = {
    id: "export",
    title: "Export",
    description: "Export results",
    executionMode: "export-only",
  };

  describe("validateJsonStructure", () => {
    it("passes valid JSON string", () => {
      const result = validateJsonStructure('{"key": "value"}');
      expect(result).toHaveLength(0);
    });

    it("passes valid JSON object", () => {
      const result = validateJsonStructure({
        key: "value",
        nested: { count: 1 },
      });
      expect(result).toHaveLength(0);
    });

    it("fails malformed JSON string", () => {
      const result = validateJsonStructure('{"key": invalid}');
      expect(result).toHaveLength(1);
      expect(result[0].severity).toBe("error");
      expect(result[0].id).toBe("json-parse-error");
    });

    it("fails unclosed JSON", () => {
      const result = validateJsonStructure('{"key": "value"');
      expect(result).toHaveLength(1);
      expect(result[0].severity).toBe("error");
    });

    it("handles null and primitives", () => {
      expect(validateJsonStructure(null)).toHaveLength(0);
      expect(validateJsonStructure(123)).toHaveLength(0);
      // "string" is valid JSON, so it passes
      expect(validateJsonStructure('"string"')).toHaveLength(0);
    });
  });

  describe("validateFileSize", () => {
    it("passes small files", () => {
      const result = validateFileSize({ data: "small" });
      expect(result).toHaveLength(0);
    });

    it("warns on 5-10MB files", () => {
      // Create a ~6MB string
      const largeData = "x".repeat(6 * 1024 * 1024);
      const result = validateFileSize({ content: largeData });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("warning");
      expect(result[0].id).toBe("file-size-warning");
    });

    it("errors on >10MB files", () => {
      // Create a ~11MB string
      const hugeData = "x".repeat(11 * 1024 * 1024);
      const result = validateFileSize({ content: hugeData });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("error");
      expect(result[0].id).toBe("file-size-error");
    });

    it("includes helpful suggestions", () => {
      const largeData = "x".repeat(11 * 1024 * 1024);
      const result = validateFileSize({ content: largeData });
      expect(result[0].suggestedFix).toBeDefined();
    });
  });

  describe("validateSensitiveDataAbsence", () => {
    it("allows safe data", () => {
      const result = validateSensitiveDataAbsence({ key: "value", id: 123 });
      expect(result).toHaveLength(0);
    });

    it("detects Stripe API keys", () => {
      const result = validateSensitiveDataAbsence({
        key: "sk_live_abc123def456",
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("error");
      expect(result[0].id).toBe("sensitive-data-detected");
    });

    it("detects AWS keys", () => {
      const result = validateSensitiveDataAbsence({
        credentials: "AKIA1234567890ABCDEF",
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("error");
    });

    it("detects GitHub tokens", () => {
      const result = validateSensitiveDataAbsence({
        token: "ghp_abcdefghijklmnopqrstuvwxyzabcdefghijkl1234",
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("error");
    });

    it("detects password values", () => {
      const result = validateSensitiveDataAbsence({
        config: 'password="secret123456"',
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("error");
      expect(result[0].id).toBe("password-detected");
    });

    it("warns on excessive email addresses", () => {
      const emails = Array.from(
        { length: 15 },
        (_, i) => `user${i}@example.com`,
      );
      const result = validateSensitiveDataAbsence({
        recipients: emails.join(","),
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("warning");
      expect(result[0].id).toBe("excessive-pii");
    });

    it("allows few email addresses", () => {
      const result = validateSensitiveDataAbsence({
        contact: "admin@example.com, support@example.com",
      });
      const excessive = result.filter((r) => r.id === "excessive-pii");
      expect(excessive).toHaveLength(0);
    });
  });

  describe("validateContentQuality", () => {
    it("warns on empty string", () => {
      const result = validateContentQuality("");
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("warning");
      expect(result[0].id).toBe("empty-content");
    });

    it("warns on empty object", () => {
      const result = validateContentQuality({});
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].id).toBe("empty-object");
    });

    it("informs on very small content", () => {
      const result = validateContentQuality("abc");
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("info");
      expect(result[0].id).toBe("very-small-content");
    });

    it("passes normal content", () => {
      const result = validateContentQuality("This is a normal content string");
      expect(result).toHaveLength(0);
    });

    it("warns on deeply nested structures", () => {
      // Create very deeply nested object
      let nested: any = { value: 1 };
      for (let i = 0; i < 20; i++) {
        nested = { child: nested };
      }
      const result = validateContentQuality(nested);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].id).toBe("excessive-nesting");
    });

    it("allows reasonably nested structures", () => {
      let nested: any = { value: 1 };
      for (let i = 0; i < 5; i++) {
        nested = { child: nested };
      }
      const result = validateContentQuality(nested);
      const nestingWarnings = result.filter(
        (r) => r.id === "excessive-nesting",
      );
      expect(nestingWarnings).toHaveLength(0);
    });
  });

  describe("validateStepSpecificRequirements", () => {
    it("passes normal data in local-only step", () => {
      const result = validateStepSpecificRequirements(localStep, {
        data: "local",
      });
      expect(result).toHaveLength(0);
    });

    it("informs when local-only step has network data", () => {
      const result = validateStepSpecificRequirements(localStep, {
        apiUrl: "https://api.example.com",
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("info");
    });

    it("errors when export step has no output", () => {
      const result = validateStepSpecificRequirements(exportStep, "");
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].severity).toBe("error");
      expect(result[0].id).toBe("export-step-empty");
    });

    it("passes when export step has data", () => {
      const result = validateStepSpecificRequirements(exportStep, {
        result: "success",
      });
      expect(result).toHaveLength(0);
    });
  });

  describe("validateExportData", () => {
    it("validates complete export successfully", () => {
      const report = validateExportData({ key: "value", result: "success" });
      expect(report.isValid).toBe(true);
      expect(report.canProceed).toBe(true);
      expect(report.summary.errorCount).toBe(0);
    });

    it("blocks export with errors", () => {
      const report = validateExportData('{"invalid": json}');
      expect(report.isValid).toBe(false);
      expect(report.canProceed).toBe(false);
      expect(report.summary.errorCount).toBeGreaterThan(0);
    });

    it("allows export with warnings", () => {
      const report = validateExportData({
        /* empty object but isValid since no errors */
      });
      // Empty object has a warning but isValid refers to no errors, not warnings
      expect(report.summary.errorCount).toBe(0);
      expect(report.canProceed).toBe(true); // Can proceed despite warnings
    });

    it("includes step-specific validation", () => {
      const report = validateExportData("", exportStep);
      expect(report.checks.some((c) => c.id === "export-step-empty")).toBe(
        true,
      );
    });

    it("collects all check types", () => {
      const report = validateExportData({ key: "value" });
      expect(report.checks).toBeDefined();
      expect(Array.isArray(report.checks)).toBe(true);
    });
  });

  describe("generateValidationReportText", () => {
    it("generates success message for valid report", () => {
      const report = {
        isValid: true,
        canProceed: true,
        checks: [],
        summary: { errorCount: 0, warningCount: 0, infoCount: 0 },
      };
      const text = generateValidationReportText(report);
      expect(text).toContain("passed");
    });

    it("generates error message with details", () => {
      const report = validateExportData('{"invalid": json}');
      const text = generateValidationReportText(report);
      expect(text.length).toBeGreaterThan(0);
      expect(text).toContain("error");
    });

    it("includes suggested fixes", () => {
      const report = validateExportData({});
      const text = generateValidationReportText(report);
      if (report.checks.some((c) => c.suggestedFix)) {
        expect(text).toContain("💡");
      }
    });
  });

  describe("validateMultipleExports", () => {
    it("validates array of exports", () => {
      const exports = [
        { step: localStep, data: { key: "value" } },
        { step: exportStep, data: { result: "success" } },
      ];
      const report = validateMultipleExports(exports);
      expect(report.checks).toBeDefined();
    });

    it("aggregates errors across exports", () => {
      const exports = [
        { step: exportStep, data: "" }, // Will error
        { step: localStep, data: { valid: true } },
      ];
      const report = validateMultipleExports(exports);
      expect(report.summary.errorCount).toBeGreaterThan(0);
    });

    it("returns false for canProceed if any export has errors", () => {
      const exports = [
        { step: localStep, data: { valid: true } },
        { step: exportStep, data: "" }, // Error
      ];
      const report = validateMultipleExports(exports);
      expect(report.canProceed).toBe(false);
    });
  });

  describe("integration: full validation workflow", () => {
    it("validates production-like JSON export", () => {
      const data = {
        workflow: "api-cleanup",
        results: [
          { id: 1, status: "valid" },
          { id: 2, status: "transformed" },
        ],
        metadata: { processedAt: new Date().toISOString() },
      };

      const report = validateExportData(data, exportStep);
      expect(report.isValid).toBe(true);
      expect(report.canProceed).toBe(true);
    });

    it("catches malicious export attempts", () => {
      const malicious = {
        data: "normal",
        credentials: "sk_live_abc123def456",
        password: "secret123",
      };

      const report = validateExportData(malicious);
      expect(report.isValid).toBe(false);
      expect(report.canProceed).toBe(false);
      expect(report.summary.errorCount).toBeGreaterThanOrEqual(1);
    });

    it("provides actionable feedback", () => {
      const report = validateExportData("");
      const textReport = generateValidationReportText(report);
      expect(textReport).toContain("💡");
      expect(textReport).toContain("Empty");
    });
  });
});
