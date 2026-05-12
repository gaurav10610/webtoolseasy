import { describe, expect, it } from "vitest";
import {
  _listSyncEntities,
  _removeSyncEntity,
  _upsertSyncEntity,
} from "@/lib/syncStore";

describe("Sync store CRUD and LWW conflict handling (TB-162/TB-163)", () => {
  it("upserts and lists entities", () => {
    _upsertSyncEntity("projects", {
      id: "project-1",
      projectId: "project-1",
      updatedAt: "2026-05-12T00:00:00.000Z",
      payload: { name: "Project 1" },
    });

    const projects = _listSyncEntities("projects");
    expect(projects.some((item) => item.id === "project-1")).toBe(true);
  });

  it("uses last-write-wins for conflicts", () => {
    _upsertSyncEntity("runs", {
      id: "run-1",
      projectId: "project-1",
      updatedAt: "2026-05-12T00:00:00.000Z",
      payload: { status: "running" },
    });

    _upsertSyncEntity("runs", {
      id: "run-1",
      projectId: "project-1",
      updatedAt: "2026-05-11T00:00:00.000Z",
      payload: { status: "old" },
    });

    const current = _listSyncEntities("runs").find(
      (item) => item.id === "run-1",
    );
    expect(current?.payload.status).toBe("running");
  });

  it("removes entities", () => {
    const removed = _removeSyncEntity("projects", "project-1");
    expect(removed).toBe(true);
  });
});
