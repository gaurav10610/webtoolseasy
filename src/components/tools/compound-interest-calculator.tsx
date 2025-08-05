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
import { useState, useCallback, useMemo } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
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
    []
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
    ]
  );

  const handlePrincipalChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrincipal(Number(event.target.value) || 0);
    },
    []
  );

  const handleInterestRateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInterestRate(Number(event.target.value) || 0);
    },
    []
  );

  const handleTenureChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTenureInMonths(Number(event.target.value) || 0);
    },
    []
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
      <SEOContent
        title="Compound Interest Calculator"
        description="Calculate compound interest with different compounding frequencies. Free online tool for investment planning and financial calculations."
        exampleCode="Principal: $1000, Rate: 6%, Tenure: 12 months, Quarterly"
        exampleOutput={`Final Amount: $${amount.toFixed(
          2
        )}, Interest: $${interest.toFixed(2)}`}
      />

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
      </div>
    </ToolLayout>
  );
}
