# WebToolsEasy — Exhaustive Technical Task Tracking Sheet

**Strategy reference:** `PRODUCT_STRATEGY_REIMAGINED.md`  
**Last updated:** May 2026  
**Legend:** `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked

---

## TRACK A — Codebase Cleanup & Demolition

> Remove everything that doesn't belong in the new product. Do this first so the codebase is clean before new code is added.

### A1 · Remove Old Tool Pages & Routes

- [ ] Delete all files under `src/app/tools/` except any that map to new DevLens tools (jwt-decoder, json-query, regex-tester, timestamp-converter, base64, env-file-editor)
- [ ] Delete `src/data/apps.ts` (110-tool registry — no longer needed)
- [ ] Delete `src/data/categories.ts`
- [ ] Delete `src/data/tools/` directory entirely
- [ ] Delete `src/data/workflows.ts`
- [ ] Delete `src/data/workflowSamples.ts`
- [ ] Delete `src/data/workflowLinkMap.ts`
- [ ] Delete `src/data/toolWorkflowBridges.ts`
- [ ] Delete `src/data/blog/` and `src/data/blogPosts.ts` (old blog content)
- [ ] Delete `src/app/api/` routes that served old tool data or workflow APIs
- [ ] Delete `src/store/` entries for old tool state (keep only `useArchitectureStore.ts`)
- [ ] Delete `src/hooks/` hooks that are tool-factory-specific
- [ ] Delete `src/service/` files tied to old tool processing
- [ ] Delete `src/components/` subdirectories for old tools (keep only `canvas/`)
- [ ] Delete `src/util/screenRecorderUtils.ts` and other old utility files
- [ ] Delete `scripts/generate-workflow-scaffold.ts` and `.js`
- [ ] Delete `scripts/seo-smoke-workflows.ts`
- [ ] Delete `scripts/validate-workflow-configs.ts`
- [ ] Delete `scripts/extract-workflow-i18n-keys.ts`
- [ ] Remove `pdf.worker.min.mjs` from `public/` (no longer needed)
- [ ] Remove FFmpeg vendor files from `public/vendor/ffmpeg/`
- [ ] Remove SQL.js wasm from `public/vendor/sql/` (will re-add for DevLens CSV tool)
- [ ] Uninstall npm packages tied only to old tools: `@ffmpeg/core`, `@ffmpeg/ffmpeg`, `video-stream-merger`, `pdf-lib`, `monaco-editor` related packages — audit `package.json` and remove unused deps

### A2 · Redirect & SEO Cleanup

- [ ] Create `src/app/tools/[...slug]/route.ts` (catch-all API route) returning HTTP 410 Gone for all deleted tool URLs
- [ ] Add Next.js `redirects()` in `next.config.mjs` for the small set of old URLs that map to new equivalents:
  - `/tools/json-formatter` → `/tools/json-query`
  - `/tools/base64-encoder` → `/tools/base64`
  - `/tools/jwt-decoder` → `/tools/jwt-decoder` (keep slug, rebuild page)
  - `/tools/regex-tester` → `/tools/regex-tester` (keep slug, rebuild page)
- [ ] Remove all old tool entries from `public/sitemap.xml`
- [ ] Update `public/robots.txt` — disallow `/tools/` catch-all 410s from crawl
- [ ] Remove all old tool `<link rel="canonical">` references

### A3 · Test Suite Cleanup

- [ ] Delete `src/__tests__/tool-config-structure.test.ts` (tests old 110-tool registry)
- [ ] Delete `src/__tests__/blog-config-structure.test.ts` (tests old blog)
- [ ] Delete `e2e/tools.spec.ts`, `e2e/tool-behaviors.spec.ts`, `e2e/tool-url-regression.spec.ts` (all test old tools)
- [ ] Delete `e2e/blog-publish.spec.ts`, `e2e/blogs.spec.ts`, `e2e/pipeline.spec.ts`
- [ ] Delete `e2e/api-payload-cleanup.spec.ts`
- [ ] Keep and update `e2e/core-pages.spec.ts` to reflect new URL structure
- [ ] Confirm `npm run build` succeeds on clean codebase after all deletions

---

## TRACK B — Infrastructure & Shared Foundation

> Foundational plumbing that every feature depends on. Do before building features.

### B1 · Turso Database Setup

- [ ] Create a Turso account (free tier) and provision a database named `webtoolseasy`
- [ ] Install `@libsql/client` package
- [ ] Create `src/lib/db.ts` — singleton Turso client using env vars `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`
- [ ] Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` to `.env.example` with placeholder values
- [ ] Add both vars to Vercel environment variables
- [ ] Run migration: create `architectures` table (id TEXT PK, slug TEXT UNIQUE, data TEXT NOT NULL, created_at INTEGER, view_count INTEGER DEFAULT 0)
- [ ] Run migration: create `regex_patterns` table (id TEXT PK, slug TEXT UNIQUE, pattern TEXT, flags TEXT, description TEXT, created_at INTEGER, use_count INTEGER DEFAULT 0)
- [ ] Create `src/lib/migrations/` folder and add both migration SQL files for reproducibility
- [ ] Write a `scripts/run-migrations.ts` script that applies pending migrations via the Turso client

### B2 · Pricing Data Pipeline (Option B — build-time fetch)

- [ ] Create `scripts/fetch-aws-pricing.ts` — fetches from AWS Bulk Pricing API for services: EC2, RDS, S3, Lambda, CloudFront, ALB, NLB, API Gateway, ECS, EKS, DynamoDB, ElastiCache, SQS, SNS, EventBridge, Kinesis, CloudWatch, Route 53, NAT Gateway, Secrets Manager, KMS, CodeBuild
- [ ] For each service, parse only the fields needed: `instanceType`, `pricePerUnit`, `unit`, `region`, `operatingSystem` — discard the 300MB of irrelevant data
- [ ] Output a compact `src/data/awsPricing.generated.json` (target < 500KB) with structure: `{ region: { service: { instanceType: pricePerHour } } }`
- [ ] Add `"fetch-pricing": "npx ts-node scripts/fetch-aws-pricing.ts"` to `package.json` scripts
- [ ] Add a GitHub Actions workflow `.github/workflows/update-pricing.yml` that runs `fetch-pricing` on a weekly cron (`0 6 * * 1`), commits the updated JSON if changed, and triggers a Vercel deploy
- [ ] Update `src/data/pricingEngine.ts` to import from `awsPricing.generated.json` instead of hardcoded rates
- [ ] Add `src/data/awsPricing.generated.json` to `.gitignore` exclusion list (keep it tracked, not ignored)
- [ ] Add Option C fallback: if `awsPricing.generated.json` is missing (first clone), fall back to a hardcoded baseline in `pricingEngine.ts` and show a "Prices updated quarterly" badge on the canvas

### B3 · Shared UI Component Library (new design system)

