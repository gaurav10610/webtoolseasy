"use client";

import {
  useEffect,
  useState,
  useRef,
  PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
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
      <main className="min-h-screen bg-[#0A0A0B] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-10">
          <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-[#121214]/90 px-5 py-4 shadow-2xl shadow-black/20 backdrop-blur-md">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-indigo-600 shadow-[0_0_20px_rgba(249,115,22,0.35)] ring-1 ring-white/10 transition-transform group-hover:scale-[1.03]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight text-white">
                  WebToolsEasy
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-gray-500">
                  DevLens workspace
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/canvas"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                ArchCost
              </Link>
              <Badge variant="info">Local-first</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-[#121214]/90 px-5 py-4 shadow-2xl shadow-black/20 backdrop-blur-md">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-indigo-600 shadow-[0_0_20px_rgba(249,115,22,0.35)] ring-1 ring-white/10 transition-transform group-hover:scale-[1.03]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight text-white">
                  WebToolsEasy
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-gray-500">
                  DevLens workspace
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/canvas"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                ArchCost
              </Link>
              <Badge variant="info">Local-first</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-[#121214]/90 px-5 py-4 shadow-2xl shadow-black/20 backdrop-blur-md">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-indigo-600 shadow-[0_0_20px_rgba(249,115,22,0.35)] ring-1 ring-white/10 transition-transform group-hover:scale-[1.03]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight text-white">
                  WebToolsEasy
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-gray-500">
                  ArchCost workspace
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/studio"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                DevLens
              </Link>
              <Badge variant="info">Local-first</Badge>
            </div>
          </div>

          <div className="animate-pulse space-y-6">
            <div className="h-32 rounded-3xl bg-white/5"></div>
            <div className="h-20 rounded-3xl bg-white/5"></div>
            <div className="h-[680px] rounded-3xl bg-white/5"></div>
          </div>
        </div>
      </main>
    );
  }

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
    </main>
  );
}
