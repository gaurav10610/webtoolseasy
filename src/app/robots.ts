import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const hostname = process.env.HOSTNAME || "https://webtoolseasy.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${hostname}/sitemap.xml`,
    host: hostname,
  };
}
