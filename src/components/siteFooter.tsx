import Link from "next/link";
import { Typography } from "@mui/material";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Typography
              variant="h6"
              className="!text-white !font-bold mb-4 flex items-center gap-2"
            >
              🛠️ WebToolsEasy
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-4">
              115+ free privacy-first online tools. All processing happens in
              your browser - your data never leaves your device.
            </Typography>
            <div className="flex gap-3">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-900 text-green-300">
                🔒 Private
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-900 text-blue-300">
                ⚡ Fast
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-900 text-purple-300">
                🌐 Offline
              </span>
            </div>
          </div>

          {/* Tool Categories */}
          <div>
            <Typography
              variant="subtitle1"
              className="!text-white !font-semibold mb-4"
            >
              Tool Categories
            </Typography>
            <nav className="flex flex-col gap-2">
              <Link
                href="/tools/category/pdf-tools"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                📄 PDF Tools
              </Link>
              <Link
                href="/tools/category/image-tools"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                🖼️ Image Tools
              </Link>
              <Link
                href="/tools/category/dev-tools"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                🛠️ Developer Tools
              </Link>
              <Link
                href="/tools/category/text-tools"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                ✍️ Text Tools
              </Link>
              <Link
                href="/tools/category/calculators"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                🧮 Calculators
              </Link>
              <Link
                href="/?category=Media"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                🎬 Media Tools
              </Link>
            </nav>
          </div>

          {/* Popular Tools */}
          <div>
            <Typography
              variant="subtitle1"
              className="!text-white !font-semibold mb-4"
            >
              Popular Tools
            </Typography>
            <nav className="flex flex-col gap-2">
              <Link
                href="/tools/json-formatter"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                JSON Formatter
              </Link>
              <Link
                href="/tools/image-compressor"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Image Compressor
              </Link>
              <Link
                href="/tools/pdf-editor"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                PDF Editor
              </Link>
              <Link
                href="/tools/password-generator"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Password Generator
              </Link>
              <Link
                href="/tools/base64-encode"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Base64 Encoder
              </Link>
              <Link
                href="/tools/qr-code-generator"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                QR Code Generator
              </Link>
            </nav>
          </div>

          {/* More Tools */}
          <div>
            <Typography
              variant="subtitle1"
              className="!text-white !font-semibold mb-4"
            >
              More Tools
            </Typography>
            <nav className="flex flex-col gap-2">
              <Link
                href="/tools/jwt-decoder"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                JWT Decoder
              </Link>
              <Link
                href="/tools/hash-generator"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Hash Generator
              </Link>
              <Link
                href="/tools/word-counter"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Word Counter
              </Link>
              <Link
                href="/tools/pdf-merge"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                PDF Merge
              </Link>
              <Link
                href="/tools/background-remover"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Background Remover
              </Link>
              <Link
                href="/tools/regex-tester"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Regex Tester
              </Link>
            </nav>
          </div>

          {/* Blog & Resources */}
          <div>
            <Typography
              variant="subtitle1"
              className="!text-white !font-semibold mb-4"
            >
              Blog & Resources
            </Typography>
            <nav className="flex flex-col gap-2">
              <Link
                href="/blog"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                📚 All Articles
              </Link>
              <Link
                href="/blog/offline-web-tools-guide"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Offline Web Tools
              </Link>
              <Link
                href="/blog/private-image-compression-guide"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Private Image Compression
              </Link>
              <Link
                href="/blog/free-developer-tools-guide"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Developer Tools Guide
              </Link>
              <Link
                href="/blog/privacy-first-pdf-tools-guide"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                PDF Privacy Guide
              </Link>
              <Link
                href="/blog/secure-password-generation-guide"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Password Security
              </Link>
            </nav>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-400">✓</span>
              <span className="text-gray-400">100% Client-Side Processing</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-400">✓</span>
              <span className="text-gray-400">No Server Uploads</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-400">✓</span>
              <span className="text-gray-400">No Registration Required</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-400">✓</span>
              <span className="text-gray-400">Works Offline</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-400">✓</span>
              <span className="text-gray-400">Free Forever</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography variant="body2" className="text-gray-500">
            © {currentYear} WebToolsEasy. All rights reserved. Your data stays
            on your device.
          </Typography>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Blog
            </Link>
            <a
              href="https://twitter.com/webtoolseasy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
