"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";
import { SimpleTabs } from "@/components/ui/Tabs";

type UrlEncodedViewProps = {
  input: string;
};

function isDoubleEncoded(value: string): boolean {
  try {
    const decoded = decodeURIComponent(value);
    return /%[0-9A-Fa-f]{2}/.test(decoded);
  } catch {
    return false;
  }
}

function safeDecodeUri(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function UrlEncodedView({ input }: UrlEncodedViewProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [encodeKeys, setEncodeKeys] = useState<Array<{ key: string; value: string }>>([
    { key: "", value: "" },
  ]);

  const parsed = useMemo(() => {
    const trimmed = input.trim();

    // Check if it's a full URL
    try {
      const url = new URL(trimmed);
      const params: Array<{
        key: string;
        raw: string;
        decoded: string;
        isDoubleEncoded: boolean;
      }> = [];

      for (const [key, value] of url.searchParams.entries()) {
        const rawParam = trimmed.match(
          new RegExp(`[?&]${encodeURIComponent(key).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^&]*)`)
        );
        const rawValue = rawParam ? rawParam[1] : value;

        params.push({
          key,
          raw: rawValue,
          decoded: safeDecodeUri(rawValue),
          isDoubleEncoded: isDoubleEncoded(rawValue),
        });
      }

      return {
        type: "url" as const,
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        hash: url.hash,
        params,
        fullDecoded: safeDecodeUri(trimmed),
      };
    } catch {
      // Not a full URL, treat as query string
    }

    // Parse as query string
    const queryStr = trimmed.startsWith("?") ? trimmed.slice(1) : trimmed;
    const params: Array<{
      key: string;
      raw: string;
      decoded: string;
      isDoubleEncoded: boolean;
    }> = [];

    for (const pair of queryStr.split("&")) {
      const [rawKey, ...valueParts] = pair.split("=");
      const rawValue = valueParts.join("=");
      params.push({
        key: safeDecodeUri(rawKey),
        raw: rawValue,
        decoded: safeDecodeUri(rawValue),
        isDoubleEncoded: isDoubleEncoded(rawValue),
      });
    }

    return {
      type: "querystring" as const,
      protocol: "",
      hostname: "",
      port: "",
      pathname: "",
      hash: "",
      params,
      fullDecoded: safeDecodeUri(trimmed),
    };
  }, [input]);

  const hasDoubleEncoded = parsed.params.some((p) => p.isDoubleEncoded);

  const encodedOutput = useMemo(() => {
    const params = new URLSearchParams();
    for (const item of encodeKeys) {
      if (item.key.trim()) {
        params.set(item.key, item.value);
      }
    }
    return params.toString();
  }, [encodeKeys]);

  const tabs = ["Decode", "Encode"];

  return (
    <div className="space-y-4">
      <SimpleTabs tabs={tabs} activeIndex={activeTab} onChange={setActiveTab} />

      {activeTab === 0 ? (
        <div className="space-y-4">
          {parsed.type === "url" ? (
            <Panel title="URL Components">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    Protocol
                  </div>
                  <div className="mt-2 text-white">{parsed.protocol}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    Hostname
                  </div>
                  <div className="mt-2 text-white">{parsed.hostname}</div>
                </div>
                {parsed.port ? (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      Port
                    </div>
                    <div className="mt-2 text-white">{parsed.port}</div>
                  </div>
                ) : null}
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    Pathname
                  </div>
                  <div className="mt-2 text-white">{parsed.pathname}</div>
                </div>
                {parsed.hash ? (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      Hash
                    </div>
                    <div className="mt-2 text-white">{parsed.hash}</div>
                  </div>
                ) : null}
              </div>
            </Panel>
          ) : null}

          {hasDoubleEncoded ? (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              ⚠️ Some parameters appear to be double-encoded. The decoded values
              still contain percent-encoded characters.
            </div>
          ) : null}

          <Panel
            title="Parameters"
            subtitle={`${parsed.params.length} parameter${parsed.params.length !== 1 ? "s" : ""}`}
          >
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20">
              <table className="w-full text-xs text-gray-100">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      Key
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      Raw encoded
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      Decoded value
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parsed.params.map((param, index) => (
                    <tr
                      key={`${param.key}-${index}`}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-3 py-2 font-semibold text-white">
                        {param.key}
                      </td>
                      <td className="max-w-[300px] truncate px-3 py-2 text-gray-400">
                        {param.raw}
                      </td>
                      <td className="max-w-[300px] px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className="truncate">{param.decoded}</span>
                          {param.isDoubleEncoded ? (
                            <Badge variant="warning">2×</Badge>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <CopyButton text={param.decoded} label="Copy" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel
            title="Full decoded URL"
            action={<CopyButton text={parsed.fullDecoded} label="Copy decoded" />}
          >
            <pre className="overflow-x-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100 break-all whitespace-pre-wrap">
              {parsed.fullDecoded}
            </pre>
          </Panel>
        </div>
      ) : null}

      {activeTab === 1 ? (
        <Panel title="Encode" subtitle="Build a URL-encoded query string">
          <div className="space-y-3">
            {encodeKeys.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item.key}
                  onChange={(e) => {
                    const next = [...encodeKeys];
                    next[index] = { ...next[index], key: e.target.value };
                    setEncodeKeys(next);
                  }}
                  placeholder="Key"
                  className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-gray-500 focus:border-indigo-500/60"
                />
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => {
                    const next = [...encodeKeys];
                    next[index] = { ...next[index], value: e.target.value };
                    setEncodeKeys(next);
                  }}
                  placeholder="Value"
                  className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-gray-500 focus:border-indigo-500/60"
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = encodeKeys.filter((_, i) => i !== index);
                    setEncodeKeys(next.length ? next : [{ key: "", value: "" }]);
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-400 hover:bg-white/10 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setEncodeKeys([...encodeKeys, { key: "", value: "" }])
              }
              className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1 text-xs text-indigo-100 hover:bg-indigo-500/20 transition-colors"
            >
              + Add parameter
            </button>
            {encodedOutput ? (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    Encoded output
                  </div>
                  <CopyButton text={encodedOutput} label="Copy" />
                </div>
                <pre className="mt-2 overflow-x-auto text-xs leading-6 text-gray-100 break-all whitespace-pre-wrap">
                  {encodedOutput}
                </pre>
              </div>
            ) : null}
          </div>
        </Panel>
      ) : null}
    </div>
  );
}
