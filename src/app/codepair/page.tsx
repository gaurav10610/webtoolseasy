"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import {
  CodePairClient,
  CodePairStatus,
  RemoteCursorState,
} from "@/lib/codepair/codePairClient";
import { P2PPersistence } from "@/lib/p2p/p2pState";
import { P2PConnectionHeader } from "@/components/p2p/P2PConnectionHeader";
import {
  SupportedLanguageId,
  LanguageInfo,
  LANGUAGE_REGISTRY,
  CODEPAIR_TEMPLATES,
  executeCodeInBrowser,
  ExecutionResult,
} from "@/lib/codepair/compilerEngine";
import type { editor } from "monaco-editor";

// Dynamically load Monaco Editor with zero SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-slate-950 flex flex-col items-center justify-center text-slate-400 font-mono text-sm space-y-3">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <div>Loading CodePair IDE...</div>
    </div>
  ),
});

// Dynamically load MarkdownRenderer with zero SSR
const MarkdownRenderer = dynamic(
  () => import("@/components/MarkdownRenderer").then((m) => m.MarkdownRenderer),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 text-slate-400 font-mono text-xs">Loading Markdown preview...</div>
    ),
  }
);

function CodePairContent() {
  const searchParams = useSearchParams();

  // Core connection state
  const [roomId, setRoomId] = useState<string>("");
  const [joinInput, setJoinInput] = useState<string>("");
  const [status, setStatus] = useState<CodePairStatus>("disconnected");
  const [isRestoredSession, setIsRestoredSession] = useState<boolean>(false);
  const [partner, setPartner] = useState<{
    peerId: string;
    username: string;
    color: string;
  } | null>(null);

  // Editor state
  const [language, setLanguage] = useState<SupportedLanguageId>("javascript");
  const [code, setCode] = useState<string>(CODEPAIR_TEMPLATES.javascript);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [copyFeedback, setCopyFeedback] = useState<string>("");

  // Compiler & Execution State
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compilerStatus, setCompilerStatus] = useState<string>("");
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [activeOutputTab, setActiveOutputTab] = useState<"output" | "tables" | "preview">("output");
  const [activeSqlTableIndex, setActiveSqlTableIndex] = useState<number>(0);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Refs
  const clientRef = useRef<CodePairClient | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);
  const docVersionRef = useRef<number>(1);
  const isRemoteChangeRef = useRef<boolean>(false);
  const remoteDecorationsRef = useRef<string[]>([]);
  const codeRef = useRef<string>(code);
  const languageRef = useRef<SupportedLanguageId>(language);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  // Connect to room and sync state
  const connectToRoom = useCallback(
    (targetRoomId: string) => {
      const codeClean = targetRoomId.toUpperCase().trim();
      if (!codeClean) return;

      if (
        clientRef.current &&
        clientRef.current.roomId === codeClean &&
        clientRef.current.status !== "disconnected" &&
        clientRef.current.status !== "error"
      ) {
        return;
      }

      if (clientRef.current) {
        clientRef.current.leaveRoom();
      }

      const client = new CodePairClient(undefined, undefined, {
        onStatusChange: (s) => setStatus(s),
        onPeerConnected: (peer) => {
          setPartner(peer);
          setCopyFeedback(`Collaborator connected: ${peer.username}!`);
          setTimeout(() => setCopyFeedback(""), 4000);
        },
        onPeerDisconnected: () => {
          setPartner(null);
          if (editorRef.current) {
            remoteDecorationsRef.current = editorRef.current.deltaDecorations(
              remoteDecorationsRef.current,
              []
            );
          }
        },
        onDocSyncRequired: () => ({
          code: editorRef.current ? editorRef.current.getValue() : codeRef.current,
          language: languageRef.current,
          version: docVersionRef.current,
        }),
        onRemoteCodeChange: (newCode, version) => {
          docVersionRef.current = Math.max(docVersionRef.current, version);
          if (editorRef.current && editorRef.current.getValue() !== newCode) {
            isRemoteChangeRef.current = true;
            const model = editorRef.current.getModel();
            if (model) {
              const currentPosition = editorRef.current.getPosition();
              const selections = editorRef.current.getSelections();

              editorRef.current.executeEdits("remote-peer", [
                {
                  range: model.getFullModelRange(),
                  text: newCode,
                  forceMoveMarkers: true,
                },
              ]);

              if (currentPosition) {
                editorRef.current.setPosition(currentPosition);
              }
              if (selections) {
                editorRef.current.setSelections(selections);
              }
            } else {
              editorRef.current.setValue(newCode);
            }
            setCode(newCode);
            P2PPersistence.saveState("codepair_code", newCode);
            isRemoteChangeRef.current = false;
          }
        },
        onRemoteLanguageChange: (newLang) => {
          const validLang = newLang as SupportedLanguageId;
          setLanguage(validLang);
          P2PPersistence.saveState("codepair_language", validLang);

          // Synchronize output tab for previewable languages
          if (validLang === "html" || validLang === "markdown") {
            setActiveOutputTab("preview");
            setShowPreview(true);
          } else if (validLang === "sql") {
            setActiveOutputTab("tables");
          } else {
            setActiveOutputTab("output");
          }
        },
        onRemoteCursor: (cursor) => {
          renderRemoteCursor(cursor);
        },
        onError: (err) => {
          console.warn("CodePair warning:", err);
        },
      });

      clientRef.current = client;
      setRoomId(codeClean);

      P2PPersistence.saveSession("codepair", {
        roomId: codeClean,
        metadata: { language: languageRef.current },
      });
      P2PPersistence.syncUrl({ room: codeClean });

      client.joinRoom(codeClean);
    },
    []
  );

  // Render remote partner's cursor & selection using Monaco deltaDecorations
  const renderRemoteCursor = (cursor: RemoteCursorState) => {
    if (!editorRef.current || !monacoRef.current) return;

    const monaco = monacoRef.current;
    const newDecorations: editor.IModelDeltaDecoration[] = [];

    newDecorations.push({
      range: new monaco.Range(cursor.line, cursor.column, cursor.line, cursor.column),
      options: {
        className: "codepair-remote-cursor",
        hoverMessage: { value: `**${cursor.username}**` },
        isWholeLine: false,
        zIndex: 10,
      },
    });

    if (cursor.selection) {
      newDecorations.push({
        range: new monaco.Range(
          cursor.selection.startLine,
          cursor.selection.startColumn,
          cursor.selection.endLine,
          cursor.selection.endColumn
        ),
        options: {
          className: "codepair-remote-selection",
          isWholeLine: false,
          zIndex: 5,
        },
      });
    }

    remoteDecorationsRef.current = editorRef.current.deltaDecorations(
      remoteDecorationsRef.current,
      newDecorations
    );
  };

  // Restore State from Browser Memory & Handle URL on Initial Mount
  useEffect(() => {
    const savedCode = P2PPersistence.loadState<string>("codepair_code");
    const savedLang = P2PPersistence.loadState<SupportedLanguageId>("codepair_language");
    const savedTheme = P2PPersistence.loadState<"vs-dark" | "light">("codepair_theme");

    if (savedLang && LANGUAGE_REGISTRY.some((l) => l.id === savedLang)) {
      setLanguage(savedLang);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedCode) {
      setCode(savedCode);
      setIsRestoredSession(true);
    }

    const params = new URLSearchParams(window.location.search);
    const urlRoom = params.get("room");
    const savedSession = P2PPersistence.loadSession("codepair");

    const targetRoom = urlRoom || savedSession?.roomId || "";
    if (targetRoom) {
      if (!urlRoom && savedSession?.roomId) {
        setIsRestoredSession(true);
      }
      connectToRoom(targetRoom);
    }

    const handleBeforeUnload = () => {
      if (codeRef.current) {
        P2PPersistence.saveState("codepair_code", codeRef.current);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clientRef.current?.leaveRoom();
    };
  }, [connectToRoom]);

  // Handle local text edits inside Monaco
  const handleEditorChange = (value: string | undefined) => {
    const nextCode = value ?? "";
    setCode(nextCode);

    P2PPersistence.saveState("codepair_code", nextCode);

    if (isRemoteChangeRef.current) return;

    docVersionRef.current += 1;
    if (clientRef.current && clientRef.current.status === "connected") {
      clientRef.current.broadcastCodeChange(nextCode, docVersionRef.current);
    }
  };

  // Handle editor mount & attach cursor/selection listeners
  const handleEditorDidMount = (
    editorInstance: editor.IStandaloneCodeEditor,
    monaco: typeof import("monaco-editor")
  ) => {
    editorRef.current = editorInstance;
    monacoRef.current = monaco;

    editorInstance.onDidChangeCursorPosition((e) => {
      if (!clientRef.current || clientRef.current.status !== "connected") return;
      const selection = editorInstance.getSelection();

      clientRef.current.broadcastCursor({
        peerId: clientRef.current.peerId,
        username: clientRef.current.username,
        color: clientRef.current.userColor,
        line: e.position.lineNumber,
        column: e.position.column,
        selection: selection
          ? {
              startLine: selection.startLineNumber,
              startColumn: selection.startColumn,
              endLine: selection.endLineNumber,
              endColumn: selection.endColumn,
            }
          : null,
      });
    });
  };

  // Language switcher
  const handleLanguageChange = (newLang: SupportedLanguageId) => {
    const prevLang = language;
    setLanguage(newLang);
    P2PPersistence.saveState("codepair_language", newLang);

    // If editor has the template of previous language or is blank, switch to the new template
    const isPreviousTemplate = !code.trim() || code === CODEPAIR_TEMPLATES[prevLang];
    if (isPreviousTemplate && CODEPAIR_TEMPLATES[newLang]) {
      const template = CODEPAIR_TEMPLATES[newLang];
      setCode(template);
      editorRef.current?.setValue(template);
      P2PPersistence.saveState("codepair_code", template);
    }

    // Default right pane tab depending on language
    if (newLang === "html" || newLang === "markdown") {
      setActiveOutputTab("preview");
      setShowPreview(true);
    } else if (newLang === "sql") {
      setActiveOutputTab("tables");
    } else {
      setActiveOutputTab("output");
    }

    if (clientRef.current && clientRef.current.status === "connected") {
      clientRef.current.broadcastLanguageChange(newLang);
    }
  };

  // Reset to default template
  const handleResetTemplate = () => {
    const template = CODEPAIR_TEMPLATES[language] || CODEPAIR_TEMPLATES.javascript;
    setCode(template);
    editorRef.current?.setValue(template);
    P2PPersistence.saveState("codepair_code", template);
    setIsRestoredSession(false);
    setExecutionResult(null);
  };

  // Create new room
  const handleCreateRoom = () => {
    const newCode = CodePairClient.generateRoomCode();
    connectToRoom(newCode);
  };

  // Leave room
  const handleLeaveRoom = () => {
    clientRef.current?.leaveRoom();
    setRoomId("");
    setPartner(null);
    setStatus("disconnected");
    P2PPersistence.clearSession("codepair");
    P2PPersistence.syncUrl({ room: null });
  };

  // In-Browser Code Execution Handler
  const handleRunCode = async () => {
    setIsCompiling(true);
    setCompilerStatus("Initializing execution engine...");
    setShowPreview(true);

    try {
      const result = await executeCodeInBrowser(language, code, (statusMsg) => {
        setCompilerStatus(statusMsg);
      });

      setExecutionResult(result);

      if (language === "sql" && result.sqlTables && result.sqlTables.length > 0) {
        setActiveOutputTab("tables");
        setActiveSqlTableIndex(0);
      } else if (language === "html" || language === "markdown") {
        setActiveOutputTab("preview");
      } else {
        setActiveOutputTab("output");
      }
    } catch (err) {
      console.error("Execution error:", err);
    } finally {
      setIsCompiling(false);
      setCompilerStatus("");
    }
  };

  // 1-Click Code Formatter / Beautifier
  const handleFormatCode = () => {
    try {
      if (language === "json") {
        const parsed = JSON.parse(code);
        const formatted = JSON.stringify(parsed, null, 2);
        setCode(formatted);
        editorRef.current?.setValue(formatted);
        P2PPersistence.saveState("codepair_code", formatted);
        setCopyFeedback("Formatted JSON with 2-space indentation");
        setTimeout(() => setCopyFeedback(""), 2500);
      } else if (editorRef.current) {
        editorRef.current.getAction("editor.action.formatDocument")?.run();
        setCopyFeedback("Auto-formatted code structure");
        setTimeout(() => setCopyFeedback(""), 2500);
      }
    } catch {
      setCopyFeedback("Could not format: please fix syntax errors first");
      setTimeout(() => setCopyFeedback(""), 3000);
    }
  };

  // Minify JSON
  const handleMinifyJson = () => {
    try {
      const parsed = JSON.parse(code);
      const minified = JSON.stringify(parsed);
      setCode(minified);
      editorRef.current?.setValue(minified);
      P2PPersistence.saveState("codepair_code", minified);
      setCopyFeedback("Minified JSON to compact single-line");
      setTimeout(() => setCopyFeedback(""), 2500);
    } catch {
      setCopyFeedback("Invalid JSON syntax");
      setTimeout(() => setCopyFeedback(""), 3000);
    }
  };

  const currentLangInfo = LANGUAGE_REGISTRY.find((l) => l.id === language);
  const isRunnable = Boolean(currentLangInfo?.canExecute);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Dynamic Cursor CSS */}
      <style jsx global>{`
        .codepair-remote-cursor {
          border-left: 2px solid ${partner?.color || "#3b82f6"};
          animation: blink 1s step-end infinite;
          margin-left: -1px;
        }
        .codepair-remote-selection {
          background-color: ${partner?.color ? `${partner.color}33` : "rgba(59, 130, 246, 0.25)"};
        }
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: ${partner?.color || "#3b82f6"} }
        }
      `}</style>

      {/* Uniform P2P Connection Header - Visible At All Times */}
      <P2PConnectionHeader
        appName="CodePair"
        appBadge="IDE"
        appIcon={<span>⚡</span>}
        status={status}
        roomId={roomId}
        peerName={partner?.username}
        peerDetails={partner ? "Collaborator" : undefined}
        isRestoredSession={isRestoredSession}
        onNewRoom={handleCreateRoom}
        onLeaveRoom={handleLeaveRoom}
        onReconnect={() => roomId && connectToRoom(roomId)}
        shareUrl={
          typeof window !== "undefined" && roomId
            ? `${window.location.origin}/codepair?room=${roomId}`
            : undefined
        }
      >
        {/* Comprehensive Language Selector with Categories */}
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguageId)}
          className="px-2.5 py-1 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-md text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer font-medium"
        >
          <optgroup label="Web & Scripting (In-Browser Compilers)">
            {LANGUAGE_REGISTRY.filter((l) => l.category === "Web & Scripting").map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.icon} {lang.name} {lang.canExecute ? "▶" : ""}
              </option>
            ))}
          </optgroup>
          <optgroup label="Data, Query & Markup">
            {LANGUAGE_REGISTRY.filter((l) => l.category === "Data & Markup").map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.icon} {lang.name} {lang.canExecute ? "⚡" : ""}
              </option>
            ))}
          </optgroup>
          <optgroup label="Systems & Backend">
            {LANGUAGE_REGISTRY.filter((l) => l.category === "Systems & Backend").map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.icon} {lang.name}
              </option>
            ))}
          </optgroup>
        </select>

        {/* Theme Selector */}
        <button
          type="button"
          onClick={() => {
            const nextTheme = theme === "vs-dark" ? "light" : "vs-dark";
            setTheme(nextTheme);
            P2PPersistence.saveState("codepair_theme", nextTheme);
          }}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs cursor-pointer transition"
          title="Toggle Editor Theme"
        >
          {theme === "vs-dark" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* In-Browser Run Button */}
        {isRunnable && (
          <button
            type="button"
            onClick={handleRunCode}
            disabled={isCompiling}
            className={`px-3 py-1 text-white font-medium rounded-md shadow-xs transition flex items-center gap-1.5 cursor-pointer text-xs ${
              isCompiling
                ? "bg-amber-600 animate-pulse"
                : language === "sql"
                ? "bg-indigo-600 hover:bg-indigo-500"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
            title={`Compile and execute ${currentLangInfo?.name} in browser WebAssembly / Sandbox`}
          >
            {isCompiling ? (
              <>
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Compiling...</span>
              </>
            ) : language === "sql" ? (
              <>
                <span>⚡</span>
                <span>Run Query</span>
              </>
            ) : (
              <>
                <span>▶</span>
                <span>Run Code</span>
              </>
            )}
          </button>
        )}

        {/* JSON Specific Tools */}
        {language === "json" && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleFormatCode}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-md transition cursor-pointer"
              title="Format JSON with 2-space indentation"
            >
              Format
            </button>
            <button
              type="button"
              onClick={handleMinifyJson}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-md transition cursor-pointer"
              title="Minify JSON"
            >
              Minify
            </button>
          </div>
        )}

        {/* Output / Preview Pane Toggle */}
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`px-2.5 py-1 rounded-md text-xs transition cursor-pointer flex items-center gap-1 ${
            showPreview
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
          title="Toggle Output and Live Sandbox Pane"
        >
          <span>👁️</span>
          <span>{language === "html" || language === "markdown" ? "Live Preview" : "Output Pane"}</span>
        </button>

        {/* Reset Template Option */}
        <button
          type="button"
          onClick={handleResetTemplate}
          className="px-2 py-1 text-slate-400 hover:text-slate-200 text-xs transition cursor-pointer"
          title="Reset to default language starter template"
        >
          Reset
        </button>
      </P2PConnectionHeader>

      {/* Compiler Status Notification Banner */}
      {compilerStatus && (
        <div className="bg-amber-600/90 text-white text-xs py-1 px-4 flex items-center justify-center gap-2 animate-pulse font-mono">
          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{compilerStatus}</span>
        </div>
      )}

      {/* When no room is active: Quick Join & Create Banner */}
      {!roomId && (
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span>You are currently in solo mode.</span>
            <span className="text-slate-500">•</span>
            <span>All edits & compiler settings are automatically preserved in browser memory.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateRoom}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-xs transition cursor-pointer"
            >
              + Start Collaborative Room
            </button>
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Enter Room Code"
                value={joinInput}
                onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                className="px-2.5 py-1 bg-slate-950 border border-slate-700 rounded-md text-center font-mono uppercase tracking-wider text-xs focus:ring-1 focus:ring-blue-500 outline-none w-32"
                maxLength={12}
              />
              <button
                onClick={() => connectToRoom(joinInput)}
                disabled={!joinInput.trim()}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md disabled:opacity-40 transition cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Feedback Banner */}
      {copyFeedback && (
        <div className="bg-blue-600/90 text-white text-xs py-1.5 px-4 text-center font-medium animate-in fade-in duration-200">
          {copyFeedback}
        </div>
      )}

      {/* Main Workspace (Monaco Editor + Live Output / Sandbox) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Monaco Code Editor Pane */}
        <div className={`flex-1 h-full min-h-0 relative ${showPreview ? "md:w-1/2" : "w-full"}`}>
          <MonacoEditor
            height="100%"
            language={language}
            value={code}
            theme={theme}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              lineNumbers: "on",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              folding: true,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              formatOnPaste: true,
            }}
          />
        </div>

        {/* Live Preview / Output Pane */}
        {showPreview && (
          <div className="w-full md:w-1/2 h-full min-h-0 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col">
            {/* Output Header Tabs */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/95 border-b border-slate-800 text-[11px] font-mono text-slate-400 shrink-0">
              <div className="flex items-center gap-1.5">
                {/* Preview Tab (for HTML & Markdown) */}
                {(language === "html" || language === "markdown") && (
                  <button
                    type="button"
                    onClick={() => setActiveOutputTab("preview")}
                    className={`px-2.5 py-1 rounded transition cursor-pointer font-medium ${
                      activeOutputTab === "preview"
                        ? "bg-slate-800 text-blue-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    👁️ {language === "html" ? "DOM Preview" : "Rendered Markdown"}
                  </button>
                )}

                {/* Console Output Tab */}
                <button
                  type="button"
                  onClick={() => setActiveOutputTab("output")}
                  className={`px-2.5 py-1 rounded transition cursor-pointer font-medium ${
                    activeOutputTab === "output"
                      ? "bg-slate-800 text-blue-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  📟 Terminal Output
                  {executionResult?.logs && executionResult.logs.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-slate-700 rounded-full text-[10px]">
                      {executionResult.logs.length}
                    </span>
                  )}
                </button>

                {/* SQL Result Tables Tab */}
                {language === "sql" && (
                  <button
                    type="button"
                    onClick={() => setActiveOutputTab("tables")}
                    className={`px-2.5 py-1 rounded transition cursor-pointer font-medium ${
                      activeOutputTab === "tables"
                        ? "bg-slate-800 text-indigo-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    🗄️ Query Results
                    {executionResult?.sqlTables && executionResult.sqlTables.length > 0 && (
                      <span className="ml-1.5 px-1.5 py-0.2 bg-indigo-900/80 text-indigo-200 rounded-full text-[10px]">
                        {executionResult.sqlTables.length}
                      </span>
                    )}
                  </button>
                )}
              </div>

              {/* Execution Latency & Actions */}
              <div className="flex items-center gap-2">
                {executionResult?.executionTimeMs !== undefined && (
                  <span className="text-[10px] text-emerald-400 font-medium">
                    ⚡ {executionResult.executionTimeMs}ms
                  </span>
                )}
                {language === "html" && activeOutputTab === "preview" && (
                  <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("desktop")}
                      className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${
                        previewDevice === "desktop" ? "bg-blue-600 text-white" : "text-slate-400"
                      }`}
                      title="Desktop view"
                    >
                      🖥️
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("mobile")}
                      className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${
                        previewDevice === "mobile" ? "bg-blue-600 text-white" : "text-slate-400"
                      }`}
                      title="Mobile view (375px)"
                    >
                      📱
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setExecutionResult(null)}
                  className="hover:text-slate-200 text-slate-500 cursor-pointer ml-1 text-xs"
                  title="Clear output"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 h-full min-h-0 bg-slate-950 overflow-auto relative">
              {/* TAB 1: HTML LIVE PREVIEW */}
              {activeOutputTab === "preview" && language === "html" && (
                <div
                  className={`h-full mx-auto transition-all duration-200 bg-white ${
                    previewDevice === "mobile"
                      ? "max-w-[375px] shadow-2xl border-x border-slate-700"
                      : "w-full"
                  }`}
                >
                  <iframe
                    title="CodePair Live HTML Preview"
                    srcDoc={code}
                    sandbox="allow-scripts allow-modals"
                    className="w-full h-full border-none"
                  />
                </div>
              )}

              {/* TAB 2: MARKDOWN LIVE PREVIEW */}
              {activeOutputTab === "preview" && language === "markdown" && (
                <div className="p-6 h-full overflow-y-auto text-slate-200 prose prose-invert prose-sm max-w-none">
                  <MarkdownRenderer content={code} />
                </div>
              )}

              {/* TAB 3: SQL TABLES VIEWER */}
              {activeOutputTab === "tables" && language === "sql" && (
                <div className="p-4 h-full flex flex-col space-y-3 font-mono text-xs">
                  {executionResult?.sqlTables && executionResult.sqlTables.length > 0 ? (
                    <>
                      {/* Multiple Tables Selector */}
                      {executionResult.sqlTables.length > 1 && (
                        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                          {executionResult.sqlTables.map((tbl, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setActiveSqlTableIndex(i)}
                              className={`px-2.5 py-1 rounded text-[11px] cursor-pointer font-medium ${
                                activeSqlTableIndex === i
                                  ? "bg-indigo-600 text-white"
                                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              Result #{i + 1} ({tbl.rowsCount} rows)
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Render Active Table */}
                      {(() => {
                        const table = executionResult.sqlTables[activeSqlTableIndex];
                        if (!table) return null;
                        return (
                          <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
                            <div className="text-[11px] text-slate-400 flex justify-between items-center">
                              <span>Showing {table.rowsCount} row(s)</span>
                              <span className="text-emerald-400">SQLite in-memory query</span>
                            </div>
                            <div className="flex-1 overflow-auto rounded-lg border border-slate-800 bg-slate-900/50">
                              <table data-testid="sql-results-table" className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-800/80 text-slate-200 text-[11px] border-b border-slate-700 sticky top-0">
                                    <th className="py-2 px-3 text-slate-500 w-10 text-center">#</th>
                                    {table.columns.map((col, idx) => (
                                      <th key={idx} className="py-2 px-3 font-semibold">
                                        {col}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {table.values.length === 0 ? (
                                    <tr>
                                      <td
                                        colSpan={table.columns.length + 1}
                                        className="py-6 text-center text-slate-500 text-xs"
                                      >
                                        Query returned 0 rows.
                                      </td>
                                    </tr>
                                  ) : (
                                    table.values.map((row, rIdx) => (
                                      <tr
                                        key={rIdx}
                                        className="border-b border-slate-800/60 hover:bg-slate-800/40 text-slate-300 text-xs"
                                      >
                                        <td className="py-1.5 px-3 text-slate-600 text-center text-[10px]">
                                          {rIdx + 1}
                                        </td>
                                        {row.map((cell, cIdx) => (
                                          <td key={cIdx} className="py-1.5 px-3 whitespace-nowrap">
                                            {cell === null ? (
                                              <span className="text-slate-600 italic">NULL</span>
                                            ) : (
                                              String(cell)
                                            )}
                                          </td>
                                        ))}
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })()}
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-2">
                      <div className="text-3xl">🗄️</div>
                      <div className="font-semibold text-slate-300">SQLite WebAssembly Database Ready</div>
                      <p className="text-xs text-slate-500 max-w-xs text-center">
                        Click <span className="text-indigo-400 font-bold">⚡ Run Query</span> to create tables, insert data, and query in-memory database.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: TERMINAL OUTPUT CONSOLE (JS, TS, Python, Lua, JSON, etc.) */}
              {activeOutputTab === "output" && (
                <div data-testid="codepair-terminal" className="p-4 h-full flex flex-col font-mono text-xs overflow-y-auto space-y-1.5">
                  {executionResult?.logs && executionResult.logs.length > 0 ? (
                    executionResult.logs.map((log, idx) => (
                      <div
                        key={idx}
                        className={`leading-relaxed flex items-start gap-2 ${
                          log.type === "error"
                            ? "text-rose-400 bg-rose-950/20 px-2 py-1 rounded border-l-2 border-rose-500"
                            : log.type === "warn"
                            ? "text-amber-400 bg-amber-950/20 px-2 py-1 rounded border-l-2 border-amber-500"
                            : log.type === "info"
                            ? "text-sky-300 bg-sky-950/20 px-2 py-1 rounded"
                            : "text-slate-300"
                        }`}
                      >
                        <span className="opacity-40 select-none shrink-0 font-bold">›</span>
                        <span className="whitespace-pre-wrap break-words">{log.text}</span>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 p-6 text-center">
                      <div className="text-3xl">{currentLangInfo?.icon || "💻"}</div>
                      <div className="font-semibold text-slate-200 text-sm">
                        {currentLangInfo?.name} Workspace
                      </div>
                      <p className="text-xs text-slate-400 max-w-sm">
                        {isRunnable ? (
                          <>
                            Powered by <span className="text-emerald-400 font-semibold">{currentLangInfo?.engineName}</span>. Click{" "}
                            <span className="text-emerald-400 font-bold">▶ Run Code</span> to compile and execute directly inside your browser.
                          </>
                        ) : (
                          <>
                            Full syntax highlighting and zero-cloud multi-cursor pair programming active.
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status & Privacy Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="text-emerald-500">●</span> 100% P2P WebRTC DataChannel
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline">Zero Cloud Code Storage</span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:inline text-slate-400">
            Engine: {currentLangInfo?.engineName || "Client-Side"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span>Lang: {currentLangInfo?.name || language}</span>
          <span>•</span>
          <span>Lines: {code.split("\n").length}</span>
        </div>
      </div>
    </div>
  );
}

export default function CodePairPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-slate-950 text-slate-400 font-mono text-sm space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div>Loading CodePair IDE...</div>
        </div>
      }
    >
      <CodePairContent />
    </React.Suspense>
  );
}
