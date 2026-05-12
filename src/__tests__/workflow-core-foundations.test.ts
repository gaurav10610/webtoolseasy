import { describe, expect, it } from "vitest";
import { _createWorkflowError } from "@/lib/workflowErrors";
import { _createLocalOnlyFetchGuard } from "@/lib/localOnlyUploadGuard";
import {
  _migrateStorageEnvelope,
  _parseStorageEnvelope,
  WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION,
} from "@/lib/localStorageMigration";

describe("Workflow core foundations (TB-005/TB-013/TB-035)", () => {
  it("creates typed workflow error", () => {
    const error = _createWorkflowError({
      code: "validation",
      message: "missing fields",
      stepId: "s1",
    });

    expect(error.code).toBe("validation");
    expect(error.retriable).toBe(false);
  });

  it("blocks upload-style request in local-only guard", () => {
    const guard = _createLocalOnlyFetchGuard({
      id: "s1",
      title: "Local step",
      description: "runs local",
      executionMode: "local-only",
    });

    expect(() =>
      guard("https://example.com/api/upload", { method: "POST" }),
    ).toThrow(/blocked attempted upload/);
  });

  it("migrates legacy storage envelope", () => {
    const legacy = _parseStorageEnvelope(
      JSON.stringify({ runs: [{ id: "1" }] }),
    );
    const migrated = _migrateStorageEnvelope(legacy);

    expect(migrated.version).toBe(WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION);
    expect(Array.isArray(migrated.data.runs)).toBe(true);
  });
});
