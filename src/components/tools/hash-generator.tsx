"use client";

import { useCallback, useMemo, useEffect } from "react";
import { Typography } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import ClearIcon from "@mui/icons-material/Clear";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function shaDigest(algorithm: "SHA-1" | "SHA-256", text: string) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  return toHex(hashBuffer);
}

async function md5Digest(text: string) {
  // crypto-js is present in package-lock; import dynamically
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = await import("crypto-js");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CryptoJS = (mod.default || mod) as any;
  return CryptoJS.MD5(text).toString();
}

export default function HashGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const defaultExample = "hello world";

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: defaultExample,
  });

  const computeAll = useCallback(async (): Promise<{
    md5: string;
    sha1: string;
    sha256: string;
  }> => {
    const input = toolState.code || "";
    if (!input) {
      toolState.actions.showMessage("Enter text to compute hashes");
      return { md5: "", sha1: "", sha256: "" };
    }

    // Compute concurrently
    const [md5, sha1, sha256] = await Promise.all([
      md5Digest(input),
      shaDigest("SHA-1", input),
      shaDigest("SHA-256", input),
    ]);

    // Store as a simple combined string in the code viewer's right panel via temporary state in shareable link
    // We'll store results in the snack message for quick feedback and allow copy buttons per-hash below
    toolState.actions.showMessage("Hashes computed!");
    return { md5, sha1, sha256 };
  }, [toolState]);

  const computeAndStore = useCallback(async () => {
    const input = toolState.code || "";
    if (!input) {
      toolState.actions.showMessage("Enter text to compute hashes");
      return;
    }
    const results = await computeAll();
    try {
      sessionStorage.setItem("__hash_results", JSON.stringify(results));
    } catch {}
    toolState.actions.showMessage("Hashes computed");
    return results;
  }, [computeAll, toolState]);

  // On first load, compute hashes for the default example and store results so the right panel shows them
  useEffect(() => {
    (async () => {
      const input = toolState.code || "";
      if (!input) return;
      try {
        const [md5, sha1, sha256] = await Promise.all([
          md5Digest(input),
          shaDigest("SHA-1", input),
          shaDigest("SHA-256", input),
        ]);
        try {
          sessionStorage.setItem(
            "__hash_results",
            JSON.stringify({ md5, sha1, sha256 })
          );
        } catch {}
      } catch {}
    })();
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyText = useCallback(
    (text: string, message?: string) => {
      toolState.actions.copyText(text, message || "Copied to clipboard");
    },
    [toolState.actions]
  );

  const copyAll = useCallback(() => {
    const input = toolState.code || "";
    if (!input) {
      toolState.actions.showMessage("Enter text to compute hashes");
      return;
    }
    (async () => {
      const { md5, sha1, sha256 } = await computeAll();
      const combined = `MD5: ${md5}\nSHA-1: ${sha1}\nSHA-256: ${sha256}`;
      toolState.actions.copyText(combined, "All hashes copied to clipboard");
    })();
  }, [computeAll, toolState.actions, toolState.code]);

  const downloadHashes = useCallback(async () => {
    const input = toolState.code || "";
    if (!input) {
      toolState.actions.showMessage("Enter text to compute hashes");
      return;
    }
    const { md5, sha1, sha256 } = await computeAll();
    const content = `Input:\n${input}\n\nMD5: ${md5}\nSHA-1: ${sha1}\nSHA-256: ${sha256}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hashes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Hashes downloaded");
  }, [computeAll, toolState.actions, toolState.code]);

  const buttons = useMemo(() => {
    const custom = [
      {
        type: "custom" as const,
        text: "Compute Hashes",
        onClick: computeAndStore,
        icon: <CalculateIcon />,
        variant: "contained" as const,
      },
      {
        type: "custom" as const,
        text: "Clear",
        onClick: () => toolState.setCode(""),
        icon: <ClearIcon />,
        variant: "outlined" as const,
        color: "error" as const,
      },
    ];

    return [
      ...custom,
      ...createCommonButtons({
        onCopy: copyAll,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
        onDownload: downloadHashes,
      }),
    ];
  }, [copyAll, toolState, downloadHashes, computeAndStore]);

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Hash Generator"
        description="Generate MD5, SHA-1 and SHA-256 hashes for any text. Copy or download results quickly in your browser."
        exampleCode="hello world"
        exampleOutput="MD5: 5eb63bbbe01eeed093cb22bb8f5acdc3"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SingleCodeEditorWithHeaderV2
            editorHeading="Input Text"
            themeOption="vs-dark"
            codeEditorProps={{
              language: "text",
              value: toolState.code,
              onChange: (v) => toolState.setCode(v),
              className: "h-[60vh] min-h-[200px]",
            }}
          />
          {/* Buttons moved to ToolControls toolbar */}
        </div>

        <div>
          <Typography variant="h6" className="mb-3">
            Hash Results
          </Typography>
          <div className="space-y-3">
            {(() => {
              // Read cached results from sessionStorage
              try {
                const raw = sessionStorage.getItem("__hash_results");
                if (!raw) {
                  return (
                    <div className="p-4 bg-gray-50 border rounded text-gray-600">
                      No hashes computed yet. Click &quot;Compute Hashes&quot;
                      to generate.
                    </div>
                  );
                }
                const parsed = JSON.parse(raw);
                return (
                  <div className="space-y-2">
                    <div className="p-3 border rounded bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-mono text-sm">MD5</div>
                        <div className="flex gap-2">
                          <button
                            className="text-sm text-blue-600"
                            onClick={() => copyText(parsed.md5, "MD5 copied")}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <div className="font-mono break-all text-sm">
                        {parsed.md5}
                      </div>
                    </div>

                    <div className="p-3 border rounded bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-mono text-sm">SHA-1</div>
                        <div className="flex gap-2">
                          <button
                            className="text-sm text-blue-600"
                            onClick={() =>
                              copyText(parsed.sha1, "SHA-1 copied")
                            }
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <div className="font-mono break-all text-sm">
                        {parsed.sha1}
                      </div>
                    </div>

                    <div className="p-3 border rounded bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-mono text-sm">SHA-256</div>
                        <div className="flex gap-2">
                          <button
                            className="text-sm text-blue-600"
                            onClick={() =>
                              copyText(parsed.sha256, "SHA-256 copied")
                            }
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <div className="font-mono break-all text-sm">
                        {parsed.sha256}
                      </div>
                    </div>
                  </div>
                );
              } catch {
                return (
                  <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
                    Error reading hash results
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
