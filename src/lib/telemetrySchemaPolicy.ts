export const TELEMETRY_SCHEMA_VERSION = "1.0.0";

export interface VersionedTelemetryEvent {
  schemaVersion: string;
  name: string;
  workflowSlug: string;
  timestamp: string;
  payload?: Record<string, unknown>;
}

export interface TelemetrySchemaCompatibility {
  compatible: boolean;
  reason: string;
}

function majorOf(version: string): number {
  const major = Number(version.split(".")[0]);
  return Number.isFinite(major) ? major : -1;
}

export function _versionTelemetryEvent(input: {
  name: string;
  workflowSlug: string;
  payload?: Record<string, unknown>;
}): VersionedTelemetryEvent {
  return {
    schemaVersion: TELEMETRY_SCHEMA_VERSION,
    name: input.name,
    workflowSlug: input.workflowSlug,
    timestamp: new Date().toISOString(),
    payload: input.payload,
  };
}

export function _checkTelemetrySchemaCompatibility(
  eventVersion: string,
  currentVersion: string = TELEMETRY_SCHEMA_VERSION,
): TelemetrySchemaCompatibility {
  if (eventVersion === currentVersion) {
    return {
      compatible: true,
      reason: "Exact schema match",
    };
  }

  const eventMajor = majorOf(eventVersion);
  const currentMajor = majorOf(currentVersion);

  if (eventMajor === currentMajor && eventMajor !== -1) {
    return {
      compatible: true,
      reason: "Compatible major schema version",
    };
  }

  return {
    compatible: false,
    reason: `Incompatible schema version ${eventVersion} for current ${currentVersion}`,
  };
}
