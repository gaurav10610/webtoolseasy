"use client";

import { useState, useCallback, useMemo } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function HtmlEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample HTML</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        p { line-height: 1.6; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML Editor</h1>
        <p>This is a sample HTML document. Edit the code on the left to see the preview on the right.</p>
        <button onclick="alert('Hello World!')">Click Me</button>
    </div>
</body>
</html>`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [previewHtml, setPreviewHtml] = useState(toolState.code);

  const updatePreview = useCallback(() => {
    setPreviewHtml(toolState.code);
    toolState.actions.showMessage("Preview updated!");
  }, [toolState.code, toolState.actions]);

  // Auto-update preview when code changes (debounced)
  const handleCodeChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
      // Auto-update preview with a small delay
      setTimeout(() => setPreviewHtml(value), 300);
    },
    [toolState]
  );

  // Editor configuration
  const editorProps = useEditorConfig({
    language: "html",
    value: toolState.code,
    onChange: handleCodeChange,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Update Preview",
        onClick: updatePreview,
        icon: <PreviewIcon />,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "HTML code copied to clipboard!"
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [updatePreview, toolState]
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
        title="HTML Editor"
        description="Free online HTML editor with live preview. Write, edit and test your HTML code in real-time."
        exampleCode={initialValue}
        exampleOutput="Live HTML preview with interactive elements"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={editorProps}
            themeOption="vs-dark"
            editorHeading="HTML Code"
            className="w-full h-full"
          />
        }
        rightPanel={
          <div className="w-full h-full flex flex-col">
            <div className="mb-3 flex items-center gap-2">
              <PreviewIcon />
              <span className="font-semibold">Live Preview</span>
            </div>
            <div className="flex-1 w-full border border-gray-300 rounded bg-white">
              <iframe
                srcDoc={previewHtml}
                className="w-full h-full border-0 rounded"
                sandbox="allow-scripts allow-same-origin"
                title="HTML Preview"
              />
            </div>
          </div>
        }
      />
    </ToolLayout>
  );
}
