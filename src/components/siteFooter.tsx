import Link from "next/link";
import React from "react";
import { AppChip, AppText } from "./lib/ui";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerGroups = [
  {
    title: "Flagship Suites",
    links: [
      { href: "/drop", label: "DropStream (P2P Transfer)" },
      { href: "/beam", label: "BeamSuite (Camera to OBS)" },
      { href: "/codepair", label: "CodePair (Collaborative IDE)" },
      { href: "/studio", label: "LocalStudio (Media Tools)" },
    ],
  },
  {
    title: "Architecture & Privacy",
    links: [
      { href: "/blog/offline-web-tools-guide", label: "Zero-Cloud Architecture" },
      { href: "/blog/secure-password-generation-guide", label: "Client-Side Cryptography" },
      { href: "/blog/privacy-first-pdf-tools-guide", label: "Private Document Security" },
      { href: "/blog/rest-api-jwt-authentication-guide", label: "JWT & Token Inspection" },
    ],
  },
  {
    title: "Engineering Guides",
    links: [
      { href: "/blog", label: "All Technical Guides" },
      { href: "/blog/client-side-json-formatting-guide", label: "Client-Side JSON Guide" },
      { href: "/blog/free-developer-tools-guide", label: "Modern Developer Workflows" },
      { href: "/blog/private-image-compression-guide", label: "In-Browser Media Processing" },
    ],
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800/80 bg-slate-900/95 text-slate-200 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_2fr]">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-bold tracking-tight text-white">
                WebToolsEasy
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Zero-Cloud
              </span>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-slate-400 leading-relaxed">
              High-performance, privacy-first browser utilities powered by WebRTC and WebAssembly.
              All file transfers, camera streams, audio processing, and code compiling execute
              100% locally or direct peer-to-peer with zero server storage.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <AppChip label="Zero-Cloud" color="success" variant="outlined" />
              <AppChip label="Peer-to-Peer" color="primary" variant="outlined" />
              <AppChip label="Client-Side WASM" color="secondary" variant="outlined" />
            </div>

            {/* Social Follow Links */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Connect:</span>
              <Link
                href="https://twitter.com/webtoolseasy"
                target="_blank"
                rel="noopener noreferrer"
                title="WebToolsEasy on X"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              >
                <XIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/company/webtoolseasy/"
                target="_blank"
                rel="noopener noreferrer"
                title="WebToolsEasy on LinkedIn"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              >
                <LinkedInIcon />
              </Link>
              <Link
                href="https://www.facebook.com/people/Webtoolseasy/100088911459047/"
                target="_blank"
                rel="noopener noreferrer"
                title="WebToolsEasy on Facebook"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              >
                <FacebookIcon />
              </Link>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <AppText className="!text-xs !font-bold !uppercase !tracking-wider !text-slate-100">
                  {group.title}
                </AppText>
                <nav className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs sm:text-sm text-slate-400 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Legal & Privacy Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 space-y-2">
          <p className="text-[11px] font-semibold text-slate-300 tracking-wide uppercase">
            Privacy &amp; Local Execution Guarantee
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong>No Data Storage or Transmission:</strong> WebToolsEasy tools operate entirely client-side inside your browser environment or via direct peer-to-peer encrypted WebRTC DataChannels. Your documents, code, video streams, and credentials are never stored, logged, or relayed through remote cloud databases. All utility services are provided for informational and productivity purposes.
          </p>
        </div>

        {/* Bottom Bar: Single Unified Copyright */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {currentYear} WebToolsEasy. Built with privacy-first zero-cloud architecture.
          </p>
          <p className="text-[11px] text-slate-400">
            Direct P2P WebRTC mesh • Microsecond browser latency • No cookies or logins required.
          </p>
        </div>
      </div>
    </footer>
  );
}
