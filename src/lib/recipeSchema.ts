export interface WorkflowRecipeSchemaV1 {
  version: "1.0.0";
  workflowSlug: string;
  projectId: string;
  presetName: string;
  timestamp: string;
  config: Record<string, unknown>;
  integrity: {
    checksum: string;
    algorithm: "sha256";
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

export function _computeRecipeChecksum(
  payload: Omit<WorkflowRecipeSchemaV1, "integrity">,
): string {
  const source = stableStringify(payload);
  let hash = 2166136261;

  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function _serializeRecipe(input: {
  workflowSlug: string;
  projectId: string;
  presetName: string;
  timestamp: string;
  config?: Record<string, unknown>;
}): WorkflowRecipeSchemaV1 {
  const payload = {
    version: "1.0.0" as const,
    workflowSlug: input.workflowSlug,
    projectId: input.projectId,
    presetName: input.presetName,
    timestamp: input.timestamp,
    config: input.config || {},
  };

  return {
    ...payload,
    integrity: {
      algorithm: "sha256",
      checksum: _computeRecipeChecksum(payload),
    },
  };
}

export function _validateRecipeSchema(recipe: WorkflowRecipeSchemaV1): {
  valid: boolean;
  reason?: string;
} {
  if (!recipe.workflowSlug || !recipe.projectId || !recipe.presetName) {
    return { valid: false, reason: "Required recipe fields missing" };
  }

  const expected = _computeRecipeChecksum({
    version: recipe.version,
    workflowSlug: recipe.workflowSlug,
    projectId: recipe.projectId,
    presetName: recipe.presetName,
    timestamp: recipe.timestamp,
    config: recipe.config,
  });

  if (expected !== recipe.integrity.checksum) {
    return { valid: false, reason: "Recipe integrity checksum mismatch" };
  }

  return { valid: true };
}

export function _encodeRecipeSchema(recipe: WorkflowRecipeSchemaV1): string {
  return Buffer.from(JSON.stringify(recipe), "utf8").toString("base64url");
}

export function _decodeRecipeSchema(
  token: string,
): WorkflowRecipeSchemaV1 | null {
  try {
    return JSON.parse(
      Buffer.from(token, "base64url").toString("utf8"),
    ) as WorkflowRecipeSchemaV1;
  } catch {
    return null;
  }
}
