import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";
import isEmpty from "lodash-es/isEmpty";
import map from "lodash-es/map";
import { ReactNode } from "react";

export function BasicTable({
  headers = [],
  rows = [],
  align = "center",
  variant = "outlined",
  sx = {},
  color = "primary",
  cellStyles = {},
  size = "small",
}: Readonly<{
  headers?: ReactNode[] | string[];
  rows?: (ReactNode | string)[][];
  align?: "left" | "center" | "right" | "justify" | "inherit";
  variant?: "elevation" | "outlined";
  sx?: Record<string, unknown>;
  color?: "primary" | "secondary";
  cellStyles?: Record<string, unknown>;
  size?: "small" | "medium";
}>) {
  const tableHeaders = headers.map((header, index) => (
    <TableCell align={align} key={`header-${index}`}>
      {header}
    </TableCell>
  ));

  const cellStyleObj = {
    ...cellStyles,
  };

  const tableRows = rows.map((row, rowIndex) => (
    <TableRow key={`row-${rowIndex}`}>
      {map(row, (cell: ReactNode | string, cellIndex: number) => (
        <TableCell
          align={align}
          sx={cellStyleObj}
          key={`cell-${rowIndex}-${cellIndex}`}
        >
          {cell}
        </TableCell>
      ))}
    </TableRow>
  ));

  const tableStylesObj = {
    // minWidth: 650,
    ...sx,
  };

  if (isEmpty(headers) && isEmpty(rows)) {
    return null;
  }

  return (
    <TableContainer component={Paper} variant={variant} color={color}>
      <Table sx={tableStylesObj} aria-label="simple basic table" size={size}>
        {!isEmpty(tableHeaders) ? (
          <TableHead>
            <TableRow>{tableHeaders}</TableRow>
          </TableHead>
        ) : null}
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}

// Enhanced table for CSV data with sticky headers and custom styling
export function CsvDataTable({
  headers = [],
  rows = [],
  maxHeight = "400px",
  stickyHeader = true,
  className = "",
}: Readonly<{
  headers?: string[];
  rows?: string[][];
  maxHeight?: string;
  stickyHeader?: boolean;
  className?: string;
}>) {
  if (isEmpty(headers) && isEmpty(rows)) {
    return null;
  }

  return (
    <div className={`overflow-auto ${className}`} style={{ maxHeight }}>
      <TableContainer component={Paper}>
        <Table stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    minWidth: "120px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} hover>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} sx={{ maxWidth: "200px" }}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

// Alert wrapper component
export function AlertMessage({
  severity = "error",
  message,
  className = "",
}: Readonly<{
  severity?: "error" | "warning" | "info" | "success";
  message: string;
  className?: string;
}>) {
  return (
    <div className={`mb-4 ${className}`}>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
}
