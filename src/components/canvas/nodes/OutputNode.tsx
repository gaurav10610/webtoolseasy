import { Handle, Position, NodeProps } from '@xyflow/react';

export function OutputNode({ data }: NodeProps) {
  const value = (data.value as string) || '';

  return (
    <div className="bg-[#1A1A1E]/90 backdrop-blur-md border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] rounded-xl p-5 min-w-[320px]">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-emerald-500 border-none" />
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="font-semibold text-sm text-emerald-100 uppercase tracking-widest">{data.label as string}</span>
        </div>
        
        {value && (
          <button 
            onClick={() => navigator.clipboard.writeText(value)}
            className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-gray-400 hover:text-white transition-colors"
          >
            Copy
          </button>
        )}
      </div>

      <div className="bg-black/60 border border-white/5 rounded-lg p-3 max-h-[300px] overflow-auto custom-scrollbar">
        {value ? (
          <pre className="text-[11px] text-emerald-300/90 font-mono whitespace-pre-wrap">{value}</pre>
        ) : (
          <div className="text-[11px] text-gray-600 italic text-center py-4">Waiting for pipeline execution...</div>
        )}
      </div>
    </div>
  );
}
