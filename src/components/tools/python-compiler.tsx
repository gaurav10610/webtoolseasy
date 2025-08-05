"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

import { ToolComponentProps } from "@/types/component";
import {
  decodeText,
  copyToClipboard,
  compressStringToBase64,
  encodeText,
} from "@/util/commonUtils";

import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { ButtonWithHandler } from "../lib/buttons";
import { SnackBarWithPosition } from "../lib/snackBar";
import { CircularProgressWithLabel } from "../lib/progress";
import format from "python-format-js";

// Type definitions for Pyodide
interface PyodideInterface {
  runPythonAsync(code: string): Promise<unknown>;
}

export default function PythonCompiler({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `print("Hello, World!")
print("This is Online Python Compiler (Interpreter) Offered by WebToolsEasy")`;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const onRawCodeChange = useCallback((value: string) => {
    setRawCode(value);
  }, []);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleTextCopy = useCallback(() => {
    copyToClipboard(rawCode);
    setSnackBarMessage("Copied Formatted Code to Clipboard!");
    setIsSnackBarOpen(true);
  }, [rawCode]);

  const handleLinkCopy = useCallback(() => {
    compressStringToBase64(rawCode).then((compressedData) => {
      copyToClipboard(
        `${hostname}${currentPath}?content=${encodeText(compressedData)}`
      );
      setSnackBarMessage("Copied Link to Clipboard!");
      setIsSnackBarOpen(true);
    });
  }, [rawCode, hostname, currentPath]);

  const formatCode = useCallback(() => {
    setRawCode(format(rawCode));
  }, [rawCode]);

  const [output, setOutput] = useState("");
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [pyodideProgress, setPyodideProgress] = useState(0);
  const pyodideRef = useRef<PyodideInterface | null>(null);

  const loadPyodide = useCallback(async () => {
    if (pyodideRef.current || pyodideLoading) return;

    try {
      setPyodideLoading(true);
      setPyodideProgress(10);
      setOutput("Loading Python environment...");

      // Dynamically import pyodide script
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      setPyodideProgress(30);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pyodide = await (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/" + "pyodide/v0.25.0/full/",
      });

      pyodideRef.current = pyodide;
      setPyodideLoading(false);
      setPyodideProgress(100);
      setOutput("Python environment ready! Run your code to see output...");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to load Pyodide:", error);
      }
      setOutput("Error: Failed to load Python environment");
      setPyodideLoading(false);
    }
  }, [pyodideLoading]);

  const runCode = useCallback(async () => {
    // Show loading immediately
    setOutput("Initializing Python environment...");

    // Load Pyodide on first run
    if (!pyodideRef.current && !pyodideLoading) {
      await loadPyodide();
    }

    if (!pyodideRef.current) {
      setOutput("Error: Python environment not ready");
      return;
    }

    try {
      setOutput("Running code...");

      // Simplified Python execution
      const result = await pyodideRef.current.runPythonAsync(`
import sys
from io import StringIO
old_stdout = sys.stdout
captured_output = StringIO()
sys.stdout = captured_output
try:
    exec(${JSON.stringify(rawCode)})
finally:
    sys.stdout = old_stdout
captured_output.getvalue()
      `);

      setOutput(
        String(result).trim() || "Code executed successfully (no output)"
      );
    } catch (error) {
      try {
        await pyodideRef.current.runPythonAsync("sys.stdout = sys.__stdout__");
      } catch {
        // Ignore restore errors
      }
      setOutput(`Error: ${error}`);
    }
  }, [rawCode, pyodideLoading, loadPyodide]);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const ControlButtons = useCallback(() => {
    return (
      <div className="flex flex-col gap-2 w-full md:flex-row">
        <ButtonWithHandler
          buttonText="Run Code"
          variant="contained"
          size="small"
          startIcon={<PlayArrowIcon />}
          onClick={runCode}
        />
        <ButtonWithHandler
          buttonText="Format Code"
          variant="outlined"
          size="small"
          startIcon={<CodeIcon />}
          onClick={formatCode}
        />
        <ButtonWithHandler
          buttonText="Copy Text"
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleTextCopy}
        />
        <ButtonWithHandler
          buttonText="Copy Shareable Link"
          variant="outlined"
          size="small"
          startIcon={<LinkIcon />}
          onClick={handleLinkCopy}
        />
        {!isFullScreen && (
          <ButtonWithHandler
            buttonText="Enter Full Screen"
            variant="outlined"
            size="small"
            startIcon={<OpenInFullIcon />}
            onClick={() => setIsFullScreen(true)}
            className="!hidden md:!flex"
          />
        )}
        {isFullScreen && (
          <ButtonWithHandler
            buttonText="Close Full Screen"
            variant="outlined"
            size="small"
            startIcon={<CloseFullscreenIcon />}
            onClick={() => setIsFullScreen(false)}
            className="!hidden md:!flex"
          />
        )}
      </div>
    );
  }, [runCode, formatCode, handleTextCopy, handleLinkCopy, isFullScreen]);

  // Simplified editor props
  const editorProps = useMemo(
    () => ({
      language: "python" as const,
      value: rawCode,
      onChange: onRawCodeChange,
      editorOptions: {
        wordWrap: "on" as const,
        fontSize: 12,
      },
      className: "w-full h-full",
    }),
    [rawCode, onRawCodeChange]
  );

  return (
    <div
      className={`flex flex-col gap-3 w-full ${
        isFullScreen ? "p-3 fixed inset-0 z-50 bg-white h-full" : ""
      }`}
    >
      {/* SEO-friendly hidden content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>Online Python Compiler</h1>
        <p>
          Free online Python compiler to write and run Python code in your
          browser. No installation needed.
        </p>
        <h2>Example Python Code</h2>
        <pre>{`print("Hello, World!")
print("This is Online Python Compiler (Interpreter) Offered by WebToolsEasy")`}</pre>
        <h2>Example Output</h2>
        <pre>{`Hello, World!
This is Online Python Compiler (Interpreter) Offered by WebToolsEasy`}</pre>
      </div>

      {/* No JavaScript fallback */}
      <noscript>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
          <p className="font-bold text-lg">JavaScript Required</p>
          <p>
            This Python compiler requires JavaScript to run code in your
            browser.
          </p>
          <p>
            Please enable JavaScript or use a compatible browser to run Python
            code interactively.
          </p>
          <div className="mt-4">
            <p className="font-semibold">Example Code:</p>
            <pre className="bg-gray-100 p-2 rounded">{`print("Hello, World!")
print("This is Online Python Compiler (Interpreter) Offered by WebToolsEasy")`}</pre>
            <p className="font-semibold mt-2">Example Output:</p>
            <pre className="bg-gray-100 p-2 rounded">{`Hello, World!
This is Online Python Compiler (Interpreter) Offered by WebToolsEasy`}</pre>
          </div>
        </div>
      </noscript>

      {/* Lazy load Pyodide only when needed */}
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      {pyodideLoading && (
        <div className="flex flex-col justify-center items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-lg font-semibold text-gray-800">
            Loading Python environment...
          </div>
          <CircularProgressWithLabel value={pyodideProgress} />
          <div className="text-sm text-gray-600">
            Please wait while we initialize the Python runtime
          </div>
        </div>
      )}
      <ControlButtons />
      <div
        className={`flex flex-col w-full h-[20rem] md:h-[30rem] items-center md:flex-row gap-2 ${
          isFullScreen ? "md:h-full" : ""
        }`}
      >
        <SingleCodeEditorWithHeaderV2
          codeEditorProps={editorProps}
          themeOption="vs-dark"
          editorHeading="Python Code"
          className="w-[80%] md:w-[49%]"
        />
        <div className="flex flex-col justify-end h-full gap-2 w-[80%] md:w-[49%]">
          <div className="text-xl font-semibold text-gray-700">Output</div>
          <div className="w-full h-full overflow-auto p-3 bg-gray-100 border-2 border-gray-300 rounded font-mono text-sm whitespace-pre-wrap">
            {output || "Run your Python code to see output here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
