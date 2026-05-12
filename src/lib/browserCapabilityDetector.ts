/**
 * Browser Capability Detection and Fallback System
 *
 * Detects browser support for required APIs and provides degraded-mode fallbacks
 * TB-127: Safe fallback for browsers lacking required APIs
 * TB-128: Capability detection banner and degraded mode handling
 */

interface CapabilityCheckResult {
  api: string;
  supported: boolean;
  polyfillRequired: boolean;
  workaroundAvailable: boolean;
  fallbackMode: string;
  notes: string;
}

interface BrowserCapabilities {
  fileApi: boolean;
  indexedDb: boolean;
  webWorkers: boolean;
  serviceWorker: boolean;
  cryptoApi: boolean;
  streamApi: boolean;
  videoCodcs: boolean;
  audioCodcs: boolean;
  canvasApi: boolean;
  webAssembly: boolean;
  sharedArrayBuffer: boolean;
  blobyUrl: boolean;
}

interface BrowserProfile {
  userAgent: string;
  supportedAPIs: BrowserCapabilities;
  degradedMode: boolean;
  restrictions: string[];
  recommendedWorkarounds: string[];
}

/**
 * Check if FileAPI is supported
 */
export function checkFileApi(): CapabilityCheckResult {
  const supported =
    typeof File !== "undefined" &&
    typeof FileList !== "undefined" &&
    typeof Blob !== "undefined";

  return {
    api: "FileAPI",
    supported,
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "text-only",
    notes: supported
      ? "FileAPI fully supported"
      : "FileAPI not supported - file uploads disabled",
  };
}

/**
 * Check if IndexedDB is supported
 */
export function checkIndexedDb(): CapabilityCheckResult {
  const supported = !!(
    typeof window !== "undefined" &&
    (window.indexedDB ||
      (window as any).webkitIndexedDB ||
      (window as any).mozIndexedDB)
  );

  return {
    api: "IndexedDB",
    supported,
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "localStorage-only",
    notes: supported
      ? "IndexedDB available for large file caching"
      : "IndexedDB not available - using localStorage only (~5MB limit)",
  };
}

/**
 * Check if Web Workers are supported
 */
export function checkWebWorkers(): CapabilityCheckResult {
  const supported = typeof Worker !== "undefined";

  return {
    api: "Web Workers",
    supported,
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "main-thread",
    notes: supported
      ? "Web Workers available for background processing"
      : "Web Workers not available - processing on main thread (may impact responsiveness)",
  };
}

/**
 * Check if Service Worker is supported
 */
export function checkServiceWorker(): CapabilityCheckResult {
  const supported = !!(
    typeof navigator !== "undefined" && navigator.serviceWorker
  );

  return {
    api: "Service Worker",
    supported,
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "no-offline",
    notes: supported
      ? "Service Worker available for offline support"
      : "Service Worker not available - offline mode disabled",
  };
}

/**
 * Check if Crypto API is supported
 */
export function checkCryptoApi(): CapabilityCheckResult {
  const supported = !!(
    typeof crypto !== "undefined" &&
    crypto.subtle &&
    typeof crypto.getRandomValues === "function"
  );

  return {
    api: "Web Crypto API",
    supported,
    polyfillRequired: !supported,
    workaroundAvailable: true,
    fallbackMode: "insecure-random",
    notes: supported
      ? "Web Crypto API available for encryption"
      : "Web Crypto API not available - using weak random number generation",
  };
}

/**
 * Check if Streams API is supported
 */
export function checkStreamsApi(): CapabilityCheckResult {
  const supported = !!(
    typeof ReadableStream !== "undefined" &&
    typeof WritableStream !== "undefined"
  );

  return {
    api: "Streams API",
    supported,
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "chunked-processing",
    notes: supported
      ? "Streams API available for efficient large file handling"
      : "Streams API not available - using chunked array processing",
  };
}

/**
 * Check video codec support
 */
