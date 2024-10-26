import { getRandomId } from "@/util/commonUtils";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  const tableHeaders = headers.map((header) => (
    <TableCell align={align} key={getRandomId()}>
      {header}
    </TableCell>
  ));

  const cellStyleObj = {
    ...cellStyles,
  };

  const tableRows = rows.map((row) => (
    <TableRow key={getRandomId()}>
      {map(row, (cell: ReactNode | string) => (
        <TableCell align={align} sx={cellStyleObj} key={getRandomId()}>
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
