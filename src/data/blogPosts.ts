import { BlogIds, BlogNavigationConfig } from "@/types/blog-config";
import { blogConfig as decodingJwtGuide } from "./blog/config/decoding-jwt-comprehensive-guide";
import { blogConfig as pdfToWordGuide } from "./blog/config/pdf-to-word-privacy-guide";
import { blogConfig as restApiJwtGuide } from "./blog/config/rest-api-jwt-authentication-guide";
import { blogConfig as privateImageCompressionGuide } from "./blog/config/private-image-compression-guide";
import { blogConfig as clientSideJsonFormattingGuide } from "./blog/config/client-side-json-formatting-guide";
import { blogConfig as securePasswordGenerationGuide } from "./blog/config/secure-password-generation-guide";
import { blogConfig as privacyFirstPdfToolsGuide } from "./blog/config/privacy-first-pdf-tools-guide";
import { blogConfig as offlineWebToolsGuide } from "./blog/config/offline-web-tools-guide";
import { blogConfig as freeDeveloperToolsGuide } from "./blog/config/free-developer-tools-guide";
import { blogConfig as freeImageEditingToolsGuide } from "./blog/config/free-image-editing-tools-guide";
import { blogConfig as textWritingToolsGuide } from "./blog/config/text-writing-tools-guide";
import { blogConfig as freeCalculatorToolsGuide } from "./blog/config/free-calculator-tools-guide";
import { blogConfig as apiPayloadCleanupWorkflowPlaybook } from "./blog/config/api-payload-cleanup-workflow-playbook";
import { blogConfig as blogPublishWorkflowPlaybook } from "./blog/config/blog-publish-workflow-playbook";
import { blogConfig as technicalSeoQuickAuditWorkflowPlaybook } from "./blog/config/technical-seo-quick-audit-workflow-playbook";

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
  [BlogIds.PRIVATE_IMAGE_COMPRESSION_GUIDE]: {
    blogId: privateImageCompressionGuide.blogId,
    title: privateImageCompressionGuide.title,
    slug: privateImageCompressionGuide.slug,
    category: privateImageCompressionGuide.category,
    excerpt: privateImageCompressionGuide.excerpt,
    publishedAt: privateImageCompressionGuide.publishedAt,
    updatedAt: privateImageCompressionGuide.updatedAt,
    author: privateImageCompressionGuide.author,
    readingTimeMinutes: privateImageCompressionGuide.readingTimeMinutes,
    isFeatured: privateImageCompressionGuide.isFeatured,
  },
  [BlogIds.CLIENT_SIDE_JSON_FORMATTING_GUIDE]: {
    blogId: clientSideJsonFormattingGuide.blogId,
    title: clientSideJsonFormattingGuide.title,
    slug: clientSideJsonFormattingGuide.slug,
    category: clientSideJsonFormattingGuide.category,
    excerpt: clientSideJsonFormattingGuide.excerpt,
    publishedAt: clientSideJsonFormattingGuide.publishedAt,
    updatedAt: clientSideJsonFormattingGuide.updatedAt,
    author: clientSideJsonFormattingGuide.author,
    readingTimeMinutes: clientSideJsonFormattingGuide.readingTimeMinutes,
    isFeatured: clientSideJsonFormattingGuide.isFeatured,
  },
  [BlogIds.SECURE_PASSWORD_GENERATION_GUIDE]: {
    blogId: securePasswordGenerationGuide.blogId,
    title: securePasswordGenerationGuide.title,
    slug: securePasswordGenerationGuide.slug,
    category: securePasswordGenerationGuide.category,
    excerpt: securePasswordGenerationGuide.excerpt,
    publishedAt: securePasswordGenerationGuide.publishedAt,
    updatedAt: securePasswordGenerationGuide.updatedAt,
    author: securePasswordGenerationGuide.author,
    readingTimeMinutes: securePasswordGenerationGuide.readingTimeMinutes,
    isFeatured: securePasswordGenerationGuide.isFeatured,
  },
  [BlogIds.PRIVACY_FIRST_PDF_TOOLS_GUIDE]: {
    blogId: privacyFirstPdfToolsGuide.blogId,
    title: privacyFirstPdfToolsGuide.title,
    slug: privacyFirstPdfToolsGuide.slug,
    category: privacyFirstPdfToolsGuide.category,
    excerpt: privacyFirstPdfToolsGuide.excerpt,
    publishedAt: privacyFirstPdfToolsGuide.publishedAt,
    updatedAt: privacyFirstPdfToolsGuide.updatedAt,
    author: privacyFirstPdfToolsGuide.author,
    readingTimeMinutes: privacyFirstPdfToolsGuide.readingTimeMinutes,
    isFeatured: privacyFirstPdfToolsGuide.isFeatured,
  },
  [BlogIds.OFFLINE_WEB_TOOLS_GUIDE]: {
    blogId: offlineWebToolsGuide.blogId,
    title: offlineWebToolsGuide.title,
    slug: offlineWebToolsGuide.slug,
    category: offlineWebToolsGuide.category,
    excerpt: offlineWebToolsGuide.excerpt,
    publishedAt: offlineWebToolsGuide.publishedAt,
    updatedAt: offlineWebToolsGuide.updatedAt,
    author: offlineWebToolsGuide.author,
    readingTimeMinutes: offlineWebToolsGuide.readingTimeMinutes,
    isFeatured: offlineWebToolsGuide.isFeatured,
  },
  [BlogIds.FREE_DEVELOPER_TOOLS_GUIDE]: {
    blogId: freeDeveloperToolsGuide.blogId,
    title: freeDeveloperToolsGuide.title,
    slug: freeDeveloperToolsGuide.slug,
    category: freeDeveloperToolsGuide.category,
    excerpt: freeDeveloperToolsGuide.excerpt,
    publishedAt: freeDeveloperToolsGuide.publishedAt,
    updatedAt: freeDeveloperToolsGuide.updatedAt,
    author: freeDeveloperToolsGuide.author,
    readingTimeMinutes: freeDeveloperToolsGuide.readingTimeMinutes,
    isFeatured: freeDeveloperToolsGuide.isFeatured,
  },
  [BlogIds.FREE_IMAGE_EDITING_TOOLS_GUIDE]: {
    blogId: freeImageEditingToolsGuide.blogId,
    title: freeImageEditingToolsGuide.title,
    slug: freeImageEditingToolsGuide.slug,
    category: freeImageEditingToolsGuide.category,
    excerpt: freeImageEditingToolsGuide.excerpt,
    publishedAt: freeImageEditingToolsGuide.publishedAt,
    updatedAt: freeImageEditingToolsGuide.updatedAt,
    author: freeImageEditingToolsGuide.author,
    readingTimeMinutes: freeImageEditingToolsGuide.readingTimeMinutes,
    isFeatured: freeImageEditingToolsGuide.isFeatured,
  },
  [BlogIds.TEXT_WRITING_TOOLS_GUIDE]: {
    blogId: textWritingToolsGuide.blogId,
    title: textWritingToolsGuide.title,
    slug: textWritingToolsGuide.slug,
    category: textWritingToolsGuide.category,
    excerpt: textWritingToolsGuide.excerpt,
    publishedAt: textWritingToolsGuide.publishedAt,
    updatedAt: textWritingToolsGuide.updatedAt,
    author: textWritingToolsGuide.author,
    readingTimeMinutes: textWritingToolsGuide.readingTimeMinutes,
    isFeatured: textWritingToolsGuide.isFeatured,
  },
  [BlogIds.FREE_CALCULATOR_TOOLS_GUIDE]: {
    blogId: freeCalculatorToolsGuide.blogId,
    title: freeCalculatorToolsGuide.title,
    slug: freeCalculatorToolsGuide.slug,
    category: freeCalculatorToolsGuide.category,
    excerpt: freeCalculatorToolsGuide.excerpt,
    publishedAt: freeCalculatorToolsGuide.publishedAt,
    updatedAt: freeCalculatorToolsGuide.updatedAt,
    author: freeCalculatorToolsGuide.author,
    readingTimeMinutes: freeCalculatorToolsGuide.readingTimeMinutes,
    isFeatured: freeCalculatorToolsGuide.isFeatured,
  },
  [BlogIds.API_PAYLOAD_CLEANUP_WORKFLOW_PLAYBOOK]: {
    blogId: apiPayloadCleanupWorkflowPlaybook.blogId,
    title: apiPayloadCleanupWorkflowPlaybook.title,
    slug: apiPayloadCleanupWorkflowPlaybook.slug,
    category: apiPayloadCleanupWorkflowPlaybook.category,
    excerpt: apiPayloadCleanupWorkflowPlaybook.excerpt,
    publishedAt: apiPayloadCleanupWorkflowPlaybook.publishedAt,
    updatedAt: apiPayloadCleanupWorkflowPlaybook.updatedAt,
    author: apiPayloadCleanupWorkflowPlaybook.author,
    readingTimeMinutes: apiPayloadCleanupWorkflowPlaybook.readingTimeMinutes,
    isFeatured: apiPayloadCleanupWorkflowPlaybook.isFeatured,
  },
  [BlogIds.BLOG_PUBLISH_WORKFLOW_PLAYBOOK]: {
    blogId: blogPublishWorkflowPlaybook.blogId,
    title: blogPublishWorkflowPlaybook.title,
    slug: blogPublishWorkflowPlaybook.slug,
    category: blogPublishWorkflowPlaybook.category,
    excerpt: blogPublishWorkflowPlaybook.excerpt,
    publishedAt: blogPublishWorkflowPlaybook.publishedAt,
    updatedAt: blogPublishWorkflowPlaybook.updatedAt,
    author: blogPublishWorkflowPlaybook.author,
    readingTimeMinutes: blogPublishWorkflowPlaybook.readingTimeMinutes,
    isFeatured: blogPublishWorkflowPlaybook.isFeatured,
  },
  [BlogIds.TECHNICAL_SEO_QUICK_AUDIT_WORKFLOW_PLAYBOOK]: {
    blogId: technicalSeoQuickAuditWorkflowPlaybook.blogId,
    title: technicalSeoQuickAuditWorkflowPlaybook.title,
    slug: technicalSeoQuickAuditWorkflowPlaybook.slug,
    category: technicalSeoQuickAuditWorkflowPlaybook.category,
    excerpt: technicalSeoQuickAuditWorkflowPlaybook.excerpt,
    publishedAt: technicalSeoQuickAuditWorkflowPlaybook.publishedAt,
    updatedAt: technicalSeoQuickAuditWorkflowPlaybook.updatedAt,
    author: technicalSeoQuickAuditWorkflowPlaybook.author,
    readingTimeMinutes:
      technicalSeoQuickAuditWorkflowPlaybook.readingTimeMinutes,
    isFeatured: technicalSeoQuickAuditWorkflowPlaybook.isFeatured,
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
  category: string,
): BlogNavigationConfig[] => {
  return getAllBlogPosts().filter((post) => post.category === category);
};

// Helper function to sort blog posts by date (newest first)
export const sortBlogPostsByDate = (
  posts: BlogNavigationConfig[],
): BlogNavigationConfig[] => {
  return [...posts].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
};
