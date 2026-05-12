import { describe, expect, it } from "vitest";
import {
  _createDbAdapter,
  _getPortableProviderOrder,
} from "@/lib/dbAbstraction";

describe("DB Abstraction Portability (TB-169)", () => {
  it("returns expected provider order", () => {
    const providers = _getPortableProviderOrder();
    expect(providers).toEqual(["postgres", "neon", "supabase", "d1", "memory"]);
  });

  it("supports memory adapter lifecycle", async () => {
    const db = _createDbAdapter("memory");
    expect(db.isConnected()).toBe(false);

    await db.connect();
    expect(db.isConnected()).toBe(true);

    await db.disconnect();
    expect(db.isConnected()).toBe(false);
  });

  it("supports memory adapter CRUD", async () => {
    const db = _createDbAdapter("memory");
    await db.connect();

    await db.upsert("recipes", { id: "r1", name: "Recipe 1" });
    await db.upsert("recipes", { id: "r2", name: "Recipe 2" });

    const one = await db.getById("recipes", "r1");
    expect(one?.name).toBe("Recipe 1");

    const all = await db.list("recipes");
    expect(all).toHaveLength(2);

    const removed = await db.remove("recipes", "r1");
    expect(removed).toBe(true);

    const after = await db.list("recipes");
    expect(after).toHaveLength(1);
  });

  it("throws when memory adapter used before connect", async () => {
    const db = _createDbAdapter("memory");
    await expect(db.list("recipes")).rejects.toThrow(/not connected/);
  });

  it("creates placeholder provider adapters", async () => {
    const providers = ["postgres", "neon", "supabase", "d1"] as const;

    for (const provider of providers) {
      const db = _createDbAdapter(provider);
      expect(db.provider).toBe(provider);
      await db.connect();
      await expect(db.list("recipes")).rejects.toThrow(/not implemented/);
    }
  });
});
