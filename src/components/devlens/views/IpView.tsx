"use client";

import { useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type IpViewProps = {
  input: string;
};

function parseIp(input: string) {
  const trimmed = input.trim();
  const [address, prefix] = trimmed.split("/");
  const isIpv4 = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(address);
  const isIpv6 = address.includes(":");
  const kind = isIpv4 ? "IPv4" : isIpv6 ? "IPv6" : "Unknown";
  const privateMatch =
    isIpv4 &&
    (/^10\./.test(address) ||
      /^192\.168\./.test(address) ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(address));
  const loopback = isIpv4 ? /^127\./.test(address) : address === "::1";

  return {
    kind,
    address,
    prefix: prefix ?? null,
    segments: isIpv4
      ? address.split(".")
      : isIpv6
        ? address.split(":").filter(Boolean)
        : [],
    privateMatch,
    loopback,
  };
}

export function IpView({ input }: IpViewProps) {
  const parsed = useMemo(() => parseIp(input), [input]);

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

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Segments
            </div>
            <div className="mt-2 text-white">
              {parsed.segments.join(parsed.kind === "IPv4" ? "." : ":") || "—"}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Scope
            </div>
            <div className="mt-2 text-white">
              {parsed.loopback
                ? "loopback"
                : parsed.privateMatch
                  ? "private"
                  : "public"}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
