import { Handle, Position, NodeProps } from '@xyflow/react';
import { usePipelineStore } from '@/store/usePipelineStore';

export function InputNode({ id, data }: NodeProps) {
  const updateNodeData = usePipelineStore((state) => state.updateNodeData);

  const onChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(id, { value: evt.target.value });
  };

  const handleClear = () => {
    updateNodeData(id, { value: '' });
  };

  return (
    <div className="bg-[#1A1A1E]/90 backdrop-blur-md border border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.15)] rounded-xl p-5 min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          <span className="font-semibold text-sm text-indigo-100 uppercase tracking-widest">{data.label as string}</span>
        </div>
        {data.value && (
          <button 
            onClick={handleClear}
            className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-gray-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      
      <textarea
        className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-xs text-gray-300 font-mono focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all custom-scrollbar"
        value={(data.value as string) || ''}
        onChange={onChange}
        rows={5}
        placeholder="Paste your raw payload here..."
      />
      
      {data.error && <div className="text-red-400 text-[10px] mt-2 font-mono">Error: {data.error as string}</div>}
      
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-500 border-none" />
    </div>
  );
}
