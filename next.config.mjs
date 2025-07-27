/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Block Pyodide internal files from being treated as tools
      {
        source: "/tools/:path*.js",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/tools/:path*.mjs",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/tools/stackframe:path*",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/tools/pyodide:path*",
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
  experimental: {
    optimizePackageImports: ["lodash-es"],
  },
};

export default nextConfig;
