"use client";

import { useCallback, useRef, useState, useMemo } from "react";
import { Typography, LinearProgress, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CodeIcon from "@mui/icons-material/Code";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

// Type definitions for Pyodide
interface PyodideInterface {
  runPythonAsync(code: string): Promise<unknown>;
}

interface PyodideWindow extends Window {
  loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
}

// Lazy load python formatter and Pyodide
const loadPythonFormatter = () => import("python-format-js");
const loadPyodide = async () => {
  // Dynamically load Pyodide script
  const windowWithPyodide = window as PyodideWindow;

  if (!windowWithPyodide.loadPyodide) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  return windowWithPyodide.loadPyodide!({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
  });
};

export default function PythonCompiler({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `print("Hello, World!")
print("This is Online Python Compiler (Interpreter) Offered by WebToolsEasy")`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [output, setOutput] = useState("");
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [pyodideProgress, setPyodideProgress] = useState(0);
  const pyodideRef = useRef<PyodideInterface | null>(null);

  const initializePyodide = useCallback(async () => {
    if (pyodideRef.current || pyodideLoading) return;

    try {
      setPyodideLoading(true);
      setPyodideProgress(10);
      setOutput("Loading Python environment...");

      const pyodide = await loadPyodide();

      pyodideRef.current = pyodide;
      setPyodideLoading(false);
      setPyodideProgress(100);
      setOutput("Python environment ready! Run your code to see output...");
      toolState.actions.showMessage("Python environment loaded successfully!");
    } catch (error) {
      console.error("Failed to load Pyodide:", error);
      setOutput("Error: Failed to load Python environment");
      setPyodideLoading(false);
      toolState.actions.showMessage("Failed to load Python environment");
    }
  }, [pyodideLoading, toolState.actions]);

  const runCode = useCallback(async () => {
    // Show loading immediately
    setOutput("Initializing Python environment...");

    // Load Pyodide on first run
    if (!pyodideRef.current && !pyodideLoading) {
      await initializePyodide();
    }

    if (!pyodideRef.current) {
      setOutput("Error: Python environment not ready");
      return;
    }

    try {
      setOutput("Running code...");

      // Simplified Python execution with output capture
      const result = await pyodideRef.current.runPythonAsync(`
import sys
from io import StringIO
old_stdout = sys.stdout
captured_output = StringIO()
sys.stdout = captured_output
try:
    exec(${JSON.stringify(toolState.code)})
finally:
    sys.stdout = old_stdout
captured_output.getvalue()
      `);

      const outputText = String(result).trim();
      setOutput(outputText || "Code executed successfully (no output)");
      toolState.actions.showMessage("Python code executed successfully!");
    } catch (error) {
      try {
        await pyodideRef.current.runPythonAsync("sys.stdout = sys.__stdout__");
      } catch {
        // Ignore restore errors
      }
      const errorMessage = `Error: ${error}`;
      setOutput(errorMessage);
      toolState.actions.showMessage("Python execution failed");
    }
  }, [toolState.code, pyodideLoading, initializePyodide, toolState.actions]);

  const formatCode = useCallback(async () => {
    try {
      const { default: format } = await loadPythonFormatter();
      const formatted = format(toolState.code);
      toolState.setCode(formatted);
      toolState.actions.showMessage("Python code formatted successfully!");
    } catch (error) {
      console.error("Format error:", error);
      toolState.actions.showMessage("Failed to format Python code");
    }
  }, [toolState]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([toolState.code], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "script.py";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Python file downloaded successfully!");
  }, [toolState.code, toolState.actions]);

  // Editor configuration
  const editorProps = useEditorConfig({
    language: "python",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Run Python",
        onClick: runCode,
        icon: <PlayArrowIcon />,
        disabled: pyodideLoading,
      },
      {
        type: "custom" as const,
        text: "Format Code",
        onClick: formatCode,
        icon: <CodeIcon />,
        disabled: pyodideLoading,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "Python code copied to clipboard!"
          ),
        onDownload: downloadCode,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [runCode, formatCode, downloadCode, pyodideLoading, toolState]
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
        title="Online Python Compiler"
        description="Free online Python compiler to write and run Python code in your browser. No installation needed."
        exampleCode={initialValue}
        exampleOutput="Hello, World!\nThis is Online Python Compiler (Interpreter) Offered by WebToolsEasy"
      />

      {pyodideLoading && (
        <Box className="flex flex-col justify-center items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Typography variant="h6" className="text-gray-800">
            Loading Python environment...
          </Typography>
          <Box className="w-full max-w-md">
            <LinearProgress
              variant="determinate"
              value={pyodideProgress}
              className="mb-2"
            />
            <Typography variant="body2" className="text-center text-gray-600">
              {pyodideProgress}% - Please wait while we initialize Pyodide
            </Typography>
          </Box>
        </Box>
      )}

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={editorProps}
            themeOption="vs-dark"
            editorHeading="Python Code"
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
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl">📟</span>
              <span className="font-semibold text-lg md:text-xl">
                Python Output
              </span>
            </div>
            <div className="flex-1 min-h-[200px] md:min-h-[280px] w-full overflow-auto p-3 md:p-4 bg-gray-900 text-green-400 border-2 border-gray-300 rounded-lg font-mono text-xs md:text-sm whitespace-pre-wrap">
              {output || "Run your Python code to see output here..."}
            </div>
          </div>
        }
      />
    </ToolLayout>
  );
}
