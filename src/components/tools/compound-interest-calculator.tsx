"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ToolLayout } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";

interface CalculationParams {
  principal: number;
  interestRate: number;
  tenureInMonths: number;
  compoundedOn: string;
}

interface CalculationResult {
  amount: number;
  interest: number;
}

export default function CompoundInterestCalculator() {
  const compoundedOnList = ["Yearly", "Quarterly", "Monthly"];

  const [principal, setPrincipal] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [tenureInMonths, setTenureInMonths] = useState<number>(12);
  const [compoundedOn, setCompoundedOn] = useState<string>(compoundedOnList[1]);

  const toolState = useToolState({
    hostname: "",
    queryParams: {},
    initialValue: "",
  });

  const calculateCompoundInterest = useCallback(
    ({
      principal,
      interestRate,
      tenureInMonths,
      compoundedOn,
    }: CalculationParams): CalculationResult => {
      // Convert tenure to years
      const tenureInYears: number = tenureInMonths / 12;

      // Determine compounding frequency
      let n: number = 1; // Default: Yearly
      if (compoundedOn === "Quarterly") {
        n = 4;
      } else if (compoundedOn === "Monthly") {
        n = 12;
      }

      // Calculate compound amount: A = P(1 + r/n)^(nt)
      const amount: number =
        principal * Math.pow(1 + interestRate / (n * 100), n * tenureInYears);
      const interest = amount - principal;

      return { amount, interest };
    },
    [],
  );

  const { amount, interest } = useMemo(
    () =>
      calculateCompoundInterest({
        principal,
        interestRate,
        tenureInMonths,
        compoundedOn,
      }),
    [
      principal,
      interestRate,
      tenureInMonths,
      compoundedOn,
      calculateCompoundInterest,
    ],
  );

  // Build year-by-year growth data for the chart
  const growthData = useMemo(() => {
    const totalYears = tenureInMonths / 12;
    const steps = Math.min(20, Math.max(2, Math.ceil(totalYears)));
    const stepMonths = tenureInMonths / steps;
    let n = 1;
    if (compoundedOn === "Quarterly") n = 4;
    if (compoundedOn === "Monthly") n = 12;
    const data: { label: string; total: number }[] = [];
    for (let s = 1; s <= steps; s++) {
      const months = s * stepMonths;
      const years = months / 12;
      const total =
        principal * Math.pow(1 + interestRate / (n * 100), n * years);
      const label =
        months >= 12 ? `${Math.round(months / 12)}y` : `${Math.round(months)}m`;
      data.push({ label, total });
    }
    return data;
  }, [principal, interestRate, tenureInMonths, compoundedOn]);

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas || growthData.length === 0) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const padL = 60,
      padR = 12,
      padT = 12,
      padB = 32;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const maxVal = Math.max(...growthData.map((d) => d.total)) * 1.05;
    const barW = chartW / growthData.length - 4;

    growthData.forEach((d, i) => {
      const x = padL + i * (chartW / growthData.length) + 2;
      const barH = (d.total / maxVal) * chartH;
      const principalH = (principal / maxVal) * chartH;
      const y = padT + chartH - barH;

      // Interest portion (green)
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(x, padT + chartH - barH, barW, barH - principalH);
      // Principal portion (blue)
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(x, padT + chartH - principalH, barW, principalH);

      // X-axis label
      ctx.fillStyle = "#6b7280";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(d.label, x + barW / 2, H - 10);
    });

    // Y-axis lines and labels
    ctx.strokeStyle = "#e5e7eb";
    ctx.setLineDash([3, 3]);
    for (let i = 0; i <= 4; i++) {
      const val = (maxVal * i) / 4;
      const y = padT + chartH - (val / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(W - padR, y);
      ctx.stroke();
      ctx.fillStyle = "#6b7280";
      ctx.font = "9px sans-serif";
      ctx.textAlign = "right";
      const label =
        val >= 1e6
          ? `$${(val / 1e6).toFixed(1)}M`
          : val >= 1e3
            ? `$${(val / 1e3).toFixed(0)}k`
            : `$${val.toFixed(0)}`;
      ctx.fillText(label, padL - 4, y + 3);
    }
    ctx.setLineDash([]);
  }, [growthData, principal]);

  const handlePrincipalChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrincipal(Number(event.target.value) || 0);
    },
    [],
  );

  const handleInterestRateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInterestRate(Number(event.target.value) || 0);
    },
    [],
  );

  const handleTenureChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTenureInMonths(Number(event.target.value) || 0);
    },
    [],
  );

  const handleCompoundingChange = useCallback((event: SelectChangeEvent) => {
    setCompoundedOn(event.target.value as string);
  }, []);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
<div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        {/* Input Section */}
        <Card className="p-4">
          <CardContent>
            <Typography variant="h6" className="mb-4" color="primary">
              Investment Parameters
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Principal Amount ($)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={principal}
                  onChange={handlePrincipalChange}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Interest Rate (%)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  inputProps={{ min: 0, max: 100, step: 0.1 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Tenure (In Months)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={tenureInMonths}
                  onChange={handleTenureChange}
                  inputProps={{ min: 1, step: 1 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Compounding Frequency</InputLabel>
                  <Select
                    value={compoundedOn}
                    label="Compounding Frequency"
                    onChange={handleCompoundingChange}
                  >
                    {compoundedOnList.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="p-4">
          <CardContent>
            <Typography variant="h6" className="mb-4" color="primary">
              Calculation Results
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="mb-1"
                  >
                    Principal Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    className="font-bold"
                  >
                    ${principal.toFixed(2)}
                  </Typography>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="mb-1"
                  >
                    Compound Interest
                  </Typography>
                  <Typography variant="h5" className="font-bold text-green-600">
                    ${interest.toFixed(2)}
                  </Typography>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="mb-1"
                  >
                    Final Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    className="font-bold text-purple-600"
                  >
                    ${amount.toFixed(2)}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            {/* Additional Info */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <Typography variant="body2" color="textSecondary">
                <strong>Investment Summary:</strong> Investing $
                {principal.toFixed(2)} at {interestRate}% annual interest,
                compounded {compoundedOn.toLowerCase()}, for {tenureInMonths}{" "}
                months ({(tenureInMonths / 12).toFixed(1)} years) will result in
                a final amount of ${amount.toFixed(2)}, earning $
                {interest.toFixed(2)} in compound interest.
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Growth Chart */}
        <Card className="p-4">
          <CardContent>
            <Typography variant="h6" className="mb-4" color="primary">
              Growth Over Time
            </Typography>
            <canvas
              ref={chartRef}
              width={600}
              height={220}
              className="w-full"
            />
            <div className="flex gap-4 mt-2 justify-center">
              <span className="flex items-center gap-1 text-sm">
                <span className="inline-block w-3 h-3 rounded-sm bg-blue-500" />{" "}
                Principal
              </span>
              <span className="flex items-center gap-1 text-sm">
                <span className="inline-block w-3 h-3 rounded-sm bg-green-500" />{" "}
                Interest
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
