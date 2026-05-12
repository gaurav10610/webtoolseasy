import { describe, expect, it } from "vitest";
import {
  _exportLocalProjectBackup,
  _importLocalProjectBackup,
  _validateLocalProjectBackup,
} from "@/lib/localProjectBackup";

describe("Local Project Export/Import Backup (TB-186)", () => {
  it("exports backup with checksum", () => {
    const backup = _exportLocalProjectBackup({
      projectId: "project-1",
      projectName: "My Local Project",
      workflows: [{ slug: "api-payload-cleanup" }],
      presets: [{ id: "preset-1" }],
    });

    expect(backup.metadata.checksum).toBeTruthy();
    expect(backup.metadata.source).toBe("local-only");
  });

  it("validates a non-tampered backup", () => {
    const backup = _exportLocalProjectBackup({
      projectId: "project-2",
      projectName: "Valid Project",
      workflows: [{ slug: "blog-publish" }],
      presets: [],
    });

    const result = _validateLocalProjectBackup(backup);
    expect(result.valid).toBe(true);
  });

  it("detects checksum tampering", () => {
    const backup = _exportLocalProjectBackup({
      projectId: "project-3",
      projectName: "Tampered Project",
      workflows: [{ slug: "media-publish" }],
      presets: [],
    });

    backup.workflows.push({ slug: "injected" });
    const result = _validateLocalProjectBackup(backup);

    expect(result.valid).toBe(false);
    expect(result.reason).toContain("Checksum");
  });

  it("imports valid backup data", () => {
    const backup = _exportLocalProjectBackup({
      projectId: "project-4",
      projectName: "Importable Project",
      workflows: [{ slug: "technical-seo-quick-audit" }],
      presets: [{ id: "preset-a" }],
    });

    const imported = _importLocalProjectBackup(backup);
    expect(imported.success).toBe(true);
    expect(imported.project?.projectName).toBe("Importable Project");
  });
});
