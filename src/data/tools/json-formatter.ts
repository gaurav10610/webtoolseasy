import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/json-formatter";
const pageTitle =
  "JSON Formatter & Validator Online - Beautify, Minify & Validate JSON Free";
const pageDescription =
  "Format, beautify, validate, and minify JSON data online. Real-time JSON validation with error line detection, structure stats, and syntax highlighting. Free JSON formatter with no signup required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/json-format.png`;

const keywords =
  "json formatter,json formatter online,json beautifier,json validator,format json,beautify json,minify json,json prettifier,json lint,json checker,json parser,validate json online,json syntax checker,json viewer online,json formatter free,json minifier,pretty print json";

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
      : "https://webtoolseasy.com",
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    description: pageDescription,
    siteName: "WebToolsEasy",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
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
    "JSON Formatter, Validator & Beautifier: Format, Validate and Minify JSON Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.HTML_FORMATTER,
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.CSS_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "json-formatter",
    pageTitle,
    mainHeading:
      "JSON Formatter, Validator & Beautifier: Format, Validate and Minify JSON Online",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Does this JSON formatter also validate JSON?",
        answer:
          "Yes, our tool validates your JSON in real-time as you type. It shows whether your JSON is valid or invalid, highlights error positions with line and column numbers, and displays structure stats including key count, nesting depth, and data size.",
      },
      {
        question:
          "What is the difference between formatting and minifying JSON?",
        answer:
          "Formatting (beautifying) adds proper indentation and line breaks to make JSON human-readable. Minifying removes all whitespace and line breaks to create the smallest possible JSON string, which is ideal for APIs and data transfer.",
      },
      {
        question: "Is this JSON formatter private?",
        answer:
          "Yes, our JSON formatter is 100% client-side. Your data never leaves your browser and is never uploaded to any server, ensuring complete privacy.",
      },
      {
        question: "Can I use this for large JSON files?",
        answer:
          "Yes, our JSON formatter handles large JSON files efficiently using browser-based processing. It works with JSON data up to several megabytes in size with real-time formatting and validation.",
      },
      {
        question: "What JSON errors does the validator detect?",
        answer:
          "Our validator detects all JSON syntax errors including missing commas, unclosed brackets, invalid property names, trailing commas, duplicate keys, and malformed strings. Error positions are shown with exact line and column numbers.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "JSON Syntax & Data Types Quick Reference",
    blockData: [
      "• **String**: Sequence of Unicode characters wrapped in double quotes: `\"name\": \"WebToolsEasy\"`. Escape characters with backslash (`\\\"`, `\\\\`, `\\n`, `\\t`).",
      "• **Number**: Integer or floating-point in base 10 (no octal/hex): `42`, `-3.14`, `1.5e3`. NaN and Infinity are not valid in JSON.",
      "• **Boolean**: Lowercase literal values only: `true` or `false`.",
      "• **Null**: Empty value representation: `null`.",
      "• **Object**: Unordered collection of zero or more key-value pairs wrapped in braces: `{\"key\": \"value\"}`. Keys must always be double-quoted strings.",
      "• **Array**: Ordered sequence of zero or more comma-separated values wrapped in brackets: `[1, \"two\", true]`.",
    ],
  },
  {
    heading: "Common JSON Syntax Pitfalls & How to Fix Them",
    blockData: [
      "• **Trailing Commas**: JSON forbids trailing commas after the last item: `[1, 2, 3,]` ❌ → `[1, 2, 3]` ✅.",
      "• **Single Quotes**: JSON strictly requires double quotes for keys and strings: `{'user': 'alice'}` ❌ → `{\"user\": \"alice\"}` ✅.",
      "• **Comments**: Standard JSON (RFC 8259) does not support `//` or `/* */` comments. If you need comments, consider JSONC (JSON with Comments) or YAML.",
      "• **Unquoted Keys**: JavaScript allows `{id: 123}`, but JSON requires string keys: `{\"id\": 123}`.",
    ],
  },
  {
    heading: "Programmatic JSON Formatting Recipes",
    blockData: [
      "• **Node.js / Browser**: `JSON.stringify(data, null, 2)` (2-space indent) or `JSON.stringify(data)` (minify).",
      "• **Python**: `import json; json.dumps(data, indent=2, sort_keys=True)`.",
      "• **CLI / Terminal**: `cat input.json | jq .` (beautify) or `cat input.json | jq -c .` (compact / minify).",
      "• **Go**: `import \"encoding/json\"; output, err := json.MarshalIndent(data, \"\", \"  \")`.",
    ],
  },
];
