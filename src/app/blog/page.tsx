import BlogList from "@/components/blogList";
import {
  StructuredData,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/components/structuredData";
import { getAllBlogPosts, sortBlogPostsByDate } from "@/data/blogPosts";
import { join, map } from "lodash-es";

const pageTitle = "Web Development Guides & Online Tools Blog | WebToolsEasy";
const pageDescription =
  "Expert tutorials and guides on JWT authentication, API security, web development tools, and productivity solutions. Learn how to leverage powerful online tools for efficient development.";
const keywords: string[] = [
  "online web tools",
  "web tools",
  "online tools",
  "free online tools",
  "internet tools",
  "web-based tools",
  "online resources",
  "digital tools",
  "website tools",
  "SEO tools",
  "keyword research tools",
  "image editing tools",
  "photo editing tools online",
  "image converters",
  "file converters",
  "PDF tools",
  "website builders",
  "website analysis tools",
  "domain tools",
  "online calculators",
  "text tools",
  "writing tools",
  "productivity tools",
  "marketing tools",
  "free online keyword research tool",
  "best online image resizer",
  "how to convert PDF to Word online",
  "website speed test online",
  "free website traffic analysis",
  "online plagiarism checker for free",
  "compare website builders features",
  "find domain name availability",
  "online calculator with steps",
  "free text summarizer tool",
  "marketing automation tools for small business",
  "how to create a website for free",
  "web development",
  "digital marketing",
  "online business",
  "remote work",
  "productivity tips",
  "SEO tips",
  "content creation",
  "website design",
  "web design",
  "online marketing",
  "AI marketing tools",
  "email marketing automation",
  "top automation tools",
];

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `${process.env.HOSTNAME}/blog`,
    },
    title: pageTitle,
    description: pageDescription,
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
    authors: {
      name: "Gaurav Kumar Yadav",
    },
    robots: "index, follow",
    metadataBase: new URL(process.env.HOSTNAME!),
    openGraph: {
      title: pageTitle,
      type: "website",
      url: `${process.env.HOSTNAME}/blog`,
      images: [`/screenshots/blog.png`],
      description: pageDescription,
      siteName: "WebToolsEasy",
    },
    twitter: {
      card: "summary_large_image",
      site: "@webtoolseasy",
      title: pageTitle,
      description: pageDescription,
      images: [`/screenshots/blog.png`],
    },
    keywords: join(
      map(keywords, (tag) => tag),
      ", "
    ),
  };
}

export default async function BlogListPage() {
  // Get all blog posts sorted by date
  const allBlogPosts = sortBlogPostsByDate(getAllBlogPosts());

  // Generate structured data for blog page
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />

      <BlogList blogPosts={allBlogPosts} />
    </>
  );
}
