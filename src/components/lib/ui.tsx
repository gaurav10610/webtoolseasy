import React from "react";
import { BasicChip, ChipColor, ChipVariant, ChipSize } from "./chips";

export function AppContainer({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AppBox({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  sx?: Record<string, unknown>;
  component?: string;
}) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function AppStack({
  children,
  className = "",
  direction = "column",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  spacing?: number | string;
  sx?: Record<string, unknown>;
}) {
  const dirClass =
    direction === "row"
      ? "flex-row"
      : direction === "row-reverse"
        ? "flex-row-reverse"
        : direction === "column-reverse"
          ? "flex-col-reverse"
          : "flex-col";

  return (
    <div className={`flex ${dirClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AppSurface({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  elevation?: number;
  variant?: string;
  sx?: Record<string, unknown>;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] text-[var(--mui-palette-text-primary)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AppCard({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: string;
  sx?: Record<string, unknown>;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] text-[var(--mui-palette-text-primary)] shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AppCardBody({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  sx?: Record<string, unknown>;
}) {
  return (
    <div className={`p-4 md:p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AppCardFooter({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  sx?: Record<string, unknown>;
}) {
  return (
    <div className={`flex items-center gap-2 p-4 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption"
  | "subtitle1"
  | "subtitle2";

type TextColor =
  | "initial"
  | "inherit"
  | "primary"
  | "secondary"
  | "textPrimary"
  | "textSecondary"
  | "error"
  | "warning"
  | "info"
  | "success";

interface AppTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  component?: React.ElementType;
  color?: TextColor;
  href?: string;
  target?: string;
  rel?: string;
  sx?: Record<string, unknown>;
}

const variantStyles: Record<TextVariant, { tag: React.ElementType; cls: string }> = {
  h1: {
    tag: "h1",
    cls: "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50",
  },
  h2: {
    tag: "h2",
    cls: "text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50",
  },
  h3: {
    tag: "h3",
    cls: "text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100",
  },
  h4: {
    tag: "h4",
    cls: "text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100",
  },
  h5: {
    tag: "h5",
    cls: "text-base font-semibold text-slate-800 dark:text-slate-100",
  },
  h6: {
    tag: "h6",
    cls: "text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100",
  },
  body1: {
    tag: "p",
    cls: "text-base leading-relaxed text-slate-700 dark:text-slate-300",
  },
  body2: {
    tag: "p",
    cls: "text-sm leading-normal text-slate-600 dark:text-slate-400",
  },
  caption: {
    tag: "span",
    cls: "text-xs text-slate-500 dark:text-slate-400",
  },
  subtitle1: {
    tag: "h6",
    cls: "text-base font-medium text-slate-700 dark:text-slate-300",
  },
  subtitle2: {
    tag: "h6",
    cls: "text-sm font-medium text-slate-600 dark:text-slate-400",
  },
};

const colorStyles: Record<TextColor, string> = {
  initial: "",
  inherit: "text-inherit",
  primary: "!text-[var(--mui-palette-primary-main)]",
  secondary: "!text-[var(--mui-palette-secondary-main)]",
  textPrimary: "!text-[var(--mui-palette-text-primary)]",
  textSecondary: "!text-[var(--mui-palette-text-secondary)]",
  error: "!text-red-600 dark:!text-red-400",
  warning: "!text-amber-600 dark:!text-amber-400",
  info: "!text-blue-600 dark:!text-blue-400",
  success: "!text-emerald-600 dark:!text-emerald-400",
};

export function AppText({
  children,
  variant,
  component,
  color,
  className = "",
  href,
  target,
  rel,
  ...props
}: AppTextProps) {
  const variantConfig = variant ? variantStyles[variant] : null;
  const Component = component || (variantConfig ? variantConfig.tag : "span");

  const vCls = variantConfig ? variantConfig.cls : "";
  const cCls = color ? colorStyles[color] || "" : "";

  const finalClassName = `${vCls} ${cCls} ${className}`.trim();

  if (Component === "a" || href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={finalClassName}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <Component className={finalClassName} {...props}>
      {children}
    </Component>
  );
}

export function AppChip({
  label,
  variant = "outlined",
  color = "primary",
  size = "small",
  className = "",
  onClick,
  ...props
}: {
  label: React.ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  className?: string;
  onClick?: () => void;
  [key: string]: unknown;
}) {
  return (
    <BasicChip
      label={label}
      variant={variant}
      color={color}
      size={size}
      className={className}
      {...props}
    />
  );
}

export function AppField({
  name,
  placeholder,
  size = "medium",
  fullWidth = true,
  defaultValue,
  value,
  onChange,
  className = "",
  slotProps,
  ...props
}: {
  name?: string;
  placeholder?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  slotProps?: {
    input?: {
      startAdornment?: React.ReactNode;
      endAdornment?: React.ReactNode;
    };
  };
  [key: string]: unknown;
}) {
  const startAdornment = slotProps?.input?.startAdornment;
  const endAdornment = slotProps?.input?.endAdornment;
  const isSmall = size === "small";

  return (
    <div
      className={`relative flex items-center ${
        fullWidth ? "w-full" : "w-auto"
      } ${className}`}
    >
      {startAdornment && (
        <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
          {startAdornment}
        </div>
      )}
      <input
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all ${
          isSmall ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-base"
        } ${startAdornment ? "pl-10" : ""} ${endAdornment ? "pr-10" : ""}`}
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
      {endAdornment && (
        <div className="absolute right-3.5 flex items-center text-slate-400">
          {endAdornment}
        </div>
      )}
    </div>
  );
}

export function AppRule({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHRElement> & { sx?: Record<string, unknown> }) {
  return (
    <hr
      className={`border-t border-[var(--mui-palette-divider)] my-4 ${className}`}
      {...props}
    />
  );
}

export function AppAdornment({
  children,
  className = "",
  position = "start",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  position?: "start" | "end";
  [key: string]: unknown;
}) {
  return (
    <span
      className={`inline-flex items-center shrink-0 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function AppAccordion({
  expanded,
  children,
  className = "",
  ...props
}: {
  expanded?: boolean;
  onChange?: () => void;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <details
      open={expanded}
      className={`w-full group ${className}`}
      {...(props as React.DetailsHTMLAttributes<HTMLDetailsElement>)}
    >
      {children}
    </details>
  );
}

export function AppAccordionHeader({
  children,
  expandIcon,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  expandIcon?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <summary
      className={`flex w-full items-center justify-between py-2 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden ${className}`}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {expandIcon && (
        <span className="shrink-0 transition-transform duration-200 group-open:rotate-180">
          {expandIcon}
        </span>
      )}
    </summary>
  );
}

export function AppAccordionBody({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <div className={`w-full py-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
