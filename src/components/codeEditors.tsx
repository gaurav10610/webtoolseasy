import {
  CodeEditor,
  CodeEditorProps,
  CodeEditorPropsV2,
  CodeEditorV2,
  DiffEditor,
  DiffEditorProps,
} from "./lib/editor";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { editor } from "monaco-editor";

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
  const [editorOptions, setEditorOptions] =
    useState<editor.IStandaloneEditorConstructionOptions>({
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
    <div className="flex flex-col gap-2 items-center w-full">
      {/* Editor Options */}
      {showEditorOptions && (
        <div className="flex flex-col md:flex-row gap-2 w-full">
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
        <div className="flex flex-col md:flex-row gap-2 w-full">{buttons}</div>
      )}
      <div className="flex flex-col md:flex-row gap-2 justify-between w-full items-center">
        {/* First Editor Block */}
        <SingleCodeEditorWithHeader
          codeEditorProps={firstEditorProps}
          editorHeading={firstEditorHeading}
          themeOption={themeOption}
          editorOptions={editorOptions}
          className="w-[80%] md:w-full"
        />

        {/* Second Editor Block */}
        <SingleCodeEditorWithHeader
          codeEditorProps={secondEditorProps}
          editorHeading={secondEditorHeading}
          themeOption={themeOption}
          editorOptions={editorOptions}
          className="w-[80%] md:w-full"
        />
      </div>
    </div>
  );
}

export function SingleCodeEditorWithHeader({
  editorHeading,
  codeEditorProps,
  themeOption,
  editorOptions = {},
  className = "",
}: Readonly<{
  editorHeading?: string;
  codeEditorProps: CodeEditorProps;
  themeOption: string;
  editorOptions?: editor.IStandaloneEditorConstructionOptions;
  className?: string;
}>) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {editorHeading && (
        <Typography variant="body2" fontSize={"inherit"} color="primary">
          {editorHeading}
        </Typography>
      )}
      <CodeEditor
        language={codeEditorProps.language}
        value={codeEditorProps.value}
        onChange={codeEditorProps.onChange}
        sx={codeEditorProps.sx}
        editorOptions={{
          ...editorOptions,
          ...(codeEditorProps.editorOptions || {}),
        }}
        theme={themeOption}
        handleEditorDidMount={codeEditorProps.handleEditorDidMount}
        className={codeEditorProps.className}
      />
    </div>
  );
}

export function SingleCodeEditorWithHeaderV2({
  editorHeading,
  codeEditorProps,
  themeOption,
  editorOptions = {},
  className = "",
}: Readonly<{
  editorHeading?: string;
  codeEditorProps: CodeEditorPropsV2;
  themeOption: string;
  editorOptions?: editor.IStandaloneEditorConstructionOptions;
  className?: string;
}>) {
  return (
    <div className={`flex flex-col gap-2 w-full h-full ${className}`}>
      {editorHeading && (
        <Typography variant="body2" fontSize={"inherit"} color="primary">
          {editorHeading}
        </Typography>
      )}
      <CodeEditorV2
        language={codeEditorProps.language}
        value={codeEditorProps.value}
        onChange={codeEditorProps.onChange}
        className={codeEditorProps.className}
        editorOptions={{
          ...editorOptions,
          ...(codeEditorProps.editorOptions || {}),
        }}
        theme={themeOption}
        handleEditorDidMount={codeEditorProps.handleEditorDidMount}
      />
    </div>
  );
}

export function DiffEditorsWithHeader({
  firstTextHeading,
  secondTextHeading,
  className = "",
  diffEditorProps,
  editorOptions = {},
  themeOption,
}: Readonly<{
  firstTextHeading: string;
  secondTextHeading: string;
  className?: string;
  diffEditorProps: DiffEditorProps;
  editorOptions?: editor.IStandaloneDiffEditorConstructionOptions;
  themeOption: string;
}>) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="w-full flex flex-row justify-around">
        <Typography variant="body2" fontSize={"inherit"} color="primary">
          {firstTextHeading}
        </Typography>
        <Typography variant="body2" fontSize={"inherit"} color="primary">
          {secondTextHeading}
        </Typography>
      </div>
      <DiffEditor
        language={diffEditorProps.language}
        value={diffEditorProps.value}
        onChange={diffEditorProps.onChange}
        className={diffEditorProps.className}
        original={diffEditorProps.original}
        theme={themeOption}
        editorOptions={{
          ...editorOptions,
          ...(diffEditorProps.editorOptions || {}),
        }}
      />
    </div>
  );
}
