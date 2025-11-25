"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormControlLabel,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TableChartIcon from "@mui/icons-material/TableChart";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

type OutputFormat = "html" | "markdown" | "csv";

interface TableCell {
  content: string;
}

export default function TableGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [rows, setRows] = useState<TableCell[][]>([
    [{ content: "Header 1" }, { content: "Header 2" }, { content: "Header 3" }],
    [
      { content: "Row 1 Col 1" },
      { content: "Row 1 Col 2" },
      { content: "Row 1 Col 3" },
    ],
    [
      { content: "Row 2 Col 1" },
      { content: "Row 2 Col 2" },
      { content: "Row 2 Col 3" },
    ],
  ]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("html");
  const [hasHeaderRow, setHasHeaderRow] = useState(true);
  const [hasHeaderColumn, setHasHeaderColumn] = useState(false);

  const addRow = useCallback(() => {
    const colCount = rows[0]?.length || 3;
    const newRow: TableCell[] = Array(colCount)
      .fill(null)
      .map((_, i) => ({ content: `New Row Col ${i + 1}` }));
    setRows([...rows, newRow]);
  }, [rows]);

  const deleteRow = useCallback(
    (rowIndex: number) => {
      if (rows.length > 1) {
        setRows(rows.filter((_, i) => i !== rowIndex));
        toolState.actions.showMessage("Row deleted");
      } else {
        toolState.actions.showMessage("Table must have at least one row");
      }
    },
    [rows, toolState.actions]
  );

  const addColumn = useCallback(() => {
    const newRows = rows.map((row, i) => [
      ...row,
      {
        content:
          i === 0 && hasHeaderRow
            ? `Header ${row.length + 1}`
            : `Col ${row.length + 1}`,
      },
    ]);
    setRows(newRows);
  }, [rows, hasHeaderRow]);

  const deleteColumn = useCallback(
    (colIndex: number) => {
      if (rows[0]?.length > 1) {
        setRows(rows.map((row) => row.filter((_, i) => i !== colIndex)));
        toolState.actions.showMessage("Column deleted");
      } else {
        toolState.actions.showMessage("Table must have at least one column");
      }
    },
    [rows, toolState.actions]
  );

  const updateCell = useCallback(
    (rowIndex: number, colIndex: number, value: string) => {
      const newRows = [...rows];
      newRows[rowIndex][colIndex].content = value;
      setRows(newRows);
    },
    [rows]
  );

  const generateHTML = useCallback((): string => {
    let html =
      '<table border="1" style="border-collapse: collapse; width: 100%;">\n';

    rows.forEach((row, rowIndex) => {
      html += "  <tr>\n";
      row.forEach((cell, colIndex) => {
        const isHeader =
          (hasHeaderRow && rowIndex === 0) ||
          (hasHeaderColumn && colIndex === 0);
        const tag = isHeader ? "th" : "td";
        const style = isHeader
          ? ' style="padding: 8px; background-color: #f0f0f0; font-weight: bold;"'
          : ' style="padding: 8px;"';
        html += `    <${tag}${style}>${cell.content}</${tag}>\n`;
      });
      html += "  </tr>\n";
    });

    html += "</table>";
    return html;
  }, [rows, hasHeaderRow, hasHeaderColumn]);

  const generateMarkdown = useCallback((): string => {
    if (rows.length === 0) return "";

    let markdown = "";

    // First row
    markdown += "| " + rows[0].map((cell) => cell.content).join(" | ") + " |\n";

    // Separator row
    markdown += "| " + rows[0].map(() => "---").join(" | ") + " |\n";

    // Data rows
    for (let i = 1; i < rows.length; i++) {
      markdown +=
        "| " + rows[i].map((cell) => cell.content).join(" | ") + " |\n";
    }

    return markdown;
  }, [rows]);

  const generateCSV = useCallback((): string => {
    return rows
      .map((row) =>
        row
          .map((cell) => {
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            const content = cell.content.replace(/"/g, '""');
            return content.includes(",") ||
              content.includes('"') ||
              content.includes("\n")
              ? `"${content}"`
              : content;
          })
          .join(",")
      )
      .join("\n");
  }, [rows]);

  const getOutput = useCallback((): string => {
    switch (outputFormat) {
      case "html":
        return generateHTML();
      case "markdown":
        return generateMarkdown();
      case "csv":
        return generateCSV();
      default:
        return "";
    }
  }, [outputFormat, generateHTML, generateMarkdown, generateCSV]);

  const output = getOutput();

  const handleFormatChange = (event: SelectChangeEvent) => {
    setOutputFormat(event.target.value as OutputFormat);
  };

  const clearTable = useCallback(() => {
    setRows([
      [
        { content: "Header 1" },
        { content: "Header 2" },
        { content: "Header 3" },
      ],
      [
        { content: "Row 1 Col 1" },
        { content: "Row 1 Col 2" },
        { content: "Row 1 Col 3" },
      ],
      [
        { content: "Row 2 Col 1" },
        { content: "Row 2 Col 2" },
        { content: "Row 2 Col 3" },
      ],
    ]);
    toolState.actions.showMessage("Table reset to default");
  }, [toolState.actions]);

  const buttons = [
    {
      type: "copy" as const,
      text: "Copy Output",
      copyText: output,
    },
    {
      type: "custom" as const,
      text: "Reset Table",
      onClick: clearTable,
      color: "error" as const,
    },
    ...createCommonButtons({
      onFullScreen: toolState.toggleFullScreen,
    }),
  ];

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
        title="Table Generator - Create Tables Online"
        description="Generate HTML, Markdown, and CSV tables with visual editor. Add rows, columns, customize styling, and export instantly."
        exampleCode="Visual table editor"
        exampleOutput="HTML/Markdown/CSV output"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="space-y-6">
        {/* Settings */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              <TableChartIcon /> Table Settings
            </Typography>
            <div className="flex flex-wrap gap-4">
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel>Output Format</InputLabel>
                <Select
                  value={outputFormat}
                  label="Output Format"
                  onChange={handleFormatChange}
                >
                  <MenuItem value="html">HTML</MenuItem>
                  <MenuItem value="markdown">Markdown</MenuItem>
                  <MenuItem value="csv">CSV</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={hasHeaderRow}
                    onChange={(e) => setHasHeaderRow(e.target.checked)}
                  />
                }
                label="Header Row"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={hasHeaderColumn}
                    onChange={(e) => setHasHeaderColumn(e.target.checked)}
                  />
                }
                label="Header Column"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table Editor */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">Table Editor</Typography>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={addRow}
                >
                  Add Row
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={addColumn}
                >
                  Add Column
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => {
                        const isHeader =
                          (hasHeaderRow && rowIndex === 0) ||
                          (hasHeaderColumn && colIndex === 0);
                        return (
                          <td
                            key={colIndex}
                            className={`border border-gray-300 p-2 ${
                              isHeader
                                ? "bg-gray-100 font-semibold"
                                : "bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <TextField
                                value={cell.content}
                                onChange={(e) =>
                                  updateCell(rowIndex, colIndex, e.target.value)
                                }
                                size="small"
                                fullWidth
                                variant="standard"
                                InputProps={{
                                  disableUnderline: true,
                                }}
                              />
                              {colIndex === row.length - 1 && (
                                <IconButton
                                  size="small"
                                  onClick={() => deleteColumn(colIndex)}
                                  title="Delete column"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              )}
                            </div>
                          </td>
                        );
                      })}
                      <td className="border border-gray-300 p-2 bg-gray-50">
                        <IconButton
                          size="small"
                          onClick={() => deleteRow(rowIndex)}
                          title="Delete row"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Generated {outputFormat.toUpperCase()}
            </Typography>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap">
              {output || "Table output will appear here..."}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardContent>
            <Typography variant="body2" className="text-sm">
              <strong>How to use:</strong> Edit any cell by clicking and typing.
              Add or remove rows and columns using the buttons. Toggle header
              row and column styling with the switches. Choose your output
              format (HTML, Markdown, or CSV) and copy the generated code. For
              HTML, you can add custom CSS classes. For Markdown, the first row
              is always the header. For CSV, special characters are
              automatically escaped.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
