"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface ROICalculation {
  roiPercentage: number;
  profit: number;
  annualizedROI: number | null;
  isProfit: boolean;
}

export default function ROICalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(125000);
  const [investmentPeriodYears, setInvestmentPeriodYears] = useState<number>(2);
  const [calculateAnnualized, setCalculateAnnualized] = useState<boolean>(true);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateROI = useCallback(
    (
      initial: number,
      final: number,
      years: number,
      includeAnnualized: boolean
    ): ROICalculation => {
      const profit = final - initial;
      const roiPercentage = (profit / initial) * 100;

      let annualizedROI = null;
      if (includeAnnualized && years > 0) {
        // Annualized ROI = ((Final Value / Initial Investment)^(1/years) - 1) × 100
        annualizedROI = (Math.pow(final / initial, 1 / years) - 1) * 100;
      }

      return {
        roiPercentage,
        profit,
        annualizedROI,
        isProfit: profit >= 0,
      };
    },
    []
  );

  const roiResults = useMemo(
    () =>
      calculateROI(
        initialInvestment,
        finalValue,
        investmentPeriodYears,
        calculateAnnualized
      ),
    [
      initialInvestment,
      finalValue,
      investmentPeriodYears,
      calculateAnnualized,
      calculateROI,
    ]
  );

  const handleInitialInvestmentChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0) {
        setInitialInvestment(value);
      }
    },
    []
  );

  const handleFinalValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0) {
        setFinalValue(value);
      }
    },
    []
  );

  const handleInvestmentPeriodChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value > 0) {
        setInvestmentPeriodYears(value);
        setCalculateAnnualized(true);
      } else {
        setCalculateAnnualized(false);
      }
    },
    []
  );

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getROIColor = (
    roi: number
  ): "success" | "info" | "default" | "error" => {
    if (roi > 15) return "success";
    if (roi > 0) return "info";
    if (roi === 0) return "default";
    return "error";
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
        title="ROI Calculator - Return on Investment"
        description="Calculate return on investment (ROI) instantly. Measure investment performance, profitability, and annual returns with our free ROI calculator."
      />

      <div className="flex flex-col gap-6">
        {/* Input Section */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Investment Details
            </Typography>

            <div className="flex flex-col gap-4">
              <TextField
                fullWidth
                label="Initial Investment (₹)"
                type="number"
                value={initialInvestment}
                onChange={handleInitialInvestmentChange}
                inputProps={{ min: 0, step: 1000 }}
                variant="outlined"
                helperText="Amount you invested initially"
              />

              <TextField
                fullWidth
                label="Final Value (₹)"
                type="number"
                value={finalValue}
                onChange={handleFinalValueChange}
                inputProps={{ min: 0, step: 1000 }}
                variant="outlined"
                helperText="Current or final value of your investment"
              />

              <TextField
                fullWidth
                label="Investment Period (Years)"
                type="number"
                value={investmentPeriodYears}
                onChange={handleInvestmentPeriodChange}
                inputProps={{ min: 0, step: 0.5 }}
                variant="outlined"
                helperText="Optional: For annualized return calculation (leave 0 to skip)"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card
          elevation={3}
          sx={{
            bgcolor: roiResults.isProfit ? "success.main" : "error.main",
            color: "white",
          }}
        >
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <Typography variant="h6">ROI Results</Typography>
              {roiResults.isProfit ? (
                <TrendingUpIcon fontSize="large" />
              ) : (
                <TrendingDownIcon fontSize="large" />
              )}
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Return on Investment
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {roiResults.roiPercentage.toFixed(2)}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {roiResults.isProfit ? "Profit" : "Loss"}:{" "}
                {formatCurrency(Math.abs(roiResults.profit))}
              </Typography>
            </div>

            <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.3)" }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <div className="flex flex-col gap-1">
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Initial Investment
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(initialInvestment)}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className="flex flex-col gap-1">
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Final Value
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(finalValue)}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className="flex flex-col gap-1">
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {roiResults.isProfit ? "Gain" : "Loss"}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(Math.abs(roiResults.profit))}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            {roiResults.annualizedROI !== null && (
              <>
                <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.3)" }} />
                <div className="flex flex-col gap-1">
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Annualized ROI
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {roiResults.annualizedROI.toFixed(2)}% per year
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Average yearly return over {investmentPeriodYears} years
                  </Typography>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Performance Indicator */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Performance Assessment
            </Typography>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Typography variant="body2">ROI Category:</Typography>
                <Chip
                  label={
                    roiResults.roiPercentage > 15
                      ? "Excellent"
                      : roiResults.roiPercentage > 10
                      ? "Good"
                      : roiResults.roiPercentage > 5
                      ? "Average"
                      : roiResults.roiPercentage > 0
                      ? "Below Average"
                      : roiResults.roiPercentage === 0
                      ? "No Change"
                      : "Loss"
                  }
                  color={getROIColor(roiResults.roiPercentage)}
                  size="medium"
                />
              </div>

              <Divider />

              <div className="flex flex-col gap-2">
                <Typography variant="body2" color="text.secondary">
                  <strong>Investment Performance:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {roiResults.roiPercentage > 12
                    ? "Your investment has performed excellently, exceeding typical market returns."
                    : roiResults.roiPercentage > 7
                    ? "Your investment shows good performance, meeting market expectations."
                    : roiResults.roiPercentage > 0
                    ? "Your investment has generated positive returns but below typical market average."
                    : roiResults.roiPercentage === 0
                    ? "Your investment value hasn't changed. Consider reviewing your strategy."
                    : "Your investment has declined. Consider reviewing your portfolio and risk management strategy."}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card elevation={1} sx={{ bgcolor: "info.light" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <strong>Note:</strong> ROI is a simple measure of investment
              profitability. It doesn&apos;t account for factors like time value
              of money, inflation, taxes, or fees. For comprehensive investment
              analysis, consider using additional metrics like IRR (Internal
              Rate of Return) and risk-adjusted returns. Past performance
              doesn&apos;t guarantee future results.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
