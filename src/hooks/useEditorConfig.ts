import { useMemo } from "react";
import { CodeEditorPropsV2 } from "../components/lib/editor";

export interface UseEditorConfigProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  fontSize?: number;
  wordWrap?: "on" | "off";
  className?: string;
  readOnly?: boolean;
}

export function useEditorConfig({
  language,
  value,
  onChange,
  fontSize = 12,
  wordWrap = "on",
  className = "w-full h-full",
  readOnly = false,
}: UseEditorConfigProps): CodeEditorPropsV2 {
  return useMemo(
    () => ({
      language,
      value,
      onChange,
      editorOptions: {
        wordWrap,
        fontSize,
        readOnly,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
      },
      className,
    }),
    [language, value, onChange, fontSize, wordWrap, className, readOnly]
  );
}

// Predefined editor configurations for common languages
export const getEditorConfig = (
  language: string,
  value: string,
  onChange: (value: string) => void,
  options?: Partial<UseEditorConfigProps>
): CodeEditorPropsV2 => {
  return {
    language,
    value,
    onChange,
    editorOptions: {
      wordWrap: options?.wordWrap || "on",
      fontSize: options?.fontSize || 12,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
    },
    className: options?.className || "w-full h-full",
  };
};
