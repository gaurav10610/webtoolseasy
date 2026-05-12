import "./globals.css";
import type { Metadata, Viewport } from "next";
import { robotoFont } from "@/design";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import HeaderAppBar from "@/components/headerAppBar";
import { CommonSiteData } from "@/components/commonSiteData";
import { SiteFooter } from "@/components/siteFooter";
import { AppThemeProvider } from "@/components/AppThemeProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.HOSTNAME!),
  title: {
    default: "WebToolsEasy – 110+ Free Online Tools | No Signup, Privacy-First",
    template: "%s | WebToolsEasy",
  },
  description:
    "Use 110+ free online tools — JSON formatter, PDF editor, image compressor, code beautifier, resume builder, and more. Everything runs in your browser: no upload, no signup, 100% private.",
  alternates: {
    canonical: process.env.HOSTNAME!,
  },
  robots: "index, follow",
  openGraph: {
    title: "WebToolsEasy – 110+ Free Online Tools | No Signup, Privacy-First",
    description:
      "Free browser-based tools for JSON, PDF, image, video, text, and SEO workflows. No upload, no signup — your data never leaves your device.",
    url: process.env.HOSTNAME!,
    siteName: "WebToolsEasy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebToolsEasy – 110+ Free Online Tools | No Signup, Privacy-First",
    description:
      "Free browser-based tools for JSON, PDF, image, video, text, and SEO workflows. No upload, no signup — your data never leaves your device.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotoFont.variable} antialiased`}>
        <AppRouterCacheProvider>
          <AppThemeProvider>
            {process.env.NODE_ENV === "production" && (
              <GoogleAnalytics gaId={process.env.GA_CODE!} />
            )}

            <div className="min-h-screen">
              <HeaderAppBar />

              <main
                id="main-content"
                className="w-full min-h-[calc(100vh-72px)]"
              >
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
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
