import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useRef } from "react";
import type { editor } from "monaco-editor";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[280px] bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 font-mono text-sm animate-pulse">
      Loading editor...
    </div>
  ),
});

const MonacoDiffEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.DiffEditor),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[320px] bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 font-mono text-sm animate-pulse">
        Loading diff editor...
      </div>
    ),
  },
);

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
  const [monacoLoaded, setMonacoLoaded] = React.useState(false);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const activateMonaco = useCallback(() => {
    setMonacoLoaded(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const idleId = (
          window as unknown as {
            requestIdleCallback: (
              cb: () => void,
              opts?: { timeout: number },
            ) => number;
          }
        ).requestIdleCallback(
          () => {
            timer = setTimeout(() => setMonacoLoaded(true), 2500);
          },
          { timeout: 5000 },
        );
        return () => {
          (
            window as unknown as { cancelIdleCallback: (id: number) => void }
          ).cancelIdleCallback(idleId);
          clearTimeout(timer);
        };
      } else {
        timer = setTimeout(() => setMonacoLoaded(true), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const triggerLayout = useCallback(() => {
    if (!editorInstanceRef.current) {
      return;
    }

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
      setTimeout(doLayout, 100);
    });
  }, []);

  useEffect(() => {
    if (!monacoLoaded) return;
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
  }, [monacoLoaded, triggerLayout]);

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
    <div
      ref={editorContainerRef}
      className={`min-h-0 relative ${className}`}
      onClick={activateMonaco}
      onFocus={activateMonaco}
      onTouchStart={activateMonaco}
    >
      {!monacoLoaded ? (
        <div className="w-full h-full min-h-[280px] bg-[#1e1e1e] rounded-xl border border-gray-300 dark:border-slate-700 overflow-hidden flex flex-col">
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={activateMonaco}
            placeholder={`Enter or paste ${language.toUpperCase()} here...`}
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            readOnly={Boolean(editorOptions.readOnly)}
            className="w-full h-full p-4 font-mono text-sm bg-transparent text-slate-100 resize-none outline-none border-none selection:bg-sky-500/30"
          />
        </div>
      ) : (
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
            onChange: (val: string | undefined) => {
              onChange(val || "");
            },
          })}
          onMount={handleMount}
        />
      )}
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
  const [monacoLoaded, setMonacoLoaded] = React.useState(false);

  const activateMonaco = useCallback(() => {
    setMonacoLoaded(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const idleId = (
          window as unknown as {
            requestIdleCallback: (
              cb: () => void,
              opts?: { timeout: number },
            ) => number;
          }
        ).requestIdleCallback(
          () => {
            timer = setTimeout(() => setMonacoLoaded(true), 2500);
          },
          { timeout: 5000 },
        );
        return () => {
          (
            window as unknown as { cancelIdleCallback: (id: number) => void }
          ).cancelIdleCallback(idleId);
          clearTimeout(timer);
        };
      } else {
        timer = setTimeout(() => setMonacoLoaded(true), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

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
    <div
      onClick={activateMonaco}
      onFocus={activateMonaco}
      onTouchStart={activateMonaco}
      className="w-full h-full min-h-[320px] overflow-hidden border-2 border-gray-300 dark:border-slate-700 rounded-xl"
    >
      {!monacoLoaded ? (
        <div className="w-full h-full min-h-[320px] grid grid-cols-1 md:grid-cols-2 bg-[#1e1e1e] divide-y md:divide-y-0 md:divide-x divide-slate-700">
          <textarea
            value={original}
            readOnly
            placeholder="Original..."
            className="w-full h-full p-4 font-mono text-sm bg-transparent text-slate-300 resize-none outline-none border-none"
          />
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={activateMonaco}
            placeholder="Modified..."
            className="w-full h-full p-4 font-mono text-sm bg-transparent text-slate-100 resize-none outline-none border-none"
          />
        </div>
      ) : (
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
      )}
    </div>
  );
};
