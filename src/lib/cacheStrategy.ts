/**
 * TB-131: Cache strategy for static workflow/template content assets
 * Implements cache-busting, TTL-based expiration, and storage optimization
 */

export type CacheStrategy = "aggressive" | "balanced" | "conservative";
export type CacheEntryType =
  | "workflow"
  | "template"
  | "asset"
  | "metadata"
  | "index";

export interface CacheEntry {
  /** Unique cache key */
  key: string;
  /** Type of cached content */
  type: CacheEntryType;
  /** Cached content */
  data: unknown;
  /** When entry was cached */
  createdAt: Date;
  /** When entry should expire (TTL-based) */
  expiresAt: Date;
  /** Entity hash/version for cache busting */
  hash: string;
  /** Size in bytes */
  size: number;
  /** Access count since creation */
  accessCount: number;
  /** Last accessed timestamp */
  lastAccessedAt: Date;
  /** Whether this is a critical/pinned cache entry */
  isPinned: boolean;
}

export interface CacheMetadata {
  /** Total items in cache */
  totalEntries: number;
  /** Total size in bytes */
  totalSize: number;
  /** Cache hit rate (0-1) */
  hitRate: number;
  /** Total hits */
  totalHits: number;
  /** Total misses */
  totalMisses: number;
  /** Average entry age (ms) */
  averageAge: number;
  /** Last cleanup timestamp */
  lastCleanupAt: Date | null;
}

export interface CacheStrategyConfig {
  /** Strategy type */
  strategy: CacheStrategy;
  /** Max cache size (MB) */
  maxSize: number;
  /** Base TTL in milliseconds */
  baseTtl: number;
  /** Max entries to keep */
  maxEntries: number;
  /** Whether to persist to IndexedDB */
  persistToIndexedDb: boolean;
  /** Cleanup interval (ms) */
  cleanupInterval: number;
  /** Enable cache busting on version change */
  enableCacheBusting: boolean;
}

export interface CacheStats {
  /** Current cache size (bytes) */
  size: number;
  /** Entry count */
  entries: number;
  /** Hit ratio */
  hitRatio: number;
  /** Most accessed key */
  mostAccessedKey: string | null;
  /** Least accessed key */
  leastAccessedKey: string | null;
}

export const DEFAULT_CACHE_STRATEGIES: Record<
  CacheStrategy,
  CacheStrategyConfig
> = {
  aggressive: {
    strategy: "aggressive",
    maxSize: 50, // 50MB
    baseTtl: 24 * 60 * 60 * 1000, // 24 hours
    maxEntries: 500,
    persistToIndexedDb: true,
    cleanupInterval: 60 * 60 * 1000, // 1 hour
    enableCacheBusting: true,
  },
  balanced: {
    strategy: "balanced",
    maxSize: 20, // 20MB
    baseTtl: 6 * 60 * 60 * 1000, // 6 hours
    maxEntries: 200,
    persistToIndexedDb: true,
    cleanupInterval: 30 * 60 * 1000, // 30 minutes
    enableCacheBusting: true,
  },
  conservative: {
    strategy: "conservative",
    maxSize: 5, // 5MB
    baseTtl: 1 * 60 * 60 * 1000, // 1 hour
    maxEntries: 50,
    persistToIndexedDb: false,
    cleanupInterval: 10 * 60 * 1000, // 10 minutes
    enableCacheBusting: true,
  },
};

export interface Cache {
  /** Map of cache entries */
  entries: Map<string, CacheEntry>;
  /** Configuration */
  config: CacheStrategyConfig;
  /** Metadata */
  metadata: CacheMetadata;
  /** Whether cache is enabled */
  isEnabled: boolean;
}

/**
 * Initialize cache with specified strategy
 */
export function _initializeCache(strategy: CacheStrategy = "balanced"): Cache {
  // Clone strategy config to avoid cross-test or cross-instance mutation leakage.
  const config = { ...DEFAULT_CACHE_STRATEGIES[strategy] };

  return {
    entries: new Map(),
    config,
    metadata: {
      totalEntries: 0,
      totalSize: 0,
      hitRate: 0,
      totalHits: 0,
      totalMisses: 0,
      averageAge: 0,
      lastCleanupAt: null,
    },
    isEnabled: true,
  };
}

/**
 * Add or update cache entry
 */
