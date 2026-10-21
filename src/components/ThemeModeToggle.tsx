"use client";

import { useThemePreference } from "./AppThemeProvider";
import React from "react";

function SunIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function SystemIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

const themeOptions = [
  {
    value: "light" as const,
    label: "Light",
    icon: <SunIcon />,
  },
  {
    value: "dark" as const,
    label: "Dark",
    icon: <MoonIcon />,
  },
  {
    value: "system" as const,
    label: "System",
    icon: <SystemIcon />,
  },
];

export function ThemeModeToggle({ showLabels = false }: { showLabels?: boolean }) {
  const { preference, setPreference } = useThemePreference();

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode selection"
      className="inline-flex items-center gap-0.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 p-0.5 shadow-xs backdrop-blur-sm"
    >
      {themeOptions.map((option) => {
        const isActive = preference === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            title={`Switch to ${option.label} theme`}
            onClick={() => setPreference(option.value)}
            className={`inline-flex items-center justify-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all duration-150 cursor-pointer ${
              isActive
                ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {option.icon}
            {showLabels && <span className="text-[11px]">{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
