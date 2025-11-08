"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Alert,
} from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import { ButtonWithHandler } from "../lib/buttons";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface DateDifference {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  workingDays: number;
  weeks: number;
  hours: number;
}

export default function DateCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [tabValue, setTabValue] = useState(0);

  // Date Difference tab
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [difference, setDifference] = useState<DateDifference | null>(null);

  // Add/Subtract Days tab
  const [baseDate, setBaseDate] = useState<string>("");
  const [daysToAdd, setDaysToAdd] = useState<number>(0);
  const [resultDate, setResultDate] = useState<string>("");

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateDateDifference = useCallback(() => {
    if (!startDate || !endDate) {
      toolState.actions.showMessage("Please select both dates!");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      toolState.actions.showMessage("Start date must be before end date!");
      return;
    }

    // Calculate total difference
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffTime / (1000 * 60 * 60));

    // Calculate years, months, days
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate working days (excluding weekends)
    let workingDays = 0;
    const currentDate = new Date(start);
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const weeks = Math.floor(totalDays / 7);

    setDifference({
      totalDays,
      years,
      months,
      days,
      workingDays,
      weeks,
      hours,
    });

    toolState.actions.showMessage("Date difference calculated!");
  }, [startDate, endDate, toolState.actions]);

  const calculateResultDate = useCallback(
    (isAdd: boolean) => {
      if (!baseDate) {
        toolState.actions.showMessage("Please select a base date!");
        return;
      }

      const base = new Date(baseDate);
      const daysToModify = isAdd ? daysToAdd : -daysToAdd;
      base.setDate(base.getDate() + daysToModify);

      const result = base.toISOString().split("T")[0];
      setResultDate(result);

      toolState.actions.showMessage(
        `Date ${isAdd ? "added" : "subtracted"} successfully!`
      );
    },
    [baseDate, daysToAdd, toolState.actions]
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const todayDate = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

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
        title="Date Calculator"
        description="Calculate date differences, add or subtract days, and count working days. Perfect for project planning and event management."
      />

      <div className="flex flex-col gap-6">
        {/* Tabs */}
        <Card elevation={2}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Date Difference" icon={<CalendarTodayIcon />} />
            <Tab label="Add/Subtract Days" icon={<AddIcon />} />
          </Tabs>

          <CardContent>
            {/* Date Difference Tab */}
            {tabValue === 0 && (
              <div className="flex flex-col gap-4">
                <Typography variant="h6" gutterBottom>
                  Calculate Difference Between Dates
                </Typography>

                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ max: todayDate }}
                />

                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />

                <ButtonWithHandler
                  buttonText="Calculate Difference"
                  onClick={calculateDateDifference}
                  startIcon={<CalendarTodayIcon />}
                  size="large"
                  className="w-full"
                />

                {difference && (
                  <Card elevation={3} sx={{ bgcolor: "success.light", mt: 2 }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="white"
                        gutterBottom
                        sx={{ mb: 3 }}
                      >
                        Date Difference Results
                      </Typography>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded-lg">
                          <Typography variant="caption" color="text.secondary">
                            Total Days
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {difference.totalDays}
                          </Typography>
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                          <Typography variant="caption" color="text.secondary">
                            Working Days
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {difference.workingDays}
                          </Typography>
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                          <Typography variant="caption" color="text.secondary">
                            Weeks
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {difference.weeks}
                          </Typography>
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                          <Typography variant="caption" color="text.secondary">
                            Years
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {difference.years}
                          </Typography>
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                          <Typography variant="caption" color="text.secondary">
                            Months
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {difference.months}
                          </Typography>
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                          <Typography variant="caption" color="text.secondary">
                            Days
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {difference.days}
                          </Typography>
                        </div>
                      </div>

                      <Divider
                        sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)" }}
                      />

                      <Typography variant="body2" color="white">
                        <strong>Formatted:</strong> {difference.years} years,{" "}
                        {difference.months} months, {difference.days} days
                      </Typography>
                      <Typography variant="body2" color="white">
                        <strong>Hours:</strong>{" "}
                        {difference.hours.toLocaleString()} hours
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Add/Subtract Days Tab */}
            {tabValue === 1 && (
              <div className="flex flex-col gap-4">
                <Typography variant="h6" gutterBottom>
                  Add or Subtract Days
                </Typography>

                <TextField
                  fullWidth
                  label="Base Date"
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  label="Number of Days"
                  type="number"
                  value={daysToAdd}
                  onChange={(e) =>
                    setDaysToAdd(Math.abs(Number(e.target.value)))
                  }
                  inputProps={{ min: 0 }}
                  helperText="Enter the number of days to add or subtract"
                />

                <div className="grid grid-cols-2 gap-3">
                  <ButtonWithHandler
                    buttonText="Add Days"
                    onClick={() => calculateResultDate(true)}
                    startIcon={<AddIcon />}
                    size="large"
                    color="success"
                  />
                  <ButtonWithHandler
                    buttonText="Subtract Days"
                    onClick={() => calculateResultDate(false)}
                    startIcon={<RemoveIcon />}
                    size="large"
                    color="error"
                  />
                </div>

                {resultDate && (
                  <Card elevation={3} sx={{ bgcolor: "info.light", mt: 2 }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="white"
                        gutterBottom
                        sx={{ mb: 2 }}
                      >
                        Result Date
                      </Typography>

                      <div className="bg-white p-4 rounded-lg">
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          gutterBottom
                          color="primary"
                        >
                          {resultDate}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {formatDate(resultDate)}
                        </Typography>
                      </div>

                      <Divider
                        sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)" }}
                      />

                      <Typography variant="body2" color="white">
                        <strong>Base Date:</strong> {formatDate(baseDate)}
                      </Typography>
                      <Typography variant="body2" color="white">
                        <strong>Operation:</strong> {daysToAdd} days{" "}
                        {tabValue === 1 ? "added/subtracted" : ""}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card elevation={1}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => {
                  setStartDate(todayDate);
                  setTabValue(0);
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="body2" fontWeight="bold">
                  From Today
                </Typography>
              </button>
              <button
                onClick={() => {
                  const firstDay = new Date(new Date().getFullYear(), 0, 1)
                    .toISOString()
                    .split("T")[0];
                  setStartDate(firstDay);
                  setEndDate(todayDate);
                  setTabValue(0);
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="body2" fontWeight="bold">
                  Year to Date
                </Typography>
              </button>
              <button
                onClick={() => {
                  setBaseDate(todayDate);
                  setDaysToAdd(30);
                  setTabValue(1);
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="body2" fontWeight="bold">
                  +30 Days
                </Typography>
              </button>
              <button
                onClick={() => {
                  setBaseDate(todayDate);
                  setDaysToAdd(90);
                  setTabValue(1);
                }}
                className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
              >
                <Typography variant="body2" fontWeight="bold">
                  +90 Days
                </Typography>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Working Days:</strong> Excludes Saturdays and Sundays. The
            calculator automatically handles leap years, month-end dates, and
            varying month lengths for accurate results.
          </Typography>
        </Alert>
      </div>
    </ToolLayout>
  );
}
