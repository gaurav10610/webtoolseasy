"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { js_beautify } from "js-beautify";
import { format as prettierFormat } from "prettier/standalone";
import * as prettierBabel from "prettier/plugins/babel";
import * as prettierEstree from "prettier/plugins/estree";
import { ContentCopy } from "@mui/icons-material";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

const formatWithPrettier = async (code: string) => {
  const trimmed = code.trim();
  const parser =
    trimmed.startsWith("{") || trimmed.startsWith("[") ? "json" : "babel-ts";

  return await prettierFormat(code, {
    parser,
    plugins: [prettierBabel, prettierEstree],
    semi: true,
    singleQuote: false,
  });
};

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

  const [formattedCode, setFormattedCode] = useState("");

  useEffect(() => {
    if (!toolState.code.trim()) {
      setFormattedCode("");
      return;
    }

    try {
      setFormattedCode(js_beautify(toolState.code));
    } catch {
      setFormattedCode("");
    }
  }, [toolState.code]);

  const formatCode = useCallback(async () => {
    try {
      const formatted = await formatWithPrettier(toolState.code);
      setFormattedCode(formatted);
      toolState.actions.showMessage(
        "JavaScript/TypeScript formatted with Prettier!",
      );
    } catch (error) {
      try {
        const fallback = js_beautify(toolState.code);
        setFormattedCode(fallback);
        toolState.actions.showMessage(
          "Prettier fallback applied with beautify.",
        );
      } catch {
        toolState.actions.showMessage(`Error: ${error}`);
      }
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
    [formatCode, copyFormattedCode, formattedCode, toolState],
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
