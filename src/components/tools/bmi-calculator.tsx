"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Chip,
  Grid,
} from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

type UnitSystem = "metric" | "imperial";

interface BMIResult {
  bmi: number;
  category: string;
  categoryColor:
    | "default"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "primary"
    | "secondary";
  healthRisk: string;
  recommendation: string;
}

export default function BMICalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(7);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateBMI = useCallback(
    (weight: number, height: number, isMetric: boolean): BMIResult => {
      let bmi: number;

      if (isMetric) {
        // BMI = weight(kg) / height(m)²
        const heightM = height / 100;
        bmi = weight / (heightM * heightM);
      } else {
        // BMI = (weight(lbs) / height(in)²) × 703
        bmi = (weight / (height * height)) * 703;
      }

      // Determine category
      let category: string;
      let categoryColor: BMIResult["categoryColor"];
      let healthRisk: string;
      let recommendation: string;

      if (bmi < 18.5) {
        category = "Underweight";
        categoryColor = "info";
        healthRisk =
          "Possible malnutrition, weak immune system, osteoporosis risk";
        recommendation =
          "Consider consulting a nutritionist to develop a healthy weight gain plan. Focus on nutrient-dense foods and strength training.";
      } else if (bmi >= 18.5 && bmi < 25) {
        category = "Normal Weight";
        categoryColor = "success";
        healthRisk = "Low risk of weight-related health problems";
        recommendation =
          "Maintain your current healthy lifestyle with balanced diet and regular exercise. Keep monitoring your weight periodically.";
      } else if (bmi >= 25 && bmi < 30) {
        category = "Overweight";
        categoryColor = "warning";
        healthRisk =
          "Increased risk of heart disease, type 2 diabetes, high blood pressure";
        recommendation =
          "Consider adopting a balanced diet and increasing physical activity. Aim for gradual, sustainable weight loss of 0.5-1 kg per week.";
      } else if (bmi >= 30 && bmi < 35) {
        category = "Obese (Class I)";
        categoryColor = "error";
        healthRisk =
          "High risk of cardiovascular disease, diabetes, joint problems";
        recommendation =
          "Consult a healthcare provider for a personalized weight management plan. Combine diet modifications with regular exercise.";
      } else if (bmi >= 35 && bmi < 40) {
        category = "Obese (Class II)";
        categoryColor = "error";
        healthRisk =
          "Very high risk of serious health complications including heart disease";
        recommendation =
          "Seek medical guidance immediately. A comprehensive program including diet, exercise, and possibly medication may be needed.";
      } else {
        category = "Obese (Class III)";
        categoryColor = "error";
        healthRisk =
          "Extremely high risk of life-threatening health conditions";
        recommendation =
          "Urgent medical consultation required. May need intensive intervention including medication or surgical options under medical supervision.";
      }

      return {
        bmi: parseFloat(bmi.toFixed(1)),
        category,
        categoryColor,
        healthRisk,
        recommendation,
      };
    },
    []
  );

  const bmiResult = useMemo(() => {
    if (unitSystem === "metric") {
      if (weightKg > 0 && heightCm > 0) {
        return calculateBMI(weightKg, heightCm, true);
      }
    } else {
      const totalHeightIn = heightFt * 12 + heightIn;
      if (weightLbs > 0 && totalHeightIn > 0) {
        return calculateBMI(weightLbs, totalHeightIn, false);
      }
    }
    return null;
  }, [
    unitSystem,
    weightKg,
    heightCm,
    weightLbs,
    heightFt,
    heightIn,
    calculateBMI,
  ]);

  const handleUnitSystemChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newSystem: UnitSystem | null) => {
      if (newSystem !== null) {
        setUnitSystem(newSystem);
      }
    },
    []
  );

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
        title="BMI Calculator - Body Mass Index"
        description="Calculate your BMI instantly with our free online calculator. Check if you're underweight, normal, overweight, or obese and get health recommendations."
      />

      <div className="flex flex-col gap-6">
        {/* Unit System Toggle */}
        <Card elevation={2}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Typography variant="h6" gutterBottom>
                Select Unit System
              </Typography>
              <ToggleButtonGroup
                value={unitSystem}
                exclusive
                onChange={handleUnitSystemChange}
                fullWidth
                color="primary"
              >
                <ToggleButton value="metric">Metric (kg, cm)</ToggleButton>
                <ToggleButton value="imperial">
                  Imperial (lbs, ft/in)
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Enter Your Details
            </Typography>

            {unitSystem === "metric" ? (
              <div className="flex flex-col gap-4">
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  inputProps={{ min: 1, max: 300, step: 0.1 }}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  inputProps={{ min: 50, max: 250, step: 0.1 }}
                  variant="outlined"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <TextField
                  fullWidth
                  label="Weight (lbs)"
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  inputProps={{ min: 1, max: 700, step: 0.1 }}
                  variant="outlined"
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Height (feet)"
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      inputProps={{ min: 1, max: 8 }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Height (inches)"
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      inputProps={{ min: 0, max: 11 }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {bmiResult && (
          <>
            <Card
              elevation={3}
              sx={{
                bgcolor:
                  bmiResult.categoryColor === "success"
                    ? "success.main"
                    : bmiResult.categoryColor === "warning"
                    ? "warning.main"
                    : bmiResult.categoryColor === "error"
                    ? "error.main"
                    : "info.main",
                color: "white",
              }}
            >
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6">Your BMI Result</Typography>
                  <FitnessCenterIcon fontSize="large" />
                </div>

                <div className="flex flex-col gap-1 mb-4">
                  <Typography variant="h2" fontWeight="bold">
                    {bmiResult.bmi}
                  </Typography>
                  <div className="flex items-center gap-2 mt-2">
                    <Chip
                      label={bmiResult.category}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.9)",
                        color: "text.primary",
                        fontWeight: "bold",
                      }}
                      size="medium"
                    />
                  </div>
                </div>

                <Typography variant="body2" sx={{ opacity: 0.9, mt: 2 }}>
                  <strong>Health Risk:</strong> {bmiResult.healthRisk}
                </Typography>
              </CardContent>
            </Card>

            {/* Recommendation Card */}
            <Alert
              severity={
                bmiResult.categoryColor === "success"
                  ? "success"
                  : bmiResult.categoryColor === "warning"
                  ? "warning"
                  : bmiResult.categoryColor === "error"
                  ? "error"
                  : "info"
              }
              icon={false}
            >
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Recommendation:
              </Typography>
              <Typography variant="body2">
                {bmiResult.recommendation}
              </Typography>
            </Alert>

            {/* BMI Chart Reference */}
            <Card elevation={1} sx={{ bgcolor: "grey.50" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  BMI Categories
                </Typography>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <Typography variant="body2">Underweight</Typography>
                    <Typography variant="body2" color="text.secondary">
                      &lt; 18.5
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="body2" fontWeight="bold">
                      Normal Weight
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      18.5 - 24.9
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="body2">Overweight</Typography>
                    <Typography variant="body2" color="text.secondary">
                      25 - 29.9
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="body2">Obese (Class I)</Typography>
                    <Typography variant="body2" color="text.secondary">
                      30 - 34.9
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="body2">Obese (Class II)</Typography>
                    <Typography variant="body2" color="text.secondary">
                      35 - 39.9
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="body2">Obese (Class III)</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ≥ 40
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Disclaimer */}
        <Alert severity="warning">
          <Typography variant="body2">
            <strong>Disclaimer:</strong> BMI is a screening tool and not a
            diagnostic measure. It doesn&apos;t account for muscle mass, bone
            density, age, or gender. For accurate health assessment, consult
            healthcare professionals. This tool is for informational purposes
            only.
          </Typography>
        </Alert>
      </div>
    </ToolLayout>
  );
}
