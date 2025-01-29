import "./globals.css";
import { robotoFont } from "@/design";
import { theme } from "@/theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ResponsiveAppBar } from "@/components/lib/appBar";
import { getRandomId } from "@/util/commonUtils";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ApplicationIcon from "@/data/icons/app-icon.svg";
import { CustomSvgIcon } from "@/components/lib/icons";
import HomeIcon from "@/data/icons/home.svg";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BaseToolsAds } from "@/components/baseAds";
import SidePanel from "@/components/sidePanel";
import * as appConfigJson from "@/data/apps.json";
import { AppListConfig } from "@/types/config";

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
            <div className="w-full flex flex-col overflow-y-hidden">
              <ResponsiveAppBar>
                <div className="flex flex-row gap-2 w-full items-center">
                  <Link href="/" key={getRandomId()}>
                    <CustomSvgIcon size="large">
                      <ApplicationIcon />
                    </CustomSvgIcon>
                  </Link>
                  <Link
                    href="/"
                    passHref
                    key={getRandomId()}
                    className="flex-grow"
                  >
                    <Typography className="!text-xl !font-medium">
                      WebToolsEasy
                    </Typography>
                  </Link>
                  <Link href="/" passHref>
                    <CustomSvgIcon size="large">
                      <HomeIcon />
                    </CustomSvgIcon>
                  </Link>
                </div>
              </ResponsiveAppBar>
              <div className="flex flex-col md:flex-row gap-2 p-2 w-full h-full flex-grow overflow-y-auto">
                <SidePanel
                  className="hidden w-[20%] md:flex"
                  appConfigJson={appConfigJson as AppListConfig}
                />
                <div className="w-full md:w-[70%]">{children}</div>
                <BaseToolsAds className="w-full md:w-[20%]" />
              </div>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
