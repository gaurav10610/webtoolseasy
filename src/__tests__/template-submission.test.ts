import { describe, expect, it } from "vitest";
import {
  _applyModerationDecision,
  _buildModerationChecklist,
  _createSubmissionFromDraft,
  _getSubmissionSummary,
  _initializeTemplateDraft,
  _loadDraftFromLocal,
  _publishApprovedSubmission,
  _runModerationPipeline,
  _saveDraftLocally,
  _submitDraftForModeration,
  _updateDraft,
  _validateDraftForSubmission,
} from "@/lib/templateSubmission";

describe("Template Submission & Moderation (TB-139/TB-140)", () => {
  describe("Draft Lifecycle", () => {
    it("initializes local-first draft", () => {
      const draft = _initializeTemplateDraft({
        templateId: "tmpl-1",
        authorId: "u-1",
      });

      expect(draft.templateId).toBe("tmpl-1");
      expect(draft.authorId).toBe("u-1");
      expect(draft.version).toBe("0.1.0");
      expect(draft.steps).toEqual([]);
    });

    it("updates draft fields and timestamp", () => {
      const draft = _initializeTemplateDraft({
        templateId: "tmpl-2",
        authorId: "u-2",
      });

      const updated = _updateDraft(draft, {
        title: "Useful recipe",
        description:
          "A much better community recipe description that is long enough.",
      });

      expect(updated.title).toBe("Useful recipe");
      expect(updated.description).toContain("community recipe");
      expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(
        draft.updatedAt.getTime(),
      );
    });
  });

  describe("Local Draft Storage", () => {
    it("saves and loads draft from local storage object", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-3", authorId: "u-3" }),
        {
          title: "Draft title",
          description:
            "Long enough description for draft local persistence tests.",
          steps: [{ id: "s1" }],
        },
      );

      const storage = _saveDraftLocally(draft, {});
      const loaded = _loadDraftFromLocal("tmpl-3", storage);

      expect(loaded).not.toBeNull();
      expect(loaded?.title).toBe("Draft title");
      expect(loaded?.steps.length).toBe(1);
    });

    it("returns null on missing draft", () => {
      expect(_loadDraftFromLocal("missing", {})).toBeNull();
    });

    it("returns null on malformed draft payload", () => {
      const storage = {
        "template-draft:bad": "{not-json",
      };
      expect(_loadDraftFromLocal("bad", storage)).toBeNull();
    });
  });

  describe("Submission Validation", () => {
    it("rejects weak draft payload", () => {
      const draft = _initializeTemplateDraft({
        templateId: "tmpl-4",
        authorId: "u-4",
      });

      const result = _validateDraftForSubmission(draft);
      expect(result.valid).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
    });

    it("accepts valid draft payload", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-5", authorId: "u-5" }),
        {
          title: "Practical CSV Cleanup Recipe",
          description:
            "This workflow removes malformed rows, normalizes columns, and produces clean API payloads for downstream services.",
          category: "data-processing",
          tags: ["csv", "cleanup"],
          steps: [{ id: "s1" }, { id: "s2" }],
        },
      );

      const result = _validateDraftForSubmission(draft);
      expect(result.valid).toBe(true);
      expect(result.issues).toEqual([]);
    });
  });

  describe("Moderation Checklist", () => {
    it("flags spammy draft content", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-6", authorId: "u-6" }),
        {
          title: "Make money fast click here",
          description:
            "limited offer buy now click here make money fast with this template and secret tricks",
          tags: ["money"],
          steps: [{ id: "s1" }, { id: "s2" }],
        },
      );

      const checklist = _buildModerationChecklist(draft);
      const spamCheck = checklist.find(
        (c) => c.id === "title-description-spam",
      );

      expect(spamCheck?.passed).toBe(false);
      expect(spamCheck?.severity).toBe("high");
    });

    it("passes strong draft on most checks", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-7", authorId: "u-7" }),
        {
          title: "API Payload Normalizer",
          description:
            "Transforms inconsistent JSON input into a stable schema, validates required fields, and exports a standardized object with documented fields.",
          tags: ["json", "schema", "validation"],
          steps: [{ id: "s1" }, { id: "s2" }, { id: "s3" }],
        },
      );

      const checklist = _buildModerationChecklist(draft);
      expect(checklist.length).toBeGreaterThanOrEqual(5);
      expect(checklist.filter((c) => c.passed).length).toBeGreaterThanOrEqual(
        4,
      );
    });
  });

  describe("Moderation Pipeline Decisions", () => {
    it("rejects high-risk content", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-8", authorId: "u-8" }),
        {
          title: "password dump tool",
          description:
            "Use this stolen credential leak kit and click here buy now limited offer now now now",
          tags: ["security"],
          steps: [{ id: "s1" }, { id: "s2" }],
        },
      );

      const report = _runModerationPipeline(draft);
      expect(report.decision).toBe("rejected");
      expect(report.score).toBeLessThanOrEqual(60);
    });

    it("routes medium quality content to manual review", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-9", authorId: "u-9" }),
        {
          title: "JSON Helper",
          description: "Helpful workflow for JSON updates and data operations.",
          tags: ["json"],
          steps: [{ id: "s1" }],
        },
      );

      const report = _runModerationPipeline(draft);
      expect(report.decision).toBe("needs_review");
    });

    it("approves robust submissions", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-10", authorId: "u-10" }),
        {
          title: "Webhook Payload Cleanup Pipeline",
          description:
            "Parses incoming webhook payloads, normalizes key naming, validates payload shape, and maps output fields for downstream API consumers with explicit transform documentation.",
          tags: ["webhook", "api", "cleanup"],
          steps: [{ id: "s1" }, { id: "s2" }, { id: "s3" }],
        },
      );

      const report = _runModerationPipeline(draft);
      expect(report.decision).toBe("approved");
      expect(report.score).toBeGreaterThanOrEqual(85);
    });
  });

  describe("Submission Status Transitions", () => {
    it("creates and submits draft", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-11", authorId: "u-11" }),
        {
          title: "Valid title",
          description:
            "This is a valid long description for a community template submission flow test case.",
          steps: [{ id: "s1" }, { id: "s2" }],
        },
      );
      const submission = _createSubmissionFromDraft(draft);
      const submitted = _submitDraftForModeration(submission);

      expect(submitted.status).toBe("submitted");
      expect(submitted.submittedAt).toBeDefined();
    });

    it("applies approved decision then publishes", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-12", authorId: "u-12" }),
        {
          title: "Schema Mapper",
          description:
            "Maps source schema to target schema with explicit field transforms, null handling, and validation for production-safe data migration.",
          tags: ["schema", "mapping"],
          steps: [{ id: "s1" }, { id: "s2" }, { id: "s3" }],
        },
      );

      const report = _runModerationPipeline(draft);
      const submitted = _submitDraftForModeration(
        _createSubmissionFromDraft(draft),
      );
      const moderated = _applyModerationDecision(submitted, report);
      const published = _publishApprovedSubmission(moderated);

      expect(report.decision).toBe("approved");
      expect(moderated.status).toBe("approved");
      expect(published.status).toBe("published");
      expect(published.publishedAt).toBeDefined();
    });

    it("keeps rejected decisions unpublished", () => {
      const draft = _updateDraft(
        _initializeTemplateDraft({ templateId: "tmpl-13", authorId: "u-13" }),
        {
          title: "click here money",
          description: "buy now limited offer click here make money fast",
          tags: ["spam"],
          steps: [{ id: "s1" }, { id: "s2" }],
        },
      );

      const report = _runModerationPipeline(draft);
      const submitted = _submitDraftForModeration(
        _createSubmissionFromDraft(draft),
      );
      const moderated = _applyModerationDecision(submitted, report);
      const publishAttempt = _publishApprovedSubmission(moderated);

      expect(report.decision).toBe("rejected");
      expect(moderated.status).toBe("rejected");
      expect(publishAttempt.status).toBe("rejected");
      expect((publishAttempt.notes || []).join(" ")).toContain("Only approved");
    });
  });

  describe("Submission Summary", () => {
    it("computes summary metrics", () => {
      const mk = (
        status:
          | "draft"
          | "submitted"
          | "in_moderation"
          | "approved"
          | "rejected"
          | "published",
      ) => ({
        submissionId: `sub-${status}`,
        draft: _initializeTemplateDraft({
          templateId: `t-${status}`,
          authorId: "u",
        }),
        status,
      });

      const summary = _getSubmissionSummary([
        mk("draft"),
        mk("submitted"),
        mk("in_moderation"),
        mk("approved"),
        mk("rejected"),
        mk("published"),
      ]);

      expect(summary.total).toBe(6);
      expect(summary.published).toBe(1);
      expect(summary.publishRate).toBe(17);
    });
  });
});
