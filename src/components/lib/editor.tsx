import Editor, { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";
import { useCallback, useEffect, useRef } from "react";
import { editor } from "monaco-editor";

export interface DiffEditorProps {
  original: string;
  language: string;
  theme?: string;
  value: string;
  editorOptions?: editor.IStandaloneDiffEditorConstructionOptions;
  onChange?: (newValue: string) => void;
}

export interface CodeEditorPropsV2 {
  language: string;
  theme?: string;
  value: string;
  onChange?: (value: string) => void;
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
  className = "w-full h-full",
}) => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const triggerLayout = useCallback(() => {
    if (!editorInstanceRef.current) {
      return;
    }

    // Pass explicit pixel dimensions to Monaco so it correctly fills its container
    // even when the container's height is determined via CSS flexbox (flex-1 / h-full).
    // A plain layout() call can mis-report height when the parent uses flex sizing.
    const doLayout = () => {
      const container = editorContainerRef.current;
      const editorInstance = editorInstanceRef.current;
      if (!container || !editorInstance) return;
      const { offsetWidth, offsetHeight } = container;
      if (offsetWidth > 0 && offsetHeight > 0) {
        editorInstance.layout({ width: offsetWidth, height: offsetHeight });
      } else {
        editorInstance.layout();
      }
    };

    requestAnimationFrame(() => {
      doLayout();
      // Second pass after a short delay handles fullscreen/animation transitions
      // where the container size is still animating when the first rAF fires.
      setTimeout(doLayout, 100);
    });
  }, []);

  useEffect(() => {
    const container = editorContainerRef.current;
    if (!container) {
      return;
    }

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => triggerLayout())
        : null;

    resizeObserver?.observe(container);
    window.addEventListener("resize", triggerLayout);
    document.addEventListener("fullscreenchange", triggerLayout);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", triggerLayout);
      document.removeEventListener("fullscreenchange", triggerLayout);
    };
  }, [triggerLayout]);

  const defaultEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    selectOnLineNumbers: true,
    fontSize: 16,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
  };

  const handleMount = useCallback(
    (mountedEditor: editor.IStandaloneCodeEditor | null) => {
      editorInstanceRef.current = mountedEditor;
      triggerLayout();
      handleEditorDidMount?.(mountedEditor);
    },
    [handleEditorDidMount, triggerLayout],
  );

  return (
    <div ref={editorContainerRef} className={`min-h-0 ${className}`}>
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
        {...(onChange && {
          onChange: (value: string | undefined) => {
            onChange(value ? (value as string) : "");
          },
        })}
        onMount={handleMount}
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
    <div className="w-full h-full min-h-[320px] overflow-hidden border-2 border-gray-300">
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