- [ ] Create `src/components/ui/` directory for all shared primitives
- [ ] Build `src/components/ui/Button.tsx` — variants: primary, secondary, ghost, danger; sizes: sm, md, lg; supports icon left/right
- [ ] Build `src/components/ui/Badge.tsx` — variants: info, warning, success, error, neutral
- [ ] Build `src/components/ui/Tooltip.tsx` — accessible, keyboard-friendly tooltip wrapper
- [ ] Build `src/components/ui/CopyButton.tsx` — copies text to clipboard, shows "Copied!" tick for 2 seconds
- [ ] Build `src/components/ui/Panel.tsx` — card container with header, body, optional footer; used by DevLens panels
- [ ] Build `src/components/ui/KeyboardShortcut.tsx` — renders `⌘K` / `Ctrl+K` style shortcut chips
- [ ] Build `src/components/ui/EmptyState.tsx` — icon + title + description + optional CTA; used when panels are empty
- [ ] Build `src/components/ui/Tabs.tsx` — accessible tab strip (used in specialist views)
- [ ] Build `src/components/ui/Resizer.tsx` — drag handle for resizable panels
- [ ] Update `src/theme.ts` and `tailwind.config.ts` to define the new color palette (dark background `#0A0A0B`, surface `#121214`, borders `white/8`, accent indigo/orange per product)

### B4 · Shared Utility Library

- [ ] Create `src/utils/nanoid.ts` — tiny wrapper around `nanoid` for 8-char IDs (used for share URLs)
- [ ] Create `src/utils/compress.ts` — `compress(str): string` and `decompress(str): string` using `fflate` (pure JS, no WASM) for URL-safe state serialization
- [ ] Create `src/utils/clipboard.ts` — `readClipboard(): Promise<string>`, handles permissions gracefully with fallback to paste prompt
- [ ] Create `src/utils/formatBytes.ts` — human-readable byte sizes
- [ ] Install `nanoid` and `fflate` packages

### B5 · Global Layout & Navigation

- [ ] Rewrite `src/app/layout.tsx` — new global layout: dark background, minimal nav with "DevLens" and "ArchCost" links, no tool categories
- [ ] Build `src/components/Nav.tsx` — responsive top nav: logo/brand left, `DevLens` and `ArchCost` links center, GitHub link right; mobile: hamburger
- [ ] Build `src/components/Footer.tsx` — minimal: product name, GitHub link, privacy policy note ("All data processed locally — nothing ever sent to our servers"), MIT license
- [ ] Rewrite `src/app/page.tsx` — new landing page: hero section pitching both DevLens and ArchCost, privacy guarantee callout, short feature grids for each product, CTA buttons
- [ ] Add `src/app/privacy/page.tsx` — simple static page explaining the zero-data-collection architecture; important for developer trust
- [ ] Update `src/app/globals.css` — remove old tool-factory styles, keep only global resets and custom scrollbar styling

---

## TRACK C — DevLens: Smart Paste Engine

> The core auto-detection engine that powers the entire DevLens workbench.

### C1 · Data Type Detector

- [ ] Create `src/lib/devlens/detector.ts` — `detect(input: string): DetectedType` function
- [ ] Implement JWT detection: matches `^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$`
- [ ] Implement JSON detection: attempt `JSON.parse()`, catch errors, return confidence score
- [ ] Implement Base64 detection: matches base64 charset, validates decode succeeds, checks if result is text or binary
- [ ] Implement Base64 Data URL detection: `^data:[a-z]+/[a-z]+;base64,`
- [ ] Implement URL-encoded string detection: contains `%[0-9A-F]{2}` patterns with density threshold
- [ ] Implement Unix timestamp detection: 10-digit (seconds) or 13-digit (milliseconds) integer string
- [ ] Implement UUID detection: `^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`
- [ ] Implement IPv4 detection: `^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$`
- [ ] Implement IPv6 detection: standard IPv6 pattern
- [ ] Implement Hex color detection: `^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$`
- [ ] Implement Regex detection: starts with `/` and ends with `/{flags}`, or user explicitly marks as regex
- [ ] Implement YAML detection: contains `---` or `key: value` patterns without being JSON
- [ ] Implement XML detection: starts with `<?xml` or `<[A-Za-z]`
- [ ] Implement CSV/TSV detection: consistent delimiter across 3+ lines, no JSON/XML
- [ ] Implement `.env` file detection: 3+ lines matching `[A-Z_]+=.*` pattern
- [ ] Implement Cron expression detection: 5 or 6 space-separated fields matching cron token patterns
- [ ] Implement SQL detection: starts with `SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER` (case-insensitive)
- [ ] Implement PEM certificate detection: `-----BEGIN CERTIFICATE-----` prefix
- [ ] Implement PEM private key detection: `-----BEGIN.*PRIVATE KEY-----` prefix
- [ ] Export `DetectedType` union type covering all supported types plus `'unknown'`
- [ ] Export `DetectionResult` type: `{ type: DetectedType; confidence: 'high' | 'medium' | 'low'; meta?: Record<string, unknown> }`
- [ ] Write unit tests `src/__tests__/devlens/detector.test.ts` covering all 18 types plus ambiguous inputs

### C2 · DevLens Studio Page & Panel Architecture

- [ ] Create `src/app/studio/page.tsx` — the `/studio` route; renders the multi-panel workbench
- [ ] Create `src/components/devlens/Studio.tsx` — client component; manages panel layout state
- [ ] Create `src/components/devlens/PanelContainer.tsx` — single panel: header with detected type badge + actions, body with specialist view, resize handle
- [ ] Create `src/components/devlens/PasteInput.tsx` — large textarea with paste hint and drag-and-drop file support; calls detector on every significant change (debounced 300ms)
- [ ] Create `src/store/useDevLensStore.ts` (Zustand) — manages: `panels[]`, `history[]`, `addPanel()`, `updatePanel()`, `removePanel()`, `pushHistory()`
- [ ] Implement panel add/remove: `+` button adds a new panel (max 4); `×` closes a panel
- [ ] Implement panel resize: draggable divider between adjacent panels; stores widths in store
- [ ] Implement `Ctrl/Cmd+V` global shortcut: pastes clipboard content into the focused or first empty panel
- [ ] Implement localStorage persistence for `history[]` (last 20 inputs); load on mount
- [ ] Build `src/components/devlens/HistoryDrawer.tsx` — slide-in drawer showing last 20 inputs with type icon, truncated preview, timestamp; click to restore to panel
- [ ] Build `src/components/devlens/TypeBadge.tsx` — colored badge showing the detected type with icon (e.g., `🔑 JWT`, `{ } JSON`)
- [ ] Build `src/components/devlens/UnknownView.tsx` — fallback view when type is `'unknown'`: shows raw text with line numbers, copy button, suggestions for what it might be

---

## TRACK D — DevLens: Specialist Views

> One specialist view component per supported data type. Each is a self-contained React component receiving `input: string` and rendering the richest possible interactive view.

### D1 · JWT Specialist View

