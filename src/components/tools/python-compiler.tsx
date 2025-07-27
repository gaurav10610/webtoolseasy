"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
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
import { Typography } from "@mui/material";

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
    // Optional: Add formatting logic here
  }, []);

  const [output, setOutput] = useState("");
  const [pyodideLoading, setPyodideLoading] = useState(true);
  const [pyodideProgress, setPyodideProgress] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const pyodideRef = useRef<PyodideInterface | null>(null);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const loadPyodide = useCallback(async () => {
    if (!scriptLoaded || typeof window === "undefined") return;

    try {
      setPyodideLoading(true);
      setPyodideProgress(30);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pyodide = await (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/" + "pyodide/v0.25.0/full/",
        monitorRunAsync: (msg: string, progress: number | null) => {
          if (progress != null) {
            const adjustedProgress = 30 + Math.round(progress * 70);
            setPyodideProgress(adjustedProgress);
          }
        },
      });

      pyodideRef.current = pyodide;
      setPyodideLoading(false);
      setPyodideProgress(100);
    } catch (error) {
      console.error("Failed to load Pyodide:", error);
      setOutput("Error: Failed to load Python environment");
      setPyodideLoading(false);
    }
  }, [scriptLoaded]);

  useEffect(() => {
    loadPyodide();
  }, [loadPyodide]);

  const runCode = useCallback(async () => {
    if (!pyodideRef.current) {
      setOutput("Error: Python environment not ready");
      return;
    }

    try {
      // Clear any previous output
      setOutput("");

      // Setup stdout capture and run code in one go to reduce async calls
      const result = await pyodideRef.current.runPythonAsync(`
import sys
from io import StringIO

# Redirect stdout to capture print statements
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
    # Execute user code
    result = None
    exec("""${rawCode.replace(/"/g, '\\"').replace(/\n/g, "\\n")}""")
finally:
    # Always restore stdout
    captured = sys.stdout.getvalue()
    sys.stdout = old_stdout

captured
      `);

      setOutput(
        String(result).trim() || "Code executed successfully (no output)"
      );
    } catch (error) {
      // Ensure stdout is restored even on error
      try {
        await pyodideRef.current.runPythonAsync(
          "sys.stdout = old_stdout if 'old_stdout' in globals() else sys.stdout"
        );
      } catch {
        // Ignore restore errors
      }
      setOutput(`Error: ${error}`);
    }
  }, [rawCode]);

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
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      {pyodideLoading && <CircularProgressWithLabel value={pyodideProgress} />}
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
          <Typography
            variant="body1"
            color="textSecondary"
            className="!text-xl !font-semibold"
          >
            Output
          </Typography>
          <div className="w-full h-full overflow-auto p-3 bg-gray-100 border-2 border-gray-300 rounded font-mono text-sm whitespace-pre-wrap">
            {output || "Run your Python code to see output here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
