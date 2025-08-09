"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function JavaScriptEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Editor with Live Preview</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-right: 10px;
        }
        .reset-button {
            background-color: #6c757d;
        }
        .result {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
        }
        .math-example {
            margin-top: 20px;
            padding: 15px;
            background-color: #e7f3ff;
            border: 1px solid #b8daff;
            border-radius: 5px;
        }
        .math-title {
            margin: 0 0 10px 0;
            color: #004085;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>JavaScript Live Preview</h1>
        <p>This HTML with JavaScript is executing in real-time! Try modifying the code on the left.</p>
        
        <button id="clickBtn" class="button">Click Me!</button>
        <button id="resetBtn" class="button reset-button">Reset</button>
        
        <div id="result" class="result">Click the button above to see the magic!</div>
        
        <div class="math-example">
            <h3 class="math-title">Math Example:</h3>
            <p id="mathResult"></p>
        </div>
    </div>

    <script>
        let clickCount = 0;
        const resultDiv = document.getElementById('result');
        const clickBtn = document.getElementById('clickBtn');
        const resetBtn = document.getElementById('resetBtn');
        const mathResult = document.getElementById('mathResult');

        clickBtn.onclick = function() {
            clickCount++;
            resultDiv.textContent = \`Button clicked \${clickCount} time(s)!\`;
            if (clickCount % 3 === 0) {
                resultDiv.style.color = 'red';
            } else if (clickCount % 2 === 0) {
                resultDiv.style.color = 'blue';
            } else {
                resultDiv.style.color = 'green';
            }
        };

        resetBtn.onclick = function() {
            clickCount = 0;
            resultDiv.textContent = 'Click the button above to see the magic!';
            resultDiv.style.color = '#333';
        };

        // Math calculations
        const num1 = 15;
        const num2 = 27;
        mathResult.innerHTML = \`\${num1} + \${num2} = <strong>\${num1 + num2}</strong><br>Square root of 144 = <strong>\${Math.sqrt(144)}</strong><br>Random number: <strong>\${Math.floor(Math.random() * 100)}</strong>\`;

        console.log('JavaScript editor with live preview loaded!');
    </script>
</body>
</html>`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [previewHtml, setPreviewHtml] = useState("");

  // Initialize preview on component mount
  useEffect(() => {
    setPreviewHtml(initialValue);
  }, [initialValue]);

  const updatePreview = useCallback(() => {
    setPreviewHtml(toolState.code);
    toolState.actions.showMessage("Preview updated!");
  }, [toolState.code, toolState.actions]);

  // Auto-update preview when code changes (debounced)
  const handleCodeChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
      // Auto-update preview with a small delay
      setTimeout(() => {
        setPreviewHtml(value);
      }, 300);
    },
    [toolState]
  );
  const downloadCode = useCallback(() => {
    const blob = new Blob([toolState.code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    a.click();
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Code downloaded as index.html!");
  }, [toolState.code, toolState.actions]);

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
      {
        type: "custom" as const,
        text: "Download HTML",
        onClick: downloadCode,
        icon: <DownloadIcon />,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "JavaScript code copied to clipboard!"
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [updatePreview, downloadCode, toolState]
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
        title="JavaScript Editor"
        description="Free online JavaScript editor with live preview. Write, edit and test your HTML with JavaScript code in real-time."
        exampleCode={initialValue}
        exampleOutput="Live HTML preview with interactive JavaScript elements"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={editorProps}
            themeOption="vs-dark"
            editorHeading="HTML Code with JavaScript"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <div className="flex flex-col gap-2 h-full">
            <div className="flex items-center gap-2">
              <PreviewIcon className="text-blue-600" />
              <span className="font-semibold text-lg md:text-xl">
                Live Preview
              </span>
            </div>
            <div className="flex-1 min-h-[200px] md:min-h-[280px] w-full border-2 border-gray-300 rounded-lg bg-white">
              <iframe
                srcDoc={previewHtml}
                className="w-full h-full border-0 rounded-lg"
                sandbox="allow-scripts allow-same-origin"
                title="JavaScript Preview"
              />
            </div>
          </div>
        }
      />
    </ToolLayout>
  );
}