- [ ] Install `jose` package (pure JS JWT library, no Node.js deps)
- [ ] Create `src/components/devlens/views/JwtView.tsx`
- [ ] Decode header and payload without signature verification (display only)
- [ ] Render three-column layout: Header JSON, Payload JSON, Signature status
- [ ] Show signature algorithm (alg) with a badge; mark HS256/RS256/ES256 etc.
- [ ] Implement claim explanation panel: for each claim in payload, show a collapsible row with: claim key, value, human-readable name, plain-English explanation, security note if applicable
- [ ] Built-in claim dictionary covering: `sub`, `iss`, `aud`, `exp`, `iat`, `nbf`, `jti`, `name`, `email`, `roles`, `scope`, `azp`, `sid` — at minimum
- [ ] Implement `exp` countdown: if token has `exp`, show "Expires in X minutes" or "Expired X minutes ago" with color (green/yellow/red); updates every second via `setInterval`
- [ ] Implement `iat` display: "Issued X days ago" relative time
- [ ] Show "Invalid JWT structure" error state if the input doesn't have 3 dot-separated base64 parts
- [ ] Show "Payload is not valid JSON" error state with raw decoded bytes shown
- [ ] Add "Copy Header", "Copy Payload", "Copy Raw" buttons
- [ ] Write unit tests `src/__tests__/devlens/views/jwt.test.ts`

### D2 · JSON Specialist View

- [ ] Create `src/components/devlens/views/JsonView.tsx`
- [ ] Implement **Tree view** tab: recursive expandable tree; collapsed by default for objects > 3 levels deep; click key to copy path; click value to copy value
- [ ] Implement **Table view** tab: if root is an array of objects, render as sortable HTML table; show row count; clicking a row expands nested JSON inline
- [ ] Implement **Prettify/Minify** tab: Monaco editor (or CodeMirror for lighter weight) with syntax highlighting; toggle between 2-space indent and minified; copy button
- [ ] Implement **JSONPath Query** tab: text input for JSONPath expression; real-time query results shown below; results are copyable as JSON; show query error if invalid
- [ ] Install `jsonpath-plus` package for JSONPath evaluation (client-side)
- [ ] Implement **Schema** tab: infer JSON Schema from the input using `generate-schema` or hand-rolled inference; display as formatted JSON; copyable
- [ ] Show "Invalid JSON" error with the parse error message and line/col position highlighted
- [ ] Show JSON stats in the header: key count at root, total key count, nesting depth, array lengths
- [ ] Write unit tests `src/__tests__/devlens/views/json.test.ts`

### D3 · Base64 Specialist View

- [ ] Create `src/components/devlens/views/Base64View.tsx`
- [ ] Implement decode: `atob()` with error handling; display decoded text with charset detection hint
- [ ] Detect if decoded content is: plain text, JSON (offer "View as JSON" button), HTML, binary (show hex dump preview)
- [ ] If input is a `data:` URL: extract MIME type, render image inline using `<img src={input} />` if image MIME; show PDF viewer hint if `application/pdf`
- [ ] Implement encode tab: textarea input → base64 encoded output; copy button
- [ ] Implement encode file: drag-and-drop or file picker → converts file to base64 data URL; useful for embedding images in CSS/HTML
- [ ] Show decoded byte length vs encoded length; explain the ~33% size overhead
- [ ] Write unit tests

### D4 · URL-Encoded String Specialist View

- [ ] Create `src/components/devlens/views/UrlEncodedView.tsx`
- [ ] Detect if input is a full URL or just a query string
- [ ] If full URL: parse with `URL` API; show protocol, hostname, pathname, search params table, hash
- [ ] If query string: parse with `URLSearchParams`; render as two-column table (key | decoded value)
- [ ] Each param row: show raw encoded value + decoded value side by side; copy decoded button
- [ ] Detect and flag double-encoded values (e.g., `%2520` → `%20` → ` `)
- [ ] Implement encode tab: key-value editor → generates URL-encoded query string; copy button
- [ ] Write unit tests

### D5 · Unix Timestamp Specialist View

- [ ] Create `src/components/devlens/views/TimestampView.tsx`
- [ ] Auto-detect seconds (10 digits) vs milliseconds (13 digits) vs microseconds (16 digits)
- [ ] Display the date in a grid of timezones: UTC, US/Eastern, US/Pacific, Europe/London, Europe/Berlin, Asia/Kolkata, Asia/Tokyo, Australia/Sydney
- [ ] Show "X days ago" / "in X days" relative time; update every second for recent timestamps
- [ ] Show ISO 8601 string, RFC 2822 string, Unix seconds, Unix milliseconds — all copyable
- [ ] Implement "Convert a date" reverse direction: date-time picker → shows Unix timestamp output
- [ ] Write unit tests

### D6 · UUID Specialist View

- [ ] Create `src/components/devlens/views/UuidView.tsx`
- [ ] Detect UUID version (1, 3, 4, 5, 7) from the version nibble
- [ ] For v1: decode the embedded timestamp; show as human-readable date; show MAC address hint
- [ ] For v4: confirm it's random; show entropy bits
- [ ] For v7: decode the Unix timestamp milliseconds from bits 0-47
- [ ] Show variant (RFC 4122 vs Microsoft GUID)
- [ ] Add "Generate new UUID v4" and "Generate new UUID v7" buttons (using `crypto.randomUUID()`)
- [ ] Write unit tests

### D7 · IP Address Specialist View

- [ ] Create `src/components/devlens/views/IpView.tsx`
- [ ] Install `ip-cidr` or implement CIDR math manually (small, no dep)
- [ ] Bundle a compact IP geolocation database: use `@maxmind/geoip2-node` with a bundled MaxMind GeoLite2 City MMDB, or use `ip-location-db` (CC0 licensed CSV converted to compact binary at build time) — evaluate bundle size impact; target < 2MB
- [ ] For IPv4: show class (A/B/C/D/E), private/public/loopback/reserved status, geolocation (country, region, city), reverse DNS hint
- [ ] For CIDR notation: show network address, broadcast address, first/last usable host, total host count
- [ ] For IPv6: show full expanded form, compressed form, type (global unicast, link-local, loopback, etc.)
- [ ] Write unit tests

### D8 · Hex Color Specialist View

- [ ] Create `src/components/devlens/views/ColorView.tsx`
- [ ] Show a large color swatch
- [ ] Convert and display: HEX, RGB, HSL, HSV, OKLCH
- [ ] Show the closest named CSS color
- [ ] Show WCAG contrast ratio against white and black backgrounds; label AA/AAA pass/fail for normal and large text
- [ ] Show a tint/shade palette: 9 lighter shades and 9 darker shades; each swatch is copyable
- [ ] Implement color picker input (native `<input type="color">`) for live editing
- [ ] Write unit tests for color conversion math

### D9 · Regex Specialist View

