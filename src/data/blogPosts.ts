import { BlogIds, BlogNavigationConfig } from "@/types/blog-config";
import { blogConfig as decodingJwtGuide } from "./blog/config/decoding-jwt-comprehensive-guide";

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
