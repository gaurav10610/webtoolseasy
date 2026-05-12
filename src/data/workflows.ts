import { WorkflowPackConfig } from "@/types/workflow";

export const workflowPacks: WorkflowPackConfig[] = [
  {
    id: "wf-api-payload-cleanup",
    slug: "api-payload-cleanup",
    name: "API Payload Cleanup",
    summary:
      "Validate, normalize, diff, and export API payloads without uploading data.",
    category: "developer",
    tags: ["json", "api", "diff", "csv", "privacy"],
    steps: [
      {
        id: "validate-format-json",
        title: "Validate and format JSON",
        description:
          "Checks syntax and normalizes structure for readable output.",
        executionMode: "local-only",
      },
      {
        id: "normalize-keys",
        title: "Normalize key format",
        description: "Applies consistent key casing and naming conventions.",
        executionMode: "local-only",
      },
      {
        id: "diff-snapshot",
        title: "Create diff snapshot",
        description: "Compares original vs transformed payload.",
        executionMode: "local-only",
      },
      {
        id: "export-json-csv",
        title: "Export artifacts",
        description: "Downloads cleaned JSON and CSV variants with summary.",
        executionMode: "export-only",
      },
    ],
    outputArtifacts: ["cleaned.json", "payload.csv", "summary.json"],
  },
  {
    id: "wf-blog-publish",
    slug: "blog-publish",
    name: "Blog Publish",
    summary:
      "Turn draft markdown into publication-ready assets with metadata and image optimization.",
    category: "content",
    tags: ["markdown", "seo", "blog", "image", "metadata"],
    steps: [
      {
        id: "markdown-cleanup",
        title: "Markdown cleanup",
        description: "Normalizes heading structure, spacing, and formatting.",
        executionMode: "local-only",
      },
      {
        id: "meta-helper",
        title: "Generate title/meta helper",
        description:
          "Creates draft title, description, and keyword suggestions.",
        executionMode: "local-only",
      },
      {
        id: "image-optimize",
        title: "Optimize social image",
        description: "Compresses preview images for publishing.",
        executionMode: "local-only",
      },
      {
        id: "schema-helper",
        title: "Generate schema helper",
        description: "Builds JSON-LD snippets for article pages.",
        executionMode: "export-only",
      },
    ],
    outputArtifacts: ["post.md", "meta.json", "schema.json"],
  },
  {
    id: "wf-seo-quick-audit",
    slug: "technical-seo-quick-audit",
    name: "Technical SEO Quick Audit",
    summary:
      "Run a focused SEO pre-flight audit for metadata, robots, sitemap, and schema checks.",
    category: "seo",
    tags: ["seo", "metadata", "robots", "sitemap", "schema"],
    steps: [
      {
        id: "robots-sitemap",
        title: "Validate robots and sitemap",
        description: "Checks robots directives and sitemap discoverability.",
        executionMode: "local-only",
      },
      {
        id: "meta-check",
        title: "Validate metadata",
        description: "Ensures title/description/canonical coverage.",
        executionMode: "local-only",
      },
      {
        id: "schema-check",
        title: "Validate structured data",
        description: "Verifies required schema fields are present.",
        executionMode: "local-only",
      },
      {
        id: "export-audit",
        title: "Export audit report",
        description: "Downloads an actionable JSON report.",
        executionMode: "export-only",
      },
    ],
    outputArtifacts: ["seo-audit.json"],
  },
  {
    id: "wf-private-document-prep",
    slug: "private-document-prep",
    name: "Private Document Prep",
    summary: "Merge, split, and compress documents with fully local execution.",
    category: "document",
    tags: ["pdf", "merge", "split", "compress", "private"],
    steps: [
      {
        id: "doc-ingest",
        title: "Load and inspect documents",
        description: "Previews document set and basic file metadata.",
        executionMode: "local-only",
      },
      {
        id: "doc-transform",
        title: "Apply merge/split/compress",
        description: "Processes documents using local browser APIs.",
        executionMode: "local-only",
      },
      {
        id: "doc-export",
        title: "Export finalized package",
        description: "Downloads transformed PDFs and operation summary.",
        executionMode: "export-only",
      },
    ],
    outputArtifacts: ["documents.zip", "document-summary.json"],
  },
  {
    id: "wf-media-publish",
    slug: "media-publish",
    name: "Media Publish",
    summary:
      "Prepare images for publishing with resize, conversion, and naming presets.",
    category: "media",
    tags: ["image", "resize", "convert", "publish", "batch"],
    steps: [
      {
        id: "media-resize",
        title: "Resize assets",
        description: "Applies publish-target dimensions.",
        executionMode: "local-only",
      },
      {
        id: "media-compress",
        title: "Compress assets",
        description: "Reduces size while preserving acceptable quality.",
        executionMode: "local-only",
      },
      {
        id: "media-naming",
        title: "Apply naming convention",
        description: "Standardizes file names and slug patterns.",
        executionMode: "local-only",
      },
      {
        id: "media-export",
        title: "Export media package",
        description: "Downloads optimized and renamed assets.",
        executionMode: "export-only",
      },
    ],
    outputArtifacts: ["media-package.zip", "media-summary.json"],
  },
];

export const workflowBySlug = Object.fromEntries(
  workflowPacks.map((pack) => [pack.slug, pack]),
);

export const featuredWorkflowSlugs = [
  "api-payload-cleanup",
  "blog-publish",
  "technical-seo-quick-audit",
];
