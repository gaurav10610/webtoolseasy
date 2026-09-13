"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout } from "../common/ToolLayout";

type ConverterTab = "text" | "file-to-base64" | "base64-to-file";
type TextDirection = "encode" | "decode";

// Safe UTF-8 Base64 encoding
function utf8ToBase64(str: string, urlSafe = false): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  let base64 = btoa(binary);
  if (urlSafe) {
    base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return base64;
}

// Safe UTF-8 Base64 decoding
function base64ToUtf8(str: string): string {
  // Strip whitespace and line breaks
  let cleaned = str.trim().replace(/\s+/g, "");
  // Remove data URI prefix if present
  if (cleaned.startsWith("data:")) {
    const commaIdx = cleaned.indexOf(",");
    if (commaIdx !== -1) {
      cleaned = cleaned.slice(commaIdx + 1);
    }
  }
  // Convert URL-safe to standard
  let standard = cleaned.replace(/-/g, "+").replace(/_/g, "/");
  while (standard.length % 4 !== 0) {
    standard += "=";
  }
  const binary = atob(standard);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

// Detect MIME type and extension from base64 string
function detectMimeType(base64Str: string): { mimeType: string; extension: string } {
  const cleaned = base64Str.trim();
  if (cleaned.startsWith("data:")) {
    const match = cleaned.match(/^data:([^;]+);base64,/);
    if (match) {
      const mime = match[1];
      const ext = mime.split("/")[1]?.replace(/\+xml$/, "") || "bin";
      return { mimeType: mime, extension: ext };
    }
  }

  // Check magic bytes signatures in base64 prefix
  const raw = cleaned.slice(0, 60);
  if (raw.startsWith("iVBORw0KGgo")) return { mimeType: "image/png", extension: "png" };
  if (raw.startsWith("/9j/")) return { mimeType: "image/jpeg", extension: "jpg" };
  if (raw.startsWith("R0lGOD")) return { mimeType: "image/gif", extension: "gif" };
  if (raw.startsWith("JVBERi0")) return { mimeType: "application/pdf", extension: "pdf" };
  if (raw.startsWith("UklGR")) return { mimeType: "image/webp", extension: "webp" };
  if (raw.startsWith("PHN2Zy") || raw.startsWith("PD94bW")) return { mimeType: "image/svg+xml", extension: "svg" };
  if (raw.startsWith("UEsDB")) return { mimeType: "application/zip", extension: "zip" };
  if (raw.startsWith("T2dnUw")) return { mimeType: "audio/ogg", extension: "ogg" };
  if (raw.startsWith("AAAAIGZ0eX")) return { mimeType: "video/mp4", extension: "mp4" };

  return { mimeType: "application/octet-stream", extension: "bin" };
}

function base64ToBlob(base64Data: string, mimeType: string): Blob {
  let cleaned = base64Data.trim();
  if (cleaned.startsWith("data:")) {
    const commaIdx = cleaned.indexOf(",");
    if (commaIdx !== -1) {
      cleaned = cleaned.slice(commaIdx + 1);
    }
  }
  let standard = cleaned.replace(/-/g, "+").replace(/_/g, "/");
  while (standard.length % 4 !== 0) {
    standard += "=";
  }
  const byteCharacters = atob(standard);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export default function Base64Encode({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialMode = queryParams?.mode === "decode" ? "decode" : "encode";
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [activeTab, setActiveTab] = useState<ConverterTab>("text");
  
  // Text Mode State
  const [textDirection, setTextDirection] = useState<TextDirection>(initialMode);
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [liveConversion, setLiveConversion] = useState(true);
  const [textError, setTextError] = useState("");

  // File to Base64 State
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: number;
    type: string;
    dataUrl: string;
    rawBase64: string;
  } | null>(null);
  const [fileOutputFormat, setFileOutputFormat] = useState<"dataUri" | "raw" | "img" | "css">("dataUri");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Base64 to File State
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeError, setDecodeError] = useState("");
  const [decodedBlobInfo, setDecodedBlobInfo] = useState<{
    blob: Blob;
    mimeType: string;
    extension: string;
    size: number;
    previewUrl?: string;
  } | null>(null);

  // Conversion logic for text
  const performTextConversion = useCallback(
    (input: string, direction: TextDirection, isUrlSafe: boolean) => {
      if (!input.trim()) {
        setTextOutput("");
        setTextError("");
        return;
      }
      try {
        if (direction === "encode") {
          const encoded = utf8ToBase64(input, isUrlSafe);
          setTextOutput(encoded);
          setTextError("");
        } else {
          const decoded = base64ToUtf8(input);
          setTextOutput(decoded);
          setTextError("");
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Invalid Base64 format";
        setTextError(direction === "decode" ? `Decoding error: ${msg}. Check input formatting.` : `Encoding error: ${msg}`);
      }
    },
    [],
  );

  // Live conversion listener
  useEffect(() => {
    if (liveConversion) {
      performTextConversion(textInput, textDirection, urlSafe);
    }
  }, [textInput, textDirection, urlSafe, liveConversion, performTextConversion]);

  // Swap direction and swap input/output text
  const handleSwap = useCallback(() => {
    const nextDirection = textDirection === "encode" ? "decode" : "encode";
    setTextDirection(nextDirection);
    const prevOutput = textOutput;
    setTextInput(prevOutput);
    performTextConversion(prevOutput, nextDirection, urlSafe);
    toolState.actions.showMessage(`Swapped to ${nextDirection === "encode" ? "Encode" : "Decode"} mode`);
  }, [textDirection, textOutput, urlSafe, performTextConversion, toolState.actions]);

  // Handle File Selection
  const handleFile = useCallback((file: File) => {
    if (file.size > 25 * 1024 * 1024) {
      toolState.actions.showMessage("File size exceeds 25MB browser memory limit");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const commaIdx = dataUrl.indexOf(",");
      const rawBase64 = commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : "";
      setSelectedFile({
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        dataUrl,
        rawBase64,
      });
      toolState.actions.showMessage(`Encoded "${file.name}" (${(file.size / 1024).toFixed(1)} KB)`);
    };
    reader.onerror = () => {
      toolState.actions.showMessage("Failed to read file");
    };
    reader.readAsDataURL(file);
  }, [toolState.actions]);

  const handleDragDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile],
  );

  // Decode Base64 to File
  const handleDecodeToFile = useCallback((input: string) => {
    if (!input.trim()) {
      setDecodedBlobInfo(null);
      setDecodeError("");
      return;
    }
    try {
      const { mimeType, extension } = detectMimeType(input);
      const blob = base64ToBlob(input, mimeType);
      let previewUrl: string | undefined;
      if (mimeType.startsWith("image/")) {
        previewUrl = URL.createObjectURL(blob);
      }
      setDecodedBlobInfo({
        blob,
        mimeType,
        extension,
        size: blob.size,
        previewUrl,
      });
      setDecodeError("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid Base64 sequence";
      setDecodeError(`Failed to decode binary: ${msg}`);
      setDecodedBlobInfo(null);
    }
  }, []);

  const handleDownloadDecodedFile = useCallback(() => {
    if (!decodedBlobInfo) return;
    const url = URL.createObjectURL(decodedBlobInfo.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `decoded_file.${decodedBlobInfo.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage(`Downloading decoded_file.${decodedBlobInfo.extension}`);
  }, [decodedBlobInfo, toolState.actions]);

  // Compute file export text
  const fileExportSnippet = useMemo(() => {
    if (!selectedFile) return "";
    switch (fileOutputFormat) {
      case "raw":
        return selectedFile.rawBase64;
      case "img":
        return `<img src="${selectedFile.dataUrl}" alt="${selectedFile.name}" />`;
      case "css":
        return `background-image: url("${selectedFile.dataUrl}");`;
      case "dataUri":
      default:
        return selectedFile.dataUrl;
    }
  }, [selectedFile, fileOutputFormat]);

  // Samples
  const loadSample = useCallback((type: "simple" | "json" | "url") => {
    let sample = "";
    if (type === "simple") {
      sample = "Hello, World! 🚀 Instant, ultra-fast client-side utilities on WebToolsEasy.";
    } else if (type === "json") {
      sample = JSON.stringify({ app: "webtoolseasy", secure: true, timestamp: Date.now() }, null, 2);
    } else {
      sample = "https://webtoolseasy.com/tools/base64-encode?query=developer-utilities";
    }
    setTextDirection("encode");
    setTextInput(sample);
    performTextConversion(sample, "encode", urlSafe);
    toolState.actions.showMessage("Loaded sample text!");
  }, [urlSafe, performTextConversion, toolState.actions]);

  // Metrics
  const inputByteLength = useMemo(() => new TextEncoder().encode(textInput).length, [textInput]);
  const outputByteLength = useMemo(() => new TextEncoder().encode(textOutput).length, [textOutput]);

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <div className="flex flex-col w-full gap-5">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl">
            <button
              onClick={() => setActiveTab("text")}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === "text"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              📝 Text Converter
            </button>
            <button
              onClick={() => setActiveTab("file-to-base64")}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === "file-to-base64"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              📁 File to Base64
            </button>
            <button
              onClick={() => setActiveTab("base64-to-file")}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === "base64-to-file"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              💾 Base64 to File
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-800/50">
              🔒 100% Client-Side Private
            </span>
          </div>
        </div>

        {/* TAB 1: TEXT CONVERTER */}
        {activeTab === "text" && (
          <div className="flex flex-col gap-5">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-lg border border-neutral-200 dark:border-neutral-700 p-0.5 bg-neutral-50 dark:bg-neutral-800">
                  <button
                    onClick={() => {
                      setTextDirection("encode");
                      performTextConversion(textInput, "encode", urlSafe);
                    }}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      textDirection === "encode"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900"
                    }`}
                  >
                    Encode (Text → Base64)
                  </button>
                  <button
                    onClick={() => {
                      setTextDirection("decode");
                      performTextConversion(textInput, "decode", urlSafe);
                    }}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      textDirection === "decode"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900"
                    }`}
                  >
                    Decode (Base64 → Text)
                  </button>
                </div>

                <button
                  onClick={handleSwap}
                  title="Swap Input and Output"
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  Swap
                </button>
              </div>

              {/* Options & Samples */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={urlSafe}
                    onChange={(e) => setUrlSafe(e.target.checked)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>URL-Safe (- and _)</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={liveConversion}
                    onChange={(e) => setLiveConversion(e.target.checked)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Live sync</span>
                </label>

                <div className="flex items-center gap-1 pl-2 border-l border-neutral-200 dark:border-neutral-700">
                  <span className="text-[11px] text-neutral-400 font-medium">Samples:</span>
                  <button
                    onClick={() => loadSample("simple")}
                    className="text-[11px] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded hover:bg-neutral-200"
                  >
                    Text
                  </button>
                  <button
                    onClick={() => loadSample("json")}
                    className="text-[11px] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded hover:bg-neutral-200"
                  >
                    JSON
                  </button>
                </div>
              </div>
            </div>

            {/* Editor Panes: 2-column on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Input Box */}
              <div className="flex flex-col gap-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {textDirection === "encode" ? "Source Text (UTF-8)" : "Base64 Input"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={async () => {
                        try {
                          const clip = await navigator.clipboard.readText();
                          setTextInput(clip);
                          performTextConversion(clip, textDirection, urlSafe);
                          toolState.actions.showMessage("Pasted from clipboard");
                        } catch {
                          toolState.actions.showMessage("Clipboard permission denied");
                        }
                      }}
                      className="px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                    >
                      Paste
                    </button>
                    {textInput && (
                      <button
                        onClick={() => {
                          setTextInput("");
                          setTextOutput("");
                          setTextError("");
                        }}
                        className="px-2 py-0.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={
                    textDirection === "encode"
                      ? "Type or paste raw text, JSON, or code to encode into Base64..."
                      : "Paste Base64 string or Data URI to decode back to plain text..."
                  }
                  rows={10}
                  className="w-full p-3 font-mono text-xs md:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />

                <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
                  <span>
                    Chars: <strong>{textInput.length.toLocaleString()}</strong> | Bytes: <strong>{inputByteLength.toLocaleString()}</strong>
                  </span>
                  {!liveConversion && (
                    <button
                      onClick={() => performTextConversion(textInput, textDirection, urlSafe)}
                      className="px-3 py-1 bg-blue-600 text-white rounded font-medium text-xs hover:bg-blue-700"
                    >
                      Convert Now
                    </button>
                  )}
                </div>
              </div>

              {/* Output Box */}
              <div className="flex flex-col gap-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {textDirection === "encode" ? "Base64 Result" : "Decoded Plain Text"}
                  </span>
                  <div className="flex items-center gap-1">
                    {textOutput && (
                      <>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(textOutput);
                            toolState.actions.showMessage("Copied to clipboard!");
                          }}
                          className="px-2 py-0.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-medium rounded"
                        >
                          Copy Result
                        </button>
                        <button
                          onClick={() => {
                            const blob = new Blob([textOutput], { type: "text/plain;charset=utf-8" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = textDirection === "encode" ? "encoded_base64.txt" : "decoded_text.txt";
                            a.click();
                            URL.revokeObjectURL(url);
                            toolState.actions.showMessage("Downloaded file");
                          }}
                          className="px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                        >
                          Download .txt
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {textError ? (
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-lg text-red-700 dark:text-red-300 text-xs font-mono">
                    ⚠️ {textError}
                  </div>
                ) : (
                  <textarea
                    readOnly
                    value={textOutput}
                    placeholder="Result will appear here automatically..."
                    rows={10}
                    className="w-full p-3 font-mono text-xs md:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none resize-y text-neutral-800 dark:text-neutral-200"
                  />
                )}

                <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
                  <span>
                    Chars: <strong>{textOutput.length.toLocaleString()}</strong> | Bytes: <strong>{outputByteLength.toLocaleString()}</strong>
                  </span>
                  {textInput && textOutput && textDirection === "encode" && (
                    <span className="text-neutral-400">
                      Ratio: {((outputByteLength / (inputByteLength || 1)) * 100).toFixed(0)}% (+33% standard Base64 overhead)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FILE TO BASE64 */}
        {activeTab === "file-to-base64" && (
          <div className="flex flex-col gap-5">
            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDragDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                isDragOver
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 scale-[0.99]"
                  : "border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-600"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />
              <div className="w-12 h-12 mb-3 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Drag & drop any file here, or <span className="text-blue-600 dark:text-blue-400 underline">browse</span>
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Supports PNG, JPG, SVG, WebP, PDF, Audio, Video, Fonts up to 25MB (100% private in-browser)
              </p>
            </div>

            {selectedFile && (
              <div className="flex flex-col gap-4 p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
                {/* File summary bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs uppercase text-neutral-600 dark:text-neutral-300">
                      {selectedFile.type.split("/")[1]?.slice(0, 4) || "FILE"}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {selectedFile.name}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type}
                      </p>
                    </div>
                  </div>

                  {/* Format Switcher */}
                  <div className="inline-flex rounded-lg border border-neutral-200 dark:border-neutral-700 p-0.5 bg-neutral-50 dark:bg-neutral-800">
                    <button
                      onClick={() => setFileOutputFormat("dataUri")}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                        fileOutputFormat === "dataUri"
                          ? "bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-xs font-semibold"
                          : "text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      Data URI
                    </button>
                    <button
                      onClick={() => setFileOutputFormat("raw")}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                        fileOutputFormat === "raw"
                          ? "bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-xs font-semibold"
                          : "text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      Raw Base64
                    </button>
                    <button
                      onClick={() => setFileOutputFormat("img")}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                        fileOutputFormat === "img"
                          ? "bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-xs font-semibold"
                          : "text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      HTML &lt;img&gt;
                    </button>
                    <button
                      onClick={() => setFileOutputFormat("css")}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                        fileOutputFormat === "css"
                          ? "bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-xs font-semibold"
                          : "text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      CSS url()
                    </button>
                  </div>
                </div>

                {/* Preview if image */}
                {selectedFile.type.startsWith("image/") && (
                  <div className="flex items-center gap-4 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedFile.dataUrl}
                      alt={selectedFile.name}
                      className="max-h-24 max-w-32 object-contain rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                    />
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">Image Preview</p>
                      <p>Successfully serialized into Base64 payload.</p>
                    </div>
                  </div>
                )}

                {/* Output Snippet */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                      Encoded Output ({fileExportSnippet.length.toLocaleString()} characters)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(fileExportSnippet);
                          toolState.actions.showMessage("Base64 string copied!");
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium shadow-xs"
                      >
                        Copy {fileOutputFormat === "dataUri" ? "Data URI" : "Snippet"}
                      </button>
                      <button
                        onClick={() => {
                          const blob = new Blob([fileExportSnippet], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${selectedFile.name}.base64.txt`;
                          a.click();
                          URL.revokeObjectURL(url);
                          toolState.actions.showMessage("Downloaded base64 text file");
                        }}
                        className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 rounded text-xs font-medium"
                      >
                        Download .txt
                      </button>
                    </div>
                  </div>
                  <textarea
                    readOnly
                    value={fileExportSnippet}
                    rows={6}
                    className="w-full p-3 font-mono text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none resize-y"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BASE64 TO FILE */}
        {activeTab === "base64-to-file" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Paste Base64 or Data URI
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      try {
                        const clip = await navigator.clipboard.readText();
                        setDecodeInput(clip);
                        handleDecodeToFile(clip);
                        toolState.actions.showMessage("Pasted base64 from clipboard");
                      } catch {
                        toolState.actions.showMessage("Clipboard read failed");
                      }
                    }}
                    className="px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                  >
                    Paste
                  </button>
                  {decodeInput && (
                    <button
                      onClick={() => {
                        setDecodeInput("");
                        setDecodedBlobInfo(null);
                        setDecodeError("");
                      }}
                      className="px-2 py-0.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <textarea
                value={decodeInput}
                onChange={(e) => {
                  setDecodeInput(e.target.value);
                  handleDecodeToFile(e.target.value);
                }}
                rows={8}
                placeholder="Paste data:image/png;base64,... or raw base64 string here to convert into a real downloadable file..."
                className="w-full p-3 font-mono text-xs md:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />

              {decodeError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-lg text-red-700 dark:text-red-300 text-xs font-mono">
                  ⚠️ {decodeError}
                </div>
              )}

              {decodedBlobInfo && (
                <div className="mt-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {decodedBlobInfo.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={decodedBlobInfo.previewUrl}
                        alt="Decoded preview"
                        className="w-16 h-16 object-contain rounded-lg border border-emerald-200 dark:border-emerald-700 bg-white"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center font-bold text-xs uppercase text-emerald-800 dark:text-emerald-300">
                        .{decodedBlobInfo.extension}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                        Decoded File Ready
                      </h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400">
                        Detected MIME: <strong>{decodedBlobInfo.mimeType}</strong> • Size:{" "}
                        <strong>{(decodedBlobInfo.size / 1024).toFixed(1)} KB</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadDecodedFile}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-semibold rounded-lg shadow-sm transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download decoded_file.{decodedBlobInfo.extension}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
