"use client";

import { useState, useMemo, useCallback } from "react";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import dynamic from "next/dynamic";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { DiffEditorProps } from "../lib/editor";

// Lazy load the DiffEditorsWithHeader component to avoid Monaco issues
const DiffEditorsWithHeader = dynamic(
  () =>
    import("../codeEditors").then((mod) => ({
      default: mod.DiffEditorsWithHeader,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[50vh] md:h-[65vh] min-h-[250px] md:min-h-[320px] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading diff editor...</div>
      </div>
    ),
  }
);

export default function TextCompare({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const originalInitialText = `This was original data!
webtoolseasy is awesome
Line 3 of original text
Another line here`;

  const modifiedInitialText = `This was modified data!
webtoolseasy is super cool
Line 3 of original text
Another line here
New line added`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: originalInitialText,
  });

  const [originalText, setOriginalText] = useState(originalInitialText);
  const [modifiedText, setModifiedText] = useState(modifiedInitialText);

  const swapTexts = useCallback(() => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
    toolState.actions.showMessage("Texts swapped!");
  }, [originalText, modifiedText, toolState.actions]);

  const copyOriginal = useCallback(() => {
    toolState.actions.copyText(
      originalText,
      "Original text copied to clipboard!"
    );
  }, [originalText, toolState.actions]);

  const copyModified = useCallback(() => {
    toolState.actions.copyText(
      modifiedText,
      "Modified text copied to clipboard!"
    );
  }, [modifiedText, toolState.actions]);

  const clearTexts = useCallback(() => {
    setOriginalText("");
    setModifiedText("");
    toolState.actions.showMessage("Both texts cleared!");
  }, [toolState.actions]);

  const diffEditorProps: DiffEditorProps = {
    original: originalText,
    value: modifiedText,
    language: "plaintext",
    onChange: setModifiedText,
  };

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Swap Texts",
        onClick: swapTexts,
        icon: <CompareArrowsIcon />,
      },
      {
        type: "custom" as const,
        text: "Copy Original",
        onClick: copyOriginal,
      },
      {
        type: "custom" as const,
        text: "Copy Modified",
        onClick: copyModified,
      },
      {
        type: "custom" as const,
        text: "Clear All",
        onClick: clearTexts,
      },
      ...createCommonButtons({
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [swapTexts, copyOriginal, copyModified, clearTexts, toolState]
  );

  // Calculate diff statistics
  const diffStats = useMemo(() => {
    const originalLines = originalText.split("\n");
    const modifiedLines = modifiedText.split("\n");

    return {
      originalChars: originalText.length,
      modifiedChars: modifiedText.length,
      originalLines: originalLines.length,
      modifiedLines: modifiedLines.length,
      charDifference: modifiedText.length - originalText.length,
      lineDifference: modifiedLines.length - originalLines.length,
    };
  }, [originalText, modifiedText]);

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
        title="Text Compare Tool"
        description="Free online text comparison tool. Compare two text documents side by side with highlighted differences and detailed statistics."
        exampleCode={originalInitialText}
        exampleOutput="Side-by-side text comparison with highlighted differences"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Text Compare Editor - takes 3/4 of the width */}
        <div className="lg:col-span-3">
          <DiffEditorsWithHeader
            firstTextHeading="Original Text"
            secondTextHeading="Modified Text"
            themeOption="light"
            diffEditorProps={diffEditorProps}
            className={`w-full h-[50vh] md:h-[65vh] min-h-[250px] md:min-h-[320px] ${
              toolState.isFullScreen ? "md:h-full" : ""
            }`}
          />
        </div>

        {/* Statistics Panel - takes 1/4 of the width */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <h3 className="font-semibold mb-3 text-gray-800">
              📊 Comparison Stats
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Original chars:</span>
                <span className="font-medium">
                  {diffStats.originalChars.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Modified chars:</span>
                <span className="font-medium">
                  {diffStats.modifiedChars.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Char difference:</span>
                <span
                  className={`font-medium ${
                    diffStats.charDifference >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {diffStats.charDifference >= 0 ? "+" : ""}
                  {diffStats.charDifference}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Original lines:</span>
                <span className="font-medium">{diffStats.originalLines}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Modified lines:</span>
                <span className="font-medium">{diffStats.modifiedLines}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Line difference:</span>
                <span
                  className={`font-medium ${
                    diffStats.lineDifference >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {diffStats.lineDifference >= 0 ? "+" : ""}
                  {diffStats.lineDifference}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold mb-2 text-blue-800">💡 Tips</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• Paste text directly into either panel</div>
              <div>• Differences are highlighted automatically</div>
              <div>• Use Swap to reverse comparison</div>
              <div>• Copy individual text versions</div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold mb-2 text-green-800">🎯 Use Cases</h3>
            <div className="text-sm text-green-700 space-y-1">
              <div>• Code comparison</div>
              <div>• Document review</div>
              <div>• Content editing</div>
              <div>• Data analysis</div>
              <div>• Version control</div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
