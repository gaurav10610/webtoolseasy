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
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useState, useCallback } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import { ButtonWithHandler } from "../lib/buttons";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "very" | "extra";
type Goal = "loss" | "maintain" | "gain";

interface CalorieResult {
  bmr: number;
  tdee: number;
  weightLoss: number;
  maintenance: number;
  weightGain: number;
  protein: number;
  carbs: number;
  fats: number;
}

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

export default function CalorieCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<string>("30");
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("170");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [result, setResult] = useState<CalorieResult | null>(null);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateCalories = useCallback(() => {
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      toolState.actions.showMessage("Please enter a valid age (1-120)!");
      return;
    }

    if (isNaN(weightNum) || weightNum < 20 || weightNum > 300) {
      toolState.actions.showMessage("Please enter a valid weight (20-300 kg)!");
      return;
    }

    if (isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
      toolState.actions.showMessage(
        "Please enter a valid height (100-250 cm)!"
      );
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityMultipliers[activityLevel];

    // Calculate calorie targets for different goals
    const weightLoss = tdee - 500; // 0.5 kg per week loss
    const maintenance = tdee;
    const weightGain = tdee + 300; // Lean muscle gain

    // Calculate macros (moderate approach)
    const protein = weightNum * 2.2; // 2.2g per kg
    const fats = (maintenance * 0.25) / 9; // 25% of calories from fat
    const carbs = (maintenance - protein * 4 - fats * 9) / 4; // Remaining from carbs

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: Math.round(weightLoss),
      maintenance: Math.round(maintenance),
      weightGain: Math.round(weightGain),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    });

    toolState.actions.showMessage("Calories calculated successfully!");
  }, [age, weight, height, gender, activityLevel, toolState.actions]);

  const getRecommendation = useCallback((goal: Goal, result: CalorieResult) => {
    switch (goal) {
      case "loss":
        return {
          calories: result.weightLoss,
          title: "Weight Loss Goal",
          description: `Consume approximately ${result.weightLoss} calories daily for gradual weight loss of ~0.5 kg per week. Combine with regular exercise for best results.`,
          color: "error" as const,
        };
      case "maintain":
        return {
          calories: result.maintenance,
          title: "Weight Maintenance",
          description: `Maintain your current weight by consuming approximately ${result.maintenance} calories daily. Adjust as needed based on activity changes.`,
          color: "success" as const,
        };
      case "gain":
        return {
          calories: result.weightGain,
          title: "Muscle Gain Goal",
          description: `Consume approximately ${result.weightGain} calories daily for lean muscle gain. Pair with strength training and adequate protein for optimal results.`,
          color: "primary" as const,
        };
    }
  }, []);

  const clearCalculation = useCallback(() => {
    setAge("30");
    setWeight("70");
    setHeight("170");
    setGender("male");
    setActivityLevel("moderate");
    setGoal("maintain");
    setResult(null);
  }, []);

  const activityLabels = {
    sedentary: "Sedentary (little/no exercise)",
    light: "Lightly Active (1-3 days/week)",
    moderate: "Moderately Active (3-5 days/week)",
    very: "Very Active (6-7 days/week)",
    extra: "Extra Active (athlete/physical job)",
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
        title="Calorie Calculator"
        description="Calculate your daily calorie needs, BMR, and TDEE. Get personalized calorie targets for weight loss, maintenance, or muscle gain."
      />

      <div className="flex flex-col gap-6">
        {/* Input Card */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Your Information
            </Typography>

            <div className="flex flex-col gap-4">
              {/* Gender Selection */}
              <div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Gender
                </Typography>
                <ToggleButtonGroup
                  value={gender}
                  exclusive
                  onChange={(_, value) => value && setGender(value)}
                  fullWidth
                >
                  <ToggleButton value="male">Male</ToggleButton>
                  <ToggleButton value="female">Female</ToggleButton>
                </ToggleButtonGroup>
              </div>

              {/* Age, Weight, Height */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">years</InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 1, max: 120 }}
                />
                <TextField
                  fullWidth
                  label="Weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 20, max: 300, step: 0.1 }}
                />
                <TextField
                  fullWidth
                  label="Height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 100, max: 250 }}
                />
              </div>

              {/* Activity Level */}
              <FormControl fullWidth>
                <InputLabel>Activity Level</InputLabel>
                <Select
                  value={activityLevel}
                  label="Activity Level"
                  onChange={(e) =>
                    setActivityLevel(e.target.value as ActivityLevel)
                  }
                >
                  {Object.entries(activityLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Goal Selection */}
              <div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Your Goal
                </Typography>
                <ToggleButtonGroup
                  value={goal}
                  exclusive
                  onChange={(_, value) => value && setGoal(value)}
                  fullWidth
                >
                  <ToggleButton value="loss">Weight Loss</ToggleButton>
                  <ToggleButton value="maintain">Maintain</ToggleButton>
                  <ToggleButton value="gain">Muscle Gain</ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ButtonWithHandler
                  buttonText="Calculate Calories"
                  onClick={calculateCalories}
                  startIcon={<LocalFireDepartmentIcon />}
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
            {/* Main Recommendation */}
            <Card
              elevation={3}
              sx={{ bgcolor: `${getRecommendation(goal, result).color}.light` }}
            >
              <CardContent>
                <Typography variant="h6" color="white" gutterBottom>
                  {getRecommendation(goal, result).title}
                </Typography>
                <div className="bg-white p-6 rounded-lg mb-3 text-center">
                  <Typography variant="caption" color="text.secondary">
                    Daily Calorie Target
                  </Typography>
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    color={`${getRecommendation(goal, result).color}.main`}
                    sx={{ my: 1 }}
                  >
                    {getRecommendation(goal, result).calories}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    calories per day
                  </Typography>
                </div>
                <Typography variant="body2" color="white">
                  {getRecommendation(goal, result).description}
                </Typography>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Your Calorie Breakdown
                </Typography>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3 border-2 border-gray-200 rounded-lg">
                    <Typography variant="caption" color="text.secondary">
                      BMR (Base Metabolism)
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {result.bmr}
                    </Typography>
                    <Typography variant="caption">cal/day</Typography>
                  </div>

                  <div className="p-3 border-2 border-gray-200 rounded-lg">
                    <Typography variant="caption" color="text.secondary">
                      TDEE (Maintenance)
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {result.maintenance}
                    </Typography>
                    <Typography variant="caption">cal/day</Typography>
                  </div>

                  <div className="p-3 border-2 border-gray-200 rounded-lg">
                    <Typography variant="caption" color="text.secondary">
                      Weight Loss Target
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="error">
                      {result.weightLoss}
                    </Typography>
                    <Typography variant="caption">cal/day</Typography>
                  </div>

                  <div className="p-3 border-2 border-gray-200 rounded-lg">
                    <Typography variant="caption" color="text.secondary">
                      Weight Gain Target
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {result.weightGain}
                    </Typography>
                    <Typography variant="caption">cal/day</Typography>
                  </div>

                  <div className="p-3 border-2 border-blue-300 rounded-lg bg-blue-50">
                    <Typography variant="caption" color="text.secondary">
                      Activity Multiplier
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {activityMultipliers[activityLevel]}x
                    </Typography>
                    <Typography variant="caption">
                      {activityLabels[activityLevel]}
                    </Typography>
                  </div>
                </div>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Recommended Macros (for {result.maintenance} cal)
                </Typography>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <FitnessCenterIcon color="error" sx={{ mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold" color="error">
                      {result.protein}g
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Protein
                    </Typography>
                  </div>

                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {result.carbs}g
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Carbs
                    </Typography>
                  </div>

                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="warning.main"
                    >
                      {result.fats}g
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Fats
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
            <strong>Formula Used:</strong> This calculator uses the Mifflin-St
            Jeor equation, which is one of the most accurate formulas for
            calculating BMR. Results are estimates - individual metabolism
            varies.
          </Typography>
        </Alert>

        <Alert severity="warning">
          <Typography variant="body2">
            <strong>Safe Weight Loss:</strong> Never drop below 1200 calories
            (women) or 1500 calories (men) without medical supervision. Extreme
            calorie restriction can lead to nutritional deficiencies and
            metabolic issues.
          </Typography>
        </Alert>
      </div>
    </ToolLayout>
  );
}
