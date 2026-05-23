"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { convertSvgToReact } from "@/utils/svgConverter";

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap">
  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
</svg>`;

export default function SvgToReactPage() {
  const [inputSvg, setInputSvg] = useState<string>(DEFAULT_SVG);
  const [outputCode, setOutputCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  // Options
  const [useCurrentColor, setUseCurrentColor] = useState(true);
  const [isReactNative, setIsReactNative] = useState(false);
  const [typescript, setTypescript] = useState(true);

  useEffect(() => {
    try {
      if (!inputSvg.trim()) {
        setOutputCode("");
        setError(null);
        return;
      }
      
      const jsx = convertSvgToReact(inputSvg, {
        useCurrentColor,
        isReactNative,
        typescript
      });
      
      setOutputCode(jsx);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid SVG");
      setOutputCode("");
    }
  }, [inputSvg, useCurrentColor, isReactNative, typescript]);

  const copyToClipboard = () => {
    if (outputCode) {
      navigator.clipboard.writeText(outputCode);
    }
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 h-screen flex flex-col">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <Badge variant="info" className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20">Client-Side Parser</Badge>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              SVG to React Converter
            </h1>
            <p className="text-gray-400">
              Transform raw SVGs into clean, configurable React or React Native components.
            </p>
          </div>
          
          <div className="flex gap-4 bg-[#121214] p-3 rounded-2xl border border-white/10">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white">
              <input type="checkbox" checked={typescript} onChange={e => setTypescript(e.target.checked)} className="rounded border-white/20 bg-black" />
              TypeScript
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white">
              <input type="checkbox" checked={useCurrentColor} onChange={e => setUseCurrentColor(e.target.checked)} className="rounded border-white/20 bg-black" />
              CurrentColor
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white">
              <input type="checkbox" checked={isReactNative} onChange={e => setIsReactNative(e.target.checked)} className="rounded border-white/20 bg-black" />
              React Native
            </label>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[500px]">
          {/* Left Pane: Input */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                Raw SVG
              </span>
              {error && (
                <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded">
                  {error}
                </span>
              )}
            </div>
            <textarea
              className="flex-1 bg-transparent text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={inputSvg}
              onChange={(e) => setInputSvg(e.target.value)}
              placeholder="Paste <svg>...</svg> here..."
              spellCheck="false"
            />
          </div>

          {/* Right Pane: Output */}
          <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden relative">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-bold text-orange-400">
                {isReactNative ? "React Native Code" : "React JSX Code"}
              </span>
              <button 
                onClick={copyToClipboard}
                className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
              >
                Copy Code
              </button>
            </div>
            <textarea
              className="flex-1 bg-transparent text-orange-300 font-mono text-sm p-4 resize-none focus:outline-none"
              value={outputCode}
              readOnly
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
