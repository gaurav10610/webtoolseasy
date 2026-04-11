"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { Typography, Box, Alert, LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

// TypeScript compiler types
interface TypeScriptDiagnosticFile {
  text: string;
  getLineAndCharacterOfPosition: (position: number) => {
    line: number;
    character: number;
  };
}

interface TypeScriptDiagnostic {
  messageText: string | { messageText: string };
  start?: number;
  code?: number;
  file?: TypeScriptDiagnosticFile;
}

interface TypeScriptModule {
  transpileModule(
    input: string,
    transpileOptions: {
      compilerOptions: Record<string, unknown>;
      reportDiagnostics?: boolean;
    },
  ): { outputText: string; diagnostics?: TypeScriptDiagnostic[] };
  ScriptTarget: Record<string, number>;
  ModuleKind: Record<string, number>;
}

interface TypeScriptWindow extends Window {
  ts?: TypeScriptModule;
}

const loadTypeScript = async (): Promise<TypeScriptModule> => {
  const windowWithTS = window as TypeScriptWindow;
  if (windowWithTS.ts) return windowWithTS.ts;

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/typescript@5.4.5/lib/typescript.min.js";
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });

  if (!windowWithTS.ts) throw new Error("Failed to load TypeScript compiler");
  return windowWithTS.ts;
};

