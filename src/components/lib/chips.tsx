import React from "react";
import Link from "next/link";

export type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export type ChipVariant = "filled" | "outlined";
export type ChipSize = "small" | "medium";

export function getChipClasses({
  color = "primary",
  variant = "outlined",
  size = "small",
  className = "",
}: {
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
  className?: string;
}): string {
  const base =
    "inline-flex items-center justify-center font-medium rounded-full transition-colors whitespace-nowrap";
  const sizeCls = size === "small" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1";

  const colorClsMap: Record<ChipVariant, Record<ChipColor, string>> = {
    outlined: {
      primary:
        "border border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-300 bg-sky-50/50 dark:bg-sky-950/20",
      secondary:
        "border border-purple-500 text-purple-700 dark:border-purple-400 dark:text-purple-300 bg-purple-50/50 dark:bg-purple-950/20",
      success:
        "border border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20",
      warning:
        "border border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/20",
      error:
        "border border-red-500 text-red-700 dark:border-red-400 dark:text-red-300 bg-red-50/50 dark:bg-red-950/20",
      info:
        "border border-blue-500 text-blue-700 dark:border-blue-400 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-950/20",
      default:
        "border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300 bg-transparent",
    },
    filled: {
      primary: "bg-sky-600 text-white dark:bg-sky-500 shadow-sm",
      secondary: "bg-purple-600 text-white dark:bg-purple-500 shadow-sm",
      success: "bg-emerald-600 text-white dark:bg-emerald-500 shadow-sm",
      warning: "bg-amber-500 text-white dark:bg-amber-600 shadow-sm",
      error: "bg-red-600 text-white dark:bg-red-500 shadow-sm",
      info: "bg-blue-600 text-white dark:bg-blue-500 shadow-sm",
      default: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    },
  };

  const styleCls = colorClsMap[variant]?.[color] || colorClsMap.outlined.default;
  return `${base} ${sizeCls} ${styleCls} ${className}`.trim();
}

export function ClickableChip({
  label,
  variant = "outlined",
  handleClick,
  color = "primary",
  size = "small",
  className = "",
}: Readonly<{
  label: React.ReactNode;
  variant?: ChipVariant;
  handleClick: () => void;
  color?: ChipColor;
  sx?: Record<string, unknown>;
  size?: ChipSize;
  className?: string;
}>) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${getChipClasses({ color, variant, size, className })} cursor-pointer hover:opacity-85 active:scale-95`}
    >
      {label}
    </button>
  );
}

export function BasicChip({
  label,
  variant = "outlined",
  color = "primary",
  size = "small",
  className = "",
}: Readonly<{
  label: React.ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  sx?: Record<string, unknown>;
  size?: ChipSize;
  className?: string;
}>) {
  return (
    <span className={getChipClasses({ color, variant, size, className })}>
      {label}
    </span>
  );
}

export function ChipWithLink({
  label,
  href,
  variant = "outlined",
  color = "primary",
  size = "small",
  className = "",
  onChipClick,
}: Readonly<{
  label: string;
  variant?: ChipVariant;
  href: string;
  color?: ChipColor;
  sx?: Record<string, unknown>;
  size?: ChipSize;
  className?: string;
  onChipClick?: (label: string) => void;
}>) {
  return (
    <Link
      href={href}
      className="no-underline inline-flex"
      onClick={() => {
        if (onChipClick) {
          onChipClick(label);
        }
      }}
    >
      <span
        className={`${getChipClasses({ color, variant, size, className })} cursor-pointer hover:opacity-85`}
      >
        {label}
      </span>
    </Link>
  );
}
