import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/audio-recorder";
const pageTitle = "Audio Recorder - Record Audio Online Free";
const pageDescription =
  "Record audio online for free. Capture high-quality audio from your microphone with no download required. Perfect for voice memos and podcasts.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/audio-recorder.png`;

const keywords =
  "audio recorder,record audio,online audio recorder,voice recorder,microphone recorder,free audio recorder,record voice online";

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
    images: [imageUrl],
    description: pageDescription,
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Free Online Audio Recorder - Record Voice and Sound",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.SPEECH_TO_TEXT,
    ApplicationIds.TEXT_TO_SPEECH,
    ApplicationIds.VIDEO_CONVERTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "audio-recorder",
    pageTitle,
    mainHeading: "Free Online Audio Recorder - Record Voice and Sound",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an Audio Recorder?",
    blockData: [
      "An audio recorder is an online tool that captures sound from your computer&apos;s microphone. Our free audio recorder runs entirely in your web browser with no software installation required. It&apos;s ideal for recording voice memos, podcasts, interviews, music, lectures, meetings, and any other audio content. The tool provides high-quality audio recording with an easy-to-use interface.",
    ],
  },
  {
    heading: "Key Features of Our Audio Recorder",
    listData: [
      "Free to use with unlimited recording time",
      "No sign-up or account required",
      "High-quality audio recording (up to 48kHz sample rate)",
      "Real-time audio level monitoring",
      "Pause and resume recording capability",
      "Multiple microphone support - choose your preferred input device",
      "Download recordings as WebM audio files",
      "No watermarks or restrictions",
      "100% privacy - all recording happens locally in your browser",
      "Compatible with all modern browsers",
    ],
  },
  {
    heading: "How to Record Audio Online",
    listData: [
      "Click the &quot;Start Recording&quot; button",
      "Allow microphone access when your browser prompts you",
      "Select your preferred microphone if you have multiple devices",
      "Watch the audio level meter to ensure proper input levels",
      "Speak or play the audio you want to record",
      "Use pause/resume if you need to take breaks during recording",
      "Click &quot;Stop Recording&quot; when you&apos;re finished",
      "Preview your recording using the built-in audio player",
      "Download the audio file to your computer",
    ],
  },
  {
    heading: "Common Uses for Audio Recording",
    listData: [
      "Recording voice memos and notes for personal reference",
      "Creating podcast episodes and audio content",
      "Recording interviews for journalism or research",
      "Capturing music performances and rehearsals",
      "Recording lectures and educational content",
      "Creating audiobooks and voice-overs",
      "Recording meeting minutes and discussions",
      "Capturing ideas and creative thoughts on the go",
      "Recording language learning practice sessions",
      "Creating audio messages for social media",
    ],
  },
  {
    heading: "Tips for High-Quality Audio Recording",
    listData: [
      "Use a quiet environment to minimize background noise",
      "Position your microphone 6-12 inches from your mouth",
      "Avoid touching or moving the microphone during recording",
      "Speak clearly and at a consistent volume",
      "Use a pop filter to reduce plosive sounds (p, b, t sounds)",
      "Monitor audio levels - aim for peaks around -12dB to -6dB",
      "Close unnecessary applications to prevent system sounds",
      "Use a quality external microphone for better results",
      "Record a test clip first to check audio quality",
      "Consider using headphones to monitor your recording",
    ],
  },
  {
    heading: "Technical Information",
    listData: [
      "Output format: WebM with Opus audio codec",
      "Sample rate: Up to 48kHz",
      "Bit depth: 16-bit or higher",
      "Browser support: Chrome, Firefox, Safari, Edge (latest versions)",
      "No file size limitations",
      "Recordings stored locally on your device only",
      "Real-time audio visualization",
    ],
  },
  {
    heading: "Privacy and Security",
    blockData: [
      "Your privacy is paramount. All audio recording happens entirely within your web browser using client-side JavaScript and the Web Audio API. No audio data is uploaded to any server. Your recordings remain completely private and are saved only to your local device. We have no access to, and do not collect or store, any of your recorded audio content.",
    ],
  },
  {
    blockData: [
      "Our free online audio recorder provides a simple, powerful way to capture high-quality audio directly from your browser. Whether you&apos;re recording voice memos, creating podcast content, or capturing any other audio, our tool offers professional features with complete privacy protection.",
    ],
  },
];
