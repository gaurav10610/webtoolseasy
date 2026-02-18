import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/jwt-decoder";
const pageTitle = "JWT Decoder Online - Decode & Inspect JSON Web Tokens Free";
const pageDescription =
  "Decode JWT tokens to view header, payload, and signature instantly. Free online JWT decoder with expiration checking and claim validation. Debug authentication tokens securely in your browser.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/jwt-decoder.png`;
const keywords =
  "jwt decoder,jwt decoder online,decode jwt,json web token decoder,jwt debugger,jwt parser,jwt validator,jwt viewer,jwt token decoder,decode json web token,jwt inspector,jwt decode online free,jwt.io alternative,jwt payload viewer";

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
      { url: "/favion_512.png", sizes: "512x512" },
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
  mainHeading: "Online JWT Decoder: Validate and Decode JSON Web Token",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.MARKDOWN_EDITOR,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.UUID_VERSION4_GENERATOR,
    ApplicationIds.GUID_GENERATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "jwt-decoder",
    pageTitle,
    mainHeading: "Online JWT Decoder: Validate and Decode JSON Web Token",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Is it safe to paste my JWT here?",
        answer:
          "Yes, decoding happens 100% locally in your browser. Your JWT token is never sent to any server, ensuring complete privacy for sensitive API tokens.",
      },
      {
        question: "Does this verify JWT signatures?",
        answer:
          "This tool decodes and displays JWT contents (header, payload, signature), but full signature verification requires the secret key which should never be shared online.",
      },
      {
        question: "What information does a JWT contain?",
        answer:
          "A JWT contains three parts: Header (algorithm and token type), Payload (claims like user ID, expiration, and custom data), and Signature (verification hash).",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      "JSON Web Tokens (JWTs) are a popular way to encode and transmit data securely between two parties. JWTs are used in a variety of applications, such as authentication, authorization, and data sharing.",
      `If you need to decode a JWT, you can use our free online JWT decoder tool. It's simple to use and completely free.`,
      "To use the tool, simply copy and paste your JWT into the text box. The tool will instantly decode the JWT and show you the header, payload, and signature.",
      `Our JWT decoder tool is perfect for developers, testers, and anyone else who needs to decode JWTs. It's also great for learning more about JWTs and how they work.`,
      "No matter what your needs are, our free online JWT decoder tool is a valuable resource. Try it today and see how easy it is to use!",
    ],
  },
  {
    heading: "Features of our free online JWT decoder tool:",
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It's accurate and reliable.`,
      "It decodes JWTs into header, payload, and signature.",
      `It's perfect for developers, testers, and anyone else who needs to decode JWTs.`,
      `It's great for learning more about JWTs and how they work.`,
      `Provides an easy way to either copy the decoded JWT token data or copy the shareable link for the JWT.`,
    ],
  },
  {
    heading:
      "Here are some examples of how you can use our free online JWT decoder tool:",
    listData: [
      "Developers can use the tool to decode JWTs that they are developing or testing.",
      "Testers can use the tool to decode JWTs that they are testing.",
      "Anyone can use the tool to decode JWTs that they have received or need to decode for any reason.",
    ],
  },
  {
    heading: "What is a JWT?",
    blockData: [
      "A JSON Web Token (JWT) is an open standard (RFC 7519) for creating and verifying claims between two parties. A JWT is a string made up of three parts, separated by dots (.). The first part is the header, which contains information about the token, such as the algorithm used to sign it and the type of token. The second part is the payload, which contains the claims that are being made. The third part is the signature, which is used to verify the authenticity of the token.",
    ],
  },
  {
    heading: "How to use our JWT decoder tool:",
    blockData: [
      'To use our JWT decoder tool, simply copy and paste your JWT into the text box and click the "Decode" button. The tool will instantly decode the JWT and show you the header, payload, and signature.',
    ],
  },
  {
    heading: "Tips for using our JWT decoder tool:",
    listData: [
      `Make sure to copy and paste the entire JWT into the text box, including the dots (.).`,
      `If you are having trouble decoding a JWT, you can try using a different algorithm.`,
      `You can also use our JWT decoder tool to decode JWTs that are encoded in different ways, such as base64 encoded or URL safe encoded.`,
    ],
  },
  {
    blockData: ["We hope you find our free online JWT decoder tool helpful!"],
  },
  {
    heading: "References",
    links: [
      {
        displayText: "Read more about JSON Web Token (JWT) at Wikipedia",
        url: "https://en.wikipedia.org/wiki/JSON_Web_Token",
      },
      {
        displayText: "RFC 7519",
        url: "https://www.ietf.org/rfc/rfc7519.txt",
      },
    ],
  },
];
