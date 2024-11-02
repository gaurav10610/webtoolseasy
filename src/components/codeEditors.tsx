"use client";

import { isMobileDevice } from "@/lib/client-response";
import { CodeEditor, CodeEditorProps } from "./lib/editor";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

export function TwoCodeEditors({
  buttons,
  firstEditorHeading,
  firstEditorProps,
  secondEditorHeading,
  secondEditorProps,
  showEditorOptions = false,
}: Readonly<{
  buttons?: React.ReactNode;
  firstEditorHeading?: string;
  firstEditorProps: CodeEditorProps;
  secondEditorHeading?: string;
  secondEditorProps: CodeEditorProps;
  showEditorOptions?: boolean;
}>) {
  const isMobileView = isMobileDevice();

  const [editorOptions, setEditorOptions] = useState({
    fontSize: 14,
  });

  const [themeOption, setThemeOption] = useState("vs-dark");

  const handleFontSizeChange = (event: SelectChangeEvent<number>) => {
    setEditorOptions({
      ...editorOptions,
      fontSize: event.target.value as number,
    });
  };

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    setThemeOption(event.target.value as string);
  };

  return (
    <div className="column-display base-flex-gap full-width flex-vr-center">
      {/* Editor Options */}
      {showEditorOptions && (
        <div
          className="row-display inner-flex-gap full-width"
          style={{
            flexDirection: isMobileView ? "column" : "row",
          }}
        >
          {/* Dropdown for editorOptions.fontSize */}
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Font Size</InputLabel>
            <Select
              value={editorOptions.fontSize}
              onChange={handleFontSizeChange}
              label="Font Size"
              size="small"
              color="primary"
            >
              {[12, 14, 16, 18, 20, 22, 24].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dropdown for themeOption */}
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={themeOption}
              onChange={handleThemeChange}
              label="Theme"
              size="small"
              color="primary"
            >
              {["vs-dark", "light"].map((theme) => (
                <MenuItem key={theme} value={theme}>
                  {theme}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {/* Buttons group */}
      {buttons && (
        <div
          className="row-display inner-flex-gap full-width"
          style={{
            flexDirection: isMobileView ? "column" : "row",
          }}
        >
          {buttons}
        </div>
      )}
      <div
        className="row-display base-flex-gap flex-hz-center full-width flex-vr-center"
        style={{
          flexDirection: isMobileView ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        {/* First Editor Block */}
        <div
          className="column-display base-flex-gap"
          style={{
            width: isMobileView ? "80%" : "49%",
          }}
        >
          {firstEditorHeading && (
            <Typography variant="body2" fontSize={"inherit"}>
              {firstEditorHeading}
            </Typography>
          )}
          <CodeEditor
            language={firstEditorProps.language}
            value={firstEditorProps.value}
            onChange={firstEditorProps.onChange}
            sx={firstEditorProps.sx}
            editorOptions={editorOptions}
            theme={themeOption}
            handleEditorDidMount={firstEditorProps.handleEditorDidMount}
          />
        </div>

        {/* Second Editor Block */}
        <div
          className="column-display base-flex-gap"
          style={{
            width: isMobileView ? "80%" : "49%",
          }}
        >
          {secondEditorHeading && (
            <Typography variant="body2" fontSize={"inherit"}>
              {secondEditorHeading}
            </Typography>
          )}
          <CodeEditor
            language={secondEditorProps.language}
            value={secondEditorProps.value}
            onChange={secondEditorProps.onChange}
            sx={secondEditorProps.sx}
            editorOptions={editorOptions}
            theme={themeOption}
            handleEditorDidMount={secondEditorProps.handleEditorDidMount}
          />
        </div>
      </div>
    </div>
  );
}
