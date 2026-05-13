import { Handle, Position, NodeProps } from '@xyflow/react';
import { nodeRegistry } from '@/components/canvas/nodeRegistry';

export function GenericNode({ type, data }: NodeProps) {
  const registryEntry = nodeRegistry[type];
  
  let borderColor = 'border-white/10 hover:border-indigo-500/50';
  let glow = '';
  
  if (data.error) {
    borderColor = 'border-red-500/50';
    glow = 'shadow-[0_0_15px_rgba(239,68,68,0.2)]';
  } else if (data.output) {
    borderColor = 'border-emerald-500/50';
    glow = 'shadow-[0_0_15px_rgba(16,185,129,0.1)]';
  }

  return (
    <div className={`bg-[#1A1A1E]/90 backdrop-blur-md border ${borderColor} ${glow} rounded-xl p-5 min-w-[240px] transition-all duration-300`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-indigo-500 border-none" />
      
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-2 h-2 rounded-full ${data.isProcessing ? 'bg-indigo-400 animate-pulse' : data.error ? 'bg-red-500' : data.output ? 'bg-emerald-500' : 'bg-gray-600'}`} />
        <span className="font-semibold text-sm text-gray-200 tracking-wide">{data.label as string}</span>
      </div>
      
      <div className="text-[11px] text-gray-400 leading-relaxed mb-1">{registryEntry?.description}</div>
      
      {data.error && (
        <div className="mt-3 text-xs bg-red-950/50 text-red-300 p-2.5 rounded-lg border border-red-900/50 overflow-x-auto break-all font-mono">
          {data.error as string}
        </div>
      )}
      
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-500 border-none" />
    </div>
  );
}
