"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import TableViewIcon from "@mui/icons-material/TableView";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

export default function CsvViewer({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `Name,Email,Age,City,Country
John Doe,john@example.com,30,New York,USA
Jane Smith,jane@example.com,25,London,UK
Bob Johnson,bob@example.com,35,Toronto,Canada
Alice Brown,alice@example.com,28,Sydney,Australia
Charlie Wilson,charlie@example.com,32,Berlin,Germany`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(true);

  // Parse CSV data
  const parsedData = useMemo(() => {
    try {
      if (!toolState.code.trim()) return { headers: [], rows: [] };

      const lines = toolState.code.trim().split("\n");
      if (lines.length === 0) return { headers: [], rows: [] };

      // Simple CSV parsing (handles basic cases)
      const parseRow = (line: string) => {
        const cells: string[] = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];

          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === delimiter && !inQuotes) {
            cells.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        cells.push(current.trim());
        return cells;
      };

      const allRows = lines.map(parseRow);

      if (hasHeader && allRows.length > 0) {
        return {
          headers: allRows[0],
          rows: allRows.slice(1),
        };
      } else {
        // Generate column headers like A, B, C, etc.
        const maxCols = Math.max(...allRows.map((row) => row.length));
        const headers = Array.from(
          { length: maxCols },
          (_, i) => String.fromCharCode(65 + i) // A, B, C, etc.
        );
        return {
          headers,
          rows: allRows,
        };
      }
    } catch {
      return { headers: [], rows: [] };
    }
  }, [toolState.code, delimiter, hasHeader]);

  const parseData = useCallback(() => {
    toolState.actions.showMessage(
      `Parsed CSV: ${parsedData.rows.length} rows, ${parsedData.headers.length} columns`
    );
  }, [parsedData.headers.length, parsedData.rows.length, toolState.actions]);

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Parse CSV",
        onClick: parseData,
        icon: <TableViewIcon />,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "CSV data copied to clipboard!"
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [parseData, toolState]
  );

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
        title="CSV Viewer"
        description="Free online CSV viewer and parser. View, analyze and format your CSV data in a table format."
        exampleCode={initialValue}
        exampleOutput={`Table view with ${parsedData.rows.length} rows and ${parsedData.headers.length} columns`}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Panel - CSV Input */}
        <div className="lg:col-span-1 space-y-4">
          <div>
            <Typography variant="h6" className="mb-2">
              📝 CSV Data
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={12}
              value={toolState.code}
              onChange={(e) => toolState.setCode(e.target.value)}
              placeholder="Paste your CSV data here..."
              variant="outlined"
            />
          </div>

          {/* Settings */}
          <div className="space-y-3">
            <Typography variant="h6">⚙️ Settings</Typography>

            <TextField
              label="Delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              size="small"
              fullWidth
              helperText="Character that separates values (usually comma)"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasHeader"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="hasHeader" className="text-sm">
                First row contains headers
              </label>
            </div>

            <Button
              variant="outlined"
              onClick={parseData}
              fullWidth
              startIcon={<TableViewIcon />}
            >
              Parse CSV
            </Button>
          </div>

          {/* Stats */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <Typography variant="subtitle2" className="mb-2">
              📊 Statistics:
            </Typography>
            <div className="text-sm space-y-1">
              <div>Rows: {parsedData.rows.length}</div>
              <div>Columns: {parsedData.headers.length}</div>
              <div>
                Total cells:{" "}
                {parsedData.rows.length * parsedData.headers.length}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Table View */}
        <div className="lg:col-span-2">
          <Typography variant="h6" className="mb-3">
            📊 Table View
          </Typography>

          {parsedData.headers.length === 0 ? (
            <div className="p-8 bg-gray-50 border border-gray-200 rounded text-center">
              <Typography color="textSecondary">
                Enter CSV data to see the table view
              </Typography>
            </div>
          ) : (
            <TableContainer
              component={Paper}
              className="max-h-96 overflow-auto border"
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="bg-gray-100 font-bold text-xs">
                      #
                    </TableCell>
                    {parsedData.headers.map((header, index) => (
                      <TableCell
                        key={index}
                        className="bg-gray-100 font-bold text-xs"
                      >
                        {header || `Column ${index + 1}`}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parsedData.rows.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <TableCell className="text-xs text-gray-500 font-mono">
                        {rowIndex + 1}
                      </TableCell>
                      {parsedData.headers.map((_, colIndex) => (
                        <TableCell
                          key={colIndex}
                          className="text-xs font-mono max-w-48 truncate"
                          title={row[colIndex] || ""}
                        >
                          {row[colIndex] || ""}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
