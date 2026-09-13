"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

function CheckCircleSvg({ className = "w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ErrorSvg({ className = "w-5 h-5 text-red-600 dark:text-red-400 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SchemaSvg({ className = "w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
}

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  errorLine?: number;
  errorColumn?: number;
  stats?: {
    keys: number;
    depth: number;
    arrayElements: number;
    sizeBytes: number;
  };
}

function validateAndAnalyze(input: string): ValidationResult {
  if (!input || input.trim().length === 0) {
    return { isValid: false, errorMessage: "Input is empty" };
  }
  try {
    const parsed = JSON.parse(input);
    const sizeBytes = new TextEncoder().encode(JSON.stringify(parsed)).length;

    function countKeys(
      obj: unknown,
      depth = 0,
    ): { keys: number; maxDepth: number; arrays: number } {
      let keys = 0,
        maxDepth = depth,
        arrays = 0;
      if (Array.isArray(obj)) {
        arrays += obj.length;
        for (const item of obj) {
          const sub = countKeys(item, depth + 1);
          keys += sub.keys;
          maxDepth = Math.max(maxDepth, sub.maxDepth);
          arrays += sub.arrays;
        }
      } else if (obj !== null && typeof obj === "object") {
        const objKeys = Object.keys(obj as Record<string, unknown>);
        keys += objKeys.length;
        for (const key of objKeys) {
          const sub = countKeys(
            (obj as Record<string, unknown>)[key],
            depth + 1,
          );
          keys += sub.keys;
          maxDepth = Math.max(maxDepth, sub.maxDepth);
          arrays += sub.arrays;
        }
      }
      return { keys, maxDepth, arrays };
    }

    const { keys, maxDepth, arrays } = countKeys(parsed, 1);
    return {
      isValid: true,
      stats: {
        keys,
        depth: maxDepth,
        arrayElements: arrays,
        sizeBytes,
      },
    };
  } catch (e) {
    let errorLine: number | undefined;
    let errorColumn: number | undefined;
    if (e instanceof SyntaxError) {
      const posMatch = e.message.match(/at position (\d+)/);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const lines = input.substring(0, pos).split("\n");
        errorLine = lines.length;
        errorColumn = lines[lines.length - 1].length + 1;
      }
    }
    return {
      isValid: false,
      errorMessage: e instanceof Error ? e.message : "Invalid JSON",
      errorLine,
      errorColumn,
    };
  }
}

function jsonToYaml(obj: unknown, indent = 0): string {
  const pad = " ".repeat(indent);
  if (obj === null) return "null";
  if (typeof obj === "boolean" || typeof obj === "number") return String(obj);
  if (typeof obj === "string") {
    if (obj.includes("\n") || /[:#{}[\]]/.test(obj)) {
      return JSON.stringify(obj);
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj
      .map((item) => {
        if (typeof item === "object" && item !== null && !Array.isArray(item)) {
          const inner = jsonToYaml(item, indent + 2);
          const lines = inner.split("\n");
          return `${pad}- ${lines[0].trim()}\n${lines.slice(1).join("\n")}`;
        }
        return `${pad}- ${jsonToYaml(item, indent + 2).trim()}`;
      })
      .join("\n");
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries
      .map(([k, v]) => {
        if (typeof v === "object" && v !== null && !Array.isArray(v)) {
          return `${pad}${k}:\n${jsonToYaml(v, indent + 2)}`;
        }
        return `${pad}${k}: ${jsonToYaml(v, indent + 2)}`;
      })
      .join("\n");
  }
  return String(obj);
}

function jsonToCsv(input: unknown): string {
  let arr: Record<string, unknown>[] = [];
  if (Array.isArray(input)) {
    arr = input.filter((item) => item !== null && typeof item === "object") as Record<string, unknown>[];
  } else if (typeof input === "object" && input !== null) {
    for (const val of Object.values(input as Record<string, unknown>)) {
      if (Array.isArray(val) && val.length > 0 && typeof val[0] === "object") {
        arr = val as Record<string, unknown>[];
        break;
      }
    }
  }

  if (arr.length === 0) {
    throw new Error("CSV conversion requires a JSON array of objects (e.g. [{ id: 1, name: 'Item' }])");
  }

  const allKeys = Array.from(new Set(arr.flatMap((obj) => Object.keys(obj))));
  const escapeCsv = (val: unknown): string => {
    if (val === null || val === undefined) return "";
    let str = typeof val === "object" ? JSON.stringify(val) : String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      str = `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const header = allKeys.map(escapeCsv).join(",");
  const rows = arr.map((row) => allKeys.map((key) => escapeCsv(row[key])).join(","));
  return [header, ...rows].join("\n");
}

const SAMPLES = {
  ecommerce: JSON.stringify(
    {
      orderId: "ORD-92841",
      customer: { name: "Sarah Connor", email: "sarah.c@example.com", tier: "VIP" },
      items: [
        { id: 101, sku: "TECH-KEY-01", name: "Mechanical Keyboard", price: 129.99, qty: 1 },
        { id: 102, sku: "TECH-MOU-02", name: "Wireless Ergonomic Mouse", price: 79.5, qty: 2 },
      ],
      shipping: { address: "100 Cyberdyne Way", city: "Los Angeles", zip: "90001", express: true },
      subtotal: 288.99,
      currency: "USD",
    },
    null,
    2,
  ),
  geojson: JSON.stringify(
    {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [-122.4194, 37.7749] },
          properties: { name: "San Francisco", state: "California", population: 873965 },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [-74.006, 40.7128] },
          properties: { name: "New York City", state: "New York", population: 8336817 },
        },
      ],
    },
    null,
    2,
  ),
  api: JSON.stringify(
    {
      status: 200,
      success: true,
      message: "Users retrieved successfully",
      page: 1,
      perPage: 2,
      totalRecords: 42,
      data: [
        {
          id: "usr_8fa20",
          username: "dev_alex",
          active: true,
          roles: ["developer", "reviewer"],
          lastLogin: "2026-09-13T14:30:00Z",
        },
        {
          id: "usr_7bb11",
          username: "designer_maya",
          active: true,
          roles: ["designer"],
          lastLogin: "2026-09-12T18:15:22Z",
        },
      ],
    },
    null,
    2,
  ),
};


export default function JsonFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue:
      '{"name":"John Doe","age":30,"city":"New York","skills":["JavaScript","React","Node.js"]}',
  });

  const [formattedCode, setFormattedCode] = useState<string>("");
  const [indentSize, setIndentSize] = useState<number>(2);
  const [sortKeys, setSortKeys] = useState<boolean>(false);
  const [schemaInput, setSchemaInput] = useState<string>("");
  const [showSchemaPanel, setShowSchemaPanel] = useState<boolean>(false);
  const [schemaValidationResult, setSchemaValidationResult] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);

  const validation = useMemo(
    () => validateAndAnalyze(toolState.code),
    [toolState.code],
  );

  const formatJSON = useCallback(
    (input: string, indent: number, sort: boolean): string => {
      try {
        let parsed = JSON.parse(input);
        if (sort && typeof parsed === "object" && parsed !== null) {
          const sortObject = (obj: unknown): unknown => {
            if (Array.isArray(obj)) return obj.map(sortObject);
            if (obj !== null && typeof obj === "object") {
              return Object.keys(obj as Record<string, unknown>)
                .sort()
                .reduce<Record<string, unknown>>((acc, key) => {
                  acc[key] = sortObject((obj as Record<string, unknown>)[key]);
                  return acc;
                }, {});
            }
            return obj;
          };
          parsed = sortObject(parsed);
        }
        return JSON.stringify(parsed, null, indent);
      } catch {
        return "";
      }
    },
    [],
  );

  const handleFormat = useCallback(() => {
    if (!validation.isValid) {
      toolState.actions.showMessage("Cannot format: invalid JSON");
      return;
    }
    const res = formatJSON(toolState.code, indentSize, sortKeys);
    setFormattedCode(res);
    toolState.actions.showMessage("JSON Formatted Successfully");
  }, [toolState, validation.isValid, formatJSON, indentSize, sortKeys]);

  const handleMinify = useCallback(() => {
    if (!validation.isValid) {
      toolState.actions.showMessage("Cannot minify: invalid JSON");
      return;
    }
    try {
      const minified = JSON.stringify(JSON.parse(toolState.code));
      setFormattedCode(minified);
      toolState.actions.showMessage("JSON Minified Successfully");
    } catch {
      toolState.actions.showMessage("Failed to minify");
    }
  }, [toolState, validation.isValid]);

  const handleEscape = useCallback(() => {
    try {
      const escaped = JSON.stringify(toolState.code);
      setFormattedCode(escaped);
      toolState.actions.showMessage("JSON String Escaped");
    } catch {
      toolState.actions.showMessage("Failed to escape");
    }
  }, [toolState]);

  const handleUnescape = useCallback(() => {
    try {
      const unescaped = JSON.parse(toolState.code);
      if (typeof unescaped === "string") {
        setFormattedCode(unescaped);
        toolState.actions.showMessage("JSON String Unescaped");
      } else {
        setFormattedCode(JSON.stringify(unescaped, null, indentSize));
      }
    } catch {
      toolState.actions.showMessage("Failed to unescape: not a valid JSON string");
    }
  }, [toolState, indentSize]);

  const handleClear = useCallback(() => {
    toolState.setCode("");
    setFormattedCode("");
    toolState.actions.showMessage("Cleared");
  }, [toolState]);

  const handleCopy = useCallback(() => {
    const textToCopy = formattedCode || toolState.code;
    navigator.clipboard.writeText(textToCopy);
    toolState.actions.showMessage("Copied to clipboard");
  }, [toolState, formattedCode]);

  const handleDownload = useCallback(() => {
    const text = formattedCode || toolState.code;
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [formattedCode, toolState.code]);

  const handleConvertToYaml = useCallback(() => {
    if (!validation.isValid) {
      toolState.actions.showMessage("Cannot convert: invalid JSON");
      return;
    }
    try {
      const parsed = JSON.parse(toolState.code);
      const yaml = jsonToYaml(parsed);
      setFormattedCode(yaml);
      toolState.actions.showMessage("Converted to YAML");
    } catch {
      toolState.actions.showMessage("Failed to convert to YAML");
    }
  }, [toolState, validation.isValid]);

  const handleConvertToCsv = useCallback(() => {
    if (!validation.isValid) {
      toolState.actions.showMessage("Cannot convert: invalid JSON");
      return;
    }
    try {
      const parsed = JSON.parse(toolState.code);
      const csv = jsonToCsv(parsed);
      setFormattedCode(csv);
      toolState.actions.showMessage("Converted to CSV");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to convert to CSV";
      toolState.actions.showMessage(msg);
    }
  }, [toolState, validation.isValid]);

  const handleLoadSample = useCallback(
    (key: keyof typeof SAMPLES) => {
      const sample = SAMPLES[key];
      toolState.setCode(sample);
      setFormattedCode("");
      toolState.actions.showMessage(`Loaded ${key} sample JSON!`);
    },
    [toolState],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleFormat();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleFormat]);

  const buttons = useMemo(
    () => [
      {
        type: "format" as const,
        text: "Format",
        onClick: handleFormat,
        variant: "contained" as const,
        color: "primary" as const,
      },
      {
        type: "custom" as const,
        text: "Minify",
        onClick: handleMinify,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "To YAML",
        onClick: handleConvertToYaml,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "To CSV",
        onClick: handleConvertToCsv,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Escape",
        onClick: handleEscape,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Unescape",
        onClick: handleUnescape,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: `Indent: ${indentSize}s`,
        onClick: () => setIndentSize((prev) => (prev === 2 ? 4 : prev === 4 ? 1 : 2)),
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: sortKeys ? "Sort: ON" : "Sort: OFF",
        onClick: () => setSortKeys((prev) => !prev),
        variant: "outlined" as const,
        color: (sortKeys ? "primary" : undefined) as "primary" | undefined,
      },
      ...createCommonButtons({
        onCopy: handleCopy,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
        onDownload: handleDownload,
      }),
      {
        type: "custom" as const,
        text: "Clear",
        onClick: handleClear,
        variant: "outlined" as const,
        color: "error" as const,
      },
    ],
    [
      handleFormat,
      handleMinify,
      handleConvertToYaml,
      handleConvertToCsv,
      handleEscape,
      handleUnescape,
      indentSize,
      sortKeys,
      handleCopy,
      toolState.actions,
      toolState.code,
      toolState.toggleFullScreen,
      handleDownload,
      handleClear,
    ],
  );

  const rawEditorProps = useEditorConfig({
    language: "json",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  const formattedEditorProps = useEditorConfig({
    language: "json",
    value: formattedCode,
    onChange: setFormattedCode,
  });

  const validateAgainstSchema = useCallback(
    (data: unknown, schema: Record<string, unknown>, path = ""): string[] => {
      const errors: string[] = [];
      if (schema.type) {
        const expectedType = schema.type as string;
        const actualType = Array.isArray(data) ? "array" : typeof data;
        if (expectedType === "integer") {
          if (typeof data !== "number" || !Number.isInteger(data)) {
            errors.push(`${path || "root"}: expected integer, got ${actualType}`);
          }
        } else if (actualType !== expectedType) {
          errors.push(
            `${path || "root"}: expected type '${expectedType}', got '${actualType}'`,
          );
        }
      }
      if (
        schema.required &&
        Array.isArray(schema.required) &&
        typeof data === "object" &&
        data !== null
      ) {
        for (const req of schema.required as string[]) {
          if (!(req in (data as Record<string, unknown>))) {
            errors.push(`${path || "root"}: missing required property '${req}'`);
          }
        }
      }
      if (
        schema.properties &&
        typeof data === "object" &&
        data !== null &&
        !Array.isArray(data)
      ) {
        const props = schema.properties as Record<string, Record<string, unknown>>;
        for (const key of Object.keys(props)) {
          if (key in (data as Record<string, unknown>)) {
            errors.push(
              ...validateAgainstSchema(
                (data as Record<string, unknown>)[key],
                props[key],
                path ? `${path}.${key}` : key,
              ),
            );
          }
        }
      }
      if (schema.items && Array.isArray(data)) {
        data.forEach((item, i) =>
          errors.push(
            ...validateAgainstSchema(
              item,
              schema.items as Record<string, unknown>,
              `${path}[${i}]`,
            ),
          ),
        );
      }
      if (
        typeof schema.minLength === "number" &&
        typeof data === "string" &&
        data.length < schema.minLength
      ) {
        errors.push(
          `${path}: string length ${data.length} < minLength ${schema.minLength}`,
        );
      }
      if (
        typeof schema.maxLength === "number" &&
        typeof data === "string" &&
        data.length > schema.maxLength
      ) {
        errors.push(
          `${path}: string length ${data.length} > maxLength ${schema.maxLength}`,
        );
      }
      if (
        typeof schema.minimum === "number" &&
        typeof data === "number" &&
        data < schema.minimum
      ) {
        errors.push(`${path}: value ${data} < minimum ${schema.minimum}`);
      }
      if (
        typeof schema.maximum === "number" &&
        typeof data === "number" &&
        data > schema.maximum
      ) {
        errors.push(`${path}: value ${data} > maximum ${schema.maximum}`);
      }
      return errors;
    },
    [],
  );

  const runSchemaValidation = useCallback(() => {
    try {
      const data = JSON.parse(toolState.code);
      const schema = JSON.parse(schemaInput) as Record<string, unknown>;
      const errors = validateAgainstSchema(data, schema);
      setSchemaValidationResult({ valid: errors.length === 0, errors });
    } catch (e) {
      setSchemaValidationResult({
        valid: false,
        errors: [e instanceof Error ? e.message : "Parse error"],
      });
    }
  }, [toolState.code, schemaInput, validateAgainstSchema]);

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      {/* Sample Bar & Privacy Trust Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-slate-500 dark:text-slate-400 pl-1">Load Sample:</span>
          <button
            type="button"
            onClick={() => handleLoadSample("ecommerce")}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 font-medium transition shadow-xs"
          >
            🛒 Cart
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample("geojson")}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 font-medium transition shadow-xs"
          >
            🗺️ GeoJSON
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample("api")}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 font-medium transition shadow-xs"
          >
            ⚡ REST API
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
          <span>🔒 100% Client-Side Privacy: Runs locally in your browser</span>
        </div>
      </div>

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      {/* Real-time Validation Status */}
      {toolState.code.trim().length > 0 && (
        <div
          className={`flex items-start gap-3 rounded-xl border p-3.5 w-full text-sm ${
            validation.isValid
              ? "border-emerald-200 bg-emerald-50/70 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
              : "border-red-200 bg-red-50/70 text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
          }`}
        >
          {validation.isValid ? <CheckCircleSvg /> : <ErrorSvg />}
          <div className="flex-1 min-w-0">
            {validation.isValid ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">Valid JSON</span>
                {validation.stats && (
                  <>
                    <span className="rounded-full border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 text-xs font-mono">
                      {validation.stats.keys} keys
                    </span>
                    <span className="rounded-full border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 text-xs font-mono">
                      depth: {validation.stats.depth}
                    </span>
                    <span className="rounded-full border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 text-xs font-mono">
                      {validation.stats.arrayElements} array items
                    </span>
                    <span className="rounded-full border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 text-xs font-mono">
                      {validation.stats.sizeBytes} bytes
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div>
                <span className="font-semibold">Invalid JSON</span>
                {validation.errorMessage && (
                  <p className="mt-1 text-xs opacity-90">{validation.errorMessage}</p>
                )}
                {validation.errorLine && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-mono mt-0.5">
                    Line {validation.errorLine}
                    {validation.errorColumn && `, Column ${validation.errorColumn}`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* JSON Schema Validation Panel */}
      <div className="rounded-2xl border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SchemaSvg />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              JSON Schema Validation
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowSchemaPanel((v) => !v)}
            className="rounded-lg border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {showSchemaPanel ? "Hide" : "Show"} Schema Validator
          </button>
        </div>

        {showSchemaPanel && (
          <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-[var(--mui-palette-divider)]">
            <textarea
              rows={4}
              placeholder='{"type":"object","required":["name"],"properties":{"name":{"type":"string"},"age":{"type":"number","minimum":0}}}'
              value={schemaInput}
              onChange={(e) => setSchemaInput(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
            <button
              type="button"
              disabled={!schemaInput.trim() || !validation.isValid}
              onClick={runSchemaValidation}
              className="self-start rounded-xl bg-sky-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-50 transition-colors"
            >
              Validate Against Schema
            </button>

            {schemaValidationResult && (
              <div
                className={`rounded-xl border p-3 text-xs ${
                  schemaValidationResult.valid
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
                }`}
              >
                {schemaValidationResult.valid ? (
                  <p>JSON is <strong>valid</strong> against the schema.</p>
                ) : (
                  <div>
                    <p className="font-semibold">
                      Schema Errors ({schemaValidationResult.errors.length}):
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      {schemaValidationResult.errors.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={rawEditorProps}
            themeOption="vs-dark"
            editorHeading="Raw JSON"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={formattedEditorProps}
            themeOption="vs-dark"
            editorHeading="Formatted JSON"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
      />
    </ToolLayout>
  );
}
