/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

interface FormFieldProps {
  label: string;
  name: string;
  value: string | undefined;
  error?: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { target: { value: string } }
    >
  ) => void;
  fieldType?: "text" | "dropdown";
  dropdownOptions?: { value: string; label: string }[];
  slotProps?: Record<string, any>;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  error,
  onChange,
  fieldType = "text",
  dropdownOptions = [],
  slotProps = {},
}) => {
  let fieldComponent;

  try {
    switch (fieldType) {
      case "dropdown":
        fieldComponent = (
          <FormControl fullWidth error={!!error}>
            <InputLabel>{label}</InputLabel>
            <Select
              name={name}
              value={value}
              onChange={(e) =>
                onChange(
                  e as unknown as React.ChangeEvent<{
                    target: { value: string };
                  }>
                )
              }
            >
              {dropdownOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
        break;
      case "text":
      default:
        fieldComponent = (
          <TextField
            multiline
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={(e) =>
              onChange(
                e as unknown as React.ChangeEvent<{ target: { value: string } }>
              )
            }
            error={!!error}
            helperText={error}
            slotProps={{
              ...slotProps,
            }}
          />
        );
        break;
    }
  } catch (err) {
    console.error("Failed to render field:", {
      label,
      name,
      value,
      error,
      fieldType,
      dropdownOptions,
      slotProps,
      err,
    });
    fieldComponent = (
      <Typography variant="body1" color="error">
        *Error rendering array fields
      </Typography>
    );
  }

  return (
    <Box border={1} borderColor="success.main" borderRadius={1} p={2} mb={2}>
      {fieldComponent}
    </Box>
  );
};
