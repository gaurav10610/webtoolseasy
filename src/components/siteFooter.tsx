import Link from "next/link";
import { AppChip, AppText } from "./lib/ui";

const footerGroups = [
  {
    title: "Flagship Suites",
    links: [
      { href: "/drop", label: "DropStream (P2P Transfer)" },
      { href: "/beam", label: "BeamSuite (Camera to OBS)" },
      { href: "/codepair", label: "CodePair (Collaborative IDE)" },
      { href: "/studio", label: "LocalStudio (Video & Audio)" },
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
    <footer className="mt-8 border-t border-[var(--mui-palette-divider)] bg-slate-950 text-slate-200">
      <div className="mx-auto grid w-full max-w-[1720px] gap-8 px-3 py-10 md:grid-cols-[1.2fr_2fr] md:px-5">
        <div className="space-y-4">
          <AppText className="!text-xl !font-bold !text-white">
            WebToolsEasy
          </AppText>
          <AppText className="max-w-xl !text-sm !text-slate-300">
            Enterprise-grade, zero-cloud browser utilities powered by WebRTC.
            All processing, real-time streaming, and collaborative sync occurs
            directly peer-to-peer or inside your device memory with zero server
            storage.
          </AppText>
          <div className="flex flex-wrap gap-2">
            <AppChip label="Zero-Cloud" color="success" variant="outlined" />
            <AppChip label="Peer-to-Peer" color="primary" variant="outlined" />
            <AppChip label="100% Client-Side" color="secondary" variant="outlined" />
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
            © {currentYear} WebToolsEasy. High-performance zero-cloud browser architecture.
          </AppText>
          <AppText className="!text-sm !text-slate-400">
            Direct peer-to-peer WebRTC connections. No servers retain your files or streams.
          </AppText>
        </div>
      </div>
    </footer>
  );
}
