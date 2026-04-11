import Script from "next/script";

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  const type = typeof data["@type"] === "string" ? data["@type"] : "schema";
  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}

// Tool-specific structured data generators
export function generateWebApplicationSchema({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem = "Any",
  browserRequirements = "Any modern web browser",
  keywords,
  author = "Gaurav Kumar Yadav",
  publisher = "WebToolsEasy",
  datePublished,
  dateModified,
  image,
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  browserRequirements?: string;
  keywords: string[];
  author?: string;
  publisher?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    browserRequirements,
    keywords: keywords.join(", "),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: publisher,
      url: process.env.HOSTNAME,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    isAccessibleForFree: true,
    isFamilyFriendly: true,
  };

  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;
  if (image) {
    schema.image = {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    };
  }
  return schema;
}

export function generateBreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
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
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WebToolsEasy",
    url: process.env.HOSTNAME,
    logo: `${process.env.HOSTNAME}/favicon.png`,
    description:
      "Free online tools and utilities for developers, designers, and content creators. No registration required.",
    sameAs: [
      "https://twitter.com/webtoolseasy",
      "https://www.linkedin.com/company/webtoolseasy/",
      "https://www.facebook.com/people/Webtoolseasy/100088911459047/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${process.env.HOSTNAME}/contact`,
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WebToolsEasy",
    url: process.env.HOSTNAME,
    description:
      "Free online tools and utilities for developers, designers, and content creators. No registration required.",
    publisher: {
      "@type": "Organization",
      name: "WebToolsEasy",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.HOSTNAME}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateSoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory,
  keywords,
  author = "Gaurav Kumar Yadav",
  publisher = "WebToolsEasy",
  datePublished,
  dateModified,
  image,
  features,
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  keywords: string[];
  author?: string;
  publisher?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  features?: string[];
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory,
    applicationSubCategory: "Web Application",
    operatingSystem: "Web Browser",
    keywords: keywords.join(", "),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: publisher,
      url: process.env.HOSTNAME,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    browserRequirements: "HTML5, JavaScript enabled",
  };

  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;
  if (image) {
    schema.image = {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    };
  }
  if (features && features.length > 0) {
    schema.featureList = features;
  }

  return schema;
}

export function generateArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = "Gaurav Kumar Yadav",
  publisher = "WebToolsEasy",
  keywords,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  publisher?: string;
  keywords?: string[];
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: publisher,
      url: process.env.HOSTNAME,
      logo: {
        "@type": "ImageObject",
        url: `${process.env.HOSTNAME}/favicon.png`,
      },
    },
  };

  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;
  if (image) {
    schema.image = {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    };
  }
  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(", ");
  }

  return schema;
}

/**
 * Generate FAQPage schema for enhanced search appearance
 * FAQs can help tools appear in rich snippets and featured snippets
 */
export function generateFAQPageSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo schema for step-by-step tool instructions
 * Improves chances of appearing in "How to" rich results
 */
export function generateHowToSchema({
  name,
  description,
  steps,
  totalTime,
  image,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; image?: string }>;
  totalTime?: string; // ISO 8601 duration, e.g., "PT5M" for 5 minutes
  image?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          "@type": "ImageObject",
          url: step.image,
        },
      }),
    })),
  };

  if (totalTime) schema.totalTime = totalTime;
  if (image) {
    schema.image = {
      "@type": "ImageObject",
      url: image,
    };
  }

  return schema;
}
