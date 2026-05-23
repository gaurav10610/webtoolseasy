"use client";

import { useState, useEffect, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { autoDetectAndConvert, convert, ConversionDirection } from "@/utils/yamlJsonUtils";

export default function YamlJsonPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<ConversionDirection>("yaml-to-json");
  const [copied, setCopied] = useState(false);
  const [autoDetect, setAutoDetect] = useState(true);

  // Use a ref to track if a change came from pasting/typing vs direction toggle
  const userChangedInput = useRef(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    if (autoDetect && userChangedInput.current) {
      const result = autoDetectAndConvert(input, direction);
      if (result.detectedDirection && result.detectedDirection !== direction) {
        setDirection(result.detectedDirection);
      }
      setOutput(result.output);
      setError(result.error || null);
    } else {
      const result = convert(input, direction);
      setOutput(result.output);
      setError(result.error || null);
    }
    
    // Reset flag
    userChangedInput.current = false;
  }, [input, direction, autoDetect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    userChangedInput.current = true;
    setInput(e.target.value);
  };

  const toggleDirection = () => {
    setDirection(prev => prev === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json");
    // Swap input and output if output is valid
    if (output && !error) {
      setInput(output);
      userChangedInput.current = false;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const loadExample = () => {
    userChangedInput.current = true;
    if (direction === "yaml-to-json") {
      setInput(`server:\n  port: 8080\n  host: "localhost"\ndatabase:\n  user: root\n  pass: secret\n  retries: 3`);
    } else {
      setInput(`{\n  "server": {\n    "port": 8080,\n    "host": "localhost"\n  },\n  "database": {\n    "user": "root",\n    "pass": "secret",\n    "retries": 3\n  }\n}`);
    }
  };

  const inputLang = direction === "yaml-to-json" ? "YAML" : "JSON";
  const outputLang = direction === "yaml-to-json" ? "JSON" : "YAML";

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-[1400px] px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-8 flex flex-col justify-start items-start gap-2">
          <Badge variant="success" className="mb-2 bg-pink-500/10 text-pink-400 border-pink-500/20">Config Parser</Badge>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            YAML ⇄ JSON Converter
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Instantly and bidirectionally translate between YAML and JSON configuration files. Completely secure, entirely local in your browser.
          </p>
        </div>

        {/* Configuration Bar */}
        <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between z-10 relative">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDirection}
              aria-label="Toggle Direction"
              className="flex items-center gap-3 px-4 py-2 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 rounded-xl transition-colors text-pink-300 font-bold"
            >
              <span>{inputLang}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"></path><path d="M11 14l-4 4-4-4"></path><path d="M17 14V2"></path><path d="M21 6l-4-4-4 4"></path></svg>
              <span>{outputLang}</span>
            </button>
            
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox"
                checked={autoDetect}
                onChange={(e) => setAutoDetect(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-pink-500 focus:ring-pink-500/50 bg-black/50 cursor-pointer"
              />
              <span className="text-sm font-bold text-gray-400 group-hover:text-gray-300 transition-colors">Auto-Detect Input</span>
            </label>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={loadExample}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors border border-white/10"
            >
              Example
            </button>
            <button 
              onClick={handleClear}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/30"
            >
              Clear
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-mono flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <div className="whitespace-pre-wrap">{error}</div>
          </div>
        )}

        <div className="flex-1 grid lg:grid-cols-2 gap-6 h-[600px]">
          
          {/* Input Pane */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden relative">
            <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center z-10">
              <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">Input {inputLang}</span>
            </div>
            <textarea 
              value={input}
              onChange={handleInputChange}
              placeholder={`Paste your ${inputLang} config here...`}
              className="flex-1 w-full bg-transparent p-6 text-gray-300 font-mono text-sm resize-none focus:outline-none z-10"
              spellCheck="false"
            />
          </div>

          {/* Output Pane */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden relative group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-pink-500/10 blur-[80px] transition-all group-hover:bg-pink-500/20" />
            <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center z-10">
              <span className="text-sm font-bold text-pink-400 uppercase tracking-wider">Output {outputLang}</span>
              <button 
                onClick={copyToClipboard}
                disabled={!output || !!error}
                className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-xs font-bold rounded transition-colors border border-pink-500/30 disabled:opacity-50 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <textarea 
              readOnly
              value={output}
              placeholder={input ? (error ? "Error parsing input..." : "Output will appear here...") : `Formatted ${outputLang} will appear here...`}
              className={`flex-1 w-full bg-transparent p-6 font-mono text-sm resize-none focus:outline-none z-10 ${error ? 'text-red-300/50' : 'text-pink-300'}`}
              spellCheck="false"
            />
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
