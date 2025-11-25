import "./blog.css";
import { Link, Typography, Chip, Box } from "@mui/material";
import { ButtonWithHandler } from "@/components/lib/buttons";
import fs from "fs";
import path from "path";
import { SocialShareButtons } from "@/components/socialShareButtons";
import { H1Heading } from "@/components/baseComponents/headings";
import { PageMetadata } from "@/components/baseComponents/pageMetadata";
import {
  StructuredData,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from "@/components/structuredData";
import { ServerMarkdownRenderer } from "@/components/ServerMarkdownRenderer";
import { BlogIds } from "@/types/blog-config";

// Import all blog configs
import { blogConfig as decodingJwtGuide } from "@/data/blog/config/decoding-jwt-comprehensive-guide";

const blogConfigs = {
  [BlogIds.DECODING_JWT_COMPREHENSIVE_GUIDE]: decodingJwtGuide,
};

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ [key: string]: string }>;
  }>
) {
  const { pageUrl } = await props.params;
  const blogConfig = Object.values(blogConfigs).find(
    (config) => config.slug === pageUrl
  );

  if (!blogConfig) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return blogConfig.metadata;
}

export async function generateStaticParams() {
  return Object.values(blogConfigs).map((config) => ({
    pageUrl: config.slug,
  }));
}

export default async function BlogPage(
  props: Readonly<{
    params: Promise<{ [key: string]: string }>;
  }>
) {
  const { pageUrl } = await props.params;
  const blogConfig = Object.values(blogConfigs).find(
    (config) => config.slug === pageUrl
  );

  if (!blogConfig) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Typography variant="h4" color="error">
          Blog Post Not Found
        </Typography>
        <Typography variant="body1">
          The requested blog post could not be found.
        </Typography>
        <Link href="/blog">
          <ButtonWithHandler buttonText="Back to Blog" size="medium" />
        </Link>
      </div>
    );
  }

  // Read markdown content
  const contentPath = path.join(
    process.cwd(),
    "src/data/blog/content",
    blogConfig.contentFile
  );
  const markdownContent = fs.readFileSync(contentPath, "utf-8");

  // Generate structured data for blog post
  const articleSchema = generateArticleSchema({
    headline: blogConfig.title,
    description: blogConfig.excerpt,
    url: `${process.env.HOSTNAME}/blog/${blogConfig.slug}`,
    image: `${process.env.SCREENSHOTS_BASE_URL}/blog/${blogConfig.slug}.png`,
    datePublished: blogConfig.publishedAt,
    dateModified: blogConfig.updatedAt,
    keywords: blogConfig.tags,
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: process.env.HOSTNAME! },
      { name: "Blog", url: `${process.env.HOSTNAME}/blog` },
      {
        name: blogConfig.title,
        url: `${process.env.HOSTNAME}/blog/${blogConfig.slug}`,
      },
    ],
  });

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={organizationSchema} />

      <div className="w-full flex flex-col gap-3 blog-div">
        {/* Blog Header */}
        <H1Heading heading={blogConfig.title} />

        {/* Category and Reading Time */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Chip label={blogConfig.category} color="primary" size="small" />
          <Typography variant="body2" color="textSecondary">
            {blogConfig.readingTimeMinutes} min read
          </Typography>
        </Box>

        {/* Author and Date */}
        <PageMetadata
          updatedBy={blogConfig.author}
          updatedAt={blogConfig.updatedAt}
        />

        {/* Social Share */}
        <SocialShareButtons
          pageUrl={`${process.env.HOSTNAME}/blog/${blogConfig.slug}`}
          heading={blogConfig.title}
        />

        {/* Tags */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
          {blogConfig.tags.slice(0, 10).map((tag, index) => (
            <Chip
              key={`tag-${index}`}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>

        {/* Markdown Content */}
        <ServerMarkdownRenderer content={markdownContent} />

        {/* Bottom Social Share */}
        <Box sx={{ mt: 4, pt: 4, borderTop: "1px solid #e0e0e0" }}>
          <Typography variant="h6" gutterBottom>
            Share this article
          </Typography>
          <SocialShareButtons
            pageUrl={`${process.env.HOSTNAME}/blog/${blogConfig.slug}`}
            heading={blogConfig.title}
          />
        </Box>
      </div>
    </>
  );
}
