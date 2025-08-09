"use client";

import { useState, useCallback, useMemo } from "react";
import { js_beautify } from "js-beautify";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function JavaScriptFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `/**
 * Paste your javascript code here
 */
if (value === 'webtoolseasy') {
    formatJS();
} else {
    console.log('this is awesome');
}`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [formattedCode, setFormattedCode] = useState(() => {
    try {
      return js_beautify(toolState.code);
    } catch {
      return "";
    }
  });

  const formatJs = useCallback(() => {
    try {
      const formatted = js_beautify(toolState.code);
      setFormattedCode(formatted);
      toolState.actions.showMessage("JavaScript formatted successfully!");
    } catch (error) {
      toolState.actions.showMessage(`Error: ${error}`);
      setFormattedCode("Invalid JavaScript");
    }
  }, [toolState]);

  const copyFormattedCode = useCallback(() => {
    toolState.actions.copyText(formattedCode, "Formatted JavaScript copied!");
  }, [toolState.actions, formattedCode]);

  const downloadFormattedCode = useCallback(() => {
    const blob = new Blob([formattedCode], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-script.js";
    a.click();
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Formatted JavaScript downloaded!");
  }, [formattedCode, toolState.actions]);

  // Editor configurations
  const inputEditorProps = useEditorConfig({
    language: "javascript",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  const outputEditorProps = useEditorConfig({
    language: "javascript",
    value: formattedCode,
    onChange: () => {}, // Read-only
    readOnly: true,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onFormat: formatJs,
        onCopy: copyFormattedCode,
        onDownload: downloadFormattedCode,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [formatJs, copyFormattedCode, downloadFormattedCode, toolState]
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
        title="JavaScript Formatter"
        description="Free online JavaScript formatter and beautifier. Format and prettify JavaScript code with proper indentation."
        exampleCode={initialValue}
        exampleOutput={js_beautify(initialValue)}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={inputEditorProps}
            themeOption="vs-dark"
            editorHeading="Raw JavaScript"
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={outputEditorProps}
            themeOption="vs-dark"
            editorHeading="Formatted JavaScript"
          />
        }
      />
    </ToolLayout>
  );
}