export function checkVideoCodecs(): CapabilityCheckResult {
  const supported = !!(
    typeof HTMLVideoElement !== "undefined" &&
    HTMLVideoElement.prototype.canPlayType
  );

  const canPlayWebM =
    supported &&
    HTMLVideoElement.prototype.canPlayType('video/webm;codecs="vp9,opus"');
  const canPlayH264 =
    supported &&
    HTMLVideoElement.prototype.canPlayType('video/mp4;codecs="avc1.42E01E"');

  return {
    api: "Video Codecs (WebM/H.264)",
    supported: !!(canPlayWebM || canPlayH264),
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "no-video",
    notes: canPlayWebM
      ? "WebM codec supported (modern browsers)"
      : canPlayH264
        ? "H.264 codec supported (Safari/iOS)"
        : "No supported video codecs - video tools disabled",
  };
}

/**
 * Check audio codec support
 */
export function checkAudioCodecs(): CapabilityCheckResult {
  const supported = !!(
    typeof HTMLAudioElement !== "undefined" &&
    HTMLAudioElement.prototype.canPlayType
  );

  const canPlayMp3 =
    supported && HTMLAudioElement.prototype.canPlayType("audio/mpeg;");
  const canPlayWav =
    supported && HTMLAudioElement.prototype.canPlayType("audio/wav;");
  const canPlayOpus =
    supported && HTMLAudioElement.prototype.canPlayType("audio/opus;");

  return {
    api: "Audio Codecs (MP3/WAV/Opus)",
    supported: !!(canPlayMp3 || canPlayWav || canPlayOpus),
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "no-audio",
    notes:
      canPlayMp3 || canPlayWav || canPlayOpus
        ? "Audio codecs supported"
        : "No supported audio codecs - audio tools may have limited functionality",
  };
}

/**
 * Check Canvas API support
 */
export function checkCanvasApi(): CapabilityCheckResult {
  const supported = !!(
    typeof HTMLCanvasElement !== "undefined" &&
    typeof CanvasRenderingContext2D !== "undefined"
  );

  return {
    api: "Canvas API",
    supported,
    polyfillRequired: false,
    workaroundAvailable: false,
    fallbackMode: "no-preview",
    notes: supported
      ? "Canvas API available for image/graphics tools"
      : "Canvas API not supported - image preview tools disabled",
  };
}

/**
 * Check WebAssembly support
 */
export function checkWebAssembly(): CapabilityCheckResult {
  const supported = !!(
    typeof WebAssembly !== "undefined" &&
    typeof WebAssembly.instantiate === "function"
  );

  return {
    api: "WebAssembly",
    supported,
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "javascript-only",
    notes: supported
      ? "WebAssembly available for high-performance computing"
      : "WebAssembly not supported - using pure JavaScript (slower)",
  };
}

/**
 * Check SharedArrayBuffer support (for multi-threaded processing)
 */
export function checkSharedArrayBuffer(): CapabilityCheckResult {
  const supported = !!(typeof SharedArrayBuffer !== "undefined");

  return {
    api: "SharedArrayBuffer",
    supported,
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "no-shared-memory",
    notes: supported
      ? "SharedArrayBuffer available for multi-threaded processing"
      : "SharedArrayBuffer not supported - multi-threaded operations unavailable",
  };
}

/**
 * Check Blob URL support
 */
export function checkBlobUrl(): CapabilityCheckResult {
  const supported = !!(
    typeof URL !== "undefined" && typeof URL.createObjectURL === "function"
  );

  return {
    api: "Blob URLs (URL.createObjectURL)",
    supported,
    polyfillRequired: false,
    workaroundAvailable: true,
    fallbackMode: "data-urls",
    notes: supported
      ? "Blob URLs available for efficient file preview"
      : "Blob URLs not supported - using data URLs (memory intensive)",
  };
}

/**
 * Check all browser capabilities
 */
export function checkAllCapabilities(): BrowserCapabilities {
  return {
    fileApi: checkFileApi().supported,
    indexedDb: checkIndexedDb().supported,
    webWorkers: checkWebWorkers().supported,
    serviceWorker: checkServiceWorker().supported,
    cryptoApi: checkCryptoApi().supported,
    streamApi: checkStreamsApi().supported,
    videoCodcs: checkVideoCodecs().supported,
    audioCodcs: checkAudioCodecs().supported,
    canvasApi: checkCanvasApi().supported,
    webAssembly: checkWebAssembly().supported,
    sharedArrayBuffer: checkSharedArrayBuffer().supported,
    blobyUrl: checkBlobUrl().supported,
  };
}