export default function TypeScriptCompiler({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialCode = `// TypeScript Compiler - Write & Run TypeScript Online
// Full ES6+ and TypeScript support

// 1. Type Annotations & Interfaces
interface User {
  name: string;
  age: number;
  email: string;
}

function greet(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

// 2. Generics
function identity<T>(arg: T): T {
  return arg;
}

// 3. Enums
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// 4. Class with Access Modifiers
class Calculator {
  private value: number;

  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }

  add(n: number): this {
    this.value += n;
    return this;
  }

  multiply(n: number): this {
    this.value *= n;
    return this;
  }

  getResult(): number {
    return this.value;
  }
}

// 5. Tuple Types
const coordinates: [number, number] = [10, 20];

// Main execution
const user: User = { name: "Developer", age: 25, email: "dev@example.com" };
console.log("🚀 TypeScript Compiler Demo");
console.log(greet(user));

console.log("📊 Generics:", identity<string>("Hello TypeScript!"));
console.log("🧭 Direction:", Direction.Up);

const calc = new Calculator(10);
console.log("🧮 Calculator:", calc.add(5).multiply(3).getResult());
console.log("📍 Coordinates:", coordinates);

console.log("✅ TypeScript compiled and executed successfully!");`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: initialCode,
  });

  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState("");
  const [diagnostics, setDiagnostics] = useState<
    Array<{
      message: string;
      line: number | null;
      column: number | null;
      code?: number;
      snippet: string;
    }>
  >([]);
  const tsRef = useRef<TypeScriptModule | null>(null);
  const consoleOutputRef = useRef<string[]>([]);

  // Capture console output
  const captureConsole = useCallback(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    consoleOutputRef.current = [];

    console.log = (...args: unknown[]) => {
      consoleOutputRef.current.push(
        `[LOG] ${args
          .map((arg) =>
            typeof arg === "object"
              ? JSON.stringify(arg, null, 2)
              : String(arg),
          )
          .join(" ")}`,
      );
      originalLog.apply(console, args);
    };

    console.error = (...args: unknown[]) => {
      consoleOutputRef.current.push(
        `[ERROR] ${args.map((arg) => String(arg)).join(" ")}`,
      );
      originalError.apply(console, args);
    };

    console.warn = (...args: unknown[]) => {
      consoleOutputRef.current.push(
        `[WARN] ${args.map((arg) => String(arg)).join(" ")}`,
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
    setDiagnostics([]);

    // Load TypeScript compiler if not loaded
    if (!tsRef.current) {
      try {
        setIsLoading(true);
        setLoadProgress(30);
        setOutput("Loading TypeScript compiler...");
        tsRef.current = await loadTypeScript();
        setLoadProgress(100);
        setIsLoading(false);
      } catch (_err) {
        console.error("Failed to load TypeScript compiler:", _err);
        setIsLoading(false);
        setError("Failed to load TypeScript compiler");
        setOutput("Error: Failed to load TypeScript compiler");
        setIsRunning(false);
        return;
      }
    }

    const restoreConsole = captureConsole();

    try {
      // Transpile TypeScript to JavaScript
      const result = tsRef.current.transpileModule(toolState.code, {
        compilerOptions: {
          target: tsRef.current.ScriptTarget.ES2020,
          module: tsRef.current.ModuleKind.None,
          strict: false,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
        reportDiagnostics: true,
      });

      const mappedDiagnostics = (result.diagnostics ?? []).map((diagnostic) => {
        const message =
          typeof diagnostic.messageText === "string"
            ? diagnostic.messageText
            : diagnostic.messageText.messageText;
        const position =
          typeof diagnostic.start === "number" && diagnostic.file
            ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
            : null;
        const line = position ? position.line + 1 : null;
        const column = position ? position.character + 1 : null;
        const snippet = line
          ? diagnostic.file?.text.split("\n")[line - 1] || ""
          : "";

        return {
          message,
          line,
          column,
          code: diagnostic.code,
          snippet,
        };
      });

      setDiagnostics(mappedDiagnostics);

      if (mappedDiagnostics.length > 0) {
        const diagMessages = mappedDiagnostics
          .map((diagnostic) => {
            const location = diagnostic.line
              ? `Line ${diagnostic.line}:${diagnostic.column ?? 1}`
              : "General";
            return `${location} - ${diagnostic.message}`;
          })
          .join("\n");
        consoleOutputRef.current.push(
          `[WARN] TypeScript diagnostics:\n${diagMessages}`,
        );
      }

      // Execute the transpiled JavaScript
      const wrappedCode = `
        (async function() {
          ${result.outputText}
        })();
      `;

      const evalResult = eval(wrappedCode);
      if (evalResult instanceof Promise) {
        await evalResult;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const consoleOutput = consoleOutputRef.current.join("\n");
      setOutput(
        consoleOutput || "Code executed successfully (no console output)",
      );

      toolState.actions.showMessage(
        "TypeScript compiled and executed successfully!",
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      const consoleOutput = consoleOutputRef.current.join("\n");
      setOutput(
        (consoleOutput ? consoleOutput + "\n\n" : "") +
          `Compilation Error: ${errorMessage}`,
      );
      toolState.actions.showMessage("TypeScript compilation failed");
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

  // Editor configuration
  const editorProps = useEditorConfig({
    language: "typescript",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: isRunning ? "Compiling..." : "Run TypeScript",
        onClick: executeCode,
        icon: <PlayArrowIcon />,
        disabled: isRunning,
        variant: "contained" as const,
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
        color: "error" as const,
      },
      ...createCommonButtons({
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [executeCode, copyOutput, clearOutput, isRunning, output, error, toolState],
  );

  // Calculate code statistics
  const codeStats = useMemo(() => {
    const lines = toolState.code.split("\n").length;
    const characters = toolState.code.length;
    const words = toolState.code
      .trim()
      .split(/\s+/)
      .filter((word: string) => word.length > 0).length;

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
{isLoading && (
        <Box className="flex flex-col justify-center items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Typography variant="h6" className="text-gray-800">
            Loading TypeScript Compiler...
          </Typography>
          <Box className="w-full max-w-md">
            <LinearProgress
              variant="determinate"
              value={loadProgress}
              className="mb-2"
            />
            <Typography variant="body2" className="text-center text-gray-600">
              {loadProgress}% - Initializing TypeScript compiler
            </Typography>
          </Box>
        </Box>
      )}

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            editorHeading="TypeScript Code Editor"
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
              <PlayArrowIcon className="text-blue-600" />
              <span className="font-semibold text-lg md:text-xl">
                Console Output
              </span>
            </div>
            <div className="flex-1 min-h-[200px] md:min-h-[280px] border border-gray-300 rounded bg-black text-green-400 font-mono text-xs md:text-sm p-2 md:p-3 overflow-auto">
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                  <span>Compiling and executing TypeScript...</span>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="text-gray-500">
                  Click &quot;Run TypeScript&quot; to compile and execute your
                  code.
                  <br />
                  Supports TypeScript 5.x with full type annotations, generics,
                  and ES6+ features.
                </div>
              )}
            </div>

            {diagnostics.length > 0 && (
              <Alert severity="warning" className="!mb-2">
                <Typography variant="body2" className="mb-2">
                  <strong>Diagnostics:</strong> {diagnostics.length} issue(s)
                  found.
                </Typography>
                <div className="space-y-2 text-xs font-mono">
                  {diagnostics.map((diagnostic, index) => (
                    <div key={`${diagnostic.code}-${index}`}>
                      <div>
                        {diagnostic.line
                          ? `Line ${diagnostic.line}:${diagnostic.column ?? 1}`
                          : "General"}
                        {diagnostic.code ? ` • TS${diagnostic.code}` : ""} —{" "}
                        {diagnostic.message}
                      </div>
                      {diagnostic.snippet && (
                        <pre className="mt-1 overflow-auto rounded bg-yellow-50 p-2 text-[11px] text-slate-800">
                          {diagnostic.snippet}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </Alert>
            )}

            {error && (
              <Alert severity="error" className="!mb-2">
                <Typography variant="body2">
                  <strong>Compilation Error:</strong> {error}
                </Typography>
              </Alert>
            )}
          </div>
        }
        isFullScreen={toolState.isFullScreen}
      />

      {/* Code Statistics and Features Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
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

        <Box className="p-2 md:p-3 bg-blue-50 border border-blue-200 rounded">
          <Typography
            variant="h6"
            className="!text-xs md:!text-sm !font-semibold mb-2 text-blue-800"
          >
            🚀 Supported Features
          </Typography>
          <div className="text-xs text-blue-700 space-y-1 leading-relaxed">
            <div>• Type annotations, interfaces, and type aliases</div>
            <div>• Generics and advanced type inference</div>
            <div>• Enums, tuples, and union/intersection types</div>
            <div>• Classes with access modifiers and decorators</div>
            <div>• Async/await and Promise support</div>
            <div>• ES6+ features (destructuring, spread, arrow functions)</div>
          </div>
        </Box>
      </div>
    </ToolLayout>
  );
}
