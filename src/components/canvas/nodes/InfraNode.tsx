import { Handle, Position, NodeProps, Node } from "@xyflow/react";
import { useArchitectureStore } from "@/store/useArchitectureStore";
import { InfraNodeData, calculateNodeCost } from "@/data/pricingEngine";
import { serviceRegistry } from "@/data/serviceRegistry";

export function InfraNode({ id, data }: NodeProps<Node<InfraNodeData>>) {
  const { updateNodeConfig, deleteNode } = useArchitectureStore();
  const serviceDef = serviceRegistry[data.service];
  const config = data.config ?? {};
  const color = serviceDef?.color || "from-gray-500 to-gray-600";
  const icon = serviceDef?.icon || "☁️";
  const displayName = serviceDef?.displayName || data.service;
  const showNoChargeBadge =
    data.service === "ElasticBeanstalk" && !!config.noAdditionalCharge;
  const showInfoOnlyBadge = !!config.infoOnly;

  const purchaseOption = String(config.purchaseOption || "on-demand");
  const reservedSavingsText =
    purchaseOption === "reserved-1yr"
      ? "Reserved 1yr: ~30% savings"
      : purchaseOption === "reserved-3yr"
        ? "Reserved 3yr: ~45% savings"
        : null;
  const showSpotBadge = data.service === "EC2" && purchaseOption === "spot";

  const isEc2FreeTier =
    data.service === "EC2" &&
    config.instanceType === "t3.micro" &&
    Number(config.count || 0) <= 1 &&
    Number(config.hoursPerMonth || 0) <= 750;
  const isRdsFreeTier =
    data.service === "RDS" &&
    config.instanceType === "db.t3.micro" &&
    !config.multiAZ &&
    Number(config.storageGB || 0) <= 20;
  const isFreeTierEligible = isEc2FreeTier || isRdsFreeTier;

  const postFreeTierCost = isFreeTierEligible
    ? calculateNodeCost(
        data.service,
        { ...data.config, purchaseOption: "on-demand" },
        data.region,
      )
    : 0;

  const handleChange = (key: string, value: any) => {
    updateNodeConfig(id, { [key]: value });
  };

  return (
    <div className="bg-[#121214]/90 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl min-w-[280px] text-gray-200 font-sans overflow-hidden group">
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white/50 border-none"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white/50 border-none"
      />

      {/* Header */}
      <div
        className={`bg-gradient-to-r ${color} px-4 py-3 flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <div>
            <div className="text-white font-bold text-sm tracking-wide">
              {data.service}
            </div>
            <div className="text-white/80 text-[10px] uppercase tracking-wider">
              {displayName}
            </div>
          </div>
        </div>
        <button
          onClick={() => deleteNode(id)}
          className="opacity-0 group-hover:opacity-100 text-white/60 hover:text-white transition-opacity"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Config Panel */}
      <div className="p-4 flex flex-col gap-3">
        {serviceDef?.configSchema.map((field) => {
          if (field.type === "select") {
            return (
              <label
                key={field.key}
                className="flex flex-col gap-1 text-[11px] font-medium text-gray-400"
              >
                {field.label}
                <select
                  className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200"
                  value={
                    config[field.key] ??
                    (serviceDef?.defaultConfig as any)?.[field.key] ??
                    ""
                  }
                  onChange={(e) => handleChange(field.key, e.target.value)}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          }
          if (field.type === "number") {
            return (
              <label
                key={field.key}
                className="flex flex-col gap-1 text-[11px] font-medium text-gray-400"
              >
                {field.label}
                <input
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step || 1}
                  className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-200"
                  value={config[field.key]}
                  onChange={(e) =>
                    handleChange(field.key, parseFloat(e.target.value) || 0)
                  }
                />
              </label>
            );
          }
          if (field.type === "toggle") {
            return (
              <label
                key={field.key}
                className="flex items-center gap-2 text-[11px] font-medium text-gray-400 mt-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!config[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.checked)}
                />
                {field.label}
              </label>
            );
          }
          return null;
        })}
      </div>

      {/* Footer / Cost */}
      <div className="bg-black/40 px-4 py-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">
            Est. Cost
          </span>
          {showNoChargeBadge ? (
            <span className="inline-flex w-fit items-center rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
              No additional charge
            </span>
          ) : null}
          {showInfoOnlyBadge ? (
            <span className="inline-flex w-fit items-center rounded-full border border-sky-500/40 bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-300">
              Informational node
            </span>
          ) : null}
          {isFreeTierEligible ? (
            <span className="inline-flex w-fit items-center rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
              Free Tier Eligible
            </span>
          ) : null}
          {isFreeTierEligible ? (
            <span className="text-[10px] text-emerald-300/80">
              After free tier: ${postFreeTierCost.toFixed(2)}/mo
            </span>
          ) : null}
          {reservedSavingsText ? (
            <span className="text-[10px] text-amber-300">
              {reservedSavingsText}
            </span>
          ) : null}
          {showSpotBadge ? (
            <span className="text-[10px] text-amber-300">
              Spot pricing: interruptible, ~70% cheaper
            </span>
          ) : null}
        </div>
        <span className="text-lg font-bold text-emerald-400">
          ${data.costPerMonth.toFixed(2)}
          <span className="text-xs text-gray-500 font-normal">/mo</span>
        </span>
      </div>
    </div>
  );
}
