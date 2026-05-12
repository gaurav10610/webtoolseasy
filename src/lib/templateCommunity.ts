/**
 * Template Community Management
 *
 * TB-141: Add abuse/spam prevention checks for template titles/descriptions
 * TB-142: Add template versioning and update history metadata
 * TB-143: Add template clone count and popularity ranking logic
 */

/**
 * Spam/abuse prevention for community templates
 */
export interface SpamCheckResult {
  isSpam: boolean;
  riskScore: number; // 0-100
  issues: SpamIssue[];
}

export interface SpamIssue {
  type:
    | "excessive_links"
    | "suspicious_keywords"
    | "keyword_stuffing"
    | "length_abuse"
    | "profanity"
    | "repeated_chars";
  severity: "low" | "medium" | "high";
  description: string;
}

// Common spam patterns and suspicious keywords
const SUSPICIOUS_KEYWORDS = [
  "click here",
  "buy now",
  "limited offer",
  "act now",
  "urgent",
  "guarantee",
  "free money",
  "make money fast",
  "bitcoin",
  "casino",
  "lottery",
  "viagra",
  "pharmacy",
  "weight loss pill",
  "diet pill",
  "secret",
  "banned",
  "classified",
];

const SPAM_PATTERNS = {
  excessiveLinks: /https?:\/\/.*?\.com/gi, // Multiple links
  repeatedChars: /(.)\1{4,}/g, // 5+ repeated characters
  allCaps: /^[A-Z\s!?]{10,}$/, // All caps text
  numbers: /\d{10,}/, // 10+ digit numbers
};

/**
 * Check if template title/description contains spam indicators
 */
export function checkForSpam(text: string): SpamCheckResult {
  const issues: SpamIssue[] = [];
  let riskScore = 0;

  // Check for excessive links
  const linkMatches = text.match(SPAM_PATTERNS.excessiveLinks) || [];
  if (linkMatches.length > 2) {
    issues.push({
      type: "excessive_links",
      severity: "high",
      description: `Found ${linkMatches.length} links in text`,
    });
    riskScore += 25;
  }

  // Check for suspicious keywords
  const lowerText = text.toLowerCase();
  const foundKeywords = SUSPICIOUS_KEYWORDS.filter((kw) =>
    lowerText.includes(kw),
  );
  if (foundKeywords.length > 0) {
    issues.push({
      type: "suspicious_keywords",
      severity: "medium",
      description: `Found suspicious keywords: ${foundKeywords.join(", ")}`,
    });
    // Increase risk for each suspicious keyword found
    riskScore += Math.min(foundKeywords.length * 20, 50);
  }

  // Check for keyword stuffing (repeated words)
  const words = text.split(/\s+/);
  const wordFreq = new Map<string, number>();
  for (const word of words) {
    wordFreq.set(
      word.toLowerCase(),
      (wordFreq.get(word.toLowerCase()) || 0) + 1,
    );
  }

  const stuffedWords = Array.from(wordFreq.entries())
    .filter(([, count]) => count > Math.max(words.length * 0.2, 5))
    .map(([word]) => word);

  if (stuffedWords.length > 0) {
    issues.push({
      type: "keyword_stuffing",
      severity: "medium",
      description: `Repeated words: ${stuffedWords.join(", ")}`,
    });
    riskScore += 20;
  }

  // Check for repeated characters
  if (SPAM_PATTERNS.repeatedChars.test(text)) {
    issues.push({
      type: "repeated_chars",
      severity: "low",
      description: "Contains excessive repeated characters",
    });
    riskScore += 10;
  }

  // Check for all caps abuse
  if (text.length > 20 && SPAM_PATTERNS.allCaps.test(text)) {
    issues.push({
      type: "length_abuse",
      severity: "medium",
      description: "Text is all caps",
    });
    riskScore += 15;
  }

  return {
    isSpam: riskScore > 30, // Lowered threshold from 40 to 30
    riskScore: Math.min(riskScore, 100),
    issues,
  };
}

/**
 * Template versioning and history
 */
export interface TemplateVersion {
  versionId: string;
  templateId: string;
  version: string; // e.g., "1.0.0"
  createdAt: Date;
  createdBy: string; // user ID
  changes: string; // Change description
  isReleased: boolean;
  stepSnapshot: Record<string, unknown>; // Serialized workflow state
}

export interface TemplateHistory {
  templateId: string;
  versions: TemplateVersion[];
  currentVersion: string;
  totalVersions: number;
}

/**
 * Create new template version
 */
export function createTemplateVersion(
  templateId: string,
  currentVersion: string,
  changes: string,
  stepSnapshot: Record<string, unknown>,
): TemplateVersion {
  const versionParts = currentVersion.split(".");
  const patchVersion = parseInt(versionParts[2] || "0") + 1;
  const newVersion = `${versionParts[0]}.${versionParts[1] || "0"}.${patchVersion}`;

  return {
    versionId: `${templateId}-v${newVersion}`,
    templateId,
    version: newVersion,
    createdAt: new Date(),
    createdBy: "",
    changes,
    isReleased: false,
    stepSnapshot,
  };
}

