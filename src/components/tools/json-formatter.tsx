"use client";

import { useState, useCallback, useMemo } from "react";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function JsonFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `{"name":"John Doe","age":30,"city":"New York","skills":["JavaScript","React","Node.js"],"isActive":true}`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [formattedCode, setFormattedCode] = useState(() => {
    try {
      return JSON.stringify(JSON.parse(toolState.code), null, 2);
    } catch {
      return "";
    }
  });

  const formatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(toolState.code);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedCode(formatted);
      toolState.actions.showMessage("JSON formatted successfully!");
    } catch {
      toolState.actions.showMessage("Invalid JSON format");
      setFormattedCode("Invalid JSON");
    }
  }, [toolState]);

  const copyFormattedCode = useCallback(() => {
    toolState.actions.copyText(
      formattedCode,
      "Formatted JSON copied to clipboard!"
    );
  }, [formattedCode, toolState.actions]);

  const downloadFormattedCode = useCallback(() => {
    const blob = new Blob([formattedCode], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("JSON file downloaded successfully!");
  }, [formattedCode, toolState.actions]);

  const minifyJson = useCallback(() => {
    try {
      const parsed = JSON.parse(toolState.code);
      const minified = JSON.stringify(parsed);
      setFormattedCode(minified);
      toolState.actions.showMessage("JSON minified successfully!");
    } catch {
      toolState.actions.showMessage("Invalid JSON format");
      setFormattedCode("Invalid JSON");
    }
  }, [toolState]);

  // Editor configurations
  const rawEditorProps = useEditorConfig({
    language: "json",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  const formattedEditorProps = useEditorConfig({
    language: "json",
    value: formattedCode,
    onChange: () => {}, // Read-only
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Format JSON",
        onClick: formatJson,
        icon: <FormatAlignCenterIcon />,
      },
      {
        type: "custom" as const,
        text: "Minify JSON",
        onClick: minifyJson,
      },
      {
        type: "custom" as const,
        text: "Copy Formatted",
        onClick: copyFormattedCode,
      },
      {
        type: "custom" as const,
        text: "Download Formatted",
        onClick: downloadFormattedCode,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "Raw JSON copied to clipboard!"
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [
      formatJson,
      minifyJson,
      copyFormattedCode,
      downloadFormattedCode,
      toolState,
    ]
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
        title="JSON Formatter"
        description="Free online JSON formatter, validator and beautifier. Format, validate and beautify your JSON data with proper indentation."
        exampleCode={initialValue}
        exampleOutput={JSON.stringify(JSON.parse(initialValue), null, 2)}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={rawEditorProps}
            themeOption="vs-dark"
            editorHeading="Raw JSON"
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={formattedEditorProps}
            themeOption="vs-dark"
            editorHeading="Formatted JSON"
          />
        }
      />
    </ToolLayout>
  );
}
