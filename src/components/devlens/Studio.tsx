"use client";

import {
  useEffect,
  useState,
  useRef,
  PointerEvent as ReactPointerEvent,
} from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Resizer } from "@/components/ui/Resizer";
import { readClipboard } from "@/utils/clipboard";
import { useDevLensStore, persistDevLensState } from "@/store/useDevLensStore";
import { PanelContainer } from "./PanelContainer";
import { HistoryDrawer } from "./HistoryDrawer";

export function Studio() {
  const [mounted, setMounted] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelContainerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    leftId: string;
    rightId: string;
    startX: number;
    startLeft: number;
    startRight: number;
    containerWidth: number;
  } | null>(null);

  const panels = useDevLensStore((state) => state.panels);
  const panelWidths = useDevLensStore((state) => state.panelWidths);
  const history = useDevLensStore((state) => state.history);
  const addPanel = useDevLensStore((state) => state.addPanel);
  const removePanel = useDevLensStore((state) => state.removePanel);
  const setPanelWidths = useDevLensStore((state) => state.setPanelWidths);
  const updatePanelInput = useDevLensStore((state) => state.updatePanelInput);
  const addToHistory = useDevLensStore((state) => state.addToHistory);
  const restoreFromHistory = useDevLensStore(
    (state) => state.restoreFromHistory,
  );
  const clearHistory = useDevLensStore((state) => state.clearHistory);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      persistDevLensState({
        panels,
        panelWidths,
        history,
        addPanel,
        removePanel,
        setPanelWidths,
        updatePanelInput,
        addToHistory,
        clearHistory,
        setOverrideType: useDevLensStore.getState().setOverrideType,
        loadPanels: useDevLensStore.getState().loadPanels,
        restoreFromHistory: useDevLensStore.getState().restoreFromHistory,
      });
    }
  }, [
    mounted,
    panels,
    panelWidths,
    history,
    addPanel,
    removePanel,
    setPanelWidths,
    updatePanelInput,
    addToHistory,
    clearHistory,
  ]);

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
      addToHistory(clipboardValue);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [updatePanelInput, addToHistory]);

  const handleInputUpdate = (id: string, input: string) => {
    updatePanelInput(id, input);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      addToHistory(input);
    }, 1000);
  };

  const handleResizerPointerDown = (
    leftId: string,
    rightId: string,
    startEvent: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const container = panelContainerRef.current;
    if (!container) return;

    const width = container.getBoundingClientRect().width;
    if (width <= 0) return;

    const fallback = 100 / Math.max(1, panels.length);
    dragRef.current = {
      leftId,
      rightId,
      startX: startEvent.clientX,
      startLeft: panelWidths[leftId] ?? fallback,
      startRight: panelWidths[rightId] ?? fallback,
      containerWidth: width,
    };

    const handleMove = (moveEvent: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      const deltaPx = moveEvent.clientX - drag.startX;
      const deltaPct = (deltaPx / drag.containerWidth) * 100;
      const combined = drag.startLeft + drag.startRight;
      const minPct = 18;

      const nextLeft = Math.min(
        combined - minPct,
        Math.max(minPct, drag.startLeft + deltaPct),
      );
      const nextRight = combined - nextLeft;

      setPanelWidths({
        ...useDevLensStore.getState().panelWidths,
        [drag.leftId]: Number(nextLeft.toFixed(4)),
        [drag.rightId]: Number(nextRight.toFixed(4)),
      });
    };

    const handleUp = () => {
      dragRef.current = null;
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-6 px-6 py-10">
        <div className="h-32 rounded-3xl bg-white/5"></div>
        <div className="h-20 rounded-3xl bg-white/5"></div>
        <div className="h-[680px] rounded-3xl bg-white/5"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#121214]/90 border border-white/10 p-4 px-6 rounded-3xl shadow-xl backdrop-blur-md gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="info">Local Workspace</Badge>
          <span className="text-sm font-medium text-gray-400">Zero data leaves your browser</span>
        </div>
        <Button variant="primary" size="sm" onClick={addPanel} className="w-full sm:w-auto whitespace-nowrap shadow-[0_0_15px_rgba(79,70,229,0.3)]"
          leadingIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}
        >
          Add Panel
        </Button>
      </div>

      <HistoryDrawer
        items={history}
        onSelect={restoreFromHistory}
        onClear={clearHistory}
      />

      <div
        className="flex flex-col gap-6 lg:gap-0 lg:flex-row"
        ref={panelContainerRef}
      >
        {panels.map((panel, index) => {
          const fallback = 100 / Math.max(1, panels.length);
          const width = panelWidths[panel.id] ?? fallback;
          const nextPanel = panels[index + 1];

          return (
            <div
              key={panel.id}
              className="flex w-full min-h-[680px] lg:w-auto"
              style={{ flexBasis: `${width}%` }}
            >
              <div className="min-h-[680px] h-full w-full lg:pr-3">
                <PanelContainer
                  panel={panel}
                  onChange={(input) => handleInputUpdate(panel.id, input)}
                  onRemove={() => removePanel(panel.id)}
                />
              </div>
              {nextPanel ? (
                <div className="hidden lg:flex items-stretch min-h-[680px]">
                  <Resizer
                    onPointerDown={(event) =>
                      handleResizerPointerDown(panel.id, nextPanel.id, event)
                    }
                    className="self-stretch"
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
