import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PipelineCanvas } from '@/components/canvas/PipelineCanvas';
import { toolsData } from '@/data/tools';
import Link from 'next/link';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return toolsData.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.slug === slug);
  
  if (!tool) {
    return { title: 'Tool Not Found' };
  }

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#0A0A0B]">
      {/* Navigation Header */}
      <div className="absolute top-0 left-0 w-full p-4 z-50 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto bg-black/50 backdrop-blur border border-white/10 text-white/70 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2">
          ← Back to All Tools
        </Link>
      </div>

      {/* The App Layer - Full Viewport Height */}
      <section className="w-full h-screen relative z-10 pt-16">
        <PipelineCanvas initialTemplate={tool.pipeline} />
      </section>

      {/* SEO & Marketing Layer */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-gray-300 relative z-0">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">{tool.h1}</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {tool.seoText}
            </p>
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why use this {tool.name}?</h2>
            <ul className="space-y-4 text-gray-400">
              <li><strong>100% Client-Side:</strong> Your data never leaves your browser. Zero server trust.</li>
              <li><strong>Extensible:</strong> Need to do more than just {tool.name.toLowerCase()}? Drag more tools from the sidebar to create a custom data pipeline instantly.</li>
              <li><strong>Shareable:</strong> Create a complex pipeline and share the configuration URL with your team securely.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
