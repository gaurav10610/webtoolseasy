"use client";

import { useMemo, useState } from "react";
import { format as sqlFormat } from "sql-formatter";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type SqlViewProps = {
  input: string;
};

type SqlDialect =
  | "sql"
  | "mysql"
  | "postgresql"
  | "sqlite"
  | "bigquery"
  | "tsql";

const DIALECT_OPTIONS: Array<{ id: SqlDialect; label: string }> = [
  { id: "sql", label: "Standard" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "mysql", label: "MySQL" },
  { id: "sqlite", label: "SQLite" },
  { id: "bigquery", label: "BigQuery" },
  { id: "tsql", label: "T-SQL" },
];

function detectQueryType(sql: string): string {
  const firstToken =
    sql
      .trim()
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .split(/\s+/)[0]
      ?.toUpperCase() ?? "";
  const map: Record<string, string> = {
    SELECT: "SELECT",
    INSERT: "INSERT",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    CREATE: "CREATE",
    DROP: "DROP",
    ALTER: "ALTER",
    TRUNCATE: "TRUNCATE",
    WITH: "CTE",
    EXPLAIN: "EXPLAIN",
    GRANT: "GRANT",
    REVOKE: "REVOKE",
    CALL: "CALL",
    EXEC: "EXEC",
    MERGE: "MERGE",
  };
  return map[firstToken] ?? "UNKNOWN";
}

function extractTables(sql: string): string[] {
  const tables = new Set<string>();
  const patterns = [
    /\bFROM\s+([`"[]?[\w.]+[`"\]]?)/gi,
    /\bJOIN\s+([`"[]?[\w.]+[`"\]]?)/gi,
    /\bINTO\s+([`"[]?[\w.]+[`"\]]?)/gi,
    /\bUPDATE\s+([`"[]?[\w.]+[`"\]]?)/gi,
    /\bFROM\s+([`"[]?[\w.]+[`"\]]?)\s*AS\s+\w+/gi,
  ];
  for (const pattern of patterns) {
    let m: RegExpExecArray | null;
    const re = new RegExp(pattern.source, pattern.flags);
    while ((m = re.exec(sql)) !== null) {
      const table = m[1].replace(/[`"[\]]/g, "");
      if (
        table &&
        !["WHERE", "ON", "SET", "VALUES"].includes(table.toUpperCase())
      ) {
        tables.add(table);
      }
    }
  }
  return [...tables];
}

function extractColumns(sql: string): string[] {
  const selectMatch = /SELECT\s+([\s\S]*?)\s+FROM/i.exec(sql);
  if (!selectMatch) return [];
  const cols = selectMatch[1];
  if (cols.trim() === "*") return ["*"];
  return cols
    .split(",")
    .map(
      (c) =>
        c
          .trim()
          .split(/\s+AS\s+/i)
          .pop()
          ?.trim() ?? c.trim(),
    )
    .slice(0, 20);
}

function countClauses(sql: string): Record<string, boolean> {
  const upper = sql.toUpperCase();
  return {
    WHERE: /\bWHERE\b/.test(upper),
    "GROUP BY": /\bGROUP\s+BY\b/.test(upper),
    HAVING: /\bHAVING\b/.test(upper),
    "ORDER BY": /\bORDER\s+BY\b/.test(upper),
    LIMIT: /\bLIMIT\b/.test(upper),
    OFFSET: /\bOFFSET\b/.test(upper),
    JOIN: /\bJOIN\b/.test(upper),
    UNION: /\bUNION\b/.test(upper),
    SUBQUERY: /\(\s*SELECT\b/i.test(sql),
  };
}

export function SqlView({ input }: SqlViewProps) {
  const [dialect, setDialect] = useState<SqlDialect>("sql");
  const [activeTab, setActiveTab] = useState<"formatted" | "info">("formatted");

  const formatted = useMemo(() => {
    try {
      return {
        sql: sqlFormat(input, {
          language: dialect,
          tabWidth: 2,
          keywordCase: "upper",
        }),
        error: null,
      };
    } catch (err) {
      return {
        sql: null,
        error: err instanceof Error ? err.message : "Format error",
      };
    }
  }, [input, dialect]);

  const queryType = useMemo(() => detectQueryType(input), [input]);
  const tables = useMemo(() => extractTables(input), [input]);
  const columns = useMemo(() => extractColumns(input), [input]);
  const clauses = useMemo(() => countClauses(input), [input]);

  const tabs: Array<{ id: "formatted" | "info"; label: string }> = [
    { id: "formatted", label: "Formatted" },
    { id: "info", label: "Analysis" },
  ];

  const typeColors: Record<string, string> = {
    SELECT: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    INSERT: "text-sky-300 bg-sky-500/10 border-sky-500/20",
    UPDATE: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    DELETE: "text-rose-300 bg-rose-500/10 border-rose-500/20",
    CREATE: "text-purple-300 bg-purple-500/10 border-purple-500/20",
    DROP: "text-rose-300 bg-rose-500/10 border-rose-500/20",
    ALTER: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    CTE: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  };
  const typeColor =
    typeColors[queryType] ?? "text-gray-300 bg-white/5 border-white/10";

  return (
    <Panel
      title="SQL"
      subtitle={`${queryType} · ${input.trim().split(/\s+/).length} tokens`}
      action={<CopyButton text={input} label="Copy SQL" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        {/* Query type + badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${typeColor}`}
          >
            {queryType}
          </span>
          {tables.slice(0, 4).map((t) => (
            <Badge key={t} variant="neutral">
              {t}
            </Badge>
          ))}
        </div>

        {/* Dialect selector */}
        <div className="flex flex-wrap gap-1">
          {DIALECT_OPTIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDialect(d.id)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                dialect === d.id
                  ? "border-indigo-500/40 bg-indigo-500/20 text-indigo-100"
                  : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {d.label}
            </button>
          ))}
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

        {activeTab === "formatted" && (
          <div className="space-y-2">
            {formatted.error && (
              <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
                {formatted.error}
              </p>
            )}
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Formatted ({dialect})
              </div>
              {formatted.sql && (
                <CopyButton text={formatted.sql} label="Copy formatted" />
              )}
            </div>
            <pre className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-gray-200">
              {formatted.sql ?? input}
            </pre>
          </div>
        )}

        {activeTab === "info" && (
          <div className="space-y-4">
            {/* Tables */}
            {tables.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Tables / relations
                </div>
                <div className="flex flex-wrap gap-2">
                  {tables.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Columns (SELECT) */}
            {columns.length > 0 && queryType === "SELECT" && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Selected columns
                </div>
                <div className="flex flex-wrap gap-2">
                  {columns.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-gray-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Clauses */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Clauses present
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(clauses).map(([clause, present]) => (
                  <div
                    key={clause}
                    className={`rounded-2xl border px-3 py-2 text-center text-xs ${
                      present
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                        : "border-white/5 bg-black/20 text-gray-600"
                    }`}
                  >
                    {clause}
                  </div>
                ))}
              </div>
            </div>

            {/* Basic stats */}
            <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-black/20">
              {[
                { label: "Query type", value: queryType },
                { label: "Tables", value: tables.length },
                { label: "Characters", value: input.length.toLocaleString() },
                { label: "Lines", value: input.split("\n").length },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 px-4 py-2"
                >
                  <span className="text-gray-400">{label}</span>
                  <span className="font-mono text-sm text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
