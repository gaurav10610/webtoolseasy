"use client";

import { useState, useCallback, useMemo } from "react";
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
  const initialValue = `// JavaScript Editor with Live Preview
// Write your JavaScript code here and see it execute in the preview

/**
 * Example: Interactive JavaScript Demo
 */

// Create a simple HTML structure with JavaScript
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.margin = '20px';
document.body.style.backgroundColor = '#f5f5f5';

// Create container
const container = document.createElement('div');
container.style.maxWidth = '800px';
container.style.margin = '0 auto';
container.style.backgroundColor = 'white';
container.style.padding = '20px';
container.style.borderRadius = '8px';
container.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';

// Add title
const title = document.createElement('h1');
title.textContent = 'JavaScript Live Preview';
title.style.color = '#333';
title.style.marginBottom = '20px';
container.appendChild(title);

// Add description
const description = document.createElement('p');
description.innerHTML = 'This JavaScript code is executing in real-time! Try modifying the code on the left.';
description.style.fontSize = '16px';
description.style.lineHeight = '1.6';
description.style.marginBottom = '20px';
container.appendChild(description);

// Interactive button example
const button = document.createElement('button');
button.textContent = 'Click Me!';
button.style.backgroundColor = '#007bff';
button.style.color = 'white';
button.style.border = 'none';
button.style.padding = '10px 20px';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';
button.style.fontSize = '16px';
button.style.marginRight = '10px';

let clickCount = 0;
button.onclick = function() {
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
container.appendChild(button);

// Reset button
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset';
resetButton.style.backgroundColor = '#6c757d';
resetButton.style.color = 'white';
resetButton.style.border = 'none';
resetButton.style.padding = '10px 20px';
resetButton.style.borderRadius = '5px';
resetButton.style.cursor = 'pointer';
resetButton.style.fontSize = '16px';

resetButton.onclick = function() {
    clickCount = 0;
    resultDiv.textContent = 'Click the button above to see the magic!';
    resultDiv.style.color = '#333';
};
container.appendChild(resetButton);

// Result display
const resultDiv = document.createElement('div');
resultDiv.textContent = 'Click the button above to see the magic!';
resultDiv.style.marginTop = '20px';
resultDiv.style.padding = '15px';
resultDiv.style.backgroundColor = '#f8f9fa';
resultDiv.style.border = '1px solid #dee2e6';
resultDiv.style.borderRadius = '5px';
resultDiv.style.fontSize = '18px';
resultDiv.style.fontWeight = 'bold';
container.appendChild(resultDiv);

// Math example
const mathDiv = document.createElement('div');
mathDiv.style.marginTop = '20px';
mathDiv.style.padding = '15px';
mathDiv.style.backgroundColor = '#e7f3ff';
mathDiv.style.border = '1px solid #b8daff';
mathDiv.style.borderRadius = '5px';

const mathTitle = document.createElement('h3');
mathTitle.textContent = 'Math Example:';
mathTitle.style.margin = '0 0 10px 0';
mathTitle.style.color = '#004085';
mathDiv.appendChild(mathTitle);

const mathResult = document.createElement('p');
const num1 = 15;
const num2 = 27;
mathResult.innerHTML = \`\${num1} + \${num2} = <strong>\${num1 + num2}</strong><br>Square root of 144 = <strong>\${Math.sqrt(144)}</strong><br>Random number: <strong>\${Math.floor(Math.random() * 100)}</strong>\`;
mathResult.style.margin = '0';
mathDiv.appendChild(mathResult);

container.appendChild(mathDiv);

// Add everything to the page
document.body.appendChild(container);

console.log('JavaScript editor with live preview loaded!');`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [previewHtml, setPreviewHtml] = useState("");

  const updatePreview = useCallback(() => {
    const htmlWrapper = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Preview</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        .error {
            color: red;
            background: #ffe6e6;
            padding: 10px;
            border: 1px solid #ffcccc;
            border-radius: 4px;
            margin: 10px;
        }
    </style>
</head>
<body>
    <script>
        try {
            // Clear the body first
            document.body.innerHTML = '';
            
            // Override console.log to display in the page
            const outputDiv = document.createElement('div');
            outputDiv.style.position = 'fixed';
            outputDiv.style.bottom = '10px';
            outputDiv.style.left = '10px';
            outputDiv.style.right = '10px';
            outputDiv.style.background = '#f0f0f0';
            outputDiv.style.border = '1px solid #ccc';
            outputDiv.style.borderRadius = '4px';
            outputDiv.style.padding = '10px';
            outputDiv.style.fontSize = '12px';
            outputDiv.style.fontFamily = 'monospace';
            outputDiv.style.maxHeight = '100px';
            outputDiv.style.overflow = 'auto';
            outputDiv.style.zIndex = '1000';
            
            const originalLog = console.log;
            const logs = [];
            console.log = function(...args) {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
                outputDiv.innerHTML = '<strong>Console Output:</strong><br>' + 
                    logs.map(log => log.replace(/</g, '&lt;').replace(/>/g, '&gt;')).join('<br>');
            };
            
            // Execute user code
            ${toolState.code}
            
            // Add console output to body if there are logs
            if (logs.length > 0) {
                document.body.appendChild(outputDiv);
            }
            
        } catch (error) {
            document.body.innerHTML = '<div class="error"><strong>JavaScript Error:</strong><br>' + 
                error.message.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>';
        }
    </script>
</body>
</html>`;

    setPreviewHtml(htmlWrapper);
    toolState.actions.showMessage("Preview updated!");
  }, [toolState.code, toolState.actions]);

  // Auto-update preview when code changes (debounced)
  const handleCodeChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
      // Auto-update preview with a small delay
      setTimeout(() => {
        const htmlWrapper = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Preview</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        .error {
            color: red;
            background: #ffe6e6;
            padding: 10px;
            border: 1px solid #ffcccc;
            border-radius: 4px;
            margin: 10px;
        }
    </style>
</head>
<body>
    <script>
        try {
            // Clear the body first
            document.body.innerHTML = '';
            
            // Override console.log to display in the page
            const outputDiv = document.createElement('div');
            outputDiv.style.position = 'fixed';
            outputDiv.style.bottom = '10px';
            outputDiv.style.left = '10px';
            outputDiv.style.right = '10px';
            outputDiv.style.background = '#f0f0f0';
            outputDiv.style.border = '1px solid #ccc';
            outputDiv.style.borderRadius = '4px';
            outputDiv.style.padding = '10px';
            outputDiv.style.fontSize = '12px';
            outputDiv.style.fontFamily = 'monospace';
            outputDiv.style.maxHeight = '100px';
            outputDiv.style.overflow = 'auto';
            outputDiv.style.zIndex = '1000';
            
            const originalLog = console.log;
            const logs = [];
            console.log = function(...args) {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
                outputDiv.innerHTML = '<strong>Console Output:</strong><br>' + 
                    logs.map(log => log.replace(/</g, '&lt;').replace(/>/g, '&gt;')).join('<br>');
            };
            
            // Execute user code
            ${value}
            
            // Add console output to body if there are logs
            if (logs.length > 0) {
                document.body.appendChild(outputDiv);
            }
            
        } catch (error) {
            document.body.innerHTML = '<div class="error"><strong>JavaScript Error:</strong><br>' + 
                error.message.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>';
        }
    </script>
</body>
</html>`;
        setPreviewHtml(htmlWrapper);
      }, 300);
    },
    [toolState]
  );

  const downloadCode = useCallback(() => {
    const blob = new Blob([toolState.code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "script.js";
    a.click();
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Code downloaded as script.js!");
  }, [toolState.code, toolState.actions]);

  // Editor configuration
  const editorProps = useEditorConfig({
    language: "javascript",
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
        text: "Download JS",
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
        description="Free online JavaScript editor with live preview. Write, edit and test your JavaScript code in real-time."
        exampleCode={initialValue}
        exampleOutput="Live JavaScript preview with interactive elements and console output"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={editorProps}
            themeOption="vs-dark"
            editorHeading="JavaScript Code"
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
