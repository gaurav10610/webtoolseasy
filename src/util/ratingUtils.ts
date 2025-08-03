// Utility to generate consistent random ratings for tools
const TOOL_RATINGS: Record<
  string,
  { ratingValue: number; reviewCount: number }
> = {};

export function getToolRating(toolId: string): {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
} {
  if (!TOOL_RATINGS[toolId]) {
    // Generate consistent ratings based on tool ID hash
    const hash = toolId.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    // Use hash to generate consistent values
    const ratingValue = Number((4.1 + (Math.abs(hash) % 80) / 100).toFixed(1));
    const reviewCount = 50 + (Math.abs(hash) % 450);

    TOOL_RATINGS[toolId] = { ratingValue, reviewCount };
  }

  return {
    ...TOOL_RATINGS[toolId],
    bestRating: 5,
    worstRating: 1,
  };
}
