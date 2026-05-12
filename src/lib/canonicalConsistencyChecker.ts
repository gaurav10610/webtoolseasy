import type { WorkflowPackConfig } from "@/types/workflow";

/**
 * Canonical Consistency Checker
 * Validates that canonical URLs are consistent across the site
 * and detects duplicate path patterns that could cause SEO issues.
 *
 * Usage:
 * const issues = await checkCanonicalConsistency();
 */

interface CanonicalIssue {
  type:
    | "duplicate_canonical"
    | "missing_canonical"
    | "mismatch"
    | "trailing_slash";
  severity: "error" | "warning" | "info";
  path: string;
  expected: string;
  actual?: string;
  message: string;
}

interface CanonicalCheckResult {
  isValid: boolean;
  issues: CanonicalIssue[];
  summary: {
    totalPaths: number;
    duplicates: number;
    mismatches: number;
    trailingSlashIssues: number;
  };
}

/**
 * Build the canonical URL for a given path
 */
export function buildCanonical(
  path: string,
  baseUrl: string = "https://webtoolseasy.com",
): string {
  // Normalize: remove trailing slash, ensure leading slash
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withoutTrailing =
    normalized.endsWith("/") && normalized !== "/"
      ? normalized.slice(0, -1)
      : normalized;

  return `${baseUrl}${withoutTrailing}`;
}

/**
 * Check for duplicate canonical URLs (same canonical for different paths)
 */
export function checkForDuplicates(
  paths: Map<string, string[]>, // canonical -> [paths that use it]
): CanonicalIssue[] {
  const issues: CanonicalIssue[] = [];

  paths.forEach((pathList, canonical) => {
    if (pathList.length > 1) {
      issues.push({
        type: "duplicate_canonical",
        severity: "error",
        path: pathList.join(", "),
        expected: canonical,
        actual: canonical,
        message: `Multiple paths resolve to same canonical: ${pathList.join(", ")} -> ${canonical}`,
      });
    }
  });

  return issues;
}

/**
 * Check for trailing slash inconsistency
 */
export function checkTrailingSlashes(paths: Set<string>): CanonicalIssue[] {
  const issues: CanonicalIssue[] = [];
  const pathsArray = Array.from(paths);

  for (const path of pathsArray) {
    // Check if both /path and /path/ exist
    const withSlash = path.endsWith("/") ? path : `${path}/`;
    const withoutSlash = path.endsWith("/") ? path.slice(0, -1) : path;

    if (paths.has(withSlash) && paths.has(withoutSlash) && path.length > 1) {
      issues.push({
        type: "trailing_slash",
        severity: "warning",
        path: path,
        expected: withoutSlash, // Prefer without trailing slash
        actual: path,
        message: `Path exists with and without trailing slash: ${withSlash} and ${withoutSlash}`,
      });
    }
  }

  return issues;
}

/**
 * Check tool URLs for canonical consistency
 */
export function checkToolUrls(tools: Map<string, any>): CanonicalIssue[] {
  const issues: CanonicalIssue[] = [];
  const seenCanonicals = new Map<string, string>();

  tools.forEach((tool, toolId) => {
    if (!tool.navigateUrl) {
      issues.push({
        type: "missing_canonical",
        severity: "error",
        path: toolId,
        expected: `/tools/${toolId}`,
        message: `Tool missing navigateUrl: ${toolId}`,
      });
      return;
    }

    const canonical = buildCanonical(tool.navigateUrl);
    const existing = seenCanonicals.get(canonical);

    if (existing && existing !== toolId) {
      issues.push({
        type: "duplicate_canonical",
        severity: "error",
        path: toolId,
        expected: canonical,
        message: `Tool ${toolId} has duplicate canonical with ${existing}: ${canonical}`,
      });
    }

    seenCanonicals.set(canonical, toolId);

    // Verify pattern
    if (!tool.navigateUrl.startsWith("/tools/")) {
      issues.push({
        type: "mismatch",
        severity: "error",
        path: toolId,
        expected: `/tools/${toolId}`,
        actual: tool.navigateUrl,
        message: `Tool URL doesn't follow /tools/ pattern: ${tool.navigateUrl}`,
      });
    }
  });

  return issues;
}

/**
 * Check workflow URLs for canonical consistency
 */
