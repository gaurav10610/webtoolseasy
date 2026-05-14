'use client';
import React, { useState, useEffect } from 'react';
import { nodeRegistry, nodesByCategory, categoryLabels, NodeCategory } from './nodeRegistry';
import { usePipelineStore } from '@/store/usePipelineStore';

const SAVED_PIPELINES_KEY = 'wte_saved_pipelines';

interface SavedPipeline {
  id: string;
  name: string;
  savedAt: number;
  config: string; // base64 encoded
}

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<'tools' | 'saved'>('tools');
  const [openCategories, setOpenCategories] = useState<Set<NodeCategory>>(new Set(['text', 'encoders', 'formatters', 'crypto', 'utilities']));
  const [savedPipelines, setSavedPipelines] = useState<SavedPipeline[]>([]);
  const [saveName, setSaveName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const { exportPipeline, importPipeline } = usePipelineStore();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_PIPELINES_KEY);
      if (stored) setSavedPipelines(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const persistPipelines = (pipelines: SavedPipeline[]) => {
    setSavedPipelines(pipelines);
    localStorage.setItem(SAVED_PIPELINES_KEY, JSON.stringify(pipelines));
  };

  const handleSave = () => {
    const name = saveName.trim() || `Pipeline ${new Date().toLocaleString()}`;
    const config = exportPipeline();
    const newPipeline: SavedPipeline = { id: Date.now().toString(), name, savedAt: Date.now(), config };
    persistPipelines([newPipeline, ...savedPipelines]);
    setSaveName('');
    setShowSaveInput(false);
    setActiveTab('saved');
  };

  const handleLoad = (p: SavedPipeline) => {
    importPipeline(p.config);
    setActiveTab('tools');
  };

  const handleDelete = (id: string) => {
    persistPipelines(savedPipelines.filter(p => p.id !== id));
  };

  const toggleCategory = (cat: NodeCategory) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-72 bg-[#121214]/80 backdrop-blur-xl border-r border-white/10 h-full flex flex-col shadow-2xl shrink-0">
      {/* Tab Bar */}
      <div className="flex border-b border-white/10 shrink-0">
        <button
          onClick={() => setActiveTab('tools')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'tools' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Tools
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'saved' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Saved {savedPipelines.length > 0 && <span className="ml-1 bg-indigo-600 text-white rounded-full px-1.5 text-[9px]">{savedPipelines.length}</span>}
        </button>
      </div>

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          {/* Special nodes */}
          <div className="mb-3">
            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] px-2 mb-2">Input / Output</div>
            {['fileInputNode'].map(type => {
              const config = nodeRegistry[type];
              return (
                <div
                  key={type}
                  className="bg-white/5 border border-white/10 p-3 rounded-xl mb-2 cursor-grab active:cursor-grabbing hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-200 group"
                  onDragStart={(e) => onDragStart(e, type)}
                  draggable
                >
                  <div className="font-semibold text-sm text-gray-200 group-hover:text-indigo-300 transition-colors">{config.label}</div>
                  <div className="text-[11px] text-gray-500 mt-1 leading-relaxed">{config.description}</div>
                </div>
              );
            })}
          </div>

          {/* Categorized nodes */}
          {(Object.keys(nodesByCategory) as NodeCategory[]).map(cat => {
            const types = nodesByCategory[cat];
            if (types.length === 0) return null;
            const isOpen = openCategories.has(cat);
            return (
              <div key={cat} className="mb-2">
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">{categoryLabels[cat]}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {isOpen && (
                  <div className="flex flex-col gap-2 mt-1">
                    {types.map(type => {
                      const config = nodeRegistry[type];
                      return (
                        <div
                          key={type}
                          className="bg-white/5 border border-white/10 p-3 rounded-xl cursor-grab active:cursor-grabbing hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-200 group"
                          onDragStart={(e) => onDragStart(e, type)}
                          draggable
                        >
                          <div className="font-semibold text-sm text-gray-200 group-hover:text-indigo-300 transition-colors">{config.label}</div>
                          <div className="text-[11px] text-gray-500 mt-1 leading-relaxed">{config.description}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-4 pb-2">
            <div className="bg-indigo-900/20 border border-indigo-500/20 p-3 rounded-xl text-center">
              <p className="text-[11px] text-indigo-300 leading-relaxed">Drag any tool onto the canvas to add it to your pipeline.</p>
            </div>
          </div>
        </div>
      )}

      {/* Saved Tab */}
      {activeTab === 'saved' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/10 shrink-0">
            {showSaveInput ? (
              <div className="flex gap-2">
                <input
                  autoFocus
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 placeholder:text-gray-600"
                  placeholder="Pipeline name..."
                  value={saveName}
                  onChange={e => setSaveName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setShowSaveInput(false); }}
                />
                <button onClick={handleSave} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-xs font-medium transition-colors">Save</button>
              </div>
            ) : (
              <button
                onClick={() => setShowSaveInput(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-xl text-indigo-300 text-xs font-semibold transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13"/><polyline points="7 3 7 8 15 8"/></svg>
                Save current pipeline
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
            {savedPipelines.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/></svg>
                </div>
                <p className="text-xs text-gray-600">No saved pipelines yet.</p>
                <p className="text-[11px] text-gray-700 mt-1">Build a pipeline and click Save.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {savedPipelines.map(p => (
                  <div key={p.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-3 hover:border-indigo-500/30 transition-colors group">
                    <div className="font-medium text-sm text-gray-200 truncate mb-1">{p.name}</div>
                    <div className="text-[10px] text-gray-600 mb-3">{new Date(p.savedAt).toLocaleString()}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLoad(p)}
                        className="flex-1 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 rounded-lg text-indigo-300 text-[11px] font-medium transition-colors"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="py-1.5 px-2.5 bg-red-900/20 hover:bg-red-900/40 border border-red-800/30 rounded-lg text-red-400 text-[11px] transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
