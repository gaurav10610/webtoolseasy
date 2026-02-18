"use client";

import {
  TextField,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";
import { useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

const CHAR_LIMITS = [
  { name: "Twitter/X", limit: 280, emoji: "🐦" },
  { name: "Meta Title", limit: 60, emoji: "🔍" },
  { name: "Meta Description", limit: 160, emoji: "📝" },
  { name: "SMS", limit: 160, emoji: "💬" },
  { name: "Instagram Caption", limit: 2200, emoji: "📸" },
  { name: "LinkedIn Post", limit: 3000, emoji: "💼" },
];

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
    const text = toolState.code;
    const words = text.split(/\s+/).filter((word) => word !== "");
    const sentences = text
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim() !== "");
    const paragraphs = text
      .split(/\n\s*\n/)
      .filter((para) => para.trim() !== "");
    const lines = text.split(/\n/).length;

    // Reading time: ~225 wpm average; Speaking time: ~140 wpm average
    const readingTimeMinutes = Math.max(Math.ceil(words.length / 225), 0);
    const speakingTimeMinutes = Math.max(Math.ceil(words.length / 140), 0);

    return {
      words: words.length,
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      lines,
      readingTime: readingTimeMinutes,
      speakingTime: speakingTimeMinutes,
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
        title="Word & Character Counter"
        description="Free online word counter and character counter tool. Count words, characters, sentences, paragraphs, and check social media character limits. Works offline."
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
            placeholder="Start typing or paste your text here to count words, characters, sentences, and more..."
            variant="outlined"
            className="w-full"
          />
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
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
            <Typography variant="h4" className="!font-bold !text-teal-600">
              {stats.lines}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="!text-center"
            >
              Lines
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
          <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Typography variant="h4" className="!font-bold !text-pink-600">
              {stats.speakingTime}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="!text-center"
            >
              Min Speak
            </Typography>
          </div>
        </div>

        {/* Social Media Character Limits */}
        <div className="w-full">
          <Typography
            variant="body1"
            color="textSecondary"
            className="!text-lg !font-semibold !mb-3 flex items-center gap-2"
          >
            <span>📊</span>
            <span>Character Limits</span>
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CHAR_LIMITS.map((info) => {
              const percentage = Math.min(
                (stats.characters / info.limit) * 100,
                100
              );
              const isOver = stats.characters > info.limit;
              return (
                <Box
                  key={info.name}
                  className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <Typography variant="body2" className="!font-medium">
                      {info.emoji} {info.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={isOver ? "!text-red-600 !font-bold" : ""}
                    >
                      {stats.characters} / {info.limit}
                    </Typography>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    color={
                      isOver ? "error" : percentage > 80 ? "warning" : "primary"
                    }
                    className="!rounded-full !h-2"
                  />
                </Box>
              );
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
