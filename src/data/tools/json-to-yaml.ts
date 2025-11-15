import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/json-to-yaml";
const pageTitle = "JSON to YAML Converter - Free Online Converter Tool";
const pageDescription =
  "Convert JSON to YAML and YAML to JSON online for free. Bidirectional converter with syntax validation and formatting.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/json-to-yaml.png`;

const keywords =
  "json to yaml,yaml to json,convert json yaml,json yaml converter,yaml converter,json converter,format json yaml";

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
  mainHeading: "JSON to YAML Converter: Convert Between JSON and YAML Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.YAML_FORMATTER,
    ApplicationIds.JSON_TO_CSV,
    ApplicationIds.XML_TO_JSON,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "json-to-yaml",
    pageTitle,
    mainHeading: "JSON to YAML Converter: Convert Between JSON and YAML Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is JSON to YAML Converter?",
    blockData: [
      "A JSON to YAML converter is a free online tool that transforms data between JSON (JavaScript Object Notation) and YAML (YAML Ain't Markup Language) formats. Our bidirectional converter supports both JSON-to-YAML and YAML-to-JSON conversions with instant results, syntax validation, and proper formatting.",
      "Both JSON and YAML are popular data serialization formats used in configuration files, APIs, and data exchange. This tool helps developers and data engineers work seamlessly between these two formats.",
    ],
  },
  {
    heading: "JSON vs YAML: Key Differences",
    blockData: [
      "JSON: Uses curly braces and brackets, requires quotes around strings, comma-separated values, widely supported across all programming languages, strict syntax, ideal for APIs and web data transfer.",
      "YAML: Uses indentation for structure, no quotes needed in most cases, more human-readable, supports comments, commonly used in configuration files (Docker, Kubernetes, CI/CD), sensitive to whitespace.",
      "Both formats represent the same data structures (objects, arrays, strings, numbers, booleans) but with different syntax conventions.",
    ],
  },
  {
    heading: "How to Convert JSON to YAML",
    blockData: [
      "1. Paste or type your JSON data into the left editor",
      "2. Click 'Convert to YAML' button",
      "3. View the converted YAML in the right editor",
      "4. Copy the result or download as a file",
      "5. Use 'Format' buttons to beautify input data",
    ],
  },
  {
    heading: "How to Convert YAML to JSON",
    blockData: [
      "1. Paste or type your YAML data into the left editor",
      "2. Click 'Convert to JSON' button",
      "3. View the converted JSON in the right editor",
      "4. Copy the result or download as a file",
      "5. Validate syntax before conversion",
    ],
  },
  {
    heading: "Common Use Cases",
    blockData: [
      "Configuration Management: Convert between Kubernetes YAML configs and JSON",
      "API Development: Transform API responses to config files",
      "CI/CD Pipelines: Switch between GitHub Actions YAML and JSON schemas",
      "Docker Compose: Convert docker-compose.yml to JSON for processing",
      "Infrastructure as Code: Work with Terraform and CloudFormation templates",
      "Data Migration: Move data between systems using different formats",
      "Development Tools: Integrate with build tools and package managers",
      "Documentation: Create readable config examples from JSON APIs",
    ],
  },
  {
    heading: "Features",
    blockData: [
      "• Bidirectional conversion: JSON ↔ YAML",
      "• Real-time syntax validation for both formats",
      "• Automatic formatting and indentation",
      "• Copy to clipboard with one click",
      "• Download results as .json or .yaml files",
      "• Handles nested objects and arrays",
      "• Preserves data types (strings, numbers, booleans, null)",
      "• Error highlighting for invalid syntax",
      "• Works completely offline in your browser",
      "• No file size limits",
    ],
  },
  {
    heading: "Tips for Best Results",
    blockData: [
      "Ensure proper JSON syntax with matching brackets and quotes",
      "Check YAML indentation (use spaces, not tabs)",
      "Validate your data before conversion to catch errors early",
      "Use consistent indentation (2 or 4 spaces) in YAML",
      "Escape special characters in strings when needed",
      "Test converted output in your target application",
      "Keep backups of original files before conversion",
      "Remember YAML is whitespace-sensitive",
    ],
  },
  {
    heading: "When to Use JSON vs YAML",
    blockData: [
      "Use JSON when: Building web APIs, working with JavaScript applications, need strict syntax validation, require wide language support, handling data transfer between systems.",
      "Use YAML when: Writing configuration files, need human-readable format, want to add comments, working with DevOps tools (Docker, Kubernetes, Ansible), prefer cleaner syntax without brackets.",
      "Both formats are excellent choices - select based on your use case and team preferences.",
    ],
  },
];