export function _setCacheEntry(
  cache: Cache,
  key: string,
  data: unknown,
  type: CacheEntryType = "asset",
  hash: string = "",
  isPinned: boolean = false,
): { success: boolean; message: string } {
  if (!cache.isEnabled) {
    return { success: false, message: "Cache is disabled" };
  }

  const dataSize = JSON.stringify(data).length;
  const now = new Date();
  const ttl =
    type === "index" ? cache.config.baseTtl : cache.config.baseTtl * 0.75;

  // Check if adding this entry would exceed max size
  const currentSize = cache.metadata.totalSize;
  if (currentSize + dataSize > cache.config.maxSize * 1024 * 1024) {
    return {
      success: false,
      message: `Cache size limit exceeded (${cache.config.maxSize}MB)`,
    };
  }

  // Check if adding this entry would exceed max entries
  if (
    cache.entries.size >= cache.config.maxEntries &&
    !cache.entries.has(key)
  ) {
    return {
      success: false,
      message: `Cache entry limit exceeded (${cache.config.maxEntries})`,
    };
  }

  const entry: CacheEntry = {
    key,
    type,
    data,
    createdAt: now,
    expiresAt: new Date(now.getTime() + ttl),
    hash,
    size: dataSize,
    accessCount: 0,
    lastAccessedAt: now,
    isPinned,
  };

  // If replacing, subtract old size
  if (cache.entries.has(key)) {
    const oldEntry = cache.entries.get(key)!;
    cache.metadata.totalSize -= oldEntry.size;
  }

  cache.entries.set(key, entry);
  cache.metadata.totalSize += dataSize;
  cache.metadata.totalEntries = cache.entries.size;

  return { success: true, message: `Cache entry set: ${key}` };
}

/**
 * Get cache entry
 */
export function _getCacheEntry(cache: Cache, key: string): CacheEntry | null {
  const entry = cache.entries.get(key);

  if (!entry) {
    cache.metadata.totalMisses++;
    return null;
  }

  // Check if expired
  if (new Date() > entry.expiresAt) {
    cache.entries.delete(key);
    cache.metadata.totalSize -= entry.size;
    cache.metadata.totalEntries = cache.entries.size;
    cache.metadata.totalMisses++;
    return null;
  }

  // Update access info
  entry.accessCount++;
  entry.lastAccessedAt = new Date();
  cache.metadata.totalHits++;

  // Recalculate hit rate
  const total = cache.metadata.totalHits + cache.metadata.totalMisses;
  cache.metadata.hitRate = total > 0 ? cache.metadata.totalHits / total : 0;

  return entry;
}

/**
 * Remove cache entry
 */
export function _deleteCacheEntry(
  cache: Cache,
  key: string,
): { success: boolean; message: string } {
  const entry = cache.entries.get(key);

  if (!entry) {
    return { success: false, message: `Cache entry not found: ${key}` };
  }

  cache.entries.delete(key);
  cache.metadata.totalSize -= entry.size;
  cache.metadata.totalEntries = cache.entries.size;

  return { success: true, message: `Cache entry deleted: ${key}` };
}

/**
 * Clear entire cache
 */
export function _clearCache(cache: Cache): Cache {
  return {
    ...cache,
    entries: new Map(),
    metadata: {
      totalEntries: 0,
      totalSize: 0,
      hitRate: 0,
      totalHits: 0,
      totalMisses: 0,
      averageAge: 0,
      lastCleanupAt: new Date(),
    },
  };
}

/**
 * Cleanup expired entries
 */
export function _cleanupExpiredEntries(cache: Cache): Cache {
  const now = new Date();
  const expiredKeys: string[] = [];

  for (const [key, entry] of cache.entries.entries()) {
    if (now > entry.expiresAt && !entry.isPinned) {
      expiredKeys.push(key);
    }
  }

  let totalSizeFreed = 0;

  for (const key of expiredKeys) {
    const entry = cache.entries.get(key)!;
    totalSizeFreed += entry.size;
    cache.entries.delete(key);
  }

  return {
    ...cache,
    metadata: {
      ...cache.metadata,
      totalSize: cache.metadata.totalSize - totalSizeFreed,
      totalEntries: cache.entries.size,
      lastCleanupAt: new Date(),
    },
  };
}

/**
 * Evict least-used entries when cache is full
 */
