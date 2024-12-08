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
import { GoogleAnalytics } from "@next/third-parties/google";

const pageTitle = "Online Web Tools: Browse Free Tools to Boost Productivity";
const pageDescription =
  "WebToolsEasy features multiple free online web tools. Find the perfect tool for your needs, whether you're looking for a way to edit photos, or record a screen.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  icons: "/favicon.png",
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}`,
    images: [
      {
        url: `${process.env.SCREENSHOTS_BASE_URL}/tools-directory.png`,
        secureUrl: `${process.env.SCREENSHOTS_BASE_URL}/tools-directory.png`,
        alt: pageTitle,
      },
    ],
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: [`${process.env.SCREENSHOTS_BASE_URL}/tools-directory.png`],
  },
  keywords:
    "web tools, online tools, web development, web design, HTML tools, CSS tools, JavaScript tools, SEO tools, image compression, code formatter, JSON formatter, URL encoder, URL decoder, base64 encoder, base64 decoder, text editor, color picker, regex tester, lorem ipsum generator, password generator, hash generator, QR code generator, web utilities",
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
      <Typography
        color="inherit"
        sx={{
          fontSize: "1.3rem",
        }}
      >
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
            {process.env.NODE_ENV === "production" && (
              <GoogleAnalytics gaId={process.env.GA_CODE!} />
            )}
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
