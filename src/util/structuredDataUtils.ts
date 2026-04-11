import { apps } from "@/data/apps";
import { categoryConfigs } from "@/data/categories";
import { ApplicationIds } from "@/types/config";
import { getToolRating } from "./ratingUtils";

export interface ToolFAQ {
  question: string;
  answer: string;
}

export function createToolStructuredData({
  pageUrl,
  pageTitle,
  mainHeading,
  keywords,
  faqs,
}: {
  pageUrl: string;
  pageTitle: string;
  mainHeading: string;
  keywords: string[];
  faqs?: ToolFAQ[];
}) {
  const toolUrl = `${process.env.HOSTNAME}/tools/${pageUrl}`;
  const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/${pageUrl}.png`;
  const toolRating = getToolRating(pageUrl);
  const currentAppConfig = Object.values(apps).find(
    (appConfig) => appConfig.navigateUrl === `tools/${pageUrl}`,
  );
  const currentCategoryConfig = Object.values(categoryConfigs).find(
    (categoryConfig) =>
      currentAppConfig
        ? categoryConfig.toolIds.includes(
            currentAppConfig.applicationId as ApplicationIds,
          )
        : false,
  );

  const result: Record<string, unknown> = {
    webApplication: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: pageTitle,
      description: mainHeading,
      url: toolUrl,
      applicationCategory: "Productivity",
      operatingSystem: "Any",
      browserRequirements: "Any modern web browser",
      keywords: keywords.join(", "),
      author: {
        "@type": "Person",
        name: "Gaurav Kumar Yadav",
      },
      publisher: {
        "@type": "Organization",
        name: "WebToolsEasy",
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
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: 1200,
        height: 630,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: toolRating.ratingValue,
        reviewCount: toolRating.reviewCount,
        bestRating: toolRating.bestRating,
        worstRating: toolRating.worstRating,
      },
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: process.env.HOSTNAME!,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: currentCategoryConfig?.name ?? "Tools",
          item: currentCategoryConfig
            ? `${process.env.HOSTNAME}/tools/category/${currentCategoryConfig.slug}`
            : process.env.HOSTNAME!,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: pageTitle,
          item: toolUrl,
        },
      ],
    },
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "WebToolsEasy",
      url: process.env.HOSTNAME,
      logo: `${process.env.HOSTNAME}/favicon.png`,
      description:
        "Privacy-first online tools that run 100% client-side. Your data never leaves your browser.",
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
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "WebToolsEasy",
      url: process.env.HOSTNAME,
      description:
        "Privacy-first online tools that run 100% client-side. Your data never leaves your browser.",
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
    },
  };

  // Add FAQ schema if FAQs are provided
  if (faqs && faqs.length > 0) {
    result.faqPage = {
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

  return result;
}
