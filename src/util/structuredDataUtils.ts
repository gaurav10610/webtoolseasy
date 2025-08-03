import { getToolRating } from "./ratingUtils";

export function createToolStructuredData({
  pageUrl,
  pageTitle,
  mainHeading,
  keywords,
}: {
  pageUrl: string;
  pageTitle: string;
  mainHeading: string;
  keywords: string[];
}) {
  const toolUrl = `${process.env.HOSTNAME}/tools/${pageUrl}`;
  const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/${pageUrl}.png`;
  const toolRating = getToolRating(pageUrl);

  return {
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
          name: "Tools",
          item: `${process.env.HOSTNAME}/tools`,
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
    },
    website: {
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
    },
  };
}
