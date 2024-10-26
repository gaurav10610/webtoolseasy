import type { Metadata } from "next";
import "./globals.css";
import { robotoFont } from "@/design";
import { theme } from "@/theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { FlexList } from "@/components/lib/flexComponents";
import { ResponsiveAppBar } from "@/components/lib/appBar";
import { getRandomId } from "@/util/commonUtils";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ApplicationIcon from "@/data/icons/app-icon.svg";
import { CustomSvgIcon } from "@/components/lib/icons";
import HomeIcon from "@/data/icons/home.svg";

export const metadata: Metadata = {
  title: "Online Web Tools: Browse Free Tools to Boost Productivity",
  description:
    "WebToolsEasy features multiple free online web tools. Find the perfect tool for your needs, whether you're looking for a way to edit photos, or record a screen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topAppBarItems = [
    <Link href="/" key={getRandomId()}>
      <CustomSvgIcon size="large">
        <ApplicationIcon />
      </CustomSvgIcon>
    </Link>,
    <Link href="/" passHref key={getRandomId()}>
      <Typography variant="h6" color="inherit">
        WebToolsEasy
      </Typography>
    </Link>,
    <div
      key={getRandomId()}
      className="row-display full-width"
      style={{
        justifyContent: "flex-end",
      }}
    >
      <Link href="/" passHref>
        <CustomSvgIcon size="large">
          <HomeIcon />
        </CustomSvgIcon>
      </Link>
    </div>,
  ];

  return (
    <html lang="en">
      <body className={robotoFont.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <div className="main-container no-vr-scroll">
              <ResponsiveAppBar>
                <FlexList
                  items={topAppBarItems}
                  isDirectionRow={true}
                  isFullWidth={true}
                ></FlexList>
              </ResponsiveAppBar>
              <div
                className="base-container full-width flex-full-height"
                style={{
                  overflowY: "auto",
                }}
              >
                {children}
              </div>
              {/* <ResponsiveAppBar position="relative" /> */}
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
