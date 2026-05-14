import { Edge } from '@xyflow/react';
import { PipelineNode } from '@/store/usePipelineStore';

export interface ToolDefinition {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  seoText: string;
  pipeline: {
    nodes: PipelineNode[];
    edges: Edge[];
  };
}

export const toolsData: ToolDefinition[] = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    title: 'Free Online JSON Formatter & Validator | 100% Private',
    description: 'Format, prettify, and validate your JSON data instantly in your browser. No data is sent to our servers.',
    keywords: 'json formatter, json prettifier, validate json, offline json tools',
    h1: 'Online JSON Formatter & Validator',
    seoText: 'Paste your messy, minified JSON into the input box below. Our client-side engine will instantly format it, validate the syntax, and output beautifully indented JSON. Since processing happens entirely in your browser, your sensitive payloads are 100% secure.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 100 }, data: { label: 'Input JSON' } },
        { id: 'transform', type: 'jsonFormatNode', position: { x: 400, y: 100 }, data: { label: 'Format JSON' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 100 }, data: { label: 'Formatted Output' } },
      ],
      edges: [
        { id: 'e1', source: 'input', target: 'transform' },
        { id: 'e2', source: 'transform', target: 'output' },
      ],
    },
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    title: 'Secure Online JWT Decoder | Parse JSON Web Tokens',
    description: 'Decode and inspect JSON Web Tokens (JWT) safely. 100% client-side decoding ensures your tokens are never logged or exposed.',
    keywords: 'jwt decoder, decode jwt, parse jwt, jwt inspector, offline jwt',
    h1: 'Secure JWT Decoder',
    seoText: 'Inspect the header and payload of your JSON Web Tokens. Unlike other tools, we do not send your JWT to a backend server. WebToolsEasy decodes the token locally, ensuring your authentication secrets are safe from interception or logging.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 100 }, data: { label: 'Paste JWT' } },
        { id: 'transform', type: 'jwtDecodeNode', position: { x: 400, y: 100 }, data: { label: 'Decode JWT' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 100 }, data: { label: 'Decoded Payload' } },
      ],
      edges: [
        { id: 'e1', source: 'input', target: 'transform' },
        { id: 'e2', source: 'transform', target: 'output' },
      ],
    },
  },
  {
    slug: 'base64-encoder',
    name: 'Base64 Encoder',
    title: 'Base64 Encoder | Fast, Free & Private',
    description: 'Encode text and data into Base64 format instantly in your browser.',
    keywords: 'base64 encoder, encode to base64, base64 string generator',
    h1: 'Base64 Encoder',
    seoText: 'Convert any text into a Base64 encoded string securely. All processing runs in your browser using local Web APIs.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 100 }, data: { label: 'Input Text' } },
        { id: 'transform', type: 'base64EncodeNode', position: { x: 400, y: 100 }, data: { label: 'Base64 Encode' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 100 }, data: { label: 'Base64 Output' } },
      ],
      edges: [
        { id: 'e1', source: 'input', target: 'transform' },
        { id: 'e2', source: 'transform', target: 'output' },
      ],
    },
  },
  {
    slug: 'sha256-hash-generator',
    name: 'SHA-256 Hash Generator',
    title: 'SHA-256 Hash Generator | Secure Local Hashing',
    description: 'Generate SHA-256 hashes for your data instantly. Uses the Web Crypto API to ensure your data never leaves your device.',
    keywords: 'sha256 hash generator, create sha256 hash, secure hashing',
    h1: 'SHA-256 Hash Generator',
    seoText: 'Generate secure SHA-256 hashes directly in your browser. We utilize the native Web Crypto API so that your sensitive input strings are processed locally and never transmitted over the network.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 100 }, data: { label: 'Input String' } },
        { id: 'transform', type: 'sha256HashNode', position: { x: 400, y: 100 }, data: { label: 'SHA-256 Hash' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 100 }, data: { label: 'Hash Output' } },
      ],
      edges: [
        { id: 'e1', source: 'input', target: 'transform' },
        { id: 'e2', source: 'transform', target: 'output' },
      ],
    },
  },
  {
    slug: 'regex-replace',
    name: 'Regex Replace',
    title: 'Online Regex Replace Tool | Private Pattern Matching',
    description: 'Perform regular expression replacements on your text data securely in the browser.',
    keywords: 'regex replace, online regex, replace text, regular expression tool',
    h1: 'Online Regex Replace',
    seoText: 'Use powerful regular expressions to search and replace text in your data. Our engine runs locally, so your proprietary text and sensitive payloads are never transmitted to our servers.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 100 }, data: { label: 'Input Text' } },
        { id: 'transform', type: 'regexReplaceNode', position: { x: 400, y: 100 }, data: { label: 'Regex Replace', regex: '[a-z]+', flags: 'g', replacement: 'new' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 100 }, data: { label: 'Output Text' } },
      ],
      edges: [
        { id: 'e1', source: 'input', target: 'transform' },
        { id: 'e2', source: 'transform', target: 'output' },
      ],
    },
  },
  {
    slug: 'html-encoder',
    name: 'HTML Encoder',
    title: 'HTML Entity Encoder | Secure & Local',
    description: 'Encode characters into secure HTML entities to prevent XSS. 100% client-side processing.',
    keywords: 'html encoder, encode html entities, escape html',
    h1: 'HTML Entity Encoder',
    seoText: 'Safely encode special characters into HTML entities to prevent Cross-Site Scripting (XSS) and ensure proper rendering. Processing is handled securely within your local browser sandbox.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 100 }, data: { label: 'Raw HTML/Text' } },
        { id: 'transform', type: 'htmlEncodeNode', position: { x: 400, y: 100 }, data: { label: 'HTML Encode' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 100 }, data: { label: 'Encoded Output' } },
      ],
      edges: [
        { id: 'e1', source: 'input', target: 'transform' },
        { id: 'e2', source: 'transform', target: 'output' },
      ],
    },
  }
];

