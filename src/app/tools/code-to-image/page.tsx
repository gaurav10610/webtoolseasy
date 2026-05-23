"use client";

import { useState, useRef, useCallback } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import Editor from "@monaco-editor/react";
import { toPng } from 'html-to-image';

const BACKGROUNDS = [
  { id: "hyper", name: "Hyper", class: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500" },
  { id: "ocean", name: "Ocean", class: "bg-gradient-to-br from-teal-400 to-blue-500" },
  { id: "candy", name: "Candy", class: "bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600" },
  { id: "midnight", name: "Midnight", class: "bg-gradient-to-br from-gray-900 to-black" },
  { id: "emerald", name: "Emerald", class: "bg-gradient-to-br from-green-400 to-emerald-600" },
  { id: "aurora", name: "Aurora", class: "bg-gradient-to-br from-green-300 via-blue-500 to-purple-600" },
  { id: "hacker", name: "Hacker", class: "bg-[#0d1117]" },
  { id: "solid-white", name: "White", class: "bg-white" },
];

const LANGUAGES = [
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "json", name: "JSON" },
  { id: "rust", name: "Rust" },
  { id: "go", name: "Go" },
  { id: "sql", name: "SQL" },
];

export default function CodeToImagePage() {
  const [code, setCode] = useState(`function calculateFibonacci(n: number): number {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

// Example usage
const result = calculateFibonacci(10);
console.log(\`Fibonacci(10) = \${result}\`);`);
  
  const [language, setLanguage] = useState("typescript");
  const [theme, setTheme] = useState("vs-dark");
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [padding, setPadding] = useState(64);
  const [windowTitle, setWindowTitle] = useState("main.ts");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [dropShadow, setDropShadow] = useState(true);

  const [isExporting, setIsExporting] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(async () => {
    if (!frameRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(frameRef.current, {
        quality: 1,
        pixelRatio: 2, // Retina resolution
        skipFonts: false,
      });
      
      const link = document.createElement('a');
      link.download = `code-snippet-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting image:', err);
      alert('Failed to export image. Try reducing the code size.');
    } finally {
      setIsExporting(false);
    }
  }, []);

  // Calculate rough height based on line count (19px per line + padding)
  const lineCount = code.split('\n').length;
  const editorHeight = Math.max(100, lineCount * 19 + 40);

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-[1600px] px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)] h-screen overflow-hidden">
        
        <div className="mb-6 flex flex-col justify-start items-start gap-2 shrink-0">
          <Badge variant="success" className="mb-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Studio Canvas</Badge>
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-3xl font-black text-white tracking-tight flex-1">
              Beautiful Code Snippets
            </h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Create gorgeous, high-resolution images of your code for Twitter, LinkedIn, and blogs. Rendered entirely locally in your browser.
          </p>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          
          {/* Controls Sidebar */}
          <div className="w-full lg:w-80 bg-[#121214] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 overflow-y-auto shrink-0 shadow-xl relative group">
            <div className="pointer-events-none absolute left-[-20%] top-[-20%] h-[50%] w-[50%] rounded-full bg-emerald-500/5 blur-[80px] transition-all group-hover:bg-emerald-500/10" />
            
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
                  Exporting...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Export PNG
                </>
              )}
            </button>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Background</label>
              <div className="grid grid-cols-4 gap-2">
                {BACKGROUNDS.map(bg => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg)}
                    className={`h-10 rounded-lg border-2 transition-all ${bg.class} ${background.id === bg.id ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    title={bg.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Editor Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="vs-dark">VS Dark</option>
                <option value="light">VS Light</option>
                <option value="hc-black">High Contrast</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Window Title</label>
              <input
                type="text"
                value={windowTitle}
                onChange={(e) => setWindowTitle(e.target.value)}
                placeholder="e.g. main.ts"
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Padding</label>
                <span className="text-xs text-gray-500">{padding}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="128"
                step="8"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={showLineNumbers}
                  onChange={(e) => setShowLineNumbers(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-black/50 text-emerald-500 focus:ring-emerald-500/50"
                />
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">Show Line Numbers</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={dropShadow}
                  onChange={(e) => setDropShadow(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-black/50 text-emerald-500 focus:ring-emerald-500/50"
                />
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">Window Shadow</span>
              </label>
            </div>
            
          </div>

          {/* Preview Canvas Area */}
          <div className="flex-1 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-black/20 border border-white/10 rounded-2xl overflow-auto relative shadow-xl flex items-center justify-center min-h-[600px]">
            
            {/* The actual exportable frame */}
            <div 
              ref={frameRef}
              className={`transition-all duration-300 ${background.class}`}
              style={{ padding: `${padding}px` }}
            >
              <div 
                className={`rounded-xl overflow-hidden flex flex-col ${theme === 'light' ? 'bg-white' : 'bg-[#1e1e1e]'} ${dropShadow ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]' : ''}`}
                style={{ width: '800px' }} // Fixed width for consistent image rendering
              >
                
                {/* macOS Window Header */}
                <div className={`h-12 px-4 flex items-center justify-between shrink-0 ${theme === 'light' ? 'border-b border-gray-200' : 'border-b border-white/5'}`}>
                  <div className="flex items-center gap-2 w-20">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                  </div>
                  <div className={`text-xs font-mono font-bold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {windowTitle}
                  </div>
                  <div className="w-20"></div> {/* Spacer to center the title */}
                </div>

                {/* Monaco Editor Container */}
                <div 
                  className="w-full relative"
                  style={{ height: `${editorHeight}px` }}
                >
                  <Editor
                    height="100%"
                    width="100%"
                    language={language}
                    theme={theme}
                    value={code}
                    onChange={(val) => setCode(val || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineHeight: 19,
                      padding: { top: 20, bottom: 20 },
                      scrollBeyondLastLine: false,
                      fontFamily: 'var(--font-geist-mono)',
                      lineNumbers: showLineNumbers ? "on" : "off",
                      renderLineHighlight: "none",
                      hideCursorInOverviewRuler: true,
                      overviewRulerBorder: false,
                      scrollbar: {
                        vertical: 'hidden',
                        horizontal: 'hidden'
                      },
                      wordWrap: 'on'
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
