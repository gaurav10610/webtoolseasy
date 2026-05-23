import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docker Compose Architect | Visual YAML Builder",
  description: "Visually assemble complex Docker Compose architectures. Connect Postgres, Redis, and Node services with UI blocks and instantly export raw YAML.",
  keywords: "docker compose builder, visual docker generator, docker yaml generator, container architect",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/docker-compose",
  },
  openGraph: {
    title: "Docker Compose Architect | Visual YAML Builder",
    description: "Visually assemble complex Docker Compose architectures. Connect Postgres, Redis, and Node services with UI blocks and instantly export raw YAML.",
    url: "https://webtoolseasy.com/tools/docker-compose",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-docker-compose.png",
        width: 1200,
        height: 630,
        alt: "Docker Compose Architect | Visual YAML Builder",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Docker Compose Architect | Visual YAML Builder",
    description: "Visually assemble complex Docker Compose architectures. Connect Postgres, Redis, and Node services with UI blocks and instantly export raw YAML.",
    images: ["https://webtoolseasy.com/og-images/tools-docker-compose.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Docker Compose Architect",
    "description": "Visually assemble complex Docker Compose architectures. Connect Postgres, Redis, and Node services with UI blocks and instantly export raw YAML.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
