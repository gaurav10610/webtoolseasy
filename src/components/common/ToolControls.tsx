import React, { memo } from "react";
import { ButtonWithHandler } from "../lib/buttons";

function CopySvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function LinkSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function ExpandSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  );
}

function CompressSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0v4m0-4h4m7 5l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4m7-5l5 5m0 0v-4m0 4h-4" />
    </svg>
  );
}

function DownloadSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function CodeSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function PlaySvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export interface ToolButtonConfig {
  type:
    | "copy"
    | "shareLink"
    | "fullscreen"
    | "download"
    | "format"
    | "run"
    | "custom";
  text?: string;
  onClick?: () => void;
  icon?: React.ReactElement;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  className?: string;
  disabled?: boolean;
}

interface ToolControlsProps {
  buttons: ToolButtonConfig[];
  isFullScreen?: boolean;
  className?: string;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  size?: "small" | "medium" | "large";
}

const getButtonConfig = (
  button: ToolButtonConfig,
  isFullScreen: boolean
): {
  text: string;
  icon: React.ReactElement;
  variant: "text" | "outlined" | "contained";
} => {
  const configs = {
    copy: {
      text: button.text || "Copy Text",
      icon: <CopySvg />,
      variant: "outlined" as const,
    },
    shareLink: {
      text: button.text || "Copy Shareable Link",
      icon: <LinkSvg />,
      variant: "outlined" as const,
    },
    fullscreen: {
      text: isFullScreen
        ? button.text || "Close Full Screen"
        : button.text || "Enter Full Screen",
      icon: isFullScreen ? <CompressSvg /> : <ExpandSvg />,
      variant: "outlined" as const,
    },
    download: {
      text: button.text || "Download",
      icon: <DownloadSvg />,
      variant: "outlined" as const,
    },
    format: {
      text: button.text || "Format Code",
      icon: <CodeSvg />,
      variant: "contained" as const,
    },
    run: {
      text: button.text || "Run Code",
      icon: <PlaySvg />,
      variant: "contained" as const,
    },
    custom: {
      text: button.text || "Action",
      icon: button.icon || <CodeSvg />,
      variant: button.variant || "outlined",
    },
  };

  return configs[button.type];
};

export const ToolControls = memo(function ToolControls({
  buttons,
  isFullScreen = false,
  className = "",
  color,
  size = "small",
}: ToolControlsProps) {
  return (
    <div
      className={`flex flex-col gap-2 w-full md:flex-row md:flex-wrap ${className}`}
    >
      {buttons.map((button, index) => {
        const config = getButtonConfig(button, isFullScreen);

        // Handle fullscreen button special visibility logic
        if (button.type === "fullscreen") {
          return (
            <ButtonWithHandler
              key={index}
              buttonText={config.text}
              variant={config.variant}
              size={size}
              startIcon={config.icon}
              onClick={button.onClick}
              className={`!hidden md:!flex ${button.className || ""}`}
              {...(button.disabled && { disabled: button.disabled })}
              {...((button.color || color) && { color: button.color || color })}
            />
          );
        }

        return (
          <ButtonWithHandler
            key={index}
            buttonText={config.text}
            variant={config.variant}
            size={size}
            startIcon={config.icon}
            onClick={button.onClick}
            className={button.className || ""}
            {...(button.disabled && { disabled: button.disabled })}
            {...((button.color || color) && { color: button.color || color })}
          />
        );
      })}
    </div>
  );
});

// Common button configurations for reuse
export const createCommonButtons = (actions: {
  onCopy?: () => void;
  onShareLink?: () => void;
  onFullScreen?: () => void;
  onFormat?: () => void;
  onRun?: () => void;
  onDownload?: () => void;
}): ToolButtonConfig[] => {
  const buttons: ToolButtonConfig[] = [];

  if (actions.onRun) {
    buttons.push({ type: "run", onClick: actions.onRun });
  }
  if (actions.onFormat) {
    buttons.push({ type: "format", onClick: actions.onFormat });
  }
  if (actions.onCopy) {
    buttons.push({ type: "copy", onClick: actions.onCopy });
  }
  if (actions.onShareLink) {
    buttons.push({ type: "shareLink", onClick: actions.onShareLink });
  }
  if (actions.onDownload) {
    buttons.push({ type: "download", onClick: actions.onDownload });
  }
  if (actions.onFullScreen) {
    buttons.push({ type: "fullscreen", onClick: actions.onFullScreen });
  }

  return buttons;
};
