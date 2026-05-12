/**
 * JSON-LD Script Generator
 *
 * Generates and injects JSON-LD structured data for Search Engine Optimization
 * Works both on server (next/head) and client-side components.
 */

import React from "react";
import { WorkflowPackConfig } from "@/types/workflow";
import {
  generateWorkflowHowToSchema,
  generateWorkflowFAQSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  toJSONLDScript,
  mergeStructuredData,
} from "@/lib/structuredData";

/**
 * Props for JSON-LD script injection
 */
export interface JSONLDScriptProps {
  schemas: any[];
  id?: string;
  nonce?: string;
}

/**
 * Generates a JSON-LD script element
 * Safe for both SSR and client-side rendering
 */
export const JSONLDScript: React.FC<JSONLDScriptProps> = ({
  schemas,
  id = "schema-jsonld",
  nonce,
}) => {
  // Filter out empty or invalid schemas
  const validSchemas = schemas.filter((s) => s && Object.keys(s).length > 0);

  if (validSchemas.length === 0) {
    return null;
  }

  // If single schema, use directly; if multiple, merge with @graph
  const schema =
    validSchemas.length === 1
      ? validSchemas[0]
      : mergeStructuredData(...validSchemas);

  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: toJSONLDScript(schema) }}
      {...(nonce && { nonce })}
    />
  );
};

/**
 * Props for workflow page JSON-LD
 */
export interface WorkflowPageJSONLDProps {
  workflow: WorkflowPackConfig;
  baseUrl?: string;
  includeOrganization?: boolean;
  includeBreadcrumb?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
  nonce?: string;
}

/**
 * Generates complete JSON-LD for workflow pages
 * Includes HowTo, FAQ, Breadcrumb, and Organization schemas
 */
export const WorkflowPageJSONLD: React.FC<WorkflowPageJSONLDProps> = ({
  workflow,
  baseUrl,
  includeOrganization = true,
  includeBreadcrumb = true,
  breadcrumbs,
  nonce,
}) => {
  const schemas: any[] = [];

  // Add HowTo schema
  schemas.push(generateWorkflowHowToSchema(workflow, baseUrl));

  // Add FAQ schema
  schemas.push(generateWorkflowFAQSchema(workflow));

  // Add breadcrumb if requested and provided
  if (includeBreadcrumb && breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // Add organization if requested
  if (includeOrganization) {
    schemas.push(
      generateOrganizationSchema({
        name: "WebToolsEasy",
        url: baseUrl,
      }),
    );
  }

  return <JSONLDScript schemas={schemas} nonce={nonce} />;
};

/**
 * Props for blog/article page JSON-LD
 */
export interface ArticlePageJSONLDProps {
  title: string;
  content: string;
  author?: string;
  publishDate?: string;
  modifyDate?: string;
  imageUrl?: string;
  keywords?: string[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  includeOrganization?: boolean;
  nonce?: string;
}

/**
 * Generates complete JSON-LD for blog/article pages
 * Includes Article, Breadcrumb, and Organization schemas
 */
export const ArticlePageJSONLD: React.FC<ArticlePageJSONLDProps> = ({
  title,
  content,
  author,
  publishDate,
  modifyDate,
  imageUrl,
  keywords,
  breadcrumbs,
  includeOrganization = true,
  nonce,
}) => {
  // Import here to avoid circular dependency
  const { generateArticleSchema } = require("@/lib/structuredData");

  const schemas: any[] = [];

  // Add article schema
  schemas.push(
    generateArticleSchema(title, content, {
      author,
      description: content.substring(0, 160),
      image: imageUrl,
      datePublished: publishDate,
      dateModified: modifyDate,
      keywords,
    }),
  );

  // Add breadcrumb if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // Add organization if requested
  if (includeOrganization) {
    schemas.push(
      generateOrganizationSchema({
        name: "WebToolsEasy",
      }),
    );
  }

  return <JSONLDScript schemas={schemas} nonce={nonce} />;
};

/**
 * Hook to generate workflow breadcrumbs for JSON-LD
 */
export const useWorkflowBreadcrumbs = (
  workflow: WorkflowPackConfig,
  baseUrl?: string,
) => {
  return [
    { name: "Home", url: baseUrl || "/" },
    { name: "Tools", url: `${baseUrl || ""}/#tools` },
    {
      name: workflow.category,
      url: `${baseUrl || ""}/tools/${workflow.category}`,
    },
    { name: workflow.name, url: `${baseUrl || ""}/workflows/${workflow.slug}` },
  ];
};

/**
 * Hook to generate blog breadcrumbs for JSON-LD
 */
export const useBlogBreadcrumbs = (
  title: string,
  slug: string,
  baseUrl?: string,
) => {
  return [
    { name: "Home", url: baseUrl || "/" },
    { name: "Blog", url: `${baseUrl || ""}/blog` },
    { name: title, url: `${baseUrl || ""}/blog/${slug}` },
  ];
};

/**
 * Provider component for setting global JSON-LD configuration
 */
export interface JSONLDProviderProps {
  baseUrl?: string;
  organizationName?: string;
  nonce?: string;
  children: React.ReactNode;
}

const JSONLDContext = React.createContext<{
  baseUrl?: string;
  organizationName?: string;
  nonce?: string;
}>({});

export const JSONLDProvider: React.FC<JSONLDProviderProps> = ({
  baseUrl,
  organizationName,
  nonce,
  children,
}) => {
  return (
    <JSONLDContext.Provider value={{ baseUrl, organizationName, nonce }}>
      {children}
    </JSONLDContext.Provider>
  );
};

/**
 * Hook to access global JSON-LD configuration
 */
export const useJSONLDContext = () => {
  return React.useContext(JSONLDContext);
};

/**
 * Validates JSON-LD schema completeness for a page type
 */
export const validateWorkflowPageSchema = (
  workflow: WorkflowPackConfig,
): {
  isValid: boolean;
  missingElements: string[];
} => {
  const required = ["name", "summary"];
  const missing: string[] = [];

  required.forEach((field) => {
    if (!workflow[field as keyof WorkflowPackConfig]) {
      missing.push(field);
    }
  });

  // Check for steps
  if (!workflow.steps || workflow.steps.length === 0) {
    missing.push("steps");
  }

  return {
    isValid: missing.length === 0,
    missingElements: missing,
  };
};

/**
 * Debug utility to preview generated JSON-LD
 */
export const previewWorkflowJSON = (
  workflow: WorkflowPackConfig,
  baseUrl?: string,
): string => {
  const howTo = generateWorkflowHowToSchema(workflow, baseUrl);
  const faq = generateWorkflowFAQSchema(workflow);

  return JSON.stringify(
    {
      howTo: howTo,
      faq: faq,
    },
    null,
    2,
  );
};

/**
 * Generates JSON-LD for a collection page (e.g., all tools in a category)
 */
export const CollectionPageJSONLD: React.FC<{
  title: string;
  description: string;
  items: Array<{ name: string; url: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  nonce?: string;
}> = ({ title, description, items, breadcrumbs, nonce }) => {
  const schemas: any[] = [];

  // Create a collection schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  });

  // Add breadcrumb if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  return <JSONLDScript schemas={schemas} nonce={nonce} />;
};
