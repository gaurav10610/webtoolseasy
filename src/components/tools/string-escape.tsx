"use client";

import { useCallback, useMemo, useState } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import CloseIcon from "@mui/icons-material/Close";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

function escapeJs(input: string) {
  return input
    .replace(/\\/g, "\\\\")
    .replace(/\"/g, '\\"')
    .replace(/\'/g, "\\'")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

function unescapeJs(input: string) {
  try {
    return JSON.parse('"' + input.replace(/"/g, '\\"') + '"');
  } catch {
    // Fallback: common sequences
    return input
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
}

export default function StringEscape({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `{"name":"John","age":30,"message":"Hello\\nWorld","tags":["example","test"]}`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });
  const [output, setOutput] = useState<string>(() => {
    try {
      return unescapeJs(initialValue);
    } catch {
      return "";
    }
  });

  const rawEditorProps = useEditorConfig({
    language: "text",
    value: toolState.code,
    onChange: toolState.setCode,
  });
  const outEditorProps = useEditorConfig({
    language: "text",
    value: output,
    onChange: setOutput,
  });

  const doEscapeJs = useCallback(() => {
    const res = escapeJs(toolState.code || "");
    setOutput(res);
    toolState.actions.showMessage("JS escaped");
  }, [toolState]);

  const doUnescapeJs = useCallback(() => {
    const res = unescapeJs(toolState.code || "");
    setOutput(res);
    toolState.actions.showMessage("JS unescaped");
  }, [toolState]);

  const doClear = useCallback(() => {
    toolState.setCode("");
    setOutput("");
    toolState.actions.showMessage("Cleared");
  }, [toolState]);

  const copyOutput = useCallback(() => {
    toolState.actions.copyText(output, "Output copied to clipboard");
  }, [output, toolState.actions]);

  const buttons = useMemo(() => {
    // Only show Escape/Unescape and common buttons requested by product
    const custom = [
      { type: "custom" as const, text: "Escape", onClick: doEscapeJs },
      { type: "custom" as const, text: "Unescape", onClick: doUnescapeJs },
      {
        type: "custom" as const,
        text: "Clear",
        onClick: doClear,
        icon: <CloseIcon />,
        variant: "outlined" as const,
        color: "error" as const,
      },
    ];

    return [
      ...custom,
      ...createCommonButtons({
        onCopy: copyOutput,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ];
  }, [doEscapeJs, doUnescapeJs, doClear, copyOutput, toolState]);

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
        title="String Escape & Unescape"
        description="Escape and unescape strings for JavaScript, HTML, URL and Base64 encoding online. Quick convert, copy or download results."
        exampleCode={initialValue}
        exampleOutput={escapeJs(initialValue)}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            editorHeading="Input Text"
            codeEditorProps={rawEditorProps}
            themeOption="vs-dark"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            editorHeading="Output"
            codeEditorProps={outEditorProps}
            themeOption="vs-dark"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
      />
    </ToolLayout>
  );
}
