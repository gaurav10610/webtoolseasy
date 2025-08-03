import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/video-to-audio-converter";
const pageTitle = "Video to Audio Converter - Extract MP3 from Video";
const pageDescription =
  "Convert video to audio online for free. Extract MP3, WAV from MP4, AVI, MKV videos with high quality results. No upload limits or registration.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/video-to-audio-converter.png`;

const keywords =
  "video to audio converter,extract audio from video,mp4 to mp3,video to mp3,audio extractor,convert video online,mp4 to wav";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
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
    "Free Video to Audio Converter: Convert Any Video to Audio in Any Format",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.SCREEN_RECORDER],
  structuredData: createToolStructuredData({
    pageUrl: "video-to-audio-converter",
    pageTitle,
    mainHeading: "Free Video to Audio Converter: Convert Any Video to Audio in Any Format",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Free Online Video to Audio Converter",
    blockData: [
      "Convert video files to high-quality audio formats with our free online video to audio converter. Extract audio tracks from MP4, AVI, MOV, WebM, and other video formats to create MP3, WAV, or other audio files. Perfect for creating podcasts, audiobooks, music libraries, or extracting soundtracks.",
      "Our browser-based converter ensures your files remain private while providing fast, efficient conversion without quality loss. Support for multiple output formats and customizable audio quality settings makes it ideal for both personal and professional use.",
    ],
  },
  {
    heading: "Supported Video and Audio Formats",
    listData: [
      "Input: MP4, AVI, MOV, WebM, MKV, FLV, WMV, 3GP",
      "Output: MP3, WAV, AAC, OGG, M4A, FLAC",
      "High-quality audio extraction up to 320kbps",
      "Batch conversion for multiple files",
      "Preserve original audio quality or customize settings",
      "Support for videos up to 2GB in size",
      "Fast conversion with real-time progress tracking",
    ],
  },
  {
    heading: "Perfect for Content Creation",
    blockData: [
      "• **Podcasters**: Extract audio from video interviews and recordings",
      "• **Musicians**: Convert music videos to audio files for offline listening",
      "• **Students**: Create audio study materials from lecture videos",
      "• **Content Creators**: Extract soundtracks and voice-overs from videos",
      "• **Professionals**: Convert webinar and meeting recordings to audio",
    ],
  },
  {
    heading: "Advanced Conversion Features",
    listData: [
      "Privacy-focused: All processing happens in your browser",
      "No file size limits for standard conversions",
      "Customizable audio bitrate and quality settings",
      "Trim and edit audio during conversion process",
      "Instant download without waiting queues",
      "Cross-platform compatibility (Windows, Mac, Linux, mobile)",
    ],
  },
];
