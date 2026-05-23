"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { jsonToTypescript, jsonToZod } from "@/utils/jsonConverters";

export default function JsonToZodPage() {
  const [inputJson, setInputJson] = useState<string>("{\n  \"user\": {\n    \"id\": \"123\",\n    \"name\": \"Alice\",\n    \"isActive\": true,\n    \"roles\": [\"admin\", \"user\"]\n  }\n}");
  const [outputTs, setOutputTs] = useState<string>("");
  const [outputZod, setOutputZod] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"zod" | "ts">("zod");

  useEffect(() => {
    try {
      if (!inputJson.trim()) {
        setOutputTs("");
        setOutputZod("");
        setError(null);
        return;
      }
      const parsed = JSON.parse(inputJson);
      setOutputTs(jsonToTypescript(parsed));
      setOutputZod(jsonToZod(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON");
      setOutputTs("");
      setOutputZod("");
    }
  }, [inputJson]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app we'd show a toast here
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 h-screen flex flex-col">
        <div className="mb-8">
          <Badge variant="info" className="mb-4">100% Client-Side Processing</Badge>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            JSON to Zod & TypeScript Converter
          </h1>
          <p className="text-gray-400">
            Paste your massive JSON payloads and instantly get strongly typed Zod schemas and TypeScript interfaces.
          </p>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[500px]">
          {/* Left Pane: Input */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="m9 18 3-3-3-3"></path></svg>
                Input JSON
              </span>
              {error && (
                <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded">
                  {error}
                </span>
              )}
            </div>
            <textarea
              className="flex-1 bg-transparent text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Paste JSON here..."
              spellCheck="false"
            />
          </div>

          {/* Right Pane: Output */}
          <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden relative">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab("zod")}
                  className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-colors ${activeTab === "zod" ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-white/10"}`}
                >
                  Zod Schema
                </button>
                <button 
                  onClick={() => setActiveTab("ts")}
                  className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-colors ${activeTab === "ts" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-white/10"}`}
                >
                  TypeScript
                </button>
              </div>
              <button 
                onClick={() => copyToClipboard(activeTab === "zod" ? outputZod : outputTs)}
                className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
              >
                Copy Code
              </button>
            </div>
            <textarea
              className="flex-1 bg-transparent text-indigo-300 font-mono text-sm p-4 resize-none focus:outline-none"
              value={activeTab === "zod" ? outputZod : outputTs}
              readOnly
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
