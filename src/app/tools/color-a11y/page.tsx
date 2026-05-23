"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { generatePalette, isValidHex, PaletteShade } from "@/utils/colorUtils";

export default function ColorA11yPage() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [palette, setPalette] = useState<PaletteShade[]>([]);
  
  useEffect(() => {
    if (isValidHex(baseColor)) {
      setPalette(generatePalette(baseColor));
    }
  }, [baseColor]);

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <Badge variant="info" className="mb-4 bg-pink-500/10 text-pink-400 border-pink-500/20">WCAG AA & AAA Evaluator</Badge>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              Color A11y Generator
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Enter a brand color to instantly generate a full 50-950 scale. Evaluates every shade against WCAG contrast standards for Black and White text.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <label className="text-sm font-bold text-gray-400">Base Color Hex</label>
            <div className="flex items-center gap-3 bg-[#121214] border border-white/10 rounded-xl p-2 pr-4 shadow-xl">
              <input 
                type="color" 
                value={isValidHex(baseColor) ? baseColor : "#000000"} 
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent"
              />
              <input 
                type="text" 
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="bg-transparent border-none text-white font-mono font-bold w-24 focus:outline-none uppercase"
                placeholder="#3B82F6"
              />
            </div>
            {!isValidHex(baseColor) && (
              <span className="text-xs text-red-400 font-bold">Invalid Hex Color</span>
            )}
          </div>
        </div>

        <div className="flex-1 grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {palette.map((shade) => (
            <div key={shade.name} className="bg-[#121214] border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col">
              {/* Color Banner */}
              <div 
                className="h-24 w-full flex items-center justify-between px-6 relative"
                style={{ backgroundColor: shade.hex }}
              >
                {shade.isBase && (
                  <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-white uppercase tracking-widest">
                    Base
                  </div>
                )}
                <span className="font-black text-3xl opacity-90" style={{ color: shade.passWhiteAA ? '#ffffff' : '#000000' }}>
                  {shade.name}
                </span>
                <span className="font-mono font-bold opacity-70 uppercase tracking-wide" style={{ color: shade.passWhiteAA ? '#ffffff' : '#000000' }}>
                  {shade.hex}
                </span>
              </div>
              
              {/* Contrast Stats */}
              <div className="p-5 flex flex-col gap-4">
                
                {/* White Text Analysis */}
                <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-bold text-lg">A</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">White Text</span>
                      <span className="text-xs text-gray-500 font-mono">Ratio: {shade.contrastWhite}:1</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-[10px] font-black rounded ${shade.passWhiteAA ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                      AA
                    </span>
                    <span className={`px-2 py-1 text-[10px] font-black rounded ${shade.passWhiteAAA ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                      AAA
                    </span>
                  </div>
                </div>

                {/* Black Text Analysis */}
                <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-black text-white border border-white/20 flex items-center justify-center font-bold text-lg">A</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">Black Text</span>
                      <span className="text-xs text-gray-500 font-mono">Ratio: {shade.contrastBlack}:1</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-[10px] font-black rounded ${shade.passBlackAA ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                      AA
                    </span>
                    <span className={`px-2 py-1 text-[10px] font-black rounded ${shade.passBlackAAA ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                      AAA
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
