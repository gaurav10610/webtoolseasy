import React from "react";

export function PaperWithChildren({
  children,
  variant = "elevation",
  square = true,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  elevation?: number;
  variant?: "elevation" | "outlined";
  square?: boolean;
  className?: string;
}>) {
  const variantClass =
    variant === "outlined"
      ? "border border-[var(--mui-palette-divider)] shadow-sm"
      : "shadow-md";
  const roundedClass = square ? "rounded-none" : "rounded-2xl";

  return (
    <div
      className={`bg-[var(--mui-palette-background-paper)] text-[var(--mui-palette-text-primary)] ${roundedClass} ${variantClass} ${className}`}
    >
      {children}
    </div>
  );
}
