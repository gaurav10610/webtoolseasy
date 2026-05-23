import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "WebToolsEasy | 20+ Free Developer Workbenches & Mock APIs",
  description:
    "The ultimate free hub for frontend developers. Access 20+ locally-sandboxed workbenches including JSON/Zod converters, SQL formatters, JWT debuggers, CSS generators, and instant Mock APIs.",
  keywords: [
    "developer tools online",
    "free developer utilities",
    "json to zod converter",
    "css glassmorphism generator",
    "jwt debugger local",
    "regex explainer",
    "mock api generator",
    "sql formatter online",
    "svg to react converter",
    "docker compose builder"
  ],
  alternates: {
    canonical: "https://webtoolseasy.com/",
  },
  openGraph: {
    title: "WebToolsEasy | 20+ Free Developer Workbenches & Mock APIs",
    description:
      "The ultimate free hub for frontend developers. Access 20+ locally-sandboxed workbenches including JSON/Zod converters, SQL formatters, JWT debuggers, CSS generators, and instant Mock APIs.",
    url: "https://webtoolseasy.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebToolsEasy | 20+ Free Developer Workbenches",
    description:
      "Access 20+ locally-sandboxed workbenches including JSON/Zod converters, SQL formatters, JWT debuggers, CSS generators, and instant Mock APIs.",
  },
};

const templates = [
  {
    title: "E-commerce Products",
    slug: "ecommerce-products",
    description: "Realistic products with prices, SKUs, and images.",
  },
  {
    title: "User Profiles",
    slug: "user-profiles",
    description: "Avatars, emails, names, and UUIDs.",
  },
  {
    title: "Blog Posts",
    slug: "blog-posts",
    description: "Titles, Markdown bodies, authors, and timestamps.",
  },
  {
    title: "Real Estate Listings",
    slug: "real-estate",
    description: "Addresses, prices, bedrooms, and property types.",
  },
];

