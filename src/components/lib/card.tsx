import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import React from "react";

export default function BasicCardWithActions({
  cardContent,
  cardActions,
  variant = "outlined",
  sx = {},
}: Readonly<{
  cardContent: React.ReactNode;
  cardActions?: React.ReactNode;
  variant?: "outlined" | "elevation";
  sx?: Record<string, unknown>;
}>) {
  const stylesObj = {
    ...sx,
  };
  return (
    <Box sx={stylesObj}>
      <Card variant={variant}>
        <CardContent>{cardContent}</CardContent>
        {cardActions && <CardActions>{cardActions}</CardActions>}
      </Card>
    </Box>
  );
}
