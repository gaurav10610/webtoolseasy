"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";
import { SnackBarWithPosition } from "../lib/snackBar";
import { SEOContent } from "../common/ToolLayout";
import { ToolComponentProps } from "@/types/component";
import { componentConfig } from "@/data/tools/invoice-generator";

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

interface InvoiceData {
  // Company Info
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  companyPhone: string;

  // Client Info
  clientName: string;
  clientEmail: string;
  clientAddress: string;

  // Invoice Details
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  // Items
  items: LineItem[];

  // Financial
  taxRate: number;
  discount: number;

  // Additional
  notes: string;
  paymentTerms: string;
}

export default function InvoiceGenerator({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hostname,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  queryParams,
}: Readonly<ToolComponentProps>) {
  const today = new Date().toISOString().split("T")[0];
  const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    companyPhone: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    invoiceDate: today,
    dueDate: nextMonth,
    items: [{ id: 1, description: "", quantity: 1, rate: 0 }],
    taxRate: 10,
    discount: 0,
    notes: "",
    paymentTerms: "Payment due within 30 days",
  });

  const [error, setError] = useState<string>("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const handleInputChange = (
    field: keyof InvoiceData,
    value: string | number
  ) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (
    id: number,
    field: keyof LineItem,
    value: string | number
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItem = () => {
    const newId = Math.max(...invoiceData.items.map((i) => i.id), 0) + 1;
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: newId, description: "", quantity: 1, rate: 0 },
      ],
    }));
  };

  const removeItem = (id: number) => {
    if (invoiceData.items.length === 1) {
      setSnackbar({
        open: true,
        message: "Invoice must have at least one item",
        severity: "error",
      });
      return;
    }
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const calculateSubtotal = (): number => {
    return invoiceData.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
  };

  const calculateTax = (subtotal: number): number => {
    return (subtotal * invoiceData.taxRate) / 100;
  };

  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax - invoiceData.discount;
  };

  const generatePDF = () => {
    // Validation
    if (!invoiceData.companyName) {
      setError("Company name is required");
      return;
    }
    if (!invoiceData.clientName) {
      setError("Client name is required");
      return;
    }
    if (invoiceData.items.some((item) => !item.description || item.rate <= 0)) {
      setError("All items must have description and rate");
      return;
    }

    setError("");

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      let yPos = 20;

      // Header - Company Info
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", pageWidth / 2, yPos, { align: "center" });

      yPos += 15;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(invoiceData.companyName, 20, yPos);

      yPos += 6;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      if (invoiceData.companyEmail) {
        doc.text(invoiceData.companyEmail, 20, yPos);
        yPos += 5;
      }
      if (invoiceData.companyPhone) {
        doc.text(invoiceData.companyPhone, 20, yPos);
        yPos += 5;
      }
      if (invoiceData.companyAddress) {
        const addressLines = doc.splitTextToSize(
          invoiceData.companyAddress,
          80
        );
        doc.text(addressLines, 20, yPos);
        yPos += addressLines.length * 5;
      }

      // Invoice Details (top right)
      const rightX = pageWidth - 20;
      let rightY = 35;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Invoice #:", rightX - 70, rightY);
      doc.setFont("helvetica", "normal");
      doc.text(invoiceData.invoiceNumber, rightX, rightY, { align: "right" });

      rightY += 6;
      doc.setFont("helvetica", "bold");
      doc.text("Date:", rightX - 70, rightY);
      doc.setFont("helvetica", "normal");
      doc.text(invoiceData.invoiceDate, rightX, rightY, { align: "right" });

      rightY += 6;
      doc.setFont("helvetica", "bold");
      doc.text("Due Date:", rightX - 70, rightY);
      doc.setFont("helvetica", "normal");
      doc.text(invoiceData.dueDate, rightX, rightY, { align: "right" });

      yPos += 10;

      // Bill To Section
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("BILL TO:", 20, yPos);

      yPos += 7;
      doc.setFontSize(10);
      doc.text(invoiceData.clientName, 20, yPos);

      yPos += 5;
      doc.setFont("helvetica", "normal");
      if (invoiceData.clientEmail) {
        doc.text(invoiceData.clientEmail, 20, yPos);
        yPos += 5;
      }
      if (invoiceData.clientAddress) {
        const clientAddressLines = doc.splitTextToSize(
          invoiceData.clientAddress,
          80
        );
        doc.text(clientAddressLines, 20, yPos);
        yPos += clientAddressLines.length * 5;
      }

      yPos += 10;

      // Items Table
      const tableTop = yPos;
      const col1 = 20;
      const col2 = 110;
      const col3 = 140;
      const col4 = 170;

      // Table Header
      doc.setFillColor(240, 240, 240);
      doc.rect(col1, tableTop, pageWidth - 40, 8, "F");

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Description", col1 + 2, tableTop + 6);
      doc.text("Qty", col2 + 2, tableTop + 6);
      doc.text("Rate", col3 + 2, tableTop + 6);
      doc.text("Amount", col4 + 2, tableTop + 6);

      yPos = tableTop + 10;

      // Table Rows
      doc.setFont("helvetica", "normal");
      invoiceData.items.forEach((item) => {
        const amount = item.quantity * item.rate;
        const descLines = doc.splitTextToSize(item.description, 85);

        doc.text(descLines, col1 + 2, yPos);
        doc.text(item.quantity.toString(), col2 + 2, yPos);
        doc.text(`$${item.rate.toFixed(2)}`, col3 + 2, yPos);
        doc.text(`$${amount.toFixed(2)}`, col4 + 2, yPos);

        yPos += Math.max(descLines.length * 5, 7);
      });

      yPos += 5;
      doc.line(col1, yPos, pageWidth - 20, yPos);

      // Totals Section
      yPos += 8;
      const labelX = pageWidth - 80;
      const valueX = pageWidth - 20;

      const subtotal = calculateSubtotal();
      const tax = calculateTax(subtotal);
      const total = calculateTotal();

      doc.setFont("helvetica", "normal");
      doc.text("Subtotal:", labelX, yPos);
      doc.text(`$${subtotal.toFixed(2)}`, valueX, yPos, { align: "right" });

      yPos += 6;
      doc.text(`Tax (${invoiceData.taxRate}%):`, labelX, yPos);
      doc.text(`$${tax.toFixed(2)}`, valueX, yPos, { align: "right" });

      if (invoiceData.discount > 0) {
        yPos += 6;
        doc.text("Discount:", labelX, yPos);
        doc.text(`-$${invoiceData.discount.toFixed(2)}`, valueX, yPos, {
          align: "right",
        });
      }

      yPos += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Total:", labelX, yPos);
      doc.text(`$${total.toFixed(2)}`, valueX, yPos, { align: "right" });

      // Payment Terms & Notes
      yPos += 15;
      if (invoiceData.paymentTerms) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("Payment Terms:", 20, yPos);
        yPos += 6;
        doc.setFont("helvetica", "normal");
        const termsLines = doc.splitTextToSize(
          invoiceData.paymentTerms,
          pageWidth - 40
        );
        doc.text(termsLines, 20, yPos);
        yPos += termsLines.length * 5 + 5;
      }

      if (invoiceData.notes) {
        doc.setFont("helvetica", "bold");
        doc.text("Notes:", 20, yPos);
        yPos += 6;
        doc.setFont("helvetica", "normal");
        const notesLines = doc.splitTextToSize(
          invoiceData.notes,
          pageWidth - 40
        );
        doc.text(notesLines, 20, yPos);
      }

      // Save PDF
      doc.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);

      setSnackbar({
        open: true,
        message: "Invoice PDF downloaded successfully!",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to generate PDF",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <SEOContent
        title={componentConfig.pageTitle}
        description="Create professional invoices with automatic calculations and PDF export"
      />

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Company Information */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Your Business Information
          </Typography>
          <div className="flex flex-col gap-3">
            <TextField
              label="Company Name *"
              fullWidth
              value={invoiceData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
            />
            <div className="flex gap-3 flex-wrap">
              <TextField
                label="Email"
                type="email"
                className="flex-1"
                value={invoiceData.companyEmail}
                onChange={(e) =>
                  handleInputChange("companyEmail", e.target.value)
                }
              />
              <TextField
                label="Phone"
                className="flex-1"
                value={invoiceData.companyPhone}
                onChange={(e) =>
                  handleInputChange("companyPhone", e.target.value)
                }
              />
            </div>
            <TextField
              label="Address"
              multiline
              rows={2}
              fullWidth
              value={invoiceData.companyAddress}
              onChange={(e) =>
                handleInputChange("companyAddress", e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Client Information
          </Typography>
          <div className="flex flex-col gap-3">
            <TextField
              label="Client Name *"
              fullWidth
              value={invoiceData.clientName}
              onChange={(e) => handleInputChange("clientName", e.target.value)}
            />
            <TextField
              label="Client Email"
              type="email"
              fullWidth
              value={invoiceData.clientEmail}
              onChange={(e) => handleInputChange("clientEmail", e.target.value)}
            />
            <TextField
              label="Client Address"
              multiline
              rows={2}
              fullWidth
              value={invoiceData.clientAddress}
              onChange={(e) =>
                handleInputChange("clientAddress", e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Invoice Details
          </Typography>
          <div className="flex flex-wrap gap-3">
            <TextField
              label="Invoice Number"
              className="flex-1"
              value={invoiceData.invoiceNumber}
              onChange={(e) =>
                handleInputChange("invoiceNumber", e.target.value)
              }
            />
            <TextField
              label="Invoice Date"
              type="date"
              className="flex-1"
              value={invoiceData.invoiceDate}
              onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Due Date"
              type="date"
              className="flex-1"
              value={invoiceData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">Items</Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={addItem}
              variant="outlined"
              size="small"
            >
              Add Item
            </Button>
          </div>

          {invoiceData.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap gap-2 mb-3 items-start"
            >
              <TextField
                label="Description"
                className="flex-1"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(item.id, "description", e.target.value)
                }
                sx={{ minWidth: "200px" }}
              />
              <TextField
                label="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "quantity",
                    parseFloat(e.target.value) || 0
                  )
                }
                sx={{ width: "100px" }}
              />
              <TextField
                label="Rate ($)"
                type="number"
                value={item.rate}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "rate",
                    parseFloat(e.target.value) || 0
                  )
                }
                sx={{ width: "120px" }}
              />
              <div className="flex flex-col items-center justify-center">
                <Typography variant="caption" className="text-gray-500">
                  Amount
                </Typography>
                <Typography variant="body1" className="font-semibold">
                  ${(item.quantity * item.rate).toFixed(2)}
                </Typography>
              </div>
              <Button
                color="error"
                onClick={() => removeItem(item.id)}
                size="small"
                sx={{ minWidth: "40px" }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Financial Details */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Financial Details
          </Typography>
          <div className="flex flex-wrap gap-3 mb-4">
            <TextField
              label="Tax Rate (%)"
              type="number"
              value={invoiceData.taxRate}
              onChange={(e) =>
                handleInputChange("taxRate", parseFloat(e.target.value) || 0)
              }
              sx={{ width: "150px" }}
            />
            <TextField
              label="Discount ($)"
              type="number"
              value={invoiceData.discount}
              onChange={(e) =>
                handleInputChange("discount", parseFloat(e.target.value) || 0)
              }
              sx={{ width: "150px" }}
            />
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between mb-2">
              <Typography>Subtotal:</Typography>
              <Typography className="font-semibold">
                ${calculateSubtotal().toFixed(2)}
              </Typography>
            </div>
            <div className="flex justify-between mb-2">
              <Typography>Tax ({invoiceData.taxRate}%):</Typography>
              <Typography className="font-semibold">
                ${calculateTax(calculateSubtotal()).toFixed(2)}
              </Typography>
            </div>
            {invoiceData.discount > 0 && (
              <div className="flex justify-between mb-2">
                <Typography>Discount:</Typography>
                <Typography className="font-semibold text-red-600">
                  -${invoiceData.discount.toFixed(2)}
                </Typography>
              </div>
            )}
            <div className="flex justify-between border-t pt-2 mt-2">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" className="text-green-600">
                ${calculateTotal().toFixed(2)}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Additional Information
          </Typography>
          <div className="flex flex-col gap-3">
            <TextField
              label="Payment Terms"
              multiline
              rows={2}
              fullWidth
              value={invoiceData.paymentTerms}
              onChange={(e) =>
                handleInputChange("paymentTerms", e.target.value)
              }
            />
            <TextField
              label="Notes"
              multiline
              rows={3}
              fullWidth
              value={invoiceData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Thank you for your business!"
            />
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Button
        variant="contained"
        size="large"
        startIcon={<DownloadIcon />}
        onClick={generatePDF}
        className="w-full"
      >
        Generate & Download Invoice PDF
      </Button>

      <SnackBarWithPosition
        open={snackbar.open}
        message={snackbar.message}
        color={snackbar.severity}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
}
