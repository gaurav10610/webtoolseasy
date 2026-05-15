type TabItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

type TabsProps = {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
};

export function Tabs({ items, activeId, onChange, className = "" }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Tabs"
      className={`inline-flex rounded-2xl border border-white/10 bg-white/5 p-1 ${className}`.trim()}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            onClick={() => onChange(item.id)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${active ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"} ${item.disabled ? "cursor-not-allowed opacity-50" : ""}`.trim()}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
