/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const coopCoepHeaders = [
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      },
      {
        key: "Cross-Origin-Embedder-Policy",
        value: "require-corp",
      },
    ];
    // No COOP/COEP headers needed – all tools use native WebCodecs API (no SharedArrayBuffer required)
    return [];
  },
  async redirects() {
    return [
      // Block Pyodide/internal asset requests from being treated as tool routes.
      {
        source: "/tools/:path((?:.*\\.js|.*\\.mjs|stackframe.*|pyodide.*))",
        destination: "/404",
        permanent: false,
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
