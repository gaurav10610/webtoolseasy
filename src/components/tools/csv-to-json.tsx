"use client";

import { useState, useCallback } from "react";
import {
  Typography,
  Card,
  CardContent,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ToolComponentProps } from "@/types/component";
import { FileUploadWithDragDrop } from "@/components/lib/fileUpload";
import { FILE_SIZE_PRESETS } from "@/util/fileValidation";
import { SnackBarWithPosition } from "../lib/snackBar";
import { SEOContent } from "../common/ToolLayout";
import { componentConfig } from "@/data/tools/csv-to-json";

export default function CsvToJsonConverter({}: Readonly<ToolComponentProps>) {
  const initialValue = `id,name,email,age,city
1,John Doe,john@example.com,30,New York
2,Jane Smith,jane@example.com,25,Los Angeles
3,Bob Johnson,bob@example.com,35,Chicago`;

  const [csvInput, setCsvInput] = useState<string>(initialValue);
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>(",");
  const [hasHeader, setHasHeader] = useState<boolean>(true);
  const [prettyPrint, setPrettyPrint] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "success" as "success" | "error" | "info",
  });

  const detectDataType = (value: string): string | number | boolean | null => {
    // Check for empty or null
    if (value === "" || value.toLowerCase() === "null") {
      return null;
    }

    // Check for boolean
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;

    // Check for number
    const num = Number(value);
    if (!isNaN(num) && value.trim() !== "") {
      return num;
    }

    // Return as string
    return value;
  };

  const csvToJson = useCallback(
    (
      csvData: string,
      delim: string,
      header: boolean,
      pretty: boolean
    ): string => {
      const lines = csvData.trim().split("\n");

      if (lines.length === 0) {
        throw new Error("CSV data is empty");
      }

      // Parse CSV line with proper handling of quoted values
      const parseLine = (line: string): string[] => {
        const result: string[] = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];

          if (char === '"') {
            // Toggle quote state
            inQuotes = !inQuotes;
          } else if (char === delim && !inQuotes) {
            // Found delimiter outside quotes
            result.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }

        // Push remaining content
        result.push(current.trim());
        return result;
      };

      let headers: string[];
      let dataStartIndex: number;

      if (header) {
        // Use first row as headers
        headers = parseLine(lines[0]);
        dataStartIndex = 1;
      } else {
        // Generate numeric headers
        const firstLine = parseLine(lines[0]);
        headers = firstLine.map((_, index) => `field${index + 1}`);
        dataStartIndex = 0;
      }

      // Convert data rows to JSON objects
      const jsonArray: Record<string, string | number | boolean | null>[] = [];

      for (let i = dataStartIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines

        const values = parseLine(line);
        const obj: Record<string, string | number | boolean | null> = {};

        headers.forEach((header, index) => {
          const value = values[index] || "";
          obj[header] = detectDataType(value);
        });

        jsonArray.push(obj);
      }

      // Format output
      return pretty
        ? JSON.stringify(jsonArray, null, 2)
        : JSON.stringify(jsonArray);
    },
    []
  );

  const handleConvert = () => {
    if (!csvInput.trim()) {
      setError("Please enter CSV data to convert");
      return;
    }

    setError("");

    try {
      const json = csvToJson(csvInput, delimiter, hasHeader, prettyPrint);
      setJsonOutput(json);

      setSnackbar({
        open: true,
        message: "CSV converted to JSON successfully!",
        color: "success",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Conversion failed";
      setError(`Conversion failed: ${errorMessage}`);
      setSnackbar({
        open: true,
        message: "Failed to convert CSV",
        color: "error",
      });
    }
  };

  const handleFileSelect = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    try {
      const text = await file.text();
      setCsvInput(text);
      setError("");

      setSnackbar({
        open: true,
        message: "CSV file loaded successfully!",
        color: "success",
      });
    } catch {
      setError("Failed to read file. Please try again.");
      setSnackbar({
        open: true,
        message: "Failed to load file",
        color: "error",
      });
    }
  };

  const handleDownloadJSON = () => {
    if (!jsonOutput) {
      setSnackbar({
        open: true,
        message: "No JSON to download. Convert CSV first.",
        color: "error",
      });
      return;
    }

    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSnackbar({
      open: true,
      message: "JSON file downloaded!",
      color: "success",
    });
  };

  const handleDelimiterChange = (event: SelectChangeEvent<string>) => {
    setDelimiter(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <SEOContent
        title={componentConfig.pageTitle}
        description="Convert CSV to JSON with customizable delimiters and headers"
        exampleCode={initialValue}
        exampleOutput='[{"id":1,"name":"John Doe","email":"john@example.com","age":30,"city":"New York"}]'
      />

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* File Upload */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-3">
            Upload CSV File (Optional)
          </Typography>
          <FileUploadWithDragDrop
            onFileSelect={handleFileSelect}
            accept=".csv,text/csv,application/vnd.ms-excel"
            maxSize={FILE_SIZE_PRESETS.LARGE}
          />
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-3">
            Conversion Settings
          </Typography>
          <div className="flex flex-wrap gap-3">
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Delimiter</InputLabel>
              <Select
                value={delimiter}
                label="Delimiter"
                onChange={handleDelimiterChange}
              >
                <MenuItem value=",">Comma (,)</MenuItem>
                <MenuItem value=";">Semicolon (;)</MenuItem>
                <MenuItem value={"\t"}>Tab (\t)</MenuItem>
                <MenuItem value="|">Pipe (|)</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                />
              }
              label="First row is header"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={prettyPrint}
                  onChange={(e) => setPrettyPrint(e.target.checked)}
                />
              }
              label="Pretty print JSON"
            />
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-3">
            CSV Input
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={12}
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder="Paste your CSV data here..."
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "monospace",
                fontSize: "0.9rem",
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<SwapHorizIcon />}
            onClick={handleConvert}
            fullWidth
            sx={{ mt: 2 }}
            size="large"
          >
            Convert to JSON
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      {jsonOutput && (
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <Typography variant="h6">JSON Output</Typography>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadJSON}
                size="small"
              >
                Download JSON
              </Button>
            </div>
            <TextField
              fullWidth
              multiline
              rows={12}
              value={jsonOutput}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                "& .MuiInputBase-root": {
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-2">
            Features
          </Typography>
          <Typography variant="body2" component="div" className="text-gray-700">
            <ul className="list-disc list-inside space-y-1">
              <li>
                Supports multiple delimiters (comma, semicolon, tab, pipe)
              </li>
              <li>First row can be used as JSON object keys</li>
              <li>Automatic data type detection (numbers, booleans, null)</li>
              <li>Handles quoted values with delimiters inside</li>
              <li>Pretty-print or minified JSON output</li>
              <li>Download converted JSON as file</li>
              <li>All processing happens in your browser (100% private)</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>

      <SnackBarWithPosition
        open={snackbar.open}
        message={snackbar.message}
        color={snackbar.color}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
}
