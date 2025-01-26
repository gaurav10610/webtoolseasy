"use client";

import MonacoEditor, { monaco, MonacoDiffEditor } from "react-monaco-editor";
import { editor } from "monaco-editor";

export interface CodeEditorProps {
  language: string;
  theme?: string;
  value: string;
  onChange?: (value: string) => void;
  editorOptions?: editor.IStandaloneEditorConstructionOptions;
  sx?: Record<string, unknown>;
  handleEditorDidMount?: (
    editor: monaco.editor.IStandaloneCodeEditor | null
  ) => void;
}

export interface DiffEditorProps {
  original: string;
  language: string;
  theme?: string;
  value: string;
  editorOptions?: editor.IStandaloneDiffEditorConstructionOptions;
  onChange?: (newValue: string, event: unknown) => void;
  classes?: string;
}

export interface CodeEditorPropsV2 {
  language: string;
  theme?: string;
  value: string;
  onChange?: (value: string) => void;
  editorOptions?: editor.IStandaloneEditorConstructionOptions;
  classes?: string;
  handleEditorDidMount?: (
    editor: monaco.editor.IStandaloneCodeEditor | null
  ) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  theme = "vs-dark",
  value,
  onChange,
  editorOptions = {},
  sx = {},
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
    <div className="full-width" style={sx}>
      <MonacoEditor
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

export const CodeEditorV2: React.FC<CodeEditorPropsV2> = ({
  language,
  theme = "vs-dark",
  value,
  onChange,
  editorOptions = {},
  classes = "",
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
    <div className={`w-full h-full ${classes}`}>
      <MonacoEditor
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
  classes = "",
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
    <div className={`w-full h-full ${classes}`}>
      <MonacoDiffEditor
        width="100%"
        height="100%"
        value={value}
        language={language}
        original={original}
        theme={theme}
        options={{
          ...defaultEditorOptions,
          ...editorOptions,
        }}
        {...(onChange && { onChange })}
      />
    </div>
  );
};
