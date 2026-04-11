"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import TerminalIcon from "@mui/icons-material/Terminal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { Typography, Chip, IconButton, Tooltip } from "@mui/material";

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
  const [consoleLogs, setConsoleLogs] = useState<
    { level: string; text: string; id: number }[]
  >([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const logCounterRef = useRef(0);

  const consoleOverride = `<script>(function(){var L=['log','warn','error','info'];L.forEach(function(l){var o=console[l].bind(console);console[l]=function(){var a=Array.prototype.slice.call(arguments);o.apply(console,a);try{window.parent.postMessage({__cc:true,level:l,args:a.map(function(x){try{return typeof x==='object'&&x!==null?JSON.stringify(x,null,2):String(x);}catch(e){return String(x);}})},\'*\');}catch(e){}};});})();<\/script>`;

  const buildPreviewHtml = useCallback(
    (html: string) => {
      if (html.includes("<head>"))
        return html.replace("<head>", "<head>" + consoleOverride);
      return consoleOverride + html;
    },
    [consoleOverride],
  );

  // Initialize preview on component mount
  useEffect(() => {
    setPreviewHtml(buildPreviewHtml(initialValue));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for console messages from iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data?.__cc) return;
      const text = (e.data.args as string[]).join(" ");
      setConsoleLogs((prev) => [
        ...prev,
        { level: e.data.level, text, id: ++logCounterRef.current },
      ]);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // Auto-update preview when code changes (debounced)
  const handleCodeChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
      // Auto-update preview with a small delay
      setTimeout(() => {
        setPreviewHtml(buildPreviewHtml(value));
        setConsoleLogs([]); // Clear console on code change
      }, 300);
    },
    [toolState, buildPreviewHtml],
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
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "JavaScript code copied to clipboard!",
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
            <div className="flex-1 w-full border-2 border-gray-300 rounded-lg bg-white overflow-hidden min-h-0">
              <iframe
                ref={iframeRef}
                srcDoc={previewHtml}
                className="w-full h-full border-0 rounded-lg"
                sandbox="allow-scripts"
                title="JavaScript Preview"
              />
            </div>
            {/* Console Panel */}
            <div
              className="border border-gray-300 rounded-lg bg-gray-900 text-white overflow-hidden"
              style={{ maxHeight: 160 }}
            >
              <div className="flex items-center justify-between px-3 py-1 bg-gray-800 border-b border-gray-700">
                <Typography
                  variant="caption"
                  className="flex items-center gap-1 text-gray-300 font-mono"
                >
                  <TerminalIcon fontSize="inherit" /> Console
                  {consoleLogs.length > 0 && (
                    <Chip
                      label={consoleLogs.length}
                      size="small"
                      sx={{
                        ml: 1,
                        height: 16,
                        fontSize: 10,
                        bgcolor: "grey.600",
                        color: "white",
                      }}
                    />
                  )}
                </Typography>
                <Tooltip title="Clear console">
                  <IconButton
                    size="small"
                    onClick={() => setConsoleLogs([])}
                    sx={{ color: "grey.400", p: 0.5 }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div
                className="overflow-auto font-mono text-xs p-2 space-y-0.5"
                style={{ maxHeight: 120 }}
              >
                {consoleLogs.length === 0 ? (
                  <span className="text-gray-500">
                    No output yet. Use console.log() in your code.
                  </span>
                ) : (
                  consoleLogs.map(({ level, text, id }) => (
                    <div
                      key={id}
                      className={`${level === "error" ? "text-red-400" : level === "warn" ? "text-yellow-400" : level === "info" ? "text-blue-400" : "text-green-300"}`}
                    >
                      <span className="text-gray-500 mr-1">[{level}]</span>
                      {text}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        }
      />
    </ToolLayout>
  );
}
