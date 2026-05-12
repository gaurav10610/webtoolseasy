import { createHash } from "node:crypto";

export interface LocalProjectBackup {
  version: string;
  createdAt: string;
  projectId: string;
  projectName: string;
  workflows: Array<Record<string, unknown>>;
  presets: Array<Record<string, unknown>>;
  metadata: {
    checksum: string;
    source: "local-only";
  };
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).sort();
  return `{${keys
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(",")}}`;
}

export function _computeBackupChecksum(
  payload: Omit<LocalProjectBackup, "metadata">,
): string {
  const normalized = stableStringify(payload);
  return createHash("sha256").update(normalized).digest("hex");
}

export function _exportLocalProjectBackup(input: {
  projectId: string;
  projectName: string;
  workflows: Array<Record<string, unknown>>;
  presets: Array<Record<string, unknown>>;
}): LocalProjectBackup {
  const payloadWithoutMeta = {
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    projectId: input.projectId,
    projectName: input.projectName,
    workflows: input.workflows,
    presets: input.presets,
  };

  const checksum = _computeBackupChecksum(payloadWithoutMeta);

  return {
    ...payloadWithoutMeta,
    metadata: {
      checksum,
      source: "local-only",
    },
  };
}

export function _validateLocalProjectBackup(backup: LocalProjectBackup): {
  valid: boolean;
  reason?: string;
} {
  if (!backup.projectId || !backup.projectName) {
    return {
      valid: false,
      reason: "Missing project identity fields",
    };
  }

  const expected = _computeBackupChecksum({
    version: backup.version,
    createdAt: backup.createdAt,
    projectId: backup.projectId,
    projectName: backup.projectName,
    workflows: backup.workflows,
    presets: backup.presets,
  });

  if (expected !== backup.metadata.checksum) {
    return {
      valid: false,
      reason: "Checksum mismatch",
    };
  }

  return { valid: true };
}

export function _importLocalProjectBackup(backup: LocalProjectBackup): {
  success: boolean;
  project?: {
    projectId: string;
    projectName: string;
    workflows: Array<Record<string, unknown>>;
    presets: Array<Record<string, unknown>>;
  };
  reason?: string;
} {
  const validation = _validateLocalProjectBackup(backup);
  if (!validation.valid) {
    return {
      success: false,
      reason: validation.reason,
    };
  }

  return {
    success: true,
    project: {
      projectId: backup.projectId,
      projectName: backup.projectName,
      workflows: backup.workflows,
      presets: backup.presets,
    },
  };
}
