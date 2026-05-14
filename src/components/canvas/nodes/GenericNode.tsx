import { Handle, Position, NodeProps } from '@xyflow/react';
import { nodeRegistry } from '@/components/canvas/nodeRegistry';

import { usePipelineStore } from '@/store/usePipelineStore';

export function GenericNode({ id, type, data }: NodeProps) {
  const registryEntry = nodeRegistry[type];
  const updateNodeData = usePipelineStore((state) => state.updateNodeData);
  
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
      
      <div className="text-[11px] text-gray-400 leading-relaxed mb-3">{registryEntry?.description}</div>
      
      {registryEntry?.configFields && (
        <div className="flex flex-col gap-2 mb-3 bg-black/20 p-2 rounded-lg border border-white/5">
          {registryEntry.configFields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1">
              <label className="text-[10px] text-indigo-300 font-medium uppercase tracking-wider">{field.label}</label>
              {field.type === 'select' && field.options ? (
                <select
                  className="bg-black/60 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  value={(data[field.key] as string) || field.options[0]?.value || ''}
                  onChange={(e) => updateNodeData(id, { [field.key]: e.target.value })}
                >
                  {field.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  className="bg-black/60 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600 min-h-[60px] resize-y"
                  placeholder={field.placeholder}
                  value={(data[field.key] as string) || ''}
                  onChange={(e) => updateNodeData(id, { [field.key]: e.target.value })}
                />
              ) : (
                <input
                  type={field.type}
                  className="bg-black/60 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                  placeholder={field.placeholder}
                  value={(data[field.key] as string) || ''}
                  onChange={(e) => updateNodeData(id, { [field.key]: e.target.value })}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {data.output && !data.error && (
        <div className="mt-2 bg-emerald-950/30 border border-emerald-800/30 rounded-lg p-2 max-h-[60px] overflow-hidden">
          <pre className="text-[10px] text-emerald-400/80 font-mono truncate">{(data.output as string).slice(0, 120)}</pre>
        </div>
      )}
      
      {data.error && (
        <div className="mt-3 text-xs bg-red-950/50 text-red-300 p-2.5 rounded-lg border border-red-900/50 overflow-x-auto break-all font-mono">
          {data.error as string}
        </div>
      )}
      
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-500 border-none" />
    </div>
  );
}
