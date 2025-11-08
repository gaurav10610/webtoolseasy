import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { Metadata } from "next";
import { DescriptionBlock } from "@/types/description";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/speech-to-text";
const pageTitle = "Speech to Text Converter - Voice Recognition Online";
const metaDescription =
  "Convert speech to text instantly with our free voice recognition tool. Supports 20+ languages, real-time transcription, download/copy features. No installation.";

const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/speech-to-text.png`;

const keywords =
  "speech to text,voice to text,speech recognition,voice recognition,audio transcription,dictation tool,voice dictation,real-time transcription";

export const metadata: Metadata = {
  title: pageTitle,
  description: metaDescription,
  keywords: keywords,
  authors: [{ name: "WebToolsEasy" }],
  creator: "WebToolsEasy",
  publisher: "WebToolsEasy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  openGraph: {
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    title: pageTitle,
    description: metaDescription,
    siteName: "WebToolsEasy",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        width: 1200,
        height: 630,
        alt: "Speech to Text Converter Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: metaDescription,
    images: [imageUrl],
    creator: "@webtoolseasy",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const componentConfig: ApplicationConfig = {
  navigationUrl,
  pageTitle,
  mainHeading:
    "Free Online Speech to Text Converter: Voice Recognition Made Easy",
  tags: [
    "speech to text",
    "voice to text",
    "speech recognition",
    "voice recognition",
    "audio transcription",
    "dictation tool",
    "voice dictation",
    "speech converter",
    "voice converter",
    "audio to text converter",
    "online speech recognition",
    "web speech API",
    "live transcription",
    "real-time speech to text",
    "voice typing",
    "dictation software",
    "speech transcription",
    "voice notes",
    "audio notes to text",
    "multilingual speech recognition",
    "free speech to text",
    "browser speech recognition",
    "voice commands",
    "accessibility tool",
    "hands-free typing",
    "speech input",
    "voice input",
    "audio transcription tool",
    "automatic speech recognition",
    "ASR tool",
    "microphone input",
    "voice recording",
    "transcript download",
    "voice memo transcription",
    "instant voice to text",
    "accurate speech recognition",
    "multiple language support",
    "continuous speech recognition",
    "interim speech results",
    "confidence score",
    "speech analytics",
    "voice data processing",
    "audio processing",
    "natural language processing",
    "AI speech recognition",
    "machine learning transcription",
  ],
  relatedTools: [
    ApplicationIds.TEXT_EDITOR,
    ApplicationIds.WORD_COUNTER,
    ApplicationIds.MARKDOWN_EDITOR,
    ApplicationIds.TEXT_COMPARE,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "speech-to-text",
    pageTitle,
    mainHeading:
      "Free Online Speech to Text Converter: Voice Recognition Made Easy",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Speech to Text?",
    blockData: [
      "Speech to text, also known as voice recognition or automatic speech recognition (ASR), is the technology that converts spoken words into written text. Our free online speech to text converter uses your browser's built-in Web Speech API to provide real-time transcription of your voice.",
    ],
  },
  {
    heading: "Why Use Our Online Speech to Text Tool?",
    listData: [
      "Free & No Downloads: Use directly in your browser without installing any software",
      "Multi-Language Support: Supports 20+ languages including English, Spanish, French, German, and more",
      "Real-Time Transcription: See your words appear instantly as you speak",
      "High Accuracy: Advanced speech recognition with confidence scoring",
      "Privacy Focused: All processing happens in your browser - no data stored on servers",
      "Easy Export: Copy to clipboard or download as text file",
      "Accessibility: Perfect for users with typing difficulties or disabilities",
    ],
  },
  {
    heading: "Features of Our Speech Recognition Tool",
    listData: [
      "Continuous Recording: Keep recording for extended periods",
      "Interim Results: See partial results while speaking",
      "Pause & Resume: Control your recording session",
      "Word & Character Count: Track your transcription length",
      "Recognition History: Review all transcribed segments",
      "Confidence Scoring: See how accurate each recognition was",
      "Custom Settings: Adjust language and recognition preferences",
      "Mobile Friendly: Works on desktop, tablet, and mobile devices",
    ],
  },
  {
    heading: "How to Use Our Speech to Text Converter",
    listData: [
      "Allow Microphone Access: Grant permission when prompted by your browser",
      "Select Language: Choose your preferred language from the dropdown",
      "Configure Settings: Enable continuous recording and interim results as needed",
      "Start Recording: Click the 'Start Recording' button to begin",
      "Speak Clearly: Talk normally into your microphone",
      "Review Text: Watch as your speech is converted to text in real-time",
      "Edit if Needed: Make any necessary corrections to the transcribed text",
      "Export Results: Copy to clipboard or download as a text file",
    ],
  },
  {
    heading: "Supported Languages",
    blockData: [
      "Our speech to text tool supports a wide range of languages including:",
    ],
    listData: [
      "English: US, UK, Australia, Canada",
      "Spanish: Spain, Mexico",
      "French: France, Canada",
      "German: Germany",
      "Italian: Italy",
      "Portuguese: Brazil, Portugal",
      "Russian: Russia",
      "Chinese: Mandarin (China, Taiwan)",
      "Japanese: Japan",
      "Korean: South Korea",
      "Hindi: India",
      "Arabic: Saudi Arabia",
      "Dutch: Netherlands",
      "And many more regional variants and dialects",
    ],
  },
  {
    heading: "Tips for Better Speech Recognition",
    listData: [
      "Quiet Environment: Use in a noise-free space for best results",
      "Clear Speaking: Speak clearly and at a normal pace",
      "Good Microphone: Use a quality microphone positioned properly",
      "Stable Internet: Ensure good internet connection for online recognition",
      "Browser Support: Use Chrome, Edge, or Safari for best compatibility",
      "Pronunciation: Speak words fully and avoid mumbling",
      "Punctuation: Pause naturally at sentence boundaries",
      "Technical Terms: Spell out difficult or technical words if needed",
    ],
  },
  {
    heading: "Use Cases for Speech to Text",
    listData: [
      "Content Creation: Quickly draft articles, blogs, and documents",
      "Note Taking: Capture meeting notes and lectures hands-free",
      "Accessibility: Assist users with typing difficulties",
      "Dictation: Traditional dictation for letters and memos",
      "Brainstorming: Capture ideas quickly without typing",
      "Language Learning: Practice pronunciation and get immediate feedback",
      "Transcription: Convert recorded audio to text",
      "Voice Commands: Create voice-controlled workflows",
    ],
  },
  {
    heading: "Privacy and Security",
    blockData: ["Your privacy is important to us. Our speech to text tool:"],
    listData: [
      "No Data Storage: Audio is processed in real-time without storage",
      "Browser-Based: Uses your browser's native speech recognition",
      "No Uploads: Audio never leaves your device",
      "Secure Processing: All recognition happens locally when possible",
      "No Registration: Use the tool without creating accounts",
      "GDPR Compliant: Follows European data protection standards",
    ],
  },
  {
    heading: "Technical Requirements",
    listData: [
      "Supported Browsers: Chrome, Edge, Safari (latest versions)",
      "Microphone: Working microphone with proper permissions",
      "Internet Connection: Required for speech recognition processing",
      "Operating System: Windows, macOS, Linux, iOS, Android",
      "Hardware: Modern device with adequate processing power",
      "Audio Drivers: Up-to-date audio drivers for optimal performance",
    ],
  },
  {
    heading: "Conclusion",
    blockData: [
      "Our free online speech to text converter provides a powerful, accessible way to convert your voice into written text. Whether you're creating content, taking notes, or need accessibility assistance, our tool offers professional-grade speech recognition with the convenience of no downloads or installations required. Start converting your speech to text today!",
    ],
  },
];
