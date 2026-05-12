/**
 * TB-066: Internal linking map between workflows, templates, and blog posts.
 *
 * This map enables cross-linking between:
 * - Workflow packs (by slug)
 * - Workflow templates (by templateId)
 * - Blog posts (by pageUrl)
 *
 * Used by workflow detail pages, template pages, and blog post pages to render
 * "Related" sections that reinforce the workflow-first narrative.
 */

export interface WorkflowLinkEntry {
  workflowSlug: string;
  relatedTemplates: string[];
  relatedBlogPosts: string[];
  relatedWorkflows: string[];
}

/**
 * Internal link map keyed by workflow slug.
 * Extend this map when adding new workflow packs or blog posts.
 */
export const WORKFLOW_LINK_MAP: Record<string, WorkflowLinkEntry> = {
  "api-payload-cleanup": {
    workflowSlug: "api-payload-cleanup",
    relatedTemplates: [
      "json-format-validate",
      "api-diff-snapshot",
      "payload-cleanup-preset",
    ],
    relatedBlogPosts: [
      "api-payload-cleanup-workflow-playbook",
      "client-side-json-formatting-guide",
      "rest-api-jwt-authentication-guide",
    ],
    relatedWorkflows: ["technical-seo-quick-audit"],
  },

  "blog-publish": {
    workflowSlug: "blog-publish",
    relatedTemplates: [
      "markdown-draft-prep",
      "seo-meta-writer",
      "blog-publish-checklist",
    ],
    relatedBlogPosts: [
      "blog-publish-workflow-playbook",
      "text-writing-tools-guide",
      "technical-seo-quick-audit-workflow-playbook",
    ],
    relatedWorkflows: ["technical-seo-quick-audit", "private-document-prep"],
  },

  "technical-seo-quick-audit": {
    workflowSlug: "technical-seo-quick-audit",
    relatedTemplates: [
      "robots-meta-audit",
      "sitemap-validator",
      "schema-markup-checker",
    ],
    relatedBlogPosts: [
      "technical-seo-quick-audit-workflow-playbook",
      "blog-publish-workflow-playbook",
      "offline-web-tools-guide",
    ],
    relatedWorkflows: ["blog-publish", "api-payload-cleanup"],
  },

  "private-document-prep": {
    workflowSlug: "private-document-prep",
    relatedTemplates: [
      "pdf-redact-export",
      "document-sanitize",
      "privacy-checklist",
    ],
    relatedBlogPosts: [
      "pdf-to-word-privacy-guide",
      "privacy-first-pdf-tools-guide",
      "offline-web-tools-guide",
    ],
    relatedWorkflows: ["blog-publish"],
  },

  "media-publish": {
    workflowSlug: "media-publish",
    relatedTemplates: [
      "image-compress-export",
      "media-metadata-strip",
      "alt-text-batch",
    ],
    relatedBlogPosts: [
      "free-image-editing-tools-guide",
      "private-image-compression-guide",
      "blog-publish-workflow-playbook",
    ],
    relatedWorkflows: ["blog-publish", "private-document-prep"],
  },
};

/**
 * Look up the link map entry for a given workflow slug.
 * Returns null if the workflow has no registered links.
 */
export function getWorkflowLinks(slug: string): WorkflowLinkEntry | null {
  return WORKFLOW_LINK_MAP[slug] ?? null;
}

/**
 * Find all workflows that link to a given blog post URL.
 */
export function getWorkflowsForBlogPost(blogPageUrl: string): string[] {
  return Object.values(WORKFLOW_LINK_MAP)
    .filter((entry) => entry.relatedBlogPosts.includes(blogPageUrl))
    .map((entry) => entry.workflowSlug);
}

/**
 * Find all workflows that reference a given template.
 */
export function getWorkflowsForTemplate(templateId: string): string[] {
  return Object.values(WORKFLOW_LINK_MAP)
    .filter((entry) => entry.relatedTemplates.includes(templateId))
    .map((entry) => entry.workflowSlug);
}
