import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/test-hardware";
const pageTitle = "Online Hardware Test | Test Camera, Mic, & Speakers";
const pageDescription =
  "Easily test your camera, microphone, speakers, and other hardware with our free online tool. Get instant results for your webcam, mic, battery, and more.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/test-hardware.png`;

const keywords = [
  "hardware test",
  "online hardware test",
  "webcam test",
  "mic test",
  "speaker test",
  "microphone test",
  "camera test",
  "test my hardware",
  "device tester",
  "battery test",
  "gpu test",
  "system information",
].join(", ");

export const metadata: Metadata = {
  alternates: { canonical: `${process.env.HOSTNAME}${navigationUrl}` },
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
    siteName: "WebToolsEasy",
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
  authors: { name: "Gaurav Kumar Yadav" },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Online Hardware Test | Test Camera, Mic, & Speakers",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((w) => w.trim()),
  relatedTools: [ApplicationIds.TIMEZONE_CONVERTER, ApplicationIds.JSON_VIEWER],
  structuredData: createToolStructuredData({
    pageUrl: "test-hardware",
    pageTitle,
    mainHeading: "Test My Hardware Devices - Camera, Mic, Speakers",
    keywords: keywords.split(",").map((w) => w.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Comprehensive Online Hardware Test",
    blockData: [
      "Our free online hardware test tool helps you quickly check the functionality of your essential devices. Whether you're preparing for a video call, troubleshooting issues, or just curious about your system's capabilities, our tool provides instant and accurate results. Test your camera, microphone, speakers, and more, all from the comfort of your browser.",
    ],
  },
  {
    heading: "Why Use Our Hardware Tester?",
    listData: [
      "Accurate & Instant Results: Get real-time feedback on your hardware's performance.",
      "Privacy-Focused: All tests run directly in your browser. No data is ever uploaded or stored.",
      "Easy to Use: A simple, intuitive interface makes hardware testing a breeze for everyone.",
      "Completely Free: No hidden costs or subscriptions. Test your hardware as often as you need.",
    ],
  },
  {
    heading: "Available Hardware Tests",
    listData: [
      "Camera Test: Check if your webcam is working correctly. Our tool will display the video feed from your camera, confirming it's operational. You can also select from multiple connected cameras.",
      "Microphone Test: Ensure your microphone is capturing audio clearly. Speak into your mic and see the visual feedback in real-time. This is perfect for checking your setup before a meeting or recording.",
      "Speaker Test: Verify your speakers or headphones are producing sound. A simple test tone will play, allowing you to confirm your audio output is working as expected.",
      "System Information: Get a quick overview of your system's key hardware, including battery status (level and charging state) and GPU (Graphics Processing Unit) information.",
    ],
  },
  {
    heading: "How It Works",
    blockData: [
      "Our hardware tester uses your browser's built-in capabilities to access and test your devices. When you start a test, your browser will ask for permission to access the necessary hardware (like your camera or microphone). Once you grant permission, the tool will perform the test and display the results instantly. All processing is done on your device, ensuring your privacy and security.",
    ],
  },
];
