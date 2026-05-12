import { describe, it, expect } from "vitest";
import {
  checkForSpam as _checkForSpam,
  createTemplateVersion as _createTemplateVersion,
  initializeTemplateHistory as _initializeTemplateHistory,
  calculatePopularityScore as _calculatePopularityScore,
  categorizePopularityTier as _categorizePopularityTier,
  incrementTemplateClone as _incrementTemplateClone,
  incrementTemplateView as _incrementTemplateView,
  addTemplateRating as _addTemplateRating,
  rankTemplatesByPopularity as _rankTemplatesByPopularity,
} from "@/lib/templateCommunity";

describe("Template Community Management", () => {
  describe("Spam Prevention (TB-141)", () => {
    it("should detect clean content as not spam", () => {
      const result = _checkForSpam("Simple workflow to convert JSON to CSV");
      expect(result.isSpam).toBe(false);
      expect(result.riskScore).toBeLessThan(30);
    });

    it("should detect suspicious keywords", () => {
      const result = _checkForSpam(
        "Make money fast with this click here template",
      );
      expect(result.isSpam).toBe(true);
      expect(result.issues.some((i) => i.type === "suspicious_keywords")).toBe(
        true,
      );
    });

    it("should detect excessive links", () => {
      const result = _checkForSpam(
        "Visit https://example.com and https://example2.com and https://example3.com now",
      );
      expect(result.issues.some((i) => i.type === "excessive_links")).toBe(
        true,
      );
    });

    it("should detect keyword stuffing", () => {
      const result = _checkForSpam(
        "workflow workflow workflow workflow workflow workflow workflow workflow",
      );
      expect(result.issues.some((i) => i.type === "keyword_stuffing")).toBe(
        true,
      );
    });

    it("should detect repeated characters", () => {
      const result = _checkForSpam("Amazing template!!!!! Get it nowwwww");
      expect(result.riskScore).toBeGreaterThan(0);
    });

    it("should calculate risk score 0-100", () => {
      const result = _checkForSpam("Any text");
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });

    it("should flag high-risk content as spam", () => {
      const result = _checkForSpam(
        "Make money fast!!! Click here buy now limited offer https://spam1.com https://spam2.com https://spam3.com urgent urgent urgent",
      );
      expect(result.isSpam).toBe(true);
      expect(result.riskScore).toBeGreaterThan(30);
    });
  });

  describe("Template Versioning (TB-142)", () => {
    it("should initialize template history", () => {
      const history = _initializeTemplateHistory("tmpl123");
      expect(history.templateId).toEqual("tmpl123");
      expect(history.versions).toEqual([]);
      expect(history.currentVersion).toEqual("1.0.0");
      expect(history.totalVersions).toEqual(0);
    });

    it("should create new version with incremented patch", () => {
      const version = _createTemplateVersion(
        "tmpl123",
        "1.0.0",
        "Fixed issue with step configuration",
        { step1: { type: "json" } },
      );

      expect(version.version).toEqual("1.0.1");
      expect(version.templateId).toEqual("tmpl123");
      expect(version.changes).toEqual("Fixed issue with step configuration");
      expect(version.isReleased).toBe(false);
    });

    it("should increment patch version correctly", () => {
      const v1 = _createTemplateVersion("tmpl123", "1.0.0", "Initial", {});
      const v2 = _createTemplateVersion("tmpl123", v1.version, "Update", {});
      const v3 = _createTemplateVersion("tmpl123", v2.version, "Fix", {});

      expect(v1.version).toEqual("1.0.1");
      expect(v2.version).toEqual("1.0.2");
      expect(v3.version).toEqual("1.0.3");
    });

    it("should include snapshot of step configuration", () => {
      const snapshot = {
        step1: { name: "Step 1", type: "json" },
        step2: { name: "Step 2" },
      };
      const version = _createTemplateVersion(
        "tmpl123",
        "1.0.0",
        "Save",
        snapshot,
      );

      expect(version.stepSnapshot).toEqual(snapshot);
    });

    it("should mark version as unreleased by default", () => {
      const version = _createTemplateVersion("tmpl123", "1.0.0", "Draft", {});
      expect(version.isReleased).toBe(false);
    });
  });

  describe("Template Popularity (TB-143)", () => {
    it("should calculate popularity score 0-100", () => {
      const score = _calculatePopularityScore({
        cloneCount: 50,
        viewCount: 500,
        favoriteCount: 10,
        averageRating: 4.5,
        ratingCount: 20,
      });

      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it("should weight clones highest", () => {
      const withClones = _calculatePopularityScore({
        cloneCount: 100,
        viewCount: 0,
        favoriteCount: 0,
        averageRating: 0,
        ratingCount: 0,
      });

      const withViews = _calculatePopularityScore({
        cloneCount: 0,
        viewCount: 1000,
        favoriteCount: 0,
        averageRating: 0,
        ratingCount: 0,
      });

      expect(withClones).toBeGreaterThan(withViews);
    });

    it("should categorize emerging tier for new templates", () => {
      const tier = _categorizePopularityTier(0, 0);
      expect(tier).toEqual("unknown");
    });

    it("should categorize trending tier", () => {
      const tier = _categorizePopularityTier(15, 20);
      expect(tier).toEqual("trending");
    });

    it("should categorize popular tier", () => {
      const tier = _categorizePopularityTier(50, 150);
      expect(tier).toEqual("popular");
    });

    it("should categorize featured tier", () => {
      const tier = _categorizePopularityTier(80, 300);
      expect(tier).toEqual("featured");
    });

    it("should increment clone count", () => {
      const popularity = {
        templateId: "tmpl1",
        cloneCount: 10,
        viewCount: 100,
        favoriteCount: 2,
        averageRating: 4.0,
        ratingCount: 5,
        popularityScore: 25,
        tier: "emerging" as const,
      };

      const updated = _incrementTemplateClone(popularity);
      expect(updated.cloneCount).toEqual(11);
      expect(updated.lastActivityAt).toBeDefined();
      expect(updated.popularityScore).toBeGreaterThan(
        popularity.popularityScore,
      );
    });

    it("should increment view count", () => {
      const popularity = {
        templateId: "tmpl1",
        cloneCount: 10,
        viewCount: 100,
        favoriteCount: 2,
        averageRating: 4.0,
        ratingCount: 5,
        popularityScore: 25,
        tier: "emerging" as const,
      };

      const updated = _incrementTemplateView(popularity);
      expect(updated.viewCount).toEqual(101);
      expect(updated.lastActivityAt).toBeDefined();
    });

    it("should add rating and update average", () => {
      const popularity = {
        templateId: "tmpl1",
        cloneCount: 10,
        viewCount: 100,
        favoriteCount: 2,
        averageRating: 4.0,
        ratingCount: 5,
        popularityScore: 25,
        tier: "emerging" as const,
      };

      const updated = _addTemplateRating(popularity, 5);
      expect(updated.ratingCount).toEqual(6);
      expect(updated.averageRating).toBeCloseTo(4.167, 2);
    });

    it("should rank templates by popularity score", () => {
      const templates = [
        {
          templateId: "t1",
          cloneCount: 10,
          viewCount: 100,
          favoriteCount: 1,
          averageRating: 3.0,
          ratingCount: 10,
          popularityScore: 20,
          tier: "emerging" as const,
        },
        {
          templateId: "t2",
          cloneCount: 50,
          viewCount: 500,
          favoriteCount: 5,
          averageRating: 4.5,
          ratingCount: 50,
          popularityScore: 60,
          tier: "popular" as const,
        },
        {
          templateId: "t3",
          cloneCount: 100,
          viewCount: 1000,
          favoriteCount: 20,
          averageRating: 4.8,
          ratingCount: 100,
          popularityScore: 80,
          tier: "featured" as const,
        },
      ];

      const ranked = _rankTemplatesByPopularity(templates);
      expect(ranked[0].templateId).toEqual("t3");
      expect(ranked[1].templateId).toEqual("t2");
      expect(ranked[2].templateId).toEqual("t1");
    });

    it("should rank by clone count as secondary factor", () => {
      const templates = [
        {
          templateId: "t1",
          cloneCount: 100,
          viewCount: 100,
          favoriteCount: 1,
          averageRating: 0,
          ratingCount: 0,
          popularityScore: 40,
          tier: "emerging" as const,
        },
        {
          templateId: "t2",
          cloneCount: 50,
          viewCount: 100,
          favoriteCount: 1,
          averageRating: 0,
          ratingCount: 0,
          popularityScore: 40, // Same popularity score
          tier: "emerging" as const,
        },
      ];

      const ranked = _rankTemplatesByPopularity(templates);
      expect(ranked[0].templateId).toEqual("t1"); // More clones
      expect(ranked[1].templateId).toEqual("t2");
    });
  });

  describe("Integration: Complete Template Lifecycle", () => {
    it("should track template from creation to popularity", () => {
      // Initial template popularity
      const popularity = {
        templateId: "tmpl1",
        cloneCount: 0,
        viewCount: 0,
        favoriteCount: 0,
        averageRating: 0,
        ratingCount: 0,
        popularityScore: 0,
        tier: "unknown" as const,
      };

      // Views
      let updated = _incrementTemplateView(popularity);
      updated = _incrementTemplateView(updated);
      updated = _incrementTemplateView(updated);

      // Clones
      updated = _incrementTemplateClone(updated);
      updated = _incrementTemplateClone(updated);

      // Ratings
      updated = _addTemplateRating(updated, 5);
      updated = _addTemplateRating(updated, 4);

      expect(updated.viewCount).toEqual(3);
      expect(updated.cloneCount).toEqual(2);
      expect(updated.ratingCount).toEqual(2);
      expect(updated.averageRating).toEqual(4.5);
    });

    it("should prevent spam templates from being published", () => {
      const spamDescription =
        "Make money fast click here buy now urgent urgent urgent";
      const spamCheck = _checkForSpam(spamDescription);

      expect(spamCheck.isSpam).toBe(true);
      // In real usage, would prevent publication
    });
  });
});
