"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MOCK_APIS = [
  { href: "/mock-api/user-profiles", label: "User API", color: "gray" },
  { href: "/mock-api/ecommerce-products", label: "E-commerce API", color: "gray" },
  { href: "/mock-api/blog-posts", label: "Blog API", color: "gray" },
];

const DEVELOPER_TOOLS = [
  { href: "/tools/api-tester", label: "API Tester", color: "indigo" },
  { href: "/tools/json-to-zod", label: "JSON to Zod", color: "cyan" },
  { href: "/tools/svg-to-react", label: "SVG to React", color: "orange" },
  { href: "/tools/regex-explainer", label: "Regex Explainer", color: "pink" },
  { href: "/tools/cron-explainer", label: "Cron Explorer", color: "emerald" },
  { href: "/tools/jwt-debugger", label: "JWT Debugger", color: "purple" },
  { href: "/tools/rsa-generator", label: "RSA Key Gen", color: "emerald" },
  { href: "/tools/sqlite-studio", label: "SQLite Studio", color: "purple" },
  { href: "/tools/log-explorer", label: "Log Explorer", color: "yellow" },
  { href: "/tools/code-to-image", label: "Code Snippet Gen", color: "emerald" },
  { href: "/tools/dev-lens", label: "DevLens Studio", color: "teal" },
  { href: "/tools/screen-recorder", label: "Screen Recorder", color: "red" },
  { href: "/tools/css-effects", label: "CSS Effects", color: "pink" },
  { href: "/tools/yaml-json-converter", label: "YAML ⇄ JSON", color: "pink" },
  { href: "/tools/sql-formatter", label: "SQL Formatter", color: "orange" },
  { href: "/tools/docker-compose", label: "Docker Compose", color: "blue" },
  { href: "/tools/id-generator", label: "ID Gen & Decode", color: "teal" },
  { href: "/tools/base64-file", label: "Base64 File", color: "blue" },
  { href: "/tools/bcrypt-generator", label: "Bcrypt Hash", color: "yellow" },
  { href: "/tools/color-a11y", label: "Color A11y", color: "pink" },
  { href: "/tools/diff-checker", label: "Diff Checker", color: "orange" },
  { href: "/tools/css-grid-architect", label: "Grid Architect", color: "sky" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const pathname = usePathname();

  // Helper function to dynamically map color names to Tailwind border/bg/text classes for standard Links
  const getColorClasses = (color: string, isActive: boolean) => {
    const activeClass = isActive ? "bg-white/10 ring-1 ring-white/20" : "";
    switch (color) {
      case "cyan": return `border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 ${activeClass}`;
      case "orange": return `border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 ${activeClass}`;
      case "pink": return `border-pink-500/30 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 ${activeClass}`;
      case "emerald": return `border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 ${activeClass}`;
      case "purple": return `border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 ${activeClass}`;
      case "yellow": return `border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 ${activeClass}`;
      case "indigo": return `border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 ${activeClass}`;
      case "blue": return `border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 ${activeClass}`;
      case "teal": return `border-teal-500/30 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 ${activeClass}`;
      case "sky": return `border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 ${activeClass}`;
      case "red": return `border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 ${activeClass}`;
      default: return `border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 ${activeClass}`;
    }
  };

  return (
    <nav className="relative z-50 border-b border-white/8 bg-[#0A0A0B]/85 px-6 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(79,70,229,0.35)] ring-1 ring-white/10 transition-transform group-hover:scale-[1.03]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19h8" />
              <path d="m4 17 6-6-6-6" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-white">
              WebToolsEasy
            </div>
            <div className="hidden text-[10px] uppercase tracking-[0.22em] text-gray-500 sm:block">
              Free Developer Hub
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex flex-1 justify-end">
          
          <div className="relative group py-6">
            <button className="text-sm font-bold text-gray-300 transition-colors hover:text-white flex items-center gap-1">
              Mock APIs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div className="absolute top-[70px] right-0 w-64 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="bg-[#121214] border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-col gap-1 backdrop-blur-xl">
                {MOCK_APIS.map(api => (
                  <Link
                    key={api.href}
                    href={api.href}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === api.href ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {api.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group py-6">
            <button className="text-sm font-bold text-gray-300 transition-colors hover:text-white flex items-center gap-1">
              Developer Tools
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div className="absolute top-[70px] right-0 w-[600px] opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="bg-[#121214]/95 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-3 gap-3">
                  {DEVELOPER_TOOLS.map(tool => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`text-xs font-bold transition-colors border px-3 py-2 rounded-xl text-center flex items-center justify-center ${getColorClasses(tool.color, pathname === tool.href)}`}
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://github.com/gaurav10610/webtoolseasy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="GitHub Repository"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>

        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden shrink-0"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Content */}
      {menuOpen ? (
        <div id="nav-mobile-menu" className="mx-auto flex max-w-7xl flex-col gap-4 pb-6 pt-2 md:hidden">
          
          <div className="flex flex-col gap-2">
            <div className="text-xs font-black uppercase tracking-wider text-gray-500 px-2">Mock APIs</div>
            {MOCK_APIS.map(api => (
              <Link
                key={api.href}
                href={api.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {api.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <button 
              className="text-xs font-black uppercase tracking-wider text-gray-500 px-2 flex justify-between items-center w-full"
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
            >
              Developer Tools
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {mobileToolsOpen ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {DEVELOPER_TOOLS.map(tool => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`rounded-2xl border px-3 py-3 text-xs font-bold transition-colors text-center ${getColorClasses(tool.color, pathname === tool.href)}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

        </div>
      ) : null}
    </nav>
  );
}
