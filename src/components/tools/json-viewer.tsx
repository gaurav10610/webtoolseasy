"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Typography, Button, Alert } from "@mui/material";
import { ContentCopy, Refresh, Visibility } from "@mui/icons-material";
import { ToolLayout } from "../common/ToolLayout";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

interface JsonViewerState {
  jsonInput: string;
  parsedJson: unknown;
  error: string;
  isValid: boolean;
}

const DEFAULT_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "coding", "traveling"],
  "isActive": true,
  "metadata": {
    "createdAt": "2024-01-01T00:00:00Z",
    "lastModified": "2024-01-15T10:30:00Z",
    "version": 1.2
  }
}`;

export default function JsonViewer() {
  const [state, setState] = useState<JsonViewerState>({
    jsonInput: DEFAULT_JSON,
    parsedJson: null,
    error: "",
    isValid: false,
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });

  const showMessage = useCallback((message: string) => {
    setSnackBar({ open: true, message });
  }, []);

  const validateAndParseJson = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setState((prev) => ({
        ...prev,
        parsedJson: parsed,
        error: "",
        isValid: true,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        parsedJson: null,
        error: error instanceof Error ? error.message : "Invalid JSON",
        isValid: false,
      }));
    }
  }, []);

  const handleJsonChange = useCallback(
    (value: string | undefined) => {
      const newValue = value || "";
      setState((prev) => ({ ...prev, jsonInput: newValue }));

      if (newValue.trim()) {
        validateAndParseJson(newValue);
      } else {
        setState((prev) => ({
          ...prev,
          parsedJson: null,
          error: "",
          isValid: false,
        }));
      }
    },
    [validateAndParseJson]
  );

  const copyJson = useCallback(() => {
    navigator.clipboard.writeText(state.jsonInput);
    showMessage("JSON copied to clipboard!");
  }, [state.jsonInput, showMessage]);

  const handleReset = useCallback(() => {
    setState({
      jsonInput: DEFAULT_JSON,
      parsedJson: null,
      error: "",
      isValid: false,
    });
    validateAndParseJson(DEFAULT_JSON);
  }, [validateAndParseJson]);

  const formatJson = useCallback(() => {
    if (state.isValid && state.parsedJson) {
      const formatted = JSON.stringify(state.parsedJson, null, 2);
      setState((prev) => ({ ...prev, jsonInput: formatted }));
      showMessage("JSON formatted successfully!");
    }
  }, [state.isValid, state.parsedJson, showMessage]);

  // JSON statistics
  const jsonStats = useMemo(() => {
    if (!state.isValid || !state.parsedJson) return null;

    const countItems = (
      obj: unknown
    ): { objects: number; arrays: number; keys: number; values: number } => {
      let objects = 0;
      let arrays = 0;
      let keys = 0;
      let values = 0;

      const traverse = (item: unknown) => {
        if (Array.isArray(item)) {
          arrays++;
          item.forEach(traverse);
        } else if (item && typeof item === "object") {
          objects++;
          Object.keys(item).forEach((key) => {
            keys++;
            traverse((item as Record<string, unknown>)[key]);
          });
        } else {
          values++;
        }
      };

      traverse(obj);
      return { objects, arrays, keys, values };
    };

    const stats = countItems(state.parsedJson);
    const size = new Blob([state.jsonInput]).size;

    return {
      ...stats,
      size,
      lines: state.jsonInput.split("\n").length,
      characters: state.jsonInput.length,
    };
  }, [state.isValid, state.parsedJson, state.jsonInput]);

  // Initialize with default JSON
  React.useEffect(() => {
    validateAndParseJson(DEFAULT_JSON);
  }, [validateAndParseJson]);

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
            JSON Viewer & Validator
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Validate, format, and analyze JSON data with detailed statistics
          </Typography>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="contained"
            startIcon={<Visibility />}
            onClick={formatJson}
            disabled={!state.isValid}
          >
            Format JSON
          </Button>
          <Button
            startIcon={<ContentCopy />}
            onClick={copyJson}
            disabled={!state.jsonInput}
          >
            Copy JSON
          </Button>
          <Button startIcon={<Refresh />} onClick={handleReset}>
            Reset
          </Button>
        </div>

        {/* Error Display */}
        {state.error && (
          <Alert severity="error">
            <Typography variant="body2">
              <strong>JSON Error:</strong> {state.error}
            </Typography>
          </Alert>
        )}

        {/* Success indicator */}
        {state.isValid && !state.error && (
          <Alert severity="success">
            <Typography variant="body2">✓ Valid JSON structure</Typography>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* JSON Editor */}
          <div className="lg:col-span-2 space-y-2">
            <Typography variant="h6">JSON Input</Typography>
            <div className="border rounded-lg overflow-hidden">
              <MonacoEditor
                height="500px"
                defaultLanguage="json"
                value={state.jsonInput}
                onChange={handleJsonChange}
                options={{
                  fontSize: 14,
                  wordWrap: "on",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="space-y-4">
            <Typography variant="h6">JSON Analysis</Typography>

            {jsonStats ? (
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Typography variant="subtitle2" gutterBottom>
                    Structure
                  </Typography>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Objects:</span>
                      <span className="font-mono">{jsonStats.objects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arrays:</span>
                      <span className="font-mono">{jsonStats.arrays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Keys:</span>
                      <span className="font-mono">{jsonStats.keys}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Values:</span>
                      <span className="font-mono">{jsonStats.values}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <Typography variant="subtitle2" gutterBottom>
                    Content
                  </Typography>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Characters:</span>
                      <span className="font-mono">
                        {jsonStats.characters.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lines:</span>
                      <span className="font-mono">{jsonStats.lines}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-mono">{jsonStats.size} bytes</span>
                    </div>
                  </div>
                </div>

                {/* JSON Tree View Preview */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Typography variant="subtitle2" gutterBottom>
                    Preview
                  </Typography>
                  <div className="max-h-40 overflow-auto text-xs font-mono whitespace-pre-wrap bg-white p-2 rounded border">
                    {JSON.stringify(state.parsedJson, null, 2)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Typography variant="body2">
                  Enter valid JSON to see analysis
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
