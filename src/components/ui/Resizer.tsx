"use client";

import { CSSProperties, PointerEvent } from "react";

type ResizerProps = {
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  className?: string;
  style?: CSSProperties;
};

export function Resizer({
  onPointerDown,
  className = "",
  style,
}: ResizerProps) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      tabIndex={0}
      onPointerDown={onPointerDown}
      className={`group flex w-3 cursor-col-resize items-center justify-center bg-transparent ${className}`.trim()}
      style={style}
    >
      <div className="h-10 w-1 rounded-full bg-white/10 transition-colors group-hover:bg-indigo-400/70" />
    </div>
  );
}
