"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type EnvViewProps = {
  input: string;
};

type EnvEntry = {
  key: string;
  value: string;
  raw: string;
  lineNumber: number;
  isComment: boolean;
  isEmpty: boolean;
  isQuoted: boolean;
  quoteType: "single" | "double" | "none";
  hasInterpolation: boolean;
};

function parseEnvFile(content: string): EnvEntry[] {
  const lines = content.split("\n");
  return lines.map((raw, index): EnvEntry => {
    const trimmed = raw.trim();

    if (trimmed === "") {
      return {
        key: "",
        value: "",
        raw,
        lineNumber: index + 1,
        isComment: false,
        isEmpty: true,
        isQuoted: false,
        quoteType: "none",
        hasInterpolation: false,
      };
    }

    if (trimmed.startsWith("#")) {
      return {
        key: "",
        value: trimmed.slice(1).trim(),
        raw,
        lineNumber: index + 1,
        isComment: true,
        isEmpty: false,
        isQuoted: false,
        quoteType: "none",
        hasInterpolation: false,
      };
    }

    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) {
      return {
        key: trimmed,
        value: "",
        raw,
        lineNumber: index + 1,
        isComment: false,
        isEmpty: false,
        isQuoted: false,
        quoteType: "none",
        hasInterpolation: false,
      };
    }

    const key = trimmed.slice(0, eqIdx).trim();
    const rawValue = trimmed.slice(eqIdx + 1);

    let value = rawValue.trim();
    let isQuoted = false;
    let quoteType: "single" | "double" | "none" = "none";

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      isQuoted = true;
      quoteType = value[0] === '"' ? "double" : "single";
      value = value.slice(1, -1);
      if (quoteType === "double") {
        value = value
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "\r")
          .replace(/\\t/g, "\t")
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, "\\");
      }
    } else {
      // Remove inline comments for unquoted values
      const commentIdx = value.indexOf(" #");
      if (commentIdx !== -1) {
        value = value.slice(0, commentIdx).trim();
      }
    }

    const hasInterpolation = /\$\{[^}]+\}|\$[A-Z_][A-Z0-9_]*/i.test(value);

    return {
      key,
      value,
      raw,
      lineNumber: index + 1,
      isComment: false,
      isEmpty: false,
      isQuoted,
      quoteType,
      hasInterpolation,
    };
  });
}

function classifyKey(key: string): string {
  const upper = key.toUpperCase();
  if (
    /SECRET|PASSWORD|PASSWD|TOKEN|KEY|CREDENTIAL|AUTH|PRIVATE|SALT|SIGNING/i.test(
      key,
    )
  )
    return "secret";
  if (/URL|HOST|PORT|ENDPOINT|DOMAIN|API|ORIGIN/i.test(key))
    return "connection";
  if (/DATABASE|DB_|REDIS|MONGO|POSTGRES|MYSQL|SQLITE/i.test(key))
    return "database";
  if (/NODE_ENV|APP_ENV|ENVIRONMENT|STAGE|DEBUG|LOG/i.test(key))
    return "config";
  if (upper === key && key.length > 0) return "env";
  return "other";
}

const CATEGORY_BADGE: Record<string, { label: string; color: string }> = {
  secret: {
    label: "secret",
    color: "text-rose-300 bg-rose-500/10 border-rose-500/20",
  },
  connection: {
    label: "connection",
    color: "text-sky-300 bg-sky-500/10 border-sky-500/20",
  },
  database: {
    label: "db",
    color: "text-amber-300 bg-amber-500/10 border-amber-500/20",
  },
  config: {
    label: "config",
    color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  },
  env: {
    label: "env",
    color: "text-purple-300 bg-purple-500/10 border-purple-500/20",
  },
  other: { label: "other", color: "text-gray-300 bg-white/5 border-white/10" },
};

export function EnvView({ input }: EnvViewProps) {
  const [revealAll, setRevealAll] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const entries = useMemo(() => parseEnvFile(input), [input]);
  const variableEntries = useMemo(
    () => entries.filter((e) => !e.isEmpty && !e.isComment),
    [entries],
  );
  const secretEntries = useMemo(
    () => variableEntries.filter((e) => classifyKey(e.key) === "secret"),
    [variableEntries],
  );
  const commentCount = useMemo(
    () => entries.filter((e) => e.isComment).length,
    [entries],
  );

  function toggleReveal(key: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  function isRevealed(key: string): boolean {
    const cat = classifyKey(key);
    if (cat !== "secret") return true;
    return revealAll || revealed.has(key);
  }

  function maskValue(value: string): string {
    if (value.length <= 4) return "••••••••";
    return "••••••••" + value.slice(-4);
  }

  if (
    variableEntries.length === 0 &&
    entries.every((e) => e.isEmpty || e.isComment)
  ) {
    return (
      <Panel title=".env" subtitle="No variables found">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="text-gray-400">
            The input contains no KEY=VALUE assignments.
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title=".env"
      subtitle={`${variableEntries.length} variables · ${commentCount} comments`}
      action={<CopyButton text={input} label="Copy .env" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Variables", value: variableEntries.length },
            { label: "Secrets", value: secretEntries.length },
            { label: "Comments", value: commentCount },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center"
            >
              <div className="font-mono text-2xl font-bold text-white">
                {value}
              </div>
              <div className="mt-1 text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Reveal-all toggle */}
        {secretEntries.length > 0 && (
          <div className="flex items-center justify-between rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
            <span className="text-xs text-amber-200">
              {secretEntries.length} sensitive value
              {secretEntries.length !== 1 ? "s" : ""} masked
            </span>
            <button
              type="button"
              onClick={() => setRevealAll((v) => !v)}
              className="rounded-full border border-amber-500/30 px-3 py-1 text-xs text-amber-200 hover:bg-amber-500/20"
            >
              {revealAll ? "Hide all" : "Reveal all"}
            </button>
          </div>
        )}

        {/* Variable table */}
        <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-black/20">
          {entries.map((entry, i) => {
            if (entry.isEmpty) return null;

            if (entry.isComment) {
              return (
                <div key={i} className="px-4 py-2 text-gray-500">
                  # <span className="text-xs italic">{entry.value}</span>
                </div>
              );
            }

            const cat = classifyKey(entry.key);
            const badgeStyle = CATEGORY_BADGE[cat];
            const show = isRevealed(entry.key);
            const displayValue = show ? entry.value : maskValue(entry.value);
            const isSecret = cat === "secret";

            return (
              <div key={i} className="group flex items-start gap-3 px-4 py-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-white">
                      {entry.key}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs ${badgeStyle.color}`}
                    >
                      {badgeStyle.label}
                    </span>
                    {entry.hasInterpolation && (
                      <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-300">
                        interpolated
                      </span>
                    )}
                    {entry.isQuoted && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                        {entry.quoteType} quoted
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`break-all font-mono text-sm ${
                        show ? "text-gray-200" : "text-gray-500 tracking-wider"
                      }`}
                    >
                      {displayValue || (
                        <span className="text-gray-600">(empty)</span>
                      )}
                    </span>
                    {isSecret && (
                      <button
                        type="button"
                        onClick={() => toggleReveal(entry.key)}
                        className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                      >
                        {show && !revealAll ? "hide" : "reveal"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <CopyButton text={entry.value} label="Copy" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
