"use client";

import { useCallback, useMemo, useState } from "react";
import type { ReactElement } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";
import { SimpleTabs } from "@/components/ui/Tabs";

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
  const [activeTab, setActiveTab] = useState(0);
  const [jsonPathQuery, setJsonPathQuery] = useState("$");
  const [prettyMode, setPrettyMode] = useState<"pretty" | "minified">("pretty");

  const result = useMemo(() => {
    try {
      return { value: JSON.parse(input), error: null as string | null };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid JSON";
      // Try to extract position info from the error message
      const posMatch = message.match(/position (\d+)/);
      return {
        value: null,
        error: message,
        errorPosition: posMatch ? Number(posMatch[1]) : null,
      };
    }
  }, [input]);

  const jsonStats = useMemo(() => {
    if (result.error || result.value === null) {
      return null;
    }

    return summarizeJson(result.value);
  }, [result]);

  const isTableRenderable = useMemo(() => {
    if (!result.value || !Array.isArray(result.value)) return false;
    return (
      result.value.length > 0 &&
      result.value.every(
        (item: unknown) =>
          item && typeof item === "object" && !Array.isArray(item),
      )
    );
  }, [result.value]);

  const tableColumns = useMemo(() => {
    if (!isTableRenderable || !Array.isArray(result.value)) return [];
    const columnSet = new Set<string>();
    for (const item of result.value) {
      for (const key of Object.keys(item as Record<string, unknown>)) {
        columnSet.add(key);
      }
    }
    return Array.from(columnSet);
  }, [result.value, isTableRenderable]);

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedTableData = useMemo(() => {
    if (!isTableRenderable || !Array.isArray(result.value)) return [];
    if (!sortColumn) return result.value;
    return [...result.value].sort(
      (a: Record<string, unknown>, b: Record<string, unknown>) => {
        const va = a[sortColumn];
        const vb = b[sortColumn];
        if (va === vb) return 0;
        if (va === null || va === undefined) return 1;
        if (vb === null || vb === undefined) return -1;
        const cmp = String(va).localeCompare(String(vb), undefined, {
          numeric: true,
        });
        return sortDir === "asc" ? cmp : -cmp;
      },
    );
  }, [result.value, isTableRenderable, sortColumn, sortDir]);

  const handleColumnSort = useCallback(
    (column: string) => {
      if (sortColumn === column) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortColumn(column);
        setSortDir("asc");
      }
    },
    [sortColumn],
  );

  const jsonPathResult = useMemo(() => {
    if (!result.value || !jsonPathQuery.trim()) return null;
    try {
      // Simple JSONPath evaluation for common patterns
      const query = jsonPathQuery.trim();
      if (query === "$") return result.value;
      if (query === "$.length" && Array.isArray(result.value))
        return result.value.length;

      // Support basic dot notation: $.key.nested
      if (query.startsWith("$.")) {
        const path = query.slice(2).split(".");
        let current: unknown = result.value;
        for (const segment of path) {
          // Handle array index: [0]
          const arrMatch = segment.match(/^(\w+)\[(\d+)\]$/);
          if (arrMatch) {
            const obj = current as Record<string, unknown>;
            current = obj?.[arrMatch[1]];
            if (Array.isArray(current)) {
              current = current[Number(arrMatch[2])];
            } else {
              return { error: `"${arrMatch[1]}" is not an array` };
            }
          } else if (current && typeof current === "object") {
            current = (current as Record<string, unknown>)[segment];
          } else {
            return { error: `Cannot access "${segment}" on ${typeof current}` };
          }
        }
        return current;
      }

      return { error: "Use $.key.nested notation" };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Invalid JSONPath",
      };
    }
  }, [result.value, jsonPathQuery]);

  const inferredSchema = useMemo(() => {
    if (!result.value) return null;
    return inferJsonSchema(result.value);
  }, [result.value]);

  if (result.error || result.value === null) {
    return (
      <Panel title="JSON" subtitle="Unable to parse JSON">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {result.error}
          </p>
          {"errorPosition" in result &&
          typeof result.errorPosition === "number" ? (
            <pre className="max-h-[320px] overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
              {input.slice(0, result.errorPosition)}
              <span className="bg-rose-500/40 text-rose-100">
                {input.slice(
                  result.errorPosition,
                  (result.errorPosition as number) + 1,
                ) || "↵"}
              </span>
              {input.slice((result.errorPosition as number) + 1)}
            </pre>
          ) : null}
          <CopyButton text={input} label="Copy raw JSON" />
        </div>
      </Panel>
    );
  }

  const pretty = JSON.stringify(result.value, null, 2);
  const minified = JSON.stringify(result.value);
  const tabs = [
    "Tree",
    ...(isTableRenderable ? ["Table"] : []),
    "Prettify",
    "JSONPath",
    "Schema",
  ];

  return (
    <Panel
      title="JSON"
      subtitle={`Entries: ${jsonStats?.rootEntries ?? 0} · Keys: ${jsonStats?.totalKeys ?? 0} · Depth: ${jsonStats?.depth ?? 0}`}
      action={<CopyButton text={pretty} label="Copy JSON" />}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 text-xs text-gray-400">
          {jsonStats?.arrayLengths.length ? (
            <Badge variant="neutral">
              Arrays: {jsonStats.arrayLengths.join(", ")}
            </Badge>
          ) : null}
          <Badge variant="info">
            {Array.isArray(result.value) ? "Array" : "Object"}
          </Badge>
          <Badge variant="neutral">{pretty.length} chars</Badge>
        </div>

        <SimpleTabs
          tabs={tabs}
          activeIndex={activeTab}
          onChange={setActiveTab}
        />

        {/* Tree view */}
        {tabs[activeTab] === "Tree" ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            {renderTree(result.value)}
          </div>
        ) : null}

        {/* Table view */}
        {tabs[activeTab] === "Table" && isTableRenderable ? (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20">
            <table className="w-full text-xs text-gray-100">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    #
                  </th>
                  {tableColumns.map((col) => (
                    <th
                      key={col}
                      onClick={() => handleColumnSort(col)}
                      className="cursor-pointer px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
                    >
                      {col}{" "}
                      {sortColumn === col
                        ? sortDir === "asc"
                          ? "↑"
                          : "↓"
                        : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedTableData.map(
                  (row: Record<string, unknown>, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-3 py-2 text-gray-500">{i}</td>
                      {tableColumns.map((col) => (
                        <td
                          key={col}
                          className="max-w-[300px] truncate px-3 py-2"
                        >
                          {typeof row[col] === "object"
                            ? JSON.stringify(row[col])
                            : String(row[col] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
            <div className="border-t border-white/10 px-3 py-2 text-xs text-gray-500">
              {sortedTableData.length} rows × {tableColumns.length} columns
            </div>
          </div>
        ) : null}

        {/* Prettify/Minify */}
        {tabs[activeTab] === "Prettify" ? (
          <div className="space-y-3">
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPrettyMode("pretty")}
                className={`rounded-full px-3 py-1 transition-colors ${
                  prettyMode === "pretty"
                    ? "border border-indigo-500/40 bg-indigo-500/10 text-indigo-100"
                    : "border border-white/10 bg-white/5 text-gray-300"
                }`}
              >
                Pretty (2-space)
              </button>
              <button
                type="button"
                onClick={() => setPrettyMode("minified")}
                className={`rounded-full px-3 py-1 transition-colors ${
                  prettyMode === "minified"
                    ? "border border-indigo-500/40 bg-indigo-500/10 text-indigo-100"
                    : "border border-white/10 bg-white/5 text-gray-300"
                }`}
              >
                Minified
              </button>
              <CopyButton
                text={prettyMode === "pretty" ? pretty : minified}
                label="Copy"
              />
            </div>
            <pre className="max-h-[520px] overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
              {prettyMode === "pretty" ? pretty : minified}
            </pre>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>Pretty: {pretty.length} chars</span>
              <span>·</span>
              <span>Minified: {minified.length} chars</span>
              <span>·</span>
              <span>
                Savings:{" "}
                {((1 - minified.length / pretty.length) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ) : null}

        {/* JSONPath query */}
        {tabs[activeTab] === "JSONPath" ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={jsonPathQuery}
                onChange={(e) => setJsonPathQuery(e.target.value)}
                placeholder="$.key.nested or $[0].field"
                className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white outline-none ring-0 placeholder:text-gray-500 focus:border-indigo-500/60"
              />
              {jsonPathResult &&
              typeof jsonPathResult !== "object" ? null : jsonPathResult &&
                "error" in
                  (jsonPathResult as Record<string, unknown>) ? null : (
                <CopyButton
                  text={JSON.stringify(jsonPathResult, null, 2)}
                  label="Copy result"
                />
              )}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Result
              </div>
              {jsonPathResult &&
              typeof jsonPathResult === "object" &&
              jsonPathResult !== null &&
              "error" in jsonPathResult ? (
                <p className="mt-2 text-sm text-rose-300">
                  {(jsonPathResult as { error: string }).error}
                </p>
              ) : (
                <pre className="mt-2 max-h-[320px] overflow-auto text-xs leading-6 text-gray-100">
                  {JSON.stringify(jsonPathResult, null, 2)}
                </pre>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Supports basic JSONPath: <code className="text-gray-400">$</code>{" "}
              (root), <code className="text-gray-400">$.key.nested</code>,{" "}
              <code className="text-gray-400">$.arr[0]</code>
            </p>
          </div>
        ) : null}

        {/* Schema inference */}
        {tabs[activeTab] === "Schema" ? (
          <div className="space-y-3">
            <CopyButton
              text={JSON.stringify(inferredSchema, null, 2)}
              label="Copy schema"
            />
            <pre className="max-h-[520px] overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
              {JSON.stringify(inferredSchema, null, 2)}
            </pre>
          </div>
        ) : null}
      </div>
    </Panel>
  );
}

export function summarizeJson(value: unknown): JsonStats {
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
              <div className="flex items-center gap-2">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  {key}
                </div>
                <CopyButton text={`${path}.${key}`} label="Path" />
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
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-100">
      <span>
        <span className="text-gray-500">{path}:</span> {formatPrimitive(value)}
      </span>
      <CopyButton text={String(value ?? "")} label="Copy" />
    </div>
  );
}

function formatPrimitive(value: unknown) {
  if (value === null) return <span className="text-gray-500">null</span>;
  if (typeof value === "string")
    return <span className="text-emerald-300">&quot;{value}&quot;</span>;
  if (typeof value === "number")
    return <span className="text-indigo-300">{value}</span>;
  if (typeof value === "boolean")
    return <span className="text-amber-300">{String(value)}</span>;
  return JSON.stringify(value);
}

export function inferJsonSchema(value: unknown): Record<string, unknown> {
  if (value === null) return { type: "null" };
  if (typeof value === "string") return { type: "string" };
  if (typeof value === "number")
    return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
  if (typeof value === "boolean") return { type: "boolean" };

  if (Array.isArray(value)) {
    if (value.length === 0) return { type: "array", items: {} };
    // Merge schemas of first 3 items
    const itemSchemas = value.slice(0, 3).map(inferJsonSchema);
    return {
      type: "array",
      items: itemSchemas[0],
      minItems: 0,
      maxItems: value.length,
    };
  }

  if (typeof value === "object") {
    const properties: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      properties[key] = inferJsonSchema(val);
    }
    return {
      type: "object",
      properties,
      required: Object.keys(properties),
    };
  }

  return {};
}