export default function Home() {
  return (
    <AppLayout mainClassName="relative">
      <div className="pointer-events-none absolute left-[-12%] top-[-18%] h-[50%] w-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[18%] h-[40%] w-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
      
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-20 md:pb-24 md:pt-28 text-center">
        <div className="mx-auto max-w-4xl flex flex-col items-center">
          <Badge variant="info">100% Free & Locally Sandboxed</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl md:leading-[1.05]">
            The Ultimate Toolkit For
            <span className="block bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Modern Developers.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
            Access 20+ incredibly powerful, client-side developer workbenches. Format SQL, convert JSON to Zod, debug JWTs, build CSS layouts, or mock entire APIs instantly. No backend required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full">
            <Link
              href="#developer-tools"
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
            >
              Explore 20+ Developer Tools
            </Link>
            <Link
              href="#templates"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              View Mock API Templates
            </Link>
          </div>
        </div>
      </section>

      <section id="templates" className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Instant Mock APIs</h2>
          <p className="text-gray-400 mt-2">Generate thousands of rows of realistic JSON data in seconds for your frontend.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <Link 
              key={template.slug}
              href={`/mock-api/${template.slug}`}
              className="group rounded-[24px] border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-300 mb-4 ring-1 ring-white/10 group-hover:ring-indigo-500/50 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                  <line x1="6" y1="6" x2="6.01" y2="6"></line>
                  <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{template.title}</h3>
              <p className="text-sm text-gray-400">{template.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-10 border-t border-white/5">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4 text-cyan-400 bg-cyan-500/10 border-cyan-500/20">Advanced Developer Workbenches</Badge>
          <h2 className="text-3xl font-bold text-white">Complex Data, Made Simple</h2>
          <p className="text-gray-400 mt-2">Powerful, 100% client-side tools for your heaviest workflows.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] border border-cyan-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(34,211,238,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-cyan-500/10 blur-[60px] transition-all group-hover:bg-cyan-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300 mb-6 ring-1 ring-white/10 group-hover:ring-cyan-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">JSON to Zod</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Paste massive, complex JSON payloads from LLMs or APIs to generate TypeScript interfaces and Zod schemas.
            </p>
            <Link 
              href="/tools/json-to-zod" 
              className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>
          
          <div className="rounded-[24px] border border-orange-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(249,115,22,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-orange-500/10 blur-[60px] transition-all group-hover:bg-orange-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-300 mb-6 ring-1 ring-white/10 group-hover:ring-orange-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">SVG to React</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Instantly convert raw SVG graphics into clean, configurable React or React Native components.
            </p>
            <Link 
              href="/tools/svg-to-react" 
              className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-pink-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(236,72,153,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-pink-500/10 blur-[60px] transition-all group-hover:bg-pink-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-300 mb-6 ring-1 ring-white/10 group-hover:ring-pink-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Regex Explainer</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Break down complex regular expressions into plain English using Abstract Syntax Trees.
            </p>
            <Link 
              href="/tools/regex-explainer" 
              className="inline-flex items-center gap-2 text-pink-400 font-bold hover:text-pink-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-emerald-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(16,185,129,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-emerald-500/10 blur-[60px] transition-all group-hover:bg-emerald-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 mb-6 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Cron Explorer</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Understand complex cron schedules instantly. Translate syntax into plain English and visualize the next execution dates.
            </p>
            <Link 
              href="/tools/cron-explainer" 
              className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-purple-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(168,85,247,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-purple-500/10 blur-[60px] transition-all group-hover:bg-purple-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-300 mb-6 ring-1 ring-white/10 group-hover:ring-purple-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">JWT Debugger</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Decode, verify, and edit JSON Web Tokens locally. Your sensitive tokens never leave your browser for absolute privacy.
            </p>
            <Link 
              href="/tools/jwt-debugger" 
              className="inline-flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-sky-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(14,165,233,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-sky-500/10 blur-[60px] transition-all group-hover:bg-sky-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 text-sky-300 mb-6 ring-1 ring-white/10 group-hover:ring-sky-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Grid Architect</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Design complex, responsive CSS Grid layouts visually. Instantly generate pure CSS or Tailwind CSS code.
            </p>
            <Link 
              href="/tools/css-grid-architect" 
              className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-orange-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(249,115,22,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-orange-500/10 blur-[60px] transition-all group-hover:bg-orange-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-300 mb-6 ring-1 ring-white/10 group-hover:ring-orange-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M11.5 21h-2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2h-2.5"></path><path d="M9 15h.01"></path><path d="M15 15h.01"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Diff Checker</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Compare text or JSON payloads instantly. Your data never leaves your browser, ensuring absolute security.
            </p>
            <Link 
              href="/tools/diff-checker" 
              className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-pink-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(236,72,153,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-pink-500/10 blur-[60px] transition-all group-hover:bg-pink-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 text-pink-300 mb-6 ring-1 ring-white/10 group-hover:ring-pink-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Color A11y</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Generate full 50-950 color scales perfectly. Mathematically evaluate all shades against WCAG contrast guidelines.
            </p>
            <Link 
              href="/tools/color-a11y" 
              className="inline-flex items-center gap-2 text-pink-400 font-bold hover:text-pink-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-yellow-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(234,179,8,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-yellow-500/10 blur-[60px] transition-all group-hover:bg-yellow-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 text-yellow-300 mb-6 ring-1 ring-white/10 group-hover:ring-yellow-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Bcrypt Hash</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Securely generate and verify Bcrypt password hashes directly in your browser. Your plaintext passwords never leave your machine.
            </p>
            <Link 
              href="/tools/bcrypt-generator" 
              className="inline-flex items-center gap-2 text-yellow-400 font-bold hover:text-yellow-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-blue-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(59,130,246,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-blue-500/10 blur-[60px] transition-all group-hover:bg-blue-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-300 mb-6 ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m10 13-2 2 2 2"></path><path d="m14 17 2-2-2-2"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Base64 File</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Convert images and files to Base64 strings, or preview Base64 data URIs instantly. Processing happens entirely offline.
            </p>
            <Link 
              href="/tools/base64-file" 
              className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-teal-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(20,184,166,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-teal-500/10 blur-[60px] transition-all group-hover:bg-teal-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 text-teal-300 mb-6 ring-1 ring-white/10 group-hover:ring-teal-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">ID Gen & Decode</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Generate thousands of secure UUIDs or ULIDs instantly. Paste time-sortable IDs to mathematically extract their exact creation timestamps.
            </p>
            <Link 
              href="/tools/id-generator" 
              className="inline-flex items-center gap-2 text-teal-400 font-bold hover:text-teal-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-emerald-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(16,185,129,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-emerald-500/10 blur-[60px] transition-all group-hover:bg-emerald-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 mb-6 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">RSA Key Gen</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Securely generate RSA-OAEP public and private key pairs natively in your browser using the WebCrypto API.
            </p>
            <Link 
              href="/tools/rsa-generator" 
              className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-blue-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(59,130,246,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-blue-500/10 blur-[60px] transition-all group-hover:bg-blue-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-300 mb-6 ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Docker Compose</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Visually design your containerized infrastructure. Drag, drop, and configure services to instantly generate a valid docker-compose.yml file.
            </p>
            <Link 
              href="/tools/docker-compose" 
              className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-orange-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(249,115,22,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-orange-500/10 blur-[60px] transition-all group-hover:bg-orange-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-300 mb-6 ring-1 ring-white/10 group-hover:ring-orange-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">SQL Formatter</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Beautify complex SQL queries and validate syntax locally. Your sensitive database queries are formatted securely using an AST parser.
            </p>
            <Link 
              href="/tools/sql-formatter" 
              className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-pink-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(236,72,153,0.05)] backdrop-blur-md relative overflow-hidden group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-pink-500/10 blur-[60px] transition-all group-hover:bg-pink-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 text-pink-300 mb-6 ring-1 ring-white/10 group-hover:ring-pink-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"></path><path d="M11 14l-4 4-4-4"></path><path d="M17 14V2"></path><path d="M21 6l-4-4-4 4"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">YAML ⇄ JSON</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Instantly and bidirectionally translate between YAML and JSON configuration files. Features smart auto-detection for completely seamless usage.
            </p>
            <Link 
              href="/tools/yaml-json-converter" 
              className="inline-flex items-center gap-2 text-pink-400 font-bold hover:text-pink-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-purple-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(168,85,247,0.05)] backdrop-blur-md relative overflow-hidden group lg:col-span-2 xl:col-span-1">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-purple-500/10 blur-[60px] transition-all group-hover:bg-purple-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 text-purple-300 mb-6 ring-1 ring-white/10 group-hover:ring-purple-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">In-Browser SQLite Studio</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="error" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs py-0">WASM Powered</Badge>
              <Badge variant="warning" className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs py-0">Web Workers</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              A high-performance Data Studio running entirely off the main thread. Drop massive CSVs and instantly query them locally using SQLite.
            </p>
            <Link 
              href="/tools/sqlite-studio" 
              className="inline-flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-yellow-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(234,179,8,0.05)] backdrop-blur-md relative overflow-hidden group lg:col-span-2 xl:col-span-1">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-yellow-500/10 blur-[60px] transition-all group-hover:bg-yellow-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 text-yellow-300 mb-6 ring-1 ring-white/10 group-hover:ring-yellow-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Big Data Log Explorer</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="warning" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs py-0">React Virtualized</Badge>
              <Badge variant="info" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs py-0">Zero-Copy Fast</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Instantly open and regex search through millions of lines in massive `.log` or `.jsonl` files locally without freezing your browser.
            </p>
            <Link 
              href="/tools/log-explorer" 
              className="inline-flex items-center gap-2 text-yellow-400 font-bold hover:text-yellow-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-teal-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(20,184,166,0.05)] backdrop-blur-md relative overflow-hidden group lg:col-span-2 xl:col-span-1">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-teal-500/10 blur-[60px] transition-all group-hover:bg-teal-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 text-teal-300 mb-6 ring-1 ring-white/10 group-hover:ring-teal-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">DevLens Smart Studio</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="success" className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs py-0">Auto-Detect</Badge>
              <Badge variant="info" className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs py-0">Local History</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Paste JWT, JSON, Base64, Regex, Cron, or SQL. DevLens instantly auto-detects the payload and routes it to a specialized offline decoding workbench.
            </p>
            <Link 
              href="/tools/dev-lens" 
              className="inline-flex items-center gap-2 text-teal-400 font-bold hover:text-teal-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-red-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(239,68,68,0.05)] backdrop-blur-md relative overflow-hidden group lg:col-span-2 xl:col-span-1">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-red-500/10 blur-[60px] transition-all group-hover:bg-red-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 text-red-300 mb-6 ring-1 ring-white/10 group-hover:ring-red-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Advanced Screen Recorder</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="error" className="bg-red-500/20 text-red-300 border-red-500/30 text-xs py-0">No Watermark</Badge>
              <Badge variant="warning" className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs py-0">Memory Safe</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Record your screen, camera, and microphone directly in the browser. Uses IndexedDB chunking to prevent memory crashes on long recordings.
            </p>
            <Link 
              href="/tools/screen-recorder" 
              className="inline-flex items-center gap-2 text-red-400 font-bold hover:text-red-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-indigo-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(99,102,241,0.05)] backdrop-blur-md relative overflow-hidden group lg:col-span-2 xl:col-span-1">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-indigo-500/10 blur-[60px] transition-all group-hover:bg-indigo-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300 mb-6 ring-1 ring-white/10 group-hover:ring-indigo-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">API & Network Sandbox</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="info" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-xs py-0">Local Network</Badge>
              <Badge variant="neutral" className="bg-white/5 text-gray-300 border-white/10 text-xs py-0">Fetch API</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              A lightweight Postman alternative running entirely in the browser. Securely test your localhost endpoints without routing auth tokens through external servers.
            </p>
            <Link 
              href="/tools/api-tester" 
              className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-emerald-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(16,185,129,0.05)] backdrop-blur-md relative overflow-hidden group lg:col-span-2 xl:col-span-1">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-emerald-500/10 blur-[60px] transition-all group-hover:bg-emerald-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 mb-6 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Code Snippet Generator</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="success" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs py-0">Studio Canvas</Badge>
              <Badge variant="warning" className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs py-0">High-Res Export</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Create gorgeous, high-resolution images of your code for Twitter, LinkedIn, and blogs. Rendered entirely locally in your browser.
            </p>
            <Link 
              href="/tools/code-to-image" 
              className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="rounded-[24px] border border-pink-500/20 bg-[#121214]/90 p-8 shadow-[0_0_40px_rgba(236,72,153,0.05)] backdrop-blur-md relative overflow-hidden group lg:col-span-2 xl:col-span-1">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-pink-500/10 blur-[60px] transition-all group-hover:bg-pink-500/20" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 text-pink-300 mb-6 ring-1 ring-white/10 group-hover:ring-pink-500/50 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">CSS Glassmorphism Builder</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="error" className="bg-pink-500/20 text-pink-300 border-pink-500/30 text-xs py-0">Visual CSS</Badge>
              <Badge variant="info" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs py-0">Tailwind Code</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Design perfect frosted glass and modern multi-layered shadows visually. Instantly export highly-optimized Tailwind classes or standard CSS.
            </p>
            <Link 
              href="/tools/css-effects" 
              className="inline-flex items-center gap-2 text-pink-400 font-bold hover:text-pink-300 transition-colors"
            >
              Open Workbench
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10">
         <div className="rounded-[32px] border border-white/10 bg-[#121214]/90 p-10 md:p-16 shadow-2xl backdrop-blur-md text-center">
            <h2 className="text-3xl font-black text-white mb-4">Why we built this</h2>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              As developers, we were tired of setting up complex backends or writing tedious array loops just to get some UI to look realistic. WebToolsEasy was reimagined to solve one problem perfectly: giving you the data you need, in the shape you need it, right now.
            </p>
         </div>
      </section>
    </AppLayout>
  );
}
