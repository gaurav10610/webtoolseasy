import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/csv-viewer";
const pageTitle = "CSV Viewer Online - Handle Large Files with Streaming";
const pageDescription =
  "View and edit large CSV files efficiently with our streaming CSV viewer. Handle multi-GB files, search data, and export results. No file size limits.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/csv-viewer.png`;

const keywords =
  "csv viewer online,large csv file viewer,csv streaming,csv file viewer,csv editor,csv to table,view csv data,csv table viewer";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://webtoolseasy.com"
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favion_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: pageTitle,
      },
    ],
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Free CSV Viewer - Handle Large Files with Streaming",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.XML_TO_JSON,
    ApplicationIds.TEXT_EDITOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "csv-viewer",
    pageTitle,
    mainHeading: "Free CSV Viewer - Handle Large Files with Streaming",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a CSV Viewer with Streaming Technology?",
    blockData: [
      "A CSV viewer is a tool that allows you to view CSV (Comma-Separated Values) files in a human-readable table format. Our advanced CSV viewer features streaming technology that can handle extremely large files (multi-GB) efficiently without consuming excessive memory. CSV viewers typically display data in rows and columns, making it easier to read, analyze, and edit spreadsheet-like data, even for enterprise-level datasets.",
    ],
  },
  {
    heading: "Why Use a CSV Viewer?",
    listData: [
      "To make CSV data more readable. Raw CSV files can be difficult to read as they contain comma-separated values in plain text. A CSV viewer displays this data in a clean table format.",
      "To edit CSV data easily. Our CSV viewer allows you to edit the CSV content directly and see the changes reflected in the table view immediately.",
      "To upload and analyze files. You can upload CSV files from your computer and instantly view them in a structured table format.",
      "To share CSV data. Generate shareable URLs with your CSV data that others can view and edit.",
      "To debug data issues. Identify missing values, formatting problems, or structural issues in your CSV files.",
    ],
  },
  {
    heading: "Features of Our Online CSV Viewer Tool",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. View and edit your CSV data directly from your web browser.",
      "Large file support with streaming technology. Handle multi-GB CSV files efficiently without browser crashes or memory issues.",
      "Memory-efficient processing. Files are processed in chunks to ensure smooth performance regardless of file size.",
      "File upload support. Drag and drop CSV files or click to browse and upload from your computer.",
      "Real-time editing. Edit CSV content in the code editor and see changes instantly in the table view.",
      "Table view with sticky headers. Scrollable table with fixed headers for easy navigation of large datasets.",
      "Copy and share functionality. Copy CSV content to clipboard or generate shareable URLs.",
      "Fullscreen mode. Expand to fullscreen for better viewing of large CSV files.",
      "Error handling. Clear error messages for malformed CSV data with suggestions for fixes.",
      "Progress tracking. Visual progress indicator when loading large files.",
    ],
  },
  {
    heading: "Large File Processing Advantages",
    listData: [
      "Handles files up to several gigabytes in size without browser memory limitations.",
      "Streaming technology processes files in 64KB chunks for optimal performance.",
      "No file size restrictions - process enterprise-level datasets with confidence.",
      "Memory-efficient architecture prevents browser crashes and slowdowns.",
      "Real-time progress tracking shows file processing status for large uploads.",
      "Works seamlessly across all modern browsers without requiring special plugins.",
    ],
  },
  {
    heading: "How to Use Our Online CSV Viewer Tool",
    listData: [
      "Upload a CSV file by dragging and dropping it onto the upload area, or click to browse and select a file from your computer.",
      "Alternatively, paste or type your CSV data directly into the code editor.",
      "View your data in the table format below the editor, with proper headers and organized rows.",
      "Edit the CSV content in the code editor to make changes - the table view will update automatically.",
      "Use the Copy button to copy the CSV content to your clipboard.",
      "Use the Share button to generate a shareable URL that others can use to view your CSV data.",
      "Toggle fullscreen mode for better viewing of large datasets.",
    ],
  },
  {
    heading: "CSV File Format Guidelines",
    listData: [
      "First row should contain column headers separated by commas.",
      "Each subsequent row represents a data record with values separated by commas.",
      "Enclose values containing commas, quotes, or line breaks in double quotes.",
      'Use double quotes ("") to escape quotes within quoted values.',
      "Keep the number of values in each row consistent with the number of headers.",
      "Avoid special characters that might interfere with parsing.",
    ],
  },
  {
    heading: "Tips for Using Our CSV Viewer",
    listData: [
      "Ensure your CSV file has a header row for the best table display experience.",
      "For large files, use the fullscreen mode to see more data at once.",
      "If you encounter parsing errors, check for inconsistent comma usage or missing quotes around complex values.",
      "Use the real-time editing feature to clean up data formatting issues directly in the viewer.",
      "Generate shareable URLs to collaborate with others on CSV data analysis.",
    ],
  },
  {
    blockData: [
      "Our free online CSV viewer tool with advanced streaming technology is the perfect solution for viewing, editing, and sharing CSV data of any size. Whether you're analyzing small spreadsheet data or processing multi-gigabyte enterprise datasets, our tool provides a clean, intuitive interface with memory-efficient file handling that makes working with CSV files simple and efficient. The CoreFileStreamer technology ensures smooth performance even with the largest files, setting us apart from traditional CSV viewers that struggle with large datasets. No software installation required - just upload your file or paste your data and start viewing instantly, regardless of file size.",
    ],
  },
];
