import React, { memo } from "react";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import DownloadIcon from "@mui/icons-material/Download";
import CodeIcon from "@mui/icons-material/Code";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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
      icon: <ContentCopyIcon />,
      variant: "outlined" as const,
    },
    shareLink: {
      text: button.text || "Copy Shareable Link",
      icon: <LinkIcon />,
      variant: "outlined" as const,
    },
    fullscreen: {
      text: isFullScreen
        ? button.text || "Close Full Screen"
        : button.text || "Enter Full Screen",
      icon: isFullScreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />,
      variant: "outlined" as const,
    },
    download: {
      text: button.text || "Download",
      icon: <DownloadIcon />,
      variant: "outlined" as const,
    },
    format: {
      text: button.text || "Format Code",
      icon: <CodeIcon />,
      variant: "contained" as const,
    },
    run: {
      text: button.text || "Run Code",
      icon: <PlayArrowIcon />,
      variant: "contained" as const,
    },
    custom: {
      text: button.text || "Action",
      icon: button.icon || <CodeIcon />,
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
    <div className={`flex flex-col gap-2 w-full md:flex-row ${className}`}>
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
