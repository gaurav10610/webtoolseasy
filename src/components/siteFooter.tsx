import Link from "next/link";
import { AppChip, AppText } from "./lib/ui";

const footerGroups = [
  {
    title: "Tool categories",
    links: [
      { href: "/tools/category/dev-tools", label: "Developer Tools" },
      { href: "/tools/category/image-tools", label: "Image Tools" },
      { href: "/tools/category/pdf-tools", label: "PDF Tools" },
      { href: "/tools/category/text-tools", label: "Text Tools" },
      { href: "/tools/category/calculators", label: "Calculators" },
    ],
  },
  {
    title: "Popular tools",
    links: [
      { href: "/tools/json-formatter", label: "JSON Formatter" },
      { href: "/tools/image-compress", label: "Image Compressor" },
      { href: "/tools/pdf-editor", label: "PDF Editor" },
      { href: "/tools/regex-tester", label: "Regex Tester" },
      { href: "/tools/password-generator", label: "Password Generator" },
      { href: "/tools/screen-recorder", label: "Screen Recorder" },
      { href: "/tools/qr-code-generator", label: "QR Code Generator" },
      { href: "/tools/resume-builder", label: "Resume Builder" },
    ],
  },
  {
    title: "Workflow packs",
    links: [
      { href: "/workflows", label: "All Workflow Packs" },
      { href: "/workflows/api-payload-cleanup", label: "API Payload Cleanup" },
      { href: "/workflows/blog-publish", label: "Blog Publish Workflow" },
      {
        href: "/workflows/technical-seo-quick-audit",
        label: "SEO Quick Audit",
      },
      { href: "/templates", label: "Browse Templates" },
      { href: "/workflows/insights", label: "Workflow Insights" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/blog/offline-web-tools-guide", label: "Offline Web Tools" },
      {
        href: "/blog/privacy-first-pdf-tools-guide",
        label: "PDF Privacy Guide",
      },
      {
        href: "/blog/free-developer-tools-guide",
        label: "Developer Tools Guide",
      },
    ],
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-[var(--mui-palette-divider)] bg-slate-950 text-slate-200">
      <div className="mx-auto grid w-full max-w-[1720px] gap-8 px-3 py-10 md:grid-cols-[1.2fr_2fr] md:px-5">
        <div className="space-y-4">
          <AppText className="!text-xl !font-bold !text-white">
            WebToolsEasy
          </AppText>
          <AppText className="max-w-xl !text-sm !text-slate-300">
            A modern suite of privacy-first online tools for developers,
            creators, and business teams. Everything runs in the browser for a
            faster and more trustworthy workflow.
          </AppText>
          <div className="flex flex-wrap gap-2">
            <AppChip label="Privacy-first" color="success" variant="outlined" />
            <AppChip label="Browser-based" color="primary" variant="outlined" />
            <AppChip label="115+ tools" color="secondary" variant="outlined" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <AppText className="!text-sm !font-semibold !uppercase !tracking-[0.16em] !text-slate-100">
                {group.title}
              </AppText>
              <nav className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-300 no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-[1720px] flex-col gap-2 px-3 py-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-5">
          <AppText className="!text-sm !text-slate-400">
            © {currentYear} WebToolsEasy. Professional browser tools with no
            signup and no forced uploads.
          </AppText>
          <AppText className="!text-sm !text-slate-400">
            All tools run in your browser. Your files never leave your device.
          </AppText>
        </div>
      </div>
    </footer>
  );
}
