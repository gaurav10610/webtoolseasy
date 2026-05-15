"use client";

import { useMemo } from "react";
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

export function Base64View({ input }: Base64ViewProps) {
  const result = useMemo(() => {
    try {
      if (input.startsWith("data:")) {
        const [, payload = ""] = input.split(",", 2);
        return {
          decoded: decodeBase64(payload),
          isDataUrl: true,
          error: null as string | null,
        };
      }

      return {
        decoded: decodeBase64(input),
        isDataUrl: false,
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

  return (
    <div className="space-y-4">
      {result.isDataUrl && input.startsWith("data:image/") ? (
        <Panel
          title="Base64 image preview"
          subtitle="Rendered directly from the data URL"
        >
          <img
            src={input}
            alt="Decoded base64 content"
            className="max-w-full rounded-2xl border border-white/10"
          />
        </Panel>
      ) : null}

      <Panel
        title="Decoded output"
        action={<CopyButton text={result.decoded} label="Copy decoded" />}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Bytes: {result.decoded.length}
            </span>
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
