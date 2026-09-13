"use client";

import { useState } from "react";

function FacebookSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  );
}

function WhatsAppSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.073-2.193-.545-1.914-.792-3.14-2.736-3.235-2.862-.095-.127-.775-1.03-.775-1.966 0-.935.488-1.396.662-1.587.174-.191.381-.239.508-.239.127 0 .254.002.366.007.118.006.277-.045.433.33.161.387.549 1.336.598 1.433.048.097.08.212.016.339-.064.127-.096.206-.191.317-.095.111-.202.248-.288.334-.096.096-.197.2-.085.392.112.192.497.818 1.066 1.325.733.654 1.35.856 1.542.952.191.096.303.08.416-.048.112-.128.481-.561.609-.753.128-.192.256-.16.432-.095.176.064 1.117.527 1.309.623.191.095.319.144.366.223.048.08.048.463-.096.868z" />
    </svg>
  );
}

function XSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function LinkSvgIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

export const SocialShareButtons = ({
  pageUrl,
  heading = "",
}: Readonly<{
  pageUrl: string;
  heading?: string;
}>) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: heading,
          url: pageUrl,
        });
      } catch {
        // user cancelled or error
      }
    }
  };

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedText = encodeURIComponent(heading);

  return (
    <div className="flex flex-row gap-2 w-full items-center justify-end">
      {copied && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 text-sm font-medium shadow-2xl animate-in fade-in"
        >
          Link copied to clipboard!
        </div>
      )}

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
      >
        <WhatsAppSvg className="w-4 h-4" />
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X"
        aria-label="Share on X"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-800 text-white hover:opacity-90 transition-opacity"
      >
        <XSvg className="w-3.5 h-3.5" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
      >
        <LinkedInSvg className="w-3.5 h-3.5" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Facebook"
        aria-label="Share on Facebook"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
      >
        <FacebookSvg className="w-4 h-4" />
      </a>

      {/* Copy link button */}
      <button
        type="button"
        title="Copy link"
        aria-label="Copy link"
        onClick={handleCopy}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 hover:bg-sky-100 transition-colors cursor-pointer"
      >
        <LinkSvgIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
