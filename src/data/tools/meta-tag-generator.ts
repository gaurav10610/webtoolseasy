import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/meta-tag-generator";
const pageTitle = "Meta Tag Generator - Create SEO Meta Tags Online Free";
const pageDescription =
  "Generate HTML meta tags, Open Graph, Twitter Cards instantly. Free SEO meta tag generator for better search rankings and social media sharing.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/meta-tag-generator.png`;

const keywords =
  "meta tag generator,seo meta tags,open graph generator,twitter card generator,html meta tags,og tags,social meta tags";

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
  mainHeading: "Free Meta Tag Generator: Create SEO & Social Media Tags",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.ROBOTS_TXT_GENERATOR,
    ApplicationIds.HTML_FORMATTER,
    ApplicationIds.HTML_EDITOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "meta-tag-generator",
    pageTitle,
    mainHeading: "Free Meta Tag Generator: Create SEO & Social Media Tags",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Generate Perfect Meta Tags for SEO",
    blockData: [
      "Meta tags are essential HTML elements that help search engines understand your content and improve your website's visibility in search results. Our free meta tag generator creates properly formatted HTML meta tags, Open Graph tags for Facebook, Twitter Card tags, and more – all optimized for maximum SEO impact.",
      "Simply fill in your page information, and we'll generate all the necessary meta tags ready to copy into your HTML. Improve your search engine rankings, increase social media engagement, and ensure your content displays perfectly when shared online.",
    ],
  },
  {
    heading: "How to Generate Meta Tags",
    listData: [
      "Enter your page title, description, and keywords",
      "Add your website URL and featured image URL",
      "Select Open Graph type (website, article, product, etc.)",
      "Configure Twitter Card settings for optimal display",
      "Preview how your content will appear on social media",
      "Copy the generated HTML meta tags to your website",
    ],
  },
  {
    heading: "Meta Tag Generator Features",
    listData: [
      "Generate standard HTML meta tags (title, description, keywords)",
      "Create Open Graph tags for Facebook and LinkedIn",
      "Generate Twitter Card tags for better Twitter sharing",
      "Add canonical URL and robots meta tags",
      "Include viewport and charset meta tags",
      "Support for JSON-LD structured data",
      "Real-time preview of social media cards",
      "Copy all tags with one click",
      "Export as HTML file",
      "100% free with no limitations",
    ],
  },
  {
    heading: "Why Meta Tags Matter for SEO",
    blockData: [
      "Meta tags are the first impression search engines and social media platforms get of your content. The title tag directly impacts click-through rates from search results, while the meta description provides a compelling preview that entices users to visit your site. Properly optimized meta tags can significantly improve your search rankings and organic traffic.",
      "Open Graph and Twitter Card meta tags control how your content appears when shared on social media platforms. Without these tags, platforms may display incorrect images, truncated text, or missing information, leading to poor engagement. Professional-looking social media cards increase click rates by up to 3x compared to plain URL shares.",
    ],
  },
  {
    heading: "Essential Meta Tags Explained",
    listData: [
      "Title Tag: Appears in search results and browser tabs (50-60 characters)",
      "Meta Description: Summary shown in search results (150-160 characters)",
      "Meta Keywords: Relevant keywords for your content",
      "Canonical URL: Prevents duplicate content issues",
      "Robots Tag: Controls how search engines index your page",
      "Open Graph Title: Title displayed on Facebook and LinkedIn",
      "Open Graph Description: Description for social media sharing",
      "Open Graph Image: Featured image for social media cards",
      "Twitter Card Type: Summary, summary with large image, or app card",
      "Viewport: Ensures mobile-responsive display",
    ],
  },
  {
    heading: "Best Practices for Meta Tags",
    blockData: [
      "Keep titles under 60 characters to avoid truncation in search results. Include your primary keyword near the beginning and make it compelling enough to earn clicks. Each page should have a unique title that accurately describes its content.",
      "Write meta descriptions between 150-160 characters that clearly explain what users will find on the page. Include a call-to-action and your target keyword naturally. Think of it as ad copy that sells your content to potential visitors.",
      "Choose high-quality Open Graph images with 1200x630 pixel dimensions for optimal display across all social platforms. Ensure text in images is readable and the key visual elements are centered to avoid cropping.",
      "Always include canonical URLs to prevent duplicate content penalties. Use absolute URLs rather than relative ones, and ensure consistency with your preferred domain format (www vs non-www, http vs https).",
    ],
  },
];
