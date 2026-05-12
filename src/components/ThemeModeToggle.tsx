"use client";

import { useThemePreference } from "./AppThemeProvider";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import { ButtonWithHandler } from "./lib/buttons";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

type ThemeValue = "light" | "dark" | "system";

const themeOptions = [
  {
    value: "light" as ThemeValue,
    label: "Light",
    icon: <LightModeRoundedIcon fontSize="small" />,
    next: "dark" as ThemeValue,
  },
  {
    value: "dark" as ThemeValue,
    label: "Dark",
    icon: <DarkModeRoundedIcon fontSize="small" />,
    next: "system" as ThemeValue,
  },
  {
    value: "system" as ThemeValue,
    label: "System",
    icon: <SettingsSuggestRoundedIcon fontSize="small" />,
    next: "light" as ThemeValue,
  },
];

/** Full three-button toggle — used in drawers/settings panels */
export function ThemeModeToggle() {
  const { preference, setPreference } = useThemePreference();

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] p-1 shadow-sm">
      {themeOptions.map((option) => {
        const isActive = preference === option.value;

        return (
          <ButtonWithHandler
            key={option.value}
            buttonText={option.label}
            size="small"
            variant={isActive ? "contained" : "text"}
            color={isActive ? "primary" : "inherit"}
            startIcon={option.icon}
            onClick={() => setPreference(option.value)}
            className={`!rounded-full !px-3 !py-1 ${
              isActive
                ? "!shadow-none"
                : "!text-[var(--mui-palette-text-secondary)]"
            }`}
          />
        );
      })}
    </div>
  );
}

/** Compact single-icon toggle — cycles Light → Dark → System → Light */
export function ThemeModeToggleCompact() {
  const { preference, setPreference } = useThemePreference();
  const current =
    themeOptions.find((o) => o.value === preference) ?? themeOptions[2];

  return (
    <Tooltip title={`Theme: ${current.label} (click to change)`} arrow>
      <IconButton
        size="small"
        onClick={() => setPreference(current.next)}
        aria-label={`Switch theme, currently ${current.label}`}
        className="!rounded-full !border !border-[var(--mui-palette-divider)] !bg-[var(--mui-palette-background-paper)] !shadow-sm !p-2 !text-[var(--mui-palette-text-secondary)]"
      >
        {current.icon}
      </IconButton>
    </Tooltip>
  );
}
