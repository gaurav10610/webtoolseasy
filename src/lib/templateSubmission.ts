import { checkForSpam } from "@/lib/templateCommunity";

export type SubmissionStatus =
  | "draft"
  | "submitted"
  | "in_moderation"
  | "approved"
  | "rejected"
  | "published";

export type ModerationDecision = "approved" | "rejected" | "needs_review";

export interface TemplateDraft {
  templateId: string;
  authorId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  steps: Array<Record<string, unknown>>;
  createdAt: Date;
  updatedAt: Date;
  version: string;
}

export interface TemplateSubmission {
  submissionId: string;
  draft: TemplateDraft;
  status: SubmissionStatus;
  submittedAt?: Date;
  moderatedAt?: Date;
  publishedAt?: Date;
  notes?: string[];
}

export interface ModerationCheck {
  id: string;
  name: string;
  passed: boolean;
  severity: "low" | "medium" | "high";
  message: string;
}

export interface ModerationReport {
  checks: ModerationCheck[];
  decision: ModerationDecision;
  score: number;
  reasons: string[];
}

export function _initializeTemplateDraft(input: {
  templateId: string;
  authorId: string;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
}): TemplateDraft {
  const now = new Date();
  return {
    templateId: input.templateId,
    authorId: input.authorId,
    title: input.title || "",
    description: input.description || "",
    category: input.category || "general",
    tags: input.tags || [],
    steps: [],
    createdAt: now,
    updatedAt: now,
    version: "0.1.0",
  };
}

export function _updateDraft(
  draft: TemplateDraft,
  patch: Partial<
    Pick<TemplateDraft, "title" | "description" | "category" | "tags" | "steps">
  >,
): TemplateDraft {
  return {
    ...draft,
    ...patch,
    updatedAt: new Date(),
  };
}

export function _saveDraftLocally(
  draft: TemplateDraft,
  storage: Record<string, string>,
): Record<string, string> {
  return {
    ...storage,
    [`template-draft:${draft.templateId}`]: JSON.stringify({
      ...draft,
      createdAt: draft.createdAt.toISOString(),
      updatedAt: draft.updatedAt.toISOString(),
    }),
  };
}

export function _loadDraftFromLocal(
  templateId: string,
  storage: Record<string, string>,
): TemplateDraft | null {
  const raw = storage[`template-draft:${templateId}`];
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Omit<
      TemplateDraft,
      "createdAt" | "updatedAt"
    > & {
      createdAt: string;
      updatedAt: string;
    };
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt),
      updatedAt: new Date(parsed.updatedAt),
    };
  } catch {
    return null;
  }
}