/**
 * Initialize template history
 */
export function initializeTemplateHistory(templateId: string): TemplateHistory {
  return {
    templateId,
    versions: [],
    currentVersion: "1.0.0",
    totalVersions: 0,
  };
}

/**
 * Template popularity and ranking
 */
export interface TemplatePopularity {
  templateId: string;
  cloneCount: number;
  viewCount: number;
  favoriteCount: number;
  averageRating: number;
  ratingCount: number;
  popularityScore: number; // 0-100
  tier: "unknown" | "emerging" | "trending" | "popular" | "featured";
  lastActivityAt?: Date;
}

/**
 * Calculate popularity score
 */
export function calculatePopularityScore(data: {
  cloneCount: number;
  viewCount: number;
  favoriteCount: number;
  averageRating: number;
  ratingCount: number;
}): number {
  let score = 0;

  // Clones: weighted heavily (40% of score)
  score += Math.min((data.cloneCount / 100) * 40, 40);

  // Favorites: weighted moderately (30% of score)
  score += Math.min((data.favoriteCount / 10) * 30, 30);

  // Rating: weighted moderately (20% of score)
  if (data.ratingCount > 0) {
    score += (data.averageRating / 5) * 20;
  }

  // Views: light weight (10% of score)
  score += Math.min((data.viewCount / 1000) * 10, 10);

  return Math.round(score);
}

/**
 * Categorize template by popularity tier
 */
export function categorizePopularityTier(
  popularityScore: number,
  cloneCount: number,
): "unknown" | "emerging" | "trending" | "popular" | "featured" {
  if (cloneCount === 0 && popularityScore === 0) return "unknown";
  if (popularityScore < 10) return "emerging";
  if (popularityScore < 30 || cloneCount < 50) return "trending";
  if (popularityScore < 60 || cloneCount < 200) return "popular";
  return "featured";
}

/**
 * Track template clone action
 */
export function incrementTemplateClone(
  popularity: TemplatePopularity,
): TemplatePopularity {
  const updated = { ...popularity };
  updated.cloneCount += 1;
  updated.lastActivityAt = new Date();
  updated.popularityScore = calculatePopularityScore({
    cloneCount: updated.cloneCount,
    viewCount: updated.viewCount,
    favoriteCount: updated.favoriteCount,
    averageRating: updated.averageRating,
    ratingCount: updated.ratingCount,
  });
  updated.tier = categorizePopularityTier(
    updated.popularityScore,
    updated.cloneCount,
  );
  return updated;
}

/**
 * Track template view
 */
export function incrementTemplateView(
  popularity: TemplatePopularity,
): TemplatePopularity {
  const updated = { ...popularity };
  updated.viewCount += 1;
  updated.lastActivityAt = new Date();
  updated.popularityScore = calculatePopularityScore({
    cloneCount: updated.cloneCount,
    viewCount: updated.viewCount,
    favoriteCount: updated.favoriteCount,
    averageRating: updated.averageRating,
    ratingCount: updated.ratingCount,
  });
  return updated;
}

/**
 * Add rating to template
 */
export function addTemplateRating(
  popularity: TemplatePopularity,
  rating: number, // 1-5
): TemplatePopularity {
  const updated = { ...popularity };
  const totalRatings = updated.ratingCount + 1;
  updated.averageRating =
    (updated.averageRating * updated.ratingCount + rating) / totalRatings;
  updated.ratingCount = totalRatings;
  updated.lastActivityAt = new Date();
  updated.popularityScore = calculatePopularityScore({
    cloneCount: updated.cloneCount,
    viewCount: updated.viewCount,
    favoriteCount: updated.favoriteCount,
    averageRating: updated.averageRating,
    ratingCount: updated.ratingCount,
  });
  return updated;
}

/**
 * Get template ranking by popularity
 */
export function rankTemplatesByPopularity(
  templates: TemplatePopularity[],
): TemplatePopularity[] {
  return [...templates].sort((a, b) => {
    // Primary: popularity score (descending)
    if (a.popularityScore !== b.popularityScore) {
      return b.popularityScore - a.popularityScore;
    }
    // Secondary: clone count (descending)
    if (a.cloneCount !== b.cloneCount) {
      return b.cloneCount - a.cloneCount;
    }
    // Tertiary: recent activity (descending)
    const aTime = a.lastActivityAt?.getTime() || 0;
    const bTime = b.lastActivityAt?.getTime() || 0;
    return bTime - aTime;
  });
}

/**
 * Export for testing
 */
export {
  checkForSpam as _checkForSpam,
  createTemplateVersion as _createTemplateVersion,
  initializeTemplateHistory as _initializeTemplateHistory,
  calculatePopularityScore as _calculatePopularityScore,
  categorizePopularityTier as _categorizePopularityTier,
  incrementTemplateClone as _incrementTemplateClone,
  incrementTemplateView as _incrementTemplateView,
  addTemplateRating as _addTemplateRating,
  rankTemplatesByPopularity as _rankTemplatesByPopularity,
};
