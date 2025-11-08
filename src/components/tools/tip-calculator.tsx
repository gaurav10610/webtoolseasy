"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Alert,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from "@mui/material";
import { useState, useCallback } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import { ButtonWithHandler } from "../lib/buttons";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";

interface TipResult {
  billAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalWithTip: number;
  perPersonAmount: number;
  perPersonTip: number;
}

export default function TipCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [billAmount, setBillAmount] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [numberOfPeople, setNumberOfPeople] = useState<string>("1");
  const [customTip, setCustomTip] = useState<string>("");
  const [result, setResult] = useState<TipResult | null>(null);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateTip = useCallback(() => {
    const bill = parseFloat(billAmount);
    const people = parseInt(numberOfPeople);

    if (isNaN(bill) || bill <= 0) {
      toolState.actions.showMessage("Please enter a valid bill amount!");
      return;
    }

    if (isNaN(people) || people < 1) {
      toolState.actions.showMessage("Please enter a valid number of people!");
      return;
    }

    const tip = (bill * tipPercentage) / 100;
    const total = bill + tip;
    const perPerson = total / people;
    const perPersonTipAmount = tip / people;

    setResult({
      billAmount: bill,
      tipPercentage,
      tipAmount: tip,
      totalWithTip: total,
      perPersonAmount: perPerson,
      perPersonTip: perPersonTipAmount,
    });

    toolState.actions.showMessage("Tip calculated successfully!");
  }, [billAmount, tipPercentage, numberOfPeople, toolState.actions]);

  const handleTipChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newTip: number | null) => {
      if (newTip !== null) {
        setTipPercentage(newTip);
        setCustomTip("");
      }
    },
    []
  );

  const handleCustomTipChange = useCallback((value: string) => {
    const customValue = parseFloat(value);
    if (!isNaN(customValue) && customValue >= 0 && customValue <= 100) {
      setTipPercentage(customValue);
      setCustomTip(value);
    } else {
      setCustomTip(value);
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const clearCalculation = useCallback(() => {
    setBillAmount("");
    setTipPercentage(15);
    setNumberOfPeople("1");
    setCustomTip("");
    setResult(null);
  }, []);

  const getServiceQuality = (percentage: number): string => {
    if (percentage < 10) return "Below Standard";
    if (percentage < 15) return "Basic Service";
    if (percentage < 18) return "Good Service";
    if (percentage < 22) return "Great Service";
    return "Excellent Service";
  };

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
        title="Tip Calculator"
        description="Calculate tips and split bills easily. Choose tip percentage, see total with tip, and divide costs among multiple people."
      />

      <div className="flex flex-col gap-6">
        {/* Input Card */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Bill Details
            </Typography>

            <div className="flex flex-col gap-4">
              <TextField
                fullWidth
                label="Bill Amount"
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                inputProps={{ min: 0, step: 0.01 }}
                variant="outlined"
                helperText="Enter the total bill amount before tip"
              />

              <div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Tip Percentage
                </Typography>
                <ToggleButtonGroup
                  value={customTip ? null : tipPercentage}
                  exclusive
                  onChange={handleTipChange}
                  aria-label="tip percentage"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <ToggleButton value={10}>10%</ToggleButton>
                  <ToggleButton value={15}>15%</ToggleButton>
                  <ToggleButton value={18}>18%</ToggleButton>
                  <ToggleButton value={20}>20%</ToggleButton>
                  <ToggleButton value={25}>25%</ToggleButton>
                </ToggleButtonGroup>

                <TextField
                  fullWidth
                  label="Custom Tip Percentage"
                  type="number"
                  value={customTip}
                  onChange={(e) => handleCustomTipChange(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 0, max: 100, step: 0.1 }}
                  variant="outlined"
                  size="small"
                  helperText="Or enter a custom percentage"
                />
              </div>

              <TextField
                fullWidth
                label="Number of People"
                type="number"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PeopleIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ min: 1, max: 100 }}
                variant="outlined"
                helperText="How many people are splitting the bill?"
              />

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Typography variant="body2" color="text.secondary">
                  Service Quality:
                </Typography>
                <Chip
                  label={getServiceQuality(tipPercentage)}
                  color={tipPercentage >= 18 ? "success" : "default"}
                  size="small"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ButtonWithHandler
                  buttonText="Calculate Tip"
                  onClick={calculateTip}
                  startIcon={<RestaurantIcon />}
                  size="large"
                />
                <ButtonWithHandler
                  buttonText="Clear"
                  onClick={clearCalculation}
                  size="large"
                  variant="outlined"
                  color="secondary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card elevation={3} sx={{ bgcolor: "primary.light" }}>
            <CardContent>
              <Typography
                variant="h6"
                color="white"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Tip Calculation Results
              </Typography>

              {/* Main Result - Total with Tip */}
              <div className="bg-white p-6 rounded-lg mb-4 text-center">
                <Typography variant="caption" color="text.secondary">
                  Total Bill (Including Tip)
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="primary"
                  sx={{ my: 1 }}
                >
                  {formatCurrency(result.totalWithTip)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {result.tipPercentage}% tip applied
                </Typography>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-white p-3 rounded-lg">
                  <Typography variant="caption" color="text.secondary">
                    Bill Amount
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(result.billAmount)}
                  </Typography>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <Typography variant="caption" color="text.secondary">
                    Tip Amount
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="success.main"
                  >
                    {formatCurrency(result.tipAmount)}
                  </Typography>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <Typography variant="caption" color="text.secondary">
                    Tip Percentage
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {result.tipPercentage.toFixed(1)}%
                  </Typography>
                </div>
              </div>

              {/* Per Person Breakdown */}
              {parseInt(numberOfPeople) > 1 && (
                <>
                  <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)" }} />
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                  >
                    Per Person Split ({numberOfPeople} people)
                  </Typography>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <Typography variant="caption" color="text.secondary">
                        Each Person Pays
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="primary"
                      >
                        {formatCurrency(result.perPersonAmount)}
                      </Typography>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <Typography variant="caption" color="text.secondary">
                        Tip Per Person
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="success.main"
                      >
                        {formatCurrency(result.perPersonTip)}
                      </Typography>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Scenarios */}
        <Card elevation={1}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Tip Scenarios
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => {
                  setBillAmount("50");
                  setTipPercentage(15);
                  setNumberOfPeople("1");
                  setCustomTip("");
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="caption" color="text.secondary">
                  Lunch Solo
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  $50 / 15%
                </Typography>
              </button>
              <button
                onClick={() => {
                  setBillAmount("100");
                  setTipPercentage(20);
                  setNumberOfPeople("2");
                  setCustomTip("");
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="caption" color="text.secondary">
                  Dinner for 2
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  $100 / 20%
                </Typography>
              </button>
              <button
                onClick={() => {
                  setBillAmount("200");
                  setTipPercentage(18);
                  setNumberOfPeople("4");
                  setCustomTip("");
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="caption" color="text.secondary">
                  Group Dinner
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  $200 / 18%
                </Typography>
              </button>
              <button
                onClick={() => {
                  setBillAmount("25");
                  setTipPercentage(15);
                  setNumberOfPeople("1");
                  setCustomTip("");
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="caption" color="text.secondary">
                  Delivery
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  $25 / 15%
                </Typography>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Info Alerts */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Tipping Guidelines:</strong> 15-20% is standard for good
            restaurant service. Consider 20-25% for excellent service, large
            groups, or complex orders. Always tip based on pre-discount amounts
            when using coupons.
          </Typography>
        </Alert>

        <Alert severity="success">
          <Typography variant="body2">
            <strong>Bill Splitting:</strong> This calculator automatically
            divides the total (including tip) evenly among all people. Each
            person pays their fair share of both the bill and the gratuity.
          </Typography>
        </Alert>
      </div>
    </ToolLayout>
  );
}
