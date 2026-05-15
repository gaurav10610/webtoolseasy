"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type UuidViewProps = {
  input: string;
};

const GREGORIAN_EPOCH_OFFSET = BigInt("0x01b21dd213814000");

function getVersion(value: string): string {
  return value.split("-")[2]?.[0] ?? "unknown";
}

function getVariant(value: string) {
  const nibble = value.split("-")[3]?.[0]?.toLowerCase();

  if (!nibble) return "unknown";
  if (["8", "9", "a", "b"].includes(nibble)) return "RFC 4122";
  if (["c", "d", "e", "f"].includes(nibble)) return "future";
  return "NCS";
}

function bytesToUuid(bytes: Uint8Array) {
  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}

function generateUuidV4() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return bytesToUuid(bytes);
}

function generateUuidV7() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const timestamp = BigInt(Date.now());

  for (let index = 0; index < 6; index += 1) {
    bytes[5 - index] = Number((timestamp >> BigInt(index * 8)) & BigInt(0xff));
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return bytesToUuid(bytes);
}

function parseUuid(value: string) {
  const match = value
    .trim()
    .match(
      /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i,
    );

  if (!match) return null;

  const [, timeLow, timeMid, timeHigh, clockSequence, node] = match;
  const version = Number(timeHigh[0]);
  const variant = getVariant(value);

  return { timeLow, timeMid, timeHigh, clockSequence, node, version, variant };
}

function formatUuidVersionDetails(parsed: ReturnType<typeof parseUuid>) {
  if (!parsed) return null;

  if (parsed.version === 1) {
    const timestamp100ns =
      (BigInt(`0x${parsed.timeHigh.slice(1)}`) << BigInt(48)) |
      (BigInt(`0x${parsed.timeMid}`) << BigInt(32)) |
      BigInt(`0x${parsed.timeLow}`);
    const unixMilliseconds = Number(
      (timestamp100ns - GREGORIAN_EPOCH_OFFSET) / BigInt(10000),
    );

    return {
      label: "Version 1 timestamp",
      value: new Date(unixMilliseconds).toISOString(),
      note: `Node hint: ${parsed.node.slice(0, 2)}:${parsed.node.slice(2, 4)}:${parsed.node.slice(4, 6)}:${parsed.node.slice(6, 8)}:${parsed.node.slice(8, 10)}:${parsed.node.slice(10, 12)}`,
    };
  }

  if (parsed.version === 4) {
    return {
      label: "Random bits",
      value: "122 bits of randomness",
      note: "Version 4 UUIDs are randomly generated and do not encode time.",
    };
  }

  if (parsed.version === 7) {
    const unixMilliseconds = Number(
      BigInt(`0x${parsed.timeLow}${parsed.timeMid}`),
    );

    return {
      label: "Version 7 timestamp",
      value: new Date(unixMilliseconds).toISOString(),
      note: "Version 7 UUIDs embed Unix millisecond time in the first 48 bits.",
    };
  }

  return {
    label: "Version details",
    value: "No additional decoder available for this version.",
    note: "",
  };
}

export function UuidView({ input }: UuidViewProps) {
  const [currentValue, setCurrentValue] = useState(input.trim());

  useEffect(() => {
    setCurrentValue(input.trim());
  }, [input]);

  const parsed = useMemo(() => {
    const value = currentValue.trim();
    const uuid = parseUuid(value);

    if (!uuid) {
      return {
        valid: false,
        uuid: null as ReturnType<typeof parseUuid>,
        version: "unknown",
      };
    }

    return { valid: true, uuid, version: getVersion(value) };
  }, [currentValue]);

  if (!parsed.valid) {
    return (
      <Panel
        title="UUID"
        subtitle="Unable to parse UUID"
        action={
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <button
              type="button"
              className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-indigo-100"
              onClick={() => setCurrentValue(generateUuidV4())}
            >
              Generate new UUID v4
            </button>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300"
              onClick={() => setCurrentValue(generateUuidV7())}
            >
              Generate new UUID v7
            </button>
          </div>
        }
      >
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            Invalid UUID format
          </p>
          <CopyButton text={currentValue} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  const versionDetails = formatUuidVersionDetails(parsed.uuid);

  return (
    <Panel
      title="UUID"
      subtitle={`Version ${parsed.version}`}
      action={
        <div className="flex flex-wrap gap-2 text-xs text-gray-400">
          <button
            type="button"
            className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-indigo-100"
            onClick={() => setCurrentValue(generateUuidV4())}
          >
            Generate new UUID v4
          </button>
          <button
            type="button"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300"
            onClick={() => setCurrentValue(generateUuidV7())}
          >
            Generate new UUID v7
          </button>
          <CopyButton text={currentValue} label="Copy UUID" />
        </div>
      }
    >
      <div className="space-y-4 text-sm text-gray-300">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            UUID
          </div>
          <div className="mt-2 break-all text-lg text-white">
            {currentValue}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Version
            </div>
            <div className="mt-2 flex items-center gap-2 text-white">
              <Badge variant="info">v{parsed.version}</Badge>
              <span>{parsed.version}</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Variant
            </div>
            <div className="mt-2 text-white">{parsed.uuid?.variant}</div>
          </div>
        </div>
        {versionDetails ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              {versionDetails.label}
            </div>
            <div className="mt-2 text-lg text-white">
              {versionDetails.value}
            </div>
            {versionDetails.note ? (
              <p className="mt-2 text-xs leading-5 text-gray-400">
                {versionDetails.note}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Breakdown
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Node: {parsed.uuid?.node}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Clock sequence: {parsed.uuid?.clockSequence}
            </span>
          </div>
        </div>
      </div>
    </Panel>
  );
}
