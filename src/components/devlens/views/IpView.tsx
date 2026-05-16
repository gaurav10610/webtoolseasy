"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";
import { lookupIpv4Geo } from "@/lib/devlens/ipGeo";

type IpViewProps = {
  input: string;
};

type ParsedIpv4 = {
  kind: "IPv4";
  address: string;
  prefix: number | null;
  segments: number[];
  className: string;
  status: string[];
  cidr?: {
    network: string;
    broadcast: string;
    firstUsable: string;
    lastUsable: string;
    hostCount: number;
  };
};

type ParsedIpv6 = {
  kind: "IPv6";
  address: string;
  prefix: number | null;
  expanded: string;
  compressed: string;
  type: string;
};

type ParsedIp = ParsedIpv4 | ParsedIpv6 | { kind: "Invalid"; address: string };

function parseIpv4(address: string): ParsedIpv4 | null {
  if (!/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(address)) {
    return null;
  }

  const segments = address.split(".").map((segment) => Number(segment));
  if (segments.some((segment) => segment < 0 || segment > 255)) {
    return null;
  }

  const firstOctet = segments[0];
  const className =
    firstOctet <= 126
      ? "A"
      : firstOctet <= 191
        ? "B"
        : firstOctet <= 223
          ? "C"
          : firstOctet <= 239
            ? "D"
            : "E";

  const status = [
    firstOctet === 127 ? "loopback" : null,
    firstOctet >= 224 ? "multicast" : null,
    firstOctet >= 240 ? "reserved" : null,
    isPrivateIpv4(segments) ? "private" : "public",
  ].filter(Boolean) as string[];

  return {
    kind: "IPv4",
    address,
    prefix: null,
    segments,
    className,
    status,
  };
}

