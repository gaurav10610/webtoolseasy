"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  Chip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { ToolComponentProps } from "@/types/component";
import { SnackBarWithPosition } from "../lib/snackBar";
import { SEOContent } from "../common/ToolLayout";

export default function TextSummarizer({}: Readonly<ToolComponentProps>) {
  const sampleText = `Artificial intelligence (AI) is revolutionizing the way we live and work. From healthcare to transportation, AI systems are being deployed across various industries to improve efficiency and create new possibilities. Machine learning, a subset of AI, enables computers to learn from data without being explicitly programmed. Deep learning, which uses neural networks, has achieved remarkable breakthroughs in image recognition, natural language processing, and game playing. However, the rapid advancement of AI also raises important ethical questions about privacy, job displacement, and algorithmic bias. As we continue to develop more sophisticated AI systems, it is crucial that we address these concerns and ensure that AI benefits all of humanity. Researchers and policymakers must work together to create frameworks that promote responsible AI development while fostering innovation.`;

  const [inputText, setInputText] = useState(sampleText);
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [error, setError] = useState("");

  const showMessage = (message: string) => {
    setSnackBarMessage(message);
    setIsSnackBarOpen(true);
  };

  const sentenceScore = useCallback(
    (sentence: string, wordFreq: Map<string, number>) => {
      const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
      let score = 0;
      for (const word of words) {
        score += wordFreq.get(word) || 0;
      }
      return words.length > 0 ? score / words.length : 0;
    },
    []
  );

  const summarizeText = useCallback(
    (text: string, targetLength: string) => {
      // Split into sentences
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      if (sentences.length === 0) return "";

      // Calculate word frequencies (excluding common words)
      const commonWords = new Set([
        "the",
        "a",
        "an",
        "and",
        "or",
        "but",
        "in",
        "on",
        "at",
        "to",
        "for",
        "of",
        "with",
        "by",
        "from",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "being",
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
        "this",
        "that",
        "these",
        "those",
        "it",
        "its",
      ]);

      const wordFreq = new Map<string, number>();
      const words = text.toLowerCase().match(/\b\w+\b/g) || [];

      for (const word of words) {
        if (!commonWords.has(word) && word.length > 3) {
          wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
        }
      }

      // Score each sentence
      const scoredSentences = sentences.map((sentence, index) => ({
        sentence: sentence.trim(),
        score: sentenceScore(sentence, wordFreq),
        index,
      }));

      // Sort by score
      scoredSentences.sort((a, b) => b.score - a.score);

      // Determine how many sentences to include
      let targetCount: number;
      switch (targetLength) {
        case "short":
          targetCount = Math.max(2, Math.ceil(sentences.length * 0.2));
          break;
        case "long":
          targetCount = Math.max(4, Math.ceil(sentences.length * 0.5));
          break;
        default: // medium
          targetCount = Math.max(3, Math.ceil(sentences.length * 0.35));
      }

      // Take top sentences and sort by original order
      const selectedSentences = scoredSentences
        .slice(0, targetCount)
        .sort((a, b) => a.index - b.index);

      return selectedSentences.map((s) => s.sentence).join(" ");
    },
    [sentenceScore]
  );

  const handleSummarize = useCallback(() => {
    try {
      setError("");

      if (!inputText.trim()) {
        setError("Please enter text to summarize");
        return;
      }

      if (inputText.trim().split(/\s+/).length < 50) {
        setError("Please enter at least 50 words for meaningful summarization");
        return;
      }

      const result = summarizeText(inputText, summaryLength);
      setSummary(result);
      showMessage("Text summarized successfully");
    } catch {
      setError("Failed to summarize text. Please try again.");
      setSummary("");
    }
  }, [inputText, summaryLength, summarizeText]);

  const handleCopySummary = useCallback(() => {
    if (!summary) {
      showMessage("No summary to copy");
      return;
    }

    navigator.clipboard
      .writeText(summary)
      .then(() => {
        showMessage("Summary copied to clipboard");
      })
      .catch(() => {
        setError("Failed to copy summary");
      });
  }, [summary]);

  const inputWordCount = useMemo(() => {
    return inputText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }, [inputText]);

  const summaryWordCount = useMemo(() => {
    return summary
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }, [summary]);

  const compressionRatio = useMemo(() => {
    if (inputWordCount === 0) return 0;
    return Math.round(
      ((inputWordCount - summaryWordCount) / inputWordCount) * 100
    );
  }, [inputWordCount, summaryWordCount]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <SEOContent
        title="Free Text Summarizer - AI Summary Generator Online"
        description="Summarize long text instantly with our free AI text summarizer. Adjustable summary length for articles, essays, and documents."
      />

      <SnackBarWithPosition
        open={isSnackBarOpen}
        message={snackBarMessage}
        handleClose={() => setIsSnackBarOpen(false)}
        autoHideDuration={3000}
      />

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
            <Typography variant="h6">Settings</Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Summary Length</InputLabel>
              <Select
                value={summaryLength}
                label="Summary Length"
                onChange={(e: SelectChangeEvent) =>
                  setSummaryLength(e.target.value)
                }
              >
                <MenuItem value="short">Short (~20%)</MenuItem>
                <MenuItem value="medium">Medium (~35%)</MenuItem>
                <MenuItem value="long">Long (~50%)</MenuItem>
              </Select>
            </FormControl>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-3">
            <Typography variant="h6">Input Text</Typography>
            <Chip
              label={`${inputWordCount} words`}
              size="small"
              color="primary"
            />
          </div>
          <TextField
            multiline
            fullWidth
            minRows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            variant="outlined"
            placeholder="Paste your text here to summarize..."
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "14px",
                lineHeight: 1.6,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSummarize}
            startIcon={<SummarizeIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Summarize Text
          </Button>
        </CardContent>
      </Card>

      {summary && (
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Typography variant="h6">Summary</Typography>
                <Chip
                  label={`${summaryWordCount} words`}
                  size="small"
                  color="success"
                />
                <Chip
                  label={`${compressionRatio}% shorter`}
                  size="small"
                  color="info"
                  variant="outlined"
                />
              </div>
              <Button
                variant="outlined"
                onClick={handleCopySummary}
                startIcon={<ContentCopyIcon />}
                size="small"
              >
                Copy Summary
              </Button>
            </div>
            <TextField
              multiline
              fullWidth
              minRows={8}
              value={summary}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "14px",
                  lineHeight: 1.6,
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-2">
            How It Works
          </Typography>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              Analyzes your text to identify key sentences and important
              information
            </li>
            <li>Uses word frequency analysis to score sentence importance</li>
            <li>Preserves the original order and flow of information</li>
            <li>
              Adjustable length lets you control how concise the summary should
              be
            </li>
            <li>All processing happens in your browser for complete privacy</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
