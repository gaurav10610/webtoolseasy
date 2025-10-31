"use client";

import {
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  MenuItem,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

// Popular currencies list
const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
];

interface ExchangeRates {
  [key: string]: number;
}

export default function CurrencyConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        setError("");

        // Using exchangerate-api.com free tier (no auth required)
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }

        const data = await response.json();
        setExchangeRates(data.rates);
        setLastUpdate(new Date(data.time_last_updated * 1000).toLocaleString());
        setLoading(false);
      } catch {
        setError("Unable to fetch exchange rates. Please try again.");
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  const handleAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setAmount(value >= 0 ? value : 0);
    },
    []
  );

  const handleFromCurrencyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFromCurrency(event.target.value);
    },
    []
  );

  const handleToCurrencyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setToCurrency(event.target.value);
    },
    []
  );

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const convertedAmount = exchangeRates[toCurrency]
    ? amount * exchangeRates[toCurrency]
    : 0;

  const exchangeRate = exchangeRates[toCurrency] || 0;

  const formatCurrency = (value: number, currencyCode: string) => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return `${currency?.symbol || ""} ${value.toFixed(2)}`;
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
        title="Currency Converter"
        description="Convert between 150+ currencies with live exchange rates. Perfect for travelers and international transactions."
        exampleCode={`${amount} ${fromCurrency}`}
        exampleOutput={`${convertedAmount.toFixed(2)} ${toCurrency}`}
      />

      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Main Converter Card */}
        <Card className="border border-gray-200">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <AttachMoneyIcon color="primary" fontSize="large" />
              <Typography variant="h6" color="primary">
                Currency Converter
              </Typography>
            </div>

            <Grid container spacing={3} alignItems="center">
              {/* Amount Input */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              {/* From Currency */}
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  label="From"
                  variant="outlined"
                  fullWidth
                  value={fromCurrency}
                  onChange={handleFromCurrencyChange}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Swap Button */}
              <Grid
                item
                xs={12}
                md={4}
                className="flex justify-center md:justify-start"
              >
                <IconButton
                  color="primary"
                  onClick={handleSwap}
                  className="bg-blue-50 hover:bg-blue-100"
                  size="large"
                >
                  <SwapHorizIcon fontSize="large" />
                </IconButton>
              </Grid>

              {/* To Currency */}
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  label="To"
                  variant="outlined"
                  fullWidth
                  value={toCurrency}
                  onChange={handleToCurrencyChange}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Result Card */}
        <Card className="border-2 border-green-500">
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <CircularProgress />
              </div>
            ) : (
              <>
                <Typography
                  variant="subtitle2"
                  className="text-gray-600 mb-2 text-center"
                >
                  Converted Amount
                </Typography>
                <div className="text-center mb-3">
                  <Typography variant="h3" className="font-bold text-green-600">
                    {formatCurrency(convertedAmount, toCurrency)}
                  </Typography>
                  <Typography variant="h6" className="text-gray-500 mt-1">
                    {toCurrency}
                  </Typography>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Typography variant="body2" className="text-gray-700">
                    {formatCurrency(amount, fromCurrency)} {fromCurrency} ={" "}
                    {formatCurrency(convertedAmount, toCurrency)} {toCurrency}
                  </Typography>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Exchange Rate Info */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className="border border-gray-200 h-full">
              <CardContent>
                <Typography variant="subtitle2" className="text-gray-600 mb-2">
                  Exchange Rate
                </Typography>
                <Typography
                  variant="h5"
                  className="font-semibold text-blue-600"
                >
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </Typography>
                <Typography
                  variant="caption"
                  className="text-gray-500 mt-2 block"
                >
                  Last updated: {lastUpdate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="border border-gray-200 h-full">
              <CardContent>
                <Typography variant="subtitle2" className="text-gray-600 mb-2">
                  Inverse Rate
                </Typography>
                <Typography
                  variant="h5"
                  className="font-semibold text-purple-600"
                >
                  1 {toCurrency} ={" "}
                  {exchangeRate ? (1 / exchangeRate).toFixed(4) : "0"}{" "}
                  {fromCurrency}
                </Typography>
                <Typography
                  variant="caption"
                  className="text-gray-500 mt-2 block"
                >
                  Rates may vary slightly by provider
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Popular Conversions */}
        <Card className="border border-gray-200">
          <CardContent>
            <Typography variant="h6" className="mb-3 text-gray-800">
              Quick Conversion Reference (1 {fromCurrency})
            </Typography>
            <Grid container spacing={2}>
              {["EUR", "GBP", "INR", "JPY", "CNY", "AUD"].map((code) => (
                <Grid item xs={6} md={4} key={code}>
                  <div className="bg-gray-50 rounded p-3">
                    <Typography variant="body2" className="text-gray-600">
                      {code}
                    </Typography>
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-800"
                    >
                      {exchangeRates[code]
                        ? exchangeRates[code].toFixed(2)
                        : "Loading..."}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
