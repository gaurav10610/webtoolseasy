"use client";

import { useState, useCallback, useMemo } from "react";
import { TextField, Typography, Chip, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

interface RegexMatch {
  match: string;
  index: number;
  groups?: string[];
}

export default function RegexTester({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialRegex = "\\b\\w+@\\w+\\.\\w+\\b";
  const initialText = `Contact us at support@example.com or sales@company.org
You can also reach admin@website.net for technical issues.
Invalid emails: notanemail, @missing.com, test@`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: initialRegex,
  });

  const [testText, setTestText] = useState(initialText);
  const [flags, setFlags] = useState("g");
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [isValidRegex, setIsValidRegex] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const testRegex = useCallback(() => {
    try {
      if (!toolState.code.trim()) {
        setMatches([]);
        setIsValidRegex(true);
        setErrorMessage("");
        return;
      }

      const regex = new RegExp(toolState.code, flags);
      const foundMatches: RegexMatch[] = [];
      let match;

      if (flags.includes("g")) {
        // Global search
        while ((match = regex.exec(testText)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          // Prevent infinite loop
          if (match.index === regex.lastIndex) {
            break;
          }
        }
      } else {
        // Single match
        match = regex.exec(testText);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(foundMatches);
      setIsValidRegex(true);
      setErrorMessage("");
      toolState.actions.showMessage(`Found ${foundMatches.length} matches`);
    } catch (error) {
      setIsValidRegex(false);
      setErrorMessage(error instanceof Error ? error.message : "Invalid regex");
      setMatches([]);
      toolState.actions.showMessage("Invalid regular expression");
    }
  }, [toolState.code, testText, flags, toolState.actions]);

  // Auto-test when regex or text changes
  const handleRegexChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
      setTimeout(testRegex, 100);
    },
    [toolState, testRegex]
  );

  const handleTextChange = useCallback(
    (value: string) => {
      setTestText(value);
      setTimeout(testRegex, 100);
    },
    [testRegex]
  );

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Test Regex",
        onClick: testRegex,
        icon: <SearchIcon />,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "Regex pattern copied to clipboard!"
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [testRegex, toolState]
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
        title="Regex Tester"
        description="Free online regular expression tester and debugger. Test and debug your regex patterns with real-time matching."
        exampleCode={initialRegex}
        exampleOutput={`Found 3 matches: support@example.com, sales@company.org, admin@website.net`}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Panel - Regex Input */}
        <div className="space-y-4">
          <div>
            <Typography variant="h6" className="mb-2">
              Regular Expression
            </Typography>
            <TextField
              fullWidth
              value={toolState.code}
              onChange={(e) => handleRegexChange(e.target.value)}
              placeholder="Enter your regex pattern"
              multiline
              rows={3}
              error={!isValidRegex}
              helperText={
                !isValidRegex ? errorMessage : "Enter a valid regex pattern"
              }
            />
          </div>

          <div>
            <Typography variant="h6" className="mb-2">
              Flags
            </Typography>
            <TextField
              fullWidth
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g, i, m, s, u, y"
              size="small"
              helperText="Common flags: g (global), i (case-insensitive), m (multiline)"
            />
          </div>

          <div>
            <Typography variant="h6" className="mb-2">
              Test Text
            </Typography>
            <TextField
              fullWidth
              value={testText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Enter text to test against your regex"
              multiline
              rows={8}
            />
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="space-y-4">
          <div>
            <Typography variant="h6" className="mb-2">
              Matches ({matches.length})
            </Typography>
            {matches.length === 0 ? (
              <Box className="p-4 bg-gray-50 rounded border text-center">
                <Typography color="textSecondary">No matches found</Typography>
              </Box>
            ) : (
              <div className="space-y-2 max-h-96 overflow-auto">
                {matches.map((match, index) => (
                  <div
                    key={index}
                    className="p-3 bg-green-50 border border-green-200 rounded"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Chip
                        label={`Match ${index + 1}`}
                        size="small"
                        color="primary"
                      />
                      <Typography variant="caption" color="textSecondary">
                        Index: {match.index}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      className="font-mono bg-white p-2 rounded border"
                    >
                      {match.match}
                    </Typography>
                    {match.groups && match.groups.length > 0 && (
                      <div className="mt-2">
                        <Typography variant="caption" color="textSecondary">
                          Groups:
                        </Typography>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.groups.map((group, groupIndex) => (
                            <Chip
                              key={groupIndex}
                              label={group || "(empty)"}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Regex Help */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <Typography variant="subtitle2" className="mb-2">
              Quick Reference:
            </Typography>
            <div className="text-sm space-y-1 text-gray-700">
              <div>
                <code className="bg-white px-1 rounded">.</code> - Any character
              </div>
              <div>
                <code className="bg-white px-1 rounded">*</code> - 0 or more
              </div>
              <div>
                <code className="bg-white px-1 rounded">+</code> - 1 or more
              </div>
              <div>
                <code className="bg-white px-1 rounded">?</code> - 0 or 1
              </div>
              <div>
                <code className="bg-white px-1 rounded">\d</code> - Digit
              </div>
              <div>
                <code className="bg-white px-1 rounded">\w</code> - Word
                character
              </div>
              <div>
                <code className="bg-white px-1 rounded">\s</code> - Whitespace
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
