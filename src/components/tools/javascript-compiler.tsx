"use client";

import React, { useState, useCallback } from "react";
import { Typography, Button } from "@mui/material";
import { PlayArrow, ContentCopy, Refresh } from "@mui/icons-material";
import { ToolLayout } from "../common/ToolLayout";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

interface JavaScriptCompilerState {
  code: string;
  output: string;
  isExecuting: boolean;
}

const DEFAULT_JS_CODE = `// JavaScript Compiler & Executor
// Write your JavaScript code here and click "Run Code" to execute

// Example: Simple calculation
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum:", sum);

// Example: Working with objects
const person = {
  name: "John Doe",
  age: 30,
  greet() {
    return \`Hello, I'm \${this.name} and I'm \${this.age} years old.\`;
  }
};
console.log(person.greet());

// Example: Async function
async function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 1000);
  });
}

// Run the async function
fetchData().then(result => console.log(result));
`;

export default function JavaScriptCompiler() {
  const [state, setState] = useState<JavaScriptCompilerState>({
    code: DEFAULT_JS_CODE,
    output: "",
    isExecuting: false,
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });

  const showMessage = useCallback((message: string) => {
    setSnackBar({ open: true, message });
  }, []);

  const executeCode = useCallback(async () => {
    setState((prev) => ({ ...prev, isExecuting: true, output: "" }));

    try {
      // Create a safe execution environment
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;

      let output = "";

      // Override console methods to capture output
      console.log = (...args) => {
        output +=
          args
            .map((arg) =>
              typeof arg === "object"
                ? JSON.stringify(arg, null, 2)
                : String(arg)
            )
            .join(" ") + "\n";
      };

      console.error = (...args) => {
        output += "Error: " + args.map((arg) => String(arg)).join(" ") + "\n";
      };

      console.warn = (...args) => {
        output += "Warning: " + args.map((arg) => String(arg)).join(" ") + "\n";
      };

      try {
        // Execute the code with some safety measures
        const result = await (async () => {
          return eval(`(async () => {
            ${state.code}
          })()`);
        })();

        if (result !== undefined) {
          output +=
            "Return value: " +
            (typeof result === "object"
              ? JSON.stringify(result, null, 2)
              : String(result)) +
            "\n";
        }
      } catch (error) {
        output += `Runtime Error: ${
          error instanceof Error ? error.message : String(error)
        }\n`;
      }

      // Restore original console methods
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;

      setState((prev) => ({
        ...prev,
        output: output || "Code executed successfully (no output)",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        output: `Execution Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      }));
    } finally {
      setState((prev) => ({ ...prev, isExecuting: false }));
    }
  }, [state.code]);

  const copyOutput = useCallback(() => {
    navigator.clipboard.writeText(state.output);
    showMessage("Output copied to clipboard!");
  }, [state.output, showMessage]);

  const handleReset = useCallback(() => {
    setState({
      code: DEFAULT_JS_CODE,
      output: "",
      isExecuting: false,
    });
  }, []);

  return (
    <ToolLayout
      snackBar={{
        open: snackBar.open,
        message: snackBar.message,
        onClose: () => setSnackBar((prev) => ({ ...prev, open: false })),
      }}
    >
      <div className="space-y-4">
        <div>
          <Typography variant="h5" gutterBottom>
            JavaScript Compiler
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Write and execute JavaScript code with real-time output
          </Typography>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={executeCode}
            disabled={state.isExecuting}
          >
            {state.isExecuting ? "Running..." : "Run Code"}
          </Button>
          <Button
            startIcon={<ContentCopy />}
            onClick={copyOutput}
            disabled={!state.output}
          >
            Copy Output
          </Button>
          <Button startIcon={<Refresh />} onClick={handleReset}>
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Code Editor */}
          <div className="space-y-2">
            <Typography variant="h6">JavaScript Code</Typography>
            <div className="border rounded-lg overflow-hidden">
              <MonacoEditor
                height="400px"
                defaultLanguage="javascript"
                value={state.code}
                onChange={(value: string | undefined) =>
                  setState((prev) => ({ ...prev, code: value || "" }))
                }
                options={{
                  fontSize: 14,
                  wordWrap: "on",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-2">
            <Typography variant="h6">Output</Typography>
            <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] font-mono text-sm whitespace-pre-wrap overflow-auto">
              {state.isExecuting ? (
                <div className="text-blue-600">Executing code...</div>
              ) : state.output ? (
                state.output
              ) : (
                <div className="text-gray-500">
                  Click &quot;Run Code&quot; to see output here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
