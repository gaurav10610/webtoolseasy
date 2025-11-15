import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/text-to-speech";
const pageTitle = "Text to Speech - Free Online TTS Voice Generator";
const pageDescription =
  "Convert text to speech online for free. Natural AI voices with adjustable speed, pitch, and volume. Download as audio or listen instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/text-to-speech.png`;

const keywords =
  "text to speech,tts,text to voice,speech generator,voice generator,read aloud,text reader,natural voice,ai voice";

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
  mainHeading: "Text to Speech Converter: Convert Text to Natural Voice Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.SPEECH_TO_TEXT,
    ApplicationIds.TEXT_EDITOR,
    ApplicationIds.WORD_COUNTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "text-to-speech",
    pageTitle,
    mainHeading: "Text to Speech Converter: Convert Text to Natural Voice Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Text to Speech (TTS)?",
    blockData: [
      "Text to Speech (TTS) is a technology that converts written text into spoken words using synthetic voices. Our free online TTS tool uses your browser's built-in speech synthesis engine to generate natural-sounding speech from any text. Perfect for accessibility, proofreading, language learning, and content creation.",
      "The tool works entirely in your browser using the Web Speech API, ensuring your text remains private and secure. No data is sent to external servers, and you can use it offline once the page is loaded.",
    ],
  },
  {
    heading: "Key Features",
    blockData: [
      "• Multiple voices: Choose from various voices and accents available in your browser",
      "• Adjustable speed: Control speaking rate from 0.5x to 2x normal speed",
      "• Pitch control: Modify voice pitch for different effects",
      "• Volume control: Adjust output volume to your preference",
      "• Play/Pause/Stop: Full playback controls for your convenience",
      "• Text highlighting: Follow along as the text is spoken (browser support varies)",
      "• No limits: Convert unlimited text without restrictions",
      "• Privacy-first: All processing happens in your browser",
    ],
  },
  {
    heading: "How to Use Text to Speech Converter",
    blockData: [
      "1. Type or paste your text into the input area",
      "2. Select your preferred voice from the dropdown menu",
      "3. Adjust speed, pitch, and volume settings if needed",
      "4. Click 'Speak' to hear your text read aloud",
      "5. Use pause/resume controls to manage playback",
      "6. Download as audio file if supported by your browser",
    ],
  },
  {
    heading: "Common Use Cases",
    blockData: [
      "Accessibility: Help visually impaired users consume written content",
      "Proofreading: Listen to your writing to catch errors and improve flow",
      "Language Learning: Hear correct pronunciation of words and sentences",
      "Multitasking: Listen to articles, emails, or documents while doing other tasks",
      "Content Creation: Generate voice-overs for videos and presentations",
      "E-learning: Create audio versions of educational content",
      "Audiobooks: Convert text documents into audio format",
      "Testing: Preview how screen readers will announce your web content",
    ],
  },
  {
    heading: "Voice Quality and Languages",
    blockData: [
      "The quality and number of available voices depend on your browser and operating system. Modern browsers typically provide:",
      "• Multiple languages including English, Spanish, French, German, Chinese, Japanese, and many more",
      "• Various accents for major languages (British English, American English, etc.)",
      "• Male and female voices",
      "• Natural-sounding neural voices on supported platforms",
      "Chrome and Edge generally offer the widest selection of high-quality voices through their cloud TTS services when online.",
    ],
  },
  {
    heading: "Tips for Better Results",
    blockData: [
      "Use proper punctuation: Commas create short pauses, periods create longer ones",
      "Add line breaks between paragraphs for natural pacing",
      "Spell out abbreviations for clearer pronunciation",
      "Use standard spelling to ensure correct pronunciation",
      "Adjust speed based on content complexity - slower for technical text",
      "Try different voices to find one that suits your content",
      "Break very long texts into sections for better control",
      "Test pronunciation of unusual words or names",
    ],
  },
  {
    heading: "Browser Compatibility",
    blockData: [
      "This tool works in all modern browsers that support the Web Speech API, including:",
      "• Google Chrome (desktop and mobile)",
      "• Microsoft Edge",
      "• Safari (macOS and iOS)",
      "• Firefox",
      "• Opera",
      "Note: Voice selection and quality may vary between browsers and operating systems. For the best experience, use Chrome or Edge which provide access to high-quality neural voices.",
    ],
  },
];