- [ ] Create `src/components/devlens/views/RegexView.tsx`
- [ ] Parse the regex input: support both `/pattern/flags` format and raw pattern with separate flags input
- [ ] Implement **Test** tab: multiline textarea for test string; highlight all matches inline with different colors per capture group; show match count in header
- [ ] Show match table: match index, full match, captured groups (named and positional)
- [ ] Implement **Explain** tab: tokenize the regex using `regexp-tree` or `regexpp` package; for each token, show a human-readable explanation (e.g., `\d` → "any digit 0-9", `{2,4}` → "between 2 and 4 times", `(?=...)` → "positive lookahead: the following must be present")
- [ ] Install `regexpp` (used by ESLint, well-maintained, tree-shakeable)
- [ ] Implement **Replace** tab: replacement string input; show live replacement result
- [ ] Show regex flags toggle: g, i, m, s, u, v — each toggleable; update test results live
- [ ] Show "Invalid regex" error state with the JS engine's error message
- [ ] Write unit tests for the explanation engine

### D10 · YAML Specialist View

- [ ] Create `src/components/devlens/views/YamlView.tsx`
- [ ] Install `js-yaml` package
- [ ] Parse YAML; show validation error with line number if invalid
- [ ] Convert to JSON (pretty-printed) with copy button — primary view
- [ ] Show YAML stats: top-level keys, nesting depth
- [ ] Add "Convert JSON → YAML" reverse direction tab
- [ ] Write unit tests

### D11 · XML Specialist View

- [ ] Create `src/components/devlens/views/XmlView.tsx`
- [ ] Parse using native `DOMParser` API (zero dependency)
- [ ] Show **Tree view**: recursive collapsible tree of elements, attributes, text nodes
- [ ] Implement **XPath query** tab: text input for XPath expression; evaluate using `document.evaluate()`; show matching nodes count and values
- [ ] Show **Prettify** tab: properly indented XML with syntax highlighting; copy button
- [ ] Show parse error with line/col if invalid XML
- [ ] Write unit tests

### D12 · CSV / TSV Specialist View

- [ ] Create `src/components/devlens/views/CsvView.tsx`
- [ ] Install `papaparse` for robust CSV parsing (handles quotes, newlines in fields, etc.)
- [ ] Auto-detect delimiter (comma, semicolon, tab, pipe) based on consistency across first 5 rows
- [ ] Render **Table view**: virtualized table (use `@tanstack/react-virtual` for large files) with sticky header row; sortable by clicking column header; show row/column counts
- [ ] Implement column type inference: detect numeric, date, boolean, text columns; show type indicator in column header
- [ ] For numeric columns: show sparkline chart (min/max/mean) inline in the column header using a tiny SVG sparkline (no chart library dep)
- [ ] Implement **Filter** row: per-column text filter inputs below header
- [ ] Implement **Export** tab: download as JSON array, JSON array of objects, or re-download as cleaned CSV
- [ ] Write unit tests for parsing and type inference

### D13 · Environment File Specialist View

- [ ] Create `src/components/devlens/views/EnvView.tsx`
- [ ] Parse `.env` format: handle comments (`#`), quoted values, multiline values (backslash continuation)
- [ ] Render as two-column table: key | value; values masked by default (show `••••••`) with per-row reveal toggle
- [ ] Show "Reveal all" / "Mask all" global toggle
- [ ] Allow inline editing of values; show diff indicator if value changed from input
- [ ] Implement **Compare** tab: paste a second `.env` file; show three-column diff: key, file A value, file B value; highlight keys present in only one file, and keys with different values
- [ ] Export tab: download as `.env` or `.env.local` format; download as JSON (for loading into secrets manager)
- [ ] Write unit tests for parsing edge cases

### D14 · Cron Expression Specialist View

