import { Metadata } from "next";

export enum BlogCategory {
  WEB_DEVELOPMENT = "Web Development",
  SECURITY = "Security",
  TOOLS = "Tools & Utilities",
  TUTORIALS = "Tutorials",
  PRODUCTIVITY = "Productivity",
  DESIGN = "Design",
  GENERAL = "General",
}

export enum BlogIds {
  DECODING_JWT_COMPREHENSIVE_GUIDE = "decoding-jwt-comprehensive-guide",
  PDF_TO_WORD_PRIVACY_GUIDE = "pdf-to-word-privacy-guide",
  REST_API_JWT_AUTHENTICATION_GUIDE = "rest-api-jwt-authentication-guide",
  PRIVATE_IMAGE_COMPRESSION_GUIDE = "private-image-compression-guide",
  CLIENT_SIDE_JSON_FORMATTING_GUIDE = "client-side-json-formatting-guide",
  SECURE_PASSWORD_GENERATION_GUIDE = "secure-password-generation-guide",
  PRIVACY_FIRST_PDF_TOOLS_GUIDE = "privacy-first-pdf-tools-guide",
  OFFLINE_WEB_TOOLS_GUIDE = "offline-web-tools-guide",
  FREE_DEVELOPER_TOOLS_GUIDE = "free-developer-tools-guide",
  FREE_IMAGE_EDITING_TOOLS_GUIDE = "free-image-editing-tools-guide",
  TEXT_WRITING_TOOLS_GUIDE = "text-writing-tools-guide",
  FREE_CALCULATOR_TOOLS_GUIDE = "free-calculator-tools-guide",
  API_PAYLOAD_CLEANUP_WORKFLOW_PLAYBOOK = "api-payload-cleanup-workflow-playbook",
  BLOG_PUBLISH_WORKFLOW_PLAYBOOK = "blog-publish-workflow-playbook",
  TECHNICAL_SEO_QUICK_AUDIT_WORKFLOW_PLAYBOOK = "technical-seo-quick-audit-workflow-playbook",
}

export interface BlogAuthor {
  name: string;
  gender: "M" | "F" | "O";
}

export interface BlogConfig {
  blogId: BlogIds;
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  isFeatured?: boolean;
  isDisabled?: boolean;
  relatedPosts?: BlogIds[];
  contentFile: string; // Path to markdown file (relative to src/data/blog/content/)
  metadata: Metadata;
}

export interface BlogNavigationConfig {
  blogId: BlogIds;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  author: BlogAuthor;
  readingTimeMinutes: number;
  isFeatured?: boolean;
}
