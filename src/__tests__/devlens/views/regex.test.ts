import { describe, expect, it } from "vitest";
import {
  findMatches,
  parseRegexInput,
  tokenizeRegex,
} from "@/components/devlens/views/RegexView";

describe("RegexView helpers", () => {
  it("parses /pattern/flags format", () => {
    const parsed = parseRegexInput("/foo+/gi");
    expect(parsed.error).toBeNull();
    expect(parsed.pattern).toBe("foo+");
    expect(parsed.flags).toBe("gi");
    expect(parsed.regex).toBeInstanceOf(RegExp);
  });

  it("returns parse error for invalid regex", () => {
    const parsed = parseRegexInput("/([a-z/gi");
    expect(parsed.error).toBeTruthy();
    expect(parsed.regex).toBeNull();
  });

  it("tokenizes common regex tokens with explanations", () => {
    const tokens = tokenizeRegex("^\\d{2,4}(?:abc)?$");
    const descriptions = tokens.map((t) => t.description);

    expect(descriptions).toContain("Start of string");
    expect(descriptions).toContain("Any digit (0-9)");
    expect(descriptions).toContain("Between 2 and 4 times");
    expect(descriptions).toContain("Non-capturing group");
    expect(descriptions).toContain("Zero or one times (optional)");
    expect(descriptions).toContain("End of string");
  });

  it("finds positional and named capture groups", () => {
    const regex = /(?<word>cat)-(\d+)/g;
    const matches = findMatches(regex, "cat-123 cat-456");

    expect(matches).toHaveLength(2);
    expect(matches[0]).toMatchObject({
      index: 0,
      fullMatch: "cat-123",
      groups: ["cat", "123"],
      namedGroups: { word: "cat" },
    });
    expect(matches[1].index).toBe(8);
  });
});
