const fs = require('fs');
const path = require('path');

const tools = [
  {
    dir: 'api-tester',
    title: 'API & Network Sandbox | Free Browser API Client',
    description: 'Test your localhost APIs instantly from the browser. A lightweight Postman alternative that runs securely on your local network. No backend required.',
    keywords: 'api tester online, browser api client, local postman alternative, test localhost api, fetch sandbox'
  },
  {
    dir: 'base64-file',
    title: 'Base64 File Converter | Encode & Decode Files Online',
    description: 'Instantly convert images, PDFs, and files to Base64 encoded strings natively in your browser. 100% secure, files never leave your computer.',
    keywords: 'base64 file converter, encode image to base64, base64 to file decode, secure base64 online'
  },
  {
    dir: 'bcrypt-generator',
    title: 'Bcrypt Hash Generator | Secure Password Hashing',
    description: 'Generate secure Bcrypt hashes online instantly. Choose your salt rounds and verify password matches. 100% client-side for maximum security.',
    keywords: 'bcrypt generator, online bcrypt hash, bcrypt password checker, secure hash generator'
  },
  {
    dir: 'code-to-image',
    title: 'Code to Image Converter | Beautiful Code Snippet Generator',
    description: 'Create gorgeous, high-resolution PNG images of your code for Twitter, LinkedIn, and blogs. Rendered entirely locally in your browser with Monaco Editor.',
    keywords: 'code to image, beautiful code snippets, carbon clone online, share code screenshot'
  },
  {
    dir: 'color-a11y',
    title: 'Color Accessibility Checker | WCAG Contrast Generator',
    description: 'Generate beautiful, WCAG-compliant color palettes instantly. Check color contrast ratios for AA and AAA accessibility standards natively in the browser.',
    keywords: 'color a11y checker, wcag contrast ratio, accessible color palette generator'
  },
  {
    dir: 'cron-explainer',
    title: 'Cron Expression Generator & Explainer | Free Online Utility',
    description: 'Translate complex Cron expressions into plain English instantly. Build schedules interactively without memorizing cron syntax.',
    keywords: 'cron explainer, cron expression generator, translate cron to english, cronstrue online'
  },
  {
    dir: 'css-effects',
    title: 'CSS Glassmorphism & Shadow Builder | Tailwind Code Generator',
    description: 'Design perfect frosted glass and modern multi-layered shadows visually. Instantly export highly-optimized Tailwind CSS classes or standard CSS.',
    keywords: 'css glassmorphism generator, css shadow builder, tailwind shadow generator, frosted glass css'
  },
  {
    dir: 'css-grid-architect',
    title: 'CSS Grid Architect | Visual Grid Layout Generator',
    description: 'Visually design complex CSS Grid layouts. Add columns, rows, and manage fractional units interactively to generate raw CSS code instantly.',
    keywords: 'css grid generator, visual css grid, build grid layout online, css layout generator'
  },
  {
    dir: 'diff-checker',
    title: 'Text & JSON Diff Checker | Compare Files Online',
    description: 'Compare text and JSON files instantly. High-performance, side-by-side local diff tool for developers. 100% secure, data never leaves your browser.',
    keywords: 'diff checker online, compare json files, text diff tool, local diff checker'
  },
  {
    dir: 'docker-compose',
    title: 'Docker Compose Architect | Visual YAML Builder',
    description: 'Visually assemble complex Docker Compose architectures. Connect Postgres, Redis, and Node services with UI blocks and instantly export raw YAML.',
    keywords: 'docker compose builder, visual docker generator, docker yaml generator, container architect'
  },
  {
    dir: 'id-generator',
    title: 'UUID & ULID Generator | Extract Timestamps',
    description: 'Generate bulk UUIDv4, UUIDv7, and ULIDs instantly. Decode and extract exact timestamps from UUIDv7 and ULID strings securely in the browser.',
    keywords: 'uuid generator, ulid generator online, uuidv7 timestamp extractor, bulk id generator'
  },
  {
    dir: 'json-to-zod',
    title: 'JSON to Zod Schema Converter | TypeScript Schema Generator',
    description: 'Instantly convert complex JSON objects into strongly-typed Zod schemas with nested TypeScript interfaces. Perfect for modern full-stack development.',
    keywords: 'json to zod, generate zod schema, json to typescript, zod online converter'
  },
  {
    dir: 'jwt-debugger',
    title: 'JWT Debugger | Decode JSON Web Tokens Online',
    description: 'Securely decode, verify, and inspect JSON Web Tokens locally in your browser. Sensitive JWT payloads never touch a server.',
    keywords: 'jwt debugger, decode jwt online, secure json web token reader, local jwt inspector'
  },
  {
    dir: 'log-explorer',
    title: 'Big Data Log Explorer | Fast Virtualized Log Reader',
    description: 'Analyze massive CSV/JSON log files natively in the browser. Uses Web Workers and React Virtualization to handle millions of rows without crashing.',
    keywords: 'log file reader, large csv viewer, virtualized log explorer, local big data viewer'
  },
  {
    dir: 'regex-explainer',
    title: 'Regex Explainer & Tester | Visual Regular Expressions',
    description: 'Visually break down and test complex Regular Expressions. Provides an interactive AST tree to help you understand exact regex matches.',
    keywords: 'regex explainer, regular expression tester, regex visualizer, test regex online'
  },
  {
    dir: 'rsa-generator',
    title: 'RSA Key Pair Generator | Secure Local Crypto',
    description: 'Generate secure RSA-OAEP public and private key pairs entirely within your browser using the native Web Crypto API. No backend, total privacy.',
    keywords: 'rsa key generator, generate public private key, web crypto api, secure key pair online'
  },
  {
    dir: 'sql-formatter',
    title: 'SQL Formatter & Validator | Beautify SQL Queries',
    description: 'Instantly format and beautify complex SQL queries. Supports dialect-specific parsing and catches syntax errors completely client-side.',
    keywords: 'sql formatter, beautify sql query, format sql online, sql syntax checker'
  },
  {
    dir: 'sqlite-studio',
    title: 'SQLite Data Studio | In-Browser Database Client',
    description: 'Run a full SQLite database directly in your browser using WebAssembly. Execute complex SQL queries on massive datasets locally with zero backend.',
    keywords: 'sqlite online, webassembly database, browser sqlite client, run sql queries locally'
  },
  {
    dir: 'svg-to-react',
    title: 'SVG to React Converter | JSX Component Generator',
    description: 'Instantly convert raw SVG code into clean, accessible React and React Native (Expo) components. Optimizes SVG paths securely in the browser.',
    keywords: 'svg to react, svg to jsx, svg to react native converter, accessible svg component'
  },
  {
    dir: 'yaml-json-converter',
    title: 'YAML ⇄ JSON Converter | Bi-directional Parser',
    description: 'Instantly convert YAML to JSON and JSON to YAML. Fully local, highly performant converter for DevOps and configuration files.',
    keywords: 'yaml to json, json to yaml converter, online yaml parser, local json formatter'
  },
  {
    dir: 'screen-recorder',
    title: 'Free Browser Screen Recorder | No Watermark',
    description: 'Record your screen, webcam, and microphone securely directly from the browser. Memory-safe, no watermarks, completely local.',
    keywords: 'free screen recorder, no watermark screen recorder, record screen online, memory safe screen record'
  },
  {
    dir: 'dev-lens',
    title: 'DevLens Studio | Smart Paste Decoder & Format Workbench',
    description: 'A unified, local-first developer workbench. Paste JWT, Base64, JSON, Regex, Cron, SQL, and more. DevLens automatically detects the type and opens a specialized tool.',
    keywords: 'smart decoder, dev lens, unified workbench, auto detect json jwt base64, local first developer tools'
  }
];

const basePath = path.join(__dirname, '../src/app/tools');

tools.forEach(tool => {
  const layoutPath = path.join(basePath, tool.dir, 'layout.tsx');
  
  const content = `import { Metadata } from "next";

export const metadata: Metadata = {
  title: "${tool.title}",
  description: "${tool.description}",
  keywords: "${tool.keywords}",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/${tool.dir}",
  },
  openGraph: {
    title: "${tool.title}",
    description: "${tool.description}",
    url: "https://webtoolseasy.com/tools/${tool.dir}",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-${tool.dir}.png",
        width: 1200,
        height: 630,
        alt: "${tool.title}",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "${tool.title}",
    description: "${tool.description}",
    images: ["https://webtoolseasy.com/og-images/tools-${tool.dir}.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${tool.title.split(' | ')[0]}",
    "description": "${tool.description}",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
`;

  fs.writeFileSync(layoutPath, content, 'utf8');
  console.log("Created layout.tsx for " + tool.dir);
});

// Removed mock-api static layout generation as it is handled dynamically by mock-api/[slug]/page.tsx
