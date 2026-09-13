import React from "react";

interface SkeletonWithPropsProps {
  variant?: "text" | "rectangular" | "circular";
  height?: number | string;
  width?: number | string;
  className?: string;
}

export function SkeletonWithProps({
  variant = "rectangular",
  height = 300,
  width = "100%",
  className = "",
}: SkeletonWithPropsProps) {
  const roundedClass =
    variant === "circular"
      ? "rounded-full"
      : variant === "text"
        ? "rounded"
        : "rounded-xl";

  const style: React.CSSProperties = {};
  if (typeof height === "number") {
    style.height = `${height}px`;
  } else if (height) {
    style.height = height;
  }
  if (typeof width === "number") {
    style.width = `${width}px`;
  } else if (width) {
    style.width = width;
  }

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`animate-pulse bg-slate-200/80 dark:bg-slate-800/80 ${roundedClass} ${className}`}
    />
  );
}

/**
 * Enhanced skeleton for tool pages with better content structure
 * Reduces visual shift and improves perceived performance
 */
export function ToolPageSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4 p-4 animate-pulse" aria-busy="true">
      {/* Tool Title Skeleton */}
      <div className="flex flex-col gap-2 items-center">
        <div className="h-10 w-3/5 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Tool Controls Skeleton */}
      <div className="flex gap-2 justify-center flex-wrap">
        <div className="h-10 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Main Content Area Skeleton */}
      <div className="flex flex-col gap-3">
        <div className="h-72 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />

        {/* Secondary Content */}
        <div className="flex gap-3 mt-2">
          <div className="h-36 w-1/2 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-36 w-1/2 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex gap-2 justify-center mt-4">
        <div className="h-9 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-9 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Loading indicator */}
      <div className="text-center mt-4">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Loading tool...
        </span>
      </div>
    </div>
  );
}
