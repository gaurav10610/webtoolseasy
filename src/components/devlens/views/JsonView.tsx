"use client";

import { useMemo } from "react";
import type { ReactElement } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type JsonViewProps = {
  input: string;
};

type JsonStats = {
  rootEntries: number;
  totalKeys: number;
  depth: number;
  arrayLengths: number[];
};

export function JsonView({ input }: JsonViewProps) {
  const result = useMemo(() => {
    try {
      return { value: JSON.parse(input), error: null as string | null };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : "Invalid JSON",
      };
    }
  }, [input]);

  const jsonStats = useMemo(() => {
    if (result.error || result.value === null) {
      return null;
    }

    return summarizeJson(result.value);
  }, [result]);

  if (result.error || result.value === null) {
    return (
      <Panel title="JSON" subtitle="Unable to parse JSON">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {result.error}
          </p>
          <CopyButton text={input} label="Copy raw JSON" />
        </div>
      </Panel>
    );
  }

  const pretty = JSON.stringify(result.value, null, 2);

  return (
    <Panel
      title="JSON"
      subtitle={`Top-level entries: ${jsonStats?.rootEntries ?? 0} · Total keys: ${jsonStats?.totalKeys ?? 0} · Depth: ${jsonStats?.depth ?? 0}`}
      action={<CopyButton text={pretty} label="Copy JSON" />}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 text-xs text-gray-400">
          <Badge variant="info">Tree view</Badge>
          {jsonStats?.arrayLengths.length ? (
            <Badge variant="neutral">
              Arrays: {jsonStats.arrayLengths.join(", ")}
            </Badge>
          ) : null}
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          {renderTree(result.value)}
        </div>
        <pre className="max-h-[520px] overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
          {pretty}
        </pre>
      </div>
    </Panel>
  );
}

function summarizeJson(value: unknown): JsonStats {
  const arrayLengths: number[] = [];

  function walk(
    node: unknown,
    depth: number,
  ): { keys: number; maxDepth: number } {
    if (Array.isArray(node)) {
      arrayLengths.push(node.length);
      let totalKeys = 0;
      let maxDepth = depth;

      for (const item of node) {
        const child = walk(item, depth + 1);
        totalKeys += child.keys;
        maxDepth = Math.max(maxDepth, child.maxDepth);
      }

      return { keys: totalKeys, maxDepth };
    }

    if (node && typeof node === "object") {
      const entries = Object.entries(node as Record<string, unknown>);
      let totalKeys = entries.length;
      let maxDepth = depth;

      for (const [, childValue] of entries) {
        const child = walk(childValue, depth + 1);
        totalKeys += child.keys;
        maxDepth = Math.max(maxDepth, child.maxDepth);
      }

      return { keys: totalKeys, maxDepth };
    }

    return { keys: 0, maxDepth: depth };
  }

  const rootEntries = Array.isArray(value)
    ? value.length
    : Object.keys(value as Record<string, unknown>).length;
  const summary = walk(value, 1);

  return {
    rootEntries,
    totalKeys: summary.keys,
    depth: summary.maxDepth,
    arrayLengths,
  };
}

function renderTree(value: unknown, path = "root", depth = 0): ReactElement {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
          {path} [array · {value.length}]
        </div>
        <div className="ml-4 space-y-2 border-l border-white/10 pl-4">
          {value.map((item, index) => (
            <div key={`${path}[${index}]`}>
              {renderTree(item, `${path}[${index}]`, depth + 1)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const collapsed = depth >= 3 && entries.length > 0;

    return (
      <details
        className="rounded-2xl border border-white/10 bg-white/5 p-3"
        open={!collapsed}
      >
        <summary className="cursor-pointer list-none text-sm font-semibold text-white">
          {path}{" "}
          <span className="text-gray-500">object · {entries.length}</span>
        </summary>
        <div className="mt-3 space-y-2">
          {entries.map(([key, childValue]) => (
            <div
              key={`${path}.${key}`}
              className="rounded-xl border border-white/10 bg-black/20 p-3"
            >
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {key}
              </div>
              <div className="mt-2">
                {renderTree(childValue, `${path}.${key}`, depth + 1)}
              </div>
            </div>
          ))}
        </div>
      </details>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-100">
      <span className="text-gray-500">{path}:</span> {formatPrimitive(value)}
    </div>
  );
}

function formatPrimitive(value: unknown) {
  if (value === null) return "null";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value);
}
