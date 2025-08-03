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
  aggregateRating,
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
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
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
  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating || 5,
      worstRating: aggregateRating.worstRating || 1,
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
  aggregateRating,
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
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
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
  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating || 5,
      worstRating: aggregateRating.worstRating || 1,
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

// Random rating generator for tools
export function generateRandomRating(): {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
} {
  // Generate ratings between 4.1 and 4.9 for realistic high ratings
  const ratingValue = Number((Math.random() * 0.8 + 4.1).toFixed(1));

  // Generate review counts between 50 and 500
  const reviewCount = Math.floor(Math.random() * 450) + 50;

  return {
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}
