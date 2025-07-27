"use client";

import { ToolComponentProps } from "@/types/component";
import { Typography } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import { SnackBarWithPosition } from "../lib/snackBar";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { CsvDataTable, AlertMessage } from "../lib/tables";
import { CoreFileStreamer } from "@/lib/CoreFileStreamer";

interface CsvData {
  headers: string[];
  rows: string[][];
}

export default function CsvViewer({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `Name,Age,City,Country
John Doe,30,New York,USA
Jane Smith,25,London,UK
Mike Johnson,35,Sydney,Australia
Sarah Wilson,28,Toronto,Canada`;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [error, setError] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isParsing, setIsParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [parseTimeout, setParseTimeout] = useState<NodeJS.Timeout | null>(null);
  const initialParsingDone = useRef(false);

  const parseCsvString = useCallback(async (csvString: string) => {
    try {
      setIsParsing(true);
      setParseProgress(0);

      const lines = csvString.trim().split("\n");
      if (lines.length === 0) {
        setError("CSV content is empty");
        setCsvData(null);
        return;
      }

      // Helper function to parse CSV line properly handling quotes
      const parseCSVLine = (line: string): string[] => {
        const result: string[] = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];

          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              // Handle escaped quotes
              current += '"';
              i++; // Skip next quote
            } else {
              // Toggle quote state
              inQuotes = !inQuotes;
            }
          } else if (char === "," && !inQuotes) {
            // Found field separator
            result.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }

        // Add the last field
        result.push(current.trim());
        return result;
      };

      // Always parse in chunks to prevent UI blocking, regardless of file size
      const headers = parseCSVLine(lines[0]);
      const rows: string[][] = [];
      const chunkSize = 50; // Smaller chunks for better responsiveness
      const totalRows = lines.length - 1;

      for (let i = 1; i < lines.length; i += chunkSize) {
        const chunk = lines.slice(i, i + chunkSize);
        const parsedChunk = chunk.map((line) => parseCSVLine(line));
        rows.push(...parsedChunk);

        // Update progress
        const progress = Math.round(((i - 1) / totalRows) * 100);
        setParseProgress(Math.min(progress, 100));

        // Yield control back to the browser to prevent freezing
        await new Promise((resolve) => setTimeout(resolve, 2));
      }

      setCsvData({ headers, rows });
      setError("");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error parsing CSV:", err);
      }
      setError("Error parsing CSV data");
      setCsvData(null);
    } finally {
      setIsParsing(false);
      setParseProgress(0);
    }
  }, []);

  const onRawCodeChange = async (value: string) => {
    setRawCode(value);

    // Clear existing timeout
    if (parseTimeout) {
      clearTimeout(parseTimeout);
    }

    // Debounce parsing for manual edits to prevent UI blocking while typing
    const timeoutId = setTimeout(async () => {
      await parseCsvString(value);
    }, 500); // Wait 500ms after user stops typing

    setParseTimeout(timeoutId);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Please select a valid CSV file");
      return;
    }

    // Warn about very large files
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > 50) {
      const confirmed = window.confirm(
        `This file is ${fileSizeMB.toFixed(
          1
        )}MB. Large files may take time to process and could affect browser performance. Continue?`
      );
      if (!confirmed) return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError("");

    try {
      const fileStreamer = new CoreFileStreamer(file, 16 * 1024); // Smaller 16KB chunks for better responsiveness
      const totalFragments = fileStreamer.getTotalFragments();

      let content = "";
      let processedFragments = 0;

      while (!fileStreamer.isEndOfFile()) {
        const chunk = await fileStreamer.readBlockAsText();
        content += chunk;
        processedFragments++;

        const progress = Math.round(
          (processedFragments / totalFragments) * 100
        );
        setUploadProgress(progress);

        // Add small delay to prevent UI blocking every 5 chunks
        if (processedFragments % 5 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }

      setRawCode(content);
      await parseCsvString(content);
      setSnackBarMessage(
        `Successfully loaded CSV file (${(file.size / 1024 / 1024).toFixed(
          2
        )} MB)`
      );
      setIsSnackBarOpen(true);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error reading file:", err);
      }
      setError("Error reading file");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const copyContent = () => {
    copyToClipboard(rawCode);
    setSnackBarMessage("CSV content copied to clipboard");
    setIsSnackBarOpen(true);
  };

  const shareableUrl = async () => {
    const compressedCode = await compressStringToBase64(rawCode);
    const url = `${hostname}${currentPath}?content=${encodeText(
      compressedCode
    )}`;
    copyToClipboard(url);
    setSnackBarMessage("Shareable URL copied to clipboard");
    setIsSnackBarOpen(true);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Parse initial CSV data only once
  useEffect(() => {
    const parseInitialData = async () => {
      if (rawCode && !initialParsingDone.current) {
        initialParsingDone.current = true;
        await parseCsvString(rawCode);
      }
    };
    parseInitialData();
  }, [rawCode, parseCsvString]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (parseTimeout) {
        clearTimeout(parseTimeout);
      }
    };
  }, [parseTimeout]);

  return (
    <div
      className={`flex flex-col gap-3 w-full ${
        isFullScreen ? "fixed inset-0 z-50 bg-white h-full p-4" : "relative"
      }`}
    >
      <div className="flex justify-between items-center flex-wrap gap-2 min-w-0">
        <Typography variant="h4" component="h1" className="truncate">
          CSV Viewer
        </Typography>
        <div className="flex gap-2 items-center flex-wrap shrink-0">
          <ButtonWithHandler
            onClick={copyContent}
            startIcon={<ContentCopyIcon />}
            buttonText="Copy"
            variant="outlined"
            size="small"
          />
          <ButtonWithHandler
            onClick={shareableUrl}
            startIcon={<LinkIcon />}
            buttonText="Share"
            variant="outlined"
            size="small"
          />
          <ButtonWithHandler
            onClick={toggleFullScreen}
            startIcon={
              isFullScreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />
            }
            buttonText={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            variant="outlined"
            size="small"
            className="!hidden md:!flex"
          />
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mb-4 min-w-0">
        <Typography variant="h6" className="mb-3">
          Upload CSV File (Large files supported with streaming)
        </Typography>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors min-w-0">
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-file-input"
            disabled={isUploading}
          />
          <label
            htmlFor="csv-file-input"
            className={`flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-gray-800 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <UploadFileIcon className="mb-2 text-4xl" />
            <span className="text-lg font-medium break-words">
              {isUploading
                ? `Processing... ${uploadProgress}%`
                : "Select or drag and drop your CSV file here"}
            </span>
            <span className="text-sm text-gray-500 mt-1 break-words text-center">
              Supports large .csv files (up to several GB) with streaming
              technology
            </span>
          </label>

          {isUploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center break-words">
                Loading file in chunks for optimal performance...
              </p>
            </div>
          )}
        </div>
      </div>

      {error && <AlertMessage severity="error" message={error} />}

      {isParsing && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg min-w-0">
          <div className="flex items-center justify-between mb-2 min-w-0">
            <span className="text-blue-800 font-medium truncate">
              Parsing CSV data...
            </span>
            <span className="text-blue-600 shrink-0">{parseProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${parseProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-blue-700 mt-2 break-words">
            Processing large CSV file in chunks to maintain browser
            responsiveness...
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 flex-grow min-w-0">
        {/* CSV Editor */}
        <div className="min-h-[300px] min-w-0">
          <SingleCodeEditorWithHeaderV2
            editorHeading="CSV Content"
            codeEditorProps={{
              language: "plaintext",
              value: rawCode,
              onChange: onRawCodeChange,
              className: "h-full",
            }}
            themeOption="vs-dark"
            className="w-full !h-[20rem] md:h-[30rem] min-w-0"
          />
        </div>

        {/* CSV Table View */}
        {csvData && (
          <div className="min-w-0 w-full">
            <div className="flex justify-between items-center mb-3 flex-wrap gap-2 min-w-0">
              <Typography variant="h6" className="truncate">
                Table View ({csvData.rows.length} rows, {csvData.headers.length}{" "}
                columns)
              </Typography>
              {csvData.rows.length > 5000 && (
                <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200 shrink-0">
                  ⚠️ Large dataset - table shows first 5,000 rows for
                  performance
                </div>
              )}
            </div>
            <div
              className="overflow-auto w-full border border-gray-200 rounded-lg bg-white"
              style={{ maxWidth: "100%", minWidth: 0 }}
            >
              <CsvDataTable
                headers={csvData.headers}
                rows={csvData.rows.slice(0, 5000)} // Reduced limit for better performance
                maxHeight={isFullScreen ? "calc(100vh - 500px)" : "400px"}
                className="w-auto min-w-full"
              />
            </div>
          </div>
        )}
      </div>

      <SnackBarWithPosition
        open={isSnackBarOpen}
        autoHideDuration={3000}
        handleClose={handleSnackBarClose}
        message={snackBarMessage}
        vertical="bottom"
        horizontal="center"
      />
    </div>
  );
}
