"use client";

import { TextField, Typography } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { ButtonWithHandler } from "../lib/buttons";

export default function CaseConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = "WebToolsEasy is Awesome. Explore Free Web Tools.";

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [outputText, setOutputText] = useState(toolState.code);

  const convertToUppercase = useCallback(() => {
    const result = toolState.code.toUpperCase();
    setOutputText(result);
    toolState.actions.showMessage("Converted to uppercase!");
  }, [toolState]);

  const convertToLowercase = useCallback(() => {
    const result = toolState.code.toLowerCase();
    setOutputText(result);
    toolState.actions.showMessage("Converted to lowercase!");
  }, [toolState]);

  const convertToSentenceCase = useCallback(() => {
    const result = toolState.code
      .split(". ")
      .map((sentence) => {
        return (
          sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
        );
      })
      .join(". ");
    setOutputText(result);
    toolState.actions.showMessage("Converted to sentence case!");
  }, [toolState]);

  const convertToTitleCase = useCallback(() => {
    const result = toolState.code
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
    setOutputText(result);
    toolState.actions.showMessage("Converted to title case!");
  }, [toolState]);

  const clearText = useCallback(() => {
    toolState.setCode("");
    setOutputText("");
    toolState.actions.showMessage("Text cleared!");
  }, [toolState]);

  const copyOutput = useCallback(() => {
    toolState.actions.copyText(outputText, "Converted text copied!");
  }, [toolState.actions, outputText]);

  const downloadOutput = useCallback(() => {
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Converted text downloaded successfully!");
  }, [outputText, toolState.actions]);

  // Custom buttons for case conversions
  const caseButtons = useMemo(
    () => [
      {
        text: "Uppercase",
        onClick: convertToUppercase,
        variant: "outlined" as const,
        size: "small" as const,
      },
      {
        text: "Lowercase",
        onClick: convertToLowercase,
        variant: "outlined" as const,
        size: "small" as const,
      },
      {
        text: "Sentence Case",
        onClick: convertToSentenceCase,
        variant: "outlined" as const,
        size: "small" as const,
      },
      {
        text: "Title Case",
        onClick: convertToTitleCase,
        variant: "outlined" as const,
        size: "small" as const,
      },
      {
        text: "Clear",
        onClick: clearText,
        variant: "contained" as const,
        size: "small" as const,
        color: "error" as const,
      },
    ],
    [
      convertToUppercase,
      convertToLowercase,
      convertToSentenceCase,
      convertToTitleCase,
      clearText,
    ]
  );

  // Standard buttons
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: copyOutput,
        onDownload: downloadOutput,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [copyOutput, downloadOutput, toolState]
  );

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Case Converter"
        description="Free online text case converter. Convert text to uppercase, lowercase, sentence case, or title case."
        exampleCode={initialValue}
        exampleOutput="WEBTOOLSEASY IS AWESOME. EXPLORE FREE WEB TOOLS."
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      {/* Custom conversion buttons */}
      <div className="flex flex-wrap gap-2 justify-center w-full">
        {caseButtons.map((button, index) => (
          <ButtonWithHandler
            key={index}
            buttonText={button.text}
            variant={button.variant}
            size={button.size}
            onClick={button.onClick}
            color={button.color}
            className="min-w-0 flex-1 sm:flex-none"
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="flex flex-col gap-3 w-full lg:w-1/2">
          <Typography
            variant="body1"
            color="textSecondary"
            className="!text-lg !font-semibold"
          >
            📝 Input Text
          </Typography>
          <TextField
            multiline
            rows={8}
            value={toolState.code}
            onChange={(e) => toolState.setCode(e.target.value)}
            placeholder="Enter text to convert..."
            className="w-full"
            variant="outlined"
          />
        </div>

        <div className="flex flex-col gap-3 w-full lg:w-1/2">
          <Typography
            variant="body1"
            color="textSecondary"
            className="!text-lg !font-semibold"
          >
            ✨ Converted Text
          </Typography>
          <TextField
            multiline
            rows={8}
            value={outputText}
            InputProps={{ readOnly: true }}
            placeholder="Converted text will appear here..."
            className="w-full"
            variant="outlined"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
