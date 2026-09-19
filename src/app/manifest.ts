import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WebToolsEasy - Free Privacy-First Online Tools",
    short_name: "WebToolsEasy",
    description:
      "100+ free online developer, PDF, image, text, and financial tools that run 100% in your browser with complete privacy.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f6cbd",
    icons: [
      {
        src: "/favicon_48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon_512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["utilities", "productivity", "developer tools"],
  };
}