function isPrivateIpv4([first, second]: number[]) {
  return (
    first === 10 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

function ipv4ToNumber(segments: number[]) {
  return (
    (((segments[0] << 24) >>> 0) +
      ((segments[1] << 16) >>> 0) +
      ((segments[2] << 8) >>> 0) +
      (segments[3] >>> 0)) >>>
    0
  );
}

function numberToIpv4(value: number) {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255,
  ].join(".");
}

function prefixToMask(prefix: number) {
  if (prefix <= 0) return 0;
  if (prefix >= 32) return 0xffffffff;
  return (0xffffffff << (32 - prefix)) >>> 0;
}

function parseIpv4Cidr(
  address: string,
  prefix: number,
): ParsedIpv4["cidr"] | undefined {
  const parsed = parseIpv4(address);
  if (!parsed) return undefined;

  const ip = ipv4ToNumber(parsed.segments);
  const mask = prefixToMask(prefix);
  const network = ip & mask;
  const broadcast = network | (~mask >>> 0);
  const hostCount = prefix >= 31 ? 0 : 2 ** (32 - prefix) - 2;

  return {
    network: numberToIpv4(network),
    broadcast: numberToIpv4(broadcast),
    firstUsable:
      hostCount > 0 ? numberToIpv4(network + 1) : numberToIpv4(network),
    lastUsable:
      hostCount > 0 ? numberToIpv4(broadcast - 1) : numberToIpv4(broadcast),
    hostCount,
  };
}

function expandIpv6(address: string) {
  const input = address.toLowerCase();
  if (input.includes("::")) {
    const [leftPart, rightPart] = input.split("::");
    const left = leftPart ? leftPart.split(":").filter(Boolean) : [];
    const right = rightPart ? rightPart.split(":").filter(Boolean) : [];
    const zeroCount = 8 - left.length - right.length;

    if (zeroCount < 0) return null;

    return [...left, ...Array.from({ length: zeroCount }, () => "0"), ...right]
      .map((segment) => segment.padStart(4, "0"))
      .join(":");
  }

  const segments = input.split(":");
  if (segments.length !== 8) return null;
  return segments.map((segment) => segment.padStart(4, "0")).join(":");
}

function compressIpv6(expanded: string) {
  const segments = expanded
    .split(":")
    .map((segment) => segment.replace(/^0+/, "") || "0");
  let bestStart = -1;
  let bestLength = 0;
  let currentStart = -1;

  for (let index = 0; index <= segments.length; index += 1) {
    if (index < segments.length && segments[index] === "0") {
      if (currentStart === -1) currentStart = index;
    } else if (currentStart !== -1) {
      const currentLength = index - currentStart;
      if (currentLength > bestLength) {
        bestStart = currentStart;
        bestLength = currentLength;
      }
      currentStart = -1;
    }
  }

  if (bestLength < 2) {
    return segments.join(":");
  }

  const head = segments.slice(0, bestStart).join(":");
  const tail = segments.slice(bestStart + bestLength).join(":");
  return `${head ? `${head}:` : ""}::${tail ? `${tail}` : ""}`.replace(
    /:{3,}/,
    "::",
  );
}

function classifyIpv6(address: string) {
  const lower = address.toLowerCase();
  if (lower === "::1") return "loopback";
  if (lower === "::") return "unspecified";
  if (
    lower.startsWith("fe8") ||
    lower.startsWith("fe9") ||
    lower.startsWith("fea") ||
    lower.startsWith("feb")
  ) {
    return "link-local";
  }
  if (lower.startsWith("fc") || lower.startsWith("fd")) return "unique-local";
  if (lower.startsWith("ff")) return "multicast";
  return "global-unicast";
}

function parseIpv6(address: string, prefix: number | null): ParsedIpv6 | null {
  const expanded = expandIpv6(address);
  if (!expanded) return null;

  return {
    kind: "IPv6",
    address,
    prefix,
    expanded,
    compressed: compressIpv6(expanded),
    type: classifyIpv6(address),
  };
}

function parseIp(input: string): ParsedIp {
  const trimmed = input.trim();
  const [addressPart, prefixPart] = trimmed.split("/");
  const prefix = prefixPart === undefined ? null : Number(prefixPart);
  const hasIpv4Prefix =
    prefixPart !== undefined &&
    prefix !== null &&
    Number.isInteger(prefix) &&
    prefix >= 0 &&
    prefix <= 32;

  if (hasIpv4Prefix) {
    const ipv4 = parseIpv4(addressPart);
    if (ipv4) {
      return { ...ipv4, prefix, cidr: parseIpv4Cidr(addressPart, prefix) };
    }
  }

  const ipv4 = parseIpv4(addressPart);
  if (ipv4) {
    return { ...ipv4, prefix: Number.isInteger(prefix) ? prefix : null };
  }

  const ipv6 = parseIpv6(addressPart, Number.isInteger(prefix) ? prefix : null);
  if (ipv6) {
    return ipv6;
  }

  return { kind: "Invalid", address: trimmed };
}

export function IpView({ input }: IpViewProps) {
  const parsed = useMemo(() => parseIp(input), [input]);
  const [geo, setGeo] = useState<{
    countryCode: string;
    region: string | null;
    city: string | null;
  } | null>(null);

  useEffect(() => {
    let isCancelled = false;

    if (parsed.kind !== "IPv4") {
      setGeo(null);
      return () => {
        isCancelled = true;
      };
    }

    lookupIpv4Geo(parsed.address)
      .then((result) => {
        if (!isCancelled) setGeo(result);
      })
      .catch(() => {
        if (!isCancelled) setGeo(null);
      });

    return () => {
      isCancelled = true;
    };
  }, [parsed]);

  if (parsed.kind === "Invalid") {
    return (
      <Panel title="IP address" subtitle="Unable to parse input">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            Invalid IPv4 or IPv6 address
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title="IP address"
      subtitle={parsed.kind}
      action={<CopyButton text={input} label="Copy input" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Address
            </div>
            <div className="mt-2 break-all text-white">{parsed.address}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Prefix
            </div>
            <div className="mt-2 text-white">{parsed.prefix ?? "none"}</div>
          </div>
        </div>

        {parsed.kind === "IPv4" ? (
          <>
            <div className="flex flex-wrap gap-2">
              <Badge variant="info">Class {parsed.className}</Badge>
              {parsed.status.map((item) => (
                <Badge
                  key={item}
                  variant={
                    item === "private"
                      ? "success"
                      : item === "public"
                        ? "neutral"
                        : "warning"
                  }
                >
                  {item}
                </Badge>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Segments
                </div>
                <div className="mt-2 text-white">
                  {parsed.segments.join(".")}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Scope
                </div>
                <div className="mt-2 text-white">
                  {parsed.status.join(", ")}
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Country
                </div>
                <div className="mt-2 text-white">
                  {geo?.countryCode || "Unknown"}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Region
                </div>
                <div className="mt-2 text-white">{geo?.region || "n/a"}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  City
                </div>
                <div className="mt-2 text-white">{geo?.city || "n/a"}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Reverse DNS hint
                </div>
                <div className="mt-2 text-white">
                  Use dig -x {parsed.address}
                </div>
              </div>
            </div>

            {parsed.cidr ? (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    Network
                  </div>
                  <div className="mt-2 text-white">{parsed.cidr.network}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    Broadcast
                  </div>
                  <div className="mt-2 text-white">{parsed.cidr.broadcast}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    First usable
                  </div>
                  <div className="mt-2 text-white">
                    {parsed.cidr.firstUsable}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    Host count
                  </div>
                  <div className="mt-2 text-white">{parsed.cidr.hostCount}</div>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <Badge variant="info">{parsed.type}</Badge>
              {parsed.prefix !== null ? (
                <Badge variant="neutral">/{parsed.prefix}</Badge>
              ) : null}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Segments
                </div>
                <div className="mt-2 text-white">{parsed.expanded}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Compressed
                </div>
                <div className="mt-2 text-white">{parsed.compressed}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </Panel>
  );
}
