"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

interface SIPCalculation {
  totalInvestment: number;
  estimatedReturns: number;
  totalValue: number;
}

export default function SIPCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(12);
  const [timePeriodYears, setTimePeriodYears] = useState<number>(10);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateSIP = useCallback(
    (
      monthlyAmount: number,
      annualRate: number,
      years: number,
    ): SIPCalculation => {
      // Monthly interest rate
      const monthlyRate = annualRate / 12 / 100;
      // Total number of months
      const months = years * 12;

      // Future Value of SIP formula: FV = P × ((1 + r)^n - 1) / r × (1 + r)
      // where P = monthly investment, r = monthly rate, n = number of months
      let futureValue = 0;
      if (monthlyRate === 0) {
        futureValue = monthlyAmount * months;
      } else {
        futureValue =
          monthlyAmount *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
      }

      const totalInvestment = monthlyAmount * months;
      const estimatedReturns = futureValue - totalInvestment;

      return {
        totalInvestment: Math.round(totalInvestment),
        estimatedReturns: Math.round(estimatedReturns),
        totalValue: Math.round(futureValue),
      };
    },
    [],
  );

  const sipResults = useMemo(
    () => calculateSIP(monthlyInvestment, expectedReturnRate, timePeriodYears),
    [monthlyInvestment, expectedReturnRate, timePeriodYears, calculateSIP],
  );

  const donutRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = donutRef.current;
    if (!canvas || sipResults.totalValue <= 0) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width,
      H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2,
      cy = H / 2;
    const radius = Math.min(cx, cy) - 8;
    const inner = radius * 0.58;
    const total = sipResults.totalValue;
    const investedFrac = sipResults.totalInvestment / total;
    const start = -Math.PI / 2;
    const mid = start + investedFrac * 2 * Math.PI;

    // Investment slice (blue)
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, mid);
    ctx.closePath();
    ctx.fillStyle = "#3b82f6";
    ctx.fill();

    // Returns slice (green)
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, mid, start + 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#22c55e";
    ctx.fill();

    // Donut hole
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, 2 * Math.PI);
    ctx.fillStyle = "#f9fafb";
    ctx.fill();

    ctx.fillStyle = "#374151";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${(investedFrac * 100).toFixed(0)}% Inv`, cx, cy - 7);
    ctx.fillText(`${((1 - investedFrac) * 100).toFixed(0)}% Ret`, cx, cy + 9);
  }, [sipResults]);

  const handleMonthlyInvestmentChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0) {
        setMonthlyInvestment(value);
      }
    },
    [],
  );

  const handleReturnRateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0 && value <= 50) {
        setExpectedReturnRate(value);
      }
    },
    [],
  );

  const handleTimePeriodChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 1 && value <= 50) {
        setTimePeriodYears(value);
      }
    },
    [],
  );

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
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
        title="SIP Calculator - Systematic Investment Plan"
        description="Calculate your SIP returns with our free online calculator. Plan your mutual fund investments and see how your wealth grows over time."
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
                label="Monthly Investment (₹)"
                type="number"
                value={monthlyInvestment}
                onChange={handleMonthlyInvestmentChange}
                inputProps={{ min: 0, step: 500 }}
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Expected Annual Return Rate (%)"
                type="number"
                value={expectedReturnRate}
                onChange={handleReturnRateChange}
                inputProps={{ min: 0, max: 50, step: 0.5 }}
                variant="outlined"
                helperText="Typical equity mutual funds: 10-15%"
              />

              <TextField
                fullWidth
                label="Investment Period (Years)"
                type="number"
                value={timePeriodYears}
                onChange={handleTimePeriodChange}
                inputProps={{ min: 1, max: 50 }}
                variant="outlined"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card elevation={3} sx={{ bgcolor: "primary.main", color: "white" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Investment Summary
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <div className="flex flex-col gap-1">
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Investment
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {formatCurrency(sipResults.totalInvestment)}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {monthlyInvestment.toLocaleString("en-IN")} ×{" "}
                    {timePeriodYears * 12} months
                  </Typography>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div className="flex flex-col gap-1">
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Estimated Returns
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {formatCurrency(sipResults.estimatedReturns)}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    @ {expectedReturnRate}% annual return
                  </Typography>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div className="flex flex-col gap-1">
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Value
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {formatCurrency(sipResults.totalValue)}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    After {timePeriodYears} years
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.3)" }} />

            <div className="flex flex-col gap-2">
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Wealth Growth
              </Typography>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-8 bg-white/20 rounded overflow-hidden">
                  <div
                    className="h-full bg-white/50 transition-all duration-500"
                    style={{
                      width: `${
                        (sipResults.totalInvestment / sipResults.totalValue) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <Typography variant="body2" fontWeight="bold">
                  {(
                    (sipResults.estimatedReturns / sipResults.totalInvestment) *
                    100
                  ).toFixed(1)}
                  % gain
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card elevation={1} sx={{ bgcolor: "info.light" }}>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <Typography variant="body2" color="text.secondary">
                  <strong>Note:</strong> This calculator provides estimates
                  based on the expected rate of return. Actual returns may vary
                  depending on market conditions and fund performance. SIP
                  investments in mutual funds are subject to market risks.
                  Please read all scheme-related documents carefully before
                  investing.
                </Typography>
              </div>
              <div className="flex flex-col items-center">
                <canvas ref={donutRef} width={140} height={140} />
                <div className="flex gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs">
                    <span className="inline-block w-3 h-3 rounded-sm bg-blue-500" />{" "}
                    Invested
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <span className="inline-block w-3 h-3 rounded-sm bg-green-500" />{" "}
                    Returns
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
