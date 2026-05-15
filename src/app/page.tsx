import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ArchCost | Visual Cloud Architecture & Cost Estimator',
  description: 'Visually drag and drop your AWS architecture. Get real-time cost estimates instantly. No AWS login required.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="w-full h-20 border-b border-white/5 flex items-center justify-between px-8 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">ArchCost</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/canvas" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Launch App</Link>
          <a href="https://github.com/gaurav10610/webtoolseasy" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">GitHub</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          No AWS Login Required
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
          Visualize <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-indigo-500">Architecture.</span><br/>
          Estimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Costs.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Stop wrestling with the AWS Pricing Calculator. Drag and drop EC2, RDS, and S3 nodes onto a canvas, tweak traffic sliders, and see your exact monthly bill update in real-time.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/canvas" 
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_50px_rgba(79,70,229,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            Start Architecting Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a 
            href="#how-it-works" 
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121214]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-orange-500/30 transition-colors group">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🖱️</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Drag & Drop Canvas</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Design your entire AWS or GCP architecture visually. No confusing spreadsheets or manual documentation required.</p>
          </div>
          
          <div className="bg-[#121214]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Real-Time Pricing</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Every node displays its estimated monthly cost. Tweak instance types and traffic volume to watch your total budget adjust instantly.</p>
          </div>
          
          <div className="bg-[#121214]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-indigo-500/30 transition-colors group">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Local & Secure</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Your architecture diagrams never leave your browser. Zero backend servers. Zero databases. Complete privacy by default.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-8 mt-20 relative z-10 bg-[#0A0A0B]/80">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">ArchCost</span>
            <span className="text-gray-500 text-sm">© {new Date().getFullYear()}</span>
          </div>
          <div className="text-sm text-gray-500">
            Designed for engineers who hate pricing spreadsheets.
          </div>
        </div>
      </footer>
    </div>
  );
}
