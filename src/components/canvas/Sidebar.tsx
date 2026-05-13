import React from 'react';
import { nodeRegistry } from './nodeRegistry';

export function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-72 bg-[#121214]/80 backdrop-blur-xl border-r border-white/10 p-5 h-full overflow-y-auto flex flex-col shadow-2xl">
      <div className="text-xs font-bold text-gray-500 mb-6 uppercase tracking-[0.2em]">Available Tools</div>
      
      <div className="flex flex-col gap-3">
        {Object.entries(nodeRegistry).map(([type, config]) => {
          if (type === 'inputNode' || type === 'outputNode') return null; 
          
          return (
            <div
              key={type}
              className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-lg cursor-grab active:cursor-grabbing hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-200 group"
              onDragStart={(event) => onDragStart(event, type)}
              draggable
            >
              <div className="font-semibold text-sm text-gray-200 group-hover:text-indigo-300 transition-colors">{config.label}</div>
              <div className="text-xs text-gray-500 mt-1.5 leading-relaxed">{config.description}</div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-auto pt-8">
        <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-xl text-center">
          <p className="text-xs text-indigo-300">Drag any tool onto the canvas to add it to your pipeline.</p>
        </div>
      </div>
    </aside>
  );
}
