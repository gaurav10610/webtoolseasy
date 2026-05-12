export const WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION = 2;

export interface WorkflowStorageEnvelope {
  version: number;
  data: Record<string, unknown>;
}

export function _parseStorageEnvelope(
  value: string | null,
): WorkflowStorageEnvelope {
  if (!value) {
    return { version: WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION, data: {} };
  }

  try {
    const parsed = JSON.parse(value) as WorkflowStorageEnvelope;
    if (typeof parsed.version === "number" && parsed.data) {
      return parsed;
    }
  } catch {
    // fall through to legacy handling
  }

  try {
    const legacyData = JSON.parse(value) as Record<string, unknown>;
    return {
      version: 1,
      data: legacyData,
    };
  } catch {
    return { version: WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION, data: {} };
  }
}

export function _migrateStorageEnvelope(
  envelope: WorkflowStorageEnvelope,
): WorkflowStorageEnvelope {
  if (envelope.version >= WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION) {
    return envelope;
  }

  if (Array.isArray(envelope.data)) {
    return {
      version: WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION,
      data: envelope.data as unknown as Record<string, unknown>,
    };
  }

  // v1 -> v2: normalize known list keys to arrays to avoid malformed payloads.
  const nextData = { ...envelope.data };
  const listKeys = ["runs", "presets", "activity", "projects", "artifacts"];
  for (const key of listKeys) {
    const value = nextData[key];
    if (!Array.isArray(value)) {
      nextData[key] = [];
    }
  }

  return {
    version: WORKFLOW_LOCAL_STORAGE_SCHEMA_VERSION,
    data: nextData,
  };
}
