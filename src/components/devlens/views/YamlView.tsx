"use client";

import { useMemo, useState } from "react";
import { load as yamlLoad } from "js-yaml";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type YamlViewProps = {
  input: string;
};

function countDepth(value: unknown, current = 0): number {
  if (typeof value !== "object" || value === null) return current;
  if (Array.isArray(value)) {
    if (value.length === 0) return current + 1;
    return Math.max(...value.map((v) => countDepth(v, current + 1)));
  }
  const entries = Object.values(value as Record<string, unknown>);
  if (entries.length === 0) return current + 1;
  return Math.max(...entries.map((v) => countDepth(v, current + 1)));
}

function countKeys(value: unknown): number {
  if (typeof value !== "object" || value === null) return 0;
  if (Array.isArray(value)) {
    return value.reduce<number>((sum, v) => sum + countKeys(v), 0);
  }
  const entries = Object.entries(value as Record<string, unknown>);
  return entries.length + entries.reduce((sum, [, v]) => sum + countKeys(v), 0);
}

type JsonToYamlResult =
  | { yaml: string; error: null }
  | { yaml: null; error: string };

function jsonToYaml(jsonText: string): JsonToYamlResult {
  try {
    const parsed = JSON.parse(jsonText);
    // Manual YAML serializer — avoids importing the dump function from js-yaml at top level
    const yaml = serializeYaml(parsed, 0);
    return { yaml, error: null };
  } catch (err) {
    return {
      yaml: null,
      error: err instanceof Error ? err.message : "Invalid JSON",
    };
  }
}

function serializeYaml(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);

  if (value === null) return "null";
  if (typeof value === "boolean" || typeof value === "number")
    return String(value);
  if (typeof value === "string") {
    if (/[\n\r:{}[\],&*#?|<>=!%@`]/.test(value) || value.includes("'")) {
      return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    return value;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value
      .map((item) => {
        const serialized = serializeYaml(item, indent + 1);
        if (typeof item === "object" && item !== null && !Array.isArray(item)) {
          return `${pad}- ${serialized.trimStart()}`;
        }
        return `${pad}- ${serialized}`;
      })
      .join("\n");
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries
      .map(([k, v]) => {
        const valStr = serializeYaml(v, indent + 1);
        if (typeof v === "object" && v !== null) {
          return `${pad}${k}:\n${valStr}`;
        }
        return `${pad}${k}: ${valStr}`;
      })
      .join("\n");
  }
  return String(value);
}

export function YamlView({ input }: YamlViewProps) {
  const [activeTab, setActiveTab] = useState<"inspect" | "json" | "tojson">(
    "inspect",
  );
  const [jsonInput, setJsonInput] = useState("");

  const parsed = useMemo<
    { value: unknown; error: null } | { value: null; error: string }
  >(() => {
    try {
      const value = yamlLoad(input.trim());
      return { value, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Parse error";
      return { value: null, error: msg };
    }
  }, [input]);

  const jsonOutput = useMemo(() => {
    if (parsed.error || parsed.value === undefined) return "";
    try {
      return JSON.stringify(parsed.value, null, 2);
    } catch {
      return "";
    }
  }, [parsed]);

  const toYamlResult = useMemo(() => jsonToYaml(jsonInput), [jsonInput]);

  const tabs: Array<{ id: "inspect" | "json" | "tojson"; label: string }> = [
    { id: "inspect", label: "Inspect" },
    { id: "json", label: "→ JSON" },
    { id: "tojson", label: "JSON → YAML" },
  ];

  if (parsed.error) {
    return (
      <Panel title="YAML" subtitle="Parse error">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {parsed.error}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  const rootType = Array.isArray(parsed.value)
    ? "array"
    : parsed.value !== null && typeof parsed.value === "object"
      ? "object"
      : typeof parsed.value;

  const topLevelCount =
    parsed.value !== null && typeof parsed.value === "object"
      ? Array.isArray(parsed.value)
        ? parsed.value.length
        : Object.keys(parsed.value as Record<string, unknown>).length
      : 1;

  const depth = countDepth(parsed.value);
  const totalKeys = countKeys(parsed.value);

  return (
    <Panel
      title="YAML"
      subtitle={`${rootType} · ${topLevelCount} top-level ${Array.isArray(parsed.value) ? "items" : "keys"}`}
      action={<CopyButton text={input} label="Copy YAML" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Top-level", value: topLevelCount },
            { label: "Total keys", value: totalKeys },
            { label: "Max depth", value: depth },
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

        {/* Type badge */}
        <div className="flex gap-2">
          <Badge variant="neutral">{rootType}</Badge>
          <Badge variant="neutral">{input.split("\n").length} lines</Badge>
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

        {activeTab === "inspect" && (
          <pre className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-5 text-gray-200">
            {input}
          </pre>
        )}

        {activeTab === "json" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                JSON output
              </div>
              <CopyButton text={jsonOutput} label="Copy JSON" />
            </div>
            <pre className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-5 text-gray-200">
              {jsonOutput}
            </pre>
          </div>
        )}

        {activeTab === "tojson" && (
          <div className="space-y-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                JSON input
              </div>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={6}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-sm text-white outline-none ring-0 placeholder:text-gray-500 focus:border-indigo-500/60"
                placeholder='{"key": "value"}'
              />
            </div>
            {toYamlResult.error && (
              <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
                {toYamlResult.error}
              </p>
            )}
            {toYamlResult.yaml && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    YAML output
                  </div>
                  <CopyButton text={toYamlResult.yaml} label="Copy YAML" />
                </div>
                <pre className="max-h-72 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-5 text-gray-200">
                  {toYamlResult.yaml}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </Panel>
  );
}
