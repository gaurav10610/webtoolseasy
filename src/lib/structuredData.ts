/**
 * FAQ and HowTo Schema Generation
 *
 * Generates structured data (schema.org) for FAQ and HowTo content
 * on workflow pages to improve SEO and rich snippet visibility.
 */

import { WorkflowPackConfig, WorkflowStepConfig } from "@/types/workflow";

/**
 * Represents a FAQ item
 */
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

/**
 * Represents a HowTo step in structured format
 */
export interface HowToStepStructured {
  name: string;
  description: string;
  url?: string;
  image?: string;
}

/**
 * Generates schema.org FAQ structured data
 * Used for FAQ snippets in search results
 */
export const generateFAQSchema = (items: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};

/**
 * Generates schema.org HowTo structured data
 * Used for HowTo guides in search results and voice assistants
 */
export const generateHowToSchema = (
  title: string,
  steps: HowToStepStructured[],
  options?: {
    description?: string;
    image?: string;
    yield?: string;
    time?: string;
    difficulty?: "Easy" | "Medium" | "Hard";
  },
) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: options?.description,
    image: options?.image,
    estimatedTime: options?.time,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      description: step.description,
      url: step.url,
      image: step.image,
    })),
    ...(options?.difficulty && { difficulty: options.difficulty }),
    ...(options?.yield && { yield: options.yield }),
  };
};

/**
 * Generates workflow-specific HowTo schema from workflow pack config
 */
export const generateWorkflowHowToSchema = (
  workflow: WorkflowPackConfig,
  baseUrl?: string,
) => {
  const steps: HowToStepStructured[] = workflow.steps.map((step, index) => ({
    name: step.title,
    description: step.description,
    url: baseUrl ? `${baseUrl}#step-${index + 1}` : undefined,
  }));

  // Estimate difficulty based on step count
  const difficulty =
    workflow.steps.length > 5
      ? "Hard"
      : workflow.steps.length > 3
        ? "Medium"
        : "Easy";

  // Estimate time based on step count
  const estimatedMinutes = workflow.steps.length * 2; // 2 min per step average
  const time = `PT${estimatedMinutes}M`;

  return generateHowToSchema(workflow.name, steps, {
    description: workflow.summary,
    difficulty,
    time,
    yield: `Processed ${workflow.category} data`,
  });
};

/**
 * Generates FAQ schema for common workflow questions
 */
export const generateWorkflowFAQSchema = (workflow: WorkflowPackConfig) => {
  const faqItems: FAQItem[] = [
    {
      question: `What is ${workflow.name}?`,
      answer: workflow.summary,
      category: "General",
    },
    {
      question: `How many steps does ${workflow.name} have?`,
      answer: `${workflow.name} consists of ${workflow.steps.length} steps: ${workflow.steps
        .map((s) => s.title)
        .join(", ")}.`,
      category: "Structure",
    },
    {
      question: `Is ${workflow.name} private/local-only?`,
      answer: `${
        workflow.steps.some((s) => s.executionMode === "local-only")
          ? `${workflow.name} processes data locally in your browser for privacy.`
          : `${workflow.name} requires network access for some processing.`
      }`,
      category: "Privacy",
    },
    {
      question: `What can I export from ${workflow.name}?`,
      answer: `You can export: ${workflow.outputArtifacts.join(", ")}. All exports are saved to your device.`,
      category: "Output",
    },
    {
      question: `What are the workflow tags for ${workflow.name}?`,
      answer: `${workflow.name} is tagged with: ${workflow.tags.join(", ")}.`,
      category: "Metadata",
    },
  ];

  return generateFAQSchema(faqItems);
};

/**
 * Generates comprehensive structured data for a workflow page
 * Combines FAQ + HowTo + basic schema
 */
export const generateWorkflowStructuredData = (
  workflow: WorkflowPackConfig,
  baseUrl?: string,
) => {
  return {
    howTo: generateWorkflowHowToSchema(workflow, baseUrl),
    faq: generateWorkflowFAQSchema(workflow),
  };
};

/**
 * Generates schema.org Article structured data for workflow blog posts
 */
export const generateArticleSchema = (
  title: string,
  content: string,
  options?: {
    description?: string;
    image?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    keywords?: string[];
  },
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: options?.description,
    image: options?.image,
    articleBody: content,
    author: options?.author
      ? {
          "@type": "Person",
          name: options.author,
        }
      : undefined,
    datePublished: options?.datePublished,
    dateModified: options?.dateModified,
    keywords: options?.keywords?.join(", "),
  };
};

/**
 * Generates BreadcrumbList structured data for navigation
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generates Organization structured data
 */
export const generateOrganizationSchema = (options?: {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: options?.name || "WebToolsEasy",
    url: options?.url,
    logo: options?.logo,
    description: options?.description,
    sameAs: options?.sameAs || [],
  };
};

/**
 * Converts structured data object to JSON-LD script tag content
 */
export const toJSONLDScript = (schema: any): string => {
  return JSON.stringify(schema, null, 2);
};

/**
 * Validates that required fields exist in schema
 */
export const validateSchema = (
  schema: any,
  requiredFields: string[],
): boolean => {
  const checkRequired = (obj: any, fields: string[]): boolean => {
    if (!obj) return false;
    return fields.every((field) => {
      const value = obj[field];
      return value !== undefined && value !== null && value !== "";
    });
  };

  if (schema.mainEntity && Array.isArray(schema.mainEntity)) {
    return schema.mainEntity.every((item: any) =>
      checkRequired(item, requiredFields),
    );
  }

  return checkRequired(schema, requiredFields);
};

/**
 * Merges multiple structured data objects for the same page
 */
export const mergeStructuredData = (...schemas: any[]) => {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.filter((s) => s && Object.keys(s).length > 0),
  };
};

/**
 * Generates a template for FAQ for a specific workflow step
 */
export const generateStepFAQ = (step: WorkflowStepConfig): FAQItem[] => {
  return [
    {
      question: `What does the "${step.title}" step do?`,
      answer: step.description,
      category: "Workflow Steps",
    },
    {
      question: `Is "${step.title}" processed locally or remotely?`,
      answer: `The "${step.title}" step is ${step.executionMode.replace(/-/g, " ")} step.`,
      category: "Privacy",
    },
  ];
};
