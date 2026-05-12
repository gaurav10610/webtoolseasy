import { describe, expect, it } from "vitest";
import {
  _evaluateTemplateArchival,
  _selectTemplatesForArchival,
} from "@/lib/templateArchivalPolicy";

describe("Template Archival Policy (TB-185)", () => {
  it("archives stale low-quality template", () => {
    const decision = _evaluateTemplateArchival(
      {
        templateId: "tmpl-1",
        lastActivityAt: new Date("2025-01-01T00:00:00.000Z"),
        popularityScore: 2,
        averageRating: 3.2,
        ratingCount: 3,
        abuseReportCount: 0,
        qualityScore: 40,
      },
      undefined,
      new Date("2026-05-12T00:00:00.000Z"),
    );

    expect(decision.shouldArchive).toBe(true);
    expect(decision.reasons.length).toBeGreaterThan(0);
  });

  it("keeps healthy template active", () => {
    const decision = _evaluateTemplateArchival(
      {
        templateId: "tmpl-2",
        lastActivityAt: new Date("2026-05-01T00:00:00.000Z"),
        popularityScore: 55,
        averageRating: 4.6,
        ratingCount: 12,
        abuseReportCount: 0,
        qualityScore: 92,
      },
      undefined,
      new Date("2026-05-12T00:00:00.000Z"),
    );

    expect(decision.shouldArchive).toBe(false);
  });

  it("does not archive high-rated templates despite low activity", () => {
    const decision = _evaluateTemplateArchival(
      {
        templateId: "tmpl-3",
        lastActivityAt: new Date("2025-01-01T00:00:00.000Z"),
        popularityScore: 8,
        averageRating: 4.7,
        ratingCount: 20,
        abuseReportCount: 0,
        qualityScore: 58,
      },
      undefined,
      new Date("2026-05-12T00:00:00.000Z"),
    );

    expect(decision.shouldArchive).toBe(false);
  });

  it("selects archival decisions for bulk templates", () => {
    const decisions = _selectTemplatesForArchival(
      [
        {
          templateId: "a",
          lastActivityAt: new Date("2025-01-01T00:00:00.000Z"),
          popularityScore: 2,
          averageRating: 3,
          ratingCount: 1,
          abuseReportCount: 1,
          qualityScore: 40,
        },
        {
          templateId: "b",
          lastActivityAt: new Date("2026-04-20T00:00:00.000Z"),
          popularityScore: 35,
          averageRating: 4.5,
          ratingCount: 10,
          abuseReportCount: 0,
          qualityScore: 80,
        },
      ],
      undefined,
      new Date("2026-05-12T00:00:00.000Z"),
    );

    expect(decisions).toHaveLength(2);
    expect(decisions.find((d) => d.templateId === "a")?.shouldArchive).toBe(
      true,
    );
    expect(decisions.find((d) => d.templateId === "b")?.shouldArchive).toBe(
      false,
    );
  });
});
