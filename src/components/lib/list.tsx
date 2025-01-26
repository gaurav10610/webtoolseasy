import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface ListProps {
  items: ReactNode[];
  spacing?: number;
  isDirectionRow?: boolean;
}

export default function WrappedList({
  items,
  spacing = 1,
  isDirectionRow = false,
}: Readonly<ListProps>) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={spacing} direction={isDirectionRow ? "row" : "column"}>
        {items}
      </Stack>
    </Box>
  );
}
