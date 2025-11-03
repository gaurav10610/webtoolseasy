import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/password-generator";
const pageTitle = "Password Generator - Create Strong Secure Passwords";
const pageDescription =
  "Generate strong, secure passwords instantly. Free password generator with customizable length, characters, and bulk generation. Enhance your security now.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/password-generator.png`;

const keywords =
  "password generator,strong password generator,secure passwords,random password generator,password creator,bulk password generator,password maker";

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
  mainHeading:
    "Free Online Password Generator: Create Strong, Secure & Random Passwords",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.JWT_DECODER],
  structuredData: createToolStructuredData({
    pageUrl: "password-generator",
    pageTitle,
    mainHeading: "Free Online Password Generator: Create Strong, Secure & Random Passwords",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Why Strong Passwords Matter for Security",
    blockData: [
      "Strong passwords are your first line of defense against cyber attacks and data breaches. Our free password generator creates cryptographically secure passwords that protect your accounts from hackers using brute force attacks.",
      "With cyber crime increasing daily, using weak or repeated passwords puts your personal and financial information at risk. Generate unique passwords for every account to maintain maximum security.",
    ],
  },
  {
    heading: "How to Generate Secure Passwords",
    listData: [
      "Choose your desired password length (12-128 characters recommended)",
      "Select character types: uppercase, lowercase, numbers, and symbols",
      "Generate single passwords or create up to 100 passwords in bulk",
      "Copy passwords directly or download them as a secure text file",
      "Use generated passwords immediately in password managers or accounts",
    ],
  },
  {
    heading: "Password Generator Features",
    listData: [
      "100% free with unlimited password generation",
      "Cryptographically secure random password generation",
      "Customizable length and character set options",
      "Bulk password generation for multiple accounts",
      "No data storage - passwords generated locally in your browser",
      "Compatible with all password managers and security tools",
    ],
  },
  {
    heading: "Password Security Best Practices",
    blockData: [
      "• **Use Unique Passwords**: Never reuse passwords across multiple accounts",
      "• **Minimum Length**: Use at least 12 characters, preferably 16 or more",
      "• **Mix Character Types**: Include uppercase, lowercase, numbers, and symbols",
      "• **Avoid Personal Info**: Don't use names, birthdays, or dictionary words",
      "• **Use Password Managers**: Store complex passwords securely with dedicated tools",
      "• **Enable 2FA**: Add two-factor authentication for extra security layers",
    ],
  },
];
