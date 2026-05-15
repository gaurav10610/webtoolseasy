"use client";

import { useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type UrlEncodedViewProps = {
  input: string;
};

export function UrlEncodedView({ input }: UrlEncodedViewProps) {
  const parsed = useMemo(() => {
    try {
      const isFullUrl = /^https?:\/\//i.test(input);
      if (isFullUrl) {
        const url = new URL(input);
        return {
          type: "url" as const,
          rows: Array.from(url.searchParams.entries()),
          summary: `${url.protocol}//${url.host}${url.pathname}`,
        };
      }

      const params = new URLSearchParams(
        input.startsWith("?") ? input : `?${input}`,
      );
      return {
        type: "query" as const,
        rows: Array.from(params.entries()),
        summary: "Query string",
      };
    } catch (error) {
      return {
        type: "error" as const,
        rows: [] as Array<[string, string]>,
        summary:
          error instanceof Error ? error.message : "Invalid URL encoding",
      };
    }
  }, [input]);

  if (parsed.type === "error") {
    return (
      <Panel title="URL encoded" subtitle="Unable to parse input">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {parsed.summary}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  return (
    <Panel title="URL encoded" subtitle={parsed.summary}>
      <div className="space-y-3">
        {parsed.rows.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-sm text-gray-500">
            No query parameters found.
          </div>
        ) : (
          parsed.rows.map(([key, value]) => (
            <div
              key={`${key}-${value}`}
              className="rounded-2xl border border-white/10 bg-black/20 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-white">{key}</div>
                <CopyButton
                  text={decodeURIComponent(value)}
                  label="Copy decoded"
                />
              </div>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Raw
                  </div>
                  <div className="mt-1 break-words text-sm text-gray-300">
                    {value}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Decoded
                  </div>
                  <div className="mt-1 break-words text-sm text-gray-100">
                    {decodeURIComponent(value)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}
