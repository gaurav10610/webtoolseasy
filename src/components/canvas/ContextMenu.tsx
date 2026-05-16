import React from "react";

type ContextMenuProps = {
  x: number;
  y: number;
  onClose: () => void;
  options: {
    label?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    divider?: boolean;
    danger?: boolean;
  }[];
};

export function ContextMenu({ x, y, onClose, options }: ContextMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
      <div 
        className="fixed z-50 bg-[#121214] border border-white/10 rounded-xl shadow-2xl py-1 min-w-[180px] text-sm"
        style={{ left: x, top: y }}
      >
        {options.map((opt, i) => (
          opt.divider ? (
            <div key={`div-${i}`} className="h-px bg-white/10 my-1 mx-2" />
          ) : (
            <button
              key={opt.label || i}
              onClick={() => {
                if (opt.onClick) opt.onClick();
                onClose();
              }}
              className={`w-full text-left px-4 py-2 hover:bg-white/5 flex items-center gap-2 transition-colors ${
                opt.danger ? "text-red-400 hover:text-red-300" : "text-gray-200"
              }`}
            >
              {opt.icon && <span className="w-4 h-4">{opt.icon}</span>}
              {opt.label}
            </button>
          )
        ))}
      </div>
    </>
  );
}
