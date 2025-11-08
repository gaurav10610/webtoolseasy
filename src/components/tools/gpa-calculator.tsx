"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { useState, useCallback } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import { ButtonWithHandler } from "../lib/buttons";
import SchoolIcon from "@mui/icons-material/School";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

interface GPAResult {
  gpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  gradeDistribution: Record<string, number>;
}

const gradePoints: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

const grades = Object.keys(gradePoints);

export default function GPACalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "", grade: "A", credits: 3 },
  ]);
  const [result, setResult] = useState<GPAResult | null>(null);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const addCourse = useCallback(() => {
    const newId = Math.max(...courses.map((c) => c.id), 0) + 1;
    setCourses([...courses, { id: newId, name: "", grade: "A", credits: 3 }]);
  }, [courses]);

  const removeCourse = useCallback(
    (id: number) => {
      if (courses.length > 1) {
        setCourses(courses.filter((c) => c.id !== id));
      } else {
        toolState.actions.showMessage("You must have at least one course!");
      }
    },
    [courses, toolState.actions]
  );

  const updateCourse = useCallback(
    (id: number, field: keyof Course, value: string | number) => {
      setCourses(
        courses.map((c) => (c.id === id ? { ...c, [field]: value } : c))
      );
    },
    [courses]
  );

  const calculateGPA = useCallback(() => {
    const validCourses = courses.filter((c) => c.credits > 0);

    if (validCourses.length === 0) {
      toolState.actions.showMessage(
        "Please add at least one course with credits!"
      );
      return;
    }

    let totalQualityPoints = 0;
    let totalCredits = 0;
    const gradeDistribution: Record<string, number> = {};

    validCourses.forEach((course) => {
      const points = gradePoints[course.grade] || 0;
      const qualityPoints = points * course.credits;
      totalQualityPoints += qualityPoints;
      totalCredits += course.credits;

      gradeDistribution[course.grade] =
        (gradeDistribution[course.grade] || 0) + 1;
    });

    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    setResult({
      gpa,
      totalCredits,
      totalQualityPoints,
      gradeDistribution,
    });

    toolState.actions.showMessage("GPA calculated successfully!");
  }, [courses, toolState.actions]);

  const clearAll = useCallback(() => {
    setCourses([{ id: 1, name: "", grade: "A", credits: 3 }]);
    setResult(null);
  }, []);

  const getGPALevel = (gpa: number): { label: string; color: string } => {
    if (gpa >= 3.9) return { label: "Summa Cum Laude", color: "#4caf50" };
    if (gpa >= 3.7) return { label: "Magna Cum Laude", color: "#66bb6a" };
    if (gpa >= 3.5) return { label: "Cum Laude", color: "#81c784" };
    if (gpa >= 3.0) return { label: "Good Standing", color: "#2196f3" };
    if (gpa >= 2.0) return { label: "Satisfactory", color: "#ff9800" };
    return { label: "Below Standard", color: "#f44336" };
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
        title="GPA Calculator"
        description="Calculate your Grade Point Average (GPA) with course grades and credit hours. Track semester and cumulative GPA for academic planning."
      />

      <div className="flex flex-col gap-6">
        {/* Course Entry Card */}
        <Card elevation={2}>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <Typography variant="h6">Enter Your Courses</Typography>
              <ButtonWithHandler
                buttonText="Add Course"
                onClick={addCourse}
                startIcon={<AddCircleIcon />}
                size="small"
                color="success"
              />
            </div>

            <Divider sx={{ mb: 3 }} />

            <div className="flex flex-col gap-3">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="flex flex-col md:flex-row gap-3 p-3 border-2 border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <TextField
                      fullWidth
                      size="small"
                      label={`Course ${index + 1} Name`}
                      value={course.name}
                      onChange={(e) =>
                        updateCourse(course.id, "name", e.target.value)
                      }
                      placeholder="e.g., Calculus I"
                    />
                  </div>

                  <div className="w-full md:w-32">
                    <FormControl fullWidth size="small">
                      <InputLabel>Grade</InputLabel>
                      <Select
                        value={course.grade}
                        label="Grade"
                        onChange={(e) =>
                          updateCourse(course.id, "grade", e.target.value)
                        }
                      >
                        {grades.map((grade) => (
                          <MenuItem key={grade} value={grade}>
                            {grade} ({gradePoints[grade]})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="w-full md:w-32">
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="Credits"
                      value={course.credits}
                      onChange={(e) =>
                        updateCourse(
                          course.id,
                          "credits",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      inputProps={{ min: 0, max: 12, step: 0.5 }}
                    />
                  </div>

                  <div className="flex items-center">
                    <IconButton
                      color="error"
                      onClick={() => removeCourse(course.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <ButtonWithHandler
                buttonText="Calculate GPA"
                onClick={calculateGPA}
                startIcon={<SchoolIcon />}
                size="large"
              />
              <ButtonWithHandler
                buttonText="Clear All"
                onClick={clearAll}
                size="large"
                variant="outlined"
                color="secondary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card elevation={3} sx={{ bgcolor: "primary.light" }}>
            <CardContent>
              <Typography
                variant="h6"
                color="white"
                gutterBottom
                sx={{ mb: 3 }}
              >
                GPA Results
              </Typography>

              {/* Main GPA Display */}
              <div className="bg-white p-6 rounded-lg mb-4 text-center">
                <Typography variant="caption" color="text.secondary">
                  Your GPA
                </Typography>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{
                    my: 1,
                    color: getGPALevel(result.gpa).color,
                  }}
                >
                  {result.gpa.toFixed(2)}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: getGPALevel(result.gpa).color }}
                  fontWeight="bold"
                >
                  {getGPALevel(result.gpa).label}
                </Typography>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white p-3 rounded-lg">
                  <Typography variant="caption" color="text.secondary">
                    Total Credits
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {result.totalCredits.toFixed(1)}
                  </Typography>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <Typography variant="caption" color="text.secondary">
                    Quality Points
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {result.totalQualityPoints.toFixed(2)}
                  </Typography>
                </div>
              </div>

              {/* Grade Distribution */}
              <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)" }} />
              <Typography
                variant="subtitle1"
                color="white"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Grade Distribution
              </Typography>
              <div className="flex flex-wrap gap-2">
                {Object.entries(result.gradeDistribution)
                  .sort(([a], [b]) => grades.indexOf(a) - grades.indexOf(b))
                  .map(([grade, count]) => (
                    <div key={grade} className="bg-white px-3 py-2 rounded-lg">
                      <Typography variant="body2" fontWeight="bold">
                        {grade}: {count} {count === 1 ? "course" : "courses"}
                      </Typography>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Reference */}
        <Card elevation={1}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              GPA Scale Reference
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 border-2 border-gray-200 rounded-lg">
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="success.main"
                >
                  A (4.0)
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Excellent
                </Typography>
              </div>
              <div className="p-3 border-2 border-gray-200 rounded-lg">
                <Typography variant="body2" fontWeight="bold" color="info.main">
                  B (3.0)
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Good
                </Typography>
              </div>
              <div className="p-3 border-2 border-gray-200 rounded-lg">
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="warning.main"
                >
                  C (2.0)
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Average
                </Typography>
              </div>
              <div className="p-3 border-2 border-gray-200 rounded-lg">
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="error.main"
                >
                  D (1.0)
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Below Average
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GPA Benchmarks */}
        <Card elevation={1} sx={{ bgcolor: "grey.50" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Academic Benchmarks
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex justify-between items-center p-2 border-b">
                <Typography variant="body2">Dean&apos;s List</Typography>
                <Typography variant="body2" fontWeight="bold">
                  3.5+
                </Typography>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <Typography variant="body2">Cum Laude</Typography>
                <Typography variant="body2" fontWeight="bold">
                  3.5+
                </Typography>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <Typography variant="body2">Magna Cum Laude</Typography>
                <Typography variant="body2" fontWeight="bold">
                  3.7+
                </Typography>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <Typography variant="body2">Summa Cum Laude</Typography>
                <Typography variant="body2" fontWeight="bold">
                  3.9+
                </Typography>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <Typography variant="body2">Good Standing</Typography>
                <Typography variant="body2" fontWeight="bold">
                  2.0+
                </Typography>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <Typography variant="body2">Academic Probation</Typography>
                <Typography variant="body2" fontWeight="bold" color="error">
                  Below 2.0
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Note:</strong> This calculator uses the standard 4.0 GPA
            scale with plus/minus grading. Different institutions may use
            different scales. Always verify your school&apos;s specific grading
            system and GPA calculation method.
          </Typography>
        </Alert>
      </div>
    </ToolLayout>
  );
}
