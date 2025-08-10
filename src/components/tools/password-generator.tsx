"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Checkbox, TextField, Typography } from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { ButtonWithHandler } from "../lib/buttons";
import passwordGenerator from "generate-password-ts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoopIcon from "@mui/icons-material/Loop";
import DownloadIcon from "@mui/icons-material/Download";
import { isEmpty, map } from "lodash-es";

interface PasswordOptions {
  passwordLength: number;
  isNumbersIncluded: boolean;
  isSymbolsIncluded: boolean;
  isLowercaseIncluded: boolean;
  isUppercaseIncluded: boolean;
  excludedCharacters: string;
}

export default function PasswordGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  // Password generation options
  const [options, setOptions] = useState<PasswordOptions>({
    passwordLength: 12,
    isNumbersIncluded: true,
    isSymbolsIncluded: true,
    isLowercaseIncluded: true,
    isUppercaseIncluded: true,
    excludedCharacters: "~",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [bulkPasswordsCount, setBulkPasswordsCount] = useState<number>(5);

  const generateRandomPassword = useCallback((opts: PasswordOptions) => {
    return passwordGenerator.generate({
      length: opts.passwordLength,
      numbers: opts.isNumbersIncluded,
      symbols: opts.isSymbolsIncluded,
      lowercase: opts.isLowercaseIncluded,
      uppercase: opts.isUppercaseIncluded,
      excludeSimilarCharacters: true,
      exclude: opts.excludedCharacters,
    });
  }, []);

  const generateInitialPassword = () => generateRandomPassword(options);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: generateInitialPassword(),
  });

  const encryptPassword = useCallback((password: string) => {
    return password
      .split("")
      .map((character, index) => (index < 3 ? character : "*"))
      .join("");
  }, []);

  // Regenerate password when options change
  useEffect(() => {
    const newPassword = generateRandomPassword(options);
    toolState.setCode(newPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]); // toolState.setCode is stable, generateRandomPassword is recreated but with same logic

  const generateNewPassword = useCallback(() => {
    const newPassword = generateRandomPassword(options);
    toolState.setCode(newPassword);
    toolState.actions.showMessage("New password generated!");
  }, [generateRandomPassword, options, toolState]);

  const copyPassword = useCallback(() => {
    toolState.actions.copyText(toolState.code, "Password copied!");
  }, [toolState]);

  const generateBulkPasswords = useCallback(() => {
    const passwords = Array.from({ length: bulkPasswordsCount }, () =>
      generateRandomPassword(options)
    );
    setBulkPasswords(passwords);
    toolState.actions.showMessage(`Generated ${bulkPasswordsCount} passwords!`);
  }, [bulkPasswordsCount, generateRandomPassword, options, toolState.actions]);

  const downloadPasswords = useCallback(() => {
    const element = document.createElement("a");
    const file = new Blob([bulkPasswords.join("\n")], { type: "plain/text" });
    element.href = URL.createObjectURL(file);
    element.download = "bulk-passwords-webtoolseasy.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toolState.actions.showMessage("Passwords downloaded!");
  }, [bulkPasswords, toolState.actions]);

  const updateOption = useCallback(
    (key: keyof PasswordOptions, value: string | number | boolean) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: copyPassword,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [copyPassword, toolState]
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
        title="Password Generator"
        description="Free secure password generator. Generate strong passwords with customizable options and bulk generation."
        exampleCode="Generate"
        exampleOutput="A#9mK$pL2@vX"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="flex flex-col gap-4 w-full">
        {/* Password Display */}
        <div className="flex flex-col gap-3 items-center p-4 border-2 rounded-md">
          <Typography variant="h6" color="textSecondary">
            Your Secure Password
          </Typography>
          <div className="flex flex-row gap-2 items-center">
            <Typography
              color="secondary"
              className="text-center break-all"
              variant="h5"
            >
              {isPasswordVisible
                ? toolState.code
                : encryptPassword(toolState.code)}
            </Typography>
            <div
              className="cursor-pointer"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <VisibilityOffIcon color="primary" />
              ) : (
                <VisibilityIcon color="primary" />
              )}
            </div>
          </div>
          <ButtonWithHandler
            buttonText="Generate New Password"
            startIcon={<LoopIcon />}
            size="small"
            variant="outlined"
            onClick={generateNewPassword}
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 p-4 border rounded-md">
          <Typography variant="h6" color="textSecondary">
            Password Options
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Password Length"
              type="number"
              size="small"
              value={options.passwordLength}
              onChange={(e) =>
                updateOption("passwordLength", Number(e.target.value))
              }
              inputProps={{ min: 4, max: 128 }}
            />
            <TextField
              label="Excluded Characters"
              size="small"
              value={options.excludedCharacters}
              onChange={(e) =>
                updateOption("excludedCharacters", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { key: "isNumbersIncluded", label: "Numbers" },
              { key: "isSymbolsIncluded", label: "Symbols" },
              { key: "isUppercaseIncluded", label: "Uppercase" },
              { key: "isLowercaseIncluded", label: "Lowercase" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center">
                <Checkbox
                  checked={options[key as keyof PasswordOptions] as boolean}
                  onChange={(e) =>
                    updateOption(key as keyof PasswordOptions, e.target.checked)
                  }
                />
                <Typography variant="body2">{label}</Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Bulk Generation */}
        <div className="flex flex-col gap-3 p-4 border rounded-md">
          <Typography variant="h6" color="textSecondary">
            Bulk Password Generator
          </Typography>
          <div className="flex flex-col md:flex-row gap-2 items-end">
            <TextField
              label="Count"
              type="number"
              size="small"
              value={bulkPasswordsCount}
              onChange={(e) => setBulkPasswordsCount(Number(e.target.value))}
              inputProps={{ min: 1, max: 100 }}
            />
            <div className="flex gap-2">
              <ButtonWithHandler
                buttonText="Generate Bulk"
                onClick={generateBulkPasswords}
                startIcon={<LoopIcon />}
              />
              {!isEmpty(bulkPasswords) && (
                <ButtonWithHandler
                  buttonText="Download Passwords"
                  variant="outlined"
                  onClick={downloadPasswords}
                  startIcon={<DownloadIcon />}
                />
              )}
            </div>
          </div>

          {!isEmpty(bulkPasswords) && (
            <div className="max-h-60 overflow-y-auto p-2 border rounded bg-gray-50">
              {map(bulkPasswords, (password, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  className="block break-all"
                >
                  {password}
                </Typography>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
