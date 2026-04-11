import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import isEmpty from "lodash-es/isEmpty";
import map from "lodash-es/map";
import { ReactNode, useState, useMemo } from "react";

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

// Enhanced table for CSV data with sticky headers, sorting, and pagination
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
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const sortedRows = useMemo(() => {
    if (sortCol === null) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortCol] ?? "";
      const bv = b[sortCol] ?? "";
      const numA = parseFloat(av),
        numB = parseFloat(bv);
      const isNum = !isNaN(numA) && !isNaN(numB);
      const cmp = isNum ? numA - numB : av.localeCompare(bv);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [rows, sortCol, sortDir]);

  const pageRows = useMemo(
    () =>
      sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedRows, page, rowsPerPage],
  );

  const handleSort = (colIdx: number) => {
    if (sortCol === colIdx) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(colIdx);
      setSortDir("asc");
    }
    setPage(0);
  };

  if (isEmpty(headers) && isEmpty(rows)) return null;

  return (
    <div className={className}>
      <div style={{ maxHeight, overflow: "auto" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader={stickyHeader} size="small">
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      minWidth: "100px",
                    }}
                    sortDirection={sortCol === index ? sortDir : false}
                  >
                    <TableSortLabel
                      active={sortCol === index}
                      direction={sortCol === index ? sortDir : "asc"}
                      onClick={() => handleSort(index)}
                    >
                      {header}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageRows.map((row, rowIndex) => (
                <TableRow key={rowIndex} hover>
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      sx={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        component="div"
        count={sortedRows.length}
        page={page}
        onPageChange={(_e, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
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