export function checkWorkflowUrls(
  workflows: WorkflowPackConfig[],
): CanonicalIssue[] {
  const issues: CanonicalIssue[] = [];
  const seenCanonicals = new Map<string, string>();

  workflows.forEach((workflow) => {
    if (!workflow.slug) {
      issues.push({
        type: "missing_canonical",
        severity: "error",
        path: workflow.id,
        expected: `/workflows/${workflow.id}`,
        message: `Workflow missing slug: ${workflow.id}`,
      });
      return;
    }

    const url = `/workflows/${workflow.slug}`;
    const canonical = buildCanonical(url);
    const existing = seenCanonicals.get(canonical);

    if (existing && existing !== workflow.id) {
      issues.push({
        type: "duplicate_canonical",
        severity: "error",
        path: workflow.id,
        expected: canonical,
        message: `Workflow ${workflow.id} has duplicate canonical with ${existing}: ${canonical}`,
      });
    }

    seenCanonicals.set(canonical, workflow.id);

    // Verify slug format (kebab-case)
    if (!/^[a-z0-9\-]+$/.test(workflow.slug)) {
      issues.push({
        type: "mismatch",
        severity: "warning",
        path: workflow.id,
        expected: workflow.slug.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        actual: workflow.slug,
        message: `Workflow slug not in kebab-case: ${workflow.slug}`,
      });
    }
  });

  return issues;
}

/**
 * Check blog post URLs
 */
export function checkBlogUrls(
  blogPosts: Record<string, any>,
): CanonicalIssue[] {
  const issues: CanonicalIssue[] = [];
  const seenCanonicals = new Map<string, string>();

  Object.entries(blogPosts).forEach(([_, post]) => {
    if (!post.slug) {
      issues.push({
        type: "missing_canonical",
        severity: "error",
        path: post.title,
        expected: `/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`,
        message: `Blog post missing slug: ${post.title}`,
      });
      return;
    }

    const url = `/blog/${post.slug}`;
    const canonical = buildCanonical(url);
    const existing = seenCanonicals.get(canonical);

    if (existing && existing !== post.slug) {
      issues.push({
        type: "duplicate_canonical",
        severity: "error",
        path: post.slug,
        expected: canonical,
        message: `Blog post ${post.slug} has duplicate canonical with ${existing}`,
      });
    }

    seenCanonicals.set(canonical, post.slug);
  });

  return issues;
}

/**
 * Check for cross-domain conflicts (tool vs workflow vs blog)
 */
export function checkCrossDomainConflicts(
  toolSlugs: Set<string>,
  workflowSlugs: Set<string>,
  blogSlugs: Set<string>,
): CanonicalIssue[] {
  const issues: CanonicalIssue[] = [];

  // Check tool vs workflow conflicts
  const toolWorkflowConflict = Array.from(toolSlugs).filter((t) =>
    workflowSlugs.has(t),
  );
  toolWorkflowConflict.forEach((slug) => {
    issues.push({
      type: "duplicate_canonical",
      severity: "error",
      path: slug,
      expected: slug,
      message: `Slug ${slug} used in both /tools/ and /workflows/ routes`,
    });
  });

  // Check tool vs blog conflicts
  const toolBlogConflict = Array.from(toolSlugs).filter((t) =>
    blogSlugs.has(t),
  );
  toolBlogConflict.forEach((slug) => {
    issues.push({
      type: "duplicate_canonical",
      severity: "error",
      path: slug,
      expected: slug,
      message: `Slug ${slug} used in both /tools/ and /blog/ routes`,
    });
  });

  // Check workflow vs blog conflicts
  const workflowBlogConflict = Array.from(workflowSlugs).filter((w) =>
    blogSlugs.has(w),
  );
  workflowBlogConflict.forEach((slug) => {
    issues.push({
      type: "duplicate_canonical",
      severity: "error",
      path: slug,
      expected: slug,
      message: `Slug ${slug} used in both /workflows/ and /blog/ routes`,
    });
  });

  return issues;
}

/**
 * Main function: Check all canonical consistency
 */
