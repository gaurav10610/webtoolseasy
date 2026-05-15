"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type HistoryDrawerProps = {
  items: string[];
  onSelect: (value: string) => void;
};

export function HistoryDrawer({ items, onSelect }: HistoryDrawerProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#121214]/90 p-4 shadow-2xl shadow-black/30 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-white">Recent inputs</div>
          <div className="text-xs text-gray-500">
            Stored locally in your browser
          </div>
        </div>
        <Badge variant="neutral">{items.length}</Badge>
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-gray-500">
            No history yet.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate text-sm text-gray-200">
                  {item.slice(0, 48)}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onSelect(item)}>
                Load
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
