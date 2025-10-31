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
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ToolComponentProps } from "@/types/component";
import { FileUploadWithDragDrop } from "@/components/lib/fileUpload";
import { FILE_SIZE_PRESETS } from "@/util/fileValidation";
import { SnackBarWithPosition } from "../lib/snackBar";
import { SEOContent } from "../common/ToolLayout";

export default function JsonToCsvConverter({}: Readonly<ToolComponentProps>) {
  const initialValue = `[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "New York"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "city": "Los Angeles"
  }
]`;

  const [jsonInput, setJsonInput] = useState(initialValue);
  const [csvOutput, setCsvOutput] = useState("");
  const [error, setError] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const showMessage = (message: string) => {
    setSnackBarMessage(message);
    setIsSnackBarOpen(true);
  };

  const flattenObject = useCallback(
    (obj: Record<string, unknown>, prefix = ""): Record<string, string> => {
      const flattened: Record<string, string> = {};

      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (
          value !== null &&
          typeof value === "object" &&
          !Array.isArray(value)
        ) {
          Object.assign(
            flattened,
            flattenObject(value as Record<string, unknown>, newKey)
          );
        } else if (Array.isArray(value)) {
          flattened[newKey] = value.join(", ");
        } else {
          flattened[newKey] =
            value !== null && value !== undefined ? String(value) : "";
        }
      });

      return flattened;
    },
    []
  );

  const escapeCSVValue = useCallback((value: string, delim: string): string => {
    if (
      value.includes(delim) ||
      value.includes('"') ||
      value.includes("\n") ||
      value.includes("\r")
    ) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }, []);

  const jsonToCsv = useCallback(
    (jsonData: unknown[], delim: string): string => {
      if (jsonData.length === 0) {
        return "";
      }

      const flattenedData = jsonData.map((item) =>
        flattenObject(item as Record<string, unknown>)
      );

      const allKeys = Array.from(
        new Set(flattenedData.flatMap((item) => Object.keys(item)))
      );

      const headerRow = allKeys
        .map((key) => escapeCSVValue(key, delim))
        .join(delim);

      const dataRows = flattenedData.map((item) => {
        return allKeys
          .map((key) => {
            const value = item[key] || "";
            return escapeCSVValue(value, delim);
          })
          .join(delim);
      });

      return [headerRow, ...dataRows].join("\n");
    },
    [flattenObject, escapeCSVValue]
  );

  const handleConvert = useCallback(() => {
    try {
      setError("");

      if (!jsonInput.trim()) {
        setError("Please enter JSON data");
        return;
      }

      const parsedJson = JSON.parse(jsonInput);
      const jsonArray = Array.isArray(parsedJson) ? parsedJson : [parsedJson];

      if (jsonArray.length === 0) {
        setError("JSON array is empty");
        return;
      }

      const csv = jsonToCsv(jsonArray, delimiter);
      setCsvOutput(csv);
      showMessage("Successfully converted JSON to CSV");
    } catch (err) {
      setError(
        err instanceof Error
          ? `Invalid JSON: ${err.message}`
          : "Failed to parse JSON"
      );
      setCsvOutput("");
    }
  }, [jsonInput, delimiter, jsonToCsv]);

  const handleFileSelect = useCallback(async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    try {
      const text = await file.text();
      setJsonInput(text);
      setError("");
      showMessage("JSON file loaded successfully");
    } catch {
      setError("Failed to read file");
    }
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const handleDownloadCSV = useCallback(() => {
    if (!csvOutput) {
      showMessage("Please convert JSON first");
      return;
    }

    try {
      const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "converted.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showMessage("CSV file downloaded successfully");
    } catch {
      setError("Failed to download CSV file");
    }
  }, [csvOutput]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <SEOContent
        title="JSON to CSV Converter - Free Online Tool"
        description="Convert JSON to CSV instantly with our free online tool. Supports nested objects and arrays."
      />

      <SnackBarWithPosition
        open={isSnackBarOpen}
        message={snackBarMessage}
        handleClose={() => setIsSnackBarOpen(false)}
        autoHideDuration={3000}
      />

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <FileUploadWithDragDrop
        accept=".json,application/json"
        multiple={false}
        allowedTypes={["application/json", "text/plain"]}
        maxSize={FILE_SIZE_PRESETS.LARGE}
        onFileSelect={handleFileSelect}
        onError={handleError}
        title="Upload JSON File (Optional)"
        subtitle="Or paste JSON data in the text area below"
        supportText="Supports .json files up to 10MB"
      />

      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-3">
            <Typography variant="h6">Settings</Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Delimiter</InputLabel>
              <Select
                value={delimiter}
                label="Delimiter"
                onChange={(e: SelectChangeEvent) =>
                  setDelimiter(e.target.value)
                }
              >
                <MenuItem value=",">Comma (,)</MenuItem>
                <MenuItem value=";">Semicolon (;)</MenuItem>
                <MenuItem value={"\t"}>Tab</MenuItem>
                <MenuItem value="|">Pipe (|)</MenuItem>
              </Select>
            </FormControl>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-3">
            JSON Input
          </Typography>
          <TextField
            multiline
            fullWidth
            minRows={12}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            variant="outlined"
            placeholder="Paste your JSON here..."
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "monospace",
                fontSize: "14px",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleConvert}
            startIcon={<SwapHorizIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Convert to CSV
          </Button>
        </CardContent>
      </Card>

      {csvOutput && (
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <Typography variant="h6">CSV Output</Typography>
              <Button
                variant="contained"
                onClick={handleDownloadCSV}
                startIcon={<DownloadIcon />}
                size="small"
              >
                Download CSV
              </Button>
            </div>
            <TextField
              multiline
              fullWidth
              minRows={12}
              value={csvOutput}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                "& .MuiInputBase-root": {
                  fontFamily: "monospace",
                  fontSize: "14px",
                },
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
