import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import { AppText } from "@/components/lib/ui";
import Link from "next/link";
import {
  StructuredData,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateFAQPageSchema,
} from "@/components/structuredData";

const pageTitle =
  "WebToolsEasy — The Private, Zero-Cloud Web Suite (WebRTC & In-Browser Tools)";
const pageDescription =
  "High-performance WebRTC suites and 110+ private browser utilities. Send unlimited files with DropStream P2P, stream phone cameras to OBS Studio with BeamSuite, and cut video losslessly with LocalStudio. 100% client-side with zero cloud storage.";
const keywords =
  "p2p file transfer, obs camera source, wireless webcam, lossless video cutter, free online tools, client-side tools, private browser utilities, json formatter, pdf merge, image compressor, webtoolseasy";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME || "https://webtoolseasy.com"}`,
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
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}`,
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

function HeroSection() {
  return (
    <section className="w-full text-center space-y-6 pt-4 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Zero Cloud Uploads • End-to-End Encrypted • No Account Needed
      </div>

      <div className="space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          The Private, Zero-Cloud{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Web Suite
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
          Stream unlimited multi-gigabyte files between devices, beam your phone camera directly to OBS Studio with sub-100ms latency, collaborate on code in real time, and cut video losslessly — all computed directly inside your browser.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/drop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition active:scale-98"
        >
          <span>📦</span>
          <span>Launch DropStream (P2P Transfer)</span>
        </Link>
        <Link
          href="/codepair"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs transition active:scale-98"
        >
          <span>⚡</span>
          <span>CodePair (P2P Coding)</span>
        </Link>
        <Link
          href="/beam"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs transition active:scale-98"
        >
          <span>📷</span>
          <span>BeamSuite (OBS Camera)</span>
        </Link>
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs transition active:scale-98"
        >
          <span>🎬</span>
          <span>LocalStudio (Media Tools)</span>
        </Link>
      </div>

      {/* Trust & Zero-Cloud Value Pillars */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> 100% Client-Side Processing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> Zero Server Data Storage
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> No Accounts or Passwords
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> Free &amp; Open Source
        </span>
      </div>
    </section>
  );
}

function FlagshipShowcase() {
  return (
    <section className="w-full space-y-4 my-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Flagship WebRTC &amp; Browser-Native Suites
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            High-performance tools powered by peer-to-peer WebRTC, Web Audio, and hardware codecs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* SUITE 1: DROPSTREAM */}
        <div className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-2xl p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
                📦
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
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
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                ⚡ Unlimited File Size
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                📁 Folder Transfer
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                🔒 E2E Encrypted
              </span>
            </div>
          </div>
          <div className="pt-5">
            <Link
              href="/drop"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition active:scale-98"
            >
              Launch DropStream &rarr;
            </Link>
          </div>
        </div>

        {/* SUITE 2: BEAMSUITE */}
        <div className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-2xl p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
                📷
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Sub-100ms Latency
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                BeamSuite Wireless Camera &amp; Screen
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Turn your smartphone into a wireless 1080p camera or screen source for OBS Studio. Live ON-AIR tally lights, camera flipping, torch control, and zero driver setup.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                🎥 OBS Browser Source
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                🔴 Live Tally Light
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                📲 QR Code Sync
              </span>
            </div>
          </div>
          <div className="pt-5">
            <Link
              href="/beam"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition active:scale-98"
            >
              Launch BeamSuite &rarr;
            </Link>
          </div>
        </div>

        {/* SUITE 3: LOCALSTUDIO */}
        <div className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-2xl p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
                🎬
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Zero Re-Encoding
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                LocalStudio Media Tools
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Cut and trim video clips with 0.1s frame precision, or extract uncompressed 16-bit PCM WAV audio from video files directly inside your browser. No watermarks.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                ✂️ Lossless Trimming
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                🎙️ Audio to WAV
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                🚫 Zero Watermarks
              </span>
            </div>
          </div>
          <div className="pt-5">
            <Link
              href="/studio"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition active:scale-98"
            >
              Launch LocalStudio &rarr;
            </Link>
          </div>
        </div>

        {/* SUITE 4: CODEPAIR */}
        <div className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-2xl p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
                ⚡
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                P2P Monaco IDE
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                CodePair Collaborative Editor
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Zero-cloud real-time pair programming. Multi-cursor synchronization, Monaco syntax highlighting for 10+ languages, and live HTML/JS sandbox execution directly browser-to-browser.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                👥 Multi-Cursor Sync
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                👁️ Live Sandbox
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                🔒 Zero Cloud Storage
              </span>
            </div>
          </div>
          <div className="pt-5">
            <Link
              href="/codepair"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition active:scale-98"
            >
              Launch CodePair &rarr;
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

      {/* Directory Hub Callout Banner */}
      <div className="mt-8 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Need offline developer or document utilities?
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Explore our complete directory of 110+ offline client-side converters, formatters, and generators.
          </p>
        </div>
        <Link
          href="/tools"
          className="py-2 px-4 rounded-lg bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white text-xs font-medium transition whitespace-nowrap active:scale-98"
        >
          Explore All Tools &rarr;
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFAQPageSchema({
    faqs: [
      {
        question: "What is WebToolsEasy?",
        answer:
          "WebToolsEasy is a high-performance, privacy-first web suite powered by WebRTC and in-browser APIs. It features DropStream (unlimited P2P file & folder transfer), BeamSuite (wireless phone camera & screen to OBS Studio), LocalStudio (lossless video cutter & WAV audio extractor), alongside 110+ client-side developer and media utilities.",
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
          "Yes. All tools and WebRTC suites on WebToolsEasy are 100% free with no signups, no watermarks, and no cloud file retention. Your confidential data never leaves your device.",
      },
      {
        question: "Where can I find the classic developer utilities?",
        answer:
          "All 110+ developer and productivity utilities (JSON formatter, PDF merge, Base64 encoder, image compressor, regex tester, etc.) are available in our complete directory at webtoolseasy.com/tools or instantly via the ⌘K command palette.",
      },
    ],
  });

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={faqSchema} />

      <div className="w-full py-2 md:py-4">
        <div className="flex flex-col gap-6 items-center w-full">
          {/* Social Share Bar */}
          <div className="w-full flex justify-end">
            <SocialShareButtons
              pageUrl={`${process.env.HOSTNAME || "https://webtoolseasy.com"}`}
              heading={pageTitle}
            />
          </div>

          {/* HERO SECTION */}
          <HeroSection />

          {/* FLAGSHIP SHOWCASE (DropStream, BeamSuite, CodePair, LocalStudio) */}
          <FlagshipShowcase />

          {/* COMPARISON MATRIX (WebToolsEasy vs Cloud Services) */}
          <ComparisonMatrix />

          {/* SEO CONTENT SECTION */}
          <section className="w-full px-5 py-8 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/60 dark:to-slate-900/30 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="max-w-4xl mx-auto space-y-6">
              <AppText
                variant="h2"
                className="!text-2xl md:!text-3xl !font-semibold !text-gray-800 dark:!text-slate-100 !mb-4"
              >
                High-Performance WebRTC Media Suites &amp; Zero-Cloud Web Applications
              </AppText>

              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !leading-relaxed"
              >
                WebToolsEasy is engineered around a simple, powerful philosophy:{" "}
                <strong>your data belongs on your device</strong>. Unlike traditional online tool portals that require uploading sensitive documents, confidential videos, proprietary code, and database credentials to 3rd-party cloud servers, WebToolsEasy executes all computations directly in your web browser using modern WebRTC, WebAssembly, HTML5 Canvas, and Web Audio APIs.
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
                Flagship Suite 3: CodePair Real-Time Collaborative Monaco IDE
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !leading-relaxed"
              >
                Pair program with peers across the globe in a zero-cloud collaborative IDE powered by Microsoft Monaco Editor. Featuring multi-cursor synchronization directly over WebRTC DataChannels, support for 10+ languages (TypeScript, Python, HTML/CSS, Rust, Go, SQL), an interactive execution runner, and live sandboxed DOM preview. Zero cloud code storage guarantees your proprietary source code never leaves your peer connection.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mt-6 !mb-2"
              >
                Flagship Suite 4: LocalStudio Lossless Video Cutter &amp; Audio Extraction
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !leading-relaxed"
              >
                Trim video recordings with 0.1-second accuracy and export uncompressed 16-bit PCM WAV audio tracks directly in your browser. Because processing is performed entirely in client-side memory using browser codecs, there is zero compression loss, zero watermark branding, and zero server upload queue.
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
