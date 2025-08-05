"use client";

import { useState, useCallback, useMemo } from "react";
import { css_beautify } from "js-beautify";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function CssFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `@media screen and (min-width:735px){.encoded-token-field{margin-right:30px}}@media screen and (max-width:735px){.token-area-container{flex-direction:column}.encoded-token-field{margin-bottom:20px}}.token-parent-div{width:40%;height:30em}`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [formattedCode, setFormattedCode] = useState(() => {
    try {
      return css_beautify(toolState.code);
    } catch {
      return "";
    }
  });

  const formatCss = useCallback(() => {
    try {
      const formatted = css_beautify(toolState.code);
      setFormattedCode(formatted);
      toolState.actions.showMessage("CSS formatted successfully!");
    } catch (error) {
      toolState.actions.showMessage(`Error: ${error}`);
      setFormattedCode("Invalid CSS");
    }
  }, [toolState]);

  const copyFormattedCode = useCallback(() => {
    toolState.actions.copyText(
      formattedCode,
      "Formatted CSS copied to clipboard!"
    );
  }, [formattedCode, toolState.actions]);

  // Editor configurations
  const rawEditorProps = useEditorConfig({
    language: "css",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  const formattedEditorProps = useEditorConfig({
    language: "css",
    value: formattedCode,
    onChange: () => {}, // Read-only, no changes allowed
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Format CSS",
        onClick: formatCss,
        icon: <FormatAlignCenterIcon />,
      },
      {
        type: "custom" as const,
        text: "Copy Formatted",
        onClick: copyFormattedCode,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "Raw CSS copied to clipboard!"
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [formatCss, copyFormattedCode, toolState]
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
        title="CSS Formatter"
        description="Free online CSS formatter and beautifier. Format, beautify and clean up your CSS code with proper indentation."
        exampleCode={initialValue}
        exampleOutput={css_beautify(initialValue)}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={rawEditorProps}
            themeOption="vs-dark"
            editorHeading="Raw CSS"
            className="w-full h-full"
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={formattedEditorProps}
            themeOption="vs-dark"
            editorHeading="Formatted CSS"
            className="w-full h-full"
          />
        }
      />
    </ToolLayout>
  );
}
