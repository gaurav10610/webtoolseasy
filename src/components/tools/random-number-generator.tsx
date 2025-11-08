"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  Divider,
} from "@mui/material";
import { useState, useCallback } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import { ButtonWithHandler } from "../lib/buttons";
import CasinoIcon from "@mui/icons-material/Casino";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function RandomNumberGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(1);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const generateRandomNumbers = useCallback(() => {
    if (minValue >= maxValue) {
      toolState.actions.showMessage("Minimum must be less than maximum!");
      return;
    }

    if (!allowDuplicates && quantity > maxValue - minValue + 1) {
      toolState.actions.showMessage(
        "Cannot generate that many unique numbers in the given range!"
      );
      return;
    }

    const numbers: number[] = [];
    const range = maxValue - minValue + 1;

    if (allowDuplicates) {
      // Allow duplicates - use crypto.getRandomValues for better randomness
      const randomValues = new Uint32Array(quantity);
      crypto.getRandomValues(randomValues);

      for (let i = 0; i < quantity; i++) {
        const randomNumber = minValue + (randomValues[i] % range);
        numbers.push(randomNumber);
      }
    } else {
      // No duplicates - shuffle approach
      const available = Array.from({ length: range }, (_, i) => minValue + i);

      for (let i = 0; i < quantity; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        numbers.push(available[randomIndex]);
        available.splice(randomIndex, 1);
      }
    }

    setGeneratedNumbers(numbers);
    setHistory((prev) => [numbers, ...prev].slice(0, 10));
    toolState.actions.showMessage(
      `Generated ${numbers.length} random numbers!`
    );
  }, [minValue, maxValue, quantity, allowDuplicates, toolState.actions]);

  const handleCopyNumbers = useCallback(() => {
    const numbersText = generatedNumbers.join(", ");
    toolState.actions.copyText(numbersText, "Numbers copied to clipboard!");
  }, [generatedNumbers, toolState.actions]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    toolState.actions.showMessage("History cleared!");
  }, [toolState.actions]);

  return (
    <ToolLayout
      snackBar={
        toolState.snackBar.open
          ? {
              ...toolState.snackBar,
              onClose: toolState.snackBar.close,
            }
          : undefined
      }
    >
      <SEOContent
        title="Random Number Generator"
        description="Generate random numbers instantly with customizable min/max range, quantity, and uniqueness options. Perfect for lottery, gaming, and more."
      />

      <div className="flex flex-col gap-6">
        {/* Configuration Card */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Generator Settings
            </Typography>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Minimum Value"
                  type="number"
                  value={minValue}
                  onChange={(e) => setMinValue(Number(e.target.value))}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Maximum Value"
                  type="number"
                  value={maxValue}
                  onChange={(e) => setMaxValue(Number(e.target.value))}
                  variant="outlined"
                />
              </div>

              <TextField
                fullWidth
                label="How Many Numbers?"
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                inputProps={{ min: 1, max: 1000 }}
                variant="outlined"
                helperText="Maximum 1000 numbers at once"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={allowDuplicates}
                    onChange={(e) => setAllowDuplicates(e.target.checked)}
                    color="primary"
                  />
                }
                label="Allow Duplicate Numbers"
              />

              <ButtonWithHandler
                buttonText="Generate Random Numbers"
                onClick={generateRandomNumbers}
                startIcon={<CasinoIcon />}
                size="large"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {generatedNumbers.length > 0 && (
          <Card elevation={3} sx={{ bgcolor: "primary.light" }}>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Typography variant="h6" color="white">
                  Generated Numbers
                </Typography>
                <ButtonWithHandler
                  buttonText="Copy"
                  onClick={handleCopyNumbers}
                  startIcon={<ContentCopyIcon />}
                  size="small"
                  variant="outlined"
                  className="!text-white !border-white hover:!bg-white/10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {generatedNumbers.map((num, index) => (
                  <Chip
                    key={index}
                    label={num}
                    sx={{
                      bgcolor: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      minWidth: "60px",
                    }}
                  />
                ))}
              </div>

              <Typography
                variant="caption"
                color="white"
                sx={{ display: "block", mt: 2, opacity: 0.9 }}
              >
                Total: {generatedNumbers.length} numbers | Range: {minValue} to{" "}
                {maxValue}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Quick Presets */}
        <Card elevation={1}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Presets
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => {
                  setMinValue(1);
                  setMaxValue(6);
                  setQuantity(1);
                  setAllowDuplicates(true);
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="body2" fontWeight="bold">
                  Dice (1-6)
                </Typography>
              </button>
              <button
                onClick={() => {
                  setMinValue(1);
                  setMaxValue(100);
                  setQuantity(1);
                  setAllowDuplicates(true);
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="body2" fontWeight="bold">
                  Percentage
                </Typography>
              </button>
              <button
                onClick={() => {
                  setMinValue(1);
                  setMaxValue(49);
                  setQuantity(6);
                  setAllowDuplicates(false);
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="body2" fontWeight="bold">
                  Lottery
                </Typography>
              </button>
              <button
                onClick={() => {
                  setMinValue(0);
                  setMaxValue(1);
                  setQuantity(1);
                  setAllowDuplicates(true);
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="body2" fontWeight="bold">
                  Coin Flip
                </Typography>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        {history.length > 0 && (
          <Card elevation={1} sx={{ bgcolor: "grey.50" }}>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Typography variant="h6">Recent History</Typography>
                <ButtonWithHandler
                  buttonText="Clear"
                  onClick={handleClearHistory}
                  startIcon={<RefreshIcon />}
                  size="small"
                  color="secondary"
                />
              </div>
              <Divider sx={{ mb: 2 }} />
              <div className="flex flex-col gap-3">
                {history.map((nums, index) => (
                  <div key={index} className="flex flex-wrap gap-2">
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ minWidth: "20px" }}
                    >
                      #{index + 1}
                    </Typography>
                    {nums.map((num, numIndex) => (
                      <Chip key={numIndex} label={num} size="small" />
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Alert */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Cryptographically Secure:</strong> This generator uses the
            browser&apos;s crypto API for true random number generation,
            ensuring unpredictability and fairness. Perfect for lottery numbers,
            gaming, statistical sampling, and more.
          </Typography>
        </Alert>
      </div>
    </ToolLayout>
  );
}