export async function checkCanonicalConsistency(
  tools?: Map<string, any>,
  workflows?: WorkflowPackConfig[],
  blogPosts?: Record<string, any>,
): Promise<CanonicalCheckResult> {
  const issues: CanonicalIssue[] = [];

  // Import data if not provided (for testing)
  if (!tools) {
    const { apps } = await import("@/data/apps");
    tools = new Map(Object.entries(apps));
  }

  if (!workflows) {
    const { workflowPacks } = await import("@/data/workflows");
    workflows = workflowPacks;
  }

  if (!blogPosts) {
    const { blogPosts: posts } = await import("@/data/blogPosts");
    blogPosts = posts;
  }

  // Check each domain
  issues.push(...checkToolUrls(tools));
  issues.push(...checkWorkflowUrls(workflows));
  issues.push(...checkBlogUrls(blogPosts));

  // Extract slugs for cross-domain checks
  const toolSlugs = new Set(
    Array.from(tools.values())
      .map((t) => t.navigateUrl)
      .filter((url) => url?.startsWith("/tools/"))
      .map((url) => url.replace("/tools/", "")),
  );

  const workflowSlugs = new Set(workflows.map((w) => w.slug));
  const blogSlugs = new Set(
    Object.values(blogPosts)
      .filter((p) => p && typeof p === "object" && "slug" in p)
      .map((p: any) => p.slug),
  );

  // Check for cross-domain conflicts
  issues.push(
    ...checkCrossDomainConflicts(toolSlugs, workflowSlugs, blogSlugs),
  );

  // Check trailing slashes
  const allPaths = new Set(
    [
      ...Array.from(tools.values()).map((t) => t.navigateUrl),
      ...workflows.map((w) => `/workflows/${w.slug}`),
      ...Object.values(blogPosts)
        .filter((p) => p && typeof p === "object" && "slug" in p)
        .map((p: any) => `/blog/${p.slug}`),
    ].filter(Boolean) as string[],
  );

  issues.push(...checkTrailingSlashes(allPaths));

  // Compute summary
  const summary = {
    totalPaths: allPaths.size,
    duplicates: issues.filter((i) => i.type === "duplicate_canonical").length,
    mismatches: issues.filter((i) => i.type === "mismatch").length,
    trailingSlashIssues: issues.filter((i) => i.type === "trailing_slash")
      .length,
  };

  return {
    isValid: issues.filter((i) => i.severity === "error").length === 0,
    issues,
    summary,
  };
}

/**
 * Generate human-readable report
 */
export function generateCanonicalReport(result: CanonicalCheckResult): string {
  let report = `\n📋 Canonical Consistency Check Report\n`;
  report += `${"=".repeat(50)}\n\n`;

  report += `✅ Valid: ${result.isValid ? "PASS" : "FAIL"}\n`;
  report += `📊 Summary:\n`;
  report += `  - Total Paths: ${result.summary.totalPaths}\n`;
  report += `  - Duplicates: ${result.summary.duplicates}\n`;
  report += `  - Mismatches: ${result.summary.mismatches}\n`;
  report += `  - Trailing Slash Issues: ${result.summary.trailingSlashIssues}\n\n`;

  if (result.issues.length === 0) {
    report += `✅ No issues found!\n`;
    return report;
  }

  const byType = {
    error: result.issues.filter((i) => i.severity === "error"),
    warning: result.issues.filter((i) => i.severity === "warning"),
    info: result.issues.filter((i) => i.severity === "info"),
  };

  if (byType.error.length > 0) {
    report += `🚨 Errors (${byType.error.length}):\n`;
    byType.error.forEach((issue) => {
      report += `  - ${issue.message}\n`;
      report += `    Path: ${issue.path}\n`;
      if (issue.actual) report += `    Actual: ${issue.actual}\n`;
      report += `    Expected: ${issue.expected}\n\n`;
    });
  }

  if (byType.warning.length > 0) {
    report += `⚠️  Warnings (${byType.warning.length}):\n`;
    byType.warning.forEach((issue) => {
      report += `  - ${issue.message}\n`;
    });
    report += "\n";
  }

  return report;
}

/**
 * Export functions for testing
 */
export const __testing = {
  buildCanonical,
  checkForDuplicates,
  checkTrailingSlashes,
  checkToolUrls,
  checkWorkflowUrls,
  checkBlogUrls,
  checkCrossDomainConflicts,
};