export function _validateDraftForSubmission(draft: TemplateDraft): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (!draft.title || draft.title.trim().length < 5) {
    issues.push("Title must be at least 5 characters");
  }

  if (!draft.description || draft.description.trim().length < 30) {
    issues.push("Description must be at least 30 characters");
  }

  if (!draft.steps || draft.steps.length === 0) {
    issues.push("At least one step is required");
  }

  if (!draft.category || draft.category.trim().length === 0) {
    issues.push("Category is required");
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function _createSubmissionFromDraft(
  draft: TemplateDraft,
): TemplateSubmission {
  return {
    submissionId: `sub_${draft.templateId}_${Date.now()}`,
    draft,
    status: "draft",
    notes: [],
  };
}

export function _submitDraftForModeration(
  submission: TemplateSubmission,
): TemplateSubmission {
  if (submission.status !== "draft") {
    return {
      ...submission,
      notes: [...(submission.notes || []), "Submission is not in draft state"],
    };
  }

  return {
    ...submission,
    status: "submitted",
    submittedAt: new Date(),
  };
}

export function _buildModerationChecklist(
  draft: TemplateDraft,
): ModerationCheck[] {
  const spam = checkForSpam(`${draft.title} ${draft.description}`);
  const checks: ModerationCheck[] = [];

  checks.push({
    id: "title-description-spam",
    name: "Spam/abuse screening",
    passed: !spam.isSpam,
    severity: spam.isSpam ? "high" : "low",
    message: spam.isSpam
      ? `Spam risk score ${spam.riskScore} with ${spam.issues.length} issue(s)`
      : "No high-risk spam patterns detected",
  });

  checks.push({
    id: "description-depth",
    name: "Description quality",
    passed: draft.description.trim().length >= 60,
    severity: "medium",
    message:
      draft.description.trim().length >= 60
        ? "Description has sufficient detail"
        : "Description should provide more implementation detail",
  });

  checks.push({
    id: "step-coverage",
    name: "Workflow step coverage",
    passed: draft.steps.length >= 2,
    severity: "medium",
    message:
      draft.steps.length >= 2
        ? "Workflow has multiple steps"
        : "Workflow should contain at least 2 steps for community publication",
  });

  checks.push({
    id: "tag-hygiene",
    name: "Tag hygiene",
    passed:
      draft.tags.length > 0 &&
      draft.tags.length <= 8 &&
      draft.tags.every((tag) => tag.trim().length >= 2),
    severity: "low",
    message:
      draft.tags.length > 0 && draft.tags.length <= 8
        ? "Tags look valid"
        : "Provide 1-8 meaningful tags",
  });

  checks.push({
    id: "legal-language",
    name: "No prohibited legal-risk language",
    passed: !/pirated|stolen|password dump|credential leak/i.test(
      `${draft.title} ${draft.description}`,
    ),
    severity: "high",
    message: /pirated|stolen|password dump|credential leak/i.test(
      `${draft.title} ${draft.description}`,
    )
      ? "Contains prohibited legal-risk wording"
      : "No prohibited legal-risk wording detected",
  });

  return checks;
}

export function _runModerationPipeline(draft: TemplateDraft): ModerationReport {
  const checks = _buildModerationChecklist(draft);
  const passed = checks.filter((c) => c.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  const hardFail = checks.some((c) => !c.passed && c.severity === "high");
  const mediumFailures = checks.filter(
    (c) => !c.passed && c.severity === "medium",
  ).length;

  let decision: ModerationDecision = "approved";
  if (hardFail || score < 60) {
    decision = "rejected";
  } else if (mediumFailures > 0 || score < 85) {
    decision = "needs_review";
  }

  return {
    checks,
    decision,
    score,
    reasons: checks.filter((c) => !c.passed).map((c) => c.message),
  };
}

export function _applyModerationDecision(
  submission: TemplateSubmission,
  report: ModerationReport,
): TemplateSubmission {
  if (
    submission.status !== "submitted" &&
    submission.status !== "in_moderation"
  ) {
    return {
      ...submission,
      notes: [
        ...(submission.notes || []),
        "Submission cannot be moderated from current state",
      ],
    };
  }

  if (report.decision === "approved") {
    return {
      ...submission,
      status: "approved",
      moderatedAt: new Date(),
      notes: [...(submission.notes || []), "Moderation approved"],
    };
  }

  if (report.decision === "rejected") {
    return {
      ...submission,
      status: "rejected",
      moderatedAt: new Date(),
      notes: [...(submission.notes || []), ...report.reasons],
    };
  }

  return {
    ...submission,
    status: "in_moderation",
    moderatedAt: new Date(),
    notes: [...(submission.notes || []), ...report.reasons],
  };
}

export function _publishApprovedSubmission(
  submission: TemplateSubmission,
): TemplateSubmission {
  if (submission.status !== "approved") {
    return {
      ...submission,
      notes: [
        ...(submission.notes || []),
        "Only approved submissions can be published",
      ],
    };
  }

  return {
    ...submission,
    status: "published",
    publishedAt: new Date(),
  };
}

export function _getSubmissionSummary(submissions: TemplateSubmission[]): {
  total: number;
  drafts: number;
  submitted: number;
  inModeration: number;
  approved: number;
  rejected: number;
  published: number;
  publishRate: number;
} {
  const summary = {
    total: submissions.length,
    drafts: submissions.filter((s) => s.status === "draft").length,
    submitted: submissions.filter((s) => s.status === "submitted").length,
    inModeration: submissions.filter((s) => s.status === "in_moderation")
      .length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
    published: submissions.filter((s) => s.status === "published").length,
    publishRate: 0,
  };

  summary.publishRate = summary.total
    ? Math.round((summary.published / summary.total) * 100)
    : 0;

  return summary;
}
