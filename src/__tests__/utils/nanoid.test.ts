import { describe, expect, it } from "vitest";
import { nanoid } from "@/utils/nanoid";

describe("nanoid util", () => {
  it("uses 8 chars by default", () => {
    const id = nanoid();
    expect(id).toHaveLength(8);
  });

  it("supports custom length", () => {
    const id = nanoid(12);
    expect(id).toHaveLength(12);
  });

  it("generates highly unique values in a sample set", () => {
    const ids = new Set(Array.from({ length: 2000 }, () => nanoid()));
    expect(ids.size).toBe(2000);
  });
});
