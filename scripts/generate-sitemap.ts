#!/usr/bin/env tsx
/**
 * Generates public/sitemap.xml from the toolsData registry.
 * Run: npx tsx scripts/generate-sitemap.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

// Import toolsData — NOTE: must be run with tsx for TS support
const SITE_URL = 'https://www.webtoolseasy.com';

// Tool slugs pulled from tools.ts — keep in sync
const toolSlugs = [
  'json-formatter',
  'jwt-decoder',
  'base64-encoder',
  'sha256-hash-generator',
  'regex-replace',
  'html-encoder',
  'csv-to-json',
  'yaml-to-json',
  'url-encoder',
  'sql-formatter',
  'timestamp-converter',
  'aes-encrypt',
  'sha512-hash-generator',
  'regex-extract',
  'case-converter',
  'curl-parser',
  'hex-encode',
  'binary-encode',
  'markdown-to-html',
];

const today = new Date().toISOString().split('T')[0];

const urls = [
  { loc: SITE_URL, priority: '1.0', changefreq: 'weekly' },
  { loc: `${SITE_URL}/canvas`, priority: '0.9', changefreq: 'monthly' },
  ...toolSlugs.map(slug => ({
    loc: `${SITE_URL}/tools/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, xml, 'utf-8');
console.log(`✅ sitemap.xml generated with ${urls.length} URLs → ${outputPath}`);
