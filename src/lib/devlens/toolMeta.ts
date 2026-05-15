export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  keywords: string[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
  detectionTypes: string[];
  eyebrow: string;
};

export const TOOL_META: Record<string, ToolMeta> = {
  "jwt-decoder": {
    slug: "jwt-decoder",
    title: "JWT Decoder — Decode & Inspect JSON Web Tokens Online",
    shortTitle: "JWT Decoder",
    description:
      "Decode JSON Web Tokens instantly. Inspect header, payload claims, expiry, and algorithm in your browser — no data leaves your machine.",
    longDescription:
      "JSON Web Tokens (JWTs) are used across virtually every modern authentication system. This tool decodes the base64url-encoded header and payload without any server call, highlights common claims (iss, sub, exp, iat, aud), and warns you when a token has expired. The signature is never verified here — only the structure is inspected.",
    keywords: [
      "jwt decoder",
      "decode jwt token",
      "jwt parser",
      "json web token decoder",
      "jwt claims inspector",
      "jwt header payload",
    ],
    faqs: [
      {
        question: "Is it safe to paste my JWT here?",
        answer:
          "Yes. The tool runs entirely in your browser using client-side JavaScript. Your token is never sent to any server.",
      },
      {
        question: "Can this tool verify the JWT signature?",
        answer:
          "No. Signature verification requires the secret or public key. This tool only decodes and displays the header and payload.",
      },
      {
        question: "What does 'exp' mean in a JWT?",
        answer:
          "exp is the expiration time claim — a Unix timestamp after which the token should be considered invalid. The decoder highlights it and tells you whether it has expired.",
      },
      {
        question: "What JWT algorithms are supported?",
        answer:
          "The decoder displays whatever algorithm is in the header (HS256, RS256, ES256, etc.) but does not perform algorithm-specific validation.",
      },
    ],
    relatedSlugs: ["base64", "url-decoder"],
    detectionTypes: ["jwt"],
    eyebrow: "Authentication & Identity",
  },

  "json-query": {
    slug: "json-query",
    title: "JSON Formatter & Query Tool — Pretty-print and Explore JSON",
    shortTitle: "JSON Query",
    description:
      "Format, validate, and query JSON instantly. Use JSONPath expressions to extract values, inspect structure, and get statistics — all in your browser.",
    longDescription:
      "JSON is everywhere, but raw minified JSON is nearly impossible to read. This tool pretty-prints any JSON, validates its syntax, computes structural statistics (keys, depth, array lengths), and lets you run JSONPath queries to extract exactly the data you need.",
    keywords: [
      "json formatter",
      "json viewer",
      "json query",
      "jsonpath online",
      "pretty print json",
      "json validator",
    ],
    faqs: [
      {
        question: "What is JSONPath?",
        answer:
          "JSONPath is a query language for JSON, similar to XPath for XML. For example, $.user.name extracts the name field from a user object.",
      },
      {
        question: "Does this support large JSON files?",
        answer:
          "Yes, for typical use cases. The tool processes data in your browser, so performance depends on your device.",
      },
      {
        question: "Can I format minified JSON?",
        answer:
          "Yes — paste any minified or formatted JSON and it will be pretty-printed automatically.",
      },
    ],
    relatedSlugs: ["jwt-decoder", "base64"],
    detectionTypes: ["json"],
    eyebrow: "Data & APIs",
  },

  "regex-tester": {
    slug: "regex-tester",
    title: "Regex Tester — Test & Explain Regular Expressions Online",
    shortTitle: "Regex Tester",
    description:
      "Test regex patterns live, see matches highlighted, and get plain-English explanations for each token. Supports JavaScript regex flags including g, i, m, s, u.",
    longDescription:
      "Regular expressions are powerful but notoriously hard to read. This tool gives you a live test environment with real-time match highlighting, a token-by-token explanation panel, and support for named capture groups. Great for building input validation, log parsers, or any text extraction logic.",
    keywords: [
      "regex tester",
      "regular expression tester",
      "regex online",
      "test regex javascript",
      "regex explainer",
      "regex debugger",
    ],
    faqs: [
      {
        question: "What regex flavor does this tool use?",
        answer:
          "JavaScript (ECMAScript) regex. This covers most common patterns and is compatible with Node.js, browser JS, TypeScript, and many other runtimes.",
      },
      {
        question: "What does the s flag do?",
        answer:
          "The s (dotAll) flag makes the dot . match newline characters in addition to all other characters.",
      },
      {
        question: "How do I use named capture groups?",
        answer:
          "Named capture groups use the syntax (?<name>pattern). For example, (?<year>\\d{4})-(?<month>\\d{2}) captures year and month by name.",
      },
    ],
    relatedSlugs: ["json-query", "env-file-editor"],
    detectionTypes: ["regex"],
    eyebrow: "Text & Pattern Matching",
  },

  base64: {
    slug: "base64",
    title: "Base64 Encoder & Decoder — Encode or Decode Base64 Online",
    shortTitle: "Base64",
    description:
      "Encode text to Base64 or decode Base64 strings back to text. Detects binary data, data URLs, and shows hex previews — all in your browser.",
    longDescription:
      "Base64 encoding is used everywhere from email attachments to data URIs to API tokens. This tool instantly detects whether input is already Base64-encoded and offers to decode it, or accepts plain text and encodes it. It also recognizes data URLs (data:image/png;base64,...) and shows binary hex previews.",
    keywords: [
      "base64 decoder",
      "base64 encoder",
      "decode base64 online",
      "encode base64",
      "base64 to text",
      "base64 to image",
    ],
    faqs: [
      {
        question: "What is Base64 encoding?",
        answer:
          "Base64 is a way to encode binary data as ASCII text using 64 printable characters. It adds roughly 33% overhead but makes binary safe to transmit in text-based protocols.",
      },
      {
        question: "What is the difference between Base64 and Base64url?",
        answer:
          "Base64url replaces + with - and / with _ and omits padding = characters, making the output URL-safe. JWTs use Base64url, for example.",
      },
      {
        question: "Can I decode images from Base64?",
        answer:
          "Yes. Paste a data URL like data:image/png;base64,... and the tool will detect it as an image data URL and show you its MIME type and dimensions.",
      },
    ],
    relatedSlugs: ["jwt-decoder", "url-decoder"],
    detectionTypes: ["base64", "base64-data-url"],
    eyebrow: "Encoding & Decoding",
  },

  "timestamp-converter": {
    slug: "timestamp-converter",
    title: "Unix Timestamp Converter — Convert Timestamps to Human Dates",
    shortTitle: "Timestamp Converter",
    description:
      "Convert Unix timestamps (seconds or milliseconds) to human-readable dates and times. See UTC, local time, relative time, and ISO 8601 format instantly.",
    longDescription:
      "Unix timestamps are ubiquitous in logs, databases, and APIs, but they're opaque to humans. This tool auto-detects whether your timestamp is in seconds or milliseconds, converts it to multiple formats (UTC, local, ISO 8601, relative), and also converts in reverse from a date string to a Unix timestamp.",
    keywords: [
      "unix timestamp converter",
      "timestamp to date",
      "epoch converter",
      "unix time converter",
      "milliseconds to date",
      "iso 8601 converter",
    ],
    faqs: [
      {
        question:
          "How do I know if my timestamp is in seconds or milliseconds?",
        answer:
          "Timestamps in seconds are typically 10 digits (e.g., 1700000000). Millisecond timestamps are 13 digits (e.g., 1700000000000). The tool auto-detects this.",
      },
      {
        question: "What is a Unix timestamp?",
        answer:
          "A Unix timestamp counts the number of seconds (or milliseconds) elapsed since January 1, 1970, 00:00:00 UTC, also known as the Unix epoch.",
      },
      {
        question: "What is ISO 8601 format?",
        answer:
          "ISO 8601 is an international standard for date and time representation. An example is 2024-01-15T10:30:00.000Z.",
      },
    ],
    relatedSlugs: ["jwt-decoder", "uuid"],
    detectionTypes: ["timestamp"],
    eyebrow: "Date & Time",
  },

  "url-decoder": {
    slug: "url-decoder",
    title: "URL Decoder & Encoder — Parse and Decode URL-Encoded Strings",
    shortTitle: "URL Decoder",
    description:
      "Decode percent-encoded URLs, inspect query parameters, and parse full URL structure — protocol, host, path, query, and fragment — in your browser.",
    longDescription:
      "URL encoding (percent-encoding) replaces special characters with % sequences. This tool decodes those back to readable text, parses the full URL structure, and displays each query parameter individually. Useful for debugging redirect chains, inspecting OAuth redirects, and reading analytics tracking URLs.",
    keywords: [
      "url decoder",
      "url encoder",
      "decode url online",
      "percent encoding decoder",
      "url parser",
      "query string parser",
    ],
    faqs: [
      {
        question: "What is URL encoding?",
        answer:
          "URL encoding (percent-encoding) converts characters that are not allowed in URLs into % followed by their hex ASCII code. For example, a space becomes %20.",
      },
      {
        question:
          "What is the difference between encodeURI and encodeURIComponent?",
        answer:
          "encodeURI encodes a full URL but preserves protocol, host, path separators, etc. encodeURIComponent encodes all special characters including /, ?, &, and = — it's for encoding individual parameter values.",
      },
      {
        question: "Why do some URLs contain + instead of %20?",
        answer:
          "+ is used as a space character in application/x-www-form-urlencoded encoding (HTML forms). In URL paths, %20 is standard.",
      },
    ],
    relatedSlugs: ["base64", "jwt-decoder"],
    detectionTypes: ["url"],
    eyebrow: "Web & URLs",
  },

  uuid: {
    slug: "uuid",
    title: "UUID Inspector — Decode UUID Version, Timestamp & Entropy",
    shortTitle: "UUID Inspector",
    description:
      "Inspect any UUID to reveal its version (v1, v4, v7), decode embedded timestamps in v1 and v7 UUIDs, and check the variant and node fields.",
    longDescription:
      "Not all UUIDs are random. Version 1 embeds the creation timestamp and MAC address. Version 7 (UUIDv7) embeds a millisecond Unix timestamp. This tool decodes all of that, showing you when a v1 UUID was generated, what its clock sequence is, and whether a v4 UUID's random bits look well-distributed.",
    keywords: [
      "uuid inspector",
      "uuid decoder",
      "uuid version checker",
      "uuid v1 timestamp",
      "uuid v7 decoder",
      "guid decoder",
    ],
    faqs: [
      {
        question: "What are the different UUID versions?",
        answer:
          "v1 encodes a timestamp + MAC address. v2 is DCE Security (rare). v3/v5 are name-based hashes (MD5/SHA-1). v4 is random. v7 encodes a millisecond Unix timestamp + random bits.",
      },
      {
        question: "Is UUID v4 truly random?",
        answer:
          "v4 UUIDs are randomly generated using a cryptographically secure RNG. The only fixed bits are the version (4 bits = 0100) and variant (2 bits = 10).",
      },
      {
        question: "Why use UUID v7 instead of v4?",
        answer:
          "UUIDv7 is time-ordered, which makes database inserts faster (better B-tree locality) and allows you to sort records by creation time just from the ID.",
      },
    ],
    relatedSlugs: ["timestamp-converter", "jwt-decoder"],
    detectionTypes: ["uuid"],
    eyebrow: "Identity & IDs",
  },

  color: {
    slug: "color",
    title: "Hex Color Inspector — Convert & Explore CSS Color Values",
    shortTitle: "Color Inspector",
    description:
      "Inspect any hex color code. See RGB, HSL, and OKLCH representations, luminance, contrast ratio against white/black, and accessibility warnings.",
    longDescription:
      "Hex color codes are compact but tell you nothing about the visual properties of the color. This tool converts any hex color to RGB, HSL, and OKLCH, computes its relative luminance, calculates contrast ratios against white and black, and tells you whether it passes WCAG AA or AAA accessibility standards for text.",
    keywords: [
      "hex color inspector",
      "css color converter",
      "hex to rgb",
      "hex to hsl",
      "color contrast checker",
      "wcag contrast ratio",
    ],
    faqs: [
      {
        question: "What is HSL color format?",
        answer:
          "HSL stands for Hue, Saturation, Lightness. Hue is an angle (0–360°) on the color wheel. Saturation is the color intensity (0–100%). Lightness is how light or dark the color is (0–100%).",
      },
      {
        question: "What is WCAG contrast ratio?",
        answer:
          "WCAG (Web Content Accessibility Guidelines) defines contrast ratios to ensure text is readable. AA requires 4.5:1 for normal text. AAA requires 7:1.",
      },
      {
        question: "What is OKLCH?",
        answer:
          "OKLCH is a perceptually uniform color space used in CSS Color Level 4. It represents colors as Lightness, Chroma, and Hue in a way that better matches human perception than RGB or HSL.",
      },
    ],
    relatedSlugs: ["jwt-decoder", "regex-tester"],
    detectionTypes: ["hex-color"],
    eyebrow: "Design & CSS",
  },

  cron: {
    slug: "cron",
    title: "Cron Expression Tester — Decode & Preview Cron Schedules",
    shortTitle: "Cron Tester",
    description:
      "Decode cron expressions in plain English and preview the next 10 trigger times. Supports standard 5-field cron and named presets like @daily and @weekly.",
    longDescription:
      "Cron expressions are a compact way to define recurring schedules, but reading them at a glance is not intuitive. This tool decodes each field (minute, hour, day-of-month, month, day-of-week) into human-readable descriptions and shows you the next 10 trigger timestamps in UTC, so you can verify your schedule before deploying.",
    keywords: [
      "cron expression tester",
      "cron decoder",
      "cron schedule preview",
      "crontab tester",
      "cron next run",
      "cron expression explainer",
    ],
    faqs: [
      {
        question: "What is a cron expression?",
        answer:
          "A cron expression is a string of 5 fields — minute, hour, day-of-month, month, day-of-week — that defines when a scheduled task should run. For example, 0 9 * * 1-5 means every weekday at 9:00 AM.",
      },
      {
        question: "What does @daily mean?",
        answer: "@daily is shorthand for 0 0 * * * — midnight every day (UTC).",
      },
      {
        question: "Why is my cron expression not firing when expected?",
        answer:
          "Common issues: the cron daemon uses server-local time, not UTC. Use this tool to preview actual trigger times and compare against your expected times.",
      },
    ],
    relatedSlugs: ["timestamp-converter", "regex-tester"],
    detectionTypes: ["cron"],
    eyebrow: "DevOps & Scheduling",
  },

  "env-file-editor": {
    slug: "env-file-editor",
    title: ".env File Inspector — Parse and Audit Environment Variables",
    shortTitle: ".env Inspector",
    description:
      "Paste a .env file and instantly parse all key-value pairs. Detects secrets, connection strings, database URLs, and config flags — with per-key masking.",
    longDescription:
      ".env files are simple but easy to mishandle. This tool parses the full .env syntax including comments, quoted values, inline comments, and multiline values. It automatically classifies each variable as a secret, connection string, database URL, or plain config, and masks sensitive values by default.",
    keywords: [
      "env file parser",
      "dotenv inspector",
      "environment variable parser",
      "env file editor online",
      "parse .env file",
      "dotenv viewer",
    ],
    faqs: [
      {
        question: "What .env syntax is supported?",
        answer:
          "Standard .env syntax: KEY=value, KEY='quoted value', KEY=\"double quoted\", # comments, and inline comments. Multiline values with quotes are also supported.",
      },
      {
        question: "Are my secrets safe if I paste them here?",
        answer:
          "Yes. The tool runs entirely in your browser. No data is sent to any server. Values classified as secrets are masked by default.",
      },
      {
        question: "What counts as a 'secret' in the classifier?",
        answer:
          "Variables with names containing SECRET, KEY, PASSWORD, TOKEN, PASS, AUTH, or CREDENTIAL are classified as secrets and masked by default.",
      },
    ],
    relatedSlugs: ["regex-tester", "json-query"],
    detectionTypes: ["env"],
    eyebrow: "Config & Secrets",
  },

  "certificate-inspector": {
    slug: "certificate-inspector",
    title: "X.509 Certificate Inspector — Decode TLS/SSL Certificates Online",
    shortTitle: "Certificate Inspector",
    description:
      "Decode X.509 certificates (PEM format) to inspect subject, issuer, validity dates, SANs, key usage, and more — entirely in your browser.",
    longDescription:
      "TLS/SSL certificates contain rich metadata that is hard to read from the raw PEM text. This tool parses the certificate, shows subject and issuer distinguished names, validity period (with days-until-expiry countdown), Subject Alternative Names (SANs), key and signature algorithms, and key usage flags.",
    keywords: [
      "x509 certificate inspector",
      "pem certificate decoder",
      "ssl certificate viewer",
      "tls certificate parser",
      "certificate san viewer",
      "x509 decoder online",
    ],
    faqs: [
      {
        question: "What is a PEM file?",
        answer:
          "PEM (Privacy-Enhanced Mail) is a Base64-encoded DER certificate wrapped in -----BEGIN CERTIFICATE----- and -----END CERTIFICATE----- headers.",
      },
      {
        question: "How do I get the PEM from a website?",
        answer:
          "In Chrome: click the padlock → Connection is secure → Certificate is valid → Details tab → Export. Or use: openssl s_client -connect example.com:443 </dev/null 2>/dev/null | openssl x509 -text",
      },
      {
        question: "What are Subject Alternative Names (SANs)?",
        answer:
          "SANs are additional hostnames or IP addresses that the certificate is valid for. Modern certificates use SANs instead of the CN (Common Name) for hostname matching.",
      },
      {
        question:
          "What is the difference between Root CA, Intermediate CA, and End-Entity?",
        answer:
          "Root CAs self-sign their certificates and are trusted by browsers. Intermediate CAs are signed by a root and sign end-entity certs. End-entity certs are issued to domains/services.",
      },
    ],
    relatedSlugs: ["jwt-decoder", "base64"],
    detectionTypes: ["pem-certificate", "pem-private-key"],
    eyebrow: "Security & PKI",
  },
};

export const ALL_TOOL_SLUGS = Object.keys(TOOL_META);

export function getToolMeta(slug: string): ToolMeta | undefined {
  return TOOL_META[slug];
}
