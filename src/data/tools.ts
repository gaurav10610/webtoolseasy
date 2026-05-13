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
