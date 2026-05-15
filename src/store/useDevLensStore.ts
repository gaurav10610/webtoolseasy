import { create } from "zustand";
import { detect, DetectionResult } from "@/lib/devlens/detector";

export type DevLensPanel = {
  id: string;
  input: string;
  detection: DetectionResult;
};

type DevLensState = {
  panels: DevLensPanel[];
  history: string[];
  addPanel: () => void;
  removePanel: (id: string) => void;
  updatePanelInput: (id: string, input: string) => void;
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
  };
}

function loadInitialState(): { panels: DevLensPanel[]; history: string[] } {
  if (typeof window === "undefined") {
    return { panels: [createPanel()], history: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { panels: [createPanel()], history: [] };
    }

    const parsed = JSON.parse(raw) as Partial<{
      panels: DevLensPanel[];
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
    return { panels, history };
  } catch {
    return { panels: [createPanel()], history: [] };
  }
}

const initialState = loadInitialState();

export const useDevLensStore = create<DevLensState>((set, get) => ({
  panels: initialState.panels,
  history: initialState.history,

  addPanel: () => {
    const current = get().panels;
    if (current.length >= 4) return;
    const nextPanels = [...current, createPanel()];
    set({ panels: nextPanels });
  },

  removePanel: (id: string) => {
    const remaining = get().panels.filter((panel) => panel.id !== id);
    set({ panels: remaining.length > 0 ? remaining : [createPanel()] });
  },

  updatePanelInput: (id: string, input: string) => {
    const nextPanels = get().panels.map((panel) => {
      if (panel.id !== id) {
        return panel;
      }

      return {
        ...panel,
        input,
        detection: detect(input),
      };
    });

    const history = [
      input,
      ...get().history.filter((entry) => entry !== input),
    ].slice(0, 20);
    set({ panels: nextPanels, history });
  },

  loadPanels: (panels: DevLensPanel[]) => {
    set({ panels: panels.length > 0 ? panels : [createPanel()] });
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
      history: state.history,
    }),
  );
}
