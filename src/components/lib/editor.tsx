import Editor, { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";
import { editor } from "monaco-editor";

export interface DiffEditorProps {
  original: string;
  language: string;
  theme?: string;
  value: string;
  editorOptions?: editor.IStandaloneDiffEditorConstructionOptions;
  onChange?: (newValue: string, event: unknown) => void;
}

export interface CodeEditorPropsV2 {
  language: string;
  theme?: string;
  value: string;
  onChange?: (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ) => void;
  editorOptions?: editor.IStandaloneEditorConstructionOptions;
  handleEditorDidMount?: (editor: editor.IStandaloneCodeEditor | null) => void;
  className?: string;
}

export const CodeEditorV2: React.FC<CodeEditorPropsV2> = ({
  language,
  theme = "vs-dark",
  value,
  onChange,
  editorOptions = {},
  handleEditorDidMount,
}) => {
  const defaultEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    selectOnLineNumbers: true,
    fontSize: 16,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
  };

  return (
    <div className="h-full w-full">
      <Editor
        width="100%"
        height="100%"
        language={language}
        theme={theme}
        value={value}
        options={{
          ...defaultEditorOptions,
          ...editorOptions,
        }}
        {...(onChange && { onChange })}
        {...(handleEditorDidMount && { editorDidMount: handleEditorDidMount })}
      />
    </div>
  );
};

export const DiffEditor: React.FC<DiffEditorProps> = ({
  value,
  original,
  editorOptions = {},
  language,
  onChange,
  theme = "vs-dark",
}) => {
  const defaultEditorOptions: editor.IStandaloneDiffEditorConstructionOptions =
    {
      selectOnLineNumbers: true,
      fontSize: 16,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      useInlineViewWhenSpaceIsLimited: false,
      originalEditable: true,
    };

  return (
    <div className="h-full w-full border-2 border-gray-300">
      <MonacoDiffEditor
        width="100%"
        height="100%"
        modified={value}
        language={language}
        original={original}
        theme={theme}
        options={{
          ...defaultEditorOptions,
          ...editorOptions,
          automaticLayout: true,
        }}
        {...(onChange && { onChange })}
      />
    </div>
  );
};
