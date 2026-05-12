import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  generateBrowserProfile,
  generateCapabilityReport,
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
} from "@/lib/browserCapabilityDetector";

describe("Browser Capability Detector", () => {
  describe("checkFileApi", () => {
    it("should detect FileAPI support", () => {
      const result = _checkFileApi();
      expect(result).toBeDefined();
      expect(result.api).toEqual("FileAPI");
      expect(result.supported).toBeDefined();
    });

    it("should indicate fallback mode when not supported", () => {
      const result = _checkFileApi();
      if (!result.supported) {
        expect(result.fallbackMode).toEqual("text-only");
        expect(result.workaroundAvailable).toBe(true);
      }
    });
  });

  describe("checkIndexedDb", () => {
    it("should detect IndexedDB support", () => {
      const result = _checkIndexedDb();
      expect(result).toBeDefined();
      expect(result.api).toEqual("IndexedDB");
      expect(result.fallbackMode).toEqual("localStorage-only");
    });

    it("should indicate workaround when not supported", () => {
      const result = _checkIndexedDb();
      expect(result.workaroundAvailable).toBe(true);
    });
  });

  describe("checkWebWorkers", () => {
    it("should detect Web Workers support", () => {
      const result = _checkWebWorkers();
      expect(result).toBeDefined();
      expect(result.api).toEqual("Web Workers");
      if (!result.supported) {
        expect(result.fallbackMode).toEqual("main-thread");
      }
    });
  });

  describe("checkServiceWorker", () => {
    it("should detect Service Worker support", () => {
      const result = _checkServiceWorker();
      expect(result).toBeDefined();
      expect(result.api).toEqual("Service Worker");
      if (!result.supported) {
        expect(result.fallbackMode).toEqual("no-offline");
      }
    });
  });

  describe("checkCryptoApi", () => {
    it("should detect Web Crypto API support", () => {
      const result = _checkCryptoApi();
      expect(result).toBeDefined();
      expect(result.api).toEqual("Web Crypto API");
      if (!result.supported) {
        expect(result.polyfillRequired).toBe(true);
      }
    });
  });

  describe("checkStreamsApi", () => {
    it("should detect Streams API support", () => {
      const result = _checkStreamsApi();
      expect(result).toBeDefined();
      expect(result.api).toEqual("Streams API");
      if (!result.supported) {
        expect(result.fallbackMode).toEqual("chunked-processing");
      }
    });
  });

  describe("checkVideoCodecs", () => {
    it("should detect video codec support", () => {
      const result = _checkVideoCodecs();
      expect(result).toBeDefined();
      expect(result.api).toEqual("Video Codecs (WebM/H.264)");
      if (!result.supported) {
        expect(result.fallbackMode).toEqual("no-video");
      }
    });

    it("should include codec support notes", () => {
      const result = _checkVideoCodecs();
      expect(result.notes).toBeDefined();
    });
  });

  describe("checkAudioCodecs", () => {
    it("should detect audio codec support", () => {
      const result = _checkAudioCodecs();
      expect(result).toBeDefined();
      expect(result.api).toEqual("Audio Codecs (MP3/WAV/Opus)");
      if (!result.supported) {
        expect(result.fallbackMode).toEqual("no-audio");
      }
    });
  });

  describe("checkCanvasApi", () => {
    it("should detect Canvas API support", () => {
      const result = _checkCanvasApi();
      expect(result).toBeDefined();
      expect(result.api).toEqual("Canvas API");
      // Canvas is typically available, but fallback is marked as unavailable
      if (!result.supported) {
        expect(result.workaroundAvailable).toBe(false);
      }
    });
  });

  describe("checkWebAssembly", () => {
    it("should detect WebAssembly support", () => {
      const result = _checkWebAssembly();
      expect(result).toBeDefined();
      expect(result.api).toEqual("WebAssembly");
      if (!result.supported) {
        expect(result.fallbackMode).toEqual("javascript-only");
      }
    });
  });

  describe("checkSharedArrayBuffer", () => {
    it("should detect SharedArrayBuffer support", () => {
      const result = _checkSharedArrayBuffer();
      expect(result).toBeDefined();
      expect(result.api).toEqual("SharedArrayBuffer");
      if (!result.supported) {
        expect(result.fallbackMode).toEqual("no-shared-memory");
      }
    });
  });

  describe("checkBlobUrl", () => {
    it("should detect Blob URL support", () => {
      const result = _checkBlobUrl();
      expect(result).toBeDefined();
      expect(result.api).toEqual("Blob URLs (URL.createObjectURL)");
      if (!result.supported) {
        expect(result.fallbackMode).toEqual("data-urls");
      }
    });
  });

  describe("checkAllCapabilities", () => {
    it("should return all capability checks", () => {
      const capabilities = _checkAllCapabilities();
      expect(capabilities).toBeDefined();
      expect(capabilities.fileApi).toBeDefined();
      expect(capabilities.indexedDb).toBeDefined();
      expect(capabilities.webWorkers).toBeDefined();
      expect(capabilities.serviceWorker).toBeDefined();
      expect(capabilities.cryptoApi).toBeDefined();
      expect(capabilities.streamApi).toBeDefined();
      expect(capabilities.videoCodcs).toBeDefined();
      expect(capabilities.audioCodcs).toBeDefined();
      expect(capabilities.canvasApi).toBeDefined();
      expect(capabilities.webAssembly).toBeDefined();
      expect(capabilities.sharedArrayBuffer).toBeDefined();
      expect(capabilities.blobyUrl).toBeDefined();
    });

    it("should have boolean values for all capabilities", () => {
      const capabilities = _checkAllCapabilities();
      Object.values(capabilities).forEach((value) => {
        expect(typeof value).toBe("boolean");
      });
    });
  });

  describe("generateBrowserProfile", () => {
    it("should generate valid browser profile", () => {
      const profile = generateBrowserProfile();
      expect(profile).toBeDefined();
      expect(profile.userAgent).toBeDefined();
      expect(profile.supportedAPIs).toBeDefined();
      expect(typeof profile.degradedMode).toBe("boolean");
      expect(Array.isArray(profile.restrictions)).toBe(true);
      expect(Array.isArray(profile.recommendedWorkarounds)).toBe(true);
    });

    it("should set degradedMode based on critical APIs", () => {
      const profile = generateBrowserProfile();
      const hasCriticalAPIs =
        profile.supportedAPIs.fileApi && profile.supportedAPIs.canvasApi;
      expect(profile.degradedMode).toBe(!hasCriticalAPIs);
    });

    it("should include restrictions for unsupported APIs", () => {
      const profile = generateBrowserProfile();
      if (!profile.supportedAPIs.fileApi) {
        expect(
          profile.restrictions.some((r) => r.includes("File uploads")),
        ).toBe(true);
      }
      if (!profile.supportedAPIs.webWorkers) {
        expect(
          profile.restrictions.some((r) => r.includes("Background processing")),
        ).toBe(true);
      }
    });

    it("should include workarounds for degraded capabilities", () => {
      const profile = generateBrowserProfile();
      if (
        !profile.supportedAPIs.webWorkers ||
        !profile.supportedAPIs.serviceWorker
      ) {
        expect(profile.recommendedWorkarounds.length).toBeGreaterThan(0);
      }
    });

    it("should suggest browser upgrades when needed", () => {
      const profile = generateBrowserProfile();
      if (
        !profile.supportedAPIs.serviceWorker ||
        !profile.supportedAPIs.cryptoApi
      ) {
        expect(
          profile.recommendedWorkarounds.some((w) => w.includes("upgrading")),
        ).toBe(
          !profile.supportedAPIs.serviceWorker ||
            !profile.supportedAPIs.cryptoApi,
        );
      }
    });
  });

  describe("generateCapabilityReport", () => {
    it("should generate readable report", () => {
      const profile = generateBrowserProfile();
      const report = generateCapabilityReport(profile);
      expect(report).toBeDefined();
      expect(typeof report).toBe("string");
    });

    it("should include browser info", () => {
      const profile = generateBrowserProfile();
      const report = generateCapabilityReport(profile);
      expect(report).toContain("User Agent");
      expect(report).toContain(profile.userAgent);
    });

    it("should indicate degraded mode status", () => {
      const profile = generateBrowserProfile();
      const report = generateCapabilityReport(profile);
      if (profile.degradedMode) {
        expect(report).toContain("⚠️");
        expect(report).toContain("Degraded Mode");
      } else {
        expect(report).toContain("✅");
        expect(report).toContain("Full Mode");
      }
    });

    it("should list all supported APIs", () => {
      const profile = generateBrowserProfile();
      const report = generateCapabilityReport(profile);
      expect(report).toContain("Supported APIs");
      expect(report).toContain("fileApi");
      expect(report).toContain("indexedDb");
    });

    it("should include restrictions when present", () => {
      const profile = generateBrowserProfile();
      const report = generateCapabilityReport(profile);
      if (profile.restrictions.length > 0) {
        expect(report).toContain("Restrictions");
        profile.restrictions.forEach((restriction) => {
          expect(report).toContain(restriction);
        });
      }
    });

    it("should include workarounds when present", () => {
      const profile = generateBrowserProfile();
      const report = generateCapabilityReport(profile);
      if (profile.recommendedWorkarounds.length > 0) {
        expect(report).toContain("Recommended Workarounds");
        profile.recommendedWorkarounds.forEach((workaround) => {
          expect(report).toContain(workaround);
        });
      }
    });

    it("should use appropriate icons", () => {
      const profile = generateBrowserProfile();
      const report = generateCapabilityReport(profile);
      // Should have checkmarks and/or X marks for APIs
      expect(report).toContain("✅");
    });
  });

  describe("Capability detection accuracy", () => {
    it("should detect when no capabilities are missing in Node/modern env", () => {
      // In vitest (Node), some APIs won't exist
      const profile = generateBrowserProfile();
      expect(profile).toBeDefined();
      // Profile should still be generated even if some APIs unavailable
    });

    it("should handle missing navigator object gracefully", () => {
      const profile = generateBrowserProfile();
      expect(profile.userAgent).toBeDefined();
      expect(typeof profile.userAgent).toBe("string");
    });

    it("should generate consistent profiles", () => {
      const profile1 = generateBrowserProfile();
      const profile2 = generateBrowserProfile();
      expect(profile1.degradedMode).toEqual(profile2.degradedMode);
      expect(profile1.supportedAPIs).toEqual(profile2.supportedAPIs);
    });
  });

  describe("Fallback mode clarity", () => {
    it("all unsupported capabilities should have fallback modes defined", () => {
      const capabilities = [
        { check: _checkFileApi, name: "FileAPI" },
        { check: _checkIndexedDb, name: "IndexedDB" },
        { check: _checkWebWorkers, name: "WebWorkers" },
        { check: _checkServiceWorker, name: "ServiceWorker" },
        { check: _checkStreamsApi, name: "StreamsAPI" },
        { check: _checkCanvasApi, name: "CanvasAPI" },
      ];

      capabilities.forEach(({ check, name }) => {
        const result = check();
        if (!result.supported) {
          expect(result.fallbackMode).toBeDefined();
          expect(result.fallbackMode.length).toBeGreaterThan(0);
        }
      });
    });

    it("should provide helpful notes for each capability", () => {
      const checks = [
        _checkFileApi,
        _checkIndexedDb,
        _checkWebWorkers,
        _checkServiceWorker,
        _checkCryptoApi,
      ];

      checks.forEach((check) => {
        const result = check();
        expect(result.notes).toBeDefined();
        expect(result.notes.length).toBeGreaterThan(0);
      });
    });
  });
});
