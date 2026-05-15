"use client";

import { useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type TimestampViewProps = {
  input: string;
};

function toDate(value: string): Date | null {
  if (!/^\d+$/.test(value)) return null;
  const numeric = Number(value);
  if (value.length === 13) return new Date(numeric);
  if (value.length === 16) return new Date(Math.floor(numeric / 1000));
  return new Date(numeric * 1000);
}

export function TimestampView({ input }: TimestampViewProps) {
  const result = useMemo(() => {
    const date = toDate(input.trim());
    if (!date || Number.isNaN(date.getTime())) {
      return { error: "Invalid Unix timestamp", date: null as Date | null };
    }

    return { error: null as string | null, date };
  }, [input]);

  if (result.error || !result.date) {
    return (
      <Panel title="Timestamp" subtitle="Unable to parse timestamp">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {result.error}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  const iso = result.date.toISOString();
  const local = result.date.toLocaleString();

  return (
    <Panel
      title="Timestamp"
      subtitle="Unix time converted locally"
      action={<CopyButton text={iso} label="Copy ISO" />}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            ISO 8601
          </div>
          <div className="mt-2 text-lg text-white">{iso}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Local time
          </div>
          <div className="mt-2 text-lg text-white">{local}</div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-gray-400">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Seconds: {Math.floor(result.date.getTime() / 1000)}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Milliseconds: {result.date.getTime()}
          </span>
        </div>
      </div>
    </Panel>
  );
}
