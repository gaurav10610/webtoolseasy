import { PipelineCanvas } from '@/components/canvas/PipelineCanvas';
import { toolsData } from '@/data/tools';
import Link from 'next/link';

export const metadata = {
  title: 'WebToolsEasy | The Private Data Canvas for Developers',
  description: 'A 100% client-side, drag-and-drop data pipeline tool for developers. Decode JWTs, format JSON, and transform data without sending secrets to a server.',
};

export default function Home() {
  return (
    <main className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#0A0A0B]">
      {/* The App Layer - Full Viewport Height */}
      <section className="w-full h-screen relative z-10">
        <PipelineCanvas />
      </section>

      {/* SEO & Marketing Layer - Below the fold for crawlers and curious users */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-gray-300 relative z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] to-indigo-900/10 pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Stop Pasting Secrets into Sketchy Websites.</h2>
          <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-3xl">
            WebToolsEasy is the world&apos;s first fully private, drag-and-drop data transformation canvas for developers. Built with WebAssembly and local JavaScript, <strong>100% of the processing happens in your browser.</strong> Your API keys, JSON payloads, and JWTs never touch our servers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-3">Drag & Drop Pipelines</h3>
              <p className="text-sm text-gray-400">Chain operations together. Decode a JWT, extract the payload, and format it as JSON all in one continuous, automated flow.</p>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-3">Absolute Zero Trust</h3>
              <p className="text-sm text-gray-400">There is no database storing your payload. There are no backend API calls. Everything executes in your local browser sandbox.</p>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-3">Shareable Templates</h3>
              <p className="text-sm text-gray-400">Share your pipeline configuration with your team via a secure URL string, without ever sharing the sensitive data inside it.</p>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-6">Available Developer Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolsData.map(tool => (
                <Link 
                  key={tool.slug} 
                  href={`/tools/${tool.slug}`}
                  className="bg-white/5 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/30 p-4 rounded-xl transition-all block group"
                >
                  <h3 className="text-white font-medium group-hover:text-indigo-300 transition-colors">{tool.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
