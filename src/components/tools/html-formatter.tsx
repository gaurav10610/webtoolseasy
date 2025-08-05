"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { html_beautify } from "js-beautify";

export default function HtmlFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `<html><head><title>Online HTML Formatter</title></head><body><p>webtoolseasy is awesome!</p></body></html>`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [formattedCode, setFormattedCode] = useState(() => {
    try {
      return html_beautify(toolState.code);
    } catch {
      return "";
    }
  });

  const formatHtml = useCallback(() => {
    try {
      const formatted = html_beautify(toolState.code);
      setFormattedCode(formatted);
      toolState.actions.showMessage("HTML formatted successfully!");
    } catch (error) {
      toolState.actions.showMessage(`Error: ${error}`);
      setFormattedCode("Invalid HTML");
    }
  }, [toolState]);

  const copyFormattedCode = useCallback(() => {
    toolState.actions.copyText(formattedCode, "Formatted HTML copied!");
  }, [toolState.actions, formattedCode]);

  // Editor configurations
  const inputEditorProps = useEditorConfig({
    language: "html",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  const outputEditorProps = useEditorConfig({
    language: "html",
    value: formattedCode,
    onChange: () => {}, // Read-only
    readOnly: true,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onFormat: formatHtml,
        onCopy: copyFormattedCode,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [formatHtml, copyFormattedCode, toolState]
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
        title="HTML Formatter"
        description="Free online HTML formatter and beautifier. Format and prettify HTML code with proper indentation."
        exampleCode={initialValue}
        exampleOutput={html_beautify(initialValue)}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={inputEditorProps}
            themeOption="vs-dark"
            editorHeading="Raw HTML"
            className="w-full h-full"
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={outputEditorProps}
            themeOption="vs-dark"
            editorHeading="Formatted HTML"
            className="w-full h-full"
          />
        }
      />
    </ToolLayout>
  );
}