/**
 * Generate browser profile
 */
export function generateBrowserProfile(): BrowserProfile {
  const capabilities = checkAllCapabilities();

  // Determine if degraded mode is needed
  const criticalAPIs = ["fileApi", "canvasApi"];
  const degradedMode = criticalAPIs.some(
    (api) => !capabilities[api as keyof BrowserCapabilities],
  );

  // List restrictions
  const restrictions: string[] = [];
  if (!capabilities.fileApi) restrictions.push("File uploads disabled");
  if (!capabilities.indexedDb)
    restrictions.push("Large file caching disabled (5MB localStorage limit)");
  if (!capabilities.webWorkers)
    restrictions.push("Background processing unavailable");
  if (!capabilities.serviceWorker)
    restrictions.push("Offline mode unavailable");
  if (!capabilities.cryptoApi)
    restrictions.push("Weak encryption (no Web Crypto API)");
  if (!capabilities.videoCodcs) restrictions.push("Video tools disabled");
  if (!capabilities.audioCodcs) restrictions.push("Audio tools limited");
  if (!capabilities.canvasApi)
    restrictions.push("Image preview tools disabled");
  if (!capabilities.webAssembly)
    restrictions.push("Performance degradation (no WebAssembly)");
  if (!capabilities.blobyUrl)
    restrictions.push("File preview using data URLs (memory intensive)");

  // List recommended workarounds
  const workarounds: string[] = [];
  if (!capabilities.webWorkers)
    workarounds.push("Consider upgrading browser for better performance");
  if (!capabilities.serviceWorker)
    workarounds.push("Consider using a modern browser for offline support");
  if (!capabilities.cryptoApi)
    workarounds.push("Consider upgrading browser for secure encryption");
  if (!capabilities.webAssembly)
    workarounds.push(
      "Consider using Chrome, Firefox, or Safari for better performance",
    );

  return {
    userAgent:
      typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
    supportedAPIs: capabilities,
    degradedMode,
    restrictions,
    recommendedWorkarounds: workarounds,
  };
}

/**
 * Generate capability report
 */
export function generateCapabilityReport(profile: BrowserProfile): string {
  const lines: string[] = [];

  lines.push("# Browser Capability Report\n");
  lines.push(`**User Agent**: ${profile.userAgent}\n`);

  if (profile.degradedMode) {
    lines.push(
      "⚠️ **Degraded Mode Enabled** - Some features are unavailable\n",
    );
  } else {
    lines.push("✅ **Full Mode** - All features available\n");
  }

  lines.push("## Supported APIs");
  Object.entries(profile.supportedAPIs).forEach(([api, supported]) => {
    const icon = supported ? "✅" : "❌";
    lines.push(`- ${icon} ${api}`);
  });
  lines.push("");

  if (profile.restrictions.length > 0) {
    lines.push("## Restrictions");
    profile.restrictions.forEach((restriction) => {
      lines.push(`- ${restriction}`);
    });
    lines.push("");
  }

  if (profile.recommendedWorkarounds.length > 0) {
    lines.push("## Recommended Workarounds");
    profile.recommendedWorkarounds.forEach((workaround) => {
      lines.push(`- ${workaround}`);
    });
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Export for testing
 */
export {
  checkFileApi as _checkFileApi,
  checkIndexedDb as _checkIndexedDb,
  checkWebWorkers as _checkWebWorkers,
  checkServiceWorker as _checkServiceWorker,
  checkCryptoApi as _checkCryptoApi,
  checkStreamsApi as _checkStreamsApi,
  checkVideoCodecs as _checkVideoCodecs,
  checkAudioCodecs as _checkAudioCodecs,
  checkCanvasApi as _checkCanvasApi,
  checkWebAssembly as _checkWebAssembly,
  checkSharedArrayBuffer as _checkSharedArrayBuffer,
  checkBlobUrl as _checkBlobUrl,
  checkAllCapabilities as _checkAllCapabilities,
  generateBrowserProfile as _generateBrowserProfile,
  generateCapabilityReport as _generateCapabilityReport,
};
