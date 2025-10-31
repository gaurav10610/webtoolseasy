import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/text-summarizer";
const pageTitle = "Free Text Summarizer - AI Summary Generator Online";
const pageDescription =
  "Summarize long text instantly. Free AI text summarizer with adjustable length. Perfect for articles, essays, documents. No signup required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/text-summarizer.png`;
const keywords =
  "text summarizer,summarize text,summary generator,article summarizer,text summary tool,summarize article,auto summary";

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
  mainHeading: "Free Text Summarizer - AI Summary Generator Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.WORD_COUNTER,
    ApplicationIds.TEXT_COMPARE,
    ApplicationIds.CASE_CONVERETR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "text-summarizer",
    pageTitle,
    mainHeading: "Free Text Summarizer - AI Summary Generator Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Text Summarizer?",
    blockData: [
      "A Text Summarizer is a free online tool that automatically condenses long text, articles, essays, or documents into concise summaries. Our browser-based summarizer uses intelligent algorithms to identify key points and main ideas, creating summaries that capture the essence of your content.",
      "Perfect for students summarizing research papers, professionals condensing reports, writers creating abstracts, or anyone who needs to quickly understand long documents. All processing happens in your browser for complete privacy.",
    ],
  },
  {
    heading: "Features of Our Text Summarizer",
    blockData: [
      "• Intelligent sentence extraction algorithm",
      "• Adjustable summary length (short, medium, long)",
      "• Preserves key information and context",
      "• Word and character count for both original and summary",
      "• Copy summary with one click",
      "• No file size limits",
      "• 100% free with no registration",
      "• Works offline once loaded",
      "• Privacy-focused - text never leaves your device",
      "• Fast processing for instant results",
    ],
  },
  {
    heading: "How to Use the Text Summarizer",
    blockData: [
      "1. Paste or type your text into the input area",
      "2. Select your desired summary length (short, medium, or long)",
      "3. Click 'Summarize Text' to generate the summary",
      "4. Review the summarized text in the output area",
      "5. See word count and compression ratio",
      "6. Click 'Copy Summary' to copy to clipboard",
      "7. Adjust length and regenerate if needed",
      "8. Use the summary for your studies, work, or content creation",
    ],
  },
  {
    heading: "Why Use a Text Summarizer?",
    blockData: [
      "• Save time reading long articles and documents",
      "• Quickly understand key points of research papers",
      "• Create abstracts for academic papers",
      "• Generate executive summaries for reports",
      "• Condense meeting notes and transcripts",
      "• Prepare study notes from textbook chapters",
      "• Extract main ideas from news articles",
      "• Review multiple documents efficiently",
    ],
  },
  {
    heading: "Perfect For Students and Professionals",
    blockData: [
      "Students can use our summarizer for research papers, textbook chapters, lecture notes, and study materials. It helps create concise study guides and understand complex topics quickly.",
      "Professionals benefit from summarizing business reports, white papers, technical documents, email threads, and meeting transcripts. Perfect for preparing executive summaries and briefing materials.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "All text summarization happens entirely in your browser using JavaScript. Your text never leaves your device, and we don't store, view, or have access to any content you summarize.",
      "This makes our tool perfect for confidential documents, proprietary information, academic research, legal documents, or any sensitive content that cannot be uploaded to external servers.",
    ],
  },
];
