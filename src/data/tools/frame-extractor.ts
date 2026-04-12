import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/frame-extractor";
const pageTitle =
  "Video Frame Extractor - Extract Frames from Video Online Free";
const pageDescription =
  "Extract frames from any video file online for free. Save individual frames or bulk-export multiple frames as PNG or JPEG images. Works entirely in your browser — no upload required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/frame-extractor.png`;
const keywords =
  "video frame extractor,extract frames from video,video to image,capture video frames,screenshot from video,frame grabber,video frame capture,extract images from video,video screenshot tool,bulk frame extractor";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords: keywords,
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://webtoolseasy.com",
  ),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Video Frame Extractor Tool",
      },
    ],
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
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
  mainHeading: "Video Frame Extractor: Extract Frames from Video Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [],
  structuredData: createToolStructuredData({
    pageUrl: "frame-extractor",
    pageTitle,
    mainHeading: "Video Frame Extractor: Extract Frames from Video Free",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Video Frame Extractor?",
    blockData: [
      "A video frame extractor is a free online tool that lets you capture individual frames from any video file and save them as high-quality PNG or JPEG images. Simply upload a video, seek to any point, and export the frames you need — all processing happens locally in your browser.",
      "Great for content creators, developers, video editors, and anyone who needs to pull still images from a video without specialised software.",
    ],
  },
  {
    heading: "Key Features",
    listData: [
      "Extract single frames at any timestamp with one click",
      "Bulk-extract multiple frames across a custom time range",
      "Choose output format: PNG (lossless) or JPEG (smaller files)",
      "Adjustable JPEG quality slider for fine-grained size control",
      "Set frame count or extraction interval for bulk exports",
      "Download all frames as a single ZIP archive",
      "Native browser processing — no file upload to any server",
      "Supports MP4, WebM, AVI, MOV, and other common video formats",
    ],
  },
  {
    heading: "How to Extract Frames",
    listData: [
      "1. Upload your video file using the drag-and-drop area or file picker",
      "2. Use the video player to navigate to the frame you want",
      "3. Click 'Capture Frame' to grab the current frame",
      "4. For bulk export, set the start time, end time, and number of frames then click 'Extract Frames'",
      "5. Download individual frames or use 'Download All as ZIP'",
    ],
  },
  {
    heading: "Technical Specifications",
    listData: [
      "Input formats: MP4, WebM, AVI, MOV, MKV, and any browser-supported video codec",
      "Output formats: PNG (lossless) or JPEG (adjustable quality 10–100%)",
      "Bulk extraction: up to 500 frames per session",
      "Processing: client-side using HTML5 Canvas API — zero server upload",
      "ZIP packaging: client-side using JSZip",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "Your video files never leave your device. All frame extraction is performed entirely within the browser using the HTML5 Canvas API. No data is sent to any server, ensuring complete privacy for sensitive or confidential video content.",
    ],
  },
];
