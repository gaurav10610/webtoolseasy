import {
  CodeEditorPropsV2,
  CodeEditorV2,
  DiffEditor,
  DiffEditorProps,
} from "./lib/editor";
import { Typography } from "@mui/material";
import { editor } from "monaco-editor";

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
    <div className={`flex flex-col gap-2 h-full ${className}`}>
      {editorHeading && (
        <Typography
          variant="body1"
          color="textSecondary"
          className="!text-xl !font-semibold"
        >
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
        <Typography
          variant="body1"
          color="textSecondary"
          className="!text-xl !font-semibold"
        >
          {firstTextHeading}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className="!text-xl !font-semibold"
        >
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