- [ ] Create `src/components/devlens/views/CronView.tsx`
- [ ] Install `croner` package (supports standard 5-field and extended 6-field cron, no Node.js deps, works in browser)
- [ ] Show human-readable description of the cron expression (e.g., "Every Monday at 9:00 AM")
- [ ] Show next 15 trigger times in a list (in UTC and user's local timezone)
- [ ] Show "time until next trigger" countdown
- [ ] Implement visual cron builder: 5 field inputs (minute, hour, day, month, weekday) with dropdowns for common values; updates the expression string in real-time
- [ ] Show "Invalid cron expression" error state
- [ ] Write unit tests

### D15 · SQL Specialist View

- [ ] Create `src/components/devlens/views/SqlView.tsx`
- [ ] Install `sql-formatter` package for formatting
- [ ] Format the SQL with proper indentation and capitalization; show in syntax-highlighted code block
- [ ] Show query type badge: SELECT / INSERT / UPDATE / DELETE / DDL
- [ ] For SELECT: show table names referenced, column names, WHERE conditions, JOINs — all as a structured breakdown
- [ ] Implement dialect selector: MySQL, PostgreSQL, SQLite, BigQuery — changes formatting rules
- [ ] Write unit tests

### D16 · PEM Certificate Specialist View

- [ ] Create `src/components/devlens/views/PemView.tsx`
- [ ] Install `pkijs` and `asn1js` packages (pure JS, browser-compatible ASN.1/PKI parsing)
- [ ] Parse X.509 certificate fields: Subject, Issuer, Serial Number, Validity (Not Before / Not After), Public Key Algorithm, Key Size, Signature Algorithm, Subject Alternative Names (SANs), Key Usage, Extended Key Usage, Basic Constraints
- [ ] Show "Expires in X days" / "Expired X days ago" countdown with color coding
- [ ] Show fingerprint (SHA-256) computed client-side
- [ ] Show whether it's a Root CA, Intermediate CA, or End-Entity certificate
- [ ] For private keys: show key type and bit length only — never show the key material in plain text without explicit user action
- [ ] Write unit tests

---

## TRACK E — DevLens: Tool Landing Pages (SEO)

> Each DevLens tool gets a rich `/tools/{slug}` page that embeds the tool and provides substantial educational content. These pages drive organic traffic.

### E1 · Shared Landing Page Template

- [ ] Create `src/components/devlens/ToolLandingLayout.tsx` — reusable layout: hero with tool title + description, inline embedded tool, "How it works" section, educational content slot, FAQ slot, related tools section
- [ ] Create `src/components/devlens/InlineTool.tsx` — renders the relevant specialist view with a paste input directly on the landing page (not requiring navigation to `/studio`)
- [ ] Create `src/lib/devlens/toolMeta.ts` — registry of all DevLens tool metadata: slug, title, description, targetKeywords, faqs, relatedSlugs
- [ ] Implement JSON-LD `FAQPage` structured data block on each landing page
- [ ] Implement JSON-LD `SoftwareApplication` structured data on each landing page

### E2 · JWT Decoder Landing Page

- [ ] Create `src/app/tools/jwt-decoder/page.tsx`
- [ ] Write full educational content: what is a JWT, the three-part structure, signing algorithms, security pitfalls (alg:none attack, key confusion), when to use each algorithm
- [ ] Write FAQ: "Is my JWT sent to your server?", "How do I validate a JWT?", "What does the exp claim mean?", etc.
- [ ] Target keywords in content naturally: "decode jwt online", "jwt token debugger", "jwt claims explained", "decode jwt without secret"

### E3 · JSON Query Tool Landing Page

- [ ] Create `src/app/tools/json-query/page.tsx`
- [ ] Write full educational content: JSON syntax, JSONPath syntax guide with examples, common JSON errors and how to fix them
- [ ] Target keywords: "jsonpath online tester", "query json online", "json formatter", "json to table online", "json validator"

### E4 · Regex Tester Landing Page

- [ ] Create `src/app/tools/regex-tester/page.tsx`
- [ ] Write full educational content: regex syntax guide for all major token types, common patterns (email, URL, date, phone), flag explanations, lookahead/lookbehind guide
- [ ] Target keywords: "regex tester online", "test regular expression", "regex debugger", "regex explained"

### E5 · Unix Timestamp Converter Landing Page

- [ ] Create `src/app/tools/timestamp-converter/page.tsx`
- [ ] Write educational content: what is Unix epoch time, why milliseconds vs seconds, timezone gotchas
- [ ] Target keywords: "unix timestamp converter", "epoch time to date", "timestamp to human readable date"

### E6 · Base64 Encoder/Decoder Landing Page

- [ ] Create `src/app/tools/base64/page.tsx`
- [ ] Write educational content: what is Base64, when it's used (JWT, data URLs, email attachments), size overhead, URL-safe vs standard alphabet
- [ ] Target keywords: "base64 decode online", "base64 encoder decoder", "decode base64 string"

### E7 · Environment File Editor Landing Page

- [ ] Create `src/app/tools/env-file-editor/page.tsx`
- [ ] Write educational content: .env file format spec, security best practices, .env vs .env.local vs .env.production
- [ ] Target keywords: "env file editor online", "compare env files", ".env file formatter"

### E8 · URL Decoder Landing Page

- [ ] Create `src/app/tools/url-decoder/page.tsx`
- [ ] Write educational content: percent encoding spec, common encoded characters, when to URL encode
- [ ] Target keywords: "url decoder online", "url encode decode", "percent decode url"

### E9 · UUID Generator/Inspector Landing Page

- [ ] Create `src/app/tools/uuid/page.tsx`
- [ ] Write educational content: UUID versions, v4 vs v7, ULID comparison, monotonicity for DB primary keys
- [ ] Target keywords: "uuid generator online", "uuid v4 vs v7", "inspect uuid version"

### E10 · Color Tools Landing Page

- [ ] Create `src/app/tools/color/page.tsx`
- [ ] Write educational content: hex vs RGB vs HSL, WCAG contrast requirements, OKLCH for perceptual uniformity
- [ ] Target keywords: "hex to rgb converter", "color contrast checker", "hex color inspector"

### E11 · Cron Expression Builder Landing Page

- [ ] Create `src/app/tools/cron/page.tsx`
- [ ] Write educational content: cron syntax, 5 vs 6 field formats, common patterns, timezone behaviour
- [ ] Target keywords: "cron expression builder", "cron tester online", "cron schedule visualizer"

### E12 · Certificate Inspector Landing Page

- [ ] Create `src/app/tools/certificate-inspector/page.tsx`
- [ ] Write educational content: X.509 structure, certificate chain, TLS SNI, common validation errors
- [ ] Target keywords: "x509 certificate decoder online", "pem certificate viewer", "ssl certificate inspector"

---

## TRACK F — DevLens: Programmatic SEO Pages

> Statically generated pages at scale. Each page is tiny, fast, and targets one specific long-tail query.

### F1 · JWT Claims Reference Pages

- [ ] Create `src/data/jwtClaims.ts` — data file with entries for ~35 standard claims (IANA JWT Claims registry): id, name, fullName, description, type, example, securityNote, rfcLink
- [ ] Create `src/app/jwt/claims/[claim]/page.tsx` — dynamic static page using `generateStaticParams()` from `jwtClaims.ts`
- [ ] Each page: claim name, description, example JWT with that claim highlighted, security implications, link to JWT Decoder tool
- [ ] Create `src/app/jwt/claims/page.tsx` — index page listing all claims (links to individual pages)
- [ ] Add all claim pages to sitemap generation

### F2 · Regex Patterns Library Pages

- [ ] Create `src/data/regexPatterns.ts` — data file with ~80 common named patterns: slug, name, pattern, flags, description, testExamples (passing and failing), use cases
- [ ] Create `src/app/regex/patterns/[slug]/page.tsx` — dynamic static page per pattern; shows the pattern, explanation, test examples, link to Regex Tester pre-loaded with this pattern
- [ ] Create `src/app/regex/patterns/page.tsx` — index/library page with search filter
- [ ] Add all pattern pages to sitemap

### F3 · AWS Calculator SEO Pages

- [ ] Create `src/data/calculatorPages.ts` — data for ~35 programmatic pages: one per EC2 instance family, plus Lambda, S3, RDS tiers
- [ ] Create `src/app/calculators/[service]/page.tsx` — static page per service with: pricing table, explanation of cost components, the ArchCost canvas pre-loaded with that service node
- [ ] Create `src/app/calculators/page.tsx` — index page linking to all calculator pages
- [ ] Add all calculator pages to sitemap

### F4 · Architecture Template Pages

- [ ] Create `src/data/architectureTemplates.ts` — data for ~20 architecture templates: slug, name, description, estimatedCost, nodes[], edges[], tags[]
- [ ] Create `src/app/architectures/[slug]/page.tsx` — static page per template: description, cost breakdown table, the ArchCost canvas pre-loaded with the template, share button
- [ ] Create `src/app/architectures/page.tsx` — browsable template gallery
- [ ] Add all architecture pages to sitemap

---

## TRACK G — ArchCost Canvas: UX Overhaul

> Fix all the blocking UX issues. Nothing ships to users until these are done.

### G1 · Undo / Redo

- [ ] Implement undo/redo middleware in `useArchitectureStore.ts` using the temporal middleware pattern from `zundo` package (or implement manually with a history stack)
- [ ] Install `zundo` (Zustand undo/redo middleware, tiny)
- [ ] Every node add, delete, move, config change, edge add/delete — must push to history
- [ ] Wire `Cmd+Z` / `Ctrl+Z` → undo; `Cmd+Shift+Z` / `Ctrl+Y` → redo
- [ ] Add undo/redo buttons to the canvas toolbar with keyboard shortcut tooltips
- [ ] Limit history stack to 50 entries to keep memory bounded

### G2 · Multi-Select & Batch Operations

- [ ] Enable ReactFlow's built-in multi-select (shift+click nodes, drag-select)
- [ ] Add "Delete selected" support: `Delete` / `Backspace` key removes all selected nodes and their connected edges
- [ ] Add "Duplicate selected" support: `Cmd+D` duplicates selected nodes, offset by (20, 20)px
- [ ] Add group bounding box: when 2+ nodes are selected, show a dashed selection box around them

### G3 · Keyboard Shortcuts

- [ ] `Delete` / `Backspace` — delete selected nodes/edges
- [ ] `Cmd/Ctrl+A` — select all nodes
- [ ] `Cmd/Ctrl+C` / `Cmd/Ctrl+V` — copy/paste selected nodes (new IDs, offset position)
- [ ] `Cmd/Ctrl+D` — duplicate selected
- [ ] `Cmd/Ctrl+Z` / `Cmd/Ctrl+Shift+Z` — undo/redo
- [ ] `Escape` — deselect all / close open panels
- [ ] Arrow keys — nudge selected node(s) by 10px; `Shift+Arrow` nudge by 50px
- [ ] `Space+drag` — pan canvas (in addition to middle-click pan)
- [ ] `?` — open keyboard shortcuts reference modal
- [ ] Build `src/components/canvas/KeyboardShortcutsModal.tsx` listing all shortcuts
- [ ] Build `src/hooks/useCanvasKeyboard.ts` — single hook registering all keyboard handlers on the canvas

### G4 · Right-Click Context Menu

- [ ] Build `src/components/canvas/ContextMenu.tsx` — positioned absolutely at cursor; closes on outside click or Escape
- [ ] Context menu on node right-click: "Edit config", "Duplicate", "Copy", "Delete", "Add annotation"
- [ ] Context menu on canvas background right-click: "Paste" (if clipboard has copied nodes), "Fit view", "Add service [submenu]"
- [ ] Wire context menu to ReactFlow's `onNodeContextMenu` and `onPaneContextMenu` events

### G5 · Node Alignment & Snap

- [ ] Enable ReactFlow's snap-to-grid: 20px grid; toggle via toolbar button
- [ ] Add alignment guide lines: when dragging a node, show dynamic guide lines when the node's center or edge aligns with another node's center or edge (implement as SVG overlays during drag)
- [ ] Add toolbar buttons: "Align left", "Align center horizontal", "Align right", "Align top", "Align center vertical", "Align bottom" — apply to all selected nodes
- [ ] Add "Distribute horizontally" and "Distribute vertically" buttons — equal spacing between selected nodes

### G6 · Canvas Toolbar

- [ ] Build `src/components/canvas/CanvasToolbar.tsx` — positioned at top of canvas, above the ReactFlow pane
- [ ] Toolbar items: Undo | Redo | divider | Select All | Delete Selected | Duplicate | divider | Align tools (dropdown) | divider | Snap Grid toggle | divider | Fit View | divider | Share | Export (dropdown) | divider | Clear Canvas
- [ ] Keyboard shortcut tooltip on hover for each button
- [ ] Show node count and total cost in the toolbar right section (mobile: hide alignment tools, keep cost + share)

### G7 · Annotation Nodes (Sticky Notes)

- [ ] Create `src/components/canvas/nodes/AnnotationNode.tsx` — resizable sticky note with editable text; yellow/blue/gray color variants; no cost contribution
- [ ] Add "Annotation" as a draggable item in the sidebar
- [ ] Double-click annotation to edit; click outside to save
- [ ] Include annotations in exports (PNG, PDF)

### G8 · Shareable Architecture URLs (No DB — URL params)

- [ ] Implement "Share via URL" using compressed URL params: serialize `{nodes, edges}` to JSON → compress with `fflate` → base64url encode → append as `?arch=` query param
- [ ] Implement deserialize: on page load, if `?arch=` param exists, decode and load into canvas
- [ ] Add "Copy share link" button to toolbar — copies current URL with `?arch=` param; show "Copied!" feedback
- [ ] Cap the serialized+compressed payload at 8KB to stay within URL length limits; if exceeded, show "Architecture too large for URL sharing — save to get a short link" prompt
- [ ] Shared URLs are read-only by default; show a "Fork to edit" banner at the top when loading a shared architecture

### G9 · Saved Architecture Short URLs (Turso DB)

- [ ] Create `src/app/api/architectures/route.ts` — POST endpoint: receives `{data: string}` (already compressed), inserts into Turso `architectures` table with nanoid, returns `{id, url}`
- [ ] Create `src/app/api/architectures/[id]/route.ts` — GET endpoint: fetches by id, increments `view_count`, returns `{data}`
- [ ] Create `src/app/shared/[id]/page.tsx` — server component: fetches architecture data server-side and passes to `ArchitectureCanvas` as `initialTemplate`; sets appropriate OG meta tags (title: "Architecture shared on ArchCost")
- [ ] Add "Save & get short link" option to the Share flow in the toolbar (only if URL param payload > 4KB)
- [ ] Rate limit the POST endpoint: max 10 saves per IP per hour (use Vercel's `@upstash/ratelimit` or a simple in-memory + cookie approach)

---

## TRACK H — ArchCost: Expanded AWS Services

> Grow from 6 to 40+ services. Each service needs: pricing config, node config UI, and pricing engine logic.

### H1 · Service Configuration Schema

- [ ] Create `src/types/infra.ts` — define `ServiceConfig` type: `{ service: string; displayName: string; category: string; icon: string; configSchema: ConfigField[]; defaultConfig: Record<string, unknown> }`
- [ ] Create `src/types/configField.ts` — define `ConfigField` union type: `{ type: 'select' | 'number' | 'toggle' | 'slider'; key: string; label: string; options?: string[]; min?: number; max?: number; step?: number; unit?: string; helpText?: string }`
- [ ] Migrate EC2, RDS, S3, Lambda, CloudFront, ALB existing configs to new schema
- [ ] Create `src/data/serviceRegistry.ts` — master registry of all services mapping to their `ServiceConfig`

### H2 · New Compute Services

- [ ] **ECS Fargate**: config fields: vCPU (0.25–16), memory GB, task count, hours/month; pricing: per vCPU-hour + per GB-hour
- [ ] **EKS**: config: node count, instance type, cluster hours; pricing: $0.10/cluster/hour + EC2 node costs
- [ ] **Lightsail**: config: plan selector (dropdown of $3.50–$160/month plans); pricing: flat plan rate
- [ ] **Elastic Beanstalk**: no additional cost (just EC2/RDS underneath); show informational node with "No additional charge" badge
- [ ] **Batch**: config: vCPU-hours, job type (on-demand/spot); pricing: EC2 on-demand or spot rates

### H3 · New Database Services

- [ ] **DynamoDB**: config: read capacity units (RCU), write capacity units (WCU), storage GB, mode (provisioned/on-demand); pricing: $0.00013/RCU-hour, $0.00065/WCU-hour, $0.25/GB-month
- [ ] **ElastiCache**: config: node type, node count, engine (Redis/Memcached); pricing: per node-hour rates
- [ ] **DocumentDB**: config: instance class, instance count, storage GB; pricing: per instance-hour + storage
- [ ] **Neptune**: config: instance class, storage GB; pricing: per instance-hour + I/O + storage
- [ ] **Aurora Serverless v2**: config: min/max ACU, storage GB, I/O requests; pricing: per ACU-hour (0.12)
- [ ] **Timestream**: config: memory store GB, magnetic store GB, write records/million; pricing: per GB + per million writes

### H4 · New Storage Services

- [ ] **EFS**: config: storage class (Standard/IA), size GB, throughput mode; pricing: standard $0.30/GB, IA $0.025/GB
- [ ] **EBS**: config: volume type (gp3/gp2/io1/io2/st1/sc1), size GB, IOPS (for io1/io2); pricing: per GB-month rates per type
- [ ] **Glacier / S3 Glacier Instant**: config: storage GB, retrieval requests; pricing: $0.004/GB storage + retrieval fees
- [ ] **FSx for Windows / Lustre**: config: storage capacity, throughput capacity; pricing: per GB-month + throughput
- [ ] **Storage Gateway**: informational node

### H5 · New Networking Services

- [ ] **NLB**: config: hours/month, LCU count; pricing: $0.008/LCU-hour + $0.0225/hour fixed
- [ ] **API Gateway (REST)**: config: API calls/million, data transfer GB, caching GB; pricing: $3.50/million calls
- [ ] **API Gateway (HTTP)**: config: API calls/million; pricing: $1.00/million first 300M, $0.90/million next
- [ ] **Route 53**: config: hosted zones, queries/million, health checks; pricing: $0.50/zone, $0.40/million queries
- [ ] **NAT Gateway**: config: hours/month, data processed GB; pricing: $0.045/hour + $0.045/GB
- [ ] **VPC PrivateLink**: config: endpoints, data processed GB; pricing: $0.01/hour/endpoint + $0.01/GB
- [ ] **Global Accelerator**: config: hours, data transfer GB; pricing: $0.025/hour + $0.015-0.08/GB
- [ ] **Data Transfer node** (special): a virtual node representing outbound data transfer; config: GB/month, destination (internet/region/CDN); pricing: tier-based ($0.09/GB first 10TB, etc.) — this is the "hidden cost" node most people forget

### H6 · New Messaging Services

- [ ] **SQS**: config: requests/million, message size KB, FIFO toggle; pricing: standard $0.40/million, FIFO $0.50/million
- [ ] **SNS**: config: notifications/million, protocol (HTTP/email/SMS/SQS); pricing: per notification per protocol
- [ ] **EventBridge**: config: events/million, event bus type; pricing: $1.00/million custom events
- [ ] **Kinesis Data Streams**: config: shard count, hours/month, data retrieval GB; pricing: $0.015/shard-hour
- [ ] **Kinesis Firehose**: config: data ingested GB; pricing: $0.029/GB first 500TB
- [ ] **MSK (Managed Kafka)**: config: broker type, broker count; pricing: per broker-hour rates

### H7 · New AI/ML Services

- [ ] **Bedrock**: config: model selector (Claude 3.5 Sonnet, GPT-4o equivalent tiers, Llama), input tokens/million, output tokens/million; pricing: per-token rates per model
- [ ] **SageMaker endpoints**: config: instance type, hours/month; pricing: ml.\* instance rates
- [ ] **Textract**: config: pages/thousand, feature (basic/tables/forms); pricing: per-page rates
- [ ] **Rekognition**: config: images/thousand, video minutes; pricing: per-image/per-minute rates
- [ ] **Transcribe**: config: minutes/month; pricing: $0.024/minute standard
- [ ] **Polly**: config: characters/million; pricing: $4/million standard, $16/million neural

### H8 · New Dev Tools & Observability

- [ ] **CloudWatch Metrics**: config: custom metrics count, API requests/million; pricing: $0.30/metric/month + API costs
- [ ] **CloudWatch Logs**: config: ingestion GB, storage GB, insights queries GB; pricing: $0.50/GB ingestion, $0.03/GB storage
- [ ] **CloudWatch Alarms**: config: alarm count; pricing: $0.10/alarm/month
- [ ] **Secrets Manager**: config: secret count, API calls/10k; pricing: $0.40/secret/month
- [ ] **KMS**: config: CMK count, API requests/10k; pricing: $1.00/key/month
- [ ] **CodeBuild**: config: build minutes/month, compute type; pricing: per build-minute rates
- [ ] **CodePipeline**: config: active pipeline count; pricing: $1.00/active pipeline/month
- [ ] **X-Ray**: config: traces/million; pricing: $5.00/million traces recorded
- [ ] **WAF**: config: web ACLs, rules, requests/million; pricing: $5.00/ACL + $1.00/rule + $0.60/million requests
- [ ] **Shield Standard**: informational (free)
- [ ] **Shield Advanced**: config: toggle; pricing: $3,000/month fixed

### H9 · Data Transfer Pricing Between Nodes

- [ ] Implement edge-level data transfer pricing: when a user draws an edge between Node A and Node B, the canvas detects the service types and shows a data transfer cost tooltip on the edge
- [ ] Build `src/lib/archcost/dataTransferPricing.ts` — `getTransferCost(from: InfraService, to: InfraService, gbPerMonth: number): number` function with rules: same-region EC2↔EC2: free; EC2→internet: tiered; EC2→S3 same region: free; EC2→CloudFront: free; across regions: $0.02/GB
- [ ] Add a `gbPerMonth` config field to edges (editable via edge click)
- [ ] Include edge transfer costs in total cost calculation
- [ ] Show "hidden costs" warning badge on canvas if there are edges with non-zero transfer costs that the user hasn't configured

### H10 · Pricing Display Enhancements

- [ ] Add On-demand vs Reserved (1yr, 3yr) toggle to compute nodes (EC2, RDS, ElastiCache): show cost for each tier; reserved shows savings % vs on-demand
- [ ] Add Spot pricing option for EC2: show spot price with "~X% cheaper, but interruptible" label
- [ ] Add Free Tier awareness: if a node's config is within AWS free tier limits, show a green "Free Tier" badge; show what the cost would be after free tier expires
- [ ] Build cost breakdown pie chart in Sidebar: using a pure SVG pie chart (no chart lib dep); slices per service category; hover shows category total
- [ ] Add regional pricing toggle: sidebar dropdown to select AWS region; prices update to reflect that region's rates (from `awsPricing.generated.json`)
- [ ] Show "Estimated annual cost" alongside monthly cost in sidebar

---

## TRACK I — ArchCost: Export & Share Features

### I1 · Export to PNG

- [ ] Implement canvas-to-PNG using ReactFlow's `toSvg()` then canvas-based PNG conversion
- [ ] Include: all nodes with current config, all edges, annotations, cost summary box in bottom-right corner
- [ ] Filename: `architecture-{timestamp}.png`
- [ ] Add "Export PNG" button to canvas toolbar export dropdown

### I2 · Export to PDF

- [ ] Implement PDF export using `jspdf` (browser-compatible, no server needed)
- [ ] Page 1: architecture diagram (the PNG exported above, fitted to page)
- [ ] Page 2: cost breakdown table — service name, config summary, monthly cost
- [ ] Page 3: data transfer costs table
- [ ] Include total monthly and annual cost on both pages
- [ ] Filename: `architecture-cost-estimate-{timestamp}.pdf`
- [ ] Add "Export PDF" to toolbar export dropdown

### I3 · Export to CSV

- [ ] Export cost breakdown as CSV: columns: Service, Node Label, Config Summary, Monthly Cost (USD), Annual Cost (USD)
- [ ] Include a summary row at bottom: Total Monthly, Total Annual
- [ ] Filename: `cost-breakdown-{timestamp}.csv`
- [ ] Add "Export CSV" to toolbar export dropdown

### I4 · Cost Comparison Mode

- [ ] Add "Compare" button to toolbar: splits the canvas viewport into two side-by-side panes, each with an independent canvas and its own total cost display
- [ ] Show a cost difference banner between the two totals: "Option B saves $X/month ($Y/year)"
- [ ] Both panes are fully independent: their own undo/redo, their own node sets
- [ ] Allow importing an existing canvas to either pane
- [ ] "Exit comparison" button returns to single canvas mode

---

## TRACK J — Sitemap, SEO Infrastructure & Analytics

### J1 · Sitemap Generation

- [ ] Update `scripts/update-sitemap.ts` to generate entries for: `/`, `/studio`, `/canvas`, all `/tools/*` pages, all `/jwt/claims/*` pages, all `/regex/patterns/*` pages, all `/calculators/*` pages, all `/architectures/*` pages
- [ ] Set `changefreq` and `priority` appropriately: homepage high priority, tool pages medium, programmatic pages low
- [ ] Auto-run sitemap update as part of `next build` via `next.config.mjs` `onBuildComplete` or a `postbuild` npm script
- [ ] Submit updated sitemap to Google Search Console programmatically via IndexNow after each build

### J2 · Metadata & Open Graph

- [ ] Ensure every page has unique `<title>`, `<meta name="description">`, `<link rel="canonical">` — audit all new pages
- [ ] Add OG image generation using Next.js `ImageResponse` (Edge runtime, no extra service): dynamic OG images for tool pages showing the tool name and a preview graphic
- [ ] Add OG image for shared architecture URLs: show architecture name and cost estimate on the OG card
- [ ] Add Twitter Card meta tags to all pages

### J3 · Analytics (Privacy-Respecting)

- [ ] Integrate Plausible Analytics (or Umami self-hosted): a single script tag, no cookies, GDPR-compliant, does not compromise the "zero data to server" brand promise
- [ ] Track key events: `smart_paste_used` (with detected type), `tool_landing_viewed`, `canvas_node_added` (with service type), `architecture_shared`, `export_used` (with format)
- [ ] Add event tracking calls in the relevant components
- [ ] No PII in any event payload — only tool slugs, service names, export formats

---

## TRACK K — Testing

### K1 · Unit Tests

- [ ] `src/__tests__/devlens/detector.test.ts` — 18 data types + edge cases (as noted in C1)
- [ ] `src/__tests__/devlens/views/jwt.test.ts` — decode, claim explanations, expiry states
- [ ] `src/__tests__/devlens/views/json.test.ts` — parse, tree, JSONPath
- [ ] `src/__tests__/devlens/views/csv.test.ts` — delimiter detection, type inference
- [ ] `src/__tests__/devlens/views/timestamp.test.ts` — seconds vs ms detection, timezone display
- [ ] `src/__tests__/devlens/views/regex.test.ts` — explanation engine token coverage
- [ ] `src/__tests__/archcost/pricingEngine.test.ts` — all 40+ service calculators
- [ ] `src/__tests__/archcost/dataTransfer.test.ts` — all node-pair transfer cost rules
- [ ] `src/__tests__/utils/compress.test.ts` — compress/decompress round-trip, large payloads
- [ ] `src/__tests__/utils/nanoid.test.ts` — uniqueness, length

### K2 · E2E Tests (Playwright)

- [ ] `e2e/core-pages.spec.ts` — update: verify `/`, `/studio`, `/canvas`, `/tools/jwt-decoder` all load without console errors
- [ ] `e2e/devlens-smart-paste.spec.ts` — paste JWT → verify JWT view renders; paste JSON → verify JSON view; paste invalid → verify unknown view
- [ ] `e2e/archcost-canvas.spec.ts` — drag EC2 node → verify it appears; configure instance type → verify cost updates; undo → verify node removed
- [ ] `e2e/archcost-share.spec.ts` — build small architecture → share → navigate to shared URL → verify canvas loads correctly
- [ ] `e2e/archcost-export.spec.ts` — build architecture → export CSV → verify download occurs
- [ ] `e2e/seo-metadata.spec.ts` — verify each tool landing page has unique title, description, canonical, JSON-LD

### K3 · Performance Tests

- [ ] Update `scripts/performance-gates.ts` to test new pages: `/studio`, `/canvas`, `/tools/jwt-decoder`
- [ ] Assert: LCP < 2.5s, TTFB < 100ms, no render-blocking resources on tool landing pages
- [ ] Assert: WASM libraries are NOT loaded on initial page load (only after first paste/interaction)

---

## TRACK L — Documentation & Launch

### L1 · Developer Documentation

- [ ] Update `README.md`: new product description (DevLens + ArchCost), updated setup instructions, new npm scripts reference, architecture overview
- [ ] Update `CONTRIBUTING.md`: how to add a new DevLens specialist view, how to add a new ArchCost service
- [ ] Add `docs/ADDING_A_DEVLENS_VIEW.md`: step-by-step guide for adding new specialist view (for open source contributors)
- [ ] Add `docs/ADDING_AN_ARCHCOST_SERVICE.md`: step-by-step guide for adding new AWS service node

### L2 · Launch Preparation

- [ ] Prepare Product Hunt launch assets: tagline, description, screenshots of Smart Paste in action, GIF demo of ArchCost drag-and-drop + live cost update
- [ ] Write "Show HN" post draft for Hacker News: focus on the technical implementation of Smart Paste (auto-detection algorithm, WASM use, privacy architecture) — the technical angle, not the product pitch
- [ ] Prepare a 60-second screen recording demo of Smart Paste for Twitter/X
- [ ] Submit site to: Awesome lists (awesome-devtools, awesome-selfhosted candidates), Dev.to article, Hashnode article
- [ ] Create GitHub Discussions thread for community to request new data types / AWS services

---

## Completion Summary

| Track     | Area                                | Task Count     |
| --------- | ----------------------------------- | -------------- |
| A         | Codebase Cleanup                    | ~30 tasks      |
| B         | Infrastructure & Foundation         | ~30 tasks      |
| C         | DevLens Smart Paste Engine          | ~30 tasks      |
| D         | DevLens Specialist Views (16 types) | ~80 tasks      |
| E         | DevLens Tool Landing Pages          | ~25 tasks      |
| F         | Programmatic SEO Pages              | ~15 tasks      |
| G         | ArchCost Canvas UX Overhaul         | ~45 tasks      |
| H         | ArchCost 40+ AWS Services           | ~65 tasks      |
| I         | ArchCost Export & Compare           | ~15 tasks      |
| J         | Sitemap, SEO, Analytics             | ~15 tasks      |
| K         | Testing                             | ~20 tasks      |
| L         | Docs & Launch                       | ~10 tasks      |
| **Total** |                                     | **~380 tasks** |

> **Suggested starting order**: A (cleanup) → B (foundation) → G1-G3 (ArchCost UX blockers) → C (Smart Paste engine) → D1+D2 (JWT + JSON views, highest value) → H1-H2 (new services) → E1-E3 (landing pages, SEO) → remainder in parallel tracks