// ── Append newly implemented tool pages ──
toolsData.push(
  {
    slug: 'csv-to-json',
    name: 'CSV to JSON',
    title: 'CSV to JSON Converter | Free & Private Online Tool',
    description: 'Convert CSV data to a JSON array instantly in your browser. No uploads, no server.',
    keywords: 'csv to json, convert csv json, csv parser online, free csv tool',
    h1: 'CSV to JSON Converter',
    seoText: 'Paste your CSV data (with a header row) and instantly convert it to a structured JSON array. All parsing happens locally in your browser — your spreadsheet data never leaves your device.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 120 }, data: { label: 'Paste CSV' } },
        { id: 'transform', type: 'csvToJsonNode', position: { x: 400, y: 120 }, data: { label: 'CSV → JSON' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 120 }, data: { label: 'JSON Output' } },
      ],
      edges: [{ id: 'e1', source: 'input', target: 'transform' }, { id: 'e2', source: 'transform', target: 'output' }],
    },
  },
  {
    slug: 'yaml-to-json',
    name: 'YAML to JSON',
    title: 'YAML to JSON Converter | Client-Side & Private',
    description: 'Convert YAML configuration files to JSON format securely in your browser.',
    keywords: 'yaml to json, yaml parser, convert yaml json, yaml tool online',
    h1: 'YAML to JSON Converter',
    seoText: 'Paste your YAML configuration file and instantly get the equivalent JSON structure. Perfect for converting Kubernetes configs, Docker Compose files, or CI/CD pipelines. Runs 100% locally.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 120 }, data: { label: 'Paste YAML' } },
        { id: 'transform', type: 'yamlToJsonNode', position: { x: 400, y: 120 }, data: { label: 'YAML → JSON' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 120 }, data: { label: 'JSON Output' } },
      ],
      edges: [{ id: 'e1', source: 'input', target: 'transform' }, { id: 'e2', source: 'transform', target: 'output' }],
    },
  },
  {
    slug: 'sql-formatter',
    name: 'SQL Formatter',
    title: 'SQL Formatter & Beautifier | 100% Local, No Data Upload',
    description: 'Format and beautify messy SQL queries in your browser. Your database schemas never leave your device.',
    keywords: 'sql formatter, sql beautifier, format sql online, sql query prettifier',
    h1: 'SQL Formatter & Beautifier',
    seoText: 'Paste messy, logged SQL queries and get them back in a clean, readable format. Unlike other online SQL tools, your query and schema never leave the browser — critical for enterprise database security.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 120 }, data: { label: 'Paste SQL' } },
        { id: 'transform', type: 'sqlFormatNode', position: { x: 400, y: 120 }, data: { label: 'Format SQL' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 120 }, data: { label: 'Formatted SQL' } },
      ],
      edges: [{ id: 'e1', source: 'input', target: 'transform' }, { id: 'e2', source: 'transform', target: 'output' }],
    },
  },
  {
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    title: 'Unix Timestamp Converter | Epoch to ISO-8601 | Free Tool',
    description: 'Convert Unix epoch timestamps to human-readable dates and vice-versa. Fully client-side.',
    keywords: 'unix timestamp converter, epoch to date, timestamp to iso, date converter',
    h1: 'Unix Timestamp Converter',
    seoText: 'Instantly convert Unix epoch timestamps (seconds or milliseconds) to ISO-8601, UTC, and local time strings — or convert a date string back to its epoch value. No server, no delay.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 120 }, data: { label: 'Paste Timestamp or Date' } },
        { id: 'transform', type: 'timestampNode', position: { x: 400, y: 120 }, data: { label: 'Convert Timestamp' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 120 }, data: { label: 'Converted Output' } },
      ],
      edges: [{ id: 'e1', source: 'input', target: 'transform' }, { id: 'e2', source: 'transform', target: 'output' }],
    },
  },
  {
    slug: 'aes-encrypt',
    name: 'AES Encrypt / Decrypt',
    title: 'AES Encrypt & Decrypt Online | Web Crypto API | 100% Private',
    description: 'Encrypt and decrypt text using AES-256-GCM directly in your browser using the Web Crypto API.',
    keywords: 'aes encrypt online, aes decrypt, aes-256-gcm, web crypto api, local encryption tool',
    h1: 'AES-256 Encrypt & Decrypt',
    seoText: 'Encrypt sensitive text with AES-256-GCM using a secret passphrase. Decryption also works locally. We use the native browser Web Crypto API — your data and secret key are never transmitted anywhere.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 120 }, data: { label: 'Plaintext to Encrypt' } },
        { id: 'transform', type: 'aesEncryptNode', position: { x: 400, y: 120 }, data: { label: 'AES Encrypt', secretKey: '' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 120 }, data: { label: 'Encrypted JSON' } },
      ],
      edges: [{ id: 'e1', source: 'input', target: 'transform' }, { id: 'e2', source: 'transform', target: 'output' }],
    },
  },
  {
    slug: 'curl-parser',
    name: 'cURL Parser',
    title: 'cURL Command Parser | Extract URL, Headers & Body | Private',
    description: 'Parse a cURL command copied from Chrome DevTools to extract the URL, headers, and request body instantly.',
    keywords: 'curl parser, parse curl command, extract curl body, curl to json',
    h1: 'cURL Command Parser',
    seoText: 'Paste a cURL command directly from Chrome DevTools Network tab and instantly extract the URL, request headers, and JSON body as a structured output. All parsing happens locally — no API keys leave your browser.',
    pipeline: {
      nodes: [
        { id: 'input', type: 'inputNode', position: { x: 50, y: 120 }, data: { label: 'Paste cURL Command' } },
        { id: 'transform', type: 'curlParserNode', position: { x: 400, y: 120 }, data: { label: 'Parse cURL' } },
        { id: 'output', type: 'outputNode', position: { x: 750, y: 120 }, data: { label: 'Parsed Output' } },
      ],
      edges: [{ id: 'e1', source: 'input', target: 'transform' }, { id: 'e2', source: 'transform', target: 'output' }],
    },
  }
);
