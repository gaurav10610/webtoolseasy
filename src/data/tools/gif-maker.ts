import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/gif-maker";
const pageTitle = "GIF Maker - Create Animated GIFs Online Free";
const pageDescription =
  "Create animated GIFs from videos or images online for free. Convert video to GIF or make GIF from pictures. No watermark, high quality output.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/gif-maker.png`;

const keywords =
  "gif maker,create gif,video to gif,make gif online,gif creator,animated gif maker,convert video to gif,image to gif";

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
  mainHeading: "Free GIF Maker - Create Animated GIFs from Video or Images",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.VIDEO_CONVERTER,
    ApplicationIds.IMAGE_FORMAT_CONVERTER,
    ApplicationIds.VIDEO_EDITOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "gif-maker",
    pageTitle,
    mainHeading: "Free GIF Maker - Create Animated GIFs from Video or Images",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a GIF Maker?",
    blockData: [
      "A GIF maker is an online tool that creates animated GIF files from videos or a sequence of images. Our free GIF maker runs entirely in your browser, allowing you to convert video clips to GIFs or combine multiple images into an animated GIF without any software installation. Perfect for creating memes, social media content, website graphics, and animated reactions.",
    ],
  },
  {
    heading: "Key Features of Our GIF Maker",
    listData: [
      "Free to use with no limits on file size",
      "Create GIFs from video files (MP4, WebM, MOV, AVI, etc.)",
      "Make animated GIFs from multiple images",
      "Adjust frame rate (FPS) for smoother or smaller GIFs",
      "Control GIF width and quality",
      "Trim video clips to select specific portions",
      "Preview GIF before downloading",
      "No watermarks added to your GIFs",
      "100% privacy - all processing in your browser",
      "Support for all major video and image formats",
    ],
  },
  {
    heading: "How to Create a GIF from Video",
    listData: [
      "Click &quot;Upload Video&quot; and select your video file",
      "The video will load and display a preview",
      "Adjust the start and end time to select the clip you want",
      "Set the desired frame rate (10-30 FPS recommended)",
      "Choose output width (smaller = faster, but lower quality)",
      "Click &quot;Create GIF&quot; to generate your animated GIF",
      "Preview the result and download when satisfied",
      "Share your GIF on social media or save for later use",
    ],
  },
  {
    heading: "How to Create a GIF from Images",
    listData: [
      "Click &quot;Upload Images&quot; and select 2 or more images",
      "Images will be displayed in sequence order",
      "Drag and drop to reorder images if needed",
      "Set the frame delay (duration each image shows)",
      "Adjust output width for file size vs quality",
      "Click &quot;Create GIF&quot; to generate the animation",
      "Preview your animated GIF",
      "Download and use your custom GIF",
    ],
  },
  {
    heading: "Common Uses for GIFs",
    listData: [
      "Creating memes and reaction GIFs for social media",
      "Making product demos and feature highlights",
      "Adding animations to websites and blogs",
      "Creating email marketing graphics",
      "Making tutorials and how-to animations",
      "Building animated profile pictures and avatars",
      "Creating cinemagraphs with selective motion",
      "Making stop-motion animations",
      "Sharing funny moments from videos",
      "Creating animated logos and branding elements",
    ],
  },
  {
    heading: "Tips for Creating Better GIFs",
    listData: [
      "Keep GIFs short (2-6 seconds) for smaller file sizes",
      "Use 10-15 FPS for memes and reactions, 20-30 FPS for smooth motion",
      "Reduce width to 480px or less to minimize file size",
      "Choose moments with less background motion for cleaner results",
      "Use video clips with good lighting and contrast",
      "Add text overlays before converting to GIF for memes",
      "Test different quality settings to balance size and clarity",
      "Avoid highly detailed scenes that compress poorly",
    ],
  },
  {
    heading: "Technical Specifications",
    listData: [
      "Supported input formats: MP4, WebM, MOV, AVI, MKV, M4V, 3GP",
      "Image formats: JPG, PNG, WebP, GIF",
      "Output format: Animated GIF",
      "Frame rate: 1-60 FPS (10-30 recommended)",
      "Maximum output width: 1920px",
      "Processing: Client-side using FFmpeg WASM",
      "No file upload to servers - all local processing",
    ],
  },
  {
    heading: "Why Choose Our GIF Maker?",
    blockData: [
      "Our free online GIF maker provides professional-quality results without requiring any software installation. Whether you&apos;re creating GIFs from videos or combining images into animations, our tool offers complete control over quality, frame rate, and dimensions. Best of all, your files never leave your device - all processing happens locally in your browser for maximum privacy and speed.",
    ],
  },
  {
    blockData: [
      "Start creating amazing animated GIFs today with our powerful yet easy-to-use GIF maker. Perfect for social media, websites, presentations, and anywhere you need eye-catching animated content.",
    ],
  },
];
