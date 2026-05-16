import { describe, expect, it } from "vitest";
import {
  inferJsonSchema,
  summarizeJson,
} from "@/components/devlens/views/JsonView";

describe("JsonView helpers", () => {
  it("summarizes nested JSON shape", () => {
    const value = {
      name: "alpha",
      enabled: true,
      metrics: { count: 3, tags: ["x", "y"] },
      items: [{ id: 1 }, { id: 2 }],
    };

    const summary = summarizeJson(value);
    expect(summary.rootEntries).toBe(4);
    expect(summary.totalKeys).toBeGreaterThanOrEqual(8);
    expect(summary.depth).toBeGreaterThanOrEqual(3);
    expect(summary.arrayLengths).toEqual(expect.arrayContaining([2, 2]));
  });

  it("infers schema for primitive and object values", () => {
    expect(inferJsonSchema("x")).toEqual({ type: "string" });
    expect(inferJsonSchema(12)).toEqual({ type: "integer" });

    const schema = inferJsonSchema({
      id: 1,
      name: "widget",
      active: false,
      tags: ["one"],
    });

    expect(schema).toMatchObject({
      type: "object",
      required: ["id", "name", "active", "tags"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        active: { type: "boolean" },
        tags: { type: "array" },
      },
    });
  });

  it("infers array schema from first elements", () => {
    const schema = inferJsonSchema([{ id: 1 }, { id: 2 }]);
    expect(schema).toMatchObject({
      type: "array",
      minItems: 0,
      maxItems: 2,
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
        },
      },
    });
  });
});
