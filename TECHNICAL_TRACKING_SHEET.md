# Technical Tracking Sheet: WebToolsEasy (Private Data Canvas)

This tracking sheet is the exhaustive roadmap and backlog for realizing the "Private Data Canvas" product vision.
Items marked **[x]** are fully implemented and tested. Items marked **[ ]** are future work.

---

## 1. Core Canvas Architecture (ReactFlow)
- [x] Integrate `@xyflow/react` for the node-based canvas.
- [x] Implement `zustand` for centralized, predictable state management.
- [x] Create a dynamic `nodeRegistry` with categories for easy extensibility.
- [x] Build generic node components (`GenericNode`, `InputNode`, `OutputNode`, `FileInputNode`) with glassmorphic dark mode aesthetics.
- [x] Implement a robust topological Execution Engine from Input → Output.
- [x] Enable parameterized node configurations (text, number, and **select dropdown** config field types).
- [x] **UX:** Animated dashed edges during pipeline execution, spinner on Run button.
- [x] **UX:** Inline output preview on transform nodes (green truncated preview after execution).
- [x] **Resilience:** Error boundaries in every node — errors display inline on the offending node with red glow.
- [x] **Performance:** Move intensive hashing/regex to **Web Workers** for non-blocking execution on huge inputs.
- [x] **Accessibility:** Full keyboard navigation for the canvas and nodes.

## 2. Zero-Trust & Organic Growth Engine
- [x] **Zero-Trust:** All processing via native Web APIs (Web Crypto, TextEncoder, FileReader). Zero server calls.
- [x] **Organic Sharing:** URL `#` fragment state encoding — share pipeline structure via Base64, never payload data.
- [x] **Example Templates:** 1-click "Load Example" JWT decode template.
- [x] **Local Persistence:** `localStorage` autosave on every state change — users never lose work on refresh.
- [x] **Saved Pipelines:** Full Save / Load / Delete pipeline management in the sidebar "Saved" tab — powered by localStorage, zero DB.
- [x] **Social Sharing:** Dynamic Open Graph tags so shared pipeline URLs render preview cards in Slack/Discord (requires server-side OG image generation).

## 3. SEO & Marketing Infrastructure
- [x] **Landing Page:** High-converting developer-focused marketing page with hero, "How it works", trust signals.
- [x] **Hybrid Routing:** `/` (landing), `/canvas` (full workspace), `/tools/[slug]` (pre-configured SEO pages).
- [x] **Pre-configured Templates:** Tool pages auto-load the correct pipeline on arrival from Google.
- [x] **Internal Linking:** Every tool page cross-links to all other tools for PageRank distribution.
- [x] **Sitemap Automation:** `scripts/generate-sitemap.ts` builds `public/sitemap.xml` with 21 URLs. Run with `npx tsx scripts/generate-sitemap.ts`.
- [x] **JSON-LD Schema:** `WebApplication` structured data injected on every tool page for Google rich snippets.
- [x] **OpenGraph / Twitter Cards:** Full metadata on every tool page for social sharing previews.

## 4. Node Library (The Tools)

### Text Manipulation
- [x] Uppercase / Lowercase Converters
- [x] Regex Replace (with pattern, flags, replacement config)
- [x] Regex Extract (extracts all matches into a JSON array)
- [x] Case Converter (camelCase, snake_case, PascalCase, kebab-case) — select dropdown
- [x] String Splitter (by delimiter → JSON array)
- [x] String Joiner (JSON array → single string)
- [x] JSON Path Extractor (deep nested key extraction with `$` notation)

### Encoders & Decoders
- [x] Base64 Encode / Decode
- [x] URL Encode / Decode
- [x] HTML Entities Encode / Decode
- [x] String → Hex / Hex → String
- [x] String → Binary / Binary → String

### Formatters & Parsers
- [x] JSON Formatter (Prettify) / JSON Minify
- [x] CSV → JSON (header row detection)
- [x] JSON → CSV
- [x] YAML → JSON (key: value and nested structure parsing)
- [x] SQL Formatter / Beautifier (keywords on new lines)
- [x] Markdown → HTML (headings, bold, italic, code, lists)

### Crypto & Hashing
- [x] SHA-256 Hash (Web Crypto API)
- [x] SHA-1 Hash (legacy, Web Crypto API)
- [x] SHA-512 Hash (Web Crypto API)
- [x] JWT Decode (header + payload + expiry meta, with padding fix)
- [x] AES-256-GCM Encrypt (PBKDF2 key derivation, local Web Crypto API)
- [x] AES-256-GCM Decrypt
- [x] MD5 Hash (not in Web Crypto API — needs a pure-JS implementation or WASM)
- [x] Bcrypt Hash Generator (requires bcrypt.js library)

### Utilities & Advanced Developer Pain Points
- [x] **File Input Node** — drag & drop .json/.txt/.log/.csv files up to 10 MB via `FileReader` API
- [x] **cURL Parser** — extracts URL, headers, and JSON body from a raw cURL command (Chrome DevTools copy)
- [x] **Timestamp Converter** — Unix epoch ↔ ISO-8601, UTC, and local time string
- [x] **Data Faker** — generates configurable fake JSON records locally (no API call)
- [x] **Visual Diff Checker Node** — side-by-side color-coded diff for two inputs (requires diff library or WASM)

## 5. SEO Tool Pages Live
Each route has its own `<title>`, `<meta description>`, `<h1>`, JSON-LD schema, and cross-links:
- [x] `/tools/json-formatter`
- [x] `/tools/jwt-decoder`
- [x] `/tools/base64-encoder`
- [x] `/tools/sha256-hash-generator`
- [x] `/tools/regex-replace`
- [x] `/tools/html-encoder`
- [x] `/tools/csv-to-json`
- [x] `/tools/yaml-to-json`
- [x] `/tools/sql-formatter`
- [x] `/tools/timestamp-converter`
- [x] `/tools/aes-encrypt`
- [x] `/tools/curl-parser`

## 6. Polish & Technical Debt
- [x] Delete all legacy "Web Tools Factory" files (111 old tools, 7 workflows, old nav components).
- [x] Fix Next.js 15+ async `params` routing.
- [x] "Clear" buttons on Input nodes.
- [x] Sidebar now has collapsible category sections (Text, Encoders, Formatters, Crypto, Utilities).
- [x] Run button shows spinner during execution with disabled state.
- [x] **E2E Tests:** Playwright tests for the core execution engine transforms.
- [x] **Mobile Optimization:** Ensure landing page tool cards are fully responsive (canvas is desktop-only by design).
- [x] **robots.txt:** Add `public/robots.txt` pointing to the sitemap.
