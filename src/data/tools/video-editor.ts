import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/video-editor";
const pageTitle = "Video Editor Online Free - Edit Videos in Browser";
const pageDescription =
  "Free online video editor. Cut, trim, merge, add text & effects to videos. Edit MP4, WebM files instantly without upload.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/video-editor.png`;

const keywords =
  "video editor online,edit video free,cut video,trim video,merge videos,video editing tool,add text to video,video effects,online video editor";

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
        width: 1200,
        height: 630,
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
  mainHeading: "Free Online Video Editor: Edit, Cut, Trim & Merge Videos",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [
    {
      iconName: "video-editor",
      iconRelativeUrl: "video-convert.svg",
    },
  ],
  relatedTools: [
    ApplicationIds.VIDEO_CONVERTER,
    ApplicationIds.SCREEN_RECORDER,
    ApplicationIds.IMAGE_COMPRESSOR,
    ApplicationIds.IMAGE_CROPPER,
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.SPEECH_TO_TEXT,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an Online Video Editor?",
    blockData: [
      "An online video editor is a web-based tool that allows you to edit, cut, trim, merge, and enhance videos directly in your browser. Our free video editor provides professional-grade editing capabilities without requiring any software downloads or installations.",
    ],
  },
  {
    heading: "Why Use Our Free Online Video Editor?",
    listData: [
      "Edit videos instantly without downloading software. Access powerful video editing tools directly from your web browser.",
      "Cut and trim videos to remove unwanted sections. Extract specific clips from longer recordings.",
      "Merge multiple video files into a single cohesive video. Combine clips for presentations or storytelling.",
      "Add text overlays and captions for accessibility. Include titles, subtitles, and annotations.",
      "Apply filters and effects to enhance video quality. Adjust brightness, contrast, and saturation.",
      "Maintain privacy with client-side processing. Your videos never leave your device.",
    ],
  },
  {
    heading: "Features of Our Video Editor",
    listData: [
      "Free to use with no registration required. Edit videos without creating accounts or providing email.",
      "Support for popular video formats including MP4, WebM, and AVI. Handle most video file types.",
      "Real-time preview while editing. See changes instantly as you work.",
      "Timeline-based editing interface. Precise control over cuts and edits.",
      "Text overlay and caption tools. Add professional-looking text to your videos.",
      "Video effects and filters. Enhance your videos with visual improvements.",
      "Client-side processing for security. Your videos remain private on your device.",
      "Export in multiple formats and qualities. Choose the best output for your needs.",
    ],
  },
  {
    heading: "How to Use Our Video Editor",
    listData: [
      'Upload your video files by dragging and dropping or clicking "Browse Files".',
      "Use the timeline to navigate through your video and select sections to edit.",
      "Cut and trim videos by setting start and end points on the timeline.",
      "Add text overlays by clicking the text tool and positioning captions.",
      "Apply filters and effects to enhance video quality and appearance.",
      "Merge multiple videos by uploading additional files and arranging them.",
      'Preview your edits and download the final video by clicking "Export".',
    ],
  },
  {
    heading: "Common Video Editing Use Cases",
    listData: [
      "Create social media content with proper aspect ratios and engaging effects.",
      "Edit educational videos by removing pauses and adding informative text.",
      "Prepare promotional videos for businesses with professional text overlays.",
      "Compile highlight reels from longer recordings or multiple clips.",
      "Add subtitles and captions for accessibility and international audiences.",
      "Remove unwanted sections from presentations or recorded meetings.",
      "Enhance video quality with color correction and visual effects.",
    ],
  },
  {
    blockData: [
      "Our free online video editor provides comprehensive tools for all your video editing needs. Whether you're creating content for social media, education, or business, our secure and user-friendly interface makes video editing accessible to everyone.",
    ],
  },
];
