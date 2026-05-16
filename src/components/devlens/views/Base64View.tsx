"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type Base64ViewProps = {
  input: string;
};

type DecodedKind = "empty" | "json" | "html" | "binary" | "text";

function decodeBase64(value: string): string {
  const normalized = value
    .replace(/\s+/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

function isLikelyBase64(value: string) {
  const normalized = value
    .replace(/\s+/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  if (!normalized || normalized.length % 4 === 1) {
    return false;
  }

  if (!/^[A-Za-z0-9+/]+=*$/.test(normalized)) {
    return false;
  }

  try {
    decodeBase64(value);
    return true;
  } catch {
    return false;
  }
}

function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function decodeToBytes(value: string) {
  return Array.from(value, (character) => character.charCodeAt(0));
}

function formatHexDump(decoded: string) {
  const bytes = decodeToBytes(decoded);
  const lines: string[] = [];

  for (let index = 0; index < bytes.length; index += 16) {
    const chunk = bytes.slice(index, index + 16);
    const hex = chunk
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join(" ");
    const ascii = chunk
      .map((byte) =>
        byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : ".",
      )
      .join("");
    lines.push(
      `${index.toString(16).padStart(4, "0")}: ${hex.padEnd(47, " ")} ${ascii}`,
    );
  }

  return lines.join("\n");
}

function getDataUrlMeta(value: string) {
  const match = value.match(/^data:([^;,]+)?(?:;charset=[^;,]+)?(;base64)?,/i);
  const mimeType = match?.[1] ?? "text/plain";
  return {
    isDataUrl: value.startsWith("data:"),
    mimeType,
    isBase64DataUrl: Boolean(match?.[2]),
  };
}

function classifyDecodedValue(decoded: string) {
  const trimmed = decoded.trim();

  if (!trimmed) {
    return { type: "empty", label: "Empty" };
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      JSON.parse(trimmed);
      return { type: "json", label: "JSON" };
    } catch {
      // fall through
    }
  }

  if (/<([a-z][^\s/>]*)/i.test(trimmed)) {
    return { type: "html", label: "HTML" };
  }

  const binaryCharacters = Array.from(decoded).filter((character) => {
    const codePoint = character.charCodeAt(0);
    return codePoint < 32 || codePoint > 126;
  }).length;

  if (binaryCharacters > Math.max(1, decoded.length * 0.05)) {
    return { type: "binary", label: "Binary" };
  }

  return { type: "text", label: "Plain text" };
}

function prettyPrintJson(value: string) {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

export function Base64View({ input }: Base64ViewProps) {
  const initialMode = useMemo<"decode" | "encode">(() => {
    try {
      if (input.startsWith("data:")) {
        const [, payload = ""] = input.split(",", 2);
        return isLikelyBase64(payload) ? "decode" : "encode";
      }
      return isLikelyBase64(input) ? "decode" : "encode";
    } catch {
      return "encode";
    }
  }, [input]);

  const [mode, setMode] = useState<"decode" | "encode">(initialMode);
  const [encodeInput, setEncodeInput] = useState(input);
  const [showPrettyJson, setShowPrettyJson] = useState(false);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    setEncodeInput(input);
    setShowPrettyJson(false);
    setMode(initialMode);
    setFileDataUrl(null);
    setFileName(null);
    setFileError(null);
  }, [input, initialMode]);

  const handleFileEncode = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const resultValue =
        typeof reader.result === "string" ? reader.result : "";
      if (!resultValue.startsWith("data:")) {
        setFileError("Unable to convert file to a Base64 data URL.");
        setFileDataUrl(null);
        setFileName(null);
        return;
      }
      setFileError(null);
      setFileDataUrl(resultValue);
      setFileName(file.name);
    };
    reader.onerror = () => {
      setFileError("Failed to read the selected file.");
      setFileDataUrl(null);
      setFileName(null);
    };

    reader.readAsDataURL(file);
  };

  const result = useMemo(() => {
    try {
      if (input.startsWith("data:")) {
        const meta = getDataUrlMeta(input);
        const [, payload = ""] = input.split(",", 2);
        return {
          decoded: decodeBase64(payload),
          dataUrlMeta: meta,
          error: null as string | null,
        };
      }

      return {
        decoded: decodeBase64(input),
        dataUrlMeta: null as ReturnType<typeof getDataUrlMeta> | null,
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

  if (mode === "encode") {
    const encoded = fileDataUrl ?? encodeBase64(encodeInput);

    return (
      <Panel title="Base64" subtitle="Encode text to Base64">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <button
              type="button"
              className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-indigo-100"
              onClick={() => setMode("decode")}
            >
              Decode
            </button>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300"
              onClick={() => setMode("encode")}
            >
              Encode
            </button>
          </div>
          <textarea
            value={encodeInput}
            onChange={(event) => setEncodeInput(event.target.value)}
            rows={6}
            className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none ring-0 placeholder:text-gray-500 focus:border-indigo-500/60"
            placeholder="Type text to encode"
          />
          <label
            htmlFor="base64-file-input"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              handleFileEncode(event.dataTransfer.files?.[0]);
            }}
            className="block cursor-pointer rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-4 text-sm text-gray-300 transition-colors hover:border-indigo-400/50 hover:bg-indigo-500/5"
          >
            <div className="font-semibold text-white">
              Encode file to data URL
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Drag and drop a file here, or click to choose a file.
            </p>
            <input
              id="base64-file-input"
              type="file"
              className="hidden"
              onChange={(event) => handleFileEncode(event.target.files?.[0])}
            />
          </label>
          {fileError ? (
            <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
              {fileError}
            </p>
          ) : null}
          {fileDataUrl ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
              File encoded: {fileName || "selected file"}
            </div>
          ) : null}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Encoded output {fileDataUrl ? "(data URL)" : ""}
              </div>
              <div className="flex items-center gap-2">
                {fileDataUrl ? (
                  <button
                    type="button"
                    onClick={() => {
                      setFileDataUrl(null);
                      setFileName(null);
                    }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 hover:bg-white/10"
                  >
                    Use text output
                  </button>
                ) : null}
                <CopyButton text={encoded} label="Copy encoded" />
              </div>
            </div>
            <pre className="mt-2 overflow-x-auto text-xs leading-6 text-gray-100">
              {encoded}
            </pre>
          </div>
        </div>
      </Panel>
    );
  }

  if (result.error) {
    return (
      <Panel
        title="Base64"
        subtitle="Unable to decode input"
        action={
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <button
              type="button"
              className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-indigo-100"
              onClick={() => setMode("decode")}
            >
              Decode
            </button>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300"
              onClick={() => setMode("encode")}
            >
              Encode
            </button>
          </div>
        }
      >
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
  const decodedClass = classifyDecodedValue(result.decoded);
  const encodedLength = input.replace(/\s+/g, "").length;
  const decodedBytes = new TextEncoder().encode(result.decoded).length;
  const overhead =
    decodedBytes > 0 ? Math.round((encodedLength / decodedBytes - 1) * 100) : 0;

  return (
    <div className="space-y-4">
      {result.dataUrlMeta?.isDataUrl ? (
        <Panel
          title="Base64 image preview"
          subtitle={`Rendered directly from the data URL (${result.dataUrlMeta.mimeType})`}
        >
          {result.dataUrlMeta.mimeType.startsWith("image/") ? (
            <img
              src={input}
              alt="Decoded base64 content"
              className="max-w-full rounded-2xl border border-white/10"
            />
          ) : (
            <div className="space-y-2 text-sm text-gray-300">
              <p>Data URL MIME type: {result.dataUrlMeta.mimeType}</p>
              {result.dataUrlMeta.mimeType === "application/pdf" ? (
                <p className="text-amber-200">
                  PDF data detected. Open in a PDF viewer to inspect pages.
                </p>
              ) : null}
            </div>
          )}
        </Panel>
      ) : null}

      <Panel
        title="Decoded output"
        action={
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <button
              type="button"
              className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-indigo-100"
              onClick={() => setMode("decode")}
            >
              Decode
            </button>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300"
              onClick={() => setMode("encode")}
            >
              Encode
            </button>
            <CopyButton text={result.decoded} label="Copy decoded" />
          </div>
        }
      >
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Decoded bytes: {decodedBytes}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Encoded length: {encodedLength}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Overhead: {overhead}%
            </span>
            <Badge
              variant={decodedClass.type === "binary" ? "warning" : "info"}
            >
              {decodedClass.label}
            </Badge>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              JSON: {looksLikeJson ? "likely" : "no"}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              HTML: {looksLikeHtml ? "likely" : "no"}
            </span>
            {decodedClass.type === "json" ? (
              <button
                type="button"
                onClick={() => setShowPrettyJson((current) => !current)}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-100"
              >
                {showPrettyJson ? "Show raw JSON" : "View as JSON"}
              </button>
            ) : null}
          </div>
          {decodedClass.type === "binary" ? (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Hex preview
              </div>
              <pre className="mt-2 max-h-[420px] overflow-auto text-xs leading-6 text-gray-100">
                {formatHexDump(result.decoded)}
              </pre>
            </div>
          ) : (
            <pre className="max-h-[420px] overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
              {decodedClass.type === "json" && showPrettyJson
                ? prettyPrintJson(result.decoded)
                : result.decoded}
            </pre>
          )}
        </div>
      </Panel>
    </div>
  );
}
