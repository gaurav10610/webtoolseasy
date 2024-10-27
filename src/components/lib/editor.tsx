"use client";

import MonacoEditor from "react-monaco-editor";

export function CodeEditor({
  language,
  theme = "vs-dark",
  value,
  onChange,
  editorOptions = {},
  sx = {},
}: Readonly<{
  language: string;
  theme?: string;
  value: string;
  onChange?: (value: string) => void;
  editorOptions?: Record<string, unknown>;
  sx?: Record<string, unknown>;
}>) {
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
      />
    </div>
  );
}
