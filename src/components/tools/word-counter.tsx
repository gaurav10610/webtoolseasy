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

      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-2">
          <Typography
            variant="body1"
            color="textSecondary"
            className="!text-xl !font-semibold !w-full"
          >
            Text (Paste Your Text Here)
          </Typography>
          <TextField
            multiline
            rows={5}
            value={toolState.code}
            onChange={(e) => toolState.setCode(e.target.value)}
            placeholder="Enter text to analyze..."
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stats.words}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Words
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stats.characters}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Characters
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stats.charactersNoSpaces}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              No Spaces
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stats.sentences}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sentences
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stats.paragraphs}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Paragraphs
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stats.readingTime}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Min Read
            </Typography>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
