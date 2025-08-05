"use client";

import { useState, useMemo } from "react";
import { DiffEditorsWithHeader } from "../codeEditors";
import { DiffEditorProps } from "../lib/editor";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { useToolState } from "@/hooks/useToolState";

export default function TextCompare() {
  const originalText = `This was original data!
webtoolseasy is awesome
Line 3 of original text
Another line here`;

  const modifiedText = `This was modified data!
webtoolseasy is super cool
Line 3 of original text
Another line here
New line added`;

  const toolState = useToolState({
    hostname: "",
    queryParams: {},
    initialValue: "",
  });

  const [originalValue] = useState(originalText);
  const [modifiedValue] = useState(modifiedText);

  const diffEditorProps: DiffEditorProps = {
    original: originalValue,
    value: modifiedValue,
    language: "text/plain",
  };

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [toolState]
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
        title="Text Compare"
        description="Compare two text documents side by side. Visual diff tool to highlight differences between texts."
        exampleCode={originalText}
        exampleOutput="Side-by-side text comparison with highlighted differences"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div
        className={`w-full h-[20rem] md:h-[30rem] ${
          toolState.isFullScreen ? "md:h-full" : ""
        }`}
      >
        <DiffEditorsWithHeader
          firstTextHeading="Original"
          secondTextHeading="Modified"
          themeOption="light"
          diffEditorProps={diffEditorProps}
          className="w-full h-full"
        />
      </div>
    </ToolLayout>
  );
}
