import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/ip-address-lookup";
const pageTitle = "IP Address Lookup - Find My IP Address & Location";
const pageDescription =
  "Find your IP address instantly. Free IP lookup tool shows your public IP, location, ISP, and network details. Check IP address online now.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/ip-address-lookup.png`;

const keywords =
  "ip address lookup,what is my ip,find my ip,ip location,ip address finder,check ip address,my ip address,public ip lookup";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favion_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
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
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "IP Address Lookup: Find Your IP Address and Location Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [],
  structuredData: createToolStructuredData({
    pageUrl: "ip-address-lookup",
    pageTitle,
    mainHeading: "IP Address Lookup: Find Your IP Address and Location Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an IP Address?",
    blockData: [
      "An IP (Internet Protocol) address is a unique numerical identifier assigned to every device connected to the internet. Our IP address lookup tool instantly displays your public IP address and related network information.",
      "Your IP address reveals information about your internet connection, including your approximate location, Internet Service Provider (ISP), and network details. Use our free tool to check your IP address instantly.",
    ],
  },
  {
    heading: "How to Use the IP Address Lookup Tool",
    blockData: [
      "Simply visit this page and your IP address information will be automatically detected and displayed. No manual input required - the tool instantly shows your public IP address.",
      "View detailed information including your IPv4 or IPv6 address, country, city, ISP name, and connection type. Copy your IP address to clipboard with one click.",
    ],
  },
  {
    heading: "Why Check Your IP Address?",
    blockData: [
      "Knowing your IP address is essential for network troubleshooting, setting up remote connections, configuring routers, and understanding your online presence. Website administrators use IP addresses for security and access control.",
      "Check if you're using a VPN or proxy by comparing your detected location with your actual location. Verify your network configuration and ensure your internet connection is working correctly.",
    ],
  },
  {
    heading: "IPv4 vs IPv6 Addresses",
    blockData: [
      "IPv4 addresses use a 32-bit format (e.g., 192.168.1.1) with about 4.3 billion possible addresses. IPv6 uses a 128-bit format, providing virtually unlimited addresses for the growing number of internet devices.",
      "Our tool detects both IPv4 and IPv6 addresses automatically. Most home users have IPv4 addresses, while newer networks may provide both IPv4 and IPv6 connectivity.",
    ],
  },
  {
    heading: "IP Address Privacy and Security",
    blockData: [
      "Your IP address can reveal your approximate geographic location but not your exact physical address. Use VPN services to mask your IP address for enhanced privacy when browsing the internet.",
      "Websites and online services log IP addresses for security, analytics, and fraud prevention. Understanding your IP address helps you make informed decisions about your online privacy.",
    ],
  },
];
