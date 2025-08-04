import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/video-editor";
const pageTitle = "Video Editor Online - Edit, Trim & Add Effects Free";
const pageDescription =
  "Edit videos online for free with cutting, trimming, text overlay, and effects. Professional video editor with real-time preview. No downloads required.";

const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/video-editor.png`;

const keywords =
  "video editor online,edit video free,online video editor,video editing tool,cut video online,trim video,video effects,add text to video";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
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
  mainHeading: "Free Online Video Editor - Edit, Cut, Trim & Add Effects",
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
  structuredData: createToolStructuredData({
    pageUrl: "video-editor",
    pageTitle,
    mainHeading: "Free Online Video Editor - Edit, Cut, Trim & Add Effects",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Free Online Video Editor - Edit Videos Instantly",
    blockData: [
      "Edit videos online for free with our powerful video editor. Cut, trim, and enhance videos with professional effects directly in your browser. No downloads required - start editing MP4, WebM, and AVI videos instantly with real-time preview and advanced editing tools.",
    ],
  },
  {
    heading: "Why Choose Our Free Video Editor Online?",
    listData: [
      "Edit videos for free with no registration or downloads required. Start editing immediately in your browser.",
      "Cut and trim videos with precision timeline controls. Remove unwanted sections with frame-accurate editing.",
      "Add text overlays and captions with customizable fonts, colors, and positioning for professional results.",
      "Apply video effects including brightness, contrast, saturation adjustments, and blur filters in real-time.",
      "Real-time preview shows changes instantly as you edit. See effects applied with smooth 60fps playback.",
      "Complete privacy with client-side processing - your videos never leave your device during editing.",
      "Support for popular video formats: MP4, WebM, AVI, and MOV with automatic format detection.",
    ],
  },
  {
    heading: "Video Editing Features & Tools",
    listData: [
      "Video cutter and trimmer - Remove unwanted sections with precise start and end point controls.",
      "Text overlay editor - Add titles, subtitles, and captions with full customization options.",
      "Video effects suite - Brightness adjustment, contrast enhancement, saturation control, and blur effects.",
      "Timeline-based editing interface - Professional-grade controls for accurate video editing.",
      "Multiple video clip management - Upload and edit multiple videos with easy project switching.",
      "Aspect ratio preservation - Maintains original video quality with professional letterboxing.",
      "Export options - Download edited videos in high quality with all effects permanently applied.",
      "Responsive design - Works perfectly on desktop, tablet, and mobile devices.",
    ],
  },
  {
    heading: "How to Edit Videos Online Free",
    listData: [
      'Upload your video files by dragging and dropping or clicking "Browse Files". Supports files up to 100MB.',
      "Select your video from the clips panel. The editor loads metadata and prepares for instant editing.",
      "Use the timeline to cut and trim videos. Set precise start and end points for perfect clips.",
      "Add text overlays by clicking Add Text. Customize position, timing, font size, and colors.",
      "Apply video effects: adjust brightness (0-200%), contrast (0-200%), saturation (0-200%), blur (0-10px).",
      "Preview your edits in real-time with instant effect rendering and smooth playback.",
      'Export your edited video by clicking "Export Video". Download with all effects applied.',
    ],
  },
  {
    heading: "Video Editing Use Cases",
    listData: [
      "Social media content creation - Edit videos for Instagram, TikTok, YouTube with perfect formatting.",
      "Educational video editing - Remove pauses, add captions, and enhance clarity for online courses.",
      "Business video production - Create marketing videos with professional text overlays and effects.",
      "Highlight reel creation - Compile best moments from longer recordings with smooth transitions.",
      "Video accessibility - Add subtitles and captions for hearing-impaired audiences.",
      "Presentation enhancement - Improve video quality and add informative text overlays.",
      "Personal video projects - Edit family videos, travel footage, and special occasions.",
    ],
  },
  {
    heading: "Benefits of Online Video Editing",
    listData: [
      "No software downloads - Edit videos directly in your browser without installing applications.",
      "Free to use forever - Professional video editing tools with no hidden fees or subscriptions.",
      "Secure and private - All processing happens on your device, videos never uploaded to servers.",
      "Cross-platform compatibility - Works on Windows, Mac, Linux, iOS, and Android devices.",
      "Real-time editing - See changes instantly without waiting for processing or rendering.",
      "Professional results - Export high-quality videos with effects and overlays permanently applied.",
      "Easy to learn - Intuitive interface makes video editing accessible to beginners and experts.",
    ],
  },
  {
    blockData: [
      "Start editing videos online for free today. Our powerful video editor provides everything you need to cut, trim, and enhance videos with professional results. No downloads, no registration - just upload your video and start creating amazing content instantly.",
    ],
  },
];
