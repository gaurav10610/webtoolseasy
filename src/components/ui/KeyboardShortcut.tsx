import { ReactNode } from "react";

type KeyboardShortcutProps = {
  children: ReactNode;
};

export function KeyboardShortcut({ children }: KeyboardShortcutProps) {
  return (
    <kbd className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-200">
      {children}
    </kbd>
  );
}
