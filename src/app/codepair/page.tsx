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
import type { editor } from "monaco-editor";

// Dynamically load Monaco Editor with zero SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-slate-950 flex flex-col items-center justify-center text-slate-400 font-mono text-sm space-y-3">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <div>Loading CodePair Editor...</div>
    </div>
  ),
});

const DEFAULT_TEMPLATES: Record<string, string> = {
  javascript: `// Welcome to CodePair! 🚀
// 100% Zero-Cloud, Peer-to-Peer Collaborative IDE.
// Real-time multi-cursor sync directly between browsers.

function findPrimes(limit = 50) {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return primes;
}

console.log("Calculated prime numbers up to 50:");
console.log(findPrimes(50));
`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CodePair Live Preview</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #f8fafc;
    }
    .card {
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2.5rem;
      border-radius: 1.25rem;
      text-align: center;
      max-width: 440px;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
    }
    h1 { margin-top: 0; font-size: 1.75rem; color: #60a5fa; }
    p { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; }
    button {
      margin-top: 1rem;
      background: #2563eb;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    button:hover { background: #1d4ed8; transform: translateY(-1px); }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 CodePair Preview</h1>
    <p>Edits from both developers render instantly with zero cloud storage.</p>
    <button onclick="alert('Hello from CodePair!')">Click Interactive Button</button>
  </div>
</body>
</html>
`,
  python: `# Welcome to CodePair Python Studio 🐍
# Real-time peer-to-peer collaboration

def fibonacci(n):
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

print("First 10 Fibonacci numbers:")
print(fibonacci(10))
`,
  typescript: `// CodePair TypeScript Workspace ⚡
interface User {
  id: string;
  name: string;
  role: "admin" | "developer" | "reviewer";
}

const team: User[] = [
  { id: "1", name: "Dev Alpha", role: "developer" },
  { id: "2", name: "Dev Beta", role: "reviewer" }
];

console.log("Active Team Members:", team);
`,
};

const SUPPORTED_LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "html", name: "HTML / CSS" },
  { id: "python", name: "Python" },
  { id: "json", name: "JSON" },
  { id: "markdown", name: "Markdown" },
  { id: "rust", name: "Rust" },
  { id: "go", name: "Go" },
  { id: "sql", name: "SQL" },
];

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
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>(DEFAULT_TEMPLATES.javascript);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<Array<{ type: string; text: string }>>([]);
  const [copyFeedback, setCopyFeedback] = useState<string>("");

  // Refs
  const clientRef = useRef<CodePairClient | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);
  const docVersionRef = useRef<number>(1);
  const isRemoteChangeRef = useRef<boolean>(false);
  const remoteDecorationsRef = useRef<string[]>([]);
  const codeRef = useRef<string>(code);
  const languageRef = useRef<string>(language);

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
          setCopyFeedback(`Partner connected: ${peer.username}!`);
          setTimeout(() => setCopyFeedback(""), 4000);
        },
        onPeerDisconnected: () => {
          setPartner(null);
          // Clear remote decorations
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

              // Smoothly execute edits to preserve cursor position and avoid cursor jumping
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
          setLanguage(newLang);
          P2PPersistence.saveState("codepair_language", newLang);
        },
        onRemoteCursor: (cursor) => {
          renderRemoteCursor(cursor);
        },
        onError: (err) => {
          console.error("CodePair error:", err);
        },
      });

      clientRef.current = client;
      setRoomId(codeClean);

      // Save active session & sync URL search parameters
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

    // Cursor caret decoration
    newDecorations.push({
      range: new monaco.Range(cursor.line, cursor.column, cursor.line, cursor.column),
      options: {
        className: "codepair-remote-cursor",
        hoverMessage: { value: `**${cursor.username}**` },
        isWholeLine: false,
        zIndex: 10,
      },
    });

    // Selection decoration if text is selected
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
    // 1. Restore code, language, and theme from browser memory
    const savedCode = P2PPersistence.loadState<string>("codepair_code");
    const savedLang = P2PPersistence.loadState<string>("codepair_language");
    const savedTheme = P2PPersistence.loadState<"vs-dark" | "light">("codepair_theme");

    if (savedLang) {
      setLanguage(savedLang);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedCode) {
      setCode(savedCode);
      setIsRestoredSession(true);
    }

    // 2. Check room from URL query param, then fallback to persisted session
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

    // 3. BeforeUnload warning if user has unsaved edits or active connection
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Always save draft immediately
      if (codeRef.current) {
        P2PPersistence.saveState("codepair_code", codeRef.current);
      }
      if (clientRef.current && clientRef.current.status === "connected") {
        e.preventDefault();
        e.returnValue = "";
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

    // Save to browser memory immediately
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

    // Listen for local cursor movements and broadcast to peer
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
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    P2PPersistence.saveState("codepair_language", newLang);
    if (DEFAULT_TEMPLATES[newLang] && (!code || code === DEFAULT_TEMPLATES[language])) {
      const template = DEFAULT_TEMPLATES[newLang];
      setCode(template);
      editorRef.current?.setValue(template);
      P2PPersistence.saveState("codepair_code", template);
    }
    if (clientRef.current && clientRef.current.status === "connected") {
      clientRef.current.broadcastLanguageChange(newLang);
    }
  };

  // Reset to default template
  const handleResetTemplate = () => {
    const template = DEFAULT_TEMPLATES[language] || DEFAULT_TEMPLATES.javascript;
    setCode(template);
    editorRef.current?.setValue(template);
    P2PPersistence.saveState("codepair_code", template);
    setIsRestoredSession(false);
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

  // Client-side code execution sandbox (JavaScript/TypeScript)
  const handleRunCode = () => {
    setShowConsole(true);
    setConsoleLogs([]);

    const logs: Array<{ type: string; text: string }> = [];
    const customConsole = {
      log: (...args: unknown[]) => logs.push({ type: "log", text: args.map(String).join(" ") }),
      warn: (...args: unknown[]) => logs.push({ type: "warn", text: args.map(String).join(" ") }),
      error: (...args: unknown[]) => logs.push({ type: "error", text: args.map(String).join(" ") }),
      info: (...args: unknown[]) => logs.push({ type: "info", text: args.map(String).join(" ") }),
    };

    try {
      const runFn = new Function("console", code);
      runFn(customConsole);
      if (logs.length === 0) {
        logs.push({ type: "info", text: "Code executed successfully with zero console output." });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logs.push({ type: "error", text: `Runtime Error: ${msg}` });
    }

    setConsoleLogs(logs);
  };

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
        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>

        {/* Theme Selector */}
        <button
          type="button"
          onClick={() => {
            const nextTheme = theme === "vs-dark" ? "light" : "vs-dark";
            setTheme(nextTheme);
            P2PPersistence.saveState("codepair_theme", nextTheme);
          }}
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs cursor-pointer"
          title="Toggle Editor Theme"
        >
          {theme === "vs-dark" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* Run Code (for JS/TS) */}
        {(language === "javascript" || language === "typescript") && (
          <button
            type="button"
            onClick={handleRunCode}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-xs transition flex items-center gap-1 cursor-pointer"
          >
            ▶ Run
          </button>
        )}

        {/* Live Preview Toggle */}
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`px-2.5 py-1 rounded-md text-xs transition cursor-pointer ${
            showPreview
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          👁️ Preview
        </button>

        {/* Reset Template Option */}
        <button
          type="button"
          onClick={handleResetTemplate}
          className="px-2 py-1 text-slate-400 hover:text-slate-200 text-xs transition cursor-pointer"
          title="Reset to default language template"
        >
          Reset
        </button>
      </P2PConnectionHeader>

      {/* When no room is active: Quick Join & Create Banner */}
      {!roomId && (
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span>You are currently in solo mode.</span>
            <span className="text-slate-500">•</span>
            <span>Edits are automatically saved to your browser memory across reloads.</span>
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

      {/* Copy / Action feedback banner */}
      {copyFeedback && (
        <div className="bg-blue-600/90 text-white text-xs py-1.5 px-4 text-center font-medium animate-in fade-in duration-200">
          {copyFeedback}
        </div>
      )}

      {/* Main Workspace (Monaco Editor + Live Preview) */}
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

          {/* Integrated Console Drawer for Code Runner */}
          {showConsole && (
            <div className="absolute bottom-0 left-0 right-0 max-h-48 bg-slate-950 border-t border-slate-800 z-20 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <span className="font-semibold text-slate-200">Console Output</span>
                <button
                  onClick={() => setShowConsole(false)}
                  className="hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-3 overflow-y-auto space-y-1 font-mono text-xs max-h-40">
                {consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      log.type === "error"
                        ? "text-red-400"
                        : log.type === "warn"
                        ? "text-amber-400"
                        : log.type === "info"
                        ? "text-blue-400"
                        : "text-slate-300"
                    }`}
                  >
                    <span className="opacity-50 select-none mr-2">›</span>
                    {log.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Preview / Sandbox Pane */}
        {showPreview && (
          <div className="w-full md:w-1/2 h-full min-h-0 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col">
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Live Render Output
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                Sandboxed
              </span>
            </div>

            <div className="flex-1 h-full bg-white relative">
              {language === "html" ? (
                <iframe
                  title="CodePair Live HTML Preview"
                  srcDoc={code}
                  sandbox="allow-scripts allow-modals"
                  className="w-full h-full border-none"
                />
              ) : (
                <div className="w-full h-full bg-slate-900 text-slate-400 p-6 flex flex-col items-center justify-center text-center space-y-3 font-mono text-xs">
                  <div className="text-3xl">💻</div>
                  <div className="font-semibold text-slate-200">
                    {language.toUpperCase()} Workspace
                  </div>
                  <p className="max-w-sm text-slate-400 text-xs">
                    Real-time peer-to-peer code synchronization is active. Select{" "}
                    <span className="text-blue-400 font-bold">HTML / CSS</span> from the language
                    menu for live DOM iframe rendering, or click{" "}
                    <span className="text-emerald-400 font-bold">▶ Run</span> to execute JavaScript.
                  </p>
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
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span>Lang: {language}</span>
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
