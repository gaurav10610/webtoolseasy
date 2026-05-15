import { ReactNode } from "react";

type BadgeVariant = "info" | "warning" | "success" | "error" | "neutral";

type BadgeProps = {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  info: "border-sky-500/20 bg-sky-500/10 text-sky-200",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-200",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-200",
  error: "border-rose-500/20 bg-rose-500/10 text-rose-200",
  neutral: "border-white/10 bg-white/5 text-gray-200",
};

export function Badge({
  variant = "neutral",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
