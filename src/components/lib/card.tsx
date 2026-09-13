import React from "react";

export default function BasicCardWithActions({
  cardContent,
  cardActions,
  variant = "outlined",
  className = "",
}: Readonly<{
  cardContent: React.ReactNode;
  cardActions?: React.ReactNode;
  variant?: "outlined" | "elevation";
  sx?: Record<string, unknown>;
  className?: string;
}>) {
  const variantClass =
    variant === "outlined"
      ? "border border-[var(--mui-palette-divider)] shadow-sm"
      : "shadow-md";

  return (
    <div
      className={`rounded-2xl bg-[var(--mui-palette-background-paper)] ${variantClass} ${className}`}
    >
      <div className="p-4 md:p-6">{cardContent}</div>
      {cardActions && (
        <div className="flex items-center gap-2 p-4 pt-0">{cardActions}</div>
      )}
    </div>
  );
}
