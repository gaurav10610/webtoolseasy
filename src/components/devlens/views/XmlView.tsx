"use client";

import { useMemo, useState } from "react";
import { XMLParser } from "fast-xml-parser";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type XmlViewProps = {
  input: string;
};

function countXmlKeys(
  value: unknown,
  depth = 0,
): { total: number; maxDepth: number } {
  if (typeof value !== "object" || value === null) {
    return { total: 0, maxDepth: depth };
  }
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) return { total: 0, maxDepth: depth };

  let total = entries.length;
  let maxDepth = depth;
  for (const [, v] of entries) {
    if (typeof v === "object" && v !== null) {
      const child = countXmlKeys(v, depth + 1);
      total += child.total;
      if (child.maxDepth > maxDepth) maxDepth = child.maxDepth;
    }
  }
  return { total, maxDepth };
}

function prettyXml(xml: string): string {
  const formatted: string[] = [];
  let indent = 0;
  const parts = xml.replace(/>\s*</g, "><").split("<");

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;
    const token = "<" + part;

    if (token.match(/^<\/[^>]+>/)) {
      indent = Math.max(0, indent - 1);
      formatted.push("  ".repeat(indent) + token);
    } else if (token.match(/^<[^/!?][^>]*[^/]>/) && !token.match(/<[^>]+\/>/)) {
      formatted.push("  ".repeat(indent) + token);
      indent += 1;
    } else if (token.match(/^<[^>]+\/>/)) {
      formatted.push("  ".repeat(indent) + token);
    } else {
      formatted.push(
        "  ".repeat(indent) + (i === 0 && !xml.startsWith("<") ? part : token),
      );
    }
  }

  return formatted.join("\n").trim();
}

function countElements(xml: string): number {
  const matches = xml.match(/<[^/!?][^>]*>/g);
  return matches ? matches.length : 0;
}

function countAttributes(xml: string): number {
  const tagPattern = /<[^/!?][^>]*>/g;
  let total = 0;
  let m: RegExpExecArray | null;
  while ((m = tagPattern.exec(xml)) !== null) {
    const attrMatches = m[0].match(/\s\w[\w:-]*\s*=/g);
    if (attrMatches) total += attrMatches.length;
  }
  return total;
}

function extractRootTag(xml: string): string | null {
  const m = /<([A-Za-z_][\w.-]*)/.exec(xml);
  return m ? m[1] : null;
}

function extractNamespace(xml: string): string | null {
  const m = /xmlns(?::[a-z]+)?\s*=\s*["']([^"']+)["']/.exec(xml);
  return m ? m[1] : null;
}

function hasDoctype(xml: string): boolean {
  return /<!DOCTYPE/i.test(xml);
}

export function XmlView({ input }: XmlViewProps) {
  const [activeTab, setActiveTab] = useState<"pretty" | "parsed" | "info">(
    "pretty",
  );

  const parseResult = useMemo(() => {
    try {
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        parseAttributeValue: true,
        trimValues: true,
      });
      const parsed = parser.parse(input);
      return { parsed, error: null };
    } catch (err) {
      return {
        parsed: null,
        error: err instanceof Error ? err.message : "XML parse error",
      };
    }
  }, [input]);

  const prettied = useMemo(() => prettyXml(input), [input]);
  const elementCount = useMemo(() => countElements(input), [input]);
  const attributeCount = useMemo(() => countAttributes(input), [input]);
  const rootTag = useMemo(() => extractRootTag(input), [input]);
  const namespace = useMemo(() => extractNamespace(input), [input]);
  const doctype = useMemo(() => hasDoctype(input), [input]);
  const lineCount = input.split("\n").length;

  const { maxDepth } = useMemo(() => {
    if (!parseResult.parsed) return { total: 0, maxDepth: 0 };
    return countXmlKeys(parseResult.parsed, 0);
  }, [parseResult.parsed]);

  const tabs: Array<{ id: "pretty" | "parsed" | "info"; label: string }> = [
    { id: "pretty", label: "Prettified" },
    { id: "parsed", label: "Parsed JSON" },
    { id: "info", label: "Info" },
  ];

  if (parseResult.error) {
    return (
      <Panel title="XML" subtitle="Parse error">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {parseResult.error}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title="XML"
      subtitle={
        rootTag
          ? `<${rootTag}> · ${elementCount} elements`
          : `${elementCount} elements`
      }
      action={<CopyButton text={input} label="Copy XML" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Elements", value: elementCount },
            { label: "Attributes", value: attributeCount },
            { label: "Max depth", value: maxDepth },
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
          {rootTag && <Badge variant="neutral">root: &lt;{rootTag}&gt;</Badge>}
          {doctype && <Badge variant="neutral">DOCTYPE</Badge>}
          {namespace && <Badge variant="neutral">namespace</Badge>}
          <Badge variant="neutral">{lineCount} lines</Badge>
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

        {activeTab === "pretty" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Formatted
              </div>
              <CopyButton text={prettied} label="Copy formatted" />
            </div>
            <pre className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-5 text-gray-200">
              {prettied}
            </pre>
          </div>
        )}

        {activeTab === "parsed" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Parsed as JSON
              </div>
              <CopyButton
                text={JSON.stringify(parseResult.parsed, null, 2)}
                label="Copy JSON"
              />
            </div>
            <pre className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-5 text-gray-200">
              {JSON.stringify(parseResult.parsed, null, 2)}
            </pre>
          </div>
        )}

        {activeTab === "info" && (
          <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-black/20">
            {[
              { label: "Root element", value: rootTag ?? "—" },
              { label: "Elements", value: elementCount },
              { label: "Attributes", value: attributeCount },
              { label: "Max depth", value: maxDepth },
              { label: "Lines", value: lineCount },
              {
                label: "Size",
                value: `${input.length.toLocaleString()} bytes`,
              },
              { label: "Namespace", value: namespace ?? "—" },
              { label: "DOCTYPE", value: doctype ? "Yes" : "No" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <span className="text-gray-400">{label}</span>
                <span className="font-mono text-sm text-white">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}
