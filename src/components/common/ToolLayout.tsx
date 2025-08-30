import React, { memo } from "react";
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
  return (
    <div
      className={`flex flex-col gap-4 w-full ${
        isFullScreen
          ? "p-3 fixed inset-0 z-50 bg-white h-full overflow-auto"
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
    ? "h-full"
    : "md:h-[65vh] md:min-h-[320px]";

  return (
    <div
      className={`flex flex-col w-full md:flex-row gap-4 ${containerHeight} ${className}`}
    >
      {leftPanel && (
        <div className="w-full md:w-1/2 md:flex-1 md:h-full">{leftPanel}</div>
      )}
      {rightPanel && (
        <div className="w-full md:w-1/2 md:flex-1 md:h-full">{rightPanel}</div>
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
