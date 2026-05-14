import Link from 'next/link';
import { toolsData } from '@/data/tools';

export const metadata = {
  title: 'WebToolsEasy | Private Developer Tools That Never See Your Data',
  description: 'Format JSON, decode JWTs, encode Base64, hash strings — all 100% in your browser. Your secrets never leave your device.',
};

const ICON_MAP: Record<string, string> = {
  'json-formatter': '{ }',
  'jwt-decoder': '🔐',
  'base64-encoder': '⟨/⟩',
  'sha256-hash-generator': '#',
  'regex-replace': '.*',
  'html-encoder': '&lt;',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] overflow-x-hidden">
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative px-6 pt-32 pb-24 text-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            100% Client-Side — Your data never leaves your browser
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Developer tools that{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              never see your data
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop pasting API keys, JWTs, and production payloads into sketchy online tools.
            WebToolsEasy runs everything locally in your browser — no servers, no databases, no risk.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/canvas"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] text-base no-underline"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              Open Pipeline Canvas
            </Link>
            <a
              href="#tools"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all text-base no-underline"
            >
              Browse Tools ↓
            </a>
          </div>
          <p className="text-xs text-gray-600">Free &amp; open source — no signup required</p>
        </div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-white text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Pick a tool', desc: 'Choose a specific tool below — or open the Canvas to chain multiple tools together.' },
            { step: '2', title: 'Paste your data', desc: 'Drop in your JSON, JWT, Base64 string, or raw text. It stays in your browser.' },
            { step: '3', title: 'Get results instantly', desc: 'Hit Run. Copy your output. Share the pipeline config (not your data) with your team.' },
          ].map(item => (
            <div key={item.step} className="relative bg-white/[0.03] border border-white/5 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg mb-4">{item.step}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════ TOOL CARDS ════════════════════ */}
      <section id="tools" className="max-w-5xl mx-auto px-6 py-20 scroll-mt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Available Tools</h2>
          <p className="text-gray-500 text-base">Click any tool to use it immediately — or open the Canvas to chain them together.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {toolsData.map(tool => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group relative bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 no-underline block"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono text-lg mb-4 group-hover:bg-indigo-600/20 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all">
                {ICON_MAP[tool.slug] || '⚙'}
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
              <div className="mt-4 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Use this tool →
              </div>
            </Link>
          ))}

          {/* Canvas card — always last */}
          <Link
            href="/canvas"
            className="group relative bg-gradient-to-br from-indigo-600/10 to-purple-600/10 hover:from-indigo-600/20 hover:to-purple-600/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 no-underline block"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2">Pipeline Canvas</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Chain multiple tools together with drag &amp; drop. Build complex data transformation flows.</p>
            <div className="mt-4 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Open Canvas →
            </div>
          </Link>
        </div>
      </section>

      {/* ════════════════════ WHY TRUST US ════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-white text-center mb-12">Why developers trust WebToolsEasy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-2xl">🛡️</div>
            <h3 className="text-lg font-semibold text-white mb-2">Zero Trust Architecture</h3>
            <p className="text-sm text-gray-400">No backend. No database. No API calls. Every transformation runs in your browser&apos;s sandbox using native Web APIs.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 text-2xl">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Instant Results</h3>
            <p className="text-sm text-gray-400">No network latency. No waiting for server responses. Results appear the moment you click Run.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4 text-2xl">🔗</div>
            <h3 className="text-lg font-semibold text-white mb-2">Shareable Pipelines</h3>
            <p className="text-sm text-gray-400">Share your pipeline configuration via URL. Your team gets the workflow — never your sensitive data.</p>
          </div>
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold text-white mb-1">WebToolsEasy</div>
            <p className="text-sm text-gray-500">Private developer tools. No signup. No servers.</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <Link href="/canvas" className="hover:text-white transition-colors no-underline">Canvas</Link>
            {toolsData.slice(0, 4).map(t => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="hover:text-white transition-colors no-underline">{t.name}</Link>
            ))}
          </nav>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} WebToolsEasy</p>
        </div>
      </footer>
    </main>
  );
}
