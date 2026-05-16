"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type RegexViewProps = {
  input: string;
};

type ParsedRegex = {
  pattern: string;
  flags: string;
  regex: RegExp;
  error: null;
};

type RegexParseError = {
  pattern: string;
  flags: string;
  regex: null;
  error: string;
};

const FLAG_LABELS: Record<string, string> = {
  g: "global",
  i: "ignore case",
  m: "multiline",
  s: "dot-all",
  u: "unicode",
  v: "unicode sets",
};

const TOKEN_EXPLANATIONS: Array<[RegExp, (match: RegExpExecArray) => string]> =
  [
    [/^\^/, () => "Start of string"],
    [/^\$/, () => "End of string"],
    [/^\\./, (m) => explainEscape(m[0])],
    [
      /^\[(\^)?([^\]]+)\]/,
      (m) => `Character class${m[1] ? " (negated)" : ""}: ${m[2]}`,
    ],
    [/^\((\?[<:!=].*?)\)/, (m) => explainGroup(m[1])],
    [/^\(/, () => "Capturing group"],
    [/^\)/, () => "End of group"],
    [/^\{(\d+),(\d+)\}/, (m) => `Between ${m[1]} and ${m[2]} times`],
    [/^\{(\d+),\}/, (m) => `At least ${m[1]} times`],
    [/^\{(\d+)\}/, (m) => `Exactly ${m[1]} times`],
    [/^\*\?/, () => "Zero or more times (lazy)"],
    [/^\+\?/, () => "One or more times (lazy)"],
    [/^\?\?/, () => "Zero or one times (lazy)"],
    [/^\*/, () => "Zero or more times (greedy)"],
    [/^\+/, () => "One or more times (greedy)"],
    [/^\?/, () => "Zero or one times (optional)"],
    [/^\|/, () => "Alternation (or)"],
    [/^\./, () => "Any character except newline"],
    [/^[A-Za-z0-9_]/, (m) => `Literal: ${m[0]}`],
    [/^./, (m) => `Literal: ${m[0]}`],
  ];

function explainEscape(token: string): string {
  const map: Record<string, string> = {
    "\\d": "Any digit (0-9)",
    "\\D": "Any non-digit",
    "\\w": "Any word character (a-z, A-Z, 0-9, _)",
    "\\W": "Any non-word character",
    "\\s": "Any whitespace",
    "\\S": "Any non-whitespace",
    "\\b": "Word boundary",
    "\\B": "Non-word boundary",
    "\\n": "Newline",
    "\\r": "Carriage return",
    "\\t": "Tab",
    "\\0": "Null character",
  };
  return map[token] ?? `Escaped literal: ${token[1]}`;
}

function explainGroup(inner: string): string {
  if (inner.startsWith("?:")) return "Non-capturing group";
  if (inner.startsWith("?=")) return "Positive lookahead";
  if (inner.startsWith("?!")) return "Negative lookahead";
  if (inner.startsWith("?<=")) return "Positive lookbehind";
  if (inner.startsWith("?<!")) return "Negative lookbehind";
  if (inner.startsWith("?<"))
    return `Named capturing group: ${inner.slice(2, inner.indexOf(">"))}`;
  return "Group";
}

