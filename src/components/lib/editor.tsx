"use client";

import MonacoEditor, { monaco } from "react-monaco-editor";

export interface CodeEditorProps {
  language: string;
  theme?: string;
  value: string;
  onChange?: (value: string) => void;
  editorOptions?: Record<string, unknown>;
  sx?: Record<string, unknown>;
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
  const defaultEditorOptions = {
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
