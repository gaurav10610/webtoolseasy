import { ImageResponse } from 'next/og';
import { toolsData } from '@/data/tools';

export const runtime = 'edge';

export const alt = 'WebToolsEasy - Private Developer Tools';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const tool = toolsData.find((t) => t.slug === params.slug);
  const title = tool?.name || 'Private Developer Tools';
  const description = tool?.description || 'Your data never leaves your browser. Zero server trust.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0A0A0B',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-200px',
            left: '-200px',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #6366f1, #9333ea)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '24px',
              boxShadow: '0 0 30px rgba(99,102,241,0.5)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <h1 style={{ fontSize: '48px', color: 'white', fontWeight: 'bold', margin: 0, letterSpacing: '-0.02em' }}>
            WebToolsEasy
          </h1>
        </div>

        <h2 style={{ fontSize: '72px', color: 'white', fontWeight: 'bold', margin: '0 0 24px 0', letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: '900px' }}>
          {title}
        </h2>
        
        <p style={{ fontSize: '32px', color: '#9ca3af', margin: '0 0 60px 0', lineHeight: 1.4, maxWidth: '850px' }}>
          {description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: 'auto' }}>
          <div style={{ padding: '8px 24px', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid rgba(16, 185, 129, 0.2)', borderRadius: '999px', color: '#34d399', fontSize: '24px', fontWeight: '600' }}>
            100% Client-Side
          </div>
          <div style={{ padding: '8px 24px', background: 'rgba(255, 255, 255, 0.05)', border: '2px solid rgba(255, 255, 255, 0.1)', borderRadius: '999px', color: '#d1d5db', fontSize: '24px', fontWeight: '600' }}>
            Zero Server Trust
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
