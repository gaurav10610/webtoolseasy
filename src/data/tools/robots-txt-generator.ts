import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/robots-txt-generator";
const pageTitle = "Robots.txt Generator - Create Robots File Online Free";
const pageDescription =
  "Generate robots.txt file instantly for SEO. Free tool to create robot exclusion protocol with user-agents, disallow rules, and sitemap URLs.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/robots-txt-generator.png`;

const keywords =
  "robots.txt generator,robots txt,robot exclusion,seo robots,create robots.txt,robots file,sitemap robots";

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
  mainHeading: "Free Robots.txt Generator: Create Robot Exclusion File",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.META_TAG_GENERATOR,
    ApplicationIds.HTML_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "robots-txt-generator",
    pageTitle,
    mainHeading: "Free Robots.txt Generator: Create Robot Exclusion File",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Generate Robots.txt File for SEO",
    blockData: [
      "A robots.txt file tells search engine crawlers which pages or sections of your site they can or cannot access. Our free robots.txt generator helps you create a properly formatted robot exclusion protocol file that improves your site's SEO by controlling how search engines index your content.",
      "Simply configure which directories to allow or disallow for different user-agents, add your sitemap URL, and set crawl delays. Generate a ready-to-use robots.txt file in seconds and improve your website's search engine visibility.",
    ],
  },
  {
    heading: "How to Create Robots.txt File",
    listData: [
      "Select user-agent (Googlebot, Bingbot, or all crawlers)",
      "Add directories or pages to allow or disallow",
      "Include your XML sitemap URL",
      "Set crawl delay if needed to manage server load",
      "Preview the generated robots.txt content",
      "Download and upload to your website root directory",
    ],
  },
  {
    heading: "Robots.txt Generator Features",
    listData: [
      "Generate standard robots.txt format",
      "Support for multiple user-agents (Google, Bing, Yahoo)",
      "Add allow and disallow rules",
      "Include sitemap URL reference",
      "Set crawl-delay directives",
      "Block specific file types or directories",
      "Common presets for CMS platforms",
      "Syntax validation and error checking",
      "Download as txt file",
      "100% free with unlimited generation",
    ],
  },
  {
    heading: "Understanding Robots.txt",
    blockData: [
      "The robots.txt file is a simple text file placed in your website's root directory that communicates with web crawlers about which areas of your site should or shouldn't be accessed. Search engines like Google, Bing, and Yahoo check for this file before crawling your site.",
      "While robots.txt doesn't guarantee that pages won't be indexed (malicious bots may ignore it), it's an essential tool for SEO best practices. Use it to prevent duplicate content issues, protect sensitive directories, and manage crawl budget on large sites.",
    ],
  },
  {
    heading: "Common Robots.txt Rules",
    listData: [
      "Disallow admin areas: Disallow: /admin/",
      "Block search parameters: Disallow: /*?",
      "Exclude private content: Disallow: /private/",
      "Allow specific bots: User-agent: Googlebot",
      "Block all crawlers: Disallow: /",
      "Allow everything: Allow: /",
      "Reference sitemap: Sitemap: https://example.com/sitemap.xml",
      "Set crawl delay: Crawl-delay: 10",
    ],
  },
  {
    heading: "Best Practices for Robots.txt",
    blockData: [
      "Always place robots.txt in your root directory (https://example.com/robots.txt), not in subdirectories. Search engines only look for it at the root level of your domain.",
      "Use disallow rules carefully – blocking important pages can prevent them from appearing in search results. Never block CSS or JavaScript files that Google needs to render your pages properly, as this can hurt your SEO.",
      "Include your sitemap URL in robots.txt to help search engines discover all your pages more efficiently. Use absolute URLs for sitemaps, and you can list multiple sitemaps if needed.",
      "Test your robots.txt file using Google Search Console's robots.txt tester before deploying. This helps catch syntax errors and verify that you're not accidentally blocking important content from being crawled.",
    ],
  },
  {
    heading: "User-Agent Explained",
    blockData: [
      "User-agent directives specify which crawler the rules apply to. Use 'User-agent: *' for all crawlers, or target specific bots like 'User-agent: Googlebot' for Google, 'User-agent: Bingbot' for Bing, or 'User-agent: AhrefsBot' to block SEO tools.",
      "You can create different rule sets for different crawlers. For example, you might allow Googlebot to access everything while blocking aggressive crawlers that consume too much bandwidth. Each user-agent block should have its own set of allow/disallow rules.",
    ],
  },
];
