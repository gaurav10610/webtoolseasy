import { describe, it, expect } from "vitest";
import {
  generateArtifactManifest as _generateArtifactManifest,
  exportManifestAsJSON as _exportManifestAsJSON,
  evaluateRunsForArchival as _evaluateRunsForArchival,
  calculateStorageUsage as _calculateStorageUsage,
  getRecommendedRetentionPolicy as _getRecommendedRetentionPolicy,
  DEFAULT_RETENTION_POLICIES,
} from "@/lib/artifactIntegrityAndStorage";

describe("Artifact Integrity and Storage Management", () => {
  describe("Artifact Manifest Generation (TB-123)", () => {
    it("should generate artifact manifest with checksums", async () => {
      const now = new Date();
      const later = new Date(now.getTime() + 5000);
      const artifact = new Blob(["test data"], { type: "text/plain" });

      const manifest = await _generateArtifactManifest(
        "run123",
        "Test Pack",
        [
          {
            id: "art1",
            name: "result.json",
            type: "json",
            sourceStep: "step1",
            data: artifact,
          },
        ],
        now,
        later,
      );

      expect(manifest.runId).toEqual("run123");
      expect(manifest.packName).toEqual("Test Pack");
      expect(manifest.artifacts.length).toEqual(1);
      expect(manifest.artifacts[0].checksum).toBeDefined();
      expect(manifest.artifacts[0].checksum.algorithm).toEqual("SHA256");
      expect(manifest.artifacts[0].verified).toBe(true);
    });

    it("should calculate execution time correctly", async () => {
      const now = new Date();
      const later = new Date(now.getTime() + 10000); // 10 seconds
      const artifact = new Blob(["data"], { type: "text/plain" });

      const manifest = await _generateArtifactManifest(
        "run123",
        "Test Pack",
        [
          {
            id: "art1",
            name: "result.txt",
            type: "text",
            sourceStep: "step1",
            data: artifact,
          },
        ],
        now,
        later,
      );

      expect(manifest.executionTime).toEqual(10000);
    });

    it("should include artifact metadata in manifest", async () => {
      const now = new Date();
      const later = new Date(now.getTime() + 1000);
      const artifact = new Blob(["data"], { type: "application/json" });

      const manifest = await _generateArtifactManifest(
        "run123",
        "Test Pack",
        [
          {
            id: "art1",
            name: "output.json",
            type: "json",
            sourceStep: "transform",
            data: artifact,
            downloadUrl: "https://example.com/download/art1",
          },
        ],
        now,
        later,
      );

      expect(manifest.artifacts[0].name).toEqual("output.json");
      expect(manifest.artifacts[0].type).toEqual("json");
      expect(manifest.artifacts[0].sourceStep).toEqual("transform");
      expect(manifest.artifacts[0].downloadUrl).toEqual(
        "https://example.com/download/art1",
      );
    });

    it("should handle multiple artifacts", async () => {
      const now = new Date();
      const later = new Date(now.getTime() + 1000);

      const manifest = await _generateArtifactManifest(
        "run123",
        "Test Pack",
        [
          {
            id: "art1",
            name: "file1.json",
            type: "json",
            sourceStep: "step1",
            data: new Blob(["data1"], { type: "application/json" }),
          },
          {
            id: "art2",
            name: "file2.txt",
            type: "text",
            sourceStep: "step2",
            data: new Blob(["data2 content here"], { type: "text/plain" }),
          },
        ],
        now,
        later,
      );

      expect(manifest.artifacts.length).toEqual(2);
      expect(manifest.artifacts[0].id).toEqual("art1");
      expect(manifest.artifacts[1].id).toEqual("art2");
    });

    it("should calculate total size correctly", async () => {
      const now = new Date();
      const later = new Date(now.getTime() + 1000);

      const manifest = await _generateArtifactManifest(
        "run123",
        "Test Pack",
        [
          {
            id: "art1",
            name: "file1.txt",
            type: "text",
            sourceStep: "step1",
            data: new Blob(["12345"]),
          },
          {
            id: "art2",
            name: "file2.txt",
            type: "text",
            sourceStep: "step2",
            data: new Blob(["123456789"]),
          },
        ],
        now,
        later,
      );

      expect(manifest.totalSize).toEqual(5 + 9); // 14 bytes
    });
  });

  describe("Manifest Export", () => {
    it("should export manifest as valid JSON", async () => {
      const now = new Date();
      const later = new Date(now.getTime() + 1000);
      const artifact = new Blob(["data"], { type: "text/plain" });

      const manifest = await _generateArtifactManifest(
        "run123",
        "Test Pack",
        [
          {
            id: "art1",
            name: "result.txt",
            type: "text",
            sourceStep: "step1",
            data: artifact,
          },
        ],
        now,
        later,
      );

      const json = _exportManifestAsJSON(manifest);
      const parsed = JSON.parse(json);

      expect(parsed.runId).toEqual("run123");
      expect(parsed.packName).toEqual("Test Pack");
      expect(parsed.artifacts).toBeDefined();
    });
  });

  describe("Storage Retention Policies (TB-135, TB-136)", () => {
    it("should provide predefined retention policies", () => {
      expect(DEFAULT_RETENTION_POLICIES.aggressive).toBeDefined();
      expect(DEFAULT_RETENTION_POLICIES.balanced).toBeDefined();
      expect(DEFAULT_RETENTION_POLICIES.conservative).toBeDefined();
      expect(DEFAULT_RETENTION_POLICIES.unlimited).toBeDefined();
    });

    it("should have consistent policy structure", () => {
      Object.values(DEFAULT_RETENTION_POLICIES).forEach((policy) => {
        expect(policy.id).toBeDefined();
        expect(policy.name).toBeDefined();
        expect(policy.maxAgeInDays).toBeGreaterThan(0);
        expect(policy.maxSizeInMB).toBeGreaterThan(0);
        expect(policy.maxRunsToKeep).toBeGreaterThan(0);
        expect(policy.archiveOldRuns).toBeDefined();
        expect(policy.enabled).toBeDefined();
      });
    });

    it("aggressive policy should have short retention", () => {
      const aggressive = DEFAULT_RETENTION_POLICIES.aggressive;
      expect(aggressive.maxAgeInDays).toEqual(7);
      expect(aggressive.maxSizeInMB).toEqual(100);
      expect(aggressive.maxRunsToKeep).toEqual(10);
    });

    it("balanced policy should have moderate retention", () => {
      const balanced = DEFAULT_RETENTION_POLICIES.balanced;
      expect(balanced.maxAgeInDays).toEqual(30);
      expect(balanced.maxSizeInMB).toEqual(500);
      expect(balanced.maxRunsToKeep).toEqual(50);
    });

    it("conservative policy should have long retention", () => {
      const conservative = DEFAULT_RETENTION_POLICIES.conservative;
      expect(conservative.maxAgeInDays).toEqual(90);
      expect(conservative.maxSizeInMB).toEqual(1000);
      expect(conservative.maxRunsToKeep).toEqual(100);
    });
  });

  describe("Run Archival Evaluation", () => {
    it("should identify runs to keep based on recency", () => {
      const now = new Date();
      const runs = [
        {
          id: "r1",
          packName: "p1",
          createdAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
          sizeInBytes: 100,
          artifacts: [],
        },
        {
          id: "r2",
          packName: "p1",
          createdAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
          sizeInBytes: 100,
          artifacts: [],
        },
        {
          id: "r3",
          packName: "p1",
          createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
          sizeInBytes: 100,
          artifacts: [],
        },
      ];

      const policy = DEFAULT_RETENTION_POLICIES.balanced;
      const { toArchive, toDelete, toKeep } = _evaluateRunsForArchival(
        runs,
        policy,
      );

      expect(toKeep.length).toBeGreaterThan(0);
      expect(toKeep.some((r) => r.id === "r3")).toBe(true); // Recent run kept
    });

    it("should respect maxRunsToKeep limit", () => {
      const now = new Date();
      const runs = Array.from({ length: 100 }, (_, i) => ({
        id: `r${i}`,
        packName: "p1",
        createdAt: new Date(now.getTime() - i * 1000),
        sizeInBytes: 100,
        artifacts: [],
      }));

      const policy = DEFAULT_RETENTION_POLICIES.balanced;
      const { toKeep } = _evaluateRunsForArchival(runs, policy);

      expect(toKeep.length).toBeLessThanOrEqual(policy.maxRunsToKeep);
    });

    it("should archive old runs when policy allows", () => {
      const now = new Date();
      const oldRun = {
        id: "r1",
        packName: "p1",
        createdAt: new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000), // 100 days old
        sizeInBytes: 100,
        artifacts: [],
      };

      const policy = DEFAULT_RETENTION_POLICIES.balanced; // 30 day max age, archive enabled
      const { toArchive } = _evaluateRunsForArchival([oldRun], policy);

      expect(toArchive.length).toBeGreaterThan(0);
      expect(toArchive.some((r) => r.id === "r1")).toBe(true);
    });

    it("should delete old runs when archive is disabled", () => {
      const now = new Date();
      const oldRun = {
        id: "r1",
        packName: "p1",
        createdAt: new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000),
        sizeInBytes: 100,
        artifacts: [],
      };

      const policy = DEFAULT_RETENTION_POLICIES.aggressive; // Archive disabled
      const { toDelete } = _evaluateRunsForArchival([oldRun], policy);

      expect(toDelete.length).toBeGreaterThan(0);
    });

    it("should respect size limits", () => {
      const now = new Date();
      const runs = Array.from({ length: 10 }, (_, i) => ({
        id: `r${i}`,
        packName: "p1",
        createdAt: new Date(now.getTime() - i * 1000),
        sizeInBytes: 100 * 1024 * 1024, // 100 MB each
        artifacts: [],
      }));

      const policy = DEFAULT_RETENTION_POLICIES.balanced; // 500 MB limit
      const { toKeep, toArchive, toDelete } = _evaluateRunsForArchival(
        runs,
        policy,
      );

      const totalKept = toKeep.reduce((sum, r) => sum + r.sizeInBytes, 0);
      expect(totalKept / (1024 * 1024)).toBeLessThanOrEqual(
        policy.maxSizeInMB * 1.1,
      ); // 10% tolerance
    });
  });

  describe("Storage Usage Calculation", () => {
    it("should calculate usage in MB", () => {
      const runs = [
        { sizeInBytes: 1024 * 1024 }, // 1 MB
        { sizeInBytes: 2 * 1024 * 1024 }, // 2 MB
      ];

      const usage = _calculateStorageUsage(runs);
      expect(usage.usedMB).toEqual(3);
      expect(usage.runCount).toEqual(2);
    });

    it("should handle zero usage", () => {
      const usage = _calculateStorageUsage([]);
      expect(usage.usedMB).toEqual(0);
      expect(usage.runCount).toEqual(0);
    });

    it("should round MB usage appropriately", () => {
      const runs = [{ sizeInBytes: Math.round(1.5 * 1024 * 1024) }];

      const usage = _calculateStorageUsage(runs);
      expect(usage.usedMB).toBeCloseTo(1.5, 1);
    });
  });

  describe("Recommended Retention Policy", () => {
    it("should recommend aggressive for high usage", () => {
      const policy = _getRecommendedRetentionPolicy(450, 45);
      expect(policy.id).toEqual("aggressive");
    });

    it("should recommend balanced for moderate usage", () => {
      const policy = _getRecommendedRetentionPolicy(300, 30);
      expect(policy.id).toEqual("balanced");
    });

    it("should recommend conservative for low usage", () => {
      const policy = _getRecommendedRetentionPolicy(100, 10);
      expect(policy.id).toEqual("conservative");
    });

    it("should consider run count in recommendation", () => {
      const highRunCount = _getRecommendedRetentionPolicy(100, 50);
      expect(highRunCount.id).toEqual("aggressive");

      const lowRunCount = _getRecommendedRetentionPolicy(450, 10);
      expect(lowRunCount.id).toEqual("balanced");
    });
  });
});
