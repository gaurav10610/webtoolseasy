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
    // Only apply restrictive cross-origin headers to FFmpeg-based tool routes
    // that require SharedArrayBuffer. Applying site-wide blocks social embeds,
    // OG image previews, and can interfere with crawler rendering.
    return [
      { source: "/tools/video-editor", headers: coopCoepHeaders },
      { source: "/tools/audio-converter", headers: coopCoepHeaders },
      { source: "/tools/video-to-audio-converter", headers: coopCoepHeaders },
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
