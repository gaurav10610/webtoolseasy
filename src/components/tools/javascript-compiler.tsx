"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { Typography, Box, Alert } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function JavaScriptCompiler({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialCode = `// JavaScript Compiler - ES6+ Support
// Test modern JavaScript features

// 1. Arrow Functions & Template Literals
const greet = (name) => {
  return \`Hello, \${name}! Welcome to JavaScript Compiler.\`;
};

// 2. Async/Await Example
async function fetchData() {
  console.log("Fetching data...");
  return new Promise(resolve => {
    setTimeout(() => resolve("Data loaded successfully!"), 1000);
  });
}

// 3. Object Destructuring & Spread Operator
const user = { name: "WebToolsEasy", age: 25, city: "DevWorld" };
const { name, ...rest } = user;
console.log("User:", name, "Details:", rest);

// 4. Array Methods & Higher-Order Functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = doubled.reduce((acc, n) => acc + n, 0);

// 5. Class with Modern Syntax
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }
  
  add(n) { this.value += n; return this; }
  multiply(n) { this.value *= n; return this; }
  get result() { return this.value; }
}

// Main execution
async function main() {
  console.log("🚀 JavaScript Compiler Demo");
  console.log(greet("Developer"));
  
  console.log("📊 Array operations:");
  console.log("Numbers:", numbers);
  console.log("Doubled:", doubled);
  console.log("Sum:", sum);
  
  console.log("🧮 Calculator demo:");
  const calc = new Calculator(10);
  const result = calc.add(5).multiply(2).result;
  console.log("Calculation result:", result);
  
  console.log("⏳ Async operation:");
  const data = await fetchData();
  console.log(data);
  
  console.log("✅ Compilation and execution completed!");
  return "All tests passed!";
}

// Run the demo
main().then(result => console.log("Final result:", result));`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: initialCode,
  });

  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");
  const consoleOutputRef = useRef<string[]>([]);

  // Capture console output
  const captureConsole = useCallback(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    consoleOutputRef.current = [];

    console.log = (...args) => {
      consoleOutputRef.current.push(
        `[LOG] ${args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ")}`
      );
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      consoleOutputRef.current.push(
        `[ERROR] ${args.map((arg) => String(arg)).join(" ")}`
      );
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      consoleOutputRef.current.push(
        `[WARN] ${args.map((arg) => String(arg)).join(" ")}`
      );
      originalWarn.apply(console, args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  const executeCode = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    setError("");
    setOutput("");

    const restoreConsole = captureConsole();

    try {
      // Create a function wrapper to execute the code with async support
      const wrappedCode = `
        (async function() {
          ${toolState.code}
        })();
      `;

      // Execute the code
      const result = eval(wrappedCode);

      // Wait for async operations to complete
      if (result instanceof Promise) {
        await result;
      }

      // Small delay to ensure all console outputs are captured
      await new Promise((resolve) => setTimeout(resolve, 100));

      const consoleOutput = consoleOutputRef.current.join("\n");
      setOutput(
        consoleOutput || "Code executed successfully (no console output)"
      );

      toolState.actions.showMessage(
        "JavaScript compiled and executed successfully!"
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      setOutput(`Compilation Error: ${errorMessage}`);
      toolState.actions.showMessage("Compilation error occurred");
    } finally {
      restoreConsole();
      setIsRunning(false);
    }
  }, [toolState.code, toolState.actions, isRunning, captureConsole]);

  const copyOutput = useCallback(() => {
    if (output) {
      toolState.actions.copyText(output, "Output copied to clipboard!");
    } else {
      toolState.actions.showMessage("No output to copy");
    }
  }, [output, toolState.actions]);

  const clearOutput = useCallback(() => {
    setOutput("");
    setError("");
    toolState.actions.showMessage("Output cleared!");
  }, [toolState.actions]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([toolState.code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "script.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("JavaScript file downloaded!");
  }, [toolState]);

  // Editor configuration
  const editorProps = useEditorConfig({
    language: "javascript",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: isRunning ? "Running..." : "Run Code",
        onClick: executeCode,
        icon: <PlayArrowIcon />,
        disabled: isRunning,
      },
      {
        type: "custom" as const,
        text: "Copy Output",
        onClick: copyOutput,
        icon: <ContentCopyIcon />,
        disabled: !output,
      },
      {
        type: "custom" as const,
        text: "Clear Output",
        onClick: clearOutput,
        icon: <ClearIcon />,
        disabled: !output && !error,
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
    [
      executeCode,
      copyOutput,
      clearOutput,
      downloadCode,
      isRunning,
      output,
      error,
      toolState,
    ]
  );

  // Calculate code statistics
  const codeStats = useMemo(() => {
    const lines = toolState.code.split("\n").length;
    const characters = toolState.code.length;
    const words = toolState.code
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    return { lines, characters, words };
  }, [toolState.code]);

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
        title="JavaScript Compiler Online"
        description="Free online JavaScript compiler with ES6+ support. Compile, run and test JavaScript code in browser with real-time execution and console output."
        exampleCode={initialCode}
        exampleOutput="🚀 JavaScript Compiler Demo\nHello, Developer! Welcome to JavaScript Compiler.\n📊 Array operations:\nNumbers: [1, 2, 3, 4, 5]\nDoubled: [2, 4, 6, 8, 10]\nSum: 30"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            editorHeading="JavaScript Code Editor"
            codeEditorProps={editorProps}
            themeOption="vs-dark"
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
              <PlayArrowIcon className="text-green-600" />
              <span className="font-semibold text-lg md:text-xl">
                Console Output
              </span>
            </div>
            <div className="flex-1 min-h-[200px] md:min-h-[280px] border border-gray-300 rounded bg-black text-green-400 font-mono text-xs md:text-sm p-2 md:p-3 overflow-auto">
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                  <span>Executing JavaScript code...</span>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="text-gray-500">
                  Click &quot;Run Code&quot; to execute JavaScript and see
                  output here.
                  <br />
                  Supports ES6+, async/await, and modern JavaScript features.
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <Alert severity="error" className="!mb-2">
                <Typography variant="body2">
                  <strong>Compilation Error:</strong> {error}
                </Typography>
              </Alert>
            )}

            {/* Code Statistics */}
            <Box className="p-2 md:p-3 bg-gray-50 border border-gray-200 rounded">
              <Typography
                variant="h6"
                className="!text-xs md:!text-sm !font-semibold mb-2"
              >
                📊 Code Statistics
              </Typography>
              <div className="grid grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm">
                <div className="text-center">
                  <div className="font-semibold text-blue-600 text-sm md:text-base">
                    {codeStats.lines}
                  </div>
                  <div className="text-gray-600 text-xs">Lines</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600 text-sm md:text-base">
                    {codeStats.characters}
                  </div>
                  <div className="text-gray-600 text-xs">Characters</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600 text-sm md:text-base">
                    {codeStats.words}
                  </div>
                  <div className="text-gray-600 text-xs">Words</div>
                </div>
              </div>
            </Box>

            {/* Features Info */}
            <Box className="p-2 md:p-3 bg-blue-50 border border-blue-200 rounded">
              <Typography
                variant="h6"
                className="!text-xs md:!text-sm !font-semibold mb-2 text-blue-800"
              >
                🚀 Supported Features
              </Typography>
              <div className="text-xs text-blue-700 space-y-1 leading-relaxed">
                <div>
                  • ES6+ syntax (arrow functions, destructuring, spread
                  operator)
                </div>
                <div>• Async/await and Promise support</div>
                <div>• Modern array methods and higher-order functions</div>
                <div>• Classes and object-oriented programming</div>
                <div>• Template literals and dynamic imports</div>
                <div>• Real-time console output and error handling</div>
              </div>
            </Box>
          </div>
        }
        isFullScreen={toolState.isFullScreen}
      />
    </ToolLayout>
  );
}
