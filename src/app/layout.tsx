import "./globals.css";
import { robotoFont } from "@/design";
import { theme } from "@/theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import HeaderAppBar from "@/components/headerAppBar";
import { CommonSiteData } from "@/components/commonSiteData";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoFont.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {process.env.NODE_ENV === "production" && (
              <GoogleAnalytics gaId={process.env.GA_CODE!} />
            )}
            <HeaderAppBar className="mb-4" />
            <main className="w-full min-h-screen">
              <div className="w-full mx-auto">{children}</div>
            </main>
            <div className="flex flex-row w-full gap-2 mb-4 p-2">
              <span className="hidden md:block w-[20%]"></span>
              <CommonSiteData className="w-full" />
              <span className="hidden md:block w-[20%]"></span>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
