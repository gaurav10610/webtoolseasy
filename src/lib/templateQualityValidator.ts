import type { WorkflowPackConfig } from "@/types/workflow";
import type { ApplicationConfig } from "@/types/config";

/**
 * Template Quality Validator
 *
 * Enforces quality gates for template/workflow pages:
 * - Uniqueness checks (title, meta description, content overlap)
 * - Thin content detection
 * - Keyword stuffing prevention
 * - Content diversity metrics
 */

interface UniquenesIssue {
  type:
    | "duplicate_title"
    | "duplicate_meta"
    | "content_overlap"
    | "similar_heading";
  severity: "error" | "warning" | "info";
  item1: string;
  item2: string;
  field: string;
  similarity: number; // 0-1, where 1 is identical
  message: string;
}

interface ThinContentIssue {
  type:
    | "insufficient_length"
    | "keyword_stuffing"
    | "low_content_density"
    | "template_bloat";
  severity: "error" | "warning" | "info";
  itemId: string;
  itemName: string;
  metric: string;
  value: number;
  threshold: number;
  message: string;
}

interface QualityCheckResult {
  uniquenessIssues: UniquenesIssue[];
  thinContentIssues: ThinContentIssue[];
  summary: {
    totalItems: number;
    uniquenessViolations: number;
    thinContentViolations: number;
    avgContentLength: number;
    avgUniqueTerms: number;
    passRate: number;
  };
}

/**
 * Configuration thresholds for quality checks
 */
const QUALITY_THRESHOLDS = {
  minWordCount: 100, // Minimum words per page
  minUniqueTerms: 30, // Minimum unique terms
  maxSimilarity: 0.7, // Max allowed similarity (70%)
  minContentLength: 200, // Minimum characters (excluding HTML/markup)
  maxKeywordDensity: 0.15, // Max keyword density (15%)
  minHeadingVariety: 3, // Min different heading types
  minSentenceLength: 5, // Min average words per sentence
};

/**
 * Calculate simple text similarity (Jaccard index of words)
 */
export function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(
    text1
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 3),
  );
  const words2 = new Set(
    text2
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 3),
  );

  if (words1.size === 0 || words2.size === 0) return 0;

  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

/**
 * Extract plain text from potential HTML/markdown
 */
