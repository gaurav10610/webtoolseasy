import { ReactNode } from "react";

type PanelProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Panel({
  title,
  subtitle,
  action,
  footer,
  children,
  className = "",
}: PanelProps) {
  return (
    <section
      className={`rounded-3xl border border-white/10 bg-[#121214]/90 shadow-2xl shadow-black/30 backdrop-blur-md ${className}`.trim()}
    >
      {(title || subtitle || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            {title && (
              <div className="text-sm font-semibold text-white">{title}</div>
            )}
            {subtitle && (
              <div className="mt-1 text-xs text-gray-400">{subtitle}</div>
            )}
          </div>
          {action}
        </header>
      )}
      <div className="px-5 py-4">{children}</div>
      {footer && (
        <footer className="border-t border-white/10 px-5 py-4">{footer}</footer>
      )}
    </section>
  );
}
