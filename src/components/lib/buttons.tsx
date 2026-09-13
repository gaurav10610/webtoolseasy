import Link from "next/link";
import React, { type JSX } from "react";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant = "text" | "outlined" | "contained";
export type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export function getButtonClasses({
  size = "medium",
  variant = "contained",
  color = "primary",
  className = "",
}: {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  className?: string;
}): string {
  const base =
    "inline-flex items-center justify-center font-medium transition-all active:scale-[0.98] cursor-pointer";

  const sizeClasses: Record<ButtonSize, string> = {
    small: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
    medium: "text-sm px-4 py-2 gap-2 rounded-xl",
    large: "text-base px-5 py-2.5 gap-2.5 rounded-xl",
  };

  const variantColorClasses: Record<ButtonVariant, Record<string, string>> = {
    contained: {
      primary:
        "bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-500 dark:hover:bg-sky-600 shadow-sm",
      secondary:
        "bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600 shadow-sm",
      success:
        "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 shadow-sm",
      error:
        "bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600 shadow-sm",
      inherit:
        "bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-200 dark:hover:bg-white dark:text-slate-900 shadow-sm",
    },
    outlined: {
      primary:
        "border border-sky-600 text-sky-600 hover:bg-sky-50 dark:border-sky-400 dark:text-sky-300 dark:hover:bg-sky-950/30",
      secondary:
        "border border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-300 dark:hover:bg-purple-950/30",
      success:
        "border border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300",
      error:
        "border border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-300",
      inherit:
        "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
    },
    text: {
      primary:
        "text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/30",
      secondary:
        "text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/30",
      inherit:
        "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
    },
  };

  const styleCls =
    variantColorClasses[variant]?.[color] ||
    variantColorClasses[variant]?.inherit ||
    "";

  return `${base} ${sizeClasses[size]} ${styleCls} ${className}`.trim();
}

export function ButtonWithHandler({
  size = "medium",
  variant = "contained",
  color = "primary",
  buttonText,
  onClick,
  startIcon,
  endIcon,
  className = "",
}: Readonly<{
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  buttonText: string | React.ReactNode;
  onClick?: () => void;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  className?: string;
}>): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={getButtonClasses({ size, variant, color, className })}
    >
      {startIcon && <span className="inline-flex shrink-0">{startIcon}</span>}
      <span>{buttonText}</span>
      {endIcon && <span className="inline-flex shrink-0">{endIcon}</span>}
    </button>
  );
}

export function ButtonWithLink({
  size = "medium",
  variant = "contained",
  color = "primary",
  buttonText,
  href,
  className = "",
  title = "",
  target,
  rel,
}: Readonly<{
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  buttonText: string | React.ReactNode;
  href: string;
  className?: string;
  title?: string;
  target?: string;
  rel?: string;
}>): JSX.Element {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        className={getButtonClasses({ size, variant, color, className })}
        title={title}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
      >
        {buttonText}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={getButtonClasses({ size, variant, color, className })}
      title={title}
      target={target}
      rel={rel}
    >
      {buttonText}
    </Link>
  );
}
