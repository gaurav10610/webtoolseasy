"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

type ConversionCategory =
  | "length"
  | "weight"
  | "temperature"
  | "area"
  | "volume"
  | "speed";

interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const conversionData: Record<ConversionCategory, Record<string, Unit>> = {
  length: {
    meter: {
      name: "Meter",
      symbol: "m",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    kilometer: {
      name: "Kilometer",
      symbol: "km",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    centimeter: {
      name: "Centimeter",
      symbol: "cm",
      toBase: (v) => v / 100,
      fromBase: (v) => v * 100,
    },
    millimeter: {
      name: "Millimeter",
      symbol: "mm",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    mile: {
      name: "Mile",
      symbol: "mi",
      toBase: (v) => v * 1609.344,
      fromBase: (v) => v / 1609.344,
    },
    yard: {
      name: "Yard",
      symbol: "yd",
      toBase: (v) => v * 0.9144,
      fromBase: (v) => v / 0.9144,
    },
    foot: {
      name: "Foot",
      symbol: "ft",
      toBase: (v) => v * 0.3048,
      fromBase: (v) => v / 0.3048,
    },
    inch: {
      name: "Inch",
      symbol: "in",
      toBase: (v) => v * 0.0254,
      fromBase: (v) => v / 0.0254,
    },
  },
  weight: {
    kilogram: {
      name: "Kilogram",
      symbol: "kg",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    gram: {
      name: "Gram",
      symbol: "g",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    milligram: {
      name: "Milligram",
      symbol: "mg",
      toBase: (v) => v / 1000000,
      fromBase: (v) => v * 1000000,
    },
    ton: {
      name: "Metric Ton",
      symbol: "t",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    pound: {
      name: "Pound",
      symbol: "lb",
      toBase: (v) => v * 0.453592,
      fromBase: (v) => v / 0.453592,
    },
    ounce: {
      name: "Ounce",
      symbol: "oz",
      toBase: (v) => v * 0.0283495,
      fromBase: (v) => v / 0.0283495,
    },
  },
  temperature: {
    celsius: {
      name: "Celsius",
      symbol: "°C",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    fahrenheit: {
      name: "Fahrenheit",
      symbol: "°F",
      toBase: (v) => ((v - 32) * 5) / 9,
      fromBase: (v) => (v * 9) / 5 + 32,
    },
    kelvin: {
      name: "Kelvin",
      symbol: "K",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
  area: {
    squareMeter: {
      name: "Square Meter",
      symbol: "m²",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    squareKilometer: {
      name: "Square Kilometer",
      symbol: "km²",
      toBase: (v) => v * 1000000,
      fromBase: (v) => v / 1000000,
    },
    squareFoot: {
      name: "Square Foot",
      symbol: "ft²",
      toBase: (v) => v * 0.092903,
      fromBase: (v) => v / 0.092903,
    },
    squareMile: {
      name: "Square Mile",
      symbol: "mi²",
      toBase: (v) => v * 2589988,
      fromBase: (v) => v / 2589988,
    },
    acre: {
      name: "Acre",
      symbol: "ac",
      toBase: (v) => v * 4046.86,
      fromBase: (v) => v / 4046.86,
    },
    hectare: {
      name: "Hectare",
      symbol: "ha",
      toBase: (v) => v * 10000,
      fromBase: (v) => v / 10000,
    },
  },
  volume: {
    liter: {
      name: "Liter",
      symbol: "L",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    milliliter: {
      name: "Milliliter",
      symbol: "mL",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    gallon: {
      name: "US Gallon",
      symbol: "gal",
      toBase: (v) => v * 3.78541,
      fromBase: (v) => v / 3.78541,
    },
    quart: {
      name: "US Quart",
      symbol: "qt",
      toBase: (v) => v * 0.946353,
      fromBase: (v) => v / 0.946353,
    },
    pint: {
      name: "US Pint",
      symbol: "pt",
      toBase: (v) => v * 0.473176,
      fromBase: (v) => v / 0.473176,
    },
    cup: {
      name: "US Cup",
      symbol: "cup",
      toBase: (v) => v * 0.236588,
      fromBase: (v) => v / 0.236588,
    },
    fluidOunce: {
      name: "Fluid Ounce",
      symbol: "fl oz",
      toBase: (v) => v * 0.0295735,
      fromBase: (v) => v / 0.0295735,
    },
  },
  speed: {
    meterPerSecond: {
      name: "Meter per Second",
      symbol: "m/s",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    kilometerPerHour: {
      name: "Kilometer per Hour",
      symbol: "km/h",
      toBase: (v) => v / 3.6,
      fromBase: (v) => v * 3.6,
    },
    milePerHour: {
      name: "Mile per Hour",
      symbol: "mph",
      toBase: (v) => v * 0.44704,
      fromBase: (v) => v / 0.44704,
    },
    knot: {
      name: "Knot",
      symbol: "kn",
      toBase: (v) => v * 0.514444,
      fromBase: (v) => v / 0.514444,
    },
  },
};

export default function UnitConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [category, setCategory] = useState<ConversionCategory>("length");
  const [fromUnit, setFromUnit] = useState<string>("meter");
  const [toUnit, setToUnit] = useState<string>("foot");
  const [inputValue, setInputValue] = useState<string>("1");

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const convertedValue = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return "0";

    const units = conversionData[category];
    const fromUnitData = units[fromUnit];
    const toUnitData = units[toUnit];

    if (!fromUnitData || !toUnitData) return "0";

    const baseValue = fromUnitData.toBase(value);
    const result = toUnitData.fromBase(baseValue);

    return result.toFixed(6).replace(/\.?0+$/, "");
  }, [category, fromUnit, toUnit, inputValue]);

  const handleCategoryChange = useCallback(
    (_event: React.SyntheticEvent, newValue: ConversionCategory) => {
      setCategory(newValue);
      const units = Object.keys(conversionData[newValue]);
      setFromUnit(units[0]);
      setToUnit(units[1] || units[0]);
    },
    []
  );

  const handleSwapUnits = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }, [fromUnit, toUnit]);

  const currentUnits = conversionData[category];
  const unitKeys = Object.keys(currentUnits);

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
        title="Unit Converter - Convert Measurements"
        description="Free online unit converter for length, weight, temperature, area, volume, and speed. Instant conversions between metric and imperial units."
      />

      <div className="flex flex-col gap-6">
        {/* Category Tabs */}
        <Card elevation={2}>
          <CardContent sx={{ pb: 1 }}>
            <Tabs
              value={category}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": {
                  minWidth: "auto",
                  px: { xs: 2, sm: 3 },
                },
              }}
            >
              <Tab label="Length" value="length" />
              <Tab label="Weight" value="weight" />
              <Tab label="Temperature" value="temperature" />
              <Tab label="Area" value="area" />
              <Tab label="Volume" value="volume" />
              <Tab label="Speed" value="speed" />
            </Tabs>
          </CardContent>
        </Card>

        {/* Conversion Card */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Convert {category.charAt(0).toUpperCase() + category.slice(1)}
            </Typography>

            <div className="flex flex-col gap-4">
              {/* From Section */}
              <div>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  From
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      variant="outlined"
                      inputProps={{ step: "any" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      variant="outlined"
                    >
                      {unitKeys.map((key) => (
                        <MenuItem key={key} value={key}>
                          {currentUnits[key].name} ({currentUnits[key].symbol})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSwapUnits}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Swap units"
                >
                  <SwapHorizIcon color="primary" fontSize="large" />
                </button>
              </div>

              {/* To Section */}
              <div>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  To
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      value={convertedValue}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      variant="outlined"
                    >
                      {unitKeys.map((key) => (
                        <MenuItem key={key} value={key}>
                          {currentUnits[key].name} ({currentUnits[key].symbol})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </div>

              <Divider sx={{ my: 2 }} />

              {/* Result Display */}
              <Card elevation={0} sx={{ bgcolor: "primary.light", p: 2 }}>
                <Typography variant="body1" align="center" color="white">
                  <strong>{inputValue}</strong> {currentUnits[fromUnit].symbol}{" "}
                  = <strong>{convertedValue}</strong>{" "}
                  {currentUnits[toUnit].symbol}
                </Typography>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card elevation={1} sx={{ bgcolor: "grey.50" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Common Conversions
            </Typography>
            <div className="flex flex-col gap-2">
              {category === "length" && (
                <>
                  <Typography variant="body2">1 meter = 3.281 feet</Typography>
                  <Typography variant="body2">
                    1 kilometer = 0.621 miles
                  </Typography>
                  <Typography variant="body2">
                    1 inch = 2.54 centimeters
                  </Typography>
                </>
              )}
              {category === "weight" && (
                <>
                  <Typography variant="body2">
                    1 kilogram = 2.205 pounds
                  </Typography>
                  <Typography variant="body2">1 pound = 453.6 grams</Typography>
                  <Typography variant="body2">1 ounce = 28.35 grams</Typography>
                </>
              )}
              {category === "temperature" && (
                <>
                  <Typography variant="body2">0°C = 32°F</Typography>
                  <Typography variant="body2">100°C = 212°F</Typography>
                  <Typography variant="body2">
                    20°C = 68°F (room temp)
                  </Typography>
                </>
              )}
              {category === "volume" && (
                <>
                  <Typography variant="body2">
                    1 liter = 0.264 gallons
                  </Typography>
                  <Typography variant="body2">
                    1 gallon = 3.785 liters
                  </Typography>
                  <Typography variant="body2">
                    1 cup = 236.6 milliliters
                  </Typography>
                </>
              )}
              {category === "area" && (
                <>
                  <Typography variant="body2">
                    1 hectare = 2.471 acres
                  </Typography>
                  <Typography variant="body2">
                    1 square meter = 10.76 square feet
                  </Typography>
                </>
              )}
              {category === "speed" && (
                <>
                  <Typography variant="body2">1 km/h = 0.621 mph</Typography>
                  <Typography variant="body2">1 mph = 1.609 km/h</Typography>
                  <Typography variant="body2">1 knot = 1.852 km/h</Typography>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
