"use client";

import { useEffect, useState } from "react";
import { SnackBarWithPosition } from "../lib/snackBar";
import { Checkbox, TextField, Typography } from "@mui/material";
import passwordGenerator from "generate-password-ts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ButtonWithHandler } from "../lib/buttons";
import LoopIcon from "@mui/icons-material/Loop";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@/util/commonUtils";
import DownloadIcon from "@mui/icons-material/Download";
import { isEmpty, map } from "lodash-es";

export default function PasswordGenerator() {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const snackBarMessage = "Password copied to clipboard!";

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [excludedCharacters, setExcludedCharacters] = useState<string>("~");
  const [isNumbersIncluded, setIsNumbersIncluded] = useState<boolean>(true);
  const [isSymbolsIncluded, setIsSymbolsIncluded] = useState<boolean>(true);
  const [isLowercaseIncluded, setIsLowercaseIncluded] = useState<boolean>(true);
  const [isUppercaseIncluded, setIsUppercaseIncluded] = useState<boolean>(true);
  const [isPasswordEncrypted, setIsPasswordEncrypted] = useState<boolean>(true);

  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [bulkPasswordsCount, setBulkPasswordsCount] = useState<number>(5);

  const generateRandomPassword = ({
    passwordLength,
    isNumbersIncluded,
    isSymbolsIncluded,
    isLowercaseIncluded,
    isUppercaseIncluded,
    excludedCharacters,
  }: Readonly<{
    passwordLength: number;
    isNumbersIncluded: boolean;
    isSymbolsIncluded: boolean;
    isLowercaseIncluded: boolean;
    isUppercaseIncluded: boolean;
    excludedCharacters: string;
  }>) => {
    return passwordGenerator.generate({
      length: passwordLength,
      numbers: isNumbersIncluded,
      symbols: isSymbolsIncluded,
      lowercase: isLowercaseIncluded,
      uppercase: isUppercaseIncluded,
      excludeSimilarCharacters: true,
      exclude: excludedCharacters,
    });
  };

  const [password, setPassword] = useState<string>(
    generateRandomPassword({
      passwordLength,
      isNumbersIncluded,
      isSymbolsIncluded,
      isLowercaseIncluded,
      isUppercaseIncluded,
      excludedCharacters,
    })
  );

  const encryptPassword = (password: string) => {
    return password
      .split("")
      .map((character, index) => {
        if (index === 0 || index === 1 || index === 2) {
          return character;
        }
        return "*";
      })
      .reduce((a, b) => a + b);
  };

  useEffect(() => {
    setPassword(
      generateRandomPassword({
        passwordLength,
        isNumbersIncluded,
        isSymbolsIncluded,
        isLowercaseIncluded,
        isUppercaseIncluded,
        excludedCharacters,
      })
    );
  }, [
    passwordLength,
    isNumbersIncluded,
    isSymbolsIncluded,
    isLowercaseIncluded,
    isUppercaseIncluded,
    excludedCharacters,
  ]);

  const onCopyHandler = () => {
    copyToClipboard(password);
    setIsSnackBarOpen(true);
  };

  const generateNewPassword = () => {
    setPassword(
      generateRandomPassword({
        passwordLength,
        isNumbersIncluded,
        isSymbolsIncluded,
        isLowercaseIncluded,
        isUppercaseIncluded,
        excludedCharacters,
      })
    );
  };

  const downloadPasswords = () => {
    const element = document.createElement("a");
    const file = new Blob([bulkPasswords.join("\n")], {
      type: "plain/text",
    });
    element.href = URL.createObjectURL(file);
    element.download = "bulk-passwords-webtoolseasy.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element); // Remove the element after download
  };

  return (
    <div className="flex flex-col gap-3 items-center md:border-2 md:rounded-md md:p-4">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <Typography variant="h5" color="textSecondary" className="text-center">
        Your Random Secure Password
      </Typography>
      <div className="flex flex-row gap-2 items-center">
        <Typography color="secondary" className="text-center" variant="h4">
          {isPasswordEncrypted ? encryptPassword(password) : password}
        </Typography>
        {isPasswordEncrypted && (
          <VisibilityIcon
            onClick={() => setIsPasswordEncrypted(false)}
            color="primary"
          />
        )}
        {!isPasswordEncrypted && (
          <VisibilityOffIcon
            onClick={() => setIsPasswordEncrypted(true)}
            color="primary"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 w-full md:flex-row md:justify-center md:items-center">
        <ButtonWithHandler
          buttonText="Copy Password"
          startIcon={<ContentCopyIcon />}
          size="small"
          variant="outlined"
          onClick={onCopyHandler}
        />
        <ButtonWithHandler
          buttonText="Generate New Password"
          startIcon={<LoopIcon />}
          size="small"
          variant="outlined"
          onClick={generateNewPassword}
        />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Typography variant="h6" color="textSecondary" className="text-center">
          Password Generator Options
        </Typography>
        <div className="flex flex-col gap-3 w-full items-center md:flex-row md:justify-center">
          <TextField
            label="Password Length"
            variant="outlined"
            required={true}
            value={passwordLength}
            onChange={(event) => setPasswordLength(Number(event.target.value))}
            size="small"
          />
          <TextField
            label="Excluded Characters"
            variant="outlined"
            required={true}
            value={excludedCharacters}
            onChange={(event) => setExcludedCharacters(event.target.value)}
            size="small"
          />
          <div className="flex flex-col gap-3 w-fit md:flex-row">
            <div className="flex flex-row items-center">
              <Checkbox
                checked={isNumbersIncluded}
                onChange={(e) => setIsNumbersIncluded(e.target.checked)}
              />
              <Typography variant="body2" color="textPrimary">
                Numbers
              </Typography>
            </div>
            <div className="flex flex-row items-center">
              <Checkbox
                checked={isSymbolsIncluded}
                onChange={(e) => setIsSymbolsIncluded(e.target.checked)}
              />
              <Typography variant="body2" color="textPrimary">
                Symbols
              </Typography>
            </div>
            <div className="flex flex-row items-center">
              <Checkbox
                checked={isUppercaseIncluded}
                onChange={(e) => setIsUppercaseIncluded(e.target.checked)}
              />
              <Typography variant="body2" color="textPrimary">
                Uppercase
              </Typography>
            </div>
            <div className="flex flex-row items-center">
              <Checkbox
                checked={isLowercaseIncluded}
                onChange={(e) => setIsLowercaseIncluded(e.target.checked)}
              />
              <Typography variant="body2" color="textPrimary">
                Lowercase
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4 w-full md:w-fit">
        <Typography variant="h6" color="textSecondary" className="text-center">
          Bulk Password Generator
        </Typography>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
          <TextField
            label="Enter Passwords count"
            variant="outlined"
            required={true}
            value={bulkPasswordsCount}
            onChange={(event) =>
              setBulkPasswordsCount(Number(event.target.value))
            }
            size="small"
          />
          <ButtonWithHandler
            buttonText="Generate Bulk Passwords"
            onClick={() => {
              const uuids = Array.from({ length: bulkPasswordsCount }, () =>
                generateRandomPassword({
                  passwordLength,
                  isNumbersIncluded,
                  isSymbolsIncluded,
                  isLowercaseIncluded,
                  isUppercaseIncluded,
                  excludedCharacters,
                })
              );
              setBulkPasswords(uuids);
            }}
            startIcon={<LoopIcon />}
          />
        </div>

        {!isEmpty(bulkPasswords) && (
          <div className="flex flex-col gap-2 w-full items-center overflow-y-auto max-h-[20rem] md:border-2 md:rounded-md md:p-4">
            {map(bulkPasswords, (password) => {
              return (
                <Typography variant="caption" color="textSecondary">
                  {password}
                </Typography>
              );
            })}
          </div>
        )}

        <ButtonWithHandler
          buttonText="Download bulk passwords to file"
          variant="outlined"
          onClick={downloadPasswords}
          startIcon={<DownloadIcon />}
        />
      </div>
    </div>
  );
}
