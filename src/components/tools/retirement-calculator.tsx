"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Alert,
} from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

interface RetirementCalculation {
  totalSavings: number;
  totalContributions: number;
  investmentGrowth: number;
  monthlyIncomeAt4Percent: number;
  yearsUntilRetirement: number;
}

export default function RetirementCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [currentSavings, setCurrentSavings] = useState<number>(500000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(10);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateRetirement = useCallback(
    (
      currentAge: number,
      retirementAge: number,
      currentSavings: number,
      monthlyContribution: number,
      annualReturnRate: number
    ): RetirementCalculation => {
      const yearsUntilRetirement = retirementAge - currentAge;
      const months = yearsUntilRetirement * 12;
      const monthlyRate = annualReturnRate / 12 / 100;

      // Future value of current savings: FV = PV × (1 + r)^n
      const futureValueOfCurrentSavings =
        currentSavings * Math.pow(1 + monthlyRate, months);

      // Future value of monthly contributions (SIP formula)
      let futureValueOfContributions = 0;
      if (monthlyRate === 0) {
        futureValueOfContributions = monthlyContribution * months;
      } else {
        futureValueOfContributions =
          monthlyContribution *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
      }

      const totalSavings =
        futureValueOfCurrentSavings + futureValueOfContributions;
      const totalContributions = currentSavings + monthlyContribution * months;
      const investmentGrowth = totalSavings - totalContributions;

      // Estimate monthly income using 4% withdrawal rule (annual) / 12
      const monthlyIncomeAt4Percent = (totalSavings * 0.04) / 12;

      return {
        totalSavings: Math.round(totalSavings),
        totalContributions: Math.round(totalContributions),
        investmentGrowth: Math.round(investmentGrowth),
        monthlyIncomeAt4Percent: Math.round(monthlyIncomeAt4Percent),
        yearsUntilRetirement,
      };
    },
    []
  );

  const retirementResults = useMemo(
    () =>
      calculateRetirement(
        currentAge,
        retirementAge,
        currentSavings,
        monthlyContribution,
        expectedReturnRate
      ),
    [
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      expectedReturnRate,
      calculateRetirement,
    ]
  );

  const handleCurrentAgeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 18 && value <= 80) {
        setCurrentAge(value);
      }
    },
    []
  );

  const handleRetirementAgeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 40 && value <= 85) {
        setRetirementAge(value);
      }
    },
    []
  );

  const handleCurrentSavingsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0) {
        setCurrentSavings(value);
      }
    },
    []
  );

  const handleMonthlyContributionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0) {
        setMonthlyContribution(value);
      }
    },
    []
  );

  const handleReturnRateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0 && value <= 50) {
        setExpectedReturnRate(value);
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

  const isValidAge = retirementAge > currentAge;

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
        title="Retirement Calculator - Financial Planning Tool"
        description="Plan your retirement with our free calculator. Calculate how much you need to save for a comfortable retirement based on your age, savings, and contributions."
      />

      <div className="flex flex-col gap-6">
        {/* Input Section */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Your Details
            </Typography>

            <div className="flex flex-col gap-4">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Current Age"
                    type="number"
                    value={currentAge}
                    onChange={handleCurrentAgeChange}
                    inputProps={{ min: 18, max: 80 }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Retirement Age"
                    type="number"
                    value={retirementAge}
                    onChange={handleRetirementAgeChange}
                    inputProps={{ min: 40, max: 85 }}
                    variant="outlined"
                    error={!isValidAge}
                    helperText={
                      !isValidAge
                        ? "Retirement age must be greater than current age"
                        : ""
                    }
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Current Retirement Savings (₹)"
                type="number"
                value={currentSavings}
                onChange={handleCurrentSavingsChange}
                inputProps={{ min: 0, step: 10000 }}
                variant="outlined"
                helperText="How much you've already saved"
              />

              <TextField
                fullWidth
                label="Monthly Contribution (₹)"
                type="number"
                value={monthlyContribution}
                onChange={handleMonthlyContributionChange}
                inputProps={{ min: 0, step: 1000 }}
                variant="outlined"
                helperText="How much you'll save each month"
              />

              <TextField
                fullWidth
                label="Expected Annual Return Rate (%)"
                type="number"
                value={expectedReturnRate}
                onChange={handleReturnRateChange}
                inputProps={{ min: 0, max: 50, step: 0.5 }}
                variant="outlined"
                helperText="Typical range: 8-12% for balanced portfolio"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {isValidAge && (
          <>
            <Card
              elevation={3}
              sx={{ bgcolor: "success.main", color: "white" }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Retirement Projection
                </Typography>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Projected Retirement Corpus
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {formatCurrency(retirementResults.totalSavings)}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      At age {retirementAge} (
                      {retirementResults.yearsUntilRetirement} years from now)
                    </Typography>
                  </div>

                  <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)" }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <div className="flex flex-col gap-1">
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Total Contributions
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {formatCurrency(retirementResults.totalContributions)}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className="flex flex-col gap-1">
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Investment Growth
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {formatCurrency(retirementResults.investmentGrowth)}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className="flex flex-col gap-1">
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Estimated Monthly Income
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {formatCurrency(
                            retirementResults.monthlyIncomeAt4Percent
                          )}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Using 4% withdrawal rule
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>

            <Alert severity="info">
              <Typography variant="body2">
                <strong>4% Withdrawal Rule:</strong> This commonly used
                guideline suggests withdrawing 4% of your retirement corpus
                annually to ensure your savings last 25-30 years. The monthly
                income shown is based on this rule.
              </Typography>
            </Alert>
          </>
        )}

        {/* Info Card */}
        <Card elevation={1} sx={{ bgcolor: "warning.light" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <strong>Note:</strong> This calculator provides estimates based on
              the expected rate of return. Actual returns may vary depending on
              market conditions, investment choices, and economic factors.
              Consider inflation, medical expenses, and lifestyle changes when
              planning your retirement. Consult a financial advisor for
              personalized retirement planning advice.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
