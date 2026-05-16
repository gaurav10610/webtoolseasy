"use client";
import React, { useEffect, useState } from "react";
import { useArchitectureStore } from "@/store/useArchitectureStore";
import { InfraService, pricingStatus } from "@/data/pricingEngine";

import { availableServicesList } from "@/data/serviceRegistry";

export function Sidebar() {
  const { getTotalCost, nodes, selectedRegion, setRegion } =
    useArchitectureStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const totalCost = isHydrated ? getTotalCost() : 0;
  const annualCost = totalCost * 12;

  const categoryTotals = nodes.reduce<Record<string, number>>((acc, node) => {
    const category = availableServicesList.find(
      (entry) => entry.service === node.data.service,
    )?.category;
    if (!category) return acc;
    acc[category] = (acc[category] || 0) + Number(node.data.costPerMonth || 0);
    return acc;
  }, {});

  const chartPalette = [
    "#34d399",
    "#f59e0b",
    "#60a5fa",
    "#a78bfa",
    "#f472b6",
    "#22d3ee",
    "#f87171",
  ];
  const categoryEntries = Object.entries(categoryTotals).filter(
    ([, value]) => value > 0,
  );

  let runningShare = 0;
  const pieSegments =
    totalCost > 0
      ? categoryEntries.map(([category, value], index) => {
          const ratio = value / totalCost;
          const start = runningShare;
          runningShare += ratio;
          return {
            category,
            value,
            ratio,
            start,
            color: chartPalette[index % chartPalette.length],
          };
        })
      : [];

  const awsRegions = ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"];

  const onDragStart = (
    event: React.DragEvent,
    service: string | "Annotation",
  ) => {
    event.dataTransfer.setData("application/reactflow/service", service);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-72 bg-[#121214]/80 backdrop-blur-xl border-r border-white/10 h-full flex flex-col shadow-2xl shrink-0 z-20">
      {/* Total Cost Banner */}
      <div className="p-5 border-b border-white/10 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
        <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-1">
          Total Monthly Est.
        </div>
        <div className="text-3xl font-extrabold text-white tracking-tight">
          $
          {totalCost.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-xs text-emerald-300 mt-1 font-semibold">
          Annual: $
          {annualCost.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-gray-200">
          <span
            className={`h-1.5 w-1.5 rounded-full ${pricingStatus.isFallback ? "bg-amber-400" : "bg-emerald-400"}`}
          />
          {pricingStatus.isFallback
            ? "Quarterly baseline pricing"
            : "Weekly synced pricing"}
        </div>
        <div className="text-[11px] text-gray-400 mt-2 leading-relaxed">
          Prices are estimates for the {selectedRegion} region. Traffic
          bandwidth is not fully calculated.
        </div>
        <label className="mt-3 flex flex-col gap-1 text-[10px] uppercase tracking-widest text-gray-400">
          Region
          <select
            className="rounded-md border border-white/10 bg-black/40 px-2 py-1.5 text-xs font-semibold text-gray-100"
            value={selectedRegion}
            onChange={(event) => setRegion(event.target.value)}
          >
            {awsRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="p-4 border-b border-white/10 bg-white/[0.02]">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
          Cost Breakdown
        </div>
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 40 40" className="h-20 w-20 -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="15.915"
              fill="none"
              stroke="#1f2937"
              strokeWidth="6"
            />
            {pieSegments.map((segment) => (
              <circle
                key={segment.category}
                cx="20"
                cy="20"
                r="15.915"
                fill="none"
                stroke={segment.color}
                strokeWidth="6"
                strokeDasharray={`${(segment.ratio * 100).toFixed(3)} ${(100 - segment.ratio * 100).toFixed(3)}`}
                strokeDashoffset={`${(100 - segment.start * 100).toFixed(3)}`}
              >
                <title>
                  {segment.category}: ${segment.value.toFixed(2)} / month
                </title>
              </circle>
            ))}
          </svg>

          <div className="flex-1 space-y-1">
            {pieSegments.length === 0 ? (
              <div className="text-[11px] text-gray-500">
                Add nodes to view category costs.
              </div>
            ) : (
              pieSegments.map((segment) => (
                <div
                  key={`${segment.category}-legend`}
                  className="flex items-center justify-between gap-2 text-[11px]"
                  title={`${segment.category}: $${segment.value.toFixed(2)} / month`}
                >
                  <span className="inline-flex items-center gap-1.5 text-gray-300">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    {segment.category}
                  </span>
                  <span className="text-gray-400">
                    ${segment.value.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="p-3 border-b border-white/10">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2 py-1">
          AWS Resources
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-2">
        {availableServicesList.map((service) => (
          <div
            key={service.service}
            className="bg-white/5 border border-white/10 p-3 rounded-xl cursor-grab active:cursor-grabbing hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-200 group flex items-start gap-3"
            onDragStart={(e) => onDragStart(e, service.service)}
            draggable
          >
            <div className="text-xl mt-0.5">{service.icon}</div>
            <div>
              <div className="font-semibold text-sm text-gray-200 group-hover:text-indigo-300 transition-colors">
                {service.displayName}
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                {service.description}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-widest px-2 py-1 border-t border-white/10 pt-3">
          Utilities
        </div>
        <div
          className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-xl cursor-grab active:cursor-grabbing hover:border-yellow-500/50 hover:bg-yellow-500/20 transition-all duration-200 group"
          onDragStart={(e) => onDragStart(e, "Annotation")}
          draggable
        >
          <div className="font-semibold text-sm text-yellow-500 group-hover:text-yellow-400 transition-colors">
            Sticky Note
          </div>
          <div className="text-[11px] text-yellow-500/60 mt-1 leading-relaxed">
            Add text annotations to the canvas.
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="bg-indigo-900/20 border border-indigo-500/20 p-3 rounded-xl text-center">
          <p className="text-[11px] text-indigo-300 leading-relaxed">
            Drag components onto the canvas to architect your infrastructure.
          </p>
        </div>
      </div>
    </aside>
  );
}
