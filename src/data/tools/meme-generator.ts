import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/meme-generator";
const pageTitle = "Meme Generator - Create Funny Memes Online Free";
const pageDescription =
  "Create custom memes online instantly. Add text to images, choose fonts, download high-quality memes. Free meme maker with popular templates.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/meme-generator.png`;

const keywords =
  "meme generator,meme maker,create memes,funny meme generator,meme creator,free meme maker,custom memes,meme builder";

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
    description: pageDescription,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Free Meme Generator: Create Custom Memes Online Instantly",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.IMAGE_COMPRESSOR,
    ApplicationIds.IMAGE_CROPPER,
    ApplicationIds.IMAGE_RESIZER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "meme-generator",
    pageTitle,
    mainHeading: "Free Meme Generator: Create Custom Memes Online Instantly",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Create Hilarious Memes in Seconds",
    blockData: [
      "Transform your ideas into viral-worthy memes with our free online meme generator. Upload any image or choose from popular templates, add custom text with various fonts and styles, and create professional-looking memes instantly. Perfect for social media, messaging apps, and sharing laughter with friends.",
      "Our meme maker offers a simple, intuitive interface that lets you position text anywhere on your image, customize font size, color, and style, and download your creation in high quality. No design skills required – just your creativity!",
    ],
  },
  {
    heading: "How to Create a Meme",
    listData: [
      "Upload your own image or use a pre-loaded meme template",
      "Add top text and bottom text with our easy-to-use interface",
      "Customize font style, size, color, and text positioning",
      "Adjust text stroke and shadow for better readability",
      "Preview your meme in real-time as you edit",
      "Download your finished meme as a high-quality PNG or JPEG",
    ],
  },
  {
    heading: "Meme Generator Features",
    listData: [
      "100% free with unlimited meme creation",
      "No watermarks on your final memes",
      "Upload custom images or use popular templates",
      "Multiple font options for creative text styles",
      "Adjustable text size, color, and positioning",
      "Text outline and shadow effects for clarity",
      "High-resolution output for social media sharing",
      "Works on desktop, tablet, and mobile devices",
      "No registration or account required",
      "Instant download in multiple formats",
    ],
  },
  {
    heading: "Popular Meme Formats Supported",
    listData: [
      "Classic top and bottom text memes",
      "Image macro style memes",
      "Reaction memes with custom captions",
      "Multi-panel meme layouts",
      "Custom dimensions for different platforms",
      "Square format for Instagram posts",
      "Wide format for Twitter and Facebook",
    ],
  },
  {
    heading: "Tips for Creating Great Memes",
    blockData: [
      "Keep text short and punchy: Memes work best with concise, witty captions that people can read quickly. Aim for impact over explanation.",
      "Choose high-contrast text colors: White text with black outline is the classic choice because it's readable on any background. Make sure your text stands out clearly from the image.",
      "Use relatable content: The best memes tap into shared experiences and emotions. Think about what your audience will find funny or meaningful.",
      "Time your text carefully: For two-panel memes, the setup goes on top and the punchline on the bottom. This creates the classic comedic rhythm people expect.",
    ],
  },
  {
    heading: "Why Use Our Meme Generator?",
    blockData: [
      "Creating memes shouldn't require expensive software or design expertise. Our free meme generator provides all the tools you need to create professional-looking, shareable memes right in your browser. Whether you're creating content for social media, adding humor to presentations, or just having fun with friends, our tool makes it easy.",
      "Unlike many meme generators, we don't add watermarks to your creations, and you can download unlimited memes in high quality. Our tool works entirely in your browser, ensuring your images stay private and secure. Start creating viral-worthy memes today!",
    ],
  },
];
