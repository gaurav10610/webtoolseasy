import { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 py-10 text-center ${className}`.trim()}
    >
      {icon && <div className="mb-4 text-3xl">{icon}</div>}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
