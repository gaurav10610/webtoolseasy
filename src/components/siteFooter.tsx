import Link from "next/link";
import { AppChip, AppText } from "./lib/ui";

const footerGroups = [
  {
    title: "Tool categories",
    links: [
      { href: "/?category=Programming", label: "Programming" },
      { href: "/?category=Media", label: "Media" },
      { href: "/?category=Text", label: "Text" },
      { href: "/?category=Finance", label: "Finance" },
    ],
  },
  {
    title: "Popular tools",
    links: [
      { href: "/tools/json-formatter", label: "JSON Formatter" },
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/pdf-compress", label: "PDF Compress" },
      { href: "/tools/regex-tester", label: "Regex Tester" },
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            Built for better UX, stronger SEO, and faster workflows.
          </AppText>
        </div>
      </div>
    </footer>
  );
}
