import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { useArchitectureStore } from '@/store/useArchitectureStore';
import { InfraNodeData } from '@/data/pricingEngine';

const colors: Record<string, string> = {
  EC2: 'from-orange-500 to-orange-600',
  RDS: 'from-blue-500 to-blue-600',
  S3: 'from-green-500 to-green-600',
  Lambda: 'from-orange-400 to-orange-500',
  CloudFront: 'from-purple-500 to-purple-600',
  ALB: 'from-indigo-500 to-indigo-600',
};

const icons: Record<string, string> = {
  EC2: '🖥️', RDS: '🗄️', S3: '📦', Lambda: '⚡', CloudFront: '🌍', ALB: '⚖️'
};

export function InfraNode({ id, data }: NodeProps<Node<InfraNodeData>>) {
  const { updateNodeConfig, deleteNode } = useArchitectureStore();
  const color = colors[data.service] || 'from-gray-500 to-gray-600';
  const icon = icons[data.service] || '☁️';

  const handleChange = (key: string, value: any) => {
    updateNodeConfig(id, { [key]: value });
  };

  return (
    <div className="bg-[#121214]/90 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl min-w-[280px] text-gray-200 font-sans overflow-hidden group">
      
      {/* Handles */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white/50 border-none" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-white/50 border-none" />

      {/* Header */}
      <div className={`bg-gradient-to-r ${color} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <div>
            <div className="text-white font-bold text-sm tracking-wide">{data.service}</div>
            <div className="text-white/80 text-[10px] uppercase tracking-wider">{data.label}</div>
          </div>
        </div>
        <button
          onClick={() => deleteNode(id)}
          className="opacity-0 group-hover:opacity-100 text-white/60 hover:text-white transition-opacity"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      {/* Config Panel */}
      <div className="p-4 flex flex-col gap-3">
        {data.service === 'EC2' && (
          <>
            <label className="flex flex-col gap-1 text-[11px] font-medium text-gray-400">
              Instance Type
              <select className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200" value={data.config.instanceType} onChange={(e) => handleChange('instanceType', e.target.value)}>
                <option value="t3.nano">t3.nano ($3.80/mo)</option>
                <option value="t3.micro">t3.micro ($7.59/mo)</option>
                <option value="t3.small">t3.small ($15.18/mo)</option>
                <option value="t3.medium">t3.medium ($30.36/mo)</option>
                <option value="t3.large">t3.large ($60.73/mo)</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-[11px] font-medium text-gray-400">
              Instance Count
              <input type="number" min="1" className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200" value={data.config.count} onChange={(e) => handleChange('count', parseInt(e.target.value) || 1)} />
            </label>
          </>
        )}

        {data.service === 'RDS' && (
          <>
            <label className="flex flex-col gap-1 text-[11px] font-medium text-gray-400">
              Instance Type
              <select className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200" value={data.config.instanceType} onChange={(e) => handleChange('instanceType', e.target.value)}>
                <option value="db.t3.micro">db.t3.micro</option>
                <option value="db.t3.small">db.t3.small</option>
                <option value="db.t3.medium">db.t3.medium</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-[11px] font-medium text-gray-400">
              Storage (GB gp2)
              <input type="number" min="20" className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200" value={data.config.storageGB} onChange={(e) => handleChange('storageGB', parseInt(e.target.value) || 20)} />
            </label>
            <label className="flex items-center gap-2 text-[11px] font-medium text-gray-400 mt-1 cursor-pointer">
              <input type="checkbox" checked={data.config.multiAZ} onChange={(e) => handleChange('multiAZ', e.target.checked)} />
              Multi-AZ (Standby)
            </label>
          </>
        )}

        {data.service === 'S3' && (
          <>
            <label className="flex flex-col gap-1 text-[11px] font-medium text-gray-400">
              Storage (GB)
              <input type="number" min="0" className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200" value={data.config.storageGB} onChange={(e) => handleChange('storageGB', parseInt(e.target.value) || 0)} />
            </label>
          </>
        )}

        {data.service === 'ALB' && (
          <>
            <label className="flex flex-col gap-1 text-[11px] font-medium text-gray-400">
              LCU Count (Load Balancer Capacity Units)
              <input type="number" min="1" step="0.1" className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200" value={data.config.lcuCount} onChange={(e) => handleChange('lcuCount', parseFloat(e.target.value) || 1)} />
            </label>
          </>
        )}
      </div>

      {/* Footer / Cost */}
      <div className="bg-black/40 px-4 py-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">Est. Cost</span>
        <span className="text-lg font-bold text-emerald-400">${data.costPerMonth.toFixed(2)}<span className="text-xs text-gray-500 font-normal">/mo</span></span>
      </div>

    </div>
  );
}
