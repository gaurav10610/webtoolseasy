# WebToolsEasy — Developer Studio

Privacy-first developer tools. All processing runs locally in your browser.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)](https://www.typescriptlang.org/)

**WebToolsEasy** is an open-source developer studio built around two flagship products:

- **DevLens** — A smart data inspector that auto-detects what you've pasted (JWT, JSON, Base64, timestamps, UUIDs, regex, and more) and renders deep, interactive analysis views.
- **ArchCost** — A visual cloud architecture cost planner. Drag-and-drop AWS services onto a canvas and get real-time cost estimates.

## Live Product

🌐 **[webtoolseasy.com](https://webtoolseasy.com)**

| Product  | URL                                            |
| -------- | ---------------------------------------------- |
| DevLens  | [/studio](https://webtoolseasy.com/studio)     |
| ArchCost | [/canvas](https://webtoolseasy.com/canvas)     |

## Why This Project Exists

1. **AI-proof** — Complex runtime inspection and visual cost planning are things static AI chat models cannot replicate well.
2. **Privacy-first** — Zero data leaves your browser. No accounts, no uploads, no server-side processing.
3. **Deep, not wide** — Instead of 100+ shallow tools, two products with deep, expert-level features.

## DevLens: Smart Paste Engine

Paste any developer data — DevLens auto-detects the type and renders a specialist view:

| Type | Features |
|------|----------|
| JWT | Header/Payload/Signature decode, claim explanations, exp countdown, alg security badges |
| JSON | Tree view, sortable table, prettify/minify, JSONPath query, schema inference |
| Base64 | Decode/encode, data URL preview, binary hex dump, content type detection |
| Regex | Test/explain/replace tabs, capture group highlighting, flag toggles |
| Timestamp | 8-timezone grid, relative time, reverse converter |
| UUID | Version decode (v1/v4/v7), timestamp extraction, generate buttons |
| Color | HEX/RGB/HSL/HSV/OKLCH conversions, WCAG contrast, tint/shade palette |
| URL Encoded | Parameter table, double-encoding detection, encode builder |
| IP Address | IPv4/IPv6, CIDR math, private/public/loopback classification |
| PEM/X.509 | Certificate fields, expiry countdown, chain analysis |
| YAML | Parse/validate, YAML↔JSON conversion |
| XML | Tree view, XPath query, prettify |
| CSV/TSV | Auto-delimiter detection, sortable table, column type inference |
| .env | Masked values, compare two files, export as JSON |
| Cron | Human-readable description, next 15 triggers, visual builder |
| SQL | Format/prettify, query breakdown, dialect selector |

## ArchCost: Visual Cost Planner

Drag AWS services onto a canvas and configure them to get live cost estimates:

- **6 services**: EC2, RDS, S3, Lambda, ALB, CloudFront
- **Real pricing**: Weekly automated updates from AWS Bulk Pricing API
- **Undo/Redo**: Full history with Cmd+Z / Cmd+Shift+Z
- **Keyboard shortcuts**: Delete, select all, duplicate, arrow nudge, fit view
- **Shareable**: Compress architecture to URL for sharing
- **Export**: PNG, PDF, CSV cost breakdown (coming soon)

## Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 6
- **Styling**: Tailwind CSS 3
- **State**: Zustand (with zundo for undo/redo)
- **Canvas**: ReactFlow
- **Testing**: Vitest + Playwright
- **Font**: Space Grotesk

## Quick Start

### Prerequisites

- Node.js 22.x
- npm 10+

### Setup

```bash
git clone https://github.com/gaurav10610/webtoolseasy.git
cd webtoolseasy
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test:unit` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test` | Run all tests |
| `npm run fetch-pricing` | Update AWS pricing data |
| `npm run update:sitemap` | Regenerate sitemap.xml |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── studio/             # DevLens workbench
│   ├── canvas/             # ArchCost planner
│   ├── tools/              # Tool landing pages (SEO)
│   └── privacy/            # Privacy policy
├── components/
│   ├── devlens/            # Smart Paste engine + specialist views
│   ├── canvas/             # ArchCost canvas components
│   └── ui/                 # Shared design system
├── store/                  # Zustand stores
├── data/                   # Pricing data, tool metadata
├── lib/                    # Business logic modules
└── __tests__/              # Unit tests
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Adding a new DevLens specialist view

1. Create `src/components/devlens/views/YourView.tsx`
2. Add detection logic in `src/lib/devlens/detector.ts`
3. Register in `src/components/devlens/InlineTool.tsx`
4. Add metadata in `src/lib/devlens/toolMeta.ts`
5. Write unit tests

### Adding a new ArchCost service

1. Add pricing logic in `src/data/pricingEngine.ts`
2. Add default config in `useArchitectureStore.ts`
3. Add to the sidebar service list
4. Write unit tests for the pricing calculator

## Open Source

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [SECURITY.md](SECURITY.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [LICENSE](LICENSE) (MIT)

## Maintainer

**Gaurav Kumar Yadav**

- GitHub: [github.com/gaurav10610](https://github.com/gaurav10610)
- LinkedIn: [linkedin.com/in/gaurav-kumar-yadav-6125817a](https://www.linkedin.com/in/gaurav-kumar-yadav-6125817a/)
