import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/audio-converter";
const pageTitle = "Audio Converter - Convert Audio Files Online Free";
const pageDescription =
  "Free online audio converter. Convert MP3, WAV, OGG, M4A, AAC, FLAC and more. Fast browser-based conversion with no upload required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/audio-converter.png`;
const keywords =
  "audio converter,convert audio,MP3 converter,WAV converter,audio format converter,convert to MP3,audio file converter,online audio converter,free audio converter";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: keywords,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Audio Converter Tool",
      },
    ],
    url: navigationUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
  mainHeading: "Audio Converter: Convert Audio Files Online Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [],
  structuredData: createToolStructuredData({
    pageUrl: "audio-converter",
    pageTitle,
    mainHeading: "Audio Converter: Convert Audio Files Online Free",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an Audio Converter?",
    blockData: [
      "An audio converter is a free online tool that converts audio files between different formats such as MP3, WAV, OGG, M4A, AAC, and FLAC. Our browser-based audio converter uses FFmpeg technology to process files entirely on your device - no server uploads required for complete privacy.",
      "Perfect for musicians, podcasters, content creators, and anyone needing to convert audio files for compatibility across different devices and platforms.",
    ],
  },
  {
    heading: "Supported Audio Formats",
    blockData: [
      "• MP3 - Universal audio format, compatible with all devices",
      "• WAV - Uncompressed audio, high quality for editing",
      "• OGG - Open-source compressed format",
      "• M4A - Apple's audio format, great quality",
      "• AAC - Advanced audio codec, efficient compression",
      "• FLAC - Lossless compression, audiophile choice",
      "• WMA - Windows Media Audio format",
    ],
  },
  {
    heading: "How to Convert Audio Files",
    blockData: [
      "1. Click 'Select Audio File' or drag and drop your audio file",
      "2. Choose the output format from the dropdown (MP3, WAV, etc.)",
      "3. Click 'Convert' to start the conversion process",
      "4. Wait for the conversion to complete",
      "5. Click 'Download' to save your converted audio file",
      "6. Repeat for multiple files as needed",
    ],
  },
  {
    heading: "Why Convert Audio Files?",
    blockData: [
      "• Compatibility: Play audio on any device or software",
      "• File size: Compress audio for email or storage",
      "• Quality: Convert to lossless formats for archiving",
      "• Editing: Prepare audio in the right format for your audio editor",
      "• Streaming: Optimize audio for online streaming",
      "• Mobile devices: Convert to device-compatible formats",
      "• Professional use: Match client or platform requirements",
    ],
  },
  {
    heading: "Audio Format Guide",
    blockData: [
      "MP3 is the most compatible format, working on virtually all devices. Use it for general-purpose audio sharing and playback.",
      "WAV provides uncompressed audio quality, ideal for professional audio editing and mastering. However, file sizes are much larger.",
      "FLAC offers lossless compression - perfect audio quality with smaller file sizes than WAV. Great for music libraries and archiving.",
      "AAC and M4A provide excellent quality at smaller sizes compared to MP3, and are the preferred formats for Apple devices.",
    ],
  },
];
