import { AppHeading } from "@/components/commonComponents";
import { apps } from "@/data/apps";
import { AppCategory, AppNavigationConfig } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import { groupBy, map, values } from "lodash-es";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import { AppBox, AppChip, AppText } from "@/components/lib/ui";
import Link from "next/link";
import {
  StructuredData,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateFAQPageSchema,
} from "@/components/structuredData";
import { HomeDiscoveryFilter } from "@/components/HomeDiscoveryFilter";
import { RecentlyUsedTools } from "@/components/RecentlyUsedTools";

const pageTitle =
  "WebToolsEasy — Free Online Tools & High-Performance WebRTC Media Suites (100% Private)";
const pageDescription =
  "115+ free browser tools and high-performance WebRTC suites. Unlimited P2P file transfers, wireless phone camera to OBS Studio, lossless video cutter, PDF editor, JSON formatter & more. 100% private in-browser execution with zero cloud storage.";
const keywords =
  "p2p file transfer, obs camera source, wireless webcam, lossless video cutter, free online tools, client-side tools, private browser utilities, json formatter, pdf merge, image compressor, webtoolseasy";

const ENABLE_POPULAR_TOOLS = true;

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}`,
  },
  title: pageTitle,
  description: pageDescription,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
  metadataBase: new URL(process.env.HOSTNAME || "https://webtoolseasy.com"),
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}`,
    images: [
      {
        url: `${process.env.SCREENSHOTS_BASE_URL}/home.png`,
        secureUrl: `${process.env.SCREENSHOTS_BASE_URL}/home.png`,
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
    images: [`${process.env.SCREENSHOTS_BASE_URL}/home.png`],
  },
  keywords,
};

