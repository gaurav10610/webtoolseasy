"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SnackBarWithPosition } from "../lib/snackBar";
import { SEOContent } from "../common/ToolLayout";
import { ToolComponentProps } from "@/types/component";
import { componentConfig } from "@/data/tools/paraphrasing-tool";

type ParaphraseMode = "standard" | "formal" | "creative" | "fluency";

// Synonym dictionary for paraphrasing
const synonyms: Record<string, string[]> = {
  good: ["excellent", "great", "fine", "quality", "positive"],
  bad: ["poor", "negative", "unfavorable", "inferior", "inadequate"],
  big: ["large", "substantial", "significant", "considerable", "extensive"],
  small: ["little", "minor", "modest", "limited", "compact"],
  important: ["significant", "crucial", "vital", "essential", "critical"],
  make: ["create", "produce", "generate", "develop", "construct"],
  use: ["utilize", "employ", "apply", "implement", "adopt"],
  think: ["believe", "consider", "perceive", "regard", "view"],
  show: ["demonstrate", "display", "reveal", "illustrate", "exhibit"],
  help: ["assist", "aid", "support", "facilitate", "enable"],
  very: ["extremely", "highly", "remarkably", "notably", "particularly"],
  many: ["numerous", "several", "various", "multiple", "countless"],
  also: ["additionally", "furthermore", "moreover", "likewise", "besides"],
  however: ["nevertheless", "nonetheless", "yet", "still", "though"],
  because: ["since", "as", "due to", "owing to", "given that"],
  different: ["diverse", "varied", "distinct", "separate", "unique"],
  same: ["identical", "similar", "equivalent", "comparable", "alike"],
  way: ["method", "approach", "manner", "technique", "strategy"],
  people: ["individuals", "persons", "citizens", "population", "society"],
  thing: ["item", "object", "element", "matter", "aspect"],
  work: ["operate", "function", "perform", "labor", "endeavor"],
  find: ["discover", "locate", "identify", "determine", "detect"],
  give: ["provide", "offer", "supply", "furnish", "deliver"],
  take: ["acquire", "obtain", "receive", "accept", "adopt"],
  see: ["observe", "notice", "perceive", "witness", "view"],
  know: ["understand", "comprehend", "recognize", "realize", "acknowledge"],
  get: ["obtain", "acquire", "receive", "gain", "secure"],
  new: ["novel", "fresh", "recent", "modern", "contemporary"],
  old: ["ancient", "aged", "historic", "traditional", "former"],
  first: ["initial", "primary", "foremost", "leading", "principal"],
  last: ["final", "ultimate", "concluding", "ending", "latest"],
  long: ["extended", "lengthy", "prolonged", "extensive", "protracted"],
  great: ["remarkable", "outstanding", "exceptional", "magnificent", "superb"],
  little: ["small", "minor", "slight", "modest", "limited"],
  own: ["possess", "have", "hold", "maintain", "retain"],
  other: ["alternative", "different", "additional", "further", "separate"],
  start: ["begin", "commence", "initiate", "launch", "embark"],
  end: ["conclude", "finish", "terminate", "complete", "cease"],
  change: ["modify", "alter", "transform", "adjust", "revise"],
  need: ["require", "necessitate", "demand", "want", "desire"],
  want: ["desire", "wish", "prefer", "seek", "aspire"],
  try: ["attempt", "endeavor", "strive", "effort", "undertake"],
  keep: ["maintain", "preserve", "retain", "sustain", "continue"],
  look: ["appear", "seem", "examine", "observe", "inspect"],
  tell: ["inform", "notify", "communicate", "explain", "describe"],
  ask: ["inquire", "question", "request", "query", "seek"],
  become: ["turn into", "develop into", "evolve into", "transform into"],
  feel: ["sense", "experience", "perceive", "undergo", "encounter"],
  seem: ["appear", "look like", "give the impression"],
  provide: ["supply", "offer", "furnish", "deliver", "present"],
  include: ["contain", "comprise", "incorporate", "encompass", "involve"],
  continue: ["proceed", "persist", "maintain", "carry on", "sustain"],
  set: ["establish", "arrange", "place", "position", "configure"],
  learn: ["discover", "acquire", "master", "grasp", "comprehend"],
  often: ["frequently", "regularly", "commonly", "routinely", "habitually"],
  always: ["constantly", "perpetually", "continually", "invariably"],
  never: ["not ever", "at no time", "under no circumstances"],
  sometimes: ["occasionally", "periodically", "intermittently", "sporadically"],
};

