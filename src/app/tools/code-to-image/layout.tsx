import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code to Image Converter | Beautiful Code Snippet Generator",
  description: "Create gorgeous, high-resolution PNG images of your code for Twitter, LinkedIn, and blogs. Rendered entirely locally in your browser with Monaco Editor.",
  keywords: "code to image, beautiful code snippets, carbon clone online, share code screenshot",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/code-to-image",
  },
  openGraph: {
    title: "Code to Image Converter | Beautiful Code Snippet Generator",
    description: "Create gorgeous, high-resolution PNG images of your code for Twitter, LinkedIn, and blogs. Rendered entirely locally in your browser with Monaco Editor.",
    url: "https://webtoolseasy.com/tools/code-to-image",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-code-to-image.png",
        width: 1200,
        height: 630,
        alt: "Code to Image Converter | Beautiful Code Snippet Generator",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Code to Image Converter | Beautiful Code Snippet Generator",
    description: "Create gorgeous, high-resolution PNG images of your code for Twitter, LinkedIn, and blogs. Rendered entirely locally in your browser with Monaco Editor.",
    images: ["https://webtoolseasy.com/og-images/tools-code-to-image.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Code to Image Converter",
    "description": "Create gorgeous, high-resolution PNG images of your code for Twitter, LinkedIn, and blogs. Rendered entirely locally in your browser with Monaco Editor.",
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
