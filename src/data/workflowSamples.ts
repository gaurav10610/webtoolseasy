export const workflowSamplePayloads: Record<string, Record<string, unknown>> = {
  "api-payload-cleanup": {
    payload: {
      user_id: 42,
      account_status: "active",
      created_at: "2026-01-08T12:30:00.000Z",
      tags: ["beta", "priority"],
    },
  },
  "blog-publish": {
    title: "How to Use Workflow Packs",
    slug: "how-to-use-workflow-packs",
    description: "A practical guide to workflow-first execution.",
    markdown: "# Intro\n\nThis is a sample draft for workflow publishing.",
  },
  "technical-seo-quick-audit": {
    url: "https://example.com",
    robots: "User-agent: *\\nAllow: /",
    sitemap: "https://example.com/sitemap.xml",
  },
  "private-document-prep": {
    files: ["contract.pdf", "appendix.pdf"],
    operation: "merge",
    output: "merged-contract.pdf",
  },
  "media-publish": {
    inputFiles: ["hero-image.png", "thumbnail.jpg"],
    targetPreset: "blog-social",
    renamePattern: "{slug}-{size}",
  },
};
