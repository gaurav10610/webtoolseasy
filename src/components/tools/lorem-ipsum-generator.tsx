"use client";

import { useState, useCallback } from "react";
import { TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
  "et",
  "harum",
  "quidem",
  "rerum",
  "facilis",
  "expedita",
  "distinctio",
  "nam",
  "libero",
  "tempore",
  "cum",
  "soluta",
  "nobis",
  "eligendi",
  "optio",
  "cumque",
  "nihil",
  "impedit",
  "quo",
  "minus",
  "quod",
  "maxime",
  "placeat",
  "facere",
  "possimus",
  "omnis",
  "voluptas",
  "assumenda",
  "repellendus",
  "temporibus",
  "quibusdam",
  "aut",
  "officiis",
  "debitis",
  "saepe",
  "eveniet",
  "voluptates",
  "repudiandae",
];

export default function LoremIpsumGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [count, setCount] = useState<number>(3);
  const [type, setType] = useState<"paragraphs" | "words" | "sentences">(
    "paragraphs"
  );
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);

  const generateWord = useCallback((): string => {
    return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
  }, []);

  const generateSentence = useCallback(
    (startWith = ""): string => {
      const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words
      const words = startWith ? [startWith] : [];

      for (let i = words.length; i < wordCount; i++) {
        words.push(generateWord());
      }

      // Capitalize first letter
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

      return words.join(" ") + ".";
    },
    [generateWord]
  );

  const generateParagraph = useCallback(
    (startWith = ""): string => {
      const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
      const sentences: string[] = [];

      for (let i = 0; i < sentenceCount; i++) {
        if (i === 0 && startWith) {
          sentences.push(generateSentence(startWith));
        } else {
          sentences.push(generateSentence());
        }
      }

      return sentences.join(" ");
    },
    [generateSentence]
  );

  const generateText = useCallback(() => {
    let result = "";

    if (type === "paragraphs") {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithLorem) {
          paragraphs.push(generateParagraph("Lorem ipsum dolor sit amet"));
        } else {
          paragraphs.push(generateParagraph());
        }
      }
      result = paragraphs.join("\n\n");
    } else if (type === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithLorem) {
          sentences.push(generateSentence("Lorem ipsum dolor sit amet"));
        } else {
          sentences.push(generateSentence());
        }
      }
      result = sentences.join(" ");
    } else {
      // words
      const words: string[] = [];
      if (startWithLorem && count >= 5) {
        words.push("Lorem", "ipsum", "dolor", "sit", "amet");
        for (let i = 5; i < count; i++) {
          words.push(generateWord());
        }
      } else {
        for (let i = 0; i < count; i++) {
          words.push(generateWord());
        }
      }
      result = words.join(" ");
    }

    toolState.setCode(result);
    toolState.actions.showMessage("Lorem Ipsum text generated!");
  }, [
    count,
    type,
    startWithLorem,
    generateParagraph,
    generateSentence,
    generateWord,
    toolState,
  ]);

  const buttons = [
    {
      type: "custom" as const,
      text: "Generate",
      onClick: generateText,
      icon: <RefreshIcon />,
      variant: "contained" as const,
      color: "primary" as const,
    },
    ...createCommonButtons({
      onCopy: () => toolState.actions.copyText(toolState.code),
      onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
      onFullScreen: toolState.toggleFullScreen,
    }),
  ];

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
        title="Lorem Ipsum Generator"
        description="Generate Lorem Ipsum placeholder text for your designs. Choose paragraphs, sentences, or words. Perfect for mockups and prototypes."
      />

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            size="small"
            className="md:w-48"
          >
            <MenuItem value="paragraphs">Paragraphs</MenuItem>
            <MenuItem value="sentences">Sentences</MenuItem>
            <MenuItem value="words">Words</MenuItem>
          </TextField>

          <TextField
            type="number"
            label="Count"
            value={count}
            onChange={(e) =>
              setCount(
                Math.max(1, Math.min(100, parseInt(e.target.value) || 1))
              )
            }
            size="small"
            className="md:w-32"
            inputProps={{ min: 1, max: 100 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                color="primary"
              />
            }
            label="Start with 'Lorem ipsum'"
          />
        </div>

        <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

        <div className="w-full">
          <TextField
            multiline
            fullWidth
            rows={toolState.isFullScreen ? 25 : 12}
            value={toolState.code}
            onChange={(e) => toolState.setCode(e.target.value)}
            placeholder="Generated Lorem Ipsum text will appear here..."
            variant="outlined"
            slotProps={{
              input: {
                style: {
                  fontFamily: "monospace",
                  fontSize: "14px",
                },
              },
            }}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
