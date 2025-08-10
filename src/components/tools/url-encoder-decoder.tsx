"use client";

import { TextField, Typography } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { ButtonWithHandler } from "../lib/buttons";
import ClearIcon from "@mui/icons-material/Clear";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export default function UrlEncoderDecoder({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue =
    "https://webtoolseasy.com/tools/url-encoder-decoder?param=hello world&example=test@email.com";

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");

  const encodeComponent = useCallback(() => {
    try {
      const result = encodeURIComponent(toolState.code);
      setOutputText(result);
      setError("");
      toolState.actions.showMessage("Component encoded successfully!");
    } catch {
      setError("Failed to encode component. Please check your input.");
      toolState.actions.showMessage("Error encoding component");
    }
  }, [toolState]);

  const decodeComponent = useCallback(() => {
    try {
      const result = decodeURIComponent(toolState.code);
      setOutputText(result);
      setError("");
      toolState.actions.showMessage("Component decoded successfully!");
    } catch {
      setError("Failed to decode component. Please check your input format.");
      toolState.actions.showMessage("Error decoding component");
    }
  }, [toolState]);

  const encodeUri = useCallback(() => {
    try {
      const result = encodeURI(toolState.code);
      setOutputText(result);
      setError("");
      toolState.actions.showMessage("URI encoded successfully!");
    } catch {
      setError("Failed to encode URI. Please check your input.");
      toolState.actions.showMessage("Error encoding URI");
    }
  }, [toolState]);

  const decodeUri = useCallback(() => {
    try {
      const result = decodeURI(toolState.code);
      setOutputText(result);
      setError("");
      toolState.actions.showMessage("URI decoded successfully!");
    } catch {
      setError("Failed to decode URI. Please check your input format.");
      toolState.actions.showMessage("Error decoding URI");
    }
  }, [toolState]);

  const clearText = useCallback(() => {
    toolState.setCode("");
    setOutputText("");
    setError("");
    toolState.actions.showMessage("Text cleared!");
  }, [toolState]);

  const copyOutput = useCallback(() => {
    toolState.actions.copyText(outputText, "Result copied!");
  }, [toolState.actions, outputText]);

  const swapInputOutput = useCallback(() => {
    const temp = toolState.code;
    toolState.setCode(outputText);
    setOutputText(temp);
    toolState.actions.showMessage("Input and output swapped!");
  }, [toolState, outputText]);

  // Custom buttons for URL operations
  const urlButtons = useMemo(
    () => [
      {
        buttonText: "Encode URI",
        onClick: encodeUri,
        variant: "contained" as const,
        size: "small" as const,
        color: "primary" as const,
      },
      {
        buttonText: "Decode URI",
        onClick: decodeUri,
        variant: "contained" as const,
        size: "small" as const,
        color: "secondary" as const,
      },
      {
        buttonText: "Encode Component",
        onClick: encodeComponent,
        variant: "outlined" as const,
        size: "small" as const,
      },
      {
        buttonText: "Decode Component",
        onClick: decodeComponent,
        variant: "outlined" as const,
        size: "small" as const,
      },
    ],
    [encodeUri, decodeUri, encodeComponent, decodeComponent]
  );

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: copyOutput,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
      {
        type: "custom" as const,
        text: "Clear",
        onClick: clearText,
        variant: "outlined" as const,
        color: "error" as const,
        icon: <ClearIcon />,
      },
      {
        type: "custom" as const,
        text: "Swap",
        onClick: swapInputOutput,
        variant: "outlined" as const,
        icon: <CompareArrowsIcon />,
      },
    ],
    [copyOutput, toolState, clearText, swapInputOutput]
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
        title="URL Encoder Decoder"
        description="Free online URL encoder and decoder. Encode and decode URLs, URI components, and query parameters instantly with support for all special characters."
        exampleCode="https://example.com/search?q=hello world&user=test@email.com"
        exampleOutput="https%3A//example.com/search%3Fq%3Dhello%20world%26user%3Dtest%40email.com"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="flex flex-col w-full gap-6">
        {/* Error message */}
        {error && (
          <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
            <Typography variant="body2" className="text-red-800 font-medium">
              ⚠️ {error}
            </Typography>
          </div>
        )}

        {/* URL Operation Buttons */}
        <div className="flex flex-wrap gap-3 justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
          {urlButtons.map((button, index) => (
            <ButtonWithHandler
              key={index}
              buttonText={button.buttonText}
              onClick={button.onClick}
              variant={button.variant}
              size={button.size}
              color={button.color}
            />
          ))}
        </div>

        {/* Input */}
        <div className="flex flex-col w-full gap-3">
          <Typography
            variant="body1"
            className="!text-lg !font-semibold flex items-center gap-2"
          >
            <span>📝</span>
            <span>Input URL or Text</span>
          </Typography>
          <TextField
            multiline
            minRows={4}
            maxRows={8}
            value={toolState.code}
            onChange={(e) => toolState.setCode(e.target.value)}
            placeholder="Enter URL, URI component, or text to encode/decode..."
            variant="outlined"
            fullWidth
            className="!font-mono"
            sx={{
              "& .MuiInputBase-input": {
                fontFamily: "monospace",
                fontSize: "14px",
              },
            }}
          />
        </div>

        {/* Examples */}
        <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Typography variant="body2" className="text-blue-800 mb-2">
            💡 <strong>Examples:</strong>
          </Typography>
          <div className="space-y-1">
            <Typography
              variant="body2"
              className="text-blue-700 font-mono text-xs break-all"
            >
              <strong>Full URL:</strong> https://example.com/search?q=hello
              world
            </Typography>
            <Typography
              variant="body2"
              className="text-blue-700 font-mono text-xs break-all"
            >
              <strong>Query Parameter:</strong> user=test@email.com&category=web
              tools
            </Typography>
            <Typography
              variant="body2"
              className="text-blue-700 font-mono text-xs break-all"
            >
              <strong>Special Characters:</strong> /path/to/file with
              spaces.html
            </Typography>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col w-full gap-3">
          <Typography
            variant="body1"
            className="!text-lg !font-semibold flex items-center gap-2"
          >
            <span>📄</span>
            <span>Output</span>
          </Typography>
          <TextField
            multiline
            minRows={4}
            maxRows={8}
            value={outputText}
            placeholder="Encoded/decoded result will appear here..."
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            className="!font-mono"
            sx={{
              "& .MuiInputBase-input": {
                fontFamily: "monospace",
                fontSize: "14px",
                backgroundColor: "#f5f5f5",
              },
            }}
          />
        </div>

        {/* Information Box */}
        <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg">
          <Typography variant="body2" className="text-green-800">
            <strong>🛈 Encoding Methods:</strong>
          </Typography>
          <ul className="list-disc list-inside text-green-700 text-sm mt-2 space-y-1">
            <li>
              <strong>Encode/Decode URI:</strong> Encodes entire URLs preserving
              URL structure
            </li>
            <li>
              <strong>Encode/Decode Component:</strong> Encodes individual URL
              parts like query parameters
            </li>
            <li>
              <strong>Use Component encoding</strong> for query parameters and
              path segments
            </li>
            <li>
              <strong>Use URI encoding</strong> for complete URLs with proper
              structure
            </li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