function FlagshipShowcase() {
  return (
    <section className="w-full space-y-4 my-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-slate-800 pb-3">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Featured Flagship Suites
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            High-Performance WebRTC &amp; In-Browser Media Engines
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
          Zero cloud storage, no account registration, hardware-accelerated speeds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* SUITE 1: DROPSTREAM */}
        <div className="group relative rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-slate-900 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-3xl p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800">
                📦
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                WebRTC DataChannel
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                DropStream P2P Transfer
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Send unlimited files, entire directories, and confidential notes directly between devices. Zero cloud uploads, no file size caps, and end-to-end encryption.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-100/60 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                ⚡ Unlimited File Size
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-100/60 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                📁 Folder Structure
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-100/60 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                🔒 E2E Encrypted
              </span>
            </div>
          </div>
          <div className="pt-5">
            <Link
              href="/drop"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition active:scale-98"
            >
              Launch DropStream &rarr;
            </Link>
          </div>
        </div>

        {/* SUITE 2: BEAMSUITE */}
        <div className="group relative rounded-2xl border border-red-200 dark:border-red-900/60 bg-gradient-to-b from-red-50/50 to-white dark:from-red-950/20 dark:to-slate-900 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-red-400 dark:hover:border-red-700 transition-all duration-300 hover:-translate-y-1">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-3xl p-2.5 rounded-xl bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800">
                📡
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                Sub-100ms Latency
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                BeamSuite Wireless Camera &amp; Screen
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Turn your smartphone into a wireless 1080p camera or screen source for OBS Studio. Live ON-AIR tally lights, camera flipping, torch control, and zero driver setup.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/50">
                🎥 OBS Browser Source
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/50">
                🔴 Live Tally Light
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/50">
                📲 QR Code Sync
              </span>
            </div>
          </div>
          <div className="pt-5">
            <Link
              href="/beam"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm transition active:scale-98"
            >
              Launch BeamSuite &rarr;
            </Link>
          </div>
        </div>

        {/* SUITE 3: LOCALSTUDIO */}
        <div className="group relative rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-gradient-to-b from-violet-50/50 to-white dark:from-violet-950/20 dark:to-slate-900 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-violet-400 dark:hover:border-violet-700 transition-all duration-300 hover:-translate-y-1">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-3xl p-2.5 rounded-xl bg-violet-100 dark:bg-violet-900/40 border border-violet-200 dark:border-violet-800">
                🎬
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
                Zero Re-Encoding
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition">
                LocalStudio Media Tools
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Cut and trim video clips with 0.1s frame precision, or extract uncompressed 16-bit PCM WAV audio from video files directly inside your browser. No watermarks.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-violet-100/60 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50">
                ✂️ Lossless Trimming
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-violet-100/60 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50">
                🎙️ Audio to WAV
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-violet-100/60 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50">
                🚫 Zero Watermarks
              </span>
            </div>
          </div>
          <div className="pt-5">
            <Link
              href="/studio"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-sm transition active:scale-98"
            >
              Launch LocalStudio &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonMatrix() {
  return (
    <section className="w-full my-6 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Why Choose In-Browser &amp; Direct P2P?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          See how WebToolsEasy compares to traditional cloud tools that upload your private data to remote servers.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <th className="py-3 px-3 font-semibold">Feature / Metric</th>
              <th className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-t-lg">
                WebToolsEasy (P2P / Client)
              </th>
              <th className="py-3 px-3 font-semibold">WeTransfer / AirDrop</th>
              <th className="py-3 px-3 font-semibold">StreamYard / Camo</th>
              <th className="py-3 px-3 font-semibold">CloudConvert / 123apps</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            <tr>
              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">Server Data Storage</td>
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                0 Days (Never touches cloud)
              </td>
              <td className="py-3 px-3 text-slate-500">Stored 7–30 days on servers</td>
              <td className="py-3 px-3 text-slate-500">Relayed via cloud servers</td>
              <td className="py-3 px-3 text-slate-500">Uploaded to remote disk</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">Transfer / File Size Limit</td>
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                Unlimited (Multi-GB P2P)
              </td>
              <td className="py-3 px-3 text-slate-500">Capped at 2GB on free tier</td>
              <td className="py-3 px-3 text-slate-500">Limited resolution &amp; time</td>
              <td className="py-3 px-3 text-slate-500">Capped at 500MB – 1GB</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">Processing Latency</td>
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                Instant (0s upload wait)
              </td>
              <td className="py-3 px-3 text-slate-500">Full upload + download wait</td>
              <td className="py-3 px-3 text-slate-500">300ms–800ms cloud lag</td>
              <td className="py-3 px-3 text-slate-500">Queued cloud re-encoding</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">Watermarks &amp; Paywalls</td>
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                Zero Watermarks, 100% Free
              </td>
              <td className="py-3 px-3 text-slate-500">Paid tiers up to $12/mo</td>
              <td className="py-3 px-3 text-slate-500">Forced watermarks / $25/mo</td>
              <td className="py-3 px-3 text-slate-500">Daily file conversion limits</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">Encryption &amp; Privacy</td>
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                DTLS/SRTP Peer-to-Peer
              </td>
              <td className="py-3 px-3 text-slate-500">Decrypted on cloud server</td>
              <td className="py-3 px-3 text-slate-500">Decrypted for cloud mixing</td>
              <td className="py-3 px-3 text-slate-500">Decrypted for processing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PopularToolsSection({
  allApps,
  isMobile = false,
}: Readonly<{
  allApps: AppNavigationConfig[];
  isMobile?: boolean;
}>) {
  const topAppIds = [
    "dropstream",
    "beamsuite",
    "localstudio",
    "jsonformatter",
    "base64encode",
    "pdfmerge",
  ];
  const featuredTools = topAppIds
    .map((id) => allApps.find((app) => app.applicationId === id))
    .filter((app): app is AppNavigationConfig => !!app)
    .slice(0, isMobile ? 4 : 6);

  return (
    <div id="popular-tools-wrapper" className="w-full">
      <section
        className={`${
          isMobile ? "p-4" : "p-6"
        } bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200 dark:border-purple-800/40`}
        aria-labelledby="popular-tools-heading"
      >
        <header
          className={`flex items-center ${
            isMobile ? "gap-2 mb-4 flex-wrap" : "gap-3 mb-4"
          }`}
        >
          <AppText
            id="popular-tools-heading"
            variant={isMobile ? "h6" : "h5"}
            className="!font-semibold !text-purple-800 dark:!text-purple-300"
          >
            🌟 Trending &amp; Popular Tools
          </AppText>
          <AppChip
            label="Most used"
            color="secondary"
            variant="outlined"
            size="small"
          />
        </header>
        <div
          className={`grid ${
            isMobile ? "grid-cols-1 gap-3" : "grid-cols-1 md:grid-cols-3 gap-4"
          }`}
        >
          {featuredTools.map((config) => (
            <div key={config.applicationId} className="w-full">
              <AppHomeCard
                config={config}
                isPriority={true}
                className={`w-full h-full ${
                  isMobile ? "p-3" : "p-4"
                } hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-purple-200 bg-white dark:border-purple-700 dark:bg-slate-900`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionAppList({
  category,
  configs,
  showCategoryTitle = true,
  isPriority = false,
}: Readonly<{
  category: string;
  configs: AppNavigationConfig[];
  showCategoryTitle?: boolean;
  isPriority?: boolean;
}>) {
  const emptyColumns = 4 - (configs.length % 4);

  return (
    <section
      className="flex flex-col gap-4 w-full tool-category-section"
      data-category-section={category}
      style={
        !isPriority
          ? {
              contentVisibility: "auto",
              containIntrinsicSize: "0 400px",
            }
          : undefined
      }
    >
      {showCategoryTitle && (
        <header className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-slate-700">
          <AppText
            variant="h2"
            className="!text-xl md:!text-2xl !font-medium !text-gray-800 dark:!text-slate-100"
          >
            {category}
          </AppText>
          <AppChip
            label={`${configs.length} tools`}
            size="small"
            variant="outlined"
            color="primary"
          />
        </header>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {map(configs, (config) => (
          <article
            key={config.applicationId}
            className="w-full tool-card-item"
            data-tool-id={config.applicationId}
            data-tool-name={config.displayText.toLowerCase()}
            data-tool-category={(config.category || "").toLowerCase()}
          >
            <AppHomeCard
              config={config}
              className="w-full h-full p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700 dark:bg-slate-900"
            />
          </article>
        ))}
        {emptyColumns < 4 &&
          map(new Array(emptyColumns), (_, idx) => (
            <div key={`empty-${idx}`} className="w-full hidden lg:block" />
          ))}
      </div>
    </section>
  );
}

export default function Home() {
  const EXCLUDED_REDIRECTED = new Set([
    "tools/text-compare",
    "tools/html-to-markdown",
    "tools/mortgage-calculator",
    "tools/text-editor",
  ]);
  const allApps = values(apps).filter(
    (app) => !EXCLUDED_REDIRECTED.has(app.navigateUrl)
  );
  const categoryWiseAppList = groupBy(allApps, "category");
  delete categoryWiseAppList["undefined"];

  const allCategories = [
    ...new Set(
      allApps
        .map((app) => app.category)
        .filter((category) => category && category.trim()),
    ),
  ].sort();

  const CATEGORY_PRIORITY: AppCategory[] = [
    AppCategory.MEDIA,
    AppCategory.PROGRAMMING,
    AppCategory.TEXT,
    AppCategory.ONLINE_EDITORS,
    AppCategory.SEO,
    AppCategory.MISCELLANEOUS,
    AppCategory.FINANCE,
  ];

  const sortedCategories = (Object.keys(categoryWiseAppList) as AppCategory[]).sort(
    (a, b) => {
      const idxA = CATEGORY_PRIORITY.indexOf(a);
      const idxB = CATEGORY_PRIORITY.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    },
  );

  const quickCategories = CATEGORY_PRIORITY.filter((c) =>
    allCategories.includes(c),
  ).slice(0, 4);

  // Generate structured data for home page
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFAQPageSchema({
    faqs: [
      {
        question: "What is WebToolsEasy?",
        answer:
          "WebToolsEasy is a suite of 115+ free online tools and high-performance WebRTC suites including DropStream (unlimited P2P file transfer), BeamSuite (wireless phone camera to OBS Studio), LocalStudio (lossless video cutter), JSON formatter, PDF editor, image compressor, and code formatters. All processing runs 100% in your browser or directly between devices with zero cloud uploads.",
      },
      {
        question: "How does DropStream P2P file transfer work without file size limits?",
        answer:
          "DropStream uses direct WebRTC DataChannels with adaptive backpressure to stream files directly between two web browsers. Because files flow directly from peer to peer without ever uploading to a cloud server, there are no artificial file size caps, no server storage costs, and maximum privacy.",
      },
      {
        question: "How does BeamSuite turn a phone camera into an OBS source with sub-100ms latency?",
        answer:
          "BeamSuite creates a direct peer-to-peer WebRTC MediaStream between your mobile phone browser and the OBS Studio browser source. Using hardware H.264/VP8 video encoding and STUN signaling, latency is typically under 100ms with real-time tally light feedback.",
      },
      {
        question: "How does LocalStudio cut videos without losing quality?",
        answer:
          "LocalStudio processes video files locally in your browser memory using the HTML5 MediaStream and Web Audio APIs. It slices video frames and extracts audio tracks directly on your device hardware without slow cloud uploads or watermark degradation.",
      },
      {
        question: "Are these tools completely free and private?",
        answer:
          "Yes. All 115+ tools and WebRTC suites on WebToolsEasy are 100% free with no signups, no watermarks, and no cloud file retention. Your confidential data never leaves your device.",
      },
      {
        question: "Do these tools work offline?",
        answer:
          "Yes. Once loaded, client-side tools like the JSON formatter, diff checker, base64 encoder, image compressor, and LocalStudio work completely offline without an active internet connection.",
      },
    ],
  });

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={faqSchema} />

      <div className="w-full py-2 md:py-4">
        <div className="flex flex-col gap-4 items-center w-full">
          <AppHeading heading="Free Online Tools &amp; WebRTC Media Suites — 100% Private, Zero Cloud Uploads" />

          <section className="app-shell-section w-full">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <AppText className="!text-base !text-[var(--mui-palette-text-secondary)]">
                  115+ free browser tools for creators, developers, designers, and everyday
                  tasks. Stream unlimited P2P files, beam wireless phone cameras to OBS Studio,
                  trim video losslessly, format JSON, compress images, and edit PDFs — everything runs
                  locally on your device.
                </AppText>
              </div>
              <SocialShareButtons
                pageUrl={`${process.env.HOSTNAME || "https://webtoolseasy.com"}`}
                heading={pageTitle}
              />
            </div>
          </section>

          {/* FLAGSHIP SUITES SHOWCASE */}
          <FlagshipShowcase />

          {/* PRIVACY & COMPARISON MATRIX */}
          <ComparisonMatrix />

          {/* SEARCH & FILTERS */}
          <HomeDiscoveryFilter
            categories={allCategories}
            totalTools={allApps.length}
          />

          <nav
            className="grid grid-cols-2 gap-4 w-full mb-2 md:grid-cols-4"
            aria-label="Quick category access"
          >
            {quickCategories.map((category) => {
              const categoryCount = allApps.filter(
                (app) => app.category === category,
              ).length;
              return (
                <Link
                  key={`quick-${category}`}
                  href={`/?category=${encodeURIComponent(category)}`}
                  prefetch={false}
                  className="no-underline"
                >
                  <AppBox className="app-shell-section !p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
                    <AppText
                      variant="h6"
                      className="!font-bold !text-[var(--mui-palette-primary-main)]"
                    >
                      {categoryCount}
                    </AppText>
                    <AppText
                      variant="body2"
                      color="textSecondary"
                      className="truncate"
                    >
                      {category}
                    </AppText>
                  </AppBox>
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-8 w-full mt-2">
            <RecentlyUsedTools />
            {ENABLE_POPULAR_TOOLS && <PopularToolsSection allApps={allApps} />}

            {sortedCategories.map((category, index) => {
              const configs = categoryWiseAppList[category] || [];
              if (configs.length === 0) return null;
              return (
                <SectionAppList
                  key={`section-${category}`}
                  category={category}
                  configs={configs}
                  showCategoryTitle={true}
                  isPriority={index === 0}
                />
              );
            })}
          </div>

          <div
            id="no-tools-found"
            style={{ display: "none" }}
            className="app-shell-section w-full text-center py-10"
          >
            <AppText variant="h6" color="textSecondary" className="mb-4">
              🔍 No tools found matching your criteria
            </AppText>
            <AppText variant="body2" color="textSecondary" className="mb-4">
              Try adjusting your search or clearing filters.
            </AppText>
            <Link href="/" className="no-underline">
              <AppChip
                label="Clear all filters"
                color="primary"
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* SEO Content Section — visible to search engines and users */}
          <section className="w-full px-4 py-8 mt-2 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/60 dark:to-slate-900/30 rounded-xl border border-gray-100 dark:border-slate-800">
            <div className="max-w-4xl mx-auto space-y-6">
              <AppText
                variant="h2"
                className="!text-2xl md:!text-3xl !font-semibold !text-gray-800 dark:!text-slate-100 !mb-4"
              >
                High-Performance WebRTC Media Suites &amp; 115+ Free Online Utilities
              </AppText>

              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !leading-relaxed"
              >
                WebToolsEasy is engineered around a simple, powerful philosophy:{" "}
                <strong>your data belongs on your device</strong>. Unlike traditional online tool portals that require uploading sensitive documents, confidential videos, and database credentials to 3rd-party cloud servers, WebToolsEasy executes all computations directly in your web browser using modern WebRTC, WebAssembly, HTML5 Canvas, and Web Audio APIs.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mt-6 !mb-2"
              >
                Flagship Suite 1: DropStream Unlimited P2P File &amp; Folder Sharing
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !leading-relaxed"
              >
                DropStream breaks the 2GB upload limit imposed by services like WeTransfer and Google Drive. By establishing a direct, end-to-end encrypted WebRTC DataChannel between sender and receiver, files stream at maximum local network and internet bandwidth without intermediate server staging. Complete folder structures, 4K video rushes, and multi-gigabyte ZIP archives transfer friction-free with instant QR code pairing.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mt-6 !mb-2"
              >
                Flagship Suite 2: BeamSuite Wireless Phone Camera &amp; Screen to OBS Studio
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !leading-relaxed"
              >
                Streamers, podcasters, and content creators can turn any iOS or Android phone into a studio-grade 1080p webcam for OBS Studio without buying expensive capture cards or installing third-party apps. With sub-100ms ultra-low latency, hardware torch controls, lens switching, and automatic live tally lights, BeamSuite delivers professional multi-cam capabilities straight into your broadcast workflow.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mt-6 !mb-2"
              >
                Flagship Suite 3: LocalStudio Lossless Video Cutter &amp; Audio Extraction
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !leading-relaxed"
              >
                Trim video recordings with 0.1-second accuracy and export uncompressed 16-bit PCM WAV audio tracks directly in your browser. Because processing is performed entirely in client-side memory using browser codecs, there is zero compression loss, zero watermark branding, and zero server upload queue.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mt-6 !mb-2"
              >
                Comprehensive Developer &amp; Document Toolkit
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !leading-relaxed"
              >
                Alongside our flagship media suites, WebToolsEasy offers 110+ offline developer utilities including JSON formatters, JavaScript editors, regex testers, Base64 decoders, JWT parsers, SQL beautifiers, PDF merging, and image compressors. All utilities feature syntax highlighting, dark mode support, and keyboard shortcuts (Cmd+K).
              </AppText>

              <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
                <AppText
                  variant="h3"
                  className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mb-3"
                >
                  Key Architectural Advantages
                </AppText>
                <ul className="list-disc pl-6 text-gray-600 dark:text-slate-300 space-y-2">
                  <li>
                    <strong>Zero-Knowledge Architecture:</strong> Files and streams flow peer-to-peer or execute in-memory; our servers never receive, store, or view your content.
                  </li>
                  <li>
                    <strong>No Artificial Size Limits:</strong> Transfer and edit multi-gigabyte media without hitting paywalled file caps.
                  </li>
                  <li>
                    <strong>No Accounts or Subscriptions:</strong> Free forever with no required login, cookies, or credit card forms.
                  </li>
                  <li>
                    <strong>Hardware Accelerated:</strong> Harnesses WebRTC, WebAssembly, and your device GPU for blazing fast performance.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
