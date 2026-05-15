"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { readClipboard } from "@/utils/clipboard";
import { useDevLensStore, persistDevLensState } from "@/store/useDevLensStore";
import { PanelContainer } from "./PanelContainer";
import { HistoryDrawer } from "./HistoryDrawer";

export function Studio() {
  const panels = useDevLensStore((state) => state.panels);
  const history = useDevLensStore((state) => state.history);
  const addPanel = useDevLensStore((state) => state.addPanel);
  const removePanel = useDevLensStore((state) => state.removePanel);
  const updatePanelInput = useDevLensStore((state) => state.updatePanelInput);
  const restoreFromHistory = useDevLensStore(
    (state) => state.restoreFromHistory,
  );

  useEffect(() => {
    persistDevLensState({
      panels,
      history,
      addPanel,
      removePanel,
      updatePanelInput,
      loadPanels: useDevLensStore.getState().loadPanels,
      restoreFromHistory: useDevLensStore.getState().restoreFromHistory,
    });
  }, [panels, history, addPanel, removePanel, updatePanelInput]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== "v"
      ) {
        return;
      }

      event.preventDefault();
      const clipboardValue = await readClipboard();
      if (!clipboardValue) return;

      const firstPanel = useDevLensStore.getState().panels[0];
      if (!firstPanel) return;

      updatePanelInput(firstPanel.id, clipboardValue);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [updatePanelInput]);

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-10">
        <Panel
          title="DevLens"
          subtitle="Smart Paste Workbench"
          action={
            <div className="flex items-center gap-2">
              <Badge variant="info">Local-first</Badge>
              <Button variant="secondary" size="sm" onClick={addPanel}>
                Add panel
              </Button>
              <Link
                href="/canvas"
                className="inline-flex h-8 items-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              >
                ArchCost
              </Link>
            </div>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Purpose
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Inspect opaque developer data instantly and explain what the
                input actually means.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Model
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                No raw payload upload, no account required, and no server
                dependency for core inspection.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Next
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                JWT and JSON specialist views will arrive first because they
                cover the most common debugging flow.
              </p>
            </div>
          </div>
        </Panel>

        <HistoryDrawer items={history} onSelect={restoreFromHistory} />

        <div
          className={`grid gap-6 ${panels.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}
        >
          {panels.map((panel) => (
            <div key={panel.id} className="min-h-[680px]">
              <PanelContainer
                panel={panel}
                onChange={(input) => updatePanelInput(panel.id, input)}
                onRemove={() => removePanel(panel.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
