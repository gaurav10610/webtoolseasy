"use client";

import { useThemePreference } from "./AppThemeProvider";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import { ButtonWithHandler } from "./lib/buttons";

const themeOptions = [
  {
    value: "light" as const,
    label: "Light",
    icon: <LightModeRoundedIcon fontSize="small" />,
  },
  {
    value: "dark" as const,
    label: "Dark",
    icon: <DarkModeRoundedIcon fontSize="small" />,
  },
  {
    value: "system" as const,
    label: "System",
    icon: <SettingsSuggestRoundedIcon fontSize="small" />,
  },
];

export function ThemeModeToggle() {
  const { preference, setPreference } = useThemePreference();

  return (
    <div className="flex items-center gap-2 rounded-full border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] p-1 shadow-sm">
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