export function extractPlainText(text: string): string {
  // Remove HTML tags
  let plain = text.replace(/<[^>]*>/g, " ");
  // Remove markdown formatting
  plain = plain.replace(/[*_`\[\]()#]/g, " ");
  // Normalize whitespace
  plain = plain.replace(/\s+/g, " ").trim();
  return plain;
}

/**
 * Calculate unique terms (unique words excluding common stop words)
 */
export function calculateUniqueTerms(text: string): Set<string> {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "by",
    "from",
    "as",
    "it",
    "this",
    "that",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "can",
    "might",
    "must",
    "shall",
    "you",
    "i",
    "we",
    "they",
    "he",
    "she",
    "me",
    "us",
  ]);

  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !stopWords.has(w));

  return new Set(words);
}

/**
 * Check for duplicate titles across templates
 */
export function checkDuplicateTitles(
  items: (WorkflowPackConfig | (ApplicationConfig & { id: string }))[],
): UniquenesIssue[] {
  const issues: UniquenesIssue[] = [];
  const titleMap = new Map<string, string[]>();

  items.forEach((item) => {
    const title =
      (item as any).title ||
      (item as any).displayText ||
      (item as any).name ||
      "";
    const normalizedTitle = title.toLowerCase().trim();

    if (!titleMap.has(normalizedTitle)) {
      titleMap.set(normalizedTitle, []);
    }
    titleMap.get(normalizedTitle)!.push(item.id || (item as any).slug);
  });

  titleMap.forEach((ids, title) => {
    if (ids.length > 1) {
      for (let i = 0; i < ids.length - 1; i++) {
        issues.push({
          type: "duplicate_title",
          severity: "error",
          item1: ids[i],
          item2: ids[i + 1],
          field: "title",
          similarity: 1.0,
          message: `Duplicate title found: "${title}" used by ${ids.join(" and ")}`,
        });
      }
    }
  });

  return issues;
}

/**
 * Check for duplicate meta descriptions
 */
export function checkDuplicateMetaDescriptions(
  items: (WorkflowPackConfig | any)[],
): UniquenesIssue[] {
  const issues: UniquenesIssue[] = [];
  const metaMap = new Map<string, string[]>();

  items.forEach((item) => {
    const meta =
      (item as any).metaDescription || (item as any).description || "";
    const normalizedMeta = meta.toLowerCase().trim();

    if (normalizedMeta && normalizedMeta.length > 10) {
      if (!metaMap.has(normalizedMeta)) {
        metaMap.set(normalizedMeta, []);
      }
      metaMap.get(normalizedMeta)!.push(item.id || (item as any).slug);
    }
  });

  metaMap.forEach((ids, meta) => {
    if (ids.length > 1) {
      for (let i = 0; i < ids.length - 1; i++) {
        issues.push({
          type: "duplicate_meta",
          severity: "warning",
          item1: ids[i],
          item2: ids[i + 1],
          field: "metaDescription",
          similarity: 1.0,
          message: `Duplicate meta description: "${meta.substring(0, 50)}..." used by ${ids.join(" and ")}`,
        });
      }
    }
  });

  return issues;
}

/**
 * Check for content overlap between templates
 */
export function checkContentOverlap(
  items: (WorkflowPackConfig | any)[],
  threshold: number = QUALITY_THRESHOLDS.maxSimilarity,
): UniquenesIssue[] {
  const issues: UniquenesIssue[] = [];

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const item1 = items[i];
      const item2 = items[j];

      const content1 = extractPlainText(
        (item1 as any).description || (item1 as any).metaDescription || "",
      );
      const content2 = extractPlainText(
        (item2 as any).description || (item2 as any).metaDescription || "",
      );

      if (content1.length > 20 && content2.length > 20) {
        const similarity = calculateSimilarity(content1, content2);

        if (similarity > threshold) {
          issues.push({
            type: "content_overlap",
            severity: similarity > 0.9 ? "error" : "warning",
            item1: item1.id || (item1 as any).slug,
            item2: item2.id || (item2 as any).slug,
            field: "description",
            similarity,
            message: `High content similarity (${(similarity * 100).toFixed(1)}%) between "${item1.name || item1.displayText}" and "${item2.name || item2.displayText}"`,
          });
        }
      }
    }
  }

  return issues;
}

/**
 * Check for thin content in individual items
 */
export function checkThinContent(
  items: (WorkflowPackConfig | any)[],
): ThinContentIssue[] {
  const issues: ThinContentIssue[] = [];

  items.forEach((item) => {
    const itemId = item.id || (item as any).slug;
    const itemName = (item as any).name || (item as any).displayText || itemId;

    const content = extractPlainText(
      (item as any).description || (item as any).metaDescription || "",
    );

    const words = content.split(/\s+/).filter((w) => w.length > 0);
    const uniqueTerms = calculateUniqueTerms(content);

    // Check word count
    if (words.length < QUALITY_THRESHOLDS.minWordCount) {
      issues.push({
        type: "insufficient_length",
        severity: words.length < 50 ? "error" : "warning",
        itemId,
        itemName,
        metric: "wordCount",
        value: words.length,
        threshold: QUALITY_THRESHOLDS.minWordCount,
        message: `Content too short (${words.length} words, minimum ${QUALITY_THRESHOLDS.minWordCount} required) for "${itemName}"`,
      });
    }

    // Check unique terms
    if (uniqueTerms.size < QUALITY_THRESHOLDS.minUniqueTerms) {
      issues.push({
        type: "low_content_density",
        severity: "warning",
        itemId,
        itemName,
        metric: "uniqueTerms",
        value: uniqueTerms.size,
        threshold: QUALITY_THRESHOLDS.minUniqueTerms,
        message: `Low content diversity (${uniqueTerms.size} unique terms, minimum ${QUALITY_THRESHOLDS.minUniqueTerms} recommended) for "${itemName}"`,
      });
    }

    // Check for keyword stuffing (repeated words)
    const termFrequency = new Map<string, number>();
    words.forEach((word) => {
      const term = word.toLowerCase();
      termFrequency.set(term, (termFrequency.get(term) || 0) + 1);
    });

    const maxFrequency = Math.max(...termFrequency.values());
    const keywordDensity = maxFrequency / (words.length || 1);

    if (keywordDensity > QUALITY_THRESHOLDS.maxKeywordDensity) {
      const keywordTerm = Array.from(termFrequency.entries()).reduce((a, b) =>
        a[1] > b[1] ? a : b,
      )[0];

      issues.push({
        type: "keyword_stuffing",
        severity: "warning",
        itemId,
        itemName,
        metric: "keywordDensity",
        value: keywordDensity,
        threshold: QUALITY_THRESHOLDS.maxKeywordDensity,
        message: `Keyword stuffing detected: "${keywordTerm}" appears ${maxFrequency} times (${(keywordDensity * 100).toFixed(1)}% density) in "${itemName}"`,
      });
    }
  });

  return issues;
}

/**
 * Main validation function
 */
export async function checkTemplateQuality(
  workflows?: WorkflowPackConfig[],
  tools?: any[],
): Promise<QualityCheckResult> {
  const uniquenessIssues: UniquenesIssue[] = [];
  const thinContentIssues: ThinContentIssue[] = [];

  // Import data if not provided (for testing)
  if (!workflows) {
    const { workflowPacks } = await import("@/data/workflows");
    workflows = workflowPacks;
  }

  if (!tools) {
    const { apps } = await import("@/data/apps");
    tools = Object.entries(apps).map(([id, config]) => ({
      ...config,
      id,
    }));
  }

  const allItems = [
    ...(workflows || []).map((w) => ({ ...w, id: w.slug, type: "workflow" })),
    ...(tools || []).map((t) => ({
      ...t,
      id: (t as any).applicationId,
      type: "tool",
    })),
  ];

  // Run checks
  uniquenessIssues.push(...checkDuplicateTitles(allItems));
  uniquenessIssues.push(...checkDuplicateMetaDescriptions(allItems));
  uniquenessIssues.push(...checkContentOverlap(allItems));
  thinContentIssues.push(...checkThinContent(allItems));

  // Calculate statistics
  const contentLengths = allItems
    .map(
      (item) =>
        extractPlainText(
          (item as any).description || (item as any).metaDescription || "",
        ).split(/\s+/).length,
    )
    .filter((len) => len > 0);

  const avgContentLength =
    contentLengths.length > 0
      ? Math.round(
          contentLengths.reduce((a, b) => a + b, 0) / contentLengths.length,
        )
      : 0;

  const uniqueTermsPerItem = allItems.map(
    (item) =>
      calculateUniqueTerms(
        extractPlainText(
          (item as any).description || (item as any).metaDescription || "",
        ),
      ).size,
  );

  const avgUniqueTerms =
    uniqueTermsPerItem.length > 0
      ? Math.round(
          uniqueTermsPerItem.reduce((a, b) => a + b, 0) /
            uniqueTermsPerItem.length,
        )
      : 0;

  const passRate =
    allItems.length > 0
      ? (allItems.length -
          thinContentIssues.filter((i) => i.severity === "error").length) /
        allItems.length
      : 1;

  return {
    uniquenessIssues,
    thinContentIssues,
    summary: {
      totalItems: allItems.length,
      uniquenessViolations: uniquenessIssues.length,
      thinContentViolations: thinContentIssues.length,
      avgContentLength,
      avgUniqueTerms,
      passRate,
    },
  };
}

/**
 * Generate human-readable report
 */
export function generateQualityReport(result: QualityCheckResult): string {
  const lines: string[] = [];

  lines.push("# Template Quality Report\n");
  lines.push(
    `**Status**: ${result.summary.passRate === 1 ? "✅ PASS" : "🚨 FAIL"}`,
  );
  lines.push(`**Items Checked**: ${result.summary.totalItems}`);
  lines.push(`**Pass Rate**: ${(result.summary.passRate * 100).toFixed(1)}%\n`);

  lines.push("## Summary Statistics");
  lines.push(
    `- Average Content Length: ${result.summary.avgContentLength} words`,
  );
  lines.push(`- Average Unique Terms: ${result.summary.avgUniqueTerms}`);
  lines.push(`- Uniqueness Violations: ${result.summary.uniquenessViolations}`);
  lines.push(
    `- Thin Content Violations: ${result.summary.thinContentViolations}\n`,
  );

  if (result.uniquenessIssues.length > 0) {
    lines.push("## Uniqueness Issues");
    result.uniquenessIssues.forEach((issue) => {
      lines.push(`- **${issue.type}** (${issue.severity}): ${issue.message}`);
      lines.push(`  Items: ${issue.item1} ↔ ${issue.item2}`);
      if (issue.similarity < 1) {
        lines.push(`  Similarity: ${(issue.similarity * 100).toFixed(1)}%`);
      }
    });
    lines.push("");
  }

  if (result.thinContentIssues.length > 0) {
    lines.push("## Thin Content Issues");
    result.thinContentIssues.forEach((issue) => {
      lines.push(`- **${issue.type}** (${issue.severity}): ${issue.message}`);
      lines.push(`  Item: ${issue.itemName} (${issue.itemId})`);
    });
    lines.push("");
  }

  if (
    result.uniquenessIssues.length === 0 &&
    result.thinContentIssues.length === 0
  ) {
    lines.push("## Result");
    lines.push(
      "✅ All quality checks passed! Template content is diverse and substantial.",
    );
  }

  return lines.join("\n");
}

/**
 * Export for testing
 */
export { calculateSimilarity as _calculateSimilarity };
export { extractPlainText as _extractPlainText };
export { calculateUniqueTerms as _calculateUniqueTerms };
export { checkDuplicateTitles as _checkDuplicateTitles };
export { checkDuplicateMetaDescriptions as _checkDuplicateMetaDescriptions };
export { checkContentOverlap as _checkContentOverlap };
export { checkThinContent as _checkThinContent };
