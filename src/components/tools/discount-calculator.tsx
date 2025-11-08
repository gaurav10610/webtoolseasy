"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Alert,
  InputAdornment,
} from "@mui/material";
import { useState, useCallback } from "react";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import { ButtonWithHandler } from "../lib/buttons";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SavingsIcon from "@mui/icons-material/Savings";

interface DiscountResult {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  savings: number;
}

export default function DiscountCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<string>("");
  const [result, setResult] = useState<DiscountResult | null>(null);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const calculateDiscount = useCallback(() => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (isNaN(price) || price <= 0) {
      toolState.actions.showMessage("Please enter a valid original price!");
      return;
    }

    if (isNaN(discount) || discount < 0 || discount > 100) {
      toolState.actions.showMessage(
        "Please enter a valid discount percentage (0-100)!"
      );
      return;
    }

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    setResult({
      originalPrice: price,
      discountPercentage: discount,
      discountAmount,
      finalPrice,
      savings: discountAmount,
    });

    toolState.actions.showMessage("Discount calculated successfully!");
  }, [originalPrice, discountPercentage, toolState.actions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const clearCalculation = useCallback(() => {
    setOriginalPrice("");
    setDiscountPercentage("");
    setResult(null);
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
        title="Discount Calculator"
        description="Calculate sale prices, discount percentages, and savings instantly. Perfect for shopping, retail planning, and comparing deals."
      />

      <div className="flex flex-col gap-6">
        {/* Input Card */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Calculate Discount
            </Typography>

            <div className="flex flex-col gap-4">
              <TextField
                fullWidth
                label="Original Price"
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                inputProps={{ min: 0, step: 0.01 }}
                variant="outlined"
                helperText="Enter the original price before discount"
              />

              <TextField
                fullWidth
                label="Discount Percentage"
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                inputProps={{ min: 0, max: 100, step: 0.01 }}
                variant="outlined"
                helperText="Enter discount percentage (0-100)"
              />

              <div className="grid grid-cols-2 gap-3">
                <ButtonWithHandler
                  buttonText="Calculate"
                  onClick={calculateDiscount}
                  startIcon={<LocalOfferIcon />}
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
          <Card elevation={3} sx={{ bgcolor: "success.light" }}>
            <CardContent>
              <Typography
                variant="h6"
                color="white"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Discount Results
              </Typography>

              {/* Main Result - Final Price */}
              <div className="bg-white p-6 rounded-lg mb-4 text-center">
                <Typography variant="caption" color="text.secondary">
                  Final Sale Price
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="success.main"
                  sx={{ my: 1 }}
                >
                  {formatCurrency(result.finalPrice)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {result.discountPercentage}% off
                </Typography>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-white p-3 rounded-lg">
                  <Typography variant="caption" color="text.secondary">
                    Original Price
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(result.originalPrice)}
                  </Typography>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <Typography variant="caption" color="text.secondary">
                    Discount Amount
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="error">
                    -{formatCurrency(result.discountAmount)}
                  </Typography>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <Typography variant="caption" color="text.secondary">
                    You Save
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="success.main"
                  >
                    {formatCurrency(result.savings)}
                  </Typography>
                </div>
              </div>

              <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)" }} />

              {/* Savings Percentage */}
              <div className="flex items-center justify-between">
                <Typography variant="body2" color="white">
                  <strong>Savings Percentage:</strong>
                </Typography>
                <Typography variant="body1" color="white" fontWeight="bold">
                  {result.discountPercentage.toFixed(2)}%
                </Typography>
              </div>

              <div className="flex items-center justify-between mt-1">
                <Typography variant="body2" color="white">
                  <strong>Amount Saved:</strong>
                </Typography>
                <Typography variant="body1" color="white" fontWeight="bold">
                  {formatCurrency(result.savings)}
                </Typography>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Discount Presets */}
        <Card elevation={1}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Discount Presets
            </Typography>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[10, 15, 20, 25, 30, 50].map((percent) => (
                <button
                  key={percent}
                  onClick={() => setDiscountPercentage(percent.toString())}
                  className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
                >
                  <Typography variant="body2" fontWeight="bold">
                    {percent}% Off
                  </Typography>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Multiple Items Comparison */}
        {result && (
          <Card elevation={1} sx={{ bgcolor: "grey.50" }}>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <SavingsIcon color="primary" />
                <Typography variant="h6">Bulk Purchase Savings</Typography>
              </div>
              <Divider sx={{ mb: 2 }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[2, 5, 10, 20].map((quantity) => (
                  <div
                    key={quantity}
                    className="bg-white p-3 rounded-lg border"
                  >
                    <Typography variant="caption" color="text.secondary">
                      Buy {quantity} items
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {formatCurrency(result.finalPrice * quantity)}
                    </Typography>
                    <Typography variant="caption" color="success.main">
                      Save {formatCurrency(result.savings * quantity)}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Alerts */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Shopping Tip:</strong> A higher discount percentage
            doesn&apos;t always mean better savings. Compare final prices across
            different stores and products to find the best deal.
          </Typography>
        </Alert>

        <Alert severity="success">
          <Typography variant="body2">
            <strong>Multiple Discounts:</strong> When applying multiple
            discounts (e.g., 20% off + 10% coupon), they are usually applied
            sequentially, not added together. A 20% + 10% discount equals 28%
            total, not 30%.
          </Typography>
        </Alert>
      </div>
    </ToolLayout>
  );
}
