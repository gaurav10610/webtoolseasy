import { notFound } from "next/navigation";
import { Metadata } from "next";
import { templates, getTemplateBySlug } from "@/content/templates";
import { AppLayout } from "@/components/layout/AppLayout";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { EndpointCopyButton } from "./EndpointCopyButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return {};

  return {
    title: template.seoTitle,
    description: template.seoDescription,
    alternates: {
      canonical: `https://webtoolseasy.com/mock-api/${template.slug}`,
    },
    openGraph: {
      title: template.seoTitle,
      description: template.seoDescription,
      url: `https://webtoolseasy.com/mock-api/${template.slug}`,
      images: [
        {
          url: `https://webtoolseasy.com/og-images/mock-api-${template.slug}.png`,
          width: 1200,
          height: 630,
          alt: template.seoTitle,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: template.seoTitle,
      description: template.seoDescription,
      images: [`https://webtoolseasy.com/og-images/mock-api-${template.slug}.png`]
    }
  };
}

export async function generateStaticParams() {
  return templates.map((template) => ({
    slug: template.slug,
  }));
}

export default async function MockApiTemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) notFound();

  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev ? "http://localhost:3000" : "https://webtoolseasy.com";
  const endpointUrl = `${baseUrl}${template.endpoint}`;

  return (
    <AppLayout mainClassName="relative">
      <div className="pointer-events-none absolute left-[10%] top-[0%] h-[40%] w-[50%] rounded-full bg-indigo-600/10 blur-[100px]" />
      
      <div className="mx-auto max-w-4xl pt-10 pb-20">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#templates" className="hover:text-white transition-colors">Mock APIs</Link>
          <span>/</span>
          <span className="text-gray-300">{template.title}</span>
        </div>

        <Badge variant="info" className="mb-6">100% Free API Endpoint</Badge>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {template.title} API
        </h1>
        <p className="text-xl text-gray-400 mb-10 leading-relaxed">
          {template.description} Use the endpoint below to fetch realistic JSON data instantly in your app. No sign-up required.
        </p>

        <div className="bg-[#121214]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Endpoint URL</h2>
            <span className="text-xs font-semibold px-2 py-1 bg-green-500/20 text-green-400 rounded-md">GET</span>
          </div>
          
          <div className="relative group">
            <div className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-sm text-indigo-300 break-all pr-24">
              {endpointUrl}
            </div>
            <EndpointCopyButton url={endpointUrl} />
          </div>
          
          <div className="mt-4 flex gap-2">
            <a 
              href={template.endpoint} 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Test in Browser 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Response Schema</h3>
            <div className="space-y-4">
              {template.fields.map(field => (
                <div key={field.name} className="flex flex-col p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-indigo-300 font-bold">{field.name}</span>
                    <span className="text-xs font-mono text-gray-500 bg-black/50 px-2 py-1 rounded">{field.type}</span>
                  </div>
                  <span className="text-sm text-gray-400">{field.description}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Usage Examples</h3>
            
            <div className="space-y-4">
              <div className="bg-[#121214] border border-white/10 rounded-2xl overflow-hidden">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 text-xs font-mono text-gray-400">JavaScript (Fetch)</div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-300">
                    <code dangerouslySetInnerHTML={{__html: `fetch('${baseUrl}${template.endpoint}')
  .then(res => res.json())
  .then(data => console.log(data));`}}></code>
                  </pre>
                </div>
              </div>

              <div className="bg-[#121214] border border-white/10 rounded-2xl overflow-hidden">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 text-xs font-mono text-gray-400">React (SWR)</div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-300">
                    <code dangerouslySetInnerHTML={{__html: `import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

function App() {
  const { data, error } = useSWR(
    '${baseUrl}${template.endpoint}', 
    fetcher
  );

  if (error) return &lt;div&gt;Failed to load&lt;/div&gt;;
  if (!data) return &lt;div&gt;Loading...&lt;/div&gt;;
  
  return &lt;div&gt;Loaded {data.length} items&lt;/div&gt;;
}`}}></code>
                  </pre>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Need a custom schema?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            If this ready-made API doesn't fit your exact needs, you can use our Custom Generator to build your own data model and download it.
          </p>
          <Link 
            href="/custom-generator" 
            className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
          >
            Go to Custom Generator
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </div>

      </div>
    </AppLayout>
  );
}
