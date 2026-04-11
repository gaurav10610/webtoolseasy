import React, { memo, useState } from "react";
import { SnackBarWithPosition } from "../lib/snackBar";

interface ToolLayoutProps {
  children: React.ReactNode;
  isFullScreen?: boolean;
  snackBar?: {
    open: boolean;
    message: string;
    onClose: () => void;
    autoHideDuration?: number;
    color?: "success" | "info" | "warning" | "error";
  };
  className?: string;
}

export const ToolLayout = memo(function ToolLayout({
  children,
  isFullScreen = false,
  snackBar,
  className = "",
}: ToolLayoutProps) {
  const [feedback, setFeedback] = useState<"helpful" | "needs-work" | null>(
    null,
  );

  const shortcutItems = [
    { key: "⌘/Ctrl + Enter", label: "Run, generate, or preview" },
    { key: "⌘/Ctrl + S", label: "Format or save where supported" },
    { key: "Esc", label: "Exit fullscreen panels" },
  ] as const;

  return (
    <div
      className={`flex w-full min-h-0 flex-col gap-4 ${
        isFullScreen
          ? "fixed inset-0 z-[1400] h-dvh min-h-dvh overflow-auto overscroll-contain bg-[var(--mui-palette-background-default)] p-4 md:p-6"
          : ""
      } ${className}`}
    >
      {snackBar && (
        <SnackBarWithPosition
          message={snackBar.message}
          open={snackBar.open}
          autoHideDuration={snackBar.autoHideDuration || 2000}
          handleClose={snackBar.onClose}
          color={snackBar.color || "success"}
        />
      )}
      {children}

      <div className="rounded-lg border border-slate-200 bg-slate-50/90 p-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-semibold">Tool feedback & shortcuts</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Quick controls are available on most editors and generators.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {shortcutItems.map((item) => (
                <span
                  key={item.key}
                  className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800"
                >
                  <strong>{item.key}</strong> — {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Was this tool helpful?
            </span>
            <button
              type="button"
              onClick={() => setFeedback("helpful")}
              className={`rounded-md border px-3 py-1 text-xs transition ${
                feedback === "helpful"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800"
              }`}
            >
              👍 Helpful
            </button>
            <button
              type="button"
              onClick={() => setFeedback("needs-work")}
              className={`rounded-md border px-3 py-1 text-xs transition ${
                feedback === "needs-work"
                  ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                  : "border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800"
              }`}
            >
              👎 Needs work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

interface CodeEditorLayoutProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  isFullScreen?: boolean;
  className?: string;
}

export const CodeEditorLayout = memo(function CodeEditorLayout({
  leftPanel,
  rightPanel,
  isFullScreen = false,
  className = "",
}: CodeEditorLayoutProps) {
  const containerHeight = isFullScreen
    ? "flex-1 min-h-[60vh] md:min-h-0"
    : "md:h-[68vh] md:min-h-[420px]";

  return (
    <div
      className={`flex min-h-0 w-full flex-col gap-4 md:flex-row ${containerHeight} ${className}`}
    >
      {leftPanel && (
        <div className="flex min-h-[320px] w-full flex-col md:h-full md:min-h-0 md:w-1/2 md:flex-1">
          {leftPanel}
        </div>
      )}
      {rightPanel && (
        <div className="flex min-h-[320px] w-full flex-col md:h-full md:min-h-0 md:w-1/2 md:flex-1">
          {rightPanel}
        </div>
      )}
    </div>
  );
});

interface SEOContentProps {
  title: string;
  description: string;
  exampleCode?: string;
  exampleOutput?: string;
}

export const SEOContent = memo(function SEOContent({
  title,
  description,
  exampleCode,
  exampleOutput,
}: SEOContentProps) {
  return (
    <>
      {/* SEO-friendly hidden content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h2>{title}</h2>
        <p>{description}</p>
        {exampleCode && (
          <>
            <h3>Example Code</h3>
            <pre>{exampleCode}</pre>
          </>
        )}
        {exampleOutput && (
          <>
            <h3>Example Output</h3>
            <pre>{exampleOutput}</pre>
          </>
        )}
      </div>

      {/* No JavaScript fallback */}
      <noscript>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
          <p className="font-bold text-lg">JavaScript Required</p>
          <p>This tool requires JavaScript to function properly.</p>
          <p>Please enable JavaScript or use a compatible browser.</p>
          {exampleCode && (
            <div className="mt-4">
              <p className="font-semibold">Example Code:</p>
              <pre className="bg-gray-100 p-2 rounded">{exampleCode}</pre>
              {exampleOutput && (
                <>
                  <p className="font-semibold mt-2">Example Output:</p>
                  <pre className="bg-gray-100 p-2 rounded">{exampleOutput}</pre>
                </>
              )}
            </div>
          )}
        </div>
      </noscript>
    </>
  );
});
