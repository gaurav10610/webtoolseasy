import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["javascript", "typescript", "json", "html", "css"],
          filename: "static/[name].worker.js",
        })
      );
    }

    return config;
  },
  experimental: {
    optimizePackageImports: ["lodash-es"],
  },
};

export default nextConfig;
