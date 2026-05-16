/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // No COOP/COEP headers needed – all tools use native APIs
    return [];
  },
  async redirects() {
    return [
      // Old tool URLs that map to new DevLens equivalents
      {
        source: "/tools/json-formatter",
        destination: "/tools/json-query",
        permanent: true,
      },
      {
        source: "/tools/base64-encoder",
        destination: "/tools/base64",
        permanent: true,
      },
      {
        source: "/tools/base64-decoder",
        destination: "/tools/base64",
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
};

export default nextConfig;
