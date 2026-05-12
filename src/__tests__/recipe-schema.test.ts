import { describe, expect, it } from "vitest";
import {
  _decodeRecipeSchema,
  _encodeRecipeSchema,
  _serializeRecipe,
  _validateRecipeSchema,
} from "@/lib/recipeSchema";

describe("Recipe serialization schema and integrity (TB-045/046/047)", () => {
  it("serializes, encodes, and validates recipe payload", () => {
    const recipe = _serializeRecipe({
      workflowSlug: "api-payload-cleanup",
      projectId: "project-a",
      presetName: "starter",
      timestamp: "2026-05-12T00:00:00.000Z",
      config: { strict: true },
    });

    const token = _encodeRecipeSchema(recipe);
    const decoded = _decodeRecipeSchema(token);

    expect(decoded).not.toBeNull();
    expect(_validateRecipeSchema(decoded!)).toEqual({ valid: true });
  });

  it("fails validation when payload is tampered", () => {
    const recipe = _serializeRecipe({
      workflowSlug: "api-payload-cleanup",
      projectId: "project-a",
      presetName: "starter",
      timestamp: "2026-05-12T00:00:00.000Z",
      config: { strict: true },
    });

    const tampered = { ...recipe, presetName: "changed" };
    const result = _validateRecipeSchema(tampered as typeof recipe);

    expect(result.valid).toBe(false);
  });
});
