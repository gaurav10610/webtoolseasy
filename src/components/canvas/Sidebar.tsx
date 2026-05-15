"use client";
import React, { useState } from "react";
import { useArchitectureStore } from "@/store/useArchitectureStore";
import { InfraService, pricingStatus } from "@/data/pricingEngine";

const availableServices: { type: InfraService; label: string; desc: string }[] =
  [
    {
      type: "ALB",
      label: "App Load Balancer",
      desc: "Distributes incoming traffic across EC2 instances.",
    },
    {
      type: "EC2",
      label: "EC2 Instance",
      desc: "Virtual server in Amazon's Elastic Compute Cloud.",
    },
    {
      type: "RDS",
      label: "RDS Database",
      desc: "Managed relational database service (Postgres/MySQL).",
    },
    {
      type: "S3",
      label: "S3 Bucket",
      desc: "Scalable object storage for assets and backups.",
    },
    {
      type: "CloudFront",
      label: "CloudFront CDN",
      desc: "Global content delivery network.",
    },
    {
      type: "Lambda",
      label: "AWS Lambda",
      desc: "Serverless compute function.",
    },
  ];

export function Sidebar() {
  const { getTotalCost } = useArchitectureStore();
  const totalCost = getTotalCost();

  const onDragStart = (event: React.DragEvent, service: string) => {
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
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-gray-200">
          <span
            className={`h-1.5 w-1.5 rounded-full ${pricingStatus.isFallback ? "bg-amber-400" : "bg-emerald-400"}`}
          />
          {pricingStatus.isFallback
            ? "Quarterly baseline pricing"
            : "Weekly synced pricing"}
        </div>
        <div className="text-[11px] text-gray-400 mt-2 leading-relaxed">
          Prices are estimates for the US-East-1 region. Traffic bandwidth is
          not fully calculated.
        </div>
      </div>

      <div className="p-3 border-b border-white/10">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2 py-1">
          AWS Resources
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-2">
        {availableServices.map((service) => (
          <div
            key={service.type}
            className="bg-white/5 border border-white/10 p-3 rounded-xl cursor-grab active:cursor-grabbing hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-200 group"
            onDragStart={(e) => onDragStart(e, service.type)}
            draggable
          >
            <div className="font-semibold text-sm text-gray-200 group-hover:text-indigo-300 transition-colors">
              {service.label}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              {service.desc}
            </div>
          </div>
        ))}
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
