import Link from "next/link";
import React from "react";

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SocialFollowButtons() {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <span className="text-xs text-slate-500 dark:text-slate-400">
        Follow us on social media:
      </span>
      <div className="w-full flex flex-row gap-4 justify-center items-center">
        <Link
          href="https://www.facebook.com/people/Webtoolseasy/100088911459047/"
          target="_blank"
          title="Webtoolseasy Facebook Page"
          className="text-sky-600 hover:text-sky-700 transition-colors"
        >
          <FacebookIcon className="w-5 h-5" />
        </Link>
        <Link
          href="https://www.linkedin.com/company/webtoolseasy/"
          target="_blank"
          title="Webtoolseasy LinkedIn Page"
          className="text-sky-700 hover:text-sky-800 transition-colors"
        >
          <LinkedInIcon className="w-5 h-5" />
        </Link>
        <Link
          href="https://twitter.com/webtoolseasy"
          target="_blank"
          title="Webtoolseasy X Page"
          className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <XIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

function CopyRight() {
  return (
    <span className="text-xs text-slate-500 dark:text-slate-400">
      © 2025-2026. All rights reserved.{" "}
    </span>
  );
}

const Disclaimer = () => {
  return (
    <div className="w-full flex flex-col gap-2 mb-3 text-center md:text-left">
      <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 text-center">
        Disclaimer
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        The web tools provided on this website are offered for free and for
        general informational or utility purposes only. We make no warranties
        about the completeness, reliability, accuracy, or suitability of these
        tools for any particular purpose. Use of these tools is at your sole
        risk.
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <strong>No Data Storage or Transmission:</strong> We do not store,
        collect, or transmit any user data entered into these tools outside of
        your web browser. All processing and calculations occur locally within
        your browser environment.
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <strong>External Links:</strong> This website may contain links to
        external websites. We are not responsible for the content or privacy
        practices of these websites.
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <strong>
          By using this website and its tools, you agree to this disclaimer.
        </strong>{" "}
        We reserve the right to modify this disclaimer at any time without
        notice. It is your responsibility to review this disclaimer periodically
        for changes.
      </p>
    </div>
  );
};

export async function CommonSiteData({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <SocialFollowButtons />
      <CopyRight />
      <Disclaimer />
    </div>
  );
}
