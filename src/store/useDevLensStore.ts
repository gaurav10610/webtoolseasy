import { create } from "zustand";
import { detect, DetectionResult } from "@/lib/devlens/detector";
import { trackEvent } from "@/lib/analytics";

export type DevLensPanel = {
  id: string;
  input: string;
  detection: DetectionResult;
  overrideType: string | null;
};

type PanelWidthMap = Record<string, number>;

type DevLensState = {
  panels: DevLensPanel[];
  panelWidths: PanelWidthMap;
  history: string[];
  addPanel: () => void;
  removePanel: (id: string) => void;
  setPanelWidths: (widths: PanelWidthMap) => void;
  updatePanelInput: (id: string, input: string) => void;
  setOverrideType: (id: string, type: string | null) => void;
  addToHistory: (input: string) => void;
  clearHistory: () => void;
  loadPanels: (panels: DevLensPanel[]) => void;
  restoreFromHistory: (input: string) => void;
};

const STORAGE_KEY = "wte_devlens_state";

function createPanel(input = ""): DevLensPanel {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `panel-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    input,
    detection: detect(input),
    overrideType: null,
  };
}

function createEqualWidths(panels: DevLensPanel[]): PanelWidthMap {
  if (panels.length === 0) return {};
  const width = Number((100 / panels.length).toFixed(4));
  return panels.reduce<PanelWidthMap>((acc, panel) => {
    acc[panel.id] = width;
    return acc;
  }, {});
}

function normalizePanelWidths(
  panels: DevLensPanel[],
  incoming?: PanelWidthMap,
): PanelWidthMap {
  if (panels.length === 0) return {};

  const validEntries = panels.map((panel) => ({
    id: panel.id,
    value: Number(incoming?.[panel.id] ?? 0),
  }));
  const validTotal = validEntries.reduce(
    (total, entry) => total + (entry.value > 0 ? entry.value : 0),
    0,
  );

  if (validTotal <= 0) {
    return createEqualWidths(panels);
  }

  return validEntries.reduce<PanelWidthMap>((acc, entry) => {
    const value = entry.value > 0 ? entry.value : 100 / panels.length;
    acc[entry.id] = Number(((value / validTotal) * 100).toFixed(4));
    return acc;
  }, {});
}

function loadInitialState(): {
  panels: DevLensPanel[];
  panelWidths: PanelWidthMap;
  history: string[];
} {
  if (typeof window === "undefined") {
    const panels = [createPanel()];
    return {
      panels,
      panelWidths: createEqualWidths(panels),
      history: [],
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const panels = [createPanel()];
      return {
        panels,
        panelWidths: createEqualWidths(panels),
        history: [],
      };
    }

    const parsed = JSON.parse(raw) as Partial<{
      panels: DevLensPanel[];
      panelWidths: PanelWidthMap;
      history: string[];
    }>;
    const panels =
      Array.isArray(parsed.panels) && parsed.panels.length > 0
        ? parsed.panels.map((panel) => ({
            ...panel,
            detection: detect(panel.input),
          }))
        : [createPanel()];
    const history = Array.isArray(parsed.history)
      ? parsed.history.slice(0, 20)
      : [];
    return {
      panels,
      history,
      panelWidths: normalizePanelWidths(panels, parsed.panelWidths),
    };
  } catch {
    const panels = [createPanel()];
    return {
      panels,
      history: [],
      panelWidths: createEqualWidths(panels),
    };
  }
}

const initialState = loadInitialState();

export const useDevLensStore = create<DevLensState>((set, get) => ({
  panels: initialState.panels,
  panelWidths: initialState.panelWidths,
  history: initialState.history,

  addPanel: () => {
    const current = get().panels;
    if (current.length >= 4) return;
    const nextPanels = [...current, createPanel()];
    set({
      panels: nextPanels,
      panelWidths: createEqualWidths(nextPanels),
    });
  },

  removePanel: (id: string) => {
    const remaining = get().panels.filter((panel) => panel.id !== id);
    const nextPanels = remaining.length > 0 ? remaining : [createPanel()];
    set({
      panels: nextPanels,
      panelWidths: normalizePanelWidths(nextPanels, get().panelWidths),
    });
  },

  setPanelWidths: (widths: PanelWidthMap) => {
    const panels = get().panels;
    set({ panelWidths: normalizePanelWidths(panels, widths) });
  },

  setOverrideType: (id: string, type: string | null) => {
    const nextPanels = get().panels.map((panel) => {
      if (panel.id !== id) return panel;
      return { ...panel, overrideType: type };
    });
    set({ panels: nextPanels });
  },

  updatePanelInput: (id: string, input: string) => {
    const nextPanels = get().panels.map((panel) => {
      if (panel.id !== id) {
        return panel;
      }

      const nextDetection = detect(input);
      if (
        panel.detection.type !== nextDetection.type &&
        nextDetection.type !== "unknown"
      ) {
        trackEvent("smart_paste_used", { detected_type: nextDetection.type });
      }

      return {
        ...panel,
        input,
        detection: nextDetection,
      };
    });

    set({ panels: nextPanels });
  },

  addToHistory: (input: string) => {
    if (!input || input.trim().length < 3) return;
    const history = [
      input,
      ...get().history.filter((entry) => entry !== input),
    ].slice(0, 20);
    set({ history });
  },

  clearHistory: () => {
    set({ history: [] });
  },

  loadPanels: (panels: DevLensPanel[]) => {
    const nextPanels = panels.length > 0 ? panels : [createPanel()];
    set({
      panels: nextPanels,
      panelWidths: createEqualWidths(nextPanels),
    });
  },

  restoreFromHistory: (input: string) => {
    const panel = get().panels[0];
    if (!panel) return;
    get().updatePanelInput(panel.id, input);
  },
}));

export function persistDevLensState(state: DevLensState): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      panels: state.panels,
      panelWidths: state.panelWidths,
      history: state.history,
    }),
  );
}
