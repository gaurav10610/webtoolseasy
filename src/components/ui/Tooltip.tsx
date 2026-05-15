"use client";

import { ReactNode } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Tooltip({ content, children, className = "" }: TooltipProps) {
  return (
    <span className={`group relative inline-flex ${className}`.trim()}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-black px-2.5 py-1 text-[11px] font-medium text-white shadow-lg group-hover:block group-focus-within:block"
      >
        {content}
      </span>
    </span>
  );
}
