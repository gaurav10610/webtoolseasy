import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/webcam-recorder";
const pageTitle = "Webcam Recorder - Record Video Online Free";
const pageDescription =
  "Record webcam video online for free. Capture video and audio from your camera with no download required. Perfect for video messages and vlogs.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/webcam-recorder.png`;

const keywords =
  "webcam recorder,record webcam,webcam video recorder,online webcam recorder,free webcam recorder,record video online,camera recorder";

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
  mainHeading: "Free Webcam Recorder - Record Video and Audio from Your Camera",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.SCREEN_RECORDER,
    ApplicationIds.VIDEO_CONVERTER,
    ApplicationIds.SPEECH_TO_TEXT,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "webcam-recorder",
    pageTitle,
    mainHeading:
      "Free Webcam Recorder - Record Video and Audio from Your Camera",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Webcam Recorder?",
    blockData: [
      "A webcam recorder is an online tool that allows you to record video and audio directly from your computer&apos;s webcam and microphone. Our free webcam recorder runs entirely in your web browser, requiring no downloads or installations. It&apos;s perfect for creating video messages, recording vlogs, conducting video interviews, or capturing any content that requires your camera.",
    ],
  },
  {
    heading: "Key Features of Our Webcam Recorder",
    listData: [
      "Free to use with no sign-up required",
      "Record video and audio from your webcam and microphone",
      "High-quality video recording up to 1080p resolution",
      "Choose from multiple video quality settings",
      "Real-time preview while recording",
      "Pause and resume recording functionality",
      "Download recordings instantly as WebM files",
      "No watermarks or time limits",
      "100% privacy - all processing happens in your browser",
      "Works on all modern browsers (Chrome, Firefox, Safari, Edge)",
    ],
  },
  {
    heading: "How to Use the Webcam Recorder",
    listData: [
      "Click the &quot;Start Recording&quot; button",
      "Grant camera and microphone permissions when prompted",
      "Select your preferred camera and microphone from the dropdowns",
      "Adjust video quality settings if needed",
      "Click &quot;Start Recording&quot; again to begin capturing",
      "Use pause/resume controls during recording if needed",
      "Click &quot;Stop Recording&quot; when finished",
      "Preview your recording and download it to your device",
    ],
  },
  {
    heading: "Common Use Cases for Webcam Recording",
    listData: [
      "Creating video messages for friends, family, or colleagues",
      "Recording video resumes or cover letters for job applications",
      "Producing vlogs and video content for social media",
      "Conducting remote video interviews",
      "Recording video testimonials or reviews",
      "Creating educational content and tutorials",
      "Recording video diaries or personal journals",
      "Capturing live reactions and commentary",
    ],
  },
  {
    heading: "Tips for Better Webcam Recordings",
    listData: [
      "Ensure good lighting - face a window or use a lamp for better video quality",
      "Position your camera at eye level for the most flattering angle",
      "Use a quiet environment to minimize background noise",
      "Test your audio levels before starting the actual recording",
      "Look directly at the camera when speaking for better engagement",
      "Keep a clean, uncluttered background behind you",
      "Practice your content beforehand if recording a script",
      "Use a stable surface to prevent camera shake",
    ],
  },
  {
    heading: "Technical Specifications",
    listData: [
      "Supported video resolutions: 480p, 720p, 1080p",
      "Output format: WebM (VP9 codec)",
      "Audio format: Opus codec",
      "Browser requirements: Chrome 60+, Firefox 55+, Safari 14.1+, Edge 79+",
      "No file size limits",
      "Recordings saved locally on your device",
    ],
  },
  {
    heading: "Privacy and Security",
    blockData: [
      "Your privacy is our top priority. All webcam recordings are processed entirely in your web browser using client-side JavaScript. No video or audio data is ever uploaded to our servers. Your recordings remain completely private and are only saved to your local device. We do not collect, store, or have access to any of your recorded content.",
    ],
  },
  {
    blockData: [
      "Our free online webcam recorder makes it easy to capture high-quality video and audio from your camera without any software installation. Whether you&apos;re creating video content, recording messages, or conducting interviews, our tool provides everything you need for professional webcam recording right in your browser.",
    ],
  },
];
