import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Browser Screen Recorder | No Watermark",
  description: "Record your screen, webcam, and microphone securely directly from the browser. Memory-safe, no watermarks, completely local.",
  keywords: "free screen recorder, no watermark screen recorder, record screen online, memory safe screen record",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/screen-recorder",
  },
  openGraph: {
    title: "Free Browser Screen Recorder | No Watermark",
    description: "Record your screen, webcam, and microphone securely directly from the browser. Memory-safe, no watermarks, completely local.",
    url: "https://webtoolseasy.com/tools/screen-recorder",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-screen-recorder.png",
        width: 1200,
        height: 630,
        alt: "Free Browser Screen Recorder | No Watermark",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Browser Screen Recorder | No Watermark",
    description: "Record your screen, webcam, and microphone securely directly from the browser. Memory-safe, no watermarks, completely local.",
    images: ["https://webtoolseasy.com/og-images/tools-screen-recorder.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Browser Screen Recorder",
    "description": "Record your screen, webcam, and microphone securely directly from the browser. Memory-safe, no watermarks, completely local.",
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
