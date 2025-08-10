"use client";

import { TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

export default function WordCounter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = "WebToolsEasy is awesome. Explore free web tools.";

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const words = toolState.code.split(/\s+/).filter((word) => word !== "");
    const sentences = toolState.code
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim() !== "");
    const paragraphs = toolState.code
      .split(/\n\s*\n/)
      .filter((para) => para.trim() !== "");

    // Calculate reading time (average 200 words per minute)
    const readingTimeMinutes = Math.ceil(words.length / 200);

    return {
      words: words.length,
      characters: toolState.code.length,
      charactersNoSpaces: toolState.code.replace(/\s/g, "").length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      readingTime: readingTimeMinutes,
    };
  }, [toolState.code]);

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(toolState.code, "Text copied!"),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [toolState]
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
        title="Word Counter"
        description="Free online word counter tool. Count words, characters, sentences, and paragraphs in your text."
        exampleCode={initialValue}
        exampleOutput="Words: 7, Characters: 47, Sentences: 2"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-3">
          <Typography
            variant="body1"
            color="textSecondary"
            className="!text-lg !font-semibold flex items-center gap-2"
          >
            <span>📝</span>
            <span>Text Analysis</span>
          </Typography>
          <TextField
            multiline
            rows={8}
            value={toolState.code}
            onChange={(e) => toolState.setCode(e.target.value)}
            placeholder="Enter text to analyze..."
            variant="outlined"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Typography variant="h4" className="!font-bold !text-blue-600">
              {stats.words}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="!text-center"
            >
              Words
            </Typography>
          </div>
          <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Typography variant="h4" className="!font-bold !text-green-600">
              {stats.characters}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="!text-center"
            >
              Characters
            </Typography>
          </div>
          <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Typography variant="h4" className="!font-bold !text-purple-600">
              {stats.charactersNoSpaces}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="!text-center"
            >
              No Spaces
            </Typography>
          </div>
          <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Typography variant="h4" className="!font-bold !text-orange-600">
              {stats.sentences}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="!text-center"
            >
              Sentences
            </Typography>
          </div>
          <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Typography variant="h4" className="!font-bold !text-red-600">
              {stats.paragraphs}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="!text-center"
            >
              Paragraphs
            </Typography>
          </div>
          <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Typography variant="h4" className="!font-bold !text-indigo-600">
              {stats.readingTime}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="!text-center"
            >
              Min Read
            </Typography>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
