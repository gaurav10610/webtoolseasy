"use client";

import { useState, useCallback, useMemo } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import { Typography } from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
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

  const initialCss = `body { font-family: Arial, sans-serif; margin: 20px; }
.container { max-width: 800px; margin: 0 auto; }
h1 { color: #333; }
p { line-height: 1.6; }
button { padding: 10px 16px; border: 0; border-radius: 8px; background: #2563eb; color: white; cursor: pointer; }`;

  const initialHtmlBody = `<div class="container">
  <h1>Welcome to HTML Editor</h1>
  <p>This is a sample HTML document. Edit the code on the left to see the preview on the right.</p>
  <button onclick="alert('Hello World!')">Click Me</button>
</div>`;

  const buildPreviewDocument = useCallback(
    (html: string, css: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Preview</title>
  <style>${css}</style>
</head>
<body>
${html}
</body>
</html>`,
    [],
  );

  const [htmlCode, setHtmlCode] = useState(initialHtmlBody);
  const [cssCode, setCssCode] = useState(initialCss);
  const [previewHtml, setPreviewHtml] = useState(
    buildPreviewDocument(initialHtmlBody, initialCss),
  );

  const handleHtmlChange = useCallback(
    (value: string) => {
      setHtmlCode(value);
      const doc = buildPreviewDocument(value, cssCode);
      toolState.setCode(doc);
      setPreviewHtml(doc);
    },
    [buildPreviewDocument, cssCode, toolState],
  );

  const handleCssChange = useCallback(
    (value: string) => {
      setCssCode(value);
      const doc = buildPreviewDocument(htmlCode, value);
      toolState.setCode(doc);
      setPreviewHtml(doc);
    },
    [buildPreviewDocument, htmlCode, toolState],
  );

  const editorProps = useEditorConfig({
    language: "html",
    value: htmlCode,
    onChange: handleHtmlChange,
  });

  const cssEditorProps = useEditorConfig({
    language: "css",
    value: cssCode,
    onChange: handleCssChange,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "HTML code copied to clipboard!",
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [toolState],
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

      <div
        className={`grid grid-cols-1 xl:grid-cols-3 gap-6 w-full ${
          toolState.isFullScreen ? "h-full" : ""
        }`}
      >
        <SingleCodeEditorWithHeaderV2
          codeEditorProps={editorProps}
          themeOption="vs-dark"
          editorHeading="HTML Panel"
          className={
            toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
          }
        />

        <SingleCodeEditorWithHeaderV2
          codeEditorProps={cssEditorProps}
          themeOption="vs-dark"
          editorHeading="CSS Panel"
          className={
            toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
          }
        />

        <div
          className={`flex flex-col gap-2 ${
            toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
          }`}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            className="!text-sm md:!text-lg lg:!text-xl !font-semibold flex items-center gap-2"
          >
            <PreviewIcon className="text-blue-600" />
            Live Preview
          </Typography>
          <div className="flex-1 min-h-[200px] md:min-h-[280px] w-full border-2 border-gray-300 rounded-lg bg-white">
            <iframe
              srcDoc={previewHtml}
              className="w-full h-full border-0 rounded-lg"
              sandbox="allow-scripts allow-same-origin"
              title="HTML Preview"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
