"use client";

import React, { useState, useEffect } from "react";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { usePathname } from "next/navigation";
import { SnackBarWithPosition } from "../lib/snackBar";
import { ToolComponentProps } from "@/types/component";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import {
  TextField,
  Typography,
  Box,
  Chip,
  FormControlLabel,
  Checkbox,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface RegexMatch {
  match: string;
  index: number;
  groups?: string[];
  namedGroups?: { [key: string]: string };
}

export default function RegexTester({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialRegex = `\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b`;
  const initialTestString = `Contact us at support@webtoolseasy.com or admin@example.org
Visit our website: https://webtoolseasy.com
Phone: +1 (555) 123-4567
Email: info@company.co.uk for more information.`;

  const regexQueryParam = queryParams.regex;
  const testStringQueryParam = queryParams.testString;
  const currentPath = usePathname();

  const [regexPattern, setRegexPattern] = useState(
    regexQueryParam ? decodeText(regexQueryParam) : initialRegex
  );
  const [testString, setTestString] = useState(
    testStringQueryParam ? decodeText(testStringQueryParam) : initialTestString
  );
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  });
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const getFlagsString = () => {
    let flagsStr = "";
    if (flags.global) flagsStr += "g";
    if (flags.ignoreCase) flagsStr += "i";
    if (flags.multiline) flagsStr += "m";
    if (flags.dotAll) flagsStr += "s";
    if (flags.unicode) flagsStr += "u";
    if (flags.sticky) flagsStr += "y";
    return flagsStr;
  };

  const testRegex = () => {
    try {
      const regex = new RegExp(regexPattern, getFlagsString());
      const foundMatches: RegexMatch[] = [];

      if (flags.global) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups,
          });

          // Prevent infinite loop on zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups,
          });
        }
      }

      setMatches(foundMatches);
      setError("");
      setIsValid(true);
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
      setMatches([]);
    }
  };

  const highlightMatches = (text: string) => {
    if (!isValid || matches.length === 0) return text;

    const parts = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`before-${i}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Add highlighted match
      parts.push(
        <span
          key={`match-${i}`}
          className="bg-yellow-200 px-1 rounded font-semibold"
          title={`Match ${i + 1}`}
        >
          {match.match}
        </span>
      );

      lastIndex = match.index + match.match.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key="after">{text.substring(lastIndex)}</span>);
    }

    return parts;
  };

  useEffect(() => {
    testRegex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regexPattern, testString, flags]);

  const handleRegexCopy = () => {
    copyToClipboard(`/${regexPattern}/${getFlagsString()}`);
    setSnackBarMessage("Copied Regex to Clipboard!");
    setIsSnackBarOpen(true);
  };

  const handleLinkCopy = () => {
    Promise.all([
      compressStringToBase64(regexPattern),
      compressStringToBase64(testString),
    ]).then(([compressedRegex, compressedTestString]) => {
      copyToClipboard(
        `${hostname}${currentPath}?regex=${encodeText(
          compressedRegex
        )}&testString=${encodeText(compressedTestString)}`
      );
      setSnackBarMessage("Copied Shareable Link to Clipboard!");
      setIsSnackBarOpen(true);
    });
  };

  const clearAll = () => {
    setRegexPattern("");
    setTestString("");
    setMatches([]);
    setError("");
  };

  function ControlButtons() {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <ButtonWithHandler
          buttonText="Test Regex"
          variant="contained"
          onClick={testRegex}
          size="small"
          startIcon={<PlayArrowIcon />}
        />
        <ButtonWithHandler
          buttonText="Copy Regex"
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleRegexCopy}
        />
        <ButtonWithHandler
          buttonText="Copy Shareable Link"
          variant="outlined"
          size="small"
          startIcon={<LinkIcon />}
          onClick={handleLinkCopy}
        />
        <ButtonWithHandler
          buttonText="Clear All"
          variant="outlined"
          size="small"
          color="error"
          startIcon={<ClearIcon />}
          onClick={clearAll}
        />
        {!isFullScreen && (
          <ButtonWithHandler
            buttonText="Enter Full Screen"
            variant="outlined"
            size="small"
            startIcon={<OpenInFullIcon />}
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="!hidden md:!flex"
          />
        )}
        {isFullScreen && (
          <ButtonWithHandler
            buttonText="Close Full Screen"
            variant="outlined"
            size="small"
            startIcon={<CloseFullscreenIcon />}
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="!hidden md:!flex"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-3 w-full ${
        isFullScreen
          ? "p-3 fixed inset-0 z-50 bg-white h-full overflow-auto"
          : ""
      }`}
    >
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />

      <ControlButtons />

      {/* Regex Pattern and Test String Inputs - Side by Side with Equal Heights */}
      <Box className="flex flex-col md:flex-row gap-4 w-full">
        {/* Regex Pattern Input */}
        <Box className="flex flex-col gap-2 w-full md:w-1/2">
          <Typography variant="h6" className="font-semibold">
            Regular Expression Pattern
          </Typography>
          <Box className="flex flex-col gap-2 flex-1">
            <TextField
              fullWidth
              placeholder="Enter your regex pattern..."
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              error={!isValid}
              helperText={error || "Enter a valid regex pattern"}
              variant="outlined"
              multiline
              rows={6}
              sx={{ flex: 1 }}
            />

            {/* Flags */}
            <Box className="flex flex-col gap-2">
              <Typography variant="subtitle2" className="font-medium">
                Flags:
              </Typography>
              <Box className="grid grid-cols-2 gap-1">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.global}
                      onChange={(e) =>
                        setFlags({ ...flags, global: e.target.checked })
                      }
                      size="small"
                    />
                  }
                  label="Global (g)"
                  className="text-sm"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.ignoreCase}
                      onChange={(e) =>
                        setFlags({ ...flags, ignoreCase: e.target.checked })
                      }
                      size="small"
                    />
                  }
                  label="Ignore Case (i)"
                  className="text-sm"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.multiline}
                      onChange={(e) =>
                        setFlags({ ...flags, multiline: e.target.checked })
                      }
                      size="small"
                    />
                  }
                  label="Multiline (m)"
                  className="text-sm"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.dotAll}
                      onChange={(e) =>
                        setFlags({ ...flags, dotAll: e.target.checked })
                      }
                      size="small"
                    />
                  }
                  label="Dot All (s)"
                  className="text-sm"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Test String Input */}
        <Box className="flex flex-col gap-2 w-full md:w-1/2">
          <Typography variant="h6" className="font-semibold">
            Test String
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter text to test against your regex..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            variant="outlined"
            multiline
            rows={10}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>

      {/* Results */}
      <Box className="flex flex-col gap-2">
        <Typography variant="h6" className="font-semibold">
          Results
        </Typography>

        {error && (
          <Alert severity="error" icon={<InfoIcon />}>
            <strong>Regex Error:</strong> {error}
          </Alert>
        )}

        {isValid && (
          <Box className="flex flex-wrap gap-2 items-center">
            <Chip
              label={`${matches.length} match${
                matches.length !== 1 ? "es" : ""
              } found`}
              color={matches.length > 0 ? "success" : "default"}
              variant="outlined"
            />
            {regexPattern && (
              <Chip
                label={`/${regexPattern}/${getFlagsString()}`}
                variant="outlined"
                className="font-mono text-xs"
              />
            )}
          </Box>
        )}

        {/* Highlighted Text */}
        {isValid && testString && (
          <Box className="border border-gray-300 rounded p-3 bg-gray-50 min-h-[100px]">
            <Typography variant="subtitle2" className="font-medium mb-2">
              Text with Matches Highlighted:
            </Typography>
            <Box className="font-mono text-sm whitespace-pre-wrap break-words">
              {highlightMatches(testString)}
            </Box>
          </Box>
        )}

        {/* Match Details */}
        {matches.length > 0 && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" className="font-semibold">
                Match Details ({matches.length} matches)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="flex flex-col gap-3">
                {matches.map((match, index) => (
                  <Box
                    key={index}
                    className="border border-gray-200 rounded p-3 bg-white"
                  >
                    <Typography
                      variant="subtitle2"
                      className="font-semibold mb-2"
                    >
                      Match {index + 1}
                    </Typography>
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <Box>
                        <strong>Text:</strong>{" "}
                        <code className="bg-gray-100 px-1 rounded">
                          {match.match}
                        </code>
                      </Box>
                      <Box>
                        <strong>Position:</strong> {match.index} -{" "}
                        {match.index + match.match.length - 1}
                      </Box>
                      {match.groups && match.groups.length > 0 && (
                        <Box className="md:col-span-2">
                          <strong>Groups:</strong>{" "}
                          {match.groups.map((group, i) => (
                            <code
                              key={i}
                              className="bg-gray-100 px-1 rounded mr-2"
                            >
                              ${i + 1}: {group || "undefined"}
                            </code>
                          ))}
                        </Box>
                      )}
                      {match.namedGroups &&
                        Object.keys(match.namedGroups).length > 0 && (
                          <Box className="md:col-span-2">
                            <strong>Named Groups:</strong>{" "}
                            {Object.entries(match.namedGroups).map(
                              ([name, value]) => (
                                <code
                                  key={name}
                                  className="bg-gray-100 px-1 rounded mr-2"
                                >
                                  {name}: {value}
                                </code>
                              )
                            )}
                          </Box>
                        )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>

      {/* Quick Reference */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" className="font-semibold">
            Quick Regex Reference
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Box>
              <Typography variant="subtitle2" className="font-semibold mb-2">
                Common Patterns
              </Typography>
              <Box className="space-y-1">
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">.</code> Any
                  character
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">*</code> 0 or
                  more
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">+</code> 1 or
                  more
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">?</code> 0 or
                  1
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">^</code> Start
                  of line
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">$</code> End
                  of line
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle2" className="font-semibold mb-2">
                Character Classes
              </Typography>
              <Box className="space-y-1">
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">\d</code>{" "}
                  Digit (0-9)
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">\w</code> Word
                  character
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">\s</code>{" "}
                  Whitespace
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">[a-z]</code>{" "}
                  Lowercase letters
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">[0-9]</code>{" "}
                  Numbers
                </Box>
                <Box>
                  <code className="bg-gray-100 px-1 rounded mr-2">
                    [A-Za-z]
                  </code>{" "}
                  All letters
                </Box>
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
