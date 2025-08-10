"use client";

import { useCallback, useMemo } from "react";
import { js_beautify } from "js-beautify";
import { ContentCopy } from "@mui/icons-material";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
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

  const formattedCode = useMemo(() => {
    if (!toolState.code.trim()) return "";
    try {
      return js_beautify(toolState.code);
    } catch {
      return "";
    }
  }, [toolState.code]);

  const formatCode = useCallback(() => {
    try {
      js_beautify(toolState.code); // Validate the JavaScript
      toolState.actions.showMessage("JavaScript formatted successfully!");
    } catch (error) {
      toolState.actions.showMessage(`Error: ${error}`);
    }
  }, [toolState]);

  const copyFormattedCode = useCallback(() => {
    toolState.actions.copyText(formattedCode, "Formatted JavaScript copied!");
  }, [toolState.actions, formattedCode]);

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
      {
        type: "custom" as const,
        text: "Format Code",
        onClick: formatCode,
        icon: <FormatAlignCenterIcon />,
        variant: "contained" as const,
      },
      {
        type: "custom" as const,
        text: "Copy Formatted",
        onClick: copyFormattedCode,
        disabled: !formattedCode,
        icon: <ContentCopy />,
      },
      ...createCommonButtons({
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [formatCode, copyFormattedCode, formattedCode, toolState]
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
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={outputEditorProps}
            themeOption="vs-dark"
            editorHeading="Formatted JavaScript"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
      />
    </ToolLayout>
  );
}
