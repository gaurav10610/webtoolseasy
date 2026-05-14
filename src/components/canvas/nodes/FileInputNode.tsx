'use client';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { usePipelineStore } from '@/store/usePipelineStore';
import { useRef } from 'react';

export function FileInputNode({ id, data }: NodeProps) {
  const updateNodeData = usePipelineStore((state) => state.updateNodeData);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      updateNodeData(id, { error: 'File too large (max 10 MB)', value: '' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      updateNodeData(id, { value: e.target?.result as string, error: undefined, fileName: file.name });
    };
    reader.onerror = () => updateNodeData(id, { error: 'Failed to read file.' });
    reader.readAsText(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const fileName = data.fileName as string | undefined;

  return (
    <div className="bg-[#1A1A1E]/90 backdrop-blur-md border border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.15)] rounded-xl p-5 min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          <span className="font-semibold text-sm text-indigo-100 uppercase tracking-widest">{data.label as string}</span>
        </div>
        <div className="flex items-center gap-1">
          {fileName && (
            <button
              onClick={() => { updateNodeData(id, { value: '', fileName: undefined }); if (inputRef.current) inputRef.current.value = ''; }}
              className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-gray-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => usePipelineStore.getState().deleteNode(id)}
            className="text-gray-500 hover:text-red-400 hover:bg-white/5 rounded p-1 transition-colors"
            title="Delete Node"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="w-full border-2 border-dashed border-indigo-500/30 rounded-lg p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-500/60 hover:bg-indigo-500/5 transition-all"
      >
        {fileName ? (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span className="text-xs text-emerald-400 font-mono truncate max-w-[200px]">{fileName}</span>
            <span className="text-[10px] text-gray-500">Click to replace</span>
          </>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span className="text-xs text-gray-400 text-center">Drop .json, .txt, .log here<br /><span className="text-indigo-400">or click to browse</span></span>
            <span className="text-[10px] text-gray-600">Max 10 MB</span>
          </>
        )}
      </div>

      <input ref={inputRef} type="file" accept=".json,.txt,.log,.csv,.xml,.yaml,.yml,.sql" className="hidden" onChange={onFileChange} />

      {data.error && <div className="mt-2 text-xs text-red-400 font-mono">{data.error as string}</div>}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-500 border-none" />
    </div>
  );
}
