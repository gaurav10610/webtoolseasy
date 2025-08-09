"use client";

import { useState, useCallback, useMemo } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
  const initialValue = `// JavaScript Editor
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

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  const executeCode = useCallback(async () => {
    setIsExecuting(true);
    setOutput("");

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
            ${toolState.code}
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

      setOutput(output || "Code executed successfully (no output)");
      toolState.actions.showMessage("JavaScript code executed successfully!");
    } catch (error) {
      setOutput(
        `Execution Error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      toolState.actions.showMessage("JavaScript execution failed");
    } finally {
      setIsExecuting(false);
    }
  }, [toolState.code, toolState.actions]);

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

  const validateSyntax = useCallback(() => {
    try {
      // Basic syntax validation using Function constructor
      new Function(toolState.code);
      toolState.actions.showMessage("✓ JavaScript syntax is valid!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toolState.actions.showMessage(`Syntax Error: ${errorMessage}`);
    }
  }, [toolState.code, toolState.actions]);

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
        text: "Run JavaScript",
        onClick: executeCode,
        icon: <PlayArrowIcon />,
        disabled: isExecuting,
      },
      {
        type: "custom" as const,
        text: "Validate Syntax",
        onClick: validateSyntax,
      },
      {
        type: "custom" as const,
        text: "Download .js",
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
    [executeCode, validateSyntax, downloadCode, isExecuting, toolState]
  );

  // Calculate code statistics
  const codeStats = useMemo(() => {
    const code = toolState.code;
    return {
      characters: code.length,
      lines: code.split("\n").length,
      words: code.split(/\s+/).filter((word) => word.length > 0).length,
      size: new Blob([code]).size,
    };
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
        title="JavaScript Editor"
        description="Free online JavaScript editor with syntax highlighting, code execution, and validation. Write, test and run JavaScript code in your browser."
        exampleCode={initialValue}
        exampleOutput="Interactive JavaScript code execution with live output console"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={editorProps}
            themeOption="vs-dark"
            editorHeading="JavaScript Code"
          />
        }
        rightPanel={
          <div className="w-full h-full flex flex-col">
            <div className="mb-3 flex items-center gap-2">
              <PlayArrowIcon />
              <span className="font-semibold">JavaScript Output</span>
            </div>
            <div className="flex-1 w-full overflow-auto p-4 bg-gray-900 text-green-400 border-2 border-gray-300 rounded font-mono text-sm whitespace-pre-wrap">
              {isExecuting ? (
                <div className="text-blue-400">
                  Executing JavaScript code...
                </div>
              ) : output ? (
                output
              ) : (
                <div className="text-gray-500">
                  Click &ldquo;Run JavaScript&rdquo; to see output here...
                </div>
              )}
            </div>

            {/* Code Statistics */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold mb-2 text-gray-800">
                📊 Code Statistics
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Characters:</span>
                  <span className="ml-2 font-mono">
                    {codeStats.characters.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Lines:</span>
                  <span className="ml-2 font-mono">{codeStats.lines}</span>
                </div>
                <div>
                  <span className="text-gray-600">Words:</span>
                  <span className="ml-2 font-mono">{codeStats.words}</span>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2 font-mono">{codeStats.size} bytes</span>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </ToolLayout>
  );
}
