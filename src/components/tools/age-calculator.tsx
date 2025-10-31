"use client";

import { TextField, Typography, Card, CardContent, Grid } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import CakeIcon from "@mui/icons-material/Cake";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: number;
  dayOfWeek: string;
  nextMilestone: { age: number; days: number };
}

export default function AgeCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [birthDate, setBirthDate] = useState<string>("");
  const [calculateToDate, setCalculateToDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);

  const calculateAge = useCallback(() => {
    if (!birthDate) {
      setAgeResult(null);
      return;
    }

    const birth = new Date(birthDate);
    const target = new Date(calculateToDate);

    if (birth > target) {
      setAgeResult(null);
      return;
    }

    // Calculate years, months, days
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total time units
    const totalMilliseconds = target.getTime() - birth.getTime();
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.floor(totalMilliseconds / (1000 * 60));
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    // Days until next birthday
    const nextBirthdayYear =
      target.getMonth() > birth.getMonth() ||
      (target.getMonth() === birth.getMonth() &&
        target.getDate() >= birth.getDate())
        ? target.getFullYear() + 1
        : target.getFullYear();

    const nextBirthday = new Date(
      nextBirthdayYear,
      birth.getMonth(),
      birth.getDate()
    );
    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Day of week born
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[birth.getDay()];

    // Next milestone birthday
    const milestones = [18, 21, 25, 30, 40, 50, 60, 70, 80, 90, 100];
    const currentAge = years;
    const nextMilestone =
      milestones.find((m) => m > currentAge) || currentAge + 10;
    const milestoneDate = new Date(birth);
    milestoneDate.setFullYear(birth.getFullYear() + nextMilestone);
    const daysToMilestone = Math.ceil(
      (milestoneDate.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
    );

    setAgeResult({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday: daysUntilBirthday,
      dayOfWeek,
      nextMilestone: { age: nextMilestone, days: daysToMilestone },
    });
  }, [birthDate, calculateToDate]);

  useEffect(() => {
    calculateAge();
  }, [calculateAge]);

  const handleBirthDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBirthDate(event.target.value);
    },
    []
  );

  const handleCalculateToDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCalculateToDate(event.target.value);
    },
    []
  );

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
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
        title="Age Calculator"
        description="Calculate your exact age from birthdate in years, months, days, and more. Find days until your next birthday."
        exampleCode="Birthdate: January 1, 1990"
        exampleOutput={
          ageResult
            ? `Age: ${ageResult.years} years, ${ageResult.months} months, ${ageResult.days} days`
            : "Enter birthdate to calculate"
        }
      />

      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
        {/* Input Section */}
        <Card className="border border-gray-200">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <CakeIcon color="primary" fontSize="large" />
              <Typography variant="h6" color="primary">
                Date Selection
              </Typography>
            </div>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  type="date"
                  value={birthDate}
                  onChange={handleBirthDateChange}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    max: new Date().toISOString().split("T")[0],
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Calculate Age To"
                  variant="outlined"
                  fullWidth
                  type="date"
                  value={calculateToDate}
                  onChange={handleCalculateToDateChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {ageResult && (
          <>
            {/* Main Age Display */}
            <Card className="border-2 border-blue-500">
              <CardContent className="text-center">
                <Typography variant="subtitle2" className="text-gray-600 mb-2">
                  Your Exact Age
                </Typography>
                <Typography
                  variant="h3"
                  className="font-bold text-blue-600 mb-2"
                >
                  {ageResult.years} Years, {ageResult.months} Months,{" "}
                  {ageResult.days} Days
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  You were born on a {ageResult.dayOfWeek}
                </Typography>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <Grid container spacing={3}>
              <Grid item xs={6} md={3}>
                <Card className="border border-gray-200 h-full">
                  <CardContent className="text-center">
                    <Typography
                      variant="subtitle2"
                      className="text-gray-600 mb-1"
                    >
                      Total Days
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-bold text-green-600"
                    >
                      {formatNumber(ageResult.totalDays)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} md={3}>
                <Card className="border border-gray-200 h-full">
                  <CardContent className="text-center">
                    <Typography
                      variant="subtitle2"
                      className="text-gray-600 mb-1"
                    >
                      Total Hours
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-bold text-purple-600"
                    >
                      {formatNumber(ageResult.totalHours)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} md={3}>
                <Card className="border border-gray-200 h-full">
                  <CardContent className="text-center">
                    <Typography
                      variant="subtitle2"
                      className="text-gray-600 mb-1"
                    >
                      Total Minutes
                    </Typography>
                    <Typography
                      variant="h5"
                      className="font-bold text-orange-600"
                    >
                      {formatNumber(ageResult.totalMinutes)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} md={3}>
                <Card className="border border-gray-200 h-full">
                  <CardContent className="text-center">
                    <Typography
                      variant="subtitle2"
                      className="text-gray-600 mb-1"
                    >
                      Total Seconds
                    </Typography>
                    <Typography variant="h5" className="font-bold text-red-600">
                      {formatNumber(ageResult.totalSeconds)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Birthday Info */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card className="border-2 border-green-500">
                  <CardContent className="text-center">
                    <Typography variant="h6" className="text-gray-700 mb-2">
                      🎂 Next Birthday
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-bold text-green-600 mb-1"
                    >
                      {ageResult.nextBirthday === 0
                        ? "Today!"
                        : `${ageResult.nextBirthday} Days`}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {ageResult.nextBirthday === 0
                        ? "Happy Birthday! 🎉"
                        : `Until you turn ${ageResult.years + 1}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card className="border-2 border-purple-500">
                  <CardContent className="text-center">
                    <Typography variant="h6" className="text-gray-700 mb-2">
                      🎯 Next Milestone
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-bold text-purple-600 mb-1"
                    >
                      Age {ageResult.nextMilestone.age}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      In {formatNumber(ageResult.nextMilestone.days)} days
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Fun Facts */}
            <Card className="border border-gray-200">
              <CardContent>
                <Typography variant="h6" className="mb-3 text-gray-800">
                  📊 Fun Facts About Your Age
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <Typography
                        variant="body2"
                        className="text-gray-700 font-semibold"
                      >
                        Months Alive
                      </Typography>
                      <Typography variant="h6" className="text-blue-700">
                        {ageResult.years * 12 + ageResult.months} months
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="bg-green-50 rounded-lg p-3">
                      <Typography
                        variant="body2"
                        className="text-gray-700 font-semibold"
                      >
                        Weeks Alive
                      </Typography>
                      <Typography variant="h6" className="text-green-700">
                        {formatNumber(Math.floor(ageResult.totalDays / 7))}{" "}
                        weeks
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <Typography
                        variant="body2"
                        className="text-gray-700 font-semibold"
                      >
                        Birthdays Celebrated
                      </Typography>
                      <Typography variant="h6" className="text-purple-700">
                        {ageResult.years} birthdays
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <Typography
                        variant="body2"
                        className="text-gray-700 font-semibold"
                      >
                        Average Heart Beats
                      </Typography>
                      <Typography variant="h6" className="text-orange-700">
                        ~{formatNumber(ageResult.totalDays * 100000)}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}

        {!ageResult && birthDate && (
          <Card className="border border-gray-200">
            <CardContent className="text-center py-8">
              <Typography variant="h6" className="text-gray-600">
                Please enter a valid birth date to calculate your age
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
