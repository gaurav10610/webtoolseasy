import { describe, expect, it } from "vitest";
import {
  _checkTelemetrySchemaCompatibility,
  _versionTelemetryEvent,
  TELEMETRY_SCHEMA_VERSION,
} from "@/lib/telemetrySchemaPolicy";

describe("Telemetry Schema Versioning Policy (TB-184)", () => {
  it("versions telemetry events with current schema version", () => {
    const event = _versionTelemetryEvent({
      name: "workflow_run_started",
      workflowSlug: "api-payload-cleanup",
    });

    expect(event.schemaVersion).toBe(TELEMETRY_SCHEMA_VERSION);
    expect(event.timestamp).toBeTruthy();
  });

  it("accepts exact schema version", () => {
    const result = _checkTelemetrySchemaCompatibility("1.0.0", "1.0.0");
    expect(result.compatible).toBe(true);
  });

  it("accepts same-major schema version", () => {
    const result = _checkTelemetrySchemaCompatibility("1.2.3", "1.0.0");
    expect(result.compatible).toBe(true);
  });

  it("rejects incompatible major schema version", () => {
    const result = _checkTelemetrySchemaCompatibility("2.0.0", "1.0.0");
    expect(result.compatible).toBe(false);
  });
});
