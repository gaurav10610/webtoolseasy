import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/video-compressor";
const pageTitle = "Video Compressor - Compress Video Online Free";
const pageDescription =
  "Compress video files online for free. Reduce video size without losing quality. Support for MP4, AVI, MOV, and all major formats. No watermark.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/video-compressor.png`;

const keywords =
  "video compressor,compress video,reduce video size,video size reducer,compress mp4,shrink video,video optimizer";

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
  mainHeading: "Free Video Compressor - Reduce Video File Size Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.VIDEO_CONVERTER,
    ApplicationIds.VIDEO_EDITOR,
    ApplicationIds.GIF_MAKER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "video-compressor",
    pageTitle,
    mainHeading: "Free Video Compressor - Reduce Video File Size Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Video Compressor?",
    blockData: [
      "A video compressor is an online tool that reduces the file size of video files while maintaining acceptable video quality. Our free video compressor uses advanced compression algorithms to shrink video files, making them easier to share, upload, and store. The tool runs entirely in your browser with no software installation required, ensuring your videos remain private and secure.",
    ],
  },
  {
    heading: "Key Features of Our Video Compressor",
    listData: [
      "Free to use with no file size limits",
      "Compress videos up to 90% smaller",
      "Support for all major formats: MP4, AVI, MOV, WebM, MKV, FLV",
      "Multiple compression levels: Low, Medium, High",
      "Adjust video resolution to reduce file size",
      "Control video bitrate for custom compression",
      "Preserve video quality with smart compression",
      "No watermarks added to compressed videos",
      "100% privacy - all processing in your browser",
      "Fast compression using WebAssembly",
    ],
  },
  {
    heading: "How to Compress a Video",
    listData: [
      "Click &quot;Upload Video&quot; to select your video file",
      "Choose compression level (Low, Medium, or High)",
      "Optionally adjust resolution to reduce size further",
      "Set custom bitrate if you want precise control",
      "Click &quot;Compress Video&quot; to start processing",
      "Wait for compression to complete (time varies by file size)",
      "Preview the compressed video to check quality",
      "Download your compressed video file",
    ],
  },
  {
    heading: "Why Compress Videos?",
    listData: [
      "Faster uploads to social media and cloud storage",
      "Easier sharing via email and messaging apps",
      "Save storage space on your devices",
      "Reduce bandwidth usage for streaming",
      "Speed up website loading times",
      "Meet platform file size requirements",
      "Improve playback on slower connections",
      "Archive more videos in the same storage space",
    ],
  },
  {
    heading: "Compression Levels Explained",
    listData: [
      "Low Compression: Minimal size reduction, highest quality (10-30% smaller)",
      "Medium Compression: Balanced size and quality (30-60% smaller)",
      "High Compression: Maximum size reduction, acceptable quality (60-90% smaller)",
      "Custom: Full control over resolution and bitrate settings",
    ],
  },
  {
    heading: "Tips for Best Results",
    listData: [
      "Start with medium compression to balance size and quality",
      "Reduce resolution if file size is more important than quality",
      "Use high compression for videos that don&apos;t need perfect quality",
      "Keep original resolution for important or professional videos",
      "Test different settings for optimal results",
      "Consider your intended use case when choosing compression level",
      "Higher bitrates preserve quality but increase file size",
      "Modern codecs like H.265 provide better compression than H.264",
    ],
  },
  {
    heading: "Technical Specifications",
    listData: [
      "Input formats: MP4, AVI, MOV, WebM, MKV, FLV, M4V, 3GP",
      "Output format: MP4 (H.264 or H.265 codec)",
      "Resolution options: Original, 1080p, 720p, 480p, 360p",
      "Bitrate range: 500 kbps to 10000 kbps",
      "Audio: Compressed to AAC at 128 kbps",
      "Processing: Client-side using FFmpeg WebAssembly",
      "No server upload required",
    ],
  },
  {
    heading: "Privacy and Security",
    blockData: [
      "Your video privacy is guaranteed. All video compression happens entirely within your web browser using WebAssembly technology. Your video files are never uploaded to any server - they remain on your device throughout the entire compression process. We cannot see, access, or store your videos. Once you close the browser, all data is automatically cleared from memory.",
    ],
  },
  {
    blockData: [
      "Our free online video compressor makes it easy to reduce video file sizes without sacrificing too much quality. Whether you need to compress videos for email, social media, or storage optimization, our tool provides the flexibility and power you need while keeping your files completely private.",
    ],
  },
];
