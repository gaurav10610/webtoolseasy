"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

type ASCIIFont = "standard" | "banner" | "block" | "slant" | "small";

// ASCII art font definitions
const asciifonts: Record<ASCIIFont, Record<string, string[]>> = {
  standard: {
    A: ["  ___  ", " / _ \\ ", "| |_| |", "|  _  |", "|_| |_|"],
    B: [" ____  ", "|  _ \\ ", "| |_) |", "|  _ < ", "|_| \\_\\"],
    C: ["  ____ ", " / ___|", "| |    ", "| |___ ", " \\____|"],
    D: [" ____  ", "|  _ \\ ", "| | | |", "| |_| |", "|____/ "],
    E: [" _____ ", "|  ___|", "| |__  ", "|  __| ", "|_____|"],
    F: [" _____ ", "|  ___|", "| |__  ", "|  __| ", "|_|    "],
    G: ["  ____ ", " / ___|", "| |  _ ", "| |_| |", " \\____|"],
    H: [" _   _ ", "| | | |", "| |_| |", "|  _  |", "|_| |_|"],
    I: [" ___ ", "|_ _|", " | | ", " | | ", "|___|"],
    J: ["     _ ", "    | |", " _  | |", "| |_| |", " \\___/ "],
    K: [" _  __", "| |/ /", "| ' / ", "| . \\ ", "|_|\\_\\"],
    L: [" _     ", "| |    ", "| |    ", "| |___ ", "|_____|"],
    M: [" __  __ ", "|  \\/  |", "| |\\/| |", "| |  | |", "|_|  |_|"],
    N: [" _   _ ", "| \\ | |", "|  \\| |", "| |\\  |", "|_| \\_|"],
    O: ["  ___  ", " / _ \\ ", "| | | |", "| |_| |", " \\___/ "],
    P: [" ____  ", "|  _ \\ ", "| |_) |", "|  __/ ", "|_|    "],
    Q: ["  ___  ", " / _ \\ ", "| | | |", "| |_| |", " \\__\\_\\"],
    R: [" ____  ", "|  _ \\ ", "| |_) |", "|  _ < ", "|_| \\_\\"],
    S: ["  ____  ", " / ___| ", " \\___ \\ ", "  ___) |", " |____/ "],
    T: [" _____ ", "|_   _|", "  | |  ", "  | |  ", "  |_|  "],
    U: [" _   _ ", "| | | |", "| | | |", "| |_| |", " \\___/ "],
    V: [
      " __     __",
      " \\ \\   / /",
      "  \\ \\ / / ",
      "   \\ V /  ",
      "    \\_/   ",
    ],
    W: [
      " __        __",
      " \\ \\      / /",
      "  \\ \\ /\\ / / ",
      "   \\ V  V /  ",
      "    \\_/\\_/   ",
    ],
    X: [" __  __", " \\ \\/ /", "  \\  / ", "  /  \\ ", " /_/\\_\\"],
    Y: [" __   __", " \\ \\ / /", "  \\ V / ", "   | |  ", "   |_|  "],
    Z: [" _____", "|__  /", "  / / ", " / /_ ", "/____|"],
    " ": ["     ", "     ", "     ", "     ", "     "],
  },
  banner: {
    A: ["#####", "#   #", "#####", "#   #", "#   #"],
    B: ["#### ", "#   #", "#### ", "#   #", "#### "],
    C: [" ####", "#    ", "#    ", "#    ", " ####"],
    D: ["#### ", "#   #", "#   #", "#   #", "#### "],
    E: ["#####", "#    ", "#### ", "#    ", "#####"],
    F: ["#####", "#    ", "#### ", "#    ", "#    "],
    G: [" ####", "#    ", "#  ##", "#   #", " ####"],
    H: ["#   #", "#   #", "#####", "#   #", "#   #"],
    I: ["###", " # ", " # ", " # ", "###"],
    J: ["  ###", "   # ", "   # ", "#  # ", " ## "],
    K: ["#   #", "#  # ", "###  ", "#  # ", "#   #"],
    L: ["#    ", "#    ", "#    ", "#    ", "#####"],
    M: ["#   #", "## ##", "# # #", "#   #", "#   #"],
    N: ["#   #", "##  #", "# # #", "#  ##", "#   #"],
    O: [" ### ", "#   #", "#   #", "#   #", " ### "],
    P: ["#### ", "#   #", "#### ", "#    ", "#    "],
    Q: [" ### ", "#   #", "#   #", "#  ##", " ####"],
    R: ["#### ", "#   #", "#### ", "#  # ", "#   #"],
    S: [" ####", "#    ", " ### ", "    #", "#### "],
    T: ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
    U: ["#   #", "#   #", "#   #", "#   #", " ### "],
    V: ["#   #", "#   #", "#   #", " # # ", "  #  "],
    W: ["#   #", "#   #", "# # #", "## ##", "#   #"],
    X: ["#   #", " # # ", "  #  ", " # # ", "#   #"],
    Y: ["#   #", " # # ", "  #  ", "  #  ", "  #  "],
    Z: ["#####", "   # ", "  #  ", " #   ", "#####"],
    " ": ["     ", "     ", "     ", "     ", "     "],
  },
  block: {
    A: ["█████", "█   █", "█████", "█   █", "█   █"],
    B: ["████ ", "█   █", "████ ", "█   █", "████ "],
    C: [" ████", "█    ", "█    ", "█    ", " ████"],
    D: ["████ ", "█   █", "█   █", "█   █", "████ "],
    E: ["█████", "█    ", "████ ", "█    ", "█████"],
    F: ["█████", "█    ", "████ ", "█    ", "█    "],
    G: [" ████", "█    ", "█  ██", "█   █", " ████"],
    H: ["█   █", "█   █", "█████", "█   █", "█   █"],
    I: ["███", " █ ", " █ ", " █ ", "███"],
    J: ["  ███", "   █ ", "   █ ", "█  █ ", " ██ "],
    K: ["█   █", "█  █ ", "███  ", "█  █ ", "█   █"],
    L: ["█    ", "█    ", "█    ", "█    ", "█████"],
    M: ["█   █", "██ ██", "█ █ █", "█   █", "█   █"],
    N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
    O: [" ███ ", "█   █", "█   █", "█   █", " ███ "],
    P: ["████ ", "█   █", "████ ", "█    ", "█    "],
    Q: [" ███ ", "█   █", "█   █", "█  ██", " ████"],
    R: ["████ ", "█   █", "████ ", "█  █ ", "█   █"],
    S: [" ████", "█    ", " ███ ", "    █", "████ "],
    T: ["█████", "  █  ", "  █  ", "  █  ", "  █  "],
    U: ["█   █", "█   █", "█   █", "█   █", " ███ "],
    V: ["█   █", "█   █", "█   █", " █ █ ", "  █  "],
    W: ["█   █", "█   █", "█ █ █", "██ ██", "█   █"],
    X: ["█   █", " █ █ ", "  █  ", " █ █ ", "█   █"],
    Y: ["█   █", " █ █ ", "  █  ", "  █  ", "  █  "],
    Z: ["█████", "   █ ", "  █  ", " █   ", "█████"],
    " ": ["     ", "     ", "     ", "     ", "     "],
  },
  slant: {
    A: ["    ____ ", "   /   | ", "  / /| | ", " / __  | ", "/_/  |_| "],
    B: [" ____ ", "|  _( ", "| |_ \\", "|  _( ", "|____/"],
    C: ["  ____ ", " / ___|", "| |    ", "| |___ ", " \\____|"],
    D: [" ____  ", "|  _ \\ ", "| | | |", "| |_| |", "|____/ "],
    E: [" _____ ", "|  ___|", "| |__  ", "|  __| ", "|_____|"],
    F: [" _____ ", "|  ___|", "| |__  ", "|  __| ", "|_|    "],
    G: ["  ____ ", " / ___|", "| |  _ ", "| |_| |", " \\____|"],
    H: [" _   _ ", "| | | |", "| |_| |", "|  _  |", "|_| |_|"],
    I: [" ___ ", "|_ _|", " | | ", " | | ", "|___|"],
    J: ["     _ ", "    | |", " _  | |", "| |_| |", " \\___/ "],
    K: [" _  __", "| |/ /", "| ' / ", "| . \\ ", "|_|\\_\\"],
    L: [" _     ", "| |    ", "| |    ", "| |___ ", "|_____|"],
    M: [" __  __ ", "|  \\/  |", "| |\\/| |", "| |  | |", "|_|  |_|"],
    N: [" _   _ ", "| \\ | |", "|  \\| |", "| |\\  |", "|_| \\_|"],
    O: ["  ___  ", " / _ \\ ", "| | | |", "| |_| |", " \\___/ "],
    P: [" ____  ", "|  _ \\ ", "| |_) |", "|  __/ ", "|_|    "],
    Q: ["  ___  ", " / _ \\ ", "| | | |", "| |_| |", " \\__\\_\\"],
    R: [" ____  ", "|  _ \\ ", "| |_) |", "|  _ < ", "|_| \\_\\"],
    S: ["  ____  ", " / ___| ", " \\___ \\ ", "  ___) |", " |____/ "],
    T: [" _____ ", "|_   _|", "  | |  ", "  | |  ", "  |_|  "],
    U: [" _   _ ", "| | | |", "| | | |", "| |_| |", " \\___/ "],
    V: [
      " __     __",
      " \\ \\   / /",
      "  \\ \\ / / ",
      "   \\ V /  ",
      "    \\_/   ",
    ],
    W: [
      " __        __",
      " \\ \\      / /",
      "  \\ \\ /\\ / / ",
      "   \\ V  V /  ",
      "    \\_/\\_/   ",
    ],
    X: [" __  __", " \\ \\/ /", "  \\  / ", "  /  \\ ", " /_/\\_\\"],
    Y: [" __   __", " \\ \\ / /", "  \\ V / ", "   | |  ", "   |_|  "],
    Z: [" _____", "|__  /", "  / / ", " / /_ ", "/____|"],
    " ": ["         ", "         ", "         ", "         ", "         "],
  },
  small: {
    A: [" _ ", "/_\\", "/ \\"],
    B: ["_ ", "|_)", "|_)"],
    C: [" _ ", "/  ", "\\_"],
    D: ["_  ", "| \\ ", "|_/"],
    E: ["_ ", "|_ ", "|_"],
    F: ["_ ", "|_ ", "|  "],
    G: [" _ ", "/_ ", "\\_>"],
    H: ["_  _", "|__| ", "|  |"],
    I: ["_", "|", "|"],
    J: [" _", " |", "_|"],
    K: ["_  ", "|/ ", "|\\ "],
    L: ["_  ", "|  ", "|__"],
    M: ["_  _", "|\\/|", "|  |"],
    N: ["_  _", "|\\ |", "| \\|"],
    O: [" _ ", "/ \\", "\\_/"],
    P: ["_ ", "|_)", "|  "],
    Q: [" _ ", "/ \\", "\\_\\"],
    R: ["_ ", "|_)", "| \\"],
    S: [" _ ", "(_", "_)"],
    T: ["___", " | ", " | "],
    U: ["_  _", "|  |", "|__|"],
    V: ["_  _", "\\  /", " \\/ "],
    W: ["_  _", "|  |", "|/\\|"],
    X: ["_  _", " \\/ ", " /\\ "],
    Y: ["_  _", " \\/ ", " |  "],
    Z: ["___", " _/", "/__"],
    " ": ["   ", "   ", "   "],
  },
};

