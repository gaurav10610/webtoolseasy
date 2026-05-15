import { type ToolMeta } from "@/lib/devlens/toolMeta";

export function buildFaqJsonLd(meta: ToolMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: meta.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildSoftwareJsonLd(meta: ToolMeta, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: meta.shortTitle,
    description: meta.description,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
