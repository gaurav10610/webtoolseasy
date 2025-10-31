import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/invoice-generator";
const pageTitle = "Free Invoice Generator - Create Professional Invoices";
const keywords =
  "invoice generator, create invoice, free invoice maker, invoice template, pdf invoice, business invoice, invoice creator, generate invoice online";

export const componentConfig: ApplicationConfig = {
  mainHeading: "Invoice Generator - Create Professional Invoices",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.PDF_MERGE,
    ApplicationIds.SIGNATURE_GENERATOR,
    ApplicationIds.PDF_COMPRESS,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "invoice-generator",
    pageTitle,
    mainHeading: "Invoice Generator - Create Professional Invoices",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Free Professional Invoice Generator",
    blockData: [
      "Create professional invoices in seconds with our free invoice generator. Add your company logo, customize fields, calculate taxes automatically, and export to PDF. Perfect for freelancers, small businesses, and contractors. No registration or payment required.",
    ],
  },
  {
    heading: "How to Create an Invoice",
    blockData: [
      "Enter your business details including name, email, and address. Add client information, invoice number, and date. Add line items with descriptions, quantities, and prices. The tool automatically calculates subtotals, taxes, and total amount. Download your invoice as a professional PDF ready to send to clients.",
    ],
  },
  {
    heading: "Key Features",
    blockData: [
      "• Company logo upload",
      "• Customizable invoice numbers",
      "• Automatic date formatting",
      "• Line item management",
      "• Tax calculation (0-30%)",
      "• Discount support",
      "• Payment terms and notes",
      "• Real-time preview",
      "• High-quality PDF export",
      "• 100% client-side processing",
    ],
  },
  {
    heading: "Perfect for Any Business",
    blockData: [
      "Ideal for freelancers billing clients, small businesses creating invoices, contractors submitting payment requests, consultants tracking projects, and service providers managing payments. Create unlimited invoices with no restrictions.",
    ],
  },
  {
    heading: "Professional Invoice Format",
    blockData: [
      "Generate invoices that include all essential elements: business information with logo, client details, unique invoice numbers, itemized services or products, clear pricing breakdown, tax calculations, payment terms and due dates, and bank details or payment instructions.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "Your invoice data never leaves your device. All invoice generation and PDF creation happens locally in your browser. No data is uploaded to any server, ensuring complete confidentiality of your business and client information.",
    ],
  },
];
