/**
 * Pre-Export Validation Checks
 *
 * Performs security, quality, and structural validation before exporting workflow outputs.
 * Checks include:
 * - JSON/XML structure validation
 * - File size warnings
 * - Content quality heuristics
 * - Basic security checks (no embedded credentials, suspicious patterns)
 */

import { WorkflowStepConfig } from "@/types/workflow";

/**
 * Validation check result
 */
export type ValidationSeverity = "error" | "warning" | "info";

export interface ValidationCheckResult {
  id: string;
  severity: ValidationSeverity;
  title: string;
  description: string;
  suggestedFix?: string;
  affectedField?: string;
}

export interface ExportValidationReport {
  isValid: boolean;
  checks: ValidationCheckResult[];
  summary: {
    errorCount: number;
    warningCount: number;
    infoCount: number;
  };
  canProceed: boolean; // true if no errors (warnings are ok)
}

/**
 * Validates JSON structure
 */
export const validateJsonStructure = (
  data: unknown,
): ValidationCheckResult[] => {
  const issues: ValidationCheckResult[] = [];

  if (typeof data === "string") {
    try {
      JSON.parse(data);
    } catch (err) {
      issues.push({
        id: "json-parse-error",
        severity: "error",
        title: "Invalid JSON structure",
        description: `JSON is malformed and cannot be exported: ${err instanceof Error ? err.message : "Unknown error"}`,
        suggestedFix:
          "Review the data in the workflow and ensure all JSON syntax is correct",
      });
    }
  } else if (typeof data === "object" && data !== null) {
    try {
      JSON.stringify(data);
    } catch (err) {
      issues.push({
        id: "json-stringify-error",
        severity: "error",
        title: "Non-serializable data",
        description:
          "Data contains non-JSON-serializable values (circular references, functions, etc.)",
        suggestedFix:
          "Remove circular references or non-serializable values before export",
      });
    }
  }

  return issues;
};

/**
 * Validates file size and warns about large exports
 */
export const validateFileSize = (data: unknown): ValidationCheckResult[] => {
  const issues: ValidationCheckResult[] = [];

  let sizeInBytes = 0;
  if (typeof data === "string") {
    sizeInBytes = new Blob([data]).size;
  } else if (typeof data === "object" && data !== null) {
    sizeInBytes = new Blob([JSON.stringify(data)]).size;
  }

  const sizeInMB = sizeInBytes / (1024 * 1024);

  if (sizeInMB > 10) {
    issues.push({
      id: "file-size-error",
      severity: "error",
      title: "File size exceeds limit",
      description: `Export size is ${sizeInMB.toFixed(2)}MB. Maximum is 10MB for browser processing.`,
      suggestedFix: "Filter data or split into multiple exports",
    });
  } else if (sizeInMB > 5) {
    issues.push({
      id: "file-size-warning",
      severity: "warning",
      title: "Large file size",
      description: `Export size is ${sizeInMB.toFixed(2)}MB. This may be slow to process on older devices.`,
      suggestedFix: "Consider filtering data or splitting into smaller exports",
    });
  }

  return issues;
};

/**
 * Checks for potentially sensitive data patterns
 */
export const validateSensitiveDataAbsence = (
  data: unknown,
): ValidationCheckResult[] => {
  const issues: ValidationCheckResult[] = [];

  const dataStr = typeof data === "string" ? data : JSON.stringify(data);

  // Check for common API key patterns
  const apiKeyPatterns = [
    /sk_live_/i, // Stripe
    /pk_live_/i, // Stripe
    /aws_/i, // AWS (informal)
    /AKIA[0-9A-Z]{16}/i, // AWS access key
    /ghp_[a-zA-Z0-9_]{36,255}/i, // GitHub personal token
    /bearer\s+[a-zA-Z0-9._\-]+/i, // Bearer tokens
  ];

  for (const pattern of apiKeyPatterns) {
    if (pattern.test(dataStr)) {
      issues.push({
        id: "sensitive-data-detected",
        severity: "error",
        title: "Sensitive data detected",
        description:
          "Export appears to contain API keys or authentication tokens. This data should not be exported or shared.",
        suggestedFix: "Remove all credentials and tokens before exporting",
      });
      break; // Only report once
    }
  }

  // Check for passwords (check for "password" followed by any value-like content)
  if (/password\s*[:=]/i.test(dataStr)) {
    if (!issues.some((i) => i.id === "sensitive-data-detected")) {
      issues.push({
        id: "password-detected",
        severity: "error",
        title: "Password data detected",
        description: "Export contains what appears to be password values",
        suggestedFix: "Remove all passwords and credentials before exporting",
      });
    }
  }

  // Check for PII patterns (email, phone)
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = dataStr.match(emailPattern);
  if (emails && emails.length > 10) {
    issues.push({
      id: "excessive-pii",
      severity: "warning",
      title: "Possible PII in export",
      description: `Export contains many email addresses (${emails.length} found). Verify this is intentional.`,
      suggestedFix: "Review data for unintended personal information",
    });
  }

  return issues;
};

/**
 * Validates content quality and structure
 */