export default function ParaphrasingTool({}: Readonly<ToolComponentProps>) {
  const [inputText, setInputText] = useState("");
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [mode, setMode] = useState<ParaphraseMode>("standard");
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "success" as "success" | "error" | "info",
  });

  const getSynonym = (word: string): string => {
    const lowerWord = word.toLowerCase();
    const wordSynonyms = synonyms[lowerWord];

    if (!wordSynonyms || wordSynonyms.length === 0) {
      return word;
    }

    // Different modes use different synonym selection strategies
    let index: number;
    if (mode === "creative") {
      // Creative mode: random selection
      index = Math.floor(Math.random() * wordSynonyms.length);
    } else if (mode === "formal") {
      // Formal mode: prefer later synonyms (usually more formal)
      index = Math.min(
        Math.floor((wordSynonyms.length * 2) / 3),
        wordSynonyms.length - 1
      );
    } else {
      // Standard/Fluency: first synonym (most common)
      index = 0;
    }

    const synonym = wordSynonyms[index];

    // Preserve capitalization
    if (word[0] === word[0].toUpperCase()) {
      return synonym.charAt(0).toUpperCase() + synonym.slice(1);
    }

    return synonym;
  };

  const paraphraseText = (text: string): string => {
    if (!text.trim()) return "";

    // Split into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    const paraphrasedSentences = sentences.map((sentence) => {
      // Split into words, preserving punctuation
      const words = sentence.split(/\b/);

      // Replace rate based on mode
      const replaceRate = {
        standard: 0.3,
        formal: 0.4,
        creative: 0.6,
        fluency: 0.25,
      }[mode];

      const paraphrasedWords = words.map((word) => {
        // Skip very short words, numbers, and punctuation
        if (word.length <= 2 || /^[^a-zA-Z]+$/.test(word)) {
          return word;
        }

        // Randomly decide whether to replace based on mode
        if (Math.random() < replaceRate) {
          return getSynonym(word);
        }

        return word;
      });

      let result = paraphrasedWords.join("");

      // Creative mode: sometimes restructure sentences
      if (mode === "creative" && Math.random() < 0.3) {
        // Simple restructuring: move "However," to middle sometimes
        result = result.replace(
          /^(However|Additionally|Furthermore|Moreover|Nevertheless),\s*/,
          (match) => {
            const parts = result.split(",");
            if (parts.length > 2) {
              return ""; // Remove from start, will add later
            }
            return match;
          }
        );
      }

      return result.trim();
    });

    return paraphrasedSentences.join(" ");
  };

  const handleParaphrase = () => {
    if (!inputText.trim()) {
      setError("Please enter text to paraphrase");
      return;
    }

    if (inputText.trim().split(/\s+/).length < 5) {
      setError("Please enter at least 5 words to paraphrase");
      return;
    }

    setError("");

    try {
      const result = paraphraseText(inputText);
      setParaphrasedText(result);

      setSnackbar({
        open: true,
        message: "Text paraphrased successfully!",
        color: "success",
      });
    } catch {
      setError("Failed to paraphrase text. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paraphrasedText);
    setSnackbar({
      open: true,
      message: "Copied to clipboard!",
      color: "success",
    });
  };

  const handleModeChange = (event: SelectChangeEvent<ParaphraseMode>) => {
    setMode(event.target.value as ParaphraseMode);
    // Clear paraphrased text when mode changes
    setParaphrasedText("");
  };

  const wordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <SEOContent
        title={componentConfig.pageTitle}
        description="Paraphrase and rewrite text with multiple modes"
      />

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Settings */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-3">
            Paraphrasing Settings
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Mode</InputLabel>
            <Select value={mode} label="Mode" onChange={handleModeChange}>
              <MenuItem value="standard">
                Standard - Balanced rewriting
              </MenuItem>
              <MenuItem value="formal">
                Formal - Academic & professional tone
              </MenuItem>
              <MenuItem value="creative">
                Creative - Extensive rewording
              </MenuItem>
              <MenuItem value="fluency">
                Fluency - Enhanced readability
              </MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Input */}
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-3">
            <Typography variant="h6">Original Text</Typography>
            <Chip
              label={`${wordCount(inputText)} words`}
              color="primary"
              size="small"
            />
          </div>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter or paste your text here..."
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "monospace",
                fontSize: "0.95rem",
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AutorenewIcon />}
            onClick={handleParaphrase}
            fullWidth
            sx={{ mt: 2 }}
            size="large"
          >
            Paraphrase Text
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      {paraphrasedText && (
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <Typography variant="h6">Paraphrased Text</Typography>
              <div className="flex gap-2">
                <Chip
                  label={`${wordCount(paraphrasedText)} words`}
                  color="success"
                  size="small"
                />
                <Chip
                  label={mode.charAt(0).toUpperCase() + mode.slice(1)}
                  color="info"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={paraphrasedText}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                "& .MuiInputBase-root": {
                  fontFamily: "monospace",
                  fontSize: "0.95rem",
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              fullWidth
              sx={{ mt: 2 }}
            >
              Copy Paraphrased Text
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-2">
            How It Works
          </Typography>
          <Typography variant="body2" component="div" className="text-gray-700">
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Standard Mode:</strong> Replaces 30% of words with
                synonyms while maintaining structure
              </li>
              <li>
                <strong>Formal Mode:</strong> Uses sophisticated vocabulary for
                academic writing (40% replacement)
              </li>
              <li>
                <strong>Creative Mode:</strong> Extensive rewording with varied
                sentence structures (60% replacement)
              </li>
              <li>
                <strong>Fluency Mode:</strong> Light paraphrasing focused on
                improving flow (25% replacement)
              </li>
              <li>
                All processing happens in your browser - your text stays private
              </li>
            </ul>
          </Typography>
        </CardContent>
      </Card>

      <SnackBarWithPosition
        open={snackbar.open}
        message={snackbar.message}
        color={snackbar.color}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
}
