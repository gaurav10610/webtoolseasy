import "./globals.css";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import HeaderAppBar from "@/components/headerAppBar";
import { CommonSiteData } from "@/components/commonSiteData";
import { SiteFooter } from "@/components/siteFooter";
import { AppThemeProvider } from "@/components/AppThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.HOSTNAME!),
  title: {
    default: "WebToolsEasy - Free Privacy-First Online Tools",
    template: "%s | WebToolsEasy",
  },
  description:
    "Use 100+ free online JSON, PDF, image, text, video, and SEO tools that run in your browser with no upload, no signup, and privacy-first processing.",
  alternates: {
    canonical: process.env.HOSTNAME!,
  },
  robots: "index, follow",
  openGraph: {
    title: "WebToolsEasy - Free Privacy-First Online Tools",
    description:
      "Free browser-based tools for JSON, PDF, image, video, text, and SEO workflows with no upload and no signup.",
    url: process.env.HOSTNAME!,
    siteName: "WebToolsEasy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebToolsEasy - Free Privacy-First Online Tools",
    description:
      "Free browser-based tools for JSON, PDF, image, video, text, and SEO workflows with no upload and no signup.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('webtoolseasy-theme-preference');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(p==='dark'||(p!=='light'&&d)){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <AppThemeProvider>
          {process.env.NODE_ENV === "production" &&
            process.env.GA_CODE &&
            !process.env.GA_CODE.includes("XXXX") && (
              <GoogleAnalytics gaId={process.env.GA_CODE} />
            )}

          <div className="min-h-screen">
            <HeaderAppBar />

            <main id="main-content" className="w-full min-h-[calc(100vh-72px)]">
              <div className="w-full px-3 py-4 md:px-5 md:py-6 xl:px-6 2xl:px-8">
                {children}
              </div>
            </main>

            <section className="w-full px-3 pb-6 md:px-5 md:pb-8 xl:px-6 2xl:px-8">
              <div className="rounded-[24px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)]/85 p-4 shadow-sm backdrop-blur md:p-6">
                <CommonSiteData className="w-full" />
              </div>
            </section>

            <SiteFooter />
          </div>
        </AppThemeProvider>
      </body>
    </html>
  );
}
