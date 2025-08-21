import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/sql-practice-editor";

const pageTitle = "SQL Practice Editor: Learn & Practice SQL Online";
const pageDescription =
  "Free online SQL practice editor with built-in database. Learn SQL commands, practice queries, and visualize data relationships in your browser.";

const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/sql-practice-editor.png`;

const keywords =
  "sql practice editor, online sql editor, sql practice online, learn sql online, sql playground, sql tutorial, sql queries practice, database practice, sql commands online, sql exercises, free sql editor, sql learning tool";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
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
  mainHeading:
    "Online SQL Practice Editor: Learn and Master SQL Commands in Your Browser",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.CSV_VIEWER,
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.PYTHON_COMPILER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "sql-practice-editor",
    pageTitle,
    mainHeading:
      "Online SQL Practice Editor: Learn and Master SQL Commands in Your Browser",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Free Online SQL Practice Editor with Built-in Database",
    blockData: [
      "Master SQL with our interactive online practice editor featuring a pre-loaded sample database. Practice SELECT, INSERT, UPDATE, DELETE operations, joins, subqueries, and advanced SQL concepts directly in your browser without any setup required.",
      "Our SQL playground includes visual query results with sortable tables, database schema viewer, and real-time query execution feedback. Perfect for students, developers, and database professionals looking to improve their SQL skills.",
    ],
  },
  {
    heading: "Practice SQL with Real Database Examples",
    blockData: [
      "Learn SQL fundamentals with our sample database containing employees, departments, customers, and orders tables. Practice common SQL operations including:",
      "• SELECT queries with WHERE, ORDER BY, GROUP BY clauses",
      "• JOIN operations (INNER, LEFT, RIGHT, FULL OUTER)",
      "• Aggregate functions (COUNT, SUM, AVG, MIN, MAX)",
      "• Subqueries and nested SELECT statements",
      "• Data manipulation with INSERT, UPDATE, DELETE",
      "• Creating and altering table structures",
    ],
  },
  {
    heading: "Interactive SQL Learning Environment",
    blockData: [
      "Our SQL practice editor provides instant feedback with syntax highlighting, query execution time, and error explanations. The visual database schema shows table relationships with primary and foreign keys.",
      "Save your queries for later practice, export results to CSV format, and access SQL tutorials and examples. The responsive design works perfectly on desktop, tablet, and mobile devices.",
    ],
  },
  {
    heading: "SQL Query Examples and Tutorials",
    blockData: [
      "Get started quickly with pre-built SQL examples covering basic to advanced concepts. Examples include employee reports, sales analytics, customer insights, and inventory management queries.",
      "Each example includes detailed explanations and expected results, making it easy to understand SQL concepts and apply them to real-world scenarios.",
    ],
  },
];
