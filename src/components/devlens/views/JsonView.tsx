"use client";

import { useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type JsonViewProps = {
  input: string;
};

export function JsonView({ input }: JsonViewProps) {
  const result = useMemo(() => {
    try {
      return { value: JSON.parse(input), error: null as string | null };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : "Invalid JSON",
      };
    }
  }, [input]);

  if (result.error || result.value === null) {
    return (
      <Panel title="JSON" subtitle="Unable to parse JSON">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {result.error}
          </p>
          <CopyButton text={input} label="Copy raw JSON" />
        </div>
      </Panel>
    );
  }

  const pretty = JSON.stringify(result.value, null, 2);
  const keyCount = Array.isArray(result.value)
    ? result.value.length
    : Object.keys(result.value as Record<string, unknown>).length;

  return (
    <Panel
      title="JSON"
      subtitle={`Top-level entries: ${keyCount}`}
      action={<CopyButton text={pretty} label="Copy JSON" />}
    >
      <pre className="max-h-[520px] overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
        {pretty}
      </pre>
    </Panel>
  );
}
