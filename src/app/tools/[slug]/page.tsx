import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PipelineCanvas } from '@/components/canvas/PipelineCanvas';
import { toolsData } from '@/data/tools';
import Link from 'next/link';
import Script from 'next/script';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return toolsData.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.slug === slug);
  if (!tool) return { title: 'Tool Not Found' };
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `https://www.webtoolseasy.com/tools/${tool.slug}`,
      siteName: 'WebToolsEasy',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: tool.title,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.slug === slug);
  if (!tool) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool!.h1,
    url: `https://www.webtoolseasy.com/tools/${tool!.slug}`,
    description: tool!.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      '100% client-side processing',
      'No data sent to servers',
      'No signup required',
      'Drag-and-drop pipeline builder',
    ],
  };

  return (
    <main className="w-full min-h-screen overflow-y-auto overflow-x-hidden bg-[#0A0A0B]">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Canvas */}
      <section className="w-full h-screen relative z-10">
        <PipelineCanvas initialTemplate={tool!.pipeline} />
      </section>

      {/* SEO Content Layer */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-gray-300">
        <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">{tool!.h1}</h1>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">{tool!.seoText}</p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why use this tool?</h2>
        <ul className="space-y-4 text-gray-400 list-none p-0">
          {[
            ['100% Client-Side', 'Your data never leaves your browser. Zero server trust — guaranteed.'],
            ['Chainable', `Need more than just ${tool!.name.toLowerCase()}? Drag extra nodes from the sidebar to chain transforms together.`],
            ['Shareable', 'Generate a pipeline config URL and share it with your team — no data included, only structure.'],
          ].map(([title, desc]) => (
            <li key={title} className="flex items-start gap-3">
              <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
              <span><strong className="text-white">{title}:</strong> {desc}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-white mt-16 mb-6">Other developer tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {toolsData.filter(t => t.slug !== slug).map(t => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-indigo-500/30 p-4 rounded-xl transition-all no-underline block"
            >
              <span className="text-white font-medium block">{t.name}</span>
              <span className="text-xs text-gray-500 mt-1 block">{t.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors no-underline">← Back to WebToolsEasy</Link>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} WebToolsEasy — Your data never leaves your browser.</p>
        </div>
      </footer>
    </main>
  );
}