export function tokenizeRegex(
  pattern: string,
): Array<{ token: string; description: string }> {
  const tokens: Array<{ token: string; description: string }> = [];
  let remaining = pattern;

  while (remaining.length > 0) {
    let matched = false;

    for (const [re, explain] of TOKEN_EXPLANATIONS) {
      const m = re.exec(remaining);
      if (m) {
        tokens.push({ token: m[0], description: explain(m) });
        remaining = remaining.slice(m[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      tokens.push({
        token: remaining[0],
        description: `Literal: ${remaining[0]}`,
      });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

export function parseRegexInput(input: string): ParsedRegex | RegexParseError {
  const trimmed = input.trim();
  let pattern = trimmed;
  let flags = "";

  const slashMatch = /^\/(.+)\/([gimsuvdy]*)$/.exec(trimmed);
  if (slashMatch) {
    pattern = slashMatch[1];
    flags = slashMatch[2];
  }

  try {
    const regex = new RegExp(pattern, flags);
    return { pattern, flags, regex, error: null };
  } catch (err) {
    return {
      pattern,
      flags,
      regex: null,
      error: err instanceof Error ? err.message : "Invalid regular expression",
    };
  }
}

type Match = {
  index: number;
  fullMatch: string;
  groups: string[];
  namedGroups: Record<string, string>;
};

export function findMatches(regex: RegExp, text: string): Match[] {
  const matches: Match[] = [];
  const globalRegex = regex.flags.includes("g")
    ? regex
    : new RegExp(regex.source, regex.flags + "g");

  let m: RegExpExecArray | null;
  let safetyCount = 0;
  globalRegex.lastIndex = 0;

  while ((m = globalRegex.exec(text)) !== null && safetyCount < 1000) {
    safetyCount += 1;
    matches.push({
      index: m.index,
      fullMatch: m[0],
      groups: m.slice(1).map((g) => g ?? ""),
      namedGroups: (m.groups ?? {}) as Record<string, string>,
    });

    if (!regex.flags.includes("g") && !globalRegex.flags.includes("g")) break;
    if (m[0].length === 0) globalRegex.lastIndex += 1;
  }

  return matches;
}

const ALL_FLAGS = ["g", "i", "m", "s", "u"] as const;

export function RegexView({ input }: RegexViewProps) {
  const [testText, setTestText] = useState(
    "The quick brown fox jumps over the lazy dog.\nLine 2 has 123 numbers.",
  );
  const [replaceText, setReplaceText] = useState("$&");
  const [activeTab, setActiveTab] = useState<"test" | "explain" | "replace">(
    "test",
  );
  const [extraFlags, setExtraFlags] = useState<Set<string>>(new Set());

  const parsed = useMemo(() => parseRegexInput(input), [input]);

  const regexWithFlags = useMemo<RegExp | null>(() => {
    if (!parsed.regex) return null;
    const combined = new Set([...parsed.flags.split(""), ...extraFlags]);
    try {
      return new RegExp(parsed.pattern, [...combined].join(""));
    } catch {
      return parsed.regex;
    }
  }, [parsed, extraFlags]);

  const matches = useMemo(() => {
    if (!regexWithFlags) return [];
    try {
      return findMatches(regexWithFlags, testText);
    } catch {
      return [];
    }
  }, [regexWithFlags, testText]);

  const replaceResult = useMemo(() => {
    if (!regexWithFlags) return testText;
    try {
      return testText.replace(regexWithFlags, replaceText);
    } catch {
      return testText;
    }
  }, [regexWithFlags, testText, replaceText]);

  const tokens = useMemo(() => {
    if (!parsed.pattern) return [];
    try {
      return tokenizeRegex(parsed.pattern);
    } catch {
      return [];
    }
  }, [parsed.pattern]);

  const tabs: Array<{ id: "test" | "explain" | "replace"; label: string }> = [
    { id: "test", label: "Test" },
    { id: "explain", label: "Explain" },
    { id: "replace", label: "Replace" },
  ];

  const currentFlags = [
    ...new Set([...parsed.flags.split("").filter(Boolean), ...extraFlags]),
  ];

  function toggleFlag(flag: string) {
    setExtraFlags((prev) => {
      const next = new Set(prev);
      if (next.has(flag)) {
        next.delete(flag);
      } else {
        next.add(flag);
      }
      return next;
    });
  }

  if (parsed.error) {
    return (
      <Panel title="Regex" subtitle="Invalid regular expression">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {parsed.error}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title="Regex"
      subtitle={`/${parsed.pattern}/${parsed.flags}`}
      action={<CopyButton text={input} label="Copy regex" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        {/* Pattern display */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Pattern
          </div>
          <div className="mt-2 break-all font-mono text-base text-white">
            /{parsed.pattern}/{parsed.flags}
          </div>
        </div>

        {/* Flag toggles */}
        <div className="flex flex-wrap gap-2">
          {ALL_FLAGS.map((flag) => {
            const active = currentFlags.includes(flag);
            return (
              <button
                key={flag}
                type="button"
                onClick={() => toggleFlag(flag)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  active
                    ? "border-indigo-500/40 bg-indigo-500/20 text-indigo-100"
                    : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {flag} — {FLAG_LABELS[flag]}
              </button>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-2xl border border-white/10 bg-black/20 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Test tab */}
        {activeTab === "test" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Test string
              </div>
              <Badge variant={matches.length > 0 ? "success" : "neutral"}>
                {matches.length} match{matches.length !== 1 ? "es" : ""}
              </Badge>
            </div>
            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-sm text-white outline-none ring-0 placeholder:text-gray-500 focus:border-indigo-500/60"
              placeholder="Enter text to test against"
            />
            {matches.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Matches
                </div>
                {matches.map((match, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs text-gray-500">
                        Match {index + 1} · index {match.index}
                      </span>
                      <CopyButton text={match.fullMatch} label="Copy" />
                    </div>
                    <div className="mt-2 font-mono text-sm text-emerald-200">
                      {JSON.stringify(match.fullMatch)}
                    </div>
                    {match.groups.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {match.groups.map((group, gi) => (
                          <span
                            key={gi}
                            className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-gray-300"
                          >
                            ${gi + 1}: {JSON.stringify(group)}
                          </span>
                        ))}
                      </div>
                    )}
                    {Object.keys(match.namedGroups).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(match.namedGroups).map(
                          ([name, val]) => (
                            <span
                              key={name}
                              className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-gray-300"
                            >
                              {`<${name}>`}: {JSON.stringify(val)}
                            </span>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Explain tab */}
        {activeTab === "explain" && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Token breakdown
            </div>
            <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-black/20">
              {tokens.map(({ token, description }, index) => (
                <div key={index} className="flex items-center gap-4 px-4 py-2">
                  <span className="w-24 shrink-0 font-mono text-sm text-amber-200">
                    {token}
                  </span>
                  <span className="text-sm text-gray-300">{description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Replace tab */}
        {activeTab === "replace" && (
          <div className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Test string
                </div>
                <textarea
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-sm text-white outline-none ring-0 focus:border-indigo-500/60"
                  placeholder="Input text"
                />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Replacement
                </div>
                <input
                  type="text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-sm text-white outline-none ring-0 focus:border-indigo-500/60"
                  placeholder="Replacement (use $1, $2 for groups)"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use $1, $2… for group backreferences; $& for full match
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Result
                </div>
                <CopyButton text={replaceResult} label="Copy result" />
              </div>
              <pre className="mt-2 overflow-auto text-sm leading-6 text-gray-100">
                {replaceResult}
              </pre>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
