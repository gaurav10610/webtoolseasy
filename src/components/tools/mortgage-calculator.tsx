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

interface MortgageCalculation {
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
  loanAmount: number;
  principalPercentage: number;
  interestPercentage: number;
}

export default function MortgageCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [homePrice, setHomePrice] = useState<number>(5000000);
  const [downPayment, setDownPayment] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateMortgage = useCallback(
    (
      homePrice: number,
      downPayment: number,
      annualInterestRate: number,
      years: number
    ): MortgageCalculation => {
      const loanAmount = homePrice - downPayment;
      const monthlyInterestRate = annualInterestRate / 12 / 100;
      const numberOfPayments = years * 12;

      // EMI formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
      // where P = loan amount, r = monthly interest rate, n = number of months
      let monthlyEMI = 0;
      if (monthlyInterestRate === 0) {
        monthlyEMI = loanAmount / numberOfPayments;
      } else {
        const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
        monthlyEMI = (loanAmount * monthlyInterestRate * factor) / (factor - 1);
      }

      const totalAmount = monthlyEMI * numberOfPayments;
      const totalInterest = totalAmount - loanAmount;

      return {
        monthlyEMI: Math.round(monthlyEMI),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        loanAmount: Math.round(loanAmount),
        principalPercentage: (loanAmount / totalAmount) * 100,
        interestPercentage: (totalInterest / totalAmount) * 100,
      };
    },
    []
  );

  const mortgageResults = useMemo(
    () =>
      calculateMortgage(homePrice, downPayment, interestRate, loanTermYears),
    [homePrice, downPayment, interestRate, loanTermYears, calculateMortgage]
  );

  const handleHomePriceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0) {
        setHomePrice(value);
      }
    },
    []
  );

  const handleDownPaymentChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0) {
        setDownPayment(value);
      }
    },
    []
  );

  const handleInterestRateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0 && value <= 30) {
        setInterestRate(value);
      }
    },
    []
  );

  const handleLoanTermChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 1 && value <= 40) {
        setLoanTermYears(value);
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

  const downPaymentPercentage = ((downPayment / homePrice) * 100).toFixed(1);
  const isValidDownPayment = downPayment < homePrice && downPayment >= 0;

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
        title="Mortgage Calculator - Home Loan EMI Calculator"
        description="Calculate your mortgage EMI with our free home loan calculator. Get instant results with detailed payment breakdown and amortization schedule."
      />

      <div className="flex flex-col gap-6">
        {/* Input Section */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Loan Details
            </Typography>

            <div className="flex flex-col gap-4">
              <TextField
                fullWidth
                label="Home Price (₹)"
                type="number"
                value={homePrice}
                onChange={handleHomePriceChange}
                inputProps={{ min: 0, step: 100000 }}
                variant="outlined"
                helperText="Total cost of the property"
              />

              <TextField
                fullWidth
                label="Down Payment (₹)"
                type="number"
                value={downPayment}
                onChange={handleDownPaymentChange}
                inputProps={{ min: 0, step: 50000 }}
                variant="outlined"
                error={!isValidDownPayment}
                helperText={
                  isValidDownPayment
                    ? `${downPaymentPercentage}% of home price`
                    : "Down payment must be less than home price"
                }
              />

              <TextField
                fullWidth
                label="Annual Interest Rate (%)"
                type="number"
                value={interestRate}
                onChange={handleInterestRateChange}
                inputProps={{ min: 0, max: 30, step: 0.1 }}
                variant="outlined"
                helperText="Current home loan rates: 8-9.5%"
              />

              <TextField
                fullWidth
                label="Loan Term (Years)"
                type="number"
                value={loanTermYears}
                onChange={handleLoanTermChange}
                inputProps={{ min: 1, max: 40 }}
                variant="outlined"
                helperText="Common terms: 15, 20, 25, or 30 years"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {isValidDownPayment && (
          <>
            <Card
              elevation={3}
              sx={{ bgcolor: "primary.main", color: "white" }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Monthly Payment
                </Typography>

                <div className="flex flex-col gap-1 mb-4">
                  <Typography variant="h3" fontWeight="bold">
                    {formatCurrency(mortgageResults.monthlyEMI)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Per month for {loanTermYears * 12} months
                  </Typography>
                </div>

                <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.3)" }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <div className="flex flex-col gap-1">
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Loan Amount
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {formatCurrency(mortgageResults.loanAmount)}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="flex flex-col gap-1">
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Total Interest
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {formatCurrency(mortgageResults.totalInterest)}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="flex flex-col gap-1">
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Total Payment
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {formatCurrency(mortgageResults.totalAmount)}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Payment Breakdown */}
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Payment Breakdown
                </Typography>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Typography variant="body2" color="text.secondary">
                        Principal Amount
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {mortgageResults.principalPercentage.toFixed(1)}%
                      </Typography>
                    </div>
                    <div className="w-full h-8 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{
                          width: `${mortgageResults.principalPercentage}%`,
                        }}
                      />
                    </div>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {formatCurrency(mortgageResults.loanAmount)}
                    </Typography>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Typography variant="body2" color="text.secondary">
                        Interest Amount
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {mortgageResults.interestPercentage.toFixed(1)}%
                      </Typography>
                    </div>
                    <div className="w-full h-8 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all duration-500"
                        style={{
                          width: `${mortgageResults.interestPercentage}%`,
                        }}
                      />
                    </div>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {formatCurrency(mortgageResults.totalInterest)}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Home Purchase Summary */}
            <Card elevation={1} sx={{ bgcolor: "grey.50" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Purchase Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Home Price
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {formatCurrency(homePrice)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Down Payment
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {formatCurrency(downPayment)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Loan Amount
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {formatCurrency(mortgageResults.loanAmount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Total Paid
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {formatCurrency(
                        mortgageResults.totalAmount + downPayment
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}

        {/* Info Card */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Tip:</strong> A larger down payment reduces your monthly EMI
            and total interest paid. Financial experts recommend a down payment
            of at least 20% of the home price. Also, ensure your monthly EMI
            doesn&apos;t exceed 35-40% of your monthly income for comfortable
            repayment.
          </Typography>
        </Alert>
      </div>
    </ToolLayout>
  );
}