export default function ASCIIArtGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "HELLO",
  });

  const [inputText, setInputText] = useState("HELLO");
  const [selectedFont, setSelectedFont] = useState<ASCIIFont>("standard");

  const handleFontChange = (event: SelectChangeEvent) => {
    setSelectedFont(event.target.value as ASCIIFont);
  };

  const generateASCIIArt = useCallback(
    (text: string, font: ASCIIFont): string => {
      const upperText = text.toUpperCase();
      const fontData = asciifonts[font];
      const height = fontData.A.length;
      const lines: string[] = Array(height).fill("");

      for (let i = 0; i < upperText.length; i++) {
        const char = upperText[i];
        const charLines = fontData[char] || fontData[" "];

        for (let j = 0; j < height; j++) {
          lines[j] += charLines[j] + " ";
        }
      }

      return lines.join("\n");
    },
    []
  );

  const asciiArt = useMemo(
    () => generateASCIIArt(inputText, selectedFont),
    [inputText, selectedFont, generateASCIIArt]
  );

  const clearInput = useCallback(() => {
    setInputText("");
    toolState.actions.showMessage("Text cleared");
  }, [toolState.actions]);

  const buttons = [
    {
      type: "copy" as const,
      text: "Copy ASCII Art",
      copyText: asciiArt,
    },
    {
      type: "custom" as const,
      text: "Clear",
      onClick: clearInput,
      color: "error" as const,
    },
    ...createCommonButtons({
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
        title="ASCII Art Generator - Text to ASCII Art"
        description="Convert text to ASCII art online. Create cool text art with multiple fonts. Free ASCII generator for banners, signatures, and code comments."
        exampleCode="HELLO"
        exampleOutput="ASCII art text"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="space-y-6">
        {/* Input Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              <TextFieldsIcon /> Input Text
            </Typography>
            <TextField
              label="Enter Text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              fullWidth
              placeholder="Type your text here..."
              inputProps={{ maxLength: 20 }}
              helperText="Maximum 20 characters for best results"
            />
          </CardContent>
        </Card>

        {/* Font Selection */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Font Style
            </Typography>
            <FormControl fullWidth>
              <InputLabel>ASCII Font</InputLabel>
              <Select
                value={selectedFont}
                label="ASCII Font"
                onChange={handleFontChange}
              >
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="banner">Banner</MenuItem>
                <MenuItem value="block">Block</MenuItem>
                <MenuItem value="slant">Slant</MenuItem>
                <MenuItem value="small">Small</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              ASCII Art Output
            </Typography>
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre">
              {asciiArt || "Enter text to generate ASCII art..."}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardContent>
            <Typography variant="body2" className="text-sm">
              <strong>How to use:</strong> Enter your text (letters A-Z and
              spaces), select a font style, and your ASCII art will be generated
              instantly. Copy and paste the output into your project, README, or
              social media. Works best with monospace fonts.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
