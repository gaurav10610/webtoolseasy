/**
 * Artifact Integrity and Storage Management
 *
 * TB-123: Add artifact checksum and integrity verification in exported manifests
 * TB-135: Add workflow run archival policy for local storage cleanup
 * TB-136: Add configurable local retention limits for runs/artifacts
 */

/**
 * Artifact metadata with checksum for integrity verification
 */
export interface ArtifactChecksum {
  algorithm: "SHA256" | "SHA1" | "MD5";
  hash: string;
  size: number; // bytes
  createdAt: Date;
}

export interface VerifiedArtifact {
  id: string;
  name: string;
  type: string;
  sourceStep: string;
  checksum: ArtifactChecksum;
  downloadUrl?: string;
  verified: boolean;
  verificationErrors: string[];
}

export interface ArtifactManifest {
  runId: string;
  packName: string;
  executedAt: Date;
  completedAt: Date;
  executionTime: number; // milliseconds
  artifacts: VerifiedArtifact[];
  totalSize: number; // bytes
  manifest_version: string;
}

/**
 * Calculate SHA256 checksum for artifact (browser-safe)
 * Note: In production, use crypto.subtle.digest()
 */
export async function calculateArtifactChecksum(
  data: ArrayBuffer | Blob,
  algorithm: "SHA256" | "SHA1" | "MD5" = "SHA256",
): Promise<string> {
  // Browser crypto API for SHA256
  if (algorithm === "SHA256") {
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      data instanceof Blob ? await data.arrayBuffer() : data,
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  // For other algorithms, would need external library
  throw new Error(`Algorithm ${algorithm} not supported in browser`);
}

/**
 * Verify artifact integrity against checksum
 */
export async function verifyArtifactIntegrity(
  artifact: VerifiedArtifact,
  data: ArrayBuffer | Blob,
): Promise<boolean> {
  try {
    const actualHash = await calculateArtifactChecksum(
      data,
      artifact.checksum.algorithm,
    );
    return actualHash === artifact.checksum.hash;
  } catch (error) {
    return false;
  }
}

/**
 * Generate artifact manifest with checksums
 */
export async function generateArtifactManifest(
  runId: string,
  packName: string,
  artifacts: Array<{
    id: string;
    name: string;
    type: string;
    sourceStep: string;
    data: ArrayBuffer | Blob;
    downloadUrl?: string;
  }>,
  executedAt: Date,
  completedAt: Date,
): Promise<ArtifactManifest> {
  const verifiedArtifacts: VerifiedArtifact[] = [];
  let totalSize = 0;

  for (const artifact of artifacts) {
    const checksum = await calculateArtifactChecksum(artifact.data);
    const size =
      artifact.data instanceof Blob
        ? artifact.data.size
        : artifact.data.byteLength;

    totalSize += size;

    verifiedArtifacts.push({
      id: artifact.id,
      name: artifact.name,
      type: artifact.type,
      sourceStep: artifact.sourceStep,
      checksum: {
        algorithm: "SHA256",
        hash: checksum,
        size,
        createdAt: new Date(),
      },
      downloadUrl: artifact.downloadUrl,
      verified: true,
      verificationErrors: [],
    });
  }

  return {
    runId,
    packName,
    executedAt,
    completedAt,
    executionTime: completedAt.getTime() - executedAt.getTime(),
    artifacts: verifiedArtifacts,
    totalSize,
    manifest_version: "1.0",
  };
}

/**
 * Export manifest as JSON
 */
export function exportManifestAsJSON(manifest: ArtifactManifest): string {
  return JSON.stringify(manifest, null, 2);
}

/**
 * Storage retention policy (TB-135, TB-136)
 */
export interface StorageRetentionPolicy {
  id: string;
  name: string;
  maxAgeInDays: number;
  maxSizeInMB: number;
  maxRunsToKeep: number;
  archiveOldRuns: boolean;
  archiveLocation?: string; // Could be cloud storage
  enabled: boolean;
}

export const DEFAULT_RETENTION_POLICIES: Record<
  string,
  StorageRetentionPolicy
> = {
  aggressive: {
    id: "aggressive",
    name: "Aggressive Cleanup",
    maxAgeInDays: 7,
    maxSizeInMB: 100,
    maxRunsToKeep: 10,
    archiveOldRuns: false,
    enabled: true,
  },

  balanced: {
    id: "balanced",
    name: "Balanced Retention",
    maxAgeInDays: 30,
    maxSizeInMB: 500,
    maxRunsToKeep: 50,
    archiveOldRuns: true,
    enabled: true,
  },

  conservative: {
    id: "conservative",
    name: "Conservative Retention",
    maxAgeInDays: 90,
    maxSizeInMB: 1000,
    maxRunsToKeep: 100,
    archiveOldRuns: true,
    enabled: true,
  },

  unlimited: {
    id: "unlimited",
    name: "Unlimited (Pay for Storage)",
    maxAgeInDays: 365,
    maxSizeInMB: 5000,
    maxRunsToKeep: 1000,
    archiveOldRuns: false,
    enabled: false,
  },
};

/**
 * Archived run metadata
 */
export interface ArchivedRun {
  runId: string;
  packName: string;
  archivedAt: Date;
  originalCreatedAt: Date;
  sizeInBytes: number;
  artifactCount: number;
  archiveLocation: string;
  metadata: {
    success: boolean;
    executionTime: number;
    stepCount: number;
  };
}

/**
 * Evaluate if runs should be archived based on policy
 */
export function evaluateRunsForArchival(
  runs: Array<{
    id: string;
    packName: string;
    createdAt: Date;
    sizeInBytes: number;
    artifacts: Array<{ id: string }>;
  }>,
  policy: StorageRetentionPolicy,
): { toArchive: typeof runs; toDelete: typeof runs; toKeep: typeof runs } {
  const now = new Date();
  const maxAgeMs = policy.maxAgeInDays * 24 * 60 * 60 * 1000;

  // Sort by creation date (newest first)
  const sortedRuns = [...runs].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const toArchive: typeof runs = [];
  const toDelete: typeof runs = [];
  const toKeep: typeof runs = [];

  let keptCount = 0;
  let currentSize = 0;

  // First pass: Mark runs to keep
  for (const run of sortedRuns) {
    const ageMs = now.getTime() - run.createdAt.getTime();
    const isOld = ageMs > maxAgeMs;
    const exceedsCount = keptCount >= policy.maxRunsToKeep;
    const exceedsSize =
      currentSize + run.sizeInBytes > policy.maxSizeInMB * 1024 * 1024;

    if (isOld) {
      // Old runs: archive or delete
      if (policy.archiveOldRuns) {
        toArchive.push(run);
      } else {
        toDelete.push(run);
      }
    } else if (exceedsCount || exceedsSize) {
      // Size or count exceeded: archive or delete
      if (policy.archiveOldRuns) {
        toArchive.push(run);
      } else {
        toDelete.push(run);
      }
    } else {
      // Keep this run
      toKeep.push(run);
      keptCount++;
      currentSize += run.sizeInBytes;
    }
  }

  return { toArchive, toDelete, toKeep };
}

/**
 * Calculate current storage usage
 */
export function calculateStorageUsage(runs: Array<{ sizeInBytes: number }>): {
  usedMB: number;
  runCount: number;
  artifactCount: number;
} {
  let totalBytes = 0;
  let totalArtifacts = 0;

  for (const run of runs) {
    totalBytes += run.sizeInBytes;
  }

  return {
    usedMB: Math.round((totalBytes / (1024 * 1024)) * 100) / 100,
    runCount: runs.length,
    artifactCount: totalArtifacts,
  };
}

/**
 * Get recommended retention policy based on storage usage
 */
export function getRecommendedRetentionPolicy(
  currentUsageMB: number,
  runCount: number,
): StorageRetentionPolicy {
  // Aggressive: high usage on both metrics
  if (currentUsageMB > 400 && runCount > 40) {
    return DEFAULT_RETENTION_POLICIES.aggressive;
  }

  // Aggressive: extreme usage on either metric
  if (currentUsageMB > 450 || runCount > 45) {
    return DEFAULT_RETENTION_POLICIES.aggressive;
  }

  // Balanced: moderate usage
  if (currentUsageMB > 250 || runCount > 25) {
    return DEFAULT_RETENTION_POLICIES.balanced;
  }

  // Conservative: low usage
  return DEFAULT_RETENTION_POLICIES.conservative;
}

/**
 * Export for testing
 */
export {
  calculateArtifactChecksum as _calculateArtifactChecksum,
  verifyArtifactIntegrity as _verifyArtifactIntegrity,
  generateArtifactManifest as _generateArtifactManifest,
  exportManifestAsJSON as _exportManifestAsJSON,
  evaluateRunsForArchival as _evaluateRunsForArchival,
  calculateStorageUsage as _calculateStorageUsage,
  getRecommendedRetentionPolicy as _getRecommendedRetentionPolicy,
};
