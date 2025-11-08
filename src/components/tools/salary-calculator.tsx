"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Divider,
  InputAdornment,
  Slider,
} from "@mui/material";
import { useState, useCallback } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import { ButtonWithHandler } from "../lib/buttons";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";

type PayPeriod =
  | "hourly"
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "annual";

interface SalaryResult {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
  afterTaxAnnual: number;
  afterTaxMonthly: number;
  afterTaxWeekly: number;
  effectiveTaxRate: number;
}

export default function SalaryCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [amount, setAmount] = useState<string>("25");
  const [payPeriod, setPayPeriod] = useState<PayPeriod>("hourly");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [taxRate, setTaxRate] = useState<number>(20);
  const [result, setResult] = useState<SalaryResult | null>(null);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateSalary = useCallback(() => {
    const amountNum = parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      toolState.actions.showMessage("Please enter a valid salary amount!");
      return;
    }

    // Convert everything to annual first
    let annual: number;
    const weeksPerYear = 52;
    const monthsPerYear = 12;

    switch (payPeriod) {
      case "hourly":
        annual = amountNum * hoursPerWeek * weeksPerYear;
        break;
      case "daily":
        annual = amountNum * 5 * weeksPerYear; // 5 days per week
        break;
      case "weekly":
        annual = amountNum * weeksPerYear;
        break;
      case "biweekly":
        annual = amountNum * 26; // 26 pay periods
        break;
      case "monthly":
        annual = amountNum * monthsPerYear;
        break;
      case "annual":
        annual = amountNum;
        break;
    }

    // Calculate all other periods from annual
    const hourly = annual / (hoursPerWeek * weeksPerYear);
    const daily = annual / (5 * weeksPerYear);
    const weekly = annual / weeksPerYear;
    const biweekly = annual / 26;
    const monthly = annual / monthsPerYear;

    // Calculate after-tax amounts
    const afterTaxAnnual = annual * (1 - taxRate / 100);
    const afterTaxMonthly = afterTaxAnnual / monthsPerYear;
    const afterTaxWeekly = afterTaxAnnual / weeksPerYear;

    setResult({
      hourly,
      daily,
      weekly,
      biweekly,
      monthly,
      annual,
      afterTaxAnnual,
      afterTaxMonthly,
      afterTaxWeekly,
      effectiveTaxRate: taxRate,
    });

    toolState.actions.showMessage("Salary calculated successfully!");
  }, [amount, payPeriod, hoursPerWeek, taxRate, toolState.actions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatLargeCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const clearCalculation = useCallback(() => {
    setAmount("25");
    setPayPeriod("hourly");
    setHoursPerWeek(40);
    setTaxRate(20);
    setResult(null);
  }, []);

  const payPeriodLabels = {
    hourly: "Hourly",
    daily: "Daily",
    weekly: "Weekly",
    biweekly: "Bi-Weekly",
    monthly: "Monthly",
    annual: "Annual",
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
        title="Salary Calculator"
        description="Convert between hourly, monthly, and annual salary. Calculate take-home pay and compare different pay structures easily."
      />

      <div className="flex flex-col gap-6">
        {/* Input Card */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Enter Your Salary
            </Typography>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Salary Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 0, step: 0.01 }}
                  helperText="Enter your salary or wage"
                />

                <FormControl fullWidth>
                  <InputLabel>Pay Period</InputLabel>
                  <Select
                    value={payPeriod}
                    label="Pay Period"
                    onChange={(e) => setPayPeriod(e.target.value as PayPeriod)}
                  >
                    {Object.entries(payPeriodLabels).map(([value, label]) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Hours per Week: {hoursPerWeek}
                </Typography>
                <Slider
                  value={hoursPerWeek}
                  onChange={(_, value) => setHoursPerWeek(value as number)}
                  min={1}
                  max={80}
                  marks={[
                    { value: 20, label: "20" },
                    { value: 40, label: "40" },
                    { value: 60, label: "60" },
                  ]}
                  valueLabelDisplay="auto"
                />
              </div>

              <div>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Estimated Tax Rate: {taxRate}%
                </Typography>
                <Slider
                  value={taxRate}
                  onChange={(_, value) => setTaxRate(value as number)}
                  min={0}
                  max={50}
                  marks={[
                    { value: 0, label: "0%" },
                    { value: 20, label: "20%" },
                    { value: 40, label: "40%" },
                  ]}
                  valueLabelDisplay="auto"
                />
                <Typography variant="caption" color="text.secondary">
                  Includes federal, state, and local taxes (approximate)
                </Typography>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ButtonWithHandler
                  buttonText="Calculate Salary"
                  onClick={calculateSalary}
                  startIcon={<AttachMoneyIcon />}
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
          <>
            {/* Main Annual Display */}
            <Card elevation={3} sx={{ bgcolor: "primary.light" }}>
              <CardContent>
                <Typography variant="h6" color="white" gutterBottom>
                  Annual Salary
                </Typography>
                <div className="bg-white p-6 rounded-lg mb-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <Typography variant="caption" color="text.secondary">
                        Gross Annual
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        color="primary"
                      >
                        {formatLargeCurrency(result.annual)}
                      </Typography>
                    </div>
                    <div className="text-center">
                      <Typography variant="caption" color="text.secondary">
                        Take-Home (After {result.effectiveTaxRate}% Tax)
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        color="success.main"
                      >
                        {formatLargeCurrency(result.afterTaxAnnual)}
                      </Typography>
                    </div>
                  </div>
                </div>
                <Typography variant="body2" color="white">
                  Based on {hoursPerWeek} hours per week, 52 weeks per year
                </Typography>
              </CardContent>
            </Card>

            {/* Gross Pay Breakdown */}
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Gross Pay Breakdown
                </Typography>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3 border-2 border-gray-200 rounded-lg">
                    <Typography variant="caption" color="text.secondary">
                      Hourly
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {formatCurrency(result.hourly)}
                    </Typography>
                    <Typography variant="caption">/hour</Typography>
                  </div>

                  <div className="p-3 border-2 border-gray-200 rounded-lg">
                    <Typography variant="caption" color="text.secondary">
                      Daily
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {formatCurrency(result.daily)}
                    </Typography>
                    <Typography variant="caption">/day</Typography>
                  </div>

                  <div className="p-3 border-2 border-gray-200 rounded-lg">
                    <Typography variant="caption" color="text.secondary">
                      Weekly
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {formatCurrency(result.weekly)}
                    </Typography>
                    <Typography variant="caption">/week</Typography>
                  </div>

                  <div className="p-3 border-2 border-gray-200 rounded-lg">
                    <Typography variant="caption" color="text.secondary">
                      Bi-Weekly
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {formatCurrency(result.biweekly)}
                    </Typography>
                    <Typography variant="caption">/2 weeks</Typography>
                  </div>

                  <div className="p-3 border-2 border-gray-200 rounded-lg">
                    <Typography variant="caption" color="text.secondary">
                      Monthly
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {formatCurrency(result.monthly)}
                    </Typography>
                    <Typography variant="caption">/month</Typography>
                  </div>

                  <div className="p-3 border-2 border-blue-300 rounded-lg bg-blue-50">
                    <Typography variant="caption" color="text.secondary">
                      Annual
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {formatLargeCurrency(result.annual)}
                    </Typography>
                    <Typography variant="caption">/year</Typography>
                  </div>
                </div>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Take-Home Pay (After Tax)
                </Typography>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {formatCurrency(result.afterTaxWeekly)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Weekly
                    </Typography>
                  </div>

                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {formatCurrency(result.afterTaxMonthly)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Monthly
                    </Typography>
                  </div>

                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {formatLargeCurrency(result.afterTaxAnnual)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Annual
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work Hours Summary */}
            <Card elevation={1} sx={{ bgcolor: "grey.50" }}>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <WorkIcon color="primary" />
                  <Typography variant="h6">Work Hours Summary</Typography>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex justify-between items-center p-2 border-b">
                    <Typography variant="body2">Per Week</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {hoursPerWeek} hrs
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <Typography variant="body2">Per Month</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {Math.round((hoursPerWeek * 52) / 12)} hrs
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <Typography variant="body2">Per Year</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {hoursPerWeek * 52} hrs
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <Typography variant="body2">Days Per Year</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      260 days
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Info Alerts */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Standard Work Year:</strong> Calculations based on 52 weeks
            per year, 26 bi-weekly periods, and 260 working days (5 days/week).
            Actual pay may vary based on holidays and company policies.
          </Typography>
        </Alert>

        <Alert severity="warning">
          <Typography variant="body2">
            <strong>Tax Estimates:</strong> Tax calculations are approximate and
            for comparison purposes only. Actual tax rates vary by jurisdiction,
            filing status, deductions, and other factors. Consult a tax
            professional for accurate calculations.
          </Typography>
        </Alert>
      </div>
    </ToolLayout>
  );
}
