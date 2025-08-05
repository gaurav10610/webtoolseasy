import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";

export interface UseToolStateProps {
  hostname: string;
  queryParams: { content?: string };
  initialValue?: string;
}

export interface ToolActions {
  copyText: (text: string, message?: string) => void;
  copyShareableLink: (content: string, message?: string) => void;
  showMessage: (message: string) => void;
}

export interface ToolState {
  code: string;
  setCode: (code: string) => void;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
  snackBar: {
    open: boolean;
    message: string;
    close: () => void;
  };
  actions: ToolActions;
}

export function useToolState({
  hostname,
  queryParams,
  initialValue = "",
}: UseToolStateProps): ToolState {
  const currentPath = usePathname();
  const codeQueryParam = queryParams.content;

  const [code, setCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const showMessage = useCallback((message: string) => {
    setSnackBarMessage(message);
    setSnackBarOpen(true);
  }, []);

  const copyText = useCallback(
    (text: string, message = "Copied to clipboard!") => {
      copyToClipboard(text);
      showMessage(message);
    },
    [showMessage]
  );

  const copyShareableLink = useCallback(
    (content: string, message = "Copied link to clipboard!") => {
      compressStringToBase64(content).then((compressed) => {
        copyToClipboard(
          `${hostname}${currentPath}?content=${encodeText(compressed)}`
        );
        showMessage(message);
      });
    },
    [hostname, currentPath, showMessage]
  );

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, []);

  const closeSnackBar = useCallback(() => {
    setSnackBarOpen(false);
  }, []);

  return {
    code,
    setCode,
    isFullScreen,
    toggleFullScreen,
    snackBar: {
      open: snackBarOpen,
      message: snackBarMessage,
      close: closeSnackBar,
    },
    actions: {
      copyText,
      copyShareableLink,
      showMessage,
    },
  };
}
