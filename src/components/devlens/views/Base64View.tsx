"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type Base64ViewProps = {
  input: string;
};

function decodeBase64(value: string): string {
  const normalized = value
    .replace(/\s+/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

function getDataUrlMeta(value: string) {
  const match = value.match(/^data:([^;,]+)?(?:;charset=[^;,]+)?(;base64)?,/i);
  const mimeType = match?.[1] ?? "text/plain";
  return {
    isDataUrl: value.startsWith("data:"),
    mimeType,
    isBase64DataUrl: Boolean(match?.[2]),
  };
}

function classifyDecodedValue(decoded: string) {
  const trimmed = decoded.trim();

  if (!trimmed) {
    return { type: "empty", label: "Empty" };
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      JSON.parse(trimmed);
      return { type: "json", label: "JSON" };
    } catch {
      // fall through
    }
  }

  if (/<([a-z][^\s/>]*)/i.test(trimmed)) {
    return { type: "html", label: "HTML" };
  }

  const printableCharacters = trimmed.replace(/[\r\n\t\f\b]/g, "").length;
  const controlCharacters = decoded.length - printableCharacters;

  if (controlCharacters > Math.max(3, decoded.length * 0.05)) {
    return { type: "binary", label: "Binary" };
  }

  return { type: "text", label: "Plain text" };
}

export function Base64View({ input }: Base64ViewProps) {
  const result = useMemo(() => {
    try {
      if (input.startsWith("data:")) {
        const meta = getDataUrlMeta(input);
        const [, payload = ""] = input.split(",", 2);
        return {
          decoded: decodeBase64(payload),
          dataUrlMeta: meta,
          error: null as string | null,
        };
      }

      return {
        decoded: decodeBase64(input),
        dataUrlMeta: null as ReturnType<typeof getDataUrlMeta> | null,
        error: null as string | null,
      };
    } catch (error) {
      return {
        decoded: "",
        isDataUrl: false,
        error:
          error instanceof Error ? error.message : "Unable to decode base64",
      };
    }
  }, [input]);

  if (result.error) {
    return (
      <Panel title="Base64" subtitle="Unable to decode input">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {result.error}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  const looksLikeJson =
    result.decoded.trim().startsWith("{") ||
    result.decoded.trim().startsWith("[");
  const looksLikeHtml = /<([a-z][^\s/>]*)/i.test(result.decoded);
  const decodedClass = classifyDecodedValue(result.decoded);
  const encodedLength = input.replace(/\s+/g, "").length;
  const decodedBytes = new TextEncoder().encode(result.decoded).length;
  const overhead =
    decodedBytes > 0 ? Math.round((encodedLength / decodedBytes - 1) * 100) : 0;

  return (
    <div className="space-y-4">
      {result.dataUrlMeta?.isDataUrl ? (
        <Panel
          title="Base64 image preview"
          subtitle={`Rendered directly from the data URL (${result.dataUrlMeta.mimeType})`}
        >
          {result.dataUrlMeta.mimeType.startsWith("image/") ? (
            <img
              src={input}
              alt="Decoded base64 content"
              className="max-w-full rounded-2xl border border-white/10"
            />
          ) : (
            <div className="space-y-2 text-sm text-gray-300">
              <p>Data URL MIME type: {result.dataUrlMeta.mimeType}</p>
              {result.dataUrlMeta.mimeType === "application/pdf" ? (
                <p className="text-amber-200">
                  PDF data detected. Open in a PDF viewer to inspect pages.
                </p>
              ) : null}
            </div>
          )}
        </Panel>
      ) : null}

      <Panel
        title="Decoded output"
        action={<CopyButton text={result.decoded} label="Copy decoded" />}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Decoded bytes: {decodedBytes}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Encoded length: {encodedLength}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Overhead: {overhead}%
            </span>
            <Badge
              variant={decodedClass.type === "binary" ? "warning" : "info"}
            >
              {decodedClass.label}
            </Badge>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              JSON: {looksLikeJson ? "likely" : "no"}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              HTML: {looksLikeHtml ? "likely" : "no"}
            </span>
          </div>
          <pre className="max-h-[420px] overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
            {result.decoded}
          </pre>
        </div>
      </Panel>
    </div>
  );
}
