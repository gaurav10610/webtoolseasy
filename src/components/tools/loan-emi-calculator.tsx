"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { ToolLayout } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

interface AmortizationEntry {
  month: number;
  emi: number;
  principalPayment: number;
  interestPayment: number;
  balance: number;
}

export default function LoanEmiCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const calculateEMI = useMemo(() => {
    const principal = Number(loanAmount) || 0;
    const rate = Number(interestRate) || 0;
    const years = Number(tenureYears) || 0;

    if (principal <= 0 || rate <= 0 || years <= 0) {
      return {
        emi: 0,
        totalAmount: 0,
        totalInterest: 0,
        schedule: [],
      };
    }

    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    // EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    // Generate amortization schedule
    const schedule: AmortizationEntry[] = [];
    let balance = principal;

    for (let month = 1; month <= months; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance = balance - principalPayment;

      // Only show first 12 months, then every 12th month, and last month
      if (month <= 12 || month % 12 === 0 || month === months) {
        schedule.push({
          month,
          emi,
          principalPayment,
          interestPayment,
          balance: Math.max(0, balance),
        });
      }
    }

    return {
      emi,
      totalAmount,
      totalInterest,
      schedule,
    };
  }, [loanAmount, interestRate, tenureYears]);

  const chartRef = useRef<HTMLCanvasElement>(null);

  // Draw donut chart when results change
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas || calculateEMI.totalAmount <= 0) return;
    const ctx = canvas.getContext("2d")!;
    const { width: W, height: H } = canvas;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(cx, cy) - 8;
    const inner = radius * 0.58;
    const total = calculateEMI.totalAmount;
    const principalFrac = loanAmount / total;
    const start = -Math.PI / 2;
    const mid = start + principalFrac * 2 * Math.PI;

    // Principal slice
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, mid);
    ctx.closePath();
    ctx.fillStyle = "#2563eb";
    ctx.fill();

    // Interest slice
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, mid, start + 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#ef4444";
    ctx.fill();

    // Donut hole
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, 2 * Math.PI);
    ctx.fillStyle = "#f9fafb";
    ctx.fill();

    // Center text
    ctx.fillStyle = "#374151";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${(principalFrac * 100).toFixed(0)}% P`, cx, cy - 7);
    ctx.fillText(`${((1 - principalFrac) * 100).toFixed(0)}% I`, cx, cy + 9);
  }, [calculateEMI, loanAmount]);

  const handleLoanAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoanAmount(Number(event.target.value));
    },
    [],
  );

  const handleInterestRateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInterestRate(Number(event.target.value));
    },
    [],
  );

  const handleTenureChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTenureYears(Number(event.target.value));
    },
    [],
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
<div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
        {/* Input Section */}
        <Card className="border border-gray-200">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <AccountBalanceIcon color="primary" fontSize="large" />
              <Typography variant="h6" color="primary">
                Loan Details
              </Typography>
            </div>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Loan Amount ($)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  inputProps={{ min: 0, step: 1000 }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Annual Interest Rate (%)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  inputProps={{ min: 0, step: 0.1, max: 30 }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Loan Tenure (Years)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={tenureYears}
                  onChange={handleTenureChange}
                  inputProps={{ min: 1, step: 1, max: 40 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card className="border-2 border-blue-500 h-full">
              <CardContent className="text-center">
                <Typography variant="subtitle2" className="text-gray-600 mb-2">
                  Monthly EMI
                </Typography>
                <Typography
                  variant="h4"
                  className="font-bold text-blue-600 mb-1"
                >
                  {formatCurrency(calculateEMI.emi)}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Pay this amount every month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="border-2 border-green-500 h-full">
              <CardContent className="text-center">
                <Typography variant="subtitle2" className="text-gray-600 mb-2">
                  Total Interest
                </Typography>
                <Typography
                  variant="h4"
                  className="font-bold text-green-600 mb-1"
                >
                  {formatCurrency(calculateEMI.totalInterest)}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Total interest over loan period
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="border-2 border-purple-500 h-full">
              <CardContent className="text-center">
                <Typography variant="subtitle2" className="text-gray-600 mb-2">
                  Total Amount
                </Typography>
                <Typography
                  variant="h4"
                  className="font-bold text-purple-600 mb-1"
                >
                  {formatCurrency(calculateEMI.totalAmount)}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Total amount to be repaid
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Visual Breakdown Chart */}
        {calculateEMI.totalAmount > 0 && (
          <Card className="border border-gray-200">
            <CardContent>
              <Typography variant="h6" className="mb-3 text-gray-800">
                Principal vs Interest Breakdown
              </Typography>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <canvas
                  ref={chartRef}
                  width={180}
                  height={180}
                  style={{ flexShrink: 0 }}
                />
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-600 shrink-0" />
                    <div className="flex-1">
                      <Typography variant="body2" className="font-medium">
                        Principal
                      </Typography>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${((loanAmount / calculateEMI.totalAmount) * 100).toFixed(1)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <Typography
                      variant="body2"
                      className="font-mono text-blue-600 whitespace-nowrap"
                    >
                      {formatCurrency(loanAmount)} (
                      {((loanAmount / calculateEMI.totalAmount) * 100).toFixed(
                        0,
                      )}
                      %)
                    </Typography>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500 shrink-0" />
                    <div className="flex-1">
                      <Typography variant="body2" className="font-medium">
                        Total Interest
                      </Typography>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: `${((calculateEMI.totalInterest / calculateEMI.totalAmount) * 100).toFixed(1)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <Typography
                      variant="body2"
                      className="font-mono text-red-600 whitespace-nowrap"
                    >
                      {formatCurrency(calculateEMI.totalInterest)} (
                      {(
                        (calculateEMI.totalInterest /
                          calculateEMI.totalAmount) *
                        100
                      ).toFixed(0)}
                      %)
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Breakdown */}
        <Card className="border border-gray-200">
          <CardContent>
            <Typography variant="h6" className="mb-3 text-gray-800">
              Payment Summary
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <Typography variant="body2" className="text-gray-600 mb-1">
                  Principal Amount
                </Typography>
                <Typography
                  variant="h6"
                  className="font-semibold text-blue-700"
                >
                  {formatCurrency(loanAmount)}
                </Typography>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <Typography variant="body2" className="text-gray-600 mb-1">
                  Total Interest Payable
                </Typography>
                <Typography
                  variant="h6"
                  className="font-semibold text-green-700"
                >
                  {formatCurrency(calculateEMI.totalInterest)}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {((calculateEMI.totalInterest / loanAmount) * 100).toFixed(1)}
                  % of principal
                </Typography>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <Typography variant="body2" className="text-gray-600 mb-1">
                  Loan Tenure
                </Typography>
                <Typography
                  variant="h6"
                  className="font-semibold text-purple-700"
                >
                  {tenureYears} years ({tenureYears * 12} months)
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amortization Schedule */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" className="text-gray-800">
              Amortization Schedule
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} className="max-h-96">
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-semibold">Month</TableCell>
                    <TableCell align="right" className="font-semibold">
                      EMI
                    </TableCell>
                    <TableCell align="right" className="font-semibold">
                      Principal
                    </TableCell>
                    <TableCell align="right" className="font-semibold">
                      Interest
                    </TableCell>
                    <TableCell align="right" className="font-semibold">
                      Balance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calculateEMI.schedule.map((entry) => (
                    <TableRow key={entry.month} hover>
                      <TableCell>{entry.month}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(entry.emi)}
                      </TableCell>
                      <TableCell align="right" className="text-blue-600">
                        {formatCurrency(entry.principalPayment)}
                      </TableCell>
                      <TableCell align="right" className="text-green-600">
                        {formatCurrency(entry.interestPayment)}
                      </TableCell>
                      <TableCell align="right" className="font-semibold">
                        {formatCurrency(entry.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="caption" className="text-gray-500 mt-2 block">
              Showing first 12 months, then yearly milestones. Full schedule
              available for download.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </ToolLayout>
  );
}
