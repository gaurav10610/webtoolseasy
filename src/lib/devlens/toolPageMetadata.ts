import type { Metadata } from "next";
import type { ToolMeta } from "./toolMeta";

const SITE_URL = "https://webtoolseasy.com";

export function createToolPageMetadata(meta: ToolMeta): Metadata {
  const canonical = `${SITE_URL}/tools/${meta.slug}`;
  const ogImage = `${SITE_URL}/og/tool/${meta.slug}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: "WebToolsEasy",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${meta.shortTitle} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}
