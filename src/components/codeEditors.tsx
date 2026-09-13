import {
  CodeEditorPropsV2,
  CodeEditorV2,
  DiffEditor,
  DiffEditorProps,
} from "./lib/editor";
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
    <div
      className={`flex min-h-0 flex-col gap-2 ${
        className ? className : "h-[65vh] min-h-[320px]"
      }`}
    >
      {editorHeading && (
        <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-[var(--mui-palette-text-secondary)]">
          {editorHeading}
        </h3>
      )}
      <CodeEditorV2
        language={codeEditorProps.language}
        value={codeEditorProps.value}
        onChange={codeEditorProps.onChange}
        className={codeEditorProps.className || "flex-1 min-h-[280px]"}
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
    <div className={`flex min-h-0 flex-col gap-2 ${className}`}>
      <div className="w-full flex flex-row justify-around">
        <h3 className="text-lg md:text-xl font-semibold text-[var(--mui-palette-text-secondary)]">
          {firstTextHeading}
        </h3>
        <h3 className="text-lg md:text-xl font-semibold text-[var(--mui-palette-text-secondary)]">
          {secondTextHeading}
        </h3>
      </div>
      <div className="flex-1 min-h-[280px]">
        <DiffEditor
          language={diffEditorProps.language}
          value={diffEditorProps.value}
          onChange={diffEditorProps.onChange}
          original={diffEditorProps.original}
          theme={themeOption}
          editorOptions={{
            ...editorOptions,
            ...(diffEditorProps.editorOptions || {}),
          }}
        />
      </div>
    </div>
  );
}
