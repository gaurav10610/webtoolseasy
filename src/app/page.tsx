import { Metadata } from "next";
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
  "High-performance zero-cloud WebRTC suites. Send unlimited files with DropStream P2P, stream phone cameras to OBS Studio with BeamSuite, collaborate in real time with CodePair IDE & in-browser compilers, and edit media losslessly with LocalStudio. 100% client-side with zero cloud storage.";
const keywords =
  "p2p file transfer, obs camera source, wireless webcam, pair programming ide, in-browser compiler, pyodide python, sqlite wasm, collaborative code editor, lossless video cutter, free online tools, client-side tools, private browser utilities, webtoolseasy";

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
    <section className="w-full text-center space-y-6 pt-6 pb-12">
      {/* Zero-Cloud Trust Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Zero Cloud Storage • End-to-End Encrypted • No Account Needed
      </div>

      {/* Main Headline */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          The Private, Zero-Cloud{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Web Suite
          </span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
          High-performance browser-native suites. Transfer unlimited files peer-to-peer, bridge phone cameras directly to OBS Studio, pair program with in-browser compilers, and edit media losslessly — 100% client-side with zero cloud storage.
        </p>
      </div>

      {/* Focused Primary & Secondary Action CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
        <a
          href="#suites"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all active:scale-98"
        >
          <span>Explore Flagship Suites</span>
          <span>↓</span>
        </a>
        <Link
          href="/codepair"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700 shadow-sm transition-all active:scale-98"
        >
          <span>⚡ Launch CodePair IDE</span>
        </Link>
      </div>

      {/* Value Pillars */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> 0MB Cloud Storage
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> Direct P2P WebRTC
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> 20 In-Browser Compilers
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> 100% Free &amp; Private
        </span>
      </div>
    </section>
  );
}

function FlagshipShowcase() {
  return (
    <section id="suites" className="w-full space-y-6 my-8 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Flagship WebRTC &amp; Browser-Native Suites
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Enterprise tools engineered with peer-to-peer WebRTC, WebAssembly compilers, and hardware media codecs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* SUITE 1: DROPSTREAM */}
        <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
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
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Send unlimited files, entire directories, and encrypted notes directly between browsers. Zero cloud uploads, no file size caps, and DTLS end-to-end encryption.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                ⚡ Unlimited Size
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                📁 Folder Support
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                🔒 E2E Encrypted
              </span>
            </div>
          </div>
          <div className="pt-6">
            <Link
              href="/drop"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition active:scale-98"
            >
              Launch DropStream &rarr;
            </Link>
          </div>
        </div>

        {/* SUITE 2: BEAMSUITE */}
        <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
                📷
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Sub-100ms Latency
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                BeamSuite Wireless Camera
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
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
                📲 QR Code Pairing
              </span>
            </div>
          </div>
          <div className="pt-6">
            <Link
              href="/beam"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition active:scale-98"
            >
              Launch BeamSuite &rarr;
            </Link>
          </div>
        </div>

        {/* SUITE 3: CODEPAIR */}
        <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
                ⚡
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                20 Compilers &amp; WASM
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                CodePair Collaborative IDE
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Zero-cloud real-time pair programming with Monaco editor. In-browser compilers & runtimes for 20 languages including Python 3 (Pyodide), Ruby 3.3 WASM, SQLite WASM, TypeScript, C/C++, Rust, Go, Java, and Bash.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                ⚡ 20 In-Browser Compilers
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                💎 Ruby & Python WASM
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                👥 Multi-Cursor Sync
              </span>
            </div>
          </div>
          <div className="pt-6">
            <Link
              href="/codepair"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition active:scale-98"
            >
              Launch CodePair &rarr;
            </Link>
          </div>
        </div>

        {/* SUITE 4: LOCALSTUDIO */}
        <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
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
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Cut and trim video clips with 0.1s frame precision, or extract uncompressed 16-bit PCM WAV audio from video files directly inside your browser memory. No watermarks.
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
          <div className="pt-6">
            <Link
              href="/studio"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition active:scale-98"
            >
              Launch LocalStudio &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureMatrix() {
  const pillars = [
    {
      icon: "🌐",
      title: "Zero-Knowledge P2P Mesh",
      subtitle: "WebRTC DataChannel & STUN",
      desc: "Files and streams transfer directly between browsers over encrypted channels. Our signaling servers merely coordinate the initial handshake and never touch your payload.",
    },
    {
      icon: "⚙️",
      title: "Client-Side WASM Compilers",
      subtitle: "Pyodide, SQLite, Fengari",
      desc: "Code executes natively in WebAssembly sandboxes inside your browser. From Python 3 algorithms to SQL relational databases, compilation happens with zero server latency.",
    },
    {
      icon: "⚡",
      title: "Hardware Accelerated Codecs",
      subtitle: "H.264 / VP8 GPU Pipelines",
      desc: "BeamSuite harnesses native device hardware encoders to beam 1080p camera feeds into OBS Studio with sub-100ms ultra-low latency.",
    },
    {
      icon: "💾",
      title: "Dual-Layer Local Persistence",
      subtitle: "SessionStorage & LocalStorage",
      desc: "Rooms, drafts, and connection contexts survive accidental page refreshes without storing confidential data on remote database servers.",
    },
  ];

  return (
    <section className="w-full my-10 space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Enterprise Zero-Cloud Architecture
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          How WebToolsEasy achieves microsecond execution, unlimited transfers, and total privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-xs"
          >
            <div className="text-2xl">{p.icon}</div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {p.title}
              </h3>
              <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                {p.subtitle}
              </p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparisonMatrix() {
  return (
    <section className="w-full my-8 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Why Choose In-Browser &amp; Direct P2P?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          See how WebToolsEasy compares to traditional cloud tools that upload your private data to remote servers.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <th className="py-3 px-3 font-semibold">Feature / Metric</th>
              <th className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-t-lg">
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
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30">
                0 Days (Never touches cloud)
              </td>
              <td className="py-3 px-3 text-slate-500">Stored 7–30 days on servers</td>
              <td className="py-3 px-3 text-slate-500">Relayed via cloud servers</td>
              <td className="py-3 px-3 text-slate-500">Uploaded to remote disk</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">Transfer / File Size Limit</td>
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30">
                Unlimited (Multi-GB P2P)
              </td>
              <td className="py-3 px-3 text-slate-500">Capped at 2GB on free tier</td>
              <td className="py-3 px-3 text-slate-500">Limited resolution &amp; time</td>
              <td className="py-3 px-3 text-slate-500">Capped at 500MB – 1GB</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">Processing Latency</td>
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30">
                Instant (0s upload wait)
              </td>
              <td className="py-3 px-3 text-slate-500">Full upload + download wait</td>
              <td className="py-3 px-3 text-slate-500">300ms–800ms cloud lag</td>
              <td className="py-3 px-3 text-slate-500">Queued cloud re-encoding</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">Watermarks &amp; Paywalls</td>
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30">
                Zero Watermarks, 100% Free
              </td>
              <td className="py-3 px-3 text-slate-500">Paid tiers up to $12/mo</td>
              <td className="py-3 px-3 text-slate-500">Forced watermarks / $25/mo</td>
              <td className="py-3 px-3 text-slate-500">Daily file conversion limits</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">Encryption &amp; Wire Privacy</td>
              <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30">
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

function TechnicalFAQ() {
  const faqs = [
    {
      q: "What is WebToolsEasy?",
      a: "WebToolsEasy is an enterprise-grade, privacy-first web suite powered by WebRTC and in-browser APIs. It features DropStream (unlimited P2P file & folder transfer), BeamSuite (wireless phone camera to OBS Studio), CodePair (real-time collaborative Monaco IDE with in-browser compilers), and LocalStudio (lossless video cutter & WAV audio extractor).",
    },
    {
      q: "How does DropStream P2P file transfer work without file size limits?",
      a: "DropStream uses direct WebRTC DataChannels with adaptive backpressure to stream files directly between two web browsers. Because files flow directly from peer to peer without ever uploading to a cloud server, there are no artificial file size caps, no server storage costs, and maximum privacy.",
    },
    {
      q: "How does BeamSuite turn a phone camera into an OBS source with sub-100ms latency?",
      a: "BeamSuite creates a direct peer-to-peer WebRTC MediaStream between your mobile phone browser and the OBS Studio browser source. Using hardware H.264/VP8 video encoding and STUN signaling, latency is typically under 100ms with real-time tally light feedback.",
    },
    {
      q: "How does CodePair compile code inside the browser without a remote server?",
      a: "CodePair leverages WebAssembly and modern browser engines: Python 3 runs via Pyodide WebAssembly, Ruby runs via Ruby 3.3 WASM (ruby.wasm), SQL executes via SQLite 3 WebAssembly (sql.js), Lua runs via Fengari WebAssembly, PHP executes via Uniter in-browser engine, and C/C++, Rust, Go, Java, C#, Kotlin, and Swift execute via zero-cloud sandboxed engines. Multi-cursor positions and code deltas sync peer-to-peer over WebRTC.",
    },
    {
      q: "How does LocalStudio cut videos without losing quality?",
      a: "LocalStudio processes video files locally in your browser memory using the HTML5 MediaStream and Web Audio APIs. It slices video frames and extracts audio tracks directly on your device hardware without slow cloud uploads or watermark degradation.",
    },
    {
      q: "Are these tools completely free and private?",
      a: "Yes. All tools and WebRTC suites on WebToolsEasy are 100% free with no signups, no watermarks, and no cloud file retention. Your confidential data never leaves your device.",
    },
  ];

  return (
    <section className="w-full my-10 space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Technical specifications and architecture details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-2xs"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {f.q}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {f.a}
            </p>
          </div>
        ))}
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
          "WebToolsEasy is an enterprise-grade, privacy-first web suite powered by WebRTC and in-browser APIs. It features DropStream (unlimited P2P file & folder transfer), BeamSuite (wireless phone camera & screen to OBS Studio), CodePair (real-time collaborative Monaco IDE with in-browser compilers), and LocalStudio (lossless video cutter & WAV audio extractor).",
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
        question: "How does CodePair synchronize code and cursors without a cloud backend?",
        answer:
          "CodePair connects developers directly via an encrypted WebRTC DataChannel. Monaco editor text deltas, multi-cursor positions, selections, and language changes are synchronized peer-to-peer with microsecond latency. Code runs locally in the browser with zero cloud storage.",
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
    ],
  });

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={faqSchema} />

      <div className="w-full flex flex-col items-center">
        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* 2. FLAGSHIP SHOWCASE */}
        <FlagshipShowcase />

        {/* 3. ARCHITECTURE & SPECIFICATIONS */}
        <ArchitectureMatrix />

        {/* 4. COMPARISON MATRIX */}
        <ComparisonMatrix />

        {/* 5. TECHNICAL FAQ */}
        <TechnicalFAQ />
      </div>
    </>
  );
}
