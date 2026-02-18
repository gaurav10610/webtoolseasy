import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { useToolCache } from "./useToolCache";

export interface UseToolStateProps {
  hostname: string;
  queryParams: { content?: string };
  initialValue?: string;
  /**
   * Optional explicit applicationId.  When omitted the hook auto-derives
   * a cache key from the current pathname (e.g. "/tools/json-formatter"
   * → "json-formatter").  This means all tools get automatic localStorage
   * caching without any per-tool code changes.
   */
  applicationId?: string;
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

/**
 * Derive a stable cache key from the pathname.
 * "/tools/json-formatter" → "json-formatter"
 */
function deriveCacheKey(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  // last segment is the tool slug
  return parts[parts.length - 1] || "";
}

export function useToolState({
  hostname,
  queryParams,
  initialValue = "",
  applicationId,
}: UseToolStateProps): ToolState {
  const currentPath = usePathname();
  const codeQueryParam = queryParams.content;

  // ── auto-derive cache key from path when not explicitly provided ──
  const cacheKey = applicationId || deriveCacheKey(currentPath);

  // ── localStorage cache integration ──
  // Delegates initial-value resolution to useToolCache which handles:
  //   query-param → localStorage → default.
  const cache = useToolCache({
    applicationId: cacheKey,
    queryParamContent: codeQueryParam ? decodeText(codeQueryParam) : undefined,
    defaultValue: initialValue,
  });

  const [code, setCodeRaw] = useState(cache.initialCode);

  // Wrap setCode so changes are auto-persisted
  const setCode = useCallback(
    (value: string) => {
      setCodeRaw(value);
      cache.persistCode(value);
    },
    [cache],
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
    [showMessage],
  );

  const copyShareableLink = useCallback(
    (content: string, message = "Copied link to clipboard!") => {
      compressStringToBase64(content).then((compressed) => {
        copyToClipboard(
          `${hostname}${currentPath}?content=${encodeText(compressed)}`,
        );
        showMessage(message);
      });
    },
    [hostname, currentPath, showMessage],
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
