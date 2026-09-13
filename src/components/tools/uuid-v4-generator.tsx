"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout } from "../common/ToolLayout";

type UuidVersion = "v4" | "v7" | "v1" | "guid" | "nil" | "ulid";

const ULID_ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
function generateUlid(): string {
  const time = Date.now();
  let ts = time;
  const timeChars = new Array(10);
  for (let i = 9; i >= 0; i--) {
    timeChars[i] = ULID_ENCODING[ts % 32];
    ts = Math.floor(ts / 32);
  }
  let rand = "";
  for (let i = 0; i < 16; i++) {
    rand += ULID_ENCODING[Math.floor(Math.random() * 32)];
  }
  return timeChars.join("") + rand;
}

function generateUuidV4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateUuidV7(): string {
  const now = Date.now();
  const timeHex = now.toString(16).padStart(12, "0");
  const randA = Math.floor(Math.random() * 0xfff).toString(16).padStart(3, "0");
  const randB = (Math.floor(Math.random() * 0x3fff) | 0x8000).toString(16);
  const randC = Math.floor(Math.random() * 0xffffffffffff)
    .toString(16)
    .padStart(12, "0");
  return `${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-7${randA}-${randB}-${randC}`;
}

function generateUuidV1(): string {
  const now = Date.now() * 10000 + 122192928000000000;
  const hex = now.toString(16).padStart(16, "0");
  const timeLow = hex.slice(8, 16);
  const timeMid = hex.slice(4, 8);
  const timeHi = "1" + hex.slice(1, 4);
  const clockSeq = (Math.floor(Math.random() * 0x3fff) | 0x8000).toString(16);
  const node = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0"),
  ).join("");
  return `${timeLow}-${timeMid}-${timeHi}-${clockSeq}-${node}`;
}

function generateRawUuid(version: UuidVersion): string {
  switch (version) {
    case "ulid":
      return generateUlid();
    case "v7":
      return generateUuidV7();
    case "v1":
      return generateUuidV1();
    case "nil":
      return "00000000-0000-0000-0000-000000000000";
    case "guid":
    case "v4":
    default:
      return generateUuidV4();
  }
}

