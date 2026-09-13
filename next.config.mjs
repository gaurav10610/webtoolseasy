/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/((?!api/|_next/).*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, s-maxage=604800",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Block Pyodide/internal asset requests from being treated as tool routes.
      {
        source: "/tools/:path((?:.*\\.js|.*\\.mjs|stackframe.*|pyodide.*))",
        destination: "/404",
        permanent: false,
      },
      // Consolidate fragmented UUID/GUID tools to Universal UUID Suite
      {
        source: "/tools/uuid-v1-generator",
        destination: "/tools/uuid-v4-generator",
        permanent: true,
      },
      {
        source: "/tools/uuid-v3-generator",
        destination: "/tools/uuid-v4-generator",
        permanent: true,
      },
      {
        source: "/tools/uuid-v5-generator",
        destination: "/tools/uuid-v4-generator",
        permanent: true,
      },
      {
        source: "/tools/uuid-v7-generator",
        destination: "/tools/uuid-v4-generator",
        permanent: true,
      },
      {
        source: "/tools/guid-generator",
        destination: "/tools/uuid-v4-generator",
        permanent: true,
      },
      {
        source: "/tools/ulid-generator",
        destination: "/tools/uuid-v4-generator",
        permanent: true,
      },
      // Consolidate Base64 Decode to Universal Base64 Studio
      {
        source: "/tools/base64-decode",
        destination: "/tools/base64-encode",
        permanent: true,
      },
      // Prune thin, non-indexed calculators to eliminate Google HCU domain penalty
      {
        source: "/tools/tip-calculator",
        destination: "/tools/category/calculators",
        permanent: true,
      },
      {
        source: "/tools/fraction-calculator",
        destination: "/tools/category/calculators",
        permanent: true,
      },
      {
        source: "/tools/bmi-calculator",
        destination: "/tools/category/calculators",
        permanent: true,
      },
      {
        source: "/tools/calorie-calculator",
        destination: "/tools/category/calculators",
        permanent: true,
      },
      {
        source: "/tools/gpa-calculator",
        destination: "/tools/category/calculators",
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  experimental: {
    optimizePackageImports: ["lodash-es"],
  },
};

export default nextConfig;
