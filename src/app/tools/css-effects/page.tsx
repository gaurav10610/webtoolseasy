"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import Editor from "@monaco-editor/react";

export default function CssEffectsPage() {
  // Glassmorphism State
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(10);
  const [bgColor, setBgColor] = useState("#ffffff");
  
  // Shadow State
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(25);
  const [shadowBlur, setShadowBlur] = useState(50);
  const [shadowSpread, setShadowSpread] = useState(-12);
  const [shadowOpacity, setShadowOpacity] = useState(25);
  const [shadowColor, setShadowColor] = useState("#000000");

  // Output formatting state
  const [activeTab, setActiveTab] = useState<"css" | "tailwind">("tailwind");

  // Utility to convert hex to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  const bgRgb = hexToRgb(bgColor);
  const shadowRgb = hexToRgb(shadowColor);

  const rgbaBg = `rgba(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b}, ${opacity / 100})`;
  const rgbaShadow = `rgba(${shadowRgb.r}, ${shadowRgb.g}, ${shadowRgb.b}, ${shadowOpacity / 100})`;

  const styleObj = {
    background: rgbaBg,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${rgbaShadow}`,
    border: `1px solid rgba(255, 255, 255, 0.12)`
  };

  const rawCssCode = `.glass-card {
  background: ${rgbaBg};
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${rgbaShadow};
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
}`;

  // Helper for tailwind opacity arbitrary values if not standard
  const twOpacityClass = opacity === 10 ? 'bg-white/10' : opacity === 20 ? 'bg-white/20' : `bg-[${bgColor}]/[${opacity/100}]`;
  const twBlurClass = blur === 16 ? 'backdrop-blur-md' : blur === 24 ? 'backdrop-blur-lg' : blur === 40 ? 'backdrop-blur-xl' : `backdrop-blur-[${blur}px]`;
  const twShadowClass = `shadow-[${shadowX}px_${shadowY}px_${shadowBlur}px_${shadowSpread}px_${rgbaShadow.replace(/ /g, '')}]`;

  const tailwindCode = `<div className="${twBlurClass} ${twOpacityClass} ${twShadowClass} border border-white/10 rounded-3xl">
  {/* Content */}
</div>`;

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-[1600px] px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)] h-screen overflow-hidden">
        
        <div className="mb-6 flex flex-col justify-start items-start gap-2 shrink-0">
          <Badge variant="error" className="mb-2 bg-pink-500/10 text-pink-400 border-pink-500/20">CSS Effects</Badge>
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-3xl font-black text-white tracking-tight flex-1">
              CSS Glassmorphism & Shadow Builder
            </h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Design perfect frosted glass and modern multi-layered shadows visually. Instantly export highly-optimized Tailwind CSS classes or raw standard CSS.
          </p>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          
          {/* Controls Sidebar */}
          <div className="w-full lg:w-[400px] bg-[#121214] border border-white/10 rounded-2xl p-6 flex flex-col gap-8 overflow-y-auto shrink-0 shadow-xl relative group">
            <div className="pointer-events-none absolute left-[-20%] top-[-20%] h-[50%] w-[50%] rounded-full bg-pink-500/5 blur-[80px] transition-all group-hover:bg-pink-500/10" />
            
            {/* Glass Controls */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                Glass Properties
              </h3>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Backdrop Blur</label>
                  <span className="text-xs text-gray-500">{blur}px</span>
                </div>
                <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-pink-500" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Background Opacity</label>
                  <span className="text-xs text-gray-500">{opacity}%</span>
                </div>
                <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-pink-500" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Background Color</label>
                  <span className="text-xs text-gray-500 uppercase">{bgColor}</span>
                </div>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-8 rounded-lg cursor-pointer bg-black/50 border border-white/10" />
              </div>
            </div>

            {/* Shadow Controls */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                Drop Shadow
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">X Offset</label>
                    <span className="text-xs text-gray-500">{shadowX}px</span>
                  </div>
                  <input type="range" min="-100" max="100" value={shadowX} onChange={(e) => setShadowX(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Y Offset</label>
                    <span className="text-xs text-gray-500">{shadowY}px</span>
                  </div>
                  <input type="range" min="-100" max="100" value={shadowY} onChange={(e) => setShadowY(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Blur Radius</label>
                    <span className="text-xs text-gray-500">{shadowBlur}px</span>
                  </div>
                  <input type="range" min="0" max="150" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Spread</label>
                    <span className="text-xs text-gray-500">{shadowSpread}px</span>
                  </div>
                  <input type="range" min="-50" max="100" value={shadowSpread} onChange={(e) => setShadowSpread(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Opacity</label>
                    <span className="text-xs text-gray-500">{shadowOpacity}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={shadowOpacity} onChange={(e) => setShadowOpacity(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Color</label>
                    <span className="text-xs text-gray-500 uppercase">{shadowColor}</span>
                  </div>
                  <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-full h-8 rounded-lg cursor-pointer bg-black/50 border border-white/10" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Pane */}
          <div className="flex-1 flex flex-col gap-6 min-h-0">
            
            {/* Live Preview Pane */}
            <div className="flex-1 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-2xl relative shadow-xl overflow-hidden flex items-center justify-center p-8 bg-[length:200%_200%] animate-gradient">
              {/* Decorative shapes behind the glass */}
              <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              
              {/* Glass Card */}
              <div 
                className="w-full max-w-md h-80 rounded-3xl p-8 flex flex-col gap-6 relative z-10 transition-all duration-200"
                style={styleObj}
                id="preview-card"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shadow-inner">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white drop-shadow-md"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">Beautiful UI Card</h3>
                  <p className="text-white/80 mt-2 font-medium text-sm">
                    This card perfectly demonstrates the frosted glass effect and smooth drop shadow currently configured in the left sidebar.
                  </p>
                </div>
                <div className="mt-auto flex gap-4">
                  <div className="h-10 flex-1 bg-white/20 rounded-xl border border-white/20"></div>
                  <div className="h-10 w-24 bg-white/40 rounded-xl border border-white/30"></div>
                </div>
              </div>
            </div>

            {/* Code Output */}
            <div className="h-[250px] bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-xl shrink-0">
              <div className="flex border-b border-white/10 bg-black/40 shrink-0 px-2 pt-2 gap-1 justify-between">
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTab("tailwind")}
                    className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
                      activeTab === "tailwind" 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    Tailwind CSS
                  </button>
                  <button
                    onClick={() => setActiveTab("css")}
                    className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
                      activeTab === "css" 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    Standard CSS
                  </button>
                </div>
                
                <button
                  onClick={() => navigator.clipboard.writeText(activeTab === "css" ? rawCssCode : tailwindCode)}
                  className="px-3 py-1 mb-2 text-xs font-bold text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 rounded-md transition-colors border border-pink-500/20"
                >
                  Copy Code
                </button>
              </div>

              <div className="flex-1 overflow-auto bg-black/20 relative">
                <Editor
                  height="100%"
                  language={activeTab === "css" ? "css" : "html"}
                  theme="vs-dark"
                  value={activeTab === "css" ? rawCssCode : tailwindCode}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    fontFamily: 'var(--font-geist-mono)',
                    renderLineHighlight: "none"
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
