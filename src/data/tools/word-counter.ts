import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/word-counter";
const pageTitle =
  "Online Word Counter & Character Counter - Free Text Analysis Tool";
const pageDescription =
  "Count words, characters, sentences, and paragraphs instantly. Check Twitter, Instagram, and SEO character limits. Free online word counter with reading time and speaking time estimates.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/word-counter.png`;

const keywords =
  "word counter,character counter,online word counter,word count tool,character count online,letter counter,text counter,word counter free,count words in text,sentence counter,paragraph counter,reading time calculator,twitter character counter,instagram character limit,seo meta description length checker,text analysis tool,speaking time calculator";

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
      : "https://webtoolseasy.com",
  ),
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
    "Free Word Counter & Character Counter: Count Words, Characters, Sentences with Social Media Limits",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.TEXT_COMPARE, ApplicationIds.CASE_CONVERETR],
  structuredData: createToolStructuredData({
    pageUrl: "word-counter",
    pageTitle,
    mainHeading:
      "Free Word Counter & Character Counter: Count Words, Characters, Sentences with Social Media Limits",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Is my text saved anywhere when I use this word counter?",
        answer:
          "No, your text stays entirely in your browser. We don't upload, store, or transmit your content to any server. All processing happens locally on your device.",
      },
      {
        question: "How accurate is the word count?",
        answer:
          "Our tool uses standard word counting algorithms that match the behavior of popular word processors. It accurately counts words separated by spaces and line breaks.",
      },
      {
        question: "Can I check Twitter and Instagram character limits?",
        answer:
          "Yes, our tool shows real-time progress bars for Twitter/X (280 characters), Instagram captions (2,200 characters), LinkedIn posts (3,000 characters), Meta titles (60 characters), Meta descriptions (160 characters), and SMS (160 characters).",
      },
      {
        question: "Does the word counter calculate reading time?",
        answer:
          "Yes, our tool estimates both reading time (based on 225 words per minute average) and speaking time (based on 140 words per minute average), making it perfect for speech preparation and content planning.",
      },
      {
        question: "What statistics does this word counter provide?",
        answer:
          "Our word counter provides 8 statistics: word count, character count, characters without spaces, sentence count, paragraph count, line count, estimated reading time, and estimated speaking time.",
      },
    ],
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
