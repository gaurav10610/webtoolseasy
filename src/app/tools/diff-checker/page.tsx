"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { computeTextDiff, computeJsonDiff, DiffResult } from "@/utils/diffUtils";

export default function DiffCheckerPage() {
  const [originalText, setOriginalText] = useState("{\n  \"name\": \"John Doe\",\n  \"age\": 30,\n  \"city\": \"New York\"\n}");
  const [modifiedText, setModifiedText] = useState("{\n  \"name\": \"John Doe\",\n  \"age\": 31,\n  \"city\": \"Boston\",\n  \"active\": true\n}");
  
  const [mode, setMode] = useState<"text" | "json">("json");
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null);

  useEffect(() => {
    if (mode === "json") {
      setDiffResult(computeJsonDiff(originalText, modifiedText));
    } else {
      setDiffResult(computeTextDiff(originalText, modifiedText));
    }
  }, [originalText, modifiedText, mode]);

  const renderDiff = () => {
    if (!diffResult) return null;
    if (!diffResult.isValid) {
      return (
        <div className="flex items-center justify-center h-full text-red-400 p-6 text-center">
          {diffResult.error}
        </div>
      );
    }

    return (
      <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap p-6 text-gray-300 h-full overflow-y-auto">
        {diffResult.changes.map((part, index) => {
          let bgColor = "transparent";
          let textColor = "inherit";
          let prefix = "  ";
          
          if (part.added) {
            bgColor = "bg-emerald-500/20";
            textColor = "text-emerald-300";
            prefix = "+ ";
          } else if (part.removed) {
            bgColor = "bg-red-500/20";
            textColor = "text-red-300";
            prefix = "- ";
          }

          // Split multiline changes so prefix applies to each line
          const lines = part.value.split('\n');
          // If the last line is completely empty (due to trailing \n), remove it
          if (lines[lines.length - 1] === "") {
            lines.pop();
          }

          return (
            <span key={index} className={`block ${bgColor} ${textColor}`}>
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="select-none w-6 inline-block opacity-50">{prefix}</span>
                  <span className="break-all">{line}</span>
                </div>
              ))}
            </span>
          );
        })}
      </pre>
    );
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <Badge variant="info" className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20">100% Offline Secure</Badge>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              Diff Checker
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Compare text or JSON payloads instantly. Your data never leaves your browser, ensuring absolute security.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setMode("text")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                mode === "text" 
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                  : "text-gray-500 hover:text-gray-300 border border-transparent"
              }`}
            >
              Plain Text
            </button>
            <button
              onClick={() => setMode("json")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                mode === "json" 
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                  : "text-gray-500 hover:text-gray-300 border border-transparent"
              }`}
            >
              JSON Object
            </button>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[600px] mb-6">
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden h-1/2">
              <div className="bg-white/5 border-b border-white/10 px-6 py-3">
                <span className="text-sm font-bold text-gray-300">Original Data</span>
              </div>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="w-full h-full bg-transparent text-gray-300 font-mono text-sm p-6 resize-none focus:outline-none focus:bg-white/[0.02]"
                spellCheck="false"
                placeholder="Paste original text or JSON here..."
              />
            </div>
            
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden h-1/2">
              <div className="bg-white/5 border-b border-white/10 px-6 py-3">
                <span className="text-sm font-bold text-gray-300">Modified Data</span>
              </div>
              <textarea
                value={modifiedText}
                onChange={(e) => setModifiedText(e.target.value)}
                className="w-full h-full bg-transparent text-gray-300 font-mono text-sm p-6 resize-none focus:outline-none focus:bg-white/[0.02]"
                spellCheck="false"
                placeholder="Paste modified text or JSON here..."
              />
            </div>
          </div>

          {/* Right Column: Diff Output */}
          <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden">
             <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center">
              <span className="text-sm font-bold text-orange-400">Differences</span>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-red-400">- Removed</span>
                <span className="text-emerald-400">+ Added</span>
              </div>
            </div>
            <div className="flex-1 relative bg-black/40">
              {renderDiff()}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
