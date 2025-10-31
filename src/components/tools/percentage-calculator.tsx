"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import CalculateIcon from "@mui/icons-material/Calculate";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

type CalculationType = "percentage" | "increase" | "decrease" | "difference";

export default function PercentageCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [calcType, setCalcType] = useState<CalculationType>("percentage");
  const [value1, setValue1] = useState<number>(100);
  const [value2, setValue2] = useState<number>(20);

  const calculateResults = useMemo(() => {
    const v1 = Number(value1) || 0;
    const v2 = Number(value2) || 0;

    switch (calcType) {
      case "percentage":
        // What is X% of Y?
        const result = (v2 / 100) * v1;
        return {
          result: result.toFixed(2),
          formula: `(${v2} / 100) × ${v1} = ${result.toFixed(2)}`,
          description: `${v2}% of ${v1} is ${result.toFixed(2)}`,
        };

      case "increase":
        // Percentage increase from X to Y
        if (v1 === 0) {
          return {
            result: "0",
            formula: "Original value cannot be 0",
            description: "Cannot calculate percentage increase from 0",
          };
        }
        const increase = ((v2 - v1) / v1) * 100;
        const newValue = v1 + (v1 * increase) / 100;
        return {
          result: increase.toFixed(2),
          formula: `((${v2} - ${v1}) / ${v1}) × 100 = ${increase.toFixed(2)}%`,
          description: `Increase from ${v1} to ${v2} is ${increase.toFixed(
            2
          )}%`,
          additional: `New value: ${newValue.toFixed(2)}`,
        };

      case "decrease":
        // Percentage decrease from X to Y
        if (v1 === 0) {
          return {
            result: "0",
            formula: "Original value cannot be 0",
            description: "Cannot calculate percentage decrease from 0",
          };
        }
        const decrease = ((v1 - v2) / v1) * 100;
        const reducedValue = v1 - (v1 * decrease) / 100;
        return {
          result: decrease.toFixed(2),
          formula: `((${v1} - ${v2}) / ${v1}) × 100 = ${decrease.toFixed(2)}%`,
          description: `Decrease from ${v1} to ${v2} is ${decrease.toFixed(
            2
          )}%`,
          additional: `New value: ${reducedValue.toFixed(2)}`,
        };

      case "difference":
        // Percentage difference between X and Y
        const avg = (v1 + v2) / 2;
        if (avg === 0) {
          return {
            result: "0",
            formula: "Average cannot be 0",
            description: "Cannot calculate percentage difference",
          };
        }
        const diff = (Math.abs(v1 - v2) / avg) * 100;
        return {
          result: diff.toFixed(2),
          formula: `(|${v1} - ${v2}| / ((${v1} + ${v2}) / 2)) × 100 = ${diff.toFixed(
            2
          )}%`,
          description: `The percentage difference between ${v1} and ${v2} is ${diff.toFixed(
            2
          )}%`,
        };

      default:
        return {
          result: "0",
          formula: "",
          description: "",
        };
    }
  }, [calcType, value1, value2]);

  const handleTabChange = useCallback(
    (_: unknown, newValue: CalculationType) => {
      setCalcType(newValue);
    },
    []
  );

  const handleValue1Change = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue1(Number(event.target.value));
    },
    []
  );

  const handleValue2Change = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue2(Number(event.target.value));
    },
    []
  );

  const getTabLabel = (type: CalculationType) => {
    switch (type) {
      case "percentage":
        return { label: "% of Value", icon: <CalculateIcon /> };
      case "increase":
        return { label: "% Increase", icon: <TrendingUpIcon /> };
      case "decrease":
        return { label: "% Decrease", icon: <TrendingDownIcon /> };
      case "difference":
        return { label: "% Difference", icon: <CompareArrowsIcon /> };
    }
  };

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Percentage Calculator"
        description="Calculate percentages, percentage increase, decrease, and difference. Free online percentage calculator with instant results."
        exampleCode="20% of 100"
        exampleOutput="20"
      />

      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
        <Card className="border border-gray-200">
          <CardContent>
            <Tabs
              value={calcType}
              onChange={handleTabChange}
              variant="fullWidth"
              className="mb-6"
            >
              {(
                [
                  "percentage",
                  "increase",
                  "decrease",
                  "difference",
                ] as CalculationType[]
              ).map((type) => {
                const { label, icon } = getTabLabel(type);
                return (
                  <Tab
                    key={type}
                    value={type}
                    label={label}
                    icon={icon}
                    iconPosition="start"
                    className="!text-xs md:!text-sm"
                  />
                );
              })}
            </Tabs>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label={
                    calcType === "percentage"
                      ? "Number"
                      : calcType === "difference"
                      ? "First Value"
                      : "Original Value"
                  }
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={value1}
                  onChange={handleValue1Change}
                  inputProps={{ step: "any" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label={
                    calcType === "percentage"
                      ? "Percentage (%)"
                      : calcType === "difference"
                      ? "Second Value"
                      : "New Value"
                  }
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={value2}
                  onChange={handleValue2Change}
                  inputProps={{ step: "any" }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-2 border-blue-500 bg-blue-50">
          <CardContent>
            <Typography variant="h6" className="mb-4 text-blue-800">
              Result
            </Typography>

            <div className="bg-white rounded-lg p-6 mb-4">
              <Typography
                variant="h3"
                className="font-bold text-blue-600 text-center mb-2"
              >
                {calcType === "percentage"
                  ? calculateResults.result
                  : `${calculateResults.result}%`}
              </Typography>
              <Typography variant="body1" className="text-gray-700 text-center">
                {calculateResults.description}
              </Typography>
              {calculateResults.additional && (
                <Typography
                  variant="body2"
                  className="text-gray-600 text-center mt-2"
                >
                  {calculateResults.additional}
                </Typography>
              )}
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <Typography
                variant="subtitle2"
                className="font-semibold mb-2 text-gray-700"
              >
                Formula:
              </Typography>
              <Typography
                variant="body2"
                className="font-mono text-gray-600 break-all"
              >
                {calculateResults.formula}
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Examples Card */}
        <Card className="border border-gray-200">
          <CardContent>
            <Typography variant="h6" className="mb-3 text-gray-800">
              Common Examples
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded p-3">
                <Typography
                  variant="subtitle2"
                  className="font-semibold text-gray-700"
                >
                  Shopping Discount
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Original price: $100, Discount: 25%
                  <br />
                  You save: $25, Pay: $75
                </Typography>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <Typography
                  variant="subtitle2"
                  className="font-semibold text-gray-700"
                >
                  Salary Increase
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Old: $50,000, New: $55,000
                  <br />
                  Increase: 10%
                </Typography>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <Typography
                  variant="subtitle2"
                  className="font-semibold text-gray-700"
                >
                  Test Score
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Scored: 45, Total: 50
                  <br />
                  Percentage: 90%
                </Typography>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <Typography
                  variant="subtitle2"
                  className="font-semibold text-gray-700"
                >
                  Interest Rate
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Principal: $10,000, Rate: 5%
                  <br />
                  Interest: $500
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
