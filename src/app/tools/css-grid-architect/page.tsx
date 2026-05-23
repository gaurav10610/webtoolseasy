"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";

export default function CssGridArchitectPage() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [columnGap, setColumnGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);

  // Generate an array of items for the grid
  const items = Array.from({ length: columns * rows }, (_, i) => i + 1);

  // Computed Grid Styles for the Canvas
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    columnGap: `${columnGap}px`,
    rowGap: `${rowGap}px`,
  };

  // Generate output code
  const pureCss = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  column-gap: ${columnGap}px;
  row-gap: ${rowGap}px;
}`;

  const tailwindCss = `<div className="grid grid-cols-${columns} gap-x-[${columnGap}px] gap-y-[${rowGap}px]">
  {/* items */}
</div>`;

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <Badge variant="info" className="mb-4 bg-sky-500/10 text-sky-400 border-sky-500/20">Visual Layout Builder</Badge>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              CSS Grid Architect
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Design complex, responsive CSS Grid layouts visually. Instantly generate pure CSS or Tailwind CSS code.
            </p>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-12 gap-6 min-h-[600px]">
          {/* Left Column: Controls and Output */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Controls */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Grid Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-400">Columns</label>
                    <span className="text-sm font-bold text-sky-400">{columns}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="12" 
                    value={columns} 
                    onChange={(e) => setColumns(parseInt(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-400">Rows</label>
                    <span className="text-sm font-bold text-sky-400">{rows}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="12" 
                    value={rows} 
                    onChange={(e) => setRows(parseInt(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-400">Column Gap (px)</label>
                    <span className="text-sm font-bold text-sky-400">{columnGap}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="64" step="4"
                    value={columnGap} 
                    onChange={(e) => setColumnGap(parseInt(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-400">Row Gap (px)</label>
                    <span className="text-sm font-bold text-sky-400">{rowGap}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="64" step="4"
                    value={rowGap} 
                    onChange={(e) => setRowGap(parseInt(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Output Code */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden flex-1">
              <div className="bg-white/5 border-b border-white/10 px-6 py-3">
                <span className="text-sm font-bold text-sky-400">Generated Code</span>
              </div>
              <div className="p-4 flex-1 flex flex-col gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wider">Pure CSS</div>
                  <pre className="bg-black/50 p-3 rounded-lg text-sky-300 font-mono text-xs overflow-x-auto border border-white/5">
                    {pureCss}
                  </pre>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wider">Tailwind CSS</div>
                  <pre className="bg-black/50 p-3 rounded-lg text-sky-300 font-mono text-xs overflow-x-auto border border-white/5 whitespace-pre-wrap">
                    {tailwindCss}
                  </pre>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Canvas */}
          <div className="lg:col-span-8 bg-[#0A0A0B] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden">
             <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-300">Live Canvas</span>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
              </div>
            </div>
            
            <div className="flex-1 p-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]">
              {/* The Grid Canvas Container */}
              <div 
                className="w-full h-full bg-black/40 border-2 border-dashed border-sky-500/30 rounded-xl p-4 transition-all duration-300"
                style={gridStyle}
              >
                {items.map((i) => (
                  <div 
                    key={i} 
                    className="bg-sky-500/10 border border-sky-500/30 rounded-lg flex items-center justify-center text-sky-400 font-bold text-xl hover:bg-sky-500/20 transition-colors shadow-inner"
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
