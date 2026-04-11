"use client";

import { TextField, Typography, LinearProgress, Box } from "@mui/material";
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

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "to",
  "of",
  "in",
  "that",
  "it",
  "for",
  "on",
  "with",
  "he",
  "she",
  "they",
  "we",
  "you",
  "i",
  "at",
  "by",
  "from",
  "as",
  "not",
  "this",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "can",
  "its",
  "their",
  "our",
  "my",
  "his",
  "her",
  "your",
  "so",
  "if",
  "then",
  "than",
  "when",
  "which",
  "who",
  "what",
  "how",
  "all",
  "no",
  "up",
  "out",
]);

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  const trimmed = w
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");
  const groups = trimmed.match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups ? groups.length : 1);
}

function fleschLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "Very Easy (5th grade)", color: "#16a34a" };
  if (score >= 80) return { label: "Easy (6th grade)", color: "#22c55e" };
  if (score >= 70)
    return { label: "Fairly Easy (7th grade)", color: "#86efac" };
  if (score >= 60) return { label: "Standard (8–9th grade)", color: "#eab308" };
  if (score >= 50) return { label: "Fairly Difficult (HS)", color: "#f97316" };
  if (score >= 30) return { label: "Difficult (College)", color: "#ef4444" };
  return { label: "Very Difficult (Graduate)", color: "#b91c1c" };
}

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

    // Flesch-Kincaid Reading Ease
    const syllables = words.reduce((s, w) => s + countSyllables(w), 0);
    const flesch =
      sentences.length > 0 && words.length > 0
        ? Math.max(
            0,
            Math.min(
              100,
              206.835 -
                1.015 * (words.length / sentences.length) -
                84.6 * (syllables / words.length),
            ),
          )
        : 0;

    // Keyword density (top 10, excluding stop words)
    const freq = new Map<string, number>();
    words.forEach((w) => {
      const lw = w.toLowerCase().replace(/[^a-z]/g, "");
      if (lw.length > 2 && !STOP_WORDS.has(lw)) {
        freq.set(lw, (freq.get(lw) ?? 0) + 1);
      }
    });
    const topKeywords = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        density:
          words.length > 0 ? ((count / words.length) * 100).toFixed(1) : "0",
      }));

    return {
      words: words.length,
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      lines,
      readingTime: readingTimeMinutes,
      speakingTime: speakingTimeMinutes,
      avgSentenceLength:
        sentences.length > 0
          ? +(words.length / sentences.length).toFixed(1)
          : 0,
      flesch,
      topKeywords,
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
    [toolState],
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
          <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Typography variant="h4" className="!font-bold !text-cyan-600">
              {stats.avgSentenceLength}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="!text-center"
            >
              Avg Sent Len
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
                100,
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
        {/* Readability Score */}
        {stats.words > 0 && (
          <div className="w-full">
            <Typography
              variant="body1"
              color="textSecondary"
              className="!text-lg !font-semibold !mb-3 flex items-center gap-2"
            >
              <span>📖</span>
              <span>Readability</span>
            </Typography>
            <Box className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <Typography variant="body2" className="!font-medium">
                  Flesch Reading Ease
                </Typography>
                <Typography
                  variant="h5"
                  className="!font-bold"
                  style={{ color: fleschLabel(stats.flesch).color }}
                >
                  {stats.flesch.toFixed(0)}
                </Typography>
              </div>
              <LinearProgress
                variant="determinate"
                value={stats.flesch}
                className="!rounded-full !h-3 !mb-2"
              />
              <Typography
                variant="body2"
                style={{ color: fleschLabel(stats.flesch).color }}
              >
                {fleschLabel(stats.flesch).label}
              </Typography>
            </Box>
          </div>
        )}
        {/* Keyword Density */}
        {stats.topKeywords.length > 0 && (
          <div className="w-full">
            <Typography
              variant="body1"
              color="textSecondary"
              className="!text-lg !font-semibold !mb-3 flex items-center gap-2"
            >
              <span>🔑</span>
              <span>Top Keywords</span>
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {stats.topKeywords.map((kw) => (
                <Box
                  key={kw.word}
                  className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg"
                >
                  <Typography
                    variant="body2"
                    className="!font-medium capitalize"
                  >
                    {kw.word}
                  </Typography>
                  <div className="flex gap-2 items-center">
                    <Typography variant="caption" color="textSecondary">
                      {kw.count}×
                    </Typography>
                    <Typography
                      variant="caption"
                      className="px-2 py-0.5 rounded-full text-white text-xs"
                      style={{ backgroundColor: "#2563eb" }}
                    >
                      {kw.density}%
                    </Typography>
                  </div>
                </Box>
              ))}
            </div>
          </div>
        )}{" "}
      </div>
    </ToolLayout>
  );
}
