import { describe, it, expect } from "vitest";
import {
  _initializeEmbedConfig,
  _isOriginAllowed,
  _validateEmbedRequest,
  _getSecurityHeaders,
  _getEmbedUrl,
  _generateEmbedIframe,
  _getEmbedCodeSnippet,
  _logEmbedAccess,
  _getEmbedStatistics,
  _validateOriginSecurity,
  _generateEmbedManifest,
  DEFAULT_EMBED_CONFIG,
} from "@/lib/embedConfig";

describe("Embed Mode Configuration (TB-137 & TB-138)", () => {
  describe("Embed Config Initialization", () => {
    it("should initialize with defaults", () => {
      const config = _initializeEmbedConfig();

      expect(config.enabled).toBe(true);
      expect(config.workflows.length).toBeGreaterThan(0);
      expect(config.securityPolicy.requireHttps).toBe(true);
    });

    it("should allow custom configuration", () => {
      const config = _initializeEmbedConfig({
        enabled: false,
      });

      expect(config.enabled).toBe(false);
    });

    it("should include default workflows", () => {
      const config = _initializeEmbedConfig();

      expect(config.workflows.some((w) => w.slug === "csv-to-json")).toBe(true);
      expect(config.workflows.some((w) => w.slug === "json-formatter")).toBe(
        true,
      );
    });
  });

  describe("Origin Validation", () => {
    it("should allow wildcard origins", () => {
      const config = _initializeEmbedConfig();

      const allowed = _isOriginAllowed(
        "csv-to-json",
        "https://example.com",
        config,
      );

      expect(allowed).toBe(true);
    });

    it("should allow specific origins", () => {
      const config = _initializeEmbedConfig({
        workflows: [
          {
            slug: "test-tool",
            name: "Test",
            isEmbeddable: true,
            allowedOrigins: ["https://trusted.com"],
            sandboxAttributes: ["allow-scripts"],
            description: "Test",
            category: "test",
          },
        ],
      });

      expect(_isOriginAllowed("test-tool", "https://trusted.com", config)).toBe(
        true,
      );
      expect(
        _isOriginAllowed("test-tool", "https://untrusted.com", config),
      ).toBe(false);
    });

    it("should allow wildcard domain matching", () => {
      const config = _initializeEmbedConfig({
        workflows: [
          {
            slug: "test-tool",
            name: "Test",
            isEmbeddable: true,
            allowedOrigins: ["*.example.com"],
            sandboxAttributes: ["allow-scripts"],
            description: "Test",
            category: "test",
          },
        ],
      });

      expect(
        _isOriginAllowed("test-tool", "https://sub.example.com", config),
      ).toBe(true);
      expect(_isOriginAllowed("test-tool", "https://other.com", config)).toBe(
        false,
      );
    });

    it("should reject non-embeddable workflows", () => {
      const config = _initializeEmbedConfig({
        workflows: [
          {
            slug: "private-tool",
            name: "Private",
            isEmbeddable: false,
            allowedOrigins: ["*"],
            sandboxAttributes: [],
            description: "Private",
            category: "private",
          },
        ],
      });

      const allowed = _isOriginAllowed(
        "private-tool",
        "https://example.com",
        config,
      );

      expect(allowed).toBe(false);
    });
  });

  describe("Embed Request Validation", () => {
    it("should validate allowed requests", () => {
      const config = _initializeEmbedConfig();

      const result = _validateEmbedRequest(
        {
          workflowSlug: "csv-to-json",
          origin: "https://example.com",
          timestamp: new Date(),
        },
        config,
      );

      expect(result.allowed).toBe(true);
    });

    it("should reject when embed mode disabled", () => {
      const config = _initializeEmbedConfig({ enabled: false });

      const result = _validateEmbedRequest(
        {
          workflowSlug: "csv-to-json",
          origin: "https://example.com",
          timestamp: new Date(),
        },
        config,
      );

      expect(result.allowed).toBe(false);
    });

    it("should reject HTTP when HTTPS required", () => {
      const config = _initializeEmbedConfig();

      const result = _validateEmbedRequest(
        {
          workflowSlug: "csv-to-json",
          origin: "http://example.com",
          timestamp: new Date(),
          referrer: "http://example.com/page",
        },
        config,
      );

      expect(result.allowed).toBe(false);
    });

    it("should provide appropriate security headers", () => {
      const config = _initializeEmbedConfig();

      const result = _validateEmbedRequest(
        {
          workflowSlug: "csv-to-json",
          origin: "https://example.com",
          timestamp: new Date(),
        },
        config,
      );

      expect(result.securityHeaders["X-Frame-Options"]).toBeTruthy();
      expect(result.securityHeaders["Content-Security-Policy"]).toBeTruthy();
    });
  });

  describe("Security Headers", () => {
    it("should generate restrictive headers for denied access", () => {
      const headers = _getSecurityHeaders(false);

      expect(headers["X-Frame-Options"]).toEqual("DENY");
      expect(headers["Content-Security-Policy"]).toContain(
        "default-src 'none'",
      );
    });

    it("should generate permissive headers for allowed access", () => {
      const config = _initializeEmbedConfig();
      const workflow = config.workflows[0];

      const headers = _getSecurityHeaders(true, workflow);

      expect(headers["X-Frame-Options"]).toEqual("ALLOW-FROM");
      expect(headers["Content-Security-Policy"]).toContain("frame-ancestors");
    });

    it("should include permission policy headers", () => {
      const headers = _getSecurityHeaders(false);

      expect(headers["Permissions-Policy"]).toContain("geolocation=()");
      expect(headers["Permissions-Policy"]).toContain("camera=()");
    });
  });

  describe("Embed URL Generation", () => {
    it("should generate embed URL", () => {
      const url = _getEmbedUrl("csv-to-json", "https://example.com");

      expect(url).toContain("https://example.com/embed/csv-to-json");
    });

    it("should include query parameters", () => {
      const url = _getEmbedUrl("csv-to-json", "https://example.com", {
        theme: "dark",
        locale: "fr",
      });

      expect(url).toContain("theme=dark");
      expect(url).toContain("locale=fr");
    });
  });

  describe("Embed Iframe Generation", () => {
    it("should generate valid iframe HTML", () => {
      const config = _initializeEmbedConfig();

      const html = _generateEmbedIframe(
        "csv-to-json",
        "https://example.com",
        config,
      );

      expect(html).toContain("<iframe");
      expect(html).toContain('src="');
      expect(html).toContain("sandbox=");
    });

    it("should include custom dimensions", () => {
      const config = _initializeEmbedConfig();

      const html = _generateEmbedIframe(
        "csv-to-json",
        "https://example.com",
        config,
        {
          width: "800px",
          height: "400px",
        },
      );

      expect(html).toContain('width="800px"');
      expect(html).toContain('height="400px"');
    });

    it("should handle non-embeddable workflows", () => {
      const config = _initializeEmbedConfig({
        workflows: [
          {
            slug: "private",
            name: "Private",
            isEmbeddable: false,
            allowedOrigins: [],
            sandboxAttributes: [],
            description: "Private",
            category: "private",
          },
        ],
      });

      const html = _generateEmbedIframe(
        "private",
        "https://example.com",
        config,
      );

      expect(html).toContain("not available for embedding");
    });
  });

  describe("Embed Code Snippets", () => {
    it("should generate HTML snippet", () => {
      const snippet = _getEmbedCodeSnippet(
        "csv-to-json",
        "https://example.com",
        "html",
      );

      expect(snippet).toContain("<iframe");
      expect(snippet).toContain("embed/csv-to-json");
    });

    it("should generate Markdown snippet", () => {
      const snippet = _getEmbedCodeSnippet(
        "csv-to-json",
        "https://example.com",
        "markdown",
      );

      expect(snippet).toContain("[View");
      expect(snippet).toContain("embed/csv-to-json");
    });

    it("should generate React snippet", () => {
      const snippet = _getEmbedCodeSnippet(
        "csv-to-json",
        "https://example.com",
        "react",
      );

      expect(snippet).toContain("<iframe");
      expect(snippet).toContain("frameBorder");
    });
  });

  describe("Access Logging", () => {
    it("should log embed access", () => {
      let log = { entries: [], totalAllowed: 0, totalDenied: 0 };

      log = _logEmbedAccess(log, "csv-to-json", "https://example.com", true);

      expect(log.entries).toHaveLength(1);
      expect(log.totalAllowed).toEqual(1);
    });

    it("should track denied access", () => {
      let log = { entries: [], totalAllowed: 0, totalDenied: 0 };

      log = _logEmbedAccess(
        log,
        "csv-to-json",
        "https://untrusted.com",
        false,
        "Origin not allowed",
      );

      expect(log.totalDenied).toEqual(1);
      expect(log.entries[0].allowed).toBe(false);
    });

    it("should preserve history", () => {
      let log = { entries: [], totalAllowed: 0, totalDenied: 0 };

      log = _logEmbedAccess(log, "csv-to-json", "https://a.com", true);
      log = _logEmbedAccess(log, "json-formatter", "https://b.com", true);
      log = _logEmbedAccess(log, "csv-to-json", "https://c.com", false);

      expect(log.entries).toHaveLength(3);
      expect(log.totalAllowed).toEqual(2);
      expect(log.totalDenied).toEqual(1);
    });
  });

  describe("Embed Statistics", () => {
    it("should calculate statistics", () => {
      let log = { entries: [], totalAllowed: 0, totalDenied: 0 };

      log = _logEmbedAccess(log, "csv-to-json", "https://a.com", true);
      log = _logEmbedAccess(log, "csv-to-json", "https://b.com", true);
      log = _logEmbedAccess(log, "json-formatter", "https://c.com", false);

      const stats = _getEmbedStatistics(log);

      expect(stats.totalRequests).toEqual(3);
      expect(stats.allowedCount).toEqual(2);
      expect(stats.deniedCount).toEqual(1);
      expect(Math.round(stats.allowRate)).toEqual(67);
    });

    it("should identify top workflows", () => {
      let log = { entries: [], totalAllowed: 0, totalDenied: 0 };

      for (let i = 0; i < 5; i++) {
        log = _logEmbedAccess(
          log,
          "csv-to-json",
          `https://example${i}.com`,
          true,
        );
      }

      for (let i = 0; i < 3; i++) {
        log = _logEmbedAccess(
          log,
          "json-formatter",
          `https://example${i}.com`,
          true,
        );
      }

      const stats = _getEmbedStatistics(log);

      expect(stats.topWorkflows[0].workflow).toEqual("csv-to-json");
      expect(stats.topWorkflows[0].count).toEqual(5);
    });
  });

  describe("Origin Security Validation", () => {
    it("should validate HTTPS origins when required", () => {
      expect(_validateOriginSecurity("https://example.com", true)).toBe(true);
      expect(_validateOriginSecurity("http://example.com", true)).toBe(false);
    });

    it("should accept HTTP when HTTPS not required", () => {
      expect(_validateOriginSecurity("http://example.com", false)).toBe(true);
    });

    it("should validate URL format", () => {
      expect(_validateOriginSecurity("https://example.com", true)).toBe(true);
      expect(_validateOriginSecurity("invalid url", true)).toBe(false);
    });
  });

  describe("Embed Manifest Generation", () => {
    it("should generate embed manifest", () => {
      const config = _initializeEmbedConfig();

      const manifest = _generateEmbedManifest(config, "https://example.com");

      expect(manifest.version).toEqual("1.0.0");
      expect(manifest.workflows.length).toBeGreaterThan(0);
    });

    it("should include workflow metadata", () => {
      const config = _initializeEmbedConfig();

      const manifest = _generateEmbedManifest(config, "https://example.com");

      const csvWorkflow = manifest.workflows.find(
        (w) => w.slug === "csv-to-json",
      );
      expect(csvWorkflow?.name).toEqual("CSV to JSON");
      expect(csvWorkflow?.embedUrl).toContain("embed/csv-to-json");
    });

    it("should only include embeddable workflows", () => {
      const config = _initializeEmbedConfig({
        workflows: [
          ...DEFAULT_EMBED_CONFIG.workflows,
          {
            slug: "private",
            name: "Private",
            isEmbeddable: false,
            allowedOrigins: [],
            sandboxAttributes: [],
            description: "Private tool",
            category: "private",
          },
        ],
      });

      const manifest = _generateEmbedManifest(config, "https://example.com");

      expect(
        manifest.workflows.find((w) => w.slug === "private"),
      ).toBeUndefined();
    });
  });

  describe("Integration: Complete Embed Workflow", () => {
    it("should handle complete embed request flow", () => {
      const config = _initializeEmbedConfig();
      let log = { entries: [], totalAllowed: 0, totalDenied: 0 };

      // Request 1: Valid embed from trusted origin
      const request1 = {
        workflowSlug: "csv-to-json",
        origin: "https://example.com",
        timestamp: new Date(),
      };

      const validation1 = _validateEmbedRequest(request1, config);
      expect(validation1.allowed).toBe(true);

      log = _logEmbedAccess(
        log,
        request1.workflowSlug,
        request1.origin,
        validation1.allowed,
      );

      // Generate embed URL
      const embedUrl = _getEmbedUrl(
        request1.workflowSlug,
        "https://example.com",
      );
      expect(embedUrl).toContain("embed/csv-to-json");

      // Generate iframe
      const iframe = _generateEmbedIframe(
        request1.workflowSlug,
        "https://example.com",
        config,
      );
      expect(iframe).toContain(embedUrl);

      // Verify stats
      const stats = _getEmbedStatistics(log);
      expect(stats.allowedCount).toEqual(1);
      expect(stats.allowRate).toEqual(100);
    });
  });
});
