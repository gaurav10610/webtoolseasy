import { BlogIds, BlogNavigationConfig } from "@/types/blog-config";
import { blogConfig as decodingJwtGuide } from "./blog/config/decoding-jwt-comprehensive-guide";
import { blogConfig as pdfToWordGuide } from "./blog/config/pdf-to-word-privacy-guide";
import { blogConfig as restApiJwtGuide } from "./blog/config/rest-api-jwt-authentication-guide";

export const blogPosts: Record<BlogIds, BlogNavigationConfig> = {
  [BlogIds.DECODING_JWT_COMPREHENSIVE_GUIDE]: {
    blogId: decodingJwtGuide.blogId,
    title: decodingJwtGuide.title,
    slug: decodingJwtGuide.slug,
    category: decodingJwtGuide.category,
    excerpt: decodingJwtGuide.excerpt,
    publishedAt: decodingJwtGuide.publishedAt,
    updatedAt: decodingJwtGuide.updatedAt,
    author: decodingJwtGuide.author,
    readingTimeMinutes: decodingJwtGuide.readingTimeMinutes,
    isFeatured: decodingJwtGuide.isFeatured,
  },
  [BlogIds.PDF_TO_WORD_PRIVACY_GUIDE]: {
    blogId: pdfToWordGuide.blogId,
    title: pdfToWordGuide.title,
    slug: pdfToWordGuide.slug,
    category: pdfToWordGuide.category,
    excerpt: pdfToWordGuide.excerpt,
    publishedAt: pdfToWordGuide.publishedAt,
    updatedAt: pdfToWordGuide.updatedAt,
    author: pdfToWordGuide.author,
    readingTimeMinutes: pdfToWordGuide.readingTimeMinutes,
    isFeatured: pdfToWordGuide.isFeatured,
  },
  [BlogIds.REST_API_JWT_AUTHENTICATION_GUIDE]: {
    blogId: restApiJwtGuide.blogId,
    title: restApiJwtGuide.title,
    slug: restApiJwtGuide.slug,
    category: restApiJwtGuide.category,
    excerpt: restApiJwtGuide.excerpt,
    publishedAt: restApiJwtGuide.publishedAt,
    updatedAt: restApiJwtGuide.updatedAt,
    author: restApiJwtGuide.author,
    readingTimeMinutes: restApiJwtGuide.readingTimeMinutes,
    isFeatured: restApiJwtGuide.isFeatured,
  },
};

// Helper function to get all blog posts as an array
export const getAllBlogPosts = (): BlogNavigationConfig[] => {
  return Object.values(blogPosts);
};

// Helper function to get featured blog posts
export const getFeaturedBlogPosts = (): BlogNavigationConfig[] => {
  return getAllBlogPosts().filter((post) => post.isFeatured);
};

// Helper function to get blog posts by category
export const getBlogPostsByCategory = (
  category: string
): BlogNavigationConfig[] => {
  return getAllBlogPosts().filter((post) => post.category === category);
};

// Helper function to sort blog posts by date (newest first)
export const sortBlogPostsByDate = (
  posts: BlogNavigationConfig[]
): BlogNavigationConfig[] => {
  return [...posts].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
};
