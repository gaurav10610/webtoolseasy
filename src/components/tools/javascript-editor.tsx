"use client";

import React, { useState, useCallback } from "react";
import { Typography, Button, Alert } from "@mui/material";
import {
  Save,
  ContentCopy,
  Refresh,
  Download,
  Fullscreen,
} from "@mui/icons-material";
import { ToolLayout } from "../common/ToolLayout";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

interface JavaScriptEditorState {
  code: string;
  isFullScreen: boolean;
  error: string;
}

const DEFAULT_JS_CODE = `// JavaScript Editor
// Write your JavaScript code here

/**
 * Calculate the factorial of a number
 * @param {number} n - The number to calculate factorial for
 * @returns {number} The factorial result
 */
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Example usage
console.log("Factorial of 5:", factorial(5));

/**
 * Generate Fibonacci sequence
 * @param {number} count - Number of Fibonacci numbers to generate
 * @returns {number[]} Array of Fibonacci numbers
 */
function fibonacci(count) {
  if (count <= 0) return [];
  if (count === 1) return [0];
  if (count === 2) return [0, 1];
  
  const sequence = [0, 1];
  for (let i = 2; i < count; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2];
  }
  return sequence;
}

// Example usage
console.log("First 10 Fibonacci numbers:", fibonacci(10));

/**
 * Check if a string is a palindrome
 * @param {string} str - The string to check
 * @returns {boolean} True if palindrome, false otherwise
 */
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// Example usage
console.log("Is 'racecar' a palindrome?", isPalindrome("racecar"));
console.log("Is 'hello' a palindrome?", isPalindrome("hello"));

/**
 * Sort an array of objects by a property
 * @param {Array} array - Array to sort
 * @param {string} property - Property to sort by
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted array
 */
function sortByProperty(array, property, order = 'asc') {
  return array.sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    
    if (order === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    }
  });
}

// Example usage
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
];

console.log("Users sorted by age:", sortByProperty([...users], 'age'));
console.log("Users sorted by name:", sortByProperty([...users], 'name'));

/**
 * Debounce function to limit execution frequency
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Example usage
const debouncedLog = debounce((message) => {
  console.log("Debounced:", message);
}, 1000);

// This will only log once after 1 second
debouncedLog("Hello");
debouncedLog("World");
debouncedLog("!"); // Only this will execute`;

export default function JavaScriptEditor() {
  const [state, setState] = useState<JavaScriptEditorState>({
    code: DEFAULT_JS_CODE,
    isFullScreen: false,
    error: "",
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });

  const showMessage = useCallback((message: string) => {
    setSnackBar({ open: true, message });
  }, []);

  const handleCodeChange = useCallback((value: string | undefined) => {
    setState((prev) => ({ ...prev, code: value || "", error: "" }));
  }, []);

  const saveCode = useCallback(() => {
    localStorage.setItem("javascript-editor-code", state.code);
    showMessage("Code saved to local storage!");
  }, [state.code, showMessage]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(state.code);
    showMessage("Code copied to clipboard!");
  }, [state.code, showMessage]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([state.code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "script.js";
    a.click();
    URL.revokeObjectURL(url);
    showMessage("Code downloaded as script.js!");
  }, [state.code, showMessage]);

  const toggleFullScreen = useCallback(() => {
    setState((prev) => ({ ...prev, isFullScreen: !prev.isFullScreen }));
  }, []);

  const handleReset = useCallback(() => {
    setState({
      code: DEFAULT_JS_CODE,
      isFullScreen: false,
      error: "",
    });
  }, []);

  const validateSyntax = useCallback(() => {
    try {
      // Basic syntax validation using Function constructor
      new Function(state.code);
      setState((prev) => ({ ...prev, error: "" }));
      showMessage("✓ JavaScript syntax is valid!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
    }
  }, [state.code, showMessage]);

  // Load saved code on mount
  React.useEffect(() => {
    const savedCode = localStorage.getItem("javascript-editor-code");
    if (savedCode) {
      setState((prev) => ({ ...prev, code: savedCode }));
    }
  }, []);

  const editorHeight = state.isFullScreen ? "calc(100vh - 200px)" : "600px";

  return (
    <ToolLayout
      isFullScreen={state.isFullScreen}
      snackBar={{
        open: snackBar.open,
        message: snackBar.message,
        onClose: () => setSnackBar((prev) => ({ ...prev, open: false })),
      }}
    >
      <div className="space-y-4">
        <div>
          <Typography variant="h5" gutterBottom>
            JavaScript Editor
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Write, edit, and validate JavaScript code with syntax highlighting
          </Typography>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-wrap">
          <Button variant="contained" startIcon={<Save />} onClick={saveCode}>
            Save
          </Button>
          <Button startIcon={<ContentCopy />} onClick={copyCode}>
            Copy Code
          </Button>
          <Button startIcon={<Download />} onClick={downloadCode}>
            Download
          </Button>
          <Button onClick={validateSyntax}>Validate Syntax</Button>
          <Button startIcon={<Fullscreen />} onClick={toggleFullScreen}>
            {state.isFullScreen ? "Exit" : "Full Screen"}
          </Button>
          <Button startIcon={<Refresh />} onClick={handleReset}>
            Reset
          </Button>
        </div>

        {/* Error Display */}
        {state.error && (
          <Alert severity="error">
            <Typography variant="body2">
              <strong>Syntax Error:</strong> {state.error}
            </Typography>
          </Alert>
        )}

        {/* Code Editor */}
        <div className="border rounded-lg overflow-hidden">
          <MonacoEditor
            height={editorHeight}
            defaultLanguage="javascript"
            value={state.code}
            onChange={handleCodeChange}
            options={{
              fontSize: 14,
              wordWrap: "on",
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              formatOnPaste: true,
              formatOnType: true,
              automaticLayout: true,
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnEnter: "on",
              tabCompletion: "on",
              quickSuggestions: true,
              folding: true,
              lineNumbers: "on",
              renderLineHighlight: "line",
              selectOnLineNumbers: true,
              roundedSelection: false,
              readOnly: false,
              cursorStyle: "line",
              mouseWheelZoom: true,
            }}
          />
        </div>

        {/* Code Statistics */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <Typography variant="subtitle2" gutterBottom>
            Code Statistics
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Characters:</span>
              <span className="ml-2 font-mono">
                {state.code.length.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Lines:</span>
              <span className="ml-2 font-mono">
                {state.code.split("\n").length}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Words:</span>
              <span className="ml-2 font-mono">
                {
                  state.code.split(/\s+/).filter((word) => word.length > 0)
                    .length
                }
              </span>
            </div>
            <div>
              <span className="text-gray-600">Size:</span>
              <span className="ml-2 font-mono">
                {new Blob([state.code]).size} bytes
              </span>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