export const validateContentQuality = (
  data: unknown,
): ValidationCheckResult[] => {
  const issues: ValidationCheckResult[] = [];

  if (typeof data === "string") {
    if (data.trim().length === 0) {
      issues.push({
        id: "empty-content",
        severity: "warning",
        title: "Empty export",
        description: "Export contains no data",
        suggestedFix: "Ensure workflow steps have produced output",
      });
    } else if (data.length < 10) {
      issues.push({
        id: "very-small-content",
        severity: "info",
        title: "Very small export",
        description:
          "Export is unusually small (<10 characters). Verify this is expected.",
      });
    }
  }

  if (typeof data === "object" && data !== null) {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      issues.push({
        id: "empty-object",
        severity: "warning",
        title: "Empty object",
        description: "Export object contains no properties",
        suggestedFix: "Ensure workflow steps have populated output fields",
      });
    }

    // Check for too many nested levels (likely indicates problem)
    const checkDepth = (obj: unknown, depth = 0): number => {
      if (depth > 20) return depth;
      if (typeof obj !== "object" || obj === null) return depth;
      if (Array.isArray(obj)) {
        return Math.max(...obj.map((item) => checkDepth(item, depth + 1)));
      }
      return Math.max(
        ...Object.values(obj).map((val) => checkDepth(val, depth + 1)),
      );
    };

    const maxDepth = checkDepth(data);
    if (maxDepth > 15) {
      issues.push({
        id: "excessive-nesting",
        severity: "warning",
        title: "Deeply nested structure",
        description: `Export has ${maxDepth} levels of nesting. This may indicate a data structure problem.`,
        suggestedFix: "Review data structure for unnecessary nesting",
      });
    }
  }

  return issues;
};

/**
 * Validates step-specific requirements
 */
export const validateStepSpecificRequirements = (
  step: WorkflowStepConfig,
  data: unknown,
): ValidationCheckResult[] => {
  const issues: ValidationCheckResult[] = [];

  // Local-only steps should not have network data
  if (
    step.executionMode === "local-only" &&
    typeof data === "object" &&
    data !== null
  ) {
    const dataStr = JSON.stringify(data);
    if (/url|http|api|endpoint|request/i.test(dataStr)) {
      issues.push({
        id: "local-step-network-data",
        severity: "info",
        title: "Network references in local-only step",
        description: `Local-only step "${step.id}" contains network-related data. Verify this is intentional.`,
      });
    }
  }

  // Export-only steps should have output
  if (step.executionMode === "export-only") {
    if (data === null || data === undefined || data === "") {
      issues.push({
        id: "export-step-empty",
        severity: "error",
        title: "Export step has no output",
        description: `Export-only step "${step.id}" produced no data`,
        suggestedFix: "Ensure previous steps have run and produced output",
      });
    }
  }

  return issues;
};

/**
 * Runs all validation checks on export data
 */
export const validateExportData = (
  data: unknown,
  step?: WorkflowStepConfig,
): ExportValidationReport => {
  const allChecks: ValidationCheckResult[] = [];

  // Structure checks
  allChecks.push(...validateJsonStructure(data));
  allChecks.push(...validateFileSize(data));
  allChecks.push(...validateSensitiveDataAbsence(data));
  allChecks.push(...validateContentQuality(data));

  // Step-specific checks
  if (step) {
    allChecks.push(...validateStepSpecificRequirements(step, data));
  }

  // Count by severity
  const summary = {
    errorCount: allChecks.filter((c) => c.severity === "error").length,
    warningCount: allChecks.filter((c) => c.severity === "warning").length,
    infoCount: allChecks.filter((c) => c.severity === "info").length,
  };

  return {
    isValid: summary.errorCount === 0,
    checks: allChecks,
    summary,
    canProceed: summary.errorCount === 0, // Warnings and info don't block
  };
};

/**
 * Generates human-readable validation report
 */
export const generateValidationReportText = (
  report: ExportValidationReport,
): string => {
  if (report.checks.length === 0) {
    return "✅ All validation checks passed!";
  }

  const lines: string[] = [];
  lines.push(
    `Validation Report: ${report.summary.errorCount} error(s), ${report.summary.warningCount} warning(s), ${report.summary.infoCount} info`,
  );
  lines.push("");

  for (const check of report.checks) {
    const icon =
      check.severity === "error"
        ? "❌"
        : check.severity === "warning"
          ? "⚠️"
          : "ℹ️";
    lines.push(`${icon} ${check.title}`);
    lines.push(`   ${check.description}`);
    if (check.suggestedFix) {
      lines.push(`   💡 ${check.suggestedFix}`);
    }
    lines.push("");
  }

  return lines.join("\n");
};

/**
 * Batch validate multiple export outputs
 */
export const validateMultipleExports = (
  exports: Array<{ step: WorkflowStepConfig; data: unknown }>,
): ExportValidationReport => {
  const allChecks: ValidationCheckResult[] = [];

  for (const { step, data } of exports) {
    const report = validateExportData(data, step);
    allChecks.push(...report.checks);
  }

  const summary = {
    errorCount: allChecks.filter((c) => c.severity === "error").length,
    warningCount: allChecks.filter((c) => c.severity === "warning").length,
    infoCount: allChecks.filter((c) => c.severity === "info").length,
  };

  return {
    isValid: summary.errorCount === 0,
    checks: allChecks,
    summary,
    canProceed: summary.errorCount === 0,
  };
};