export function _evictLeastUsed(cache: Cache, targetSize: number): Cache {
  const targetBytes = targetSize * 1024 * 1024;

  if (cache.metadata.totalSize <= targetBytes) {
    return cache;
  }

  // Sort entries by access count (ascending) and age (newest first for same access count)
  const sortedEntries = Array.from(cache.entries.values())
    .filter((e) => !e.isPinned)
    .sort((a, b) => {
      if (a.accessCount !== b.accessCount) {
        return a.accessCount - b.accessCount;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  let freedSize = 0;
  const entriesToRemove: string[] = [];

  for (const entry of sortedEntries) {
    if (cache.metadata.totalSize - freedSize <= targetBytes) {
      break;
    }
    entriesToRemove.push(entry.key);
    freedSize += entry.size;
  }

  // Remove the identified entries
  for (const key of entriesToRemove) {
    cache.entries.delete(key);
  }

  return {
    ...cache,
    metadata: {
      ...cache.metadata,
      totalSize: cache.metadata.totalSize - freedSize,
      totalEntries: cache.entries.size,
    },
  };
}

/**
 * Check if entry needs cache busting
 */
export function _shouldBustCache(
  cache: Cache,
  key: string,
  newHash: string,
): boolean {
  if (!cache.config.enableCacheBusting) {
    return false;
  }

  const entry = cache.entries.get(key);
  if (!entry) {
    return false; // No cache to bust
  }

  return entry.hash !== newHash && newHash.length > 0;
}

/**
 * Bust cache for entry
 */
export function _bustCache(
  cache: Cache,
  key: string,
): { success: boolean; message: string } {
  return _deleteCacheEntry(cache, key);
}

/**
 * Bust cache by type (e.g., all workflow caches)
 */
export function _bustCacheByType(cache: Cache, type: CacheEntryType): number {
  const entriesToDelete: string[] = [];

  for (const [key, entry] of cache.entries.entries()) {
    if (entry.type === type && !entry.isPinned) {
      entriesToDelete.push(key);
    }
  }

  let freedSize = 0;

  for (const key of entriesToDelete) {
    const entry = cache.entries.get(key)!;
    freedSize += entry.size;
    cache.entries.delete(key);
  }

  cache.metadata.totalSize -= freedSize;
  cache.metadata.totalEntries = cache.entries.size;

  return entriesToDelete.length;
}

/**
 * Get cache statistics
 */
export function _getCacheStats(cache: Cache): CacheStats {
  let mostAccessedKey: string | null = null;
  let leastAccessedKey: string | null = null;
  let maxAccess = -1;
  let minAccess = Number.MAX_SAFE_INTEGER;

  for (const [key, entry] of cache.entries.entries()) {
    if (entry.accessCount > maxAccess) {
      maxAccess = entry.accessCount;
      mostAccessedKey = key;
    }
    if (entry.accessCount < minAccess) {
      minAccess = entry.accessCount;
      leastAccessedKey = key;
    }
  }

  return {
    size: cache.metadata.totalSize,
    entries: cache.metadata.totalEntries,
    hitRatio: cache.metadata.hitRate,
    mostAccessedKey,
    leastAccessedKey:
      minAccess === Number.MAX_SAFE_INTEGER ? null : leastAccessedKey,
  };
}

/**
 * Enable cache
 */
export function _enableCache(cache: Cache): Cache {
  return { ...cache, isEnabled: true };
}

/**
 * Disable cache
 */
export function _disableCache(cache: Cache): Cache {
  return { ...cache, isEnabled: false };
}

/**
 * Update cache strategy
 */
export function _changeCacheStrategy(
  cache: Cache,
  newStrategy: CacheStrategy,
): Cache {
  const newConfig = DEFAULT_CACHE_STRATEGIES[newStrategy];

  // If new max size is smaller, evict entries
  let updatedCache = cache;
  if (newConfig.maxSize < cache.config.maxSize) {
    updatedCache = _evictLeastUsed(cache, newConfig.maxSize);
  }

  return {
    ...updatedCache,
    config: newConfig,
  };
}

/**
 * Get cache entry by type and pattern
 */
export function _searchCacheByType(
  cache: Cache,
  type: CacheEntryType,
): CacheEntry[] {
  const results: CacheEntry[] = [];

  for (const entry of cache.entries.values()) {
    if (entry.type === type && new Date() <= entry.expiresAt) {
      results.push(entry);
    }
  }

  return results;
}

/**
 * Pin critical entry to prevent eviction
 */
export function _pinCacheEntry(
  cache: Cache,
  key: string,
): { success: boolean; message: string } {
  const entry = cache.entries.get(key);

  if (!entry) {
    return { success: false, message: `Cache entry not found: ${key}` };
  }

  entry.isPinned = true;
  return { success: true, message: `Cache entry pinned: ${key}` };
}

/**
 * Unpin cache entry
 */
export function _unpinCacheEntry(
  cache: Cache,
  key: string,
): { success: boolean; message: string } {
  const entry = cache.entries.get(key);

  if (!entry) {
    return { success: false, message: `Cache entry not found: ${key}` };
  }

  entry.isPinned = false;
  return { success: true, message: `Cache entry unpinned: ${key}` };
}

/**
 * Get cache size in human-readable format
 */
export function _formatCacheSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}