export default function UuidV4Generator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialUuid = generateUuidV4();
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: initialUuid,
  });

  const [version, setVersion] = useState<UuidVersion>("v4");
  const [uuidList, setUuidList] = useState<string[]>([initialUuid]);
  const [bulkCount, setBulkCount] = useState<number>(10);
  const [uuidCase, setUuidCase] = useState<"lower" | "upper">("lower");
  const [uuidStyle, setUuidStyle] = useState<"hyphens" | "nohyphens" | "braces">(
    "hyphens",
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const applyFormat = useCallback(
    (uuid: string, currentCase = uuidCase, currentStyle = uuidStyle) => {
      let result = currentCase === "upper" ? uuid.toUpperCase() : uuid.toLowerCase();
      if (currentStyle === "nohyphens") {
        result = result.replace(/-/g, "");
      } else if (currentStyle === "braces") {
        result = `{${result}}`;
      }
      return result;
    },
    [uuidCase, uuidStyle],
  );

  const handleGenerate = useCallback(() => {
    const newUuid = generateRawUuid(version);
    toolState.setCode(newUuid);
    setUuidList([newUuid]);
    toolState.actions.showMessage(`New ${version.toUpperCase()} generated!`);
  }, [version, toolState]);

  const handleBulkGenerate = useCallback(
    (countToGen?: number) => {
      const count = countToGen ?? Math.min(Math.max(1, bulkCount), 1000);
      const newUuids = Array.from({ length: count }, () =>
        generateRawUuid(version),
      );
      setUuidList(newUuids);
      toolState.setCode(newUuids[0]);
      toolState.actions.showMessage(`Generated ${count} ${version.toUpperCase()}s!`);
    },
    [bulkCount, version, toolState],
  );

  const handleCopyAll = useCallback(() => {
    const formatted = uuidList.map((u) => applyFormat(u)).join("\n");
    navigator.clipboard.writeText(formatted);
    toolState.actions.showMessage(
      `Copied ${uuidList.length} identifier${uuidList.length > 1 ? "s" : ""} to clipboard!`,
    );
  }, [uuidList, applyFormat, toolState.actions]);

  const handleCopySingle = useCallback(
    (uuid: string, index: number) => {
      const formatted = applyFormat(uuid);
      navigator.clipboard.writeText(formatted);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
      toolState.actions.showMessage("Copied to clipboard!");
    },
    [applyFormat, toolState.actions],
  );

  const handleDownload = useCallback(() => {
    const text = uuidList.map((u) => applyFormat(u)).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${version}-identifiers.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Downloaded identifiers file");
  }, [uuidList, applyFormat, version, toolState.actions]);

  const formattedCurrent = useMemo(
    () => applyFormat(uuidList[0] || initialUuid),
    [uuidList, initialUuid, applyFormat],
  );

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
        {/* Version Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "v4", label: "UUID v4 (Random)" },
              { id: "v7", label: "UUID v7 (Time-Ordered)" },
              { id: "v1", label: "UUID v1 (Timestamp)" },
              { id: "guid", label: "GUID (Microsoft)" },
              { id: "ulid", label: "ULID (Lexicographical)" },
              { id: "nil", label: "Nil UUID (Zeros)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  const newVer = tab.id as UuidVersion;
                  setVersion(newVer);
                  const fresh = generateRawUuid(newVer);
                  toolState.setCode(fresh);
                  setUuidList([fresh]);
                }}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition-all ${
                  version === tab.id
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 px-2 font-mono">
            <span>🔒 100% In-Browser</span>
          </div>
        </div>

        {/* Primary Generator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Controls & Live Output (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Primary Display Card */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono">
                  Current {version.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 font-mono">128-bit</span>
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  readOnly
                  value={formattedCurrent}
                  className="w-full font-mono text-base sm:text-lg font-semibold bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-24 text-slate-900 dark:text-slate-100 outline-none select-all focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={() => handleCopySingle(uuidList[0] || initialUuid, 0)}
                  className="absolute right-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
                >
                  {copiedIndex === 0 ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition-all hover:shadow"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Generate Another
                </button>

                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy All ({uuidList.length})
                </button>
              </div>
            </div>

            {/* Customization & Formatting Options */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Formatting &amp; Output Options
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Casing */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Casing
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setUuidCase("lower")}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                        uuidCase === "lower"
                          ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      lowercase
                    </button>
                    <button
                      type="button"
                      onClick={() => setUuidCase("upper")}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                        uuidCase === "upper"
                          ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      UPPERCASE
                    </button>
                  </div>
                </div>

                {/* Hyphens & Braces */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Delimiter / Style
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setUuidStyle("hyphens")}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                        uuidStyle === "hyphens"
                          ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Hyphens
                    </button>
                    <button
                      type="button"
                      onClick={() => setUuidStyle("nohyphens")}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                        uuidStyle === "nohyphens"
                          ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Plain
                    </button>
                    <button
                      type="button"
                      onClick={() => setUuidStyle("braces")}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                        uuidStyle === "braces"
                          ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      &#123;Braces&#125;
                    </button>
                  </div>
                </div>
              </div>

              {/* Bulk Generation Section */}
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Bulk Generate (up to 1,000)
                  </label>
                  <div className="flex gap-1">
                    {[5, 10, 25, 50, 100].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setBulkCount(preset);
                          handleBulkGenerate(preset);
                        }}
                        className="px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950 hover:text-sky-600 dark:hover:text-sky-400 font-mono transition-colors"
                      >
                        +{preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={bulkCount}
                    onChange={(e) =>
                      setBulkCount(
                        Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)),
                      )
                    }
                    className="w-28 px-3 py-2 text-sm font-mono bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleBulkGenerate()}
                    className="flex-1 px-4 py-2 text-sm font-medium rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 transition-colors"
                  >
                    Generate {bulkCount} Identifiers
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Generated List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Generated List ({uuidList.length})
              </h3>
              {uuidList.length > 1 && (
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="text-xs text-sky-600 dark:text-sky-400 font-medium hover:underline"
                >
                  Copy All
                </button>
              )}
            </div>

            <div className="flex-1 min-h-[380px] max-h-[520px] overflow-y-auto rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 divide-y divide-gray-100 dark:divide-slate-800/60 font-mono text-xs">
              {uuidList.map((uuid, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg group transition-colors"
                >
                  <span className="text-slate-800 dark:text-slate-200 select-all truncate pr-2">
                    {applyFormat(uuid)}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-slate-400">#{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleCopySingle(uuid, idx)}
                      className="opacity-0 group-hover:opacity-100 px-2 py-0.5 text-[11px] rounded bg-slate-200 dark:bg-slate-700 hover:bg-sky-600 hover:text-white transition-all"
                    >
                      {copiedIndex === idx ? "✓" : "Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Architecture & SEO Reference Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/20 dark:to-indigo-950/20 rounded-2xl border border-sky-200 dark:border-sky-800/40 text-xs text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold text-sky-900 dark:text-sky-300 mb-1">
              UUID v4 (Random)
            </h4>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              Generates a cryptographically strong pseudo-random 128-bit value. Perfect for session tokens, request IDs, and microservice events.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1">
              UUID v7 (Time-Ordered)
            </h4>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              The modern IETF standard featuring a 48-bit millisecond timestamp prefix. Optimizes database B-tree index locality and avoids index fragmentation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sky-900 dark:text-sky-300 mb-1">
              GUID vs UUID
            </h4>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              GUID is Microsoft&apos;s implementation of the UUID standard. Both share identical 128-bit structure and are 100% interoperable across systems.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
