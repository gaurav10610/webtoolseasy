"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type CsvViewProps = {
  input: string;
};

type ParseResult = {
  headers: string[];
  rows: string[][];
  delimiter: string;
  lineBreak: string;
  totalRows: number;
  error: null;
};

type ParseError = {
  headers: null;
  rows: null;
  delimiter: null;
  lineBreak: null;
  totalRows: 0;
  error: string;
};

function detectLineBreak(text: string): string {
  if (text.includes("\r\n")) return "CRLF";
  if (text.includes("\r")) return "CR";
  return "LF";
}

function parseCsv(input: string): ParseResult | ParseError {
  try {
    const result = Papa.parse<string[]>(input.trim(), {
      skipEmptyLines: true,
      dynamicTyping: false,
    });

    if (result.errors.length > 0 && result.data.length === 0) {
      return {
        headers: null,
        rows: null,
        delimiter: null,
        lineBreak: null,
        totalRows: 0,
        error: result.errors[0].message,
      };
    }

    const rows = result.data as string[][];
    if (rows.length === 0) {
      return {
        headers: null,
        rows: null,
        delimiter: null,
        lineBreak: null,
        totalRows: 0,
        error: "No data found",
      };
    }

    const [headerRow, ...dataRows] = rows;
    const detectedDelimiter = result.meta.delimiter ?? ",";
    const lineBreak = detectLineBreak(input);

    return {
      headers: headerRow,
      rows: dataRows,
      delimiter: detectedDelimiter === "\t" ? "\\t (TSV)" : detectedDelimiter,
      lineBreak,
      totalRows: dataRows.length,
      error: null,
    };
  } catch (err) {
    return {
      headers: null,
      rows: null,
      delimiter: null,
      lineBreak: null,
      totalRows: 0,
      error: err instanceof Error ? err.message : "Parse error",
    };
  }
}

function inferColumnType(values: string[]): string {
  const nonEmpty = values.filter((v) => v.trim() !== "");
  if (nonEmpty.length === 0) return "empty";
  const allNumeric = nonEmpty.every(
    (v) => !isNaN(Number(v)) && v.trim() !== "",
  );
  if (allNumeric) return "number";
  const allDate = nonEmpty.every((v) => !isNaN(Date.parse(v)));
  if (allDate) return "date";
  const allBool = nonEmpty.every((v) =>
    ["true", "false", "yes", "no", "1", "0"].includes(v.toLowerCase()),
  );
  if (allBool) return "boolean";
  return "string";
}

const MAX_DISPLAY_ROWS = 50;

export function CsvView({ input }: CsvViewProps) {
  const [activeTab, setActiveTab] = useState<"table" | "stats" | "json">(
    "table",
  );

  const parsed = useMemo(() => parseCsv(input), [input]);

  const columnStats = useMemo(() => {
    if (!parsed.headers || !parsed.rows) return [];
    return parsed.headers.map((header, colIdx) => {
      const values = parsed.rows!.map((row) => row[colIdx] ?? "");
      const nonEmpty = values.filter((v) => v.trim() !== "");
      const unique = new Set(nonEmpty).size;
      return {
        header,
        type: inferColumnType(values),
        total: values.length,
        empty: values.length - nonEmpty.length,
        unique,
        fillRate:
          values.length > 0
            ? Math.round((nonEmpty.length / values.length) * 100)
            : 0,
      };
    });
  }, [parsed]);

  const jsonOutput = useMemo(() => {
    if (!parsed.headers || !parsed.rows) return "";
    const objects = parsed.rows.map((row) => {
      const obj: Record<string, string> = {};
      parsed.headers!.forEach((h, i) => {
        obj[h] = row[i] ?? "";
      });
      return obj;
    });
    return JSON.stringify(objects, null, 2);
  }, [parsed]);

  const tabs: Array<{ id: "table" | "stats" | "json"; label: string }> = [
    { id: "table", label: "Table" },
    { id: "stats", label: "Column Stats" },
    { id: "json", label: "→ JSON" },
  ];

  if (parsed.error) {
    return (
      <Panel title="CSV / TSV" subtitle="Parse error">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {parsed.error}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  const displayRows = parsed.rows!.slice(0, MAX_DISPLAY_ROWS);

  return (
    <Panel
      title="CSV / TSV"
      subtitle={`${parsed.totalRows} rows · ${parsed.headers!.length} columns`}
      action={<CopyButton text={input} label="Copy CSV" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Rows", value: parsed.totalRows },
            { label: "Columns", value: parsed.headers!.length },
            {
              label: "Cells",
              value: (
                parsed.totalRows * parsed.headers!.length
              ).toLocaleString(),
            },
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

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral">delimiter: {parsed.delimiter}</Badge>
          <Badge variant="neutral">line endings: {parsed.lineBreak}</Badge>
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

        {activeTab === "table" && (
          <div className="space-y-2">
            {parsed.totalRows > MAX_DISPLAY_ROWS && (
              <p className="text-xs text-amber-300">
                Showing first {MAX_DISPLAY_ROWS} of {parsed.totalRows} rows.
              </p>
            )}
            <div className="max-h-96 overflow-auto rounded-2xl border border-white/10 bg-black/20">
              <table className="w-full min-w-max text-xs">
                <thead className="sticky top-0 bg-black/60 backdrop-blur">
                  <tr>
                    <th className="px-3 py-2 text-left text-gray-500">#</th>
                    {parsed.headers!.map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left font-semibold text-gray-300"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {displayRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/5">
                      <td className="px-3 py-2 text-gray-600">{rIdx + 1}</td>
                      {parsed.headers!.map((_, cIdx) => (
                        <td key={cIdx} className="px-3 py-2 text-gray-200">
                          {row[cIdx] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-black/20">
            {columnStats.map((stat) => (
              <div
                key={stat.header}
                className="flex flex-wrap items-center gap-3 px-4 py-3"
              >
                <span className="w-36 shrink-0 font-mono text-sm font-semibold text-white">
                  {stat.header}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300">
                  {stat.type}
                </span>
                <span className="text-xs text-gray-500">
                  {stat.unique} unique
                </span>
                <span className="text-xs text-gray-500">
                  {stat.empty} empty
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${stat.fillRate}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    {stat.fillRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "json" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                JSON (array of objects)
              </div>
              <CopyButton text={jsonOutput} label="Copy JSON" />
            </div>
            <pre className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-5 text-gray-200">
              {jsonOutput}
            </pre>
          </div>
        )}
      </div>
    </Panel>
  );
}
