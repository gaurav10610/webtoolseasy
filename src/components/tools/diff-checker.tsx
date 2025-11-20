"use client";

import { useState, useCallback, useMemo } from "react";
import { Typography, Card, CardContent } from "@mui/material";
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

export default function DiffChecker({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [language, setLanguage] = useState("javascript");
  
  const [originalText, setOriginalText] = useState(
    `function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item.price;
  }
  return total;
}`
  );

  const [modifiedText, setModifiedText] = useState(
    `function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item.price * item.quantity;
  }
  return total;
}`
  );

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

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

  const diffStats = useMemo(() => {
    const originalLines = originalText.split("\n");
    const modifiedLines = modifiedText.split("\n");

    let added = 0;
    let removed = 0;
    let unchanged = 0;

    const maxLength = Math.max(originalLines.length, modifiedLines.length);

    for (let i = 0; i < maxLength; i++) {
      const origLine = originalLines[i] || "";
      const modLine = modifiedLines[i] || "";

      if (origLine === modLine) {
        unchanged++;
      } else if (!origLine) {
        added++;
      } else if (!modLine) {
        removed++;
      } else {
        // Line modified - count as both added and removed
        added++;
        removed++;
      }
    }

    return { added, removed, unchanged };
  }, [originalText, modifiedText]);

  const generateDiffOutput = useCallback((): string => {
    const originalLines = originalText.split("\n");
    const modifiedLines = modifiedText.split("\n");
    const output: string[] = [];

    output.push("=== DIFF SUMMARY ===");
    output.push(`Lines added: ${diffStats.added}`);
    output.push(`Lines removed: ${diffStats.removed}`);
    output.push(`Lines unchanged: ${diffStats.unchanged}`);
    output.push("\n=== LINE-BY-LINE COMPARISON ===\n");

    const maxLength = Math.max(originalLines.length, modifiedLines.length);

    for (let i = 0; i < maxLength; i++) {
      const origLine = originalLines[i];
      const modLine = modifiedLines[i];

      if (origLine === modLine) {
        output.push(`  ${i + 1}: ${origLine || "(empty)"}`);
      } else if (origLine === undefined) {
        output.push(`+ ${i + 1}: ${modLine}`);
      } else if (modLine === undefined) {
        output.push(`- ${i + 1}: ${origLine}`);
      } else {
        output.push(`- ${i + 1}: ${origLine}`);
        output.push(`+ ${i + 1}: ${modLine}`);
      }
    }

    return output.join("\n");
  }, [originalText, modifiedText, diffStats]);

  const copyDiff = useCallback(() => {
    const diffOutput = generateDiffOutput();
    toolState.actions.copyText(diffOutput, "Diff report copied!");
  }, [generateDiffOutput, toolState.actions]);

  const clearAll = useCallback(() => {
    setOriginalText("");
    setModifiedText("");
    toolState.actions.showMessage("Cleared all text");
  }, [toolState.actions]);

  const diffEditorProps: DiffEditorProps = {
    original: originalText,
    value: modifiedText,
    language: language,
    onChange: setModifiedText,
  };

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
        text: "Copy Diff Report",
        onClick: copyDiff,
      },
      {
        type: "custom" as const,
        text: "Clear All",
        onClick: clearAll,
        color: "error" as const,
      },
      ...createCommonButtons({
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [swapTexts, copyOriginal, copyModified, copyDiff, clearAll, toolState]
  );

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
        title="Free Diff Checker Tool"
        description="Compare two text blocks or code files and see differences highlighted. Perfect for code review, debugging, and document comparison."
        exampleCode="Original text vs Modified text"
        exampleOutput="Visual diff with additions and deletions highlighted"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      {/* Statistics Card */}
      <Card>
        <CardContent>
          <Typography variant="subtitle2" className="font-semibold mb-2">
            Difference Statistics:
          </Typography>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <Typography variant="body2">
                Added: <strong>{diffStats.added}</strong> lines
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <Typography variant="body2">
                Removed: <strong>{diffStats.removed}</strong> lines
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <Typography variant="body2">
                Unchanged: <strong>{diffStats.unchanged}</strong> lines
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      <DiffEditorsWithHeader
        firstTextHeading="Original Text"
        secondTextHeading="Modified Text"
        className="h-[50vh] md:h-[65vh] min-h-[250px] md:min-h-[320px]"
        diffEditorProps={diffEditorProps}
        themeOption="vs-dark"
        editorOptions={{
          readOnly: false,
          renderSideBySide: true,
        }}
      />

      <Card>
        <CardContent>
          <Typography variant="body2" className="text-sm">
            <strong>How to use:</strong> Paste your original text in the left
            panel and modified text in the right panel. The statistics above
            will automatically update to show the number of lines added,
            removed, or unchanged. Click &quot;Copy Diff Report&quot; to get a
            detailed line-by-line comparison.
          </Typography>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
