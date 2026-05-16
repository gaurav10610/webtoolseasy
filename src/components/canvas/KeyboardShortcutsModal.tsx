"use client";

type KeyboardShortcutsModalProps = {
  open: boolean;
  onClose: () => void;
};

const shortcuts = [
  { keys: ["Delete", "Backspace"], action: "Delete selected nodes/edges" },
  { keys: ["⌘/Ctrl", "A"], action: "Select all nodes" },
  { keys: ["⌘/Ctrl", "D"], action: "Duplicate selected nodes" },
  { keys: ["⌘/Ctrl", "Z"], action: "Undo" },
  { keys: ["⌘/Ctrl", "Shift", "Z"], action: "Redo" },
  { keys: ["Escape"], action: "Deselect all / close panels" },
  { keys: ["↑ ↓ ← →"], action: "Nudge selected nodes by 10px" },
  { keys: ["Shift", "↑ ↓ ← →"], action: "Nudge selected nodes by 50px" },
  { keys: ["F"], action: "Fit canvas to view" },
  { keys: ["?"], action: "Toggle this shortcuts panel" },
];

export function KeyboardShortcutsModal({
  open,
  onClose,
}: KeyboardShortcutsModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-md rounded-3xl border border-white/10 bg-[#121214] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Keyboard Shortcuts</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-400 hover:bg-white/10 transition-colors"
          >
            Esc
          </button>
        </div>
        <div className="space-y-2">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.action}
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
            >
              <span className="text-sm text-gray-300">{shortcut.action}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="rounded-lg border border-white/10 bg-black/30 px-2 py-0.5 text-xs font-semibold text-gray-200"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
