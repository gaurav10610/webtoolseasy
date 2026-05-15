"use client";

import { useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type UuidViewProps = {
  input: string;
};

function getVersion(value: string): string {
  return value.split("-")[2]?.[0] ?? "unknown";
}

export function UuidView({ input }: UuidViewProps) {
  const parsed = useMemo(() => {
    const version = getVersion(input.trim());
    const valid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        input.trim(),
      );
    return { version, valid };
  }, [input]);

  if (!parsed.valid) {
    return (
      <Panel title="UUID" subtitle="Unable to parse UUID">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            Invalid UUID format
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title="UUID"
      subtitle={`Version ${parsed.version}`}
      action={<CopyButton text={input} label="Copy UUID" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            UUID
          </div>
          <div className="mt-2 break-all text-lg text-white">{input}</div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Version
            </div>
            <div className="mt-2 text-white">{parsed.version}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Variant
            </div>
            <div className="mt-2 text-white">RFC 4122</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
