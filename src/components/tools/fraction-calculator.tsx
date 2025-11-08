"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Divider,
} from "@mui/material";
import { useState, useCallback } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

type Operation = "add" | "subtract" | "multiply" | "divide";

interface Fraction {
  whole: number;
  numerator: number;
  denominator: number;
}

interface FractionResult {
  whole: number;
  numerator: number;
  denominator: number;
  improperNumerator: number;
  improperDenominator: number;
  decimal: number;
  steps: string[];
}

export default function FractionCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [operation, setOperation] = useState<Operation>("add");

  const [fraction1, setFraction1] = useState<Fraction>({
    whole: 0,
    numerator: 1,
    denominator: 2,
  });

  const [fraction2, setFraction2] = useState<Fraction>({
    whole: 0,
    numerator: 1,
    denominator: 3,
  });

  const [result, setResult] = useState<FractionResult | null>(null);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  // Calculate GCD using Euclidean algorithm
  const gcd = useCallback((a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }, []);

  // Simplify a fraction to lowest terms
  const simplifyFraction = useCallback(
    (num: number, den: number): { num: number; den: number } => {
      if (den === 0) return { num: 0, den: 1 };
      const divisor = gcd(num, den);
      return {
        num: num / divisor,
        den: den / divisor,
      };
    },
    [gcd]
  );

  // Convert mixed number to improper fraction
  const toImproper = (frac: Fraction): { num: number; den: number } => {
    return {
      num: frac.whole * frac.denominator + frac.numerator,
      den: frac.denominator,
    };
  };

  // Convert improper fraction to mixed number
  const toMixed = (
    num: number,
    den: number
  ): { whole: number; num: number; den: number } => {
    const whole = Math.floor(Math.abs(num) / den);
    const remainder = Math.abs(num) % den;
    const sign = num < 0 ? -1 : 1;

    return {
      whole: sign * whole,
      num: remainder,
      den: den,
    };
  };

  const calculateFractions = useCallback(() => {
    const steps: string[] = [];

    // Validate inputs
    if (fraction1.denominator === 0 || fraction2.denominator === 0) {
      toolState.actions.showMessage("Denominator cannot be zero!");
      return;
    }

    // Convert to improper fractions
    const f1 = toImproper(fraction1);
    const f2 = toImproper(fraction2);

    steps.push(
      `Fraction 1: ${fraction1.whole !== 0 ? `${fraction1.whole} ` : ""}${
        fraction1.numerator
      }/${fraction1.denominator} = ${f1.num}/${f1.den}`
    );
    steps.push(
      `Fraction 2: ${fraction2.whole !== 0 ? `${fraction2.whole} ` : ""}${
        fraction2.numerator
      }/${fraction2.denominator} = ${f2.num}/${f2.den}`
    );

    let resultNum = 0;
    let resultDen = 1;

    if (operation === "add") {
      // Find common denominator
      const commonDen = f1.den * f2.den;
      const num1 = f1.num * f2.den;
      const num2 = f2.num * f1.den;
      resultNum = num1 + num2;
      resultDen = commonDen;

      steps.push(`Common denominator: ${commonDen}`);
      steps.push(
        `${num1}/${commonDen} + ${num2}/${commonDen} = ${resultNum}/${resultDen}`
      );
    } else if (operation === "subtract") {
      const commonDen = f1.den * f2.den;
      const num1 = f1.num * f2.den;
      const num2 = f2.num * f1.den;
      resultNum = num1 - num2;
      resultDen = commonDen;

      steps.push(`Common denominator: ${commonDen}`);
      steps.push(
        `${num1}/${commonDen} - ${num2}/${commonDen} = ${resultNum}/${resultDen}`
      );
    } else if (operation === "multiply") {
      resultNum = f1.num * f2.num;
      resultDen = f1.den * f2.den;

      steps.push(`${f1.num} × ${f2.num} = ${resultNum}`);
      steps.push(`${f1.den} × ${f2.den} = ${resultDen}`);
      steps.push(`Result: ${resultNum}/${resultDen}`);
    } else if (operation === "divide") {
      if (f2.num === 0) {
        toolState.actions.showMessage("Cannot divide by zero!");
        return;
      }
      // Multiply by reciprocal
      resultNum = f1.num * f2.den;
      resultDen = f1.den * f2.num;

      steps.push(`Flip second fraction: ${f2.den}/${f2.num}`);
      steps.push(`${f1.num} × ${f2.den} = ${resultNum}`);
      steps.push(`${f1.den} × ${f2.num} = ${resultDen}`);
      steps.push(`Result: ${resultNum}/${resultDen}`);
    }

    // Simplify the result
    const simplified = simplifyFraction(resultNum, resultDen);
    if (simplified.num !== resultNum || simplified.den !== resultDen) {
      steps.push(`Simplified: ${simplified.num}/${simplified.den}`);
    }

    // Convert to mixed number
    const mixed = toMixed(simplified.num, simplified.den);
    const decimal = simplified.num / simplified.den;

    setResult({
      whole: mixed.whole,
      numerator: mixed.num,
      denominator: mixed.den,
      improperNumerator: simplified.num,
      improperDenominator: simplified.den,
      decimal,
      steps,
    });

    toolState.actions.showMessage("Calculation complete!");
  }, [fraction1, fraction2, operation, toolState.actions, simplifyFraction]);

  const updateFraction = (
    fractionNum: 1 | 2,
    field: keyof Fraction,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    const setter = fractionNum === 1 ? setFraction1 : setFraction2;

    setter((prev) => ({
      ...prev,
      [field]: field === "whole" ? numValue : Math.abs(numValue),
    }));
  };

  const clearAll = useCallback(() => {
    setFraction1({ whole: 0, numerator: 1, denominator: 2 });
    setFraction2({ whole: 0, numerator: 1, denominator: 3 });
    setResult(null);
  }, []);

  const formatFraction = (frac: Fraction): string => {
    if (frac.numerator === 0) {
      return frac.whole.toString();
    }
    if (frac.whole === 0) {
      return `${frac.numerator}/${frac.denominator}`;
    }
    return `${frac.whole} ${frac.numerator}/${frac.denominator}`;
  };

  const formatResult = (): string => {
    if (!result) return "";
    if (result.numerator === 0) {
      return result.whole.toString();
    }
    if (result.whole === 0) {
      return `${result.numerator}/${result.denominator}`;
    }
    return `${result.whole} ${result.numerator}/${result.denominator}`;
  };

  const getOperationSymbol = (): string => {
    switch (operation) {
      case "add":
        return "+";
      case "subtract":
        return "-";
      case "multiply":
        return "×";
      case "divide":
        return "÷";
    }
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
        title="Fraction Calculator"
        description="Add, subtract, multiply, and divide fractions with automatic simplification and step-by-step solutions."
      />

      <div className="flex flex-col gap-6">
        {/* Operation Selection */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Select Operation
            </Typography>
            <ToggleButtonGroup
              value={operation}
              exclusive
              onChange={(_, value) => {
                if (value) {
                  setOperation(value);
                  setResult(null);
                }
              }}
              fullWidth
            >
              <ToggleButton value="add">Add (+)</ToggleButton>
              <ToggleButton value="subtract">Subtract (-)</ToggleButton>
              <ToggleButton value="multiply">Multiply (×)</ToggleButton>
              <ToggleButton value="divide">Divide (÷)</ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
        </Card>

        {/* Input Card */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Enter Fractions
            </Typography>

            <div className="flex flex-col gap-6">
              {/* Fraction 1 */}
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Fraction 1
                </Typography>
                <div className="grid grid-cols-3 gap-3">
                  <TextField
                    fullWidth
                    label="Whole Number"
                    type="number"
                    value={fraction1.whole}
                    onChange={(e) => updateFraction(1, "whole", e.target.value)}
                    helperText="Optional"
                  />
                  <TextField
                    fullWidth
                    label="Numerator"
                    type="number"
                    value={fraction1.numerator}
                    onChange={(e) =>
                      updateFraction(1, "numerator", e.target.value)
                    }
                    inputProps={{ min: 0 }}
                  />
                  <TextField
                    fullWidth
                    label="Denominator"
                    type="number"
                    value={fraction1.denominator}
                    onChange={(e) =>
                      updateFraction(1, "denominator", e.target.value)
                    }
                    error={fraction1.denominator === 0}
                    helperText={
                      fraction1.denominator === 0 ? "Cannot be 0" : ""
                    }
                    inputProps={{ min: 1 }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <Typography variant="h5" className="font-bold text-blue-700">
                    {formatFraction(fraction1)}
                  </Typography>
                </div>
              </div>

              <Divider />

              {/* Fraction 2 */}
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Fraction 2
                </Typography>
                <div className="grid grid-cols-3 gap-3">
                  <TextField
                    fullWidth
                    label="Whole Number"
                    type="number"
                    value={fraction2.whole}
                    onChange={(e) => updateFraction(2, "whole", e.target.value)}
                    helperText="Optional"
                  />
                  <TextField
                    fullWidth
                    label="Numerator"
                    type="number"
                    value={fraction2.numerator}
                    onChange={(e) =>
                      updateFraction(2, "numerator", e.target.value)
                    }
                    inputProps={{ min: 0 }}
                  />
                  <TextField
                    fullWidth
                    label="Denominator"
                    type="number"
                    value={fraction2.denominator}
                    onChange={(e) =>
                      updateFraction(2, "denominator", e.target.value)
                    }
                    error={fraction2.denominator === 0}
                    helperText={
                      fraction2.denominator === 0 ? "Cannot be 0" : ""
                    }
                    inputProps={{ min: 1 }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <Typography variant="h5" className="font-bold text-blue-700">
                    {formatFraction(fraction2)}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={calculateFractions}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Calculate
              </button>
              <button
                onClick={clearAll}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Result Card */}
        {result && (
          <>
            <Card elevation={3} style={{ backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Result
                </Typography>

                <div className="text-center my-4 p-4 bg-white rounded-lg">
                  <Typography variant="h3" className="font-bold text-blue-700">
                    {formatFraction(fraction1)} {getOperationSymbol()}{" "}
                    {formatFraction(fraction2)} = {formatResult()}
                  </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <Typography variant="subtitle2" color="text.secondary">
                      Mixed Number
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-bold text-green-700"
                    >
                      {formatResult()}
                    </Typography>
                  </div>

                  <div className="p-4 bg-white rounded-lg">
                    <Typography variant="subtitle2" color="text.secondary">
                      Improper Fraction
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-bold text-purple-700"
                    >
                      {result.improperNumerator}/{result.improperDenominator}
                    </Typography>
                  </div>

                  <div className="p-4 bg-white rounded-lg">
                    <Typography variant="subtitle2" color="text.secondary">
                      Decimal
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-bold text-orange-700"
                    >
                      {result.decimal.toFixed(6)}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step-by-Step Solution */}
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Step-by-Step Solution
                </Typography>
                <div className="flex flex-col gap-2">
                  {result.steps.map((step, index) => (
                    <Alert key={index} severity="info" className="mb-1">
                      <Typography variant="body2">
                        <strong>Step {index + 1}:</strong> {step}
                      </Typography>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Usage Tips */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              How to Use
            </Typography>
            <Alert severity="info" className="mb-2">
              <strong>Mixed Numbers:</strong> Enter whole number (like 2 in
              &ldquo;2 1/2&rdquo;) in first field. Leave as 0 for simple
              fractions.
            </Alert>
            <Alert severity="success" className="mb-2">
              <strong>Operations:</strong> Add and subtract require common
              denominators (calculated automatically). Multiply numerators and
              denominators. Divide by flipping second fraction.
            </Alert>
            <Alert severity="warning">
              <strong>Results:</strong> All results are automatically simplified
              to lowest terms using the greatest common divisor.
            </Alert>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
