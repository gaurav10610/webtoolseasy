import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/word-counter";
const pageTitle = "Word Counter - Count Words, Characters & Sentences";
const pageDescription =
  "Count words, characters, and sentences in your text instantly. Free online word counter tool with detailed statistics for writing and content creation.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/word-counter.png`;

const keywords =
  "word counter,character counter,sentence counter,word count tool,character count tool,text statistics,writing tool,content analysis";

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
    "Word, Character, and Sentence Counter: Count Words, Characters, and Sentences in Your Text",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.TEXT_COMPARE],
  structuredData: createToolStructuredData({
    pageUrl: "word-counter",
    pageTitle,
    mainHeading: "Word, Character, and Sentence Counter: Count Words, Characters, and Sentences in Your Text",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Why Use a Word Counter Tool?",
    blockData: [
      "Our free online word counter instantly analyzes your text to provide accurate word, character, and sentence counts. Perfect for writers, students, and content creators who need to meet specific length requirements.",
      "Whether you're writing essays, articles, social media posts, or academic papers, our tool helps you stay within word limits and optimize your content length for better engagement and readability.",
    ],
  },
  {
    heading: "How to Count Words and Characters",
    listData: [
      "Paste your text into the text area or start typing directly",
      "Get instant real-time counts as you type or edit",
      "View detailed statistics: words, characters, sentences, and paragraphs",
      "See character counts both with and without spaces",
      "Perfect for checking platform-specific limits (Twitter, Facebook, LinkedIn)",
    ],
  },
  {
    heading: "Word Counter Features",
    listData: [
      "Real-time counting as you type with instant updates",
      "Detailed text statistics including reading time estimates",
      "Character count with and without spaces for precise measurements",
      "Sentence and paragraph counting for structural analysis",
      "Works offline - no internet required after page loads",
      "Mobile-friendly interface for counting text on any device",
    ],
  },
  {
    heading: "Popular Use Cases for Word Counting",
    blockData: [
      "• **Academic Writing**: Meet essay and research paper word requirements",
      "• **Content Marketing**: Optimize blog posts and articles for SEO",
      "• **Social Media**: Stay within character limits for Twitter, Facebook, Instagram",
      "• **Creative Writing**: Track progress on novels, short stories, and scripts",
      "• **Professional Documents**: Ensure resumes, cover letters meet length guidelines",
      "• **SEO Content**: Create content with optimal word counts for search rankings",
    ],
  },
];
