export type NodeTransformFunction = (input: string, data?: Record<string, any>) => Promise<string>;

export type ConfigField = {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  options?: { value: string; label: string }[];
};

export type NodeCategory = 'text' | 'encoders' | 'formatters' | 'crypto' | 'utilities';

export const nodeRegistry: Record<string, {
  label: string;
  description: string;
  category: NodeCategory;
  configFields?: ConfigField[];
  transform?: NodeTransformFunction;
}> = {
  // ── Special nodes ──────────────────────────────────────────────────────────
  inputNode: {
    label: 'Input Text',
    description: 'Provide raw text or JSON data to start the pipeline.',
    category: 'utilities',
  },
  fileInputNode: {
    label: 'File Input',
    description: 'Drag & drop a .log, .json, or .txt file to read it locally.',
    category: 'utilities',
  },
  outputNode: {
    label: 'Output',
    description: 'Displays the final transformed output.',
    category: 'utilities',
  },

  // ── Text Manipulation ──────────────────────────────────────────────────────
  lowercaseNode: {
    label: 'To Lowercase',
    description: 'Converts all text to lowercase.',
    category: 'text',
    transform: async (input) => input.toLowerCase(),
  },
  uppercaseNode: {
    label: 'To Uppercase',
    description: 'Converts all text to uppercase.',
    category: 'text',
    transform: async (input) => input.toUpperCase(),
  },
  caseConverterNode: {
    label: 'Case Converter',
    description: 'Converts text to camelCase, snake_case, PascalCase, or kebab-case.',
    category: 'text',
    configFields: [
      {
        key: 'targetCase', label: 'Target Case', type: 'select',
        options: [
          { value: 'camel', label: 'camelCase' },
          { value: 'snake', label: 'snake_case' },
          { value: 'pascal', label: 'PascalCase' },
          { value: 'kebab', label: 'kebab-case' },
        ],
      },
    ],
    transform: async (input, data) => {
      const words = input.trim().replace(/[_\-\s]+/g, ' ').split(/\s+/);
      const tc = data?.targetCase || 'camel';
      if (tc === 'snake') return words.map(w => w.toLowerCase()).join('_');
      if (tc === 'kebab') return words.map(w => w.toLowerCase()).join('-');
      if (tc === 'pascal') return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
      // camel
      return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    },
  },
  stringSplitNode: {
    label: 'String Split',
    description: 'Splits text by a delimiter and outputs a JSON array of parts.',
    category: 'text',
    configFields: [
      { key: 'delimiter', label: 'Delimiter', type: 'text', placeholder: ',' },
    ],
    transform: async (input, data) => {
      const delimiter = data?.delimiter ?? ',';
      return JSON.stringify(input.split(delimiter), null, 2);
    },
  },
  stringJoinNode: {
    label: 'String Join',
    description: 'Joins a JSON array of strings into a single string.',
    category: 'text',
    configFields: [
      { key: 'delimiter', label: 'Delimiter', type: 'text', placeholder: ', ' },
    ],
    transform: async (input, data) => {
      const arr = JSON.parse(input);
      if (!Array.isArray(arr)) throw new Error('Input must be a JSON array.');
      return arr.join(data?.delimiter ?? ', ');
    },
  },
  regexReplaceNode: {
    label: 'Regex Replace',
    description: 'Replaces text using a regular expression.',
    category: 'text',
    configFields: [
      { key: 'regex', label: 'Regex Pattern', type: 'text', placeholder: '[a-z]+' },
      { key: 'flags', label: 'Flags (g, i, m)', type: 'text', placeholder: 'g' },
      { key: 'replacement', label: 'Replacement', type: 'text', placeholder: 'new_word' },
    ],
    transform: async (input, data) => {
      const regexStr = data?.regex || '';
      const flags = data?.flags || 'g';
      const replacement = data?.replacement || '';
      if (!regexStr) return input;
      const re = new RegExp(regexStr, flags);
      return input.replace(re, replacement);
    },
  },
  regexExtractNode: {
    label: 'Regex Extract',
    description: 'Extracts all regex matches into a JSON array.',
    category: 'text',
    configFields: [
      { key: 'regex', label: 'Regex Pattern', type: 'text', placeholder: '\\d+' },
      { key: 'flags', label: 'Flags', type: 'text', placeholder: 'g' },
    ],
    transform: async (input, data) => {
      const regexStr = data?.regex || '';
      if (!regexStr) throw new Error('Regex pattern is required.');
      const flags = (data?.flags || 'g').includes('g') ? data?.flags || 'g' : (data?.flags || '') + 'g';
      const re = new RegExp(regexStr, flags);
      const matches = [...input.matchAll(re)].map(m => m[0]);
      return JSON.stringify(matches, null, 2);
    },
  },

  // ── Encoders & Decoders ────────────────────────────────────────────────────
  base64EncodeNode: {
    label: 'Base64 Encode',
    description: 'Encodes text to Base64 format.',
    category: 'encoders',
    transform: async (input) => btoa(unescape(encodeURIComponent(input))),
  },
  base64DecodeNode: {
    label: 'Base64 Decode',
    description: 'Decodes Base64 text to plain text.',
    category: 'encoders',
    transform: async (input) => decodeURIComponent(escape(atob(input.trim()))),
  },
  urlEncodeNode: {
    label: 'URL Encode',
    description: 'Encodes URL components.',
    category: 'encoders',
    transform: async (input) => encodeURIComponent(input),
  },
  urlDecodeNode: {
    label: 'URL Decode',
    description: 'Decodes URL components.',
    category: 'encoders',
    transform: async (input) => decodeURIComponent(input),
  },
  htmlEncodeNode: {
    label: 'HTML Encode',
    description: 'Encodes characters to HTML entities.',
    category: 'encoders',
    transform: async (input) => {
      const el = document.createElement('div');
      el.innerText = input;
      return el.innerHTML;
    },
  },
  htmlDecodeNode: {
    label: 'HTML Decode',
    description: 'Decodes HTML entities back to characters.',
    category: 'encoders',
    transform: async (input) => {
      const el = document.createElement('div');
      el.innerHTML = input;
      return el.innerText || el.textContent || '';
    },
  },
  hexEncodeNode: {
    label: 'String → Hex',
    description: 'Converts a string to its hexadecimal representation.',
    category: 'encoders',
    transform: async (input) =>
      Array.from(new TextEncoder().encode(input))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' '),
  },
  hexDecodeNode: {
    label: 'Hex → String',
    description: 'Converts a hex string back to readable text.',
    category: 'encoders',
    transform: async (input) => {
      const bytes = input.trim().split(/\s+/).map(h => parseInt(h, 16));
      return new TextDecoder().decode(new Uint8Array(bytes));
    },
  },
  binaryEncodeNode: {
    label: 'String → Binary',
    description: 'Converts a string to space-separated 8-bit binary.',
    category: 'encoders',
    transform: async (input) =>
      Array.from(new TextEncoder().encode(input))
        .map(b => b.toString(2).padStart(8, '0'))
        .join(' '),
  },
  binaryDecodeNode: {
    label: 'Binary → String',
    description: 'Converts space-separated binary back to text.',
    category: 'encoders',
    transform: async (input) => {
      const bytes = input.trim().split(/\s+/).map(b => parseInt(b, 2));
      return new TextDecoder().decode(new Uint8Array(bytes));
    },
  },

  // ── Formatters & Parsers ───────────────────────────────────────────────────
  jsonFormatNode: {
    label: 'Format JSON',
    description: 'Prettifies minified JSON. Validates JSON syntax.',
    category: 'formatters',
    transform: async (input) => JSON.stringify(JSON.parse(input), null, 2),
  },
  jsonMinifyNode: {
    label: 'Minify JSON',
    description: 'Compresses JSON by removing all whitespace.',
    category: 'formatters',
    transform: async (input) => JSON.stringify(JSON.parse(input)),
  },
  jsonPathExtractorNode: {
    label: 'JSONPath Extractor',
    description: 'Extract specific keys from deep JSON payloads using JSONPath syntax (e.g. $.store.book[*].author).',
    category: 'formatters',
    configFields: [
      { key: 'path', label: 'JSONPath Expression', type: 'text', placeholder: '$.store.book[*].author' },
    ],
    transform: async (input, data) => {
      const { JSONPath } = await import('jsonpath-plus');
      const obj = JSON.parse(input);
      const path = data?.path || '$';
      const result = JSONPath({ path, json: obj });
      return JSON.stringify(result, null, 2);
    },
  },
  csvToJsonNode: {
    label: 'CSV → JSON',
    description: 'Converts CSV data (with headers) into a JSON array.',
    category: 'formatters',
    transform: async (input) => {
      const lines = input.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const values = line.split(',');
        return Object.fromEntries(headers.map((h, i) => [h, values[i]?.trim() ?? '']));
      });
      return JSON.stringify(rows, null, 2);
    },
  },
  jsonToCsvNode: {
    label: 'JSON → CSV',
    description: 'Converts a JSON array of objects to CSV format.',
    category: 'formatters',
    transform: async (input) => {
      const arr = JSON.parse(input);
      if (!Array.isArray(arr) || arr.length === 0) throw new Error('Input must be a non-empty JSON array.');
      const headers = Object.keys(arr[0]);
      const rows = arr.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','));
      return [headers.join(','), ...rows].join('\n');
    },
  },
  yamlToJsonNode: {
    label: 'YAML → JSON',
    description: 'Parses YAML text into a formatted JSON object.',
    category: 'formatters',
    transform: async (input) => {
      // Simple YAML parser for common key: value cases
      const lines = input.split('\n');
      const result: Record<string, any> = {};
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const colonIdx = trimmed.indexOf(':');
        if (colonIdx === -1) continue;
        const key = trimmed.slice(0, colonIdx).trim();
        const val = trimmed.slice(colonIdx + 1).trim();
        result[key] = val === 'true' ? true : val === 'false' ? false : isNaN(Number(val)) ? val : Number(val);
      }
      return JSON.stringify(result, null, 2);
    },
  },
  markdownToHtmlNode: {
    label: 'Markdown → HTML',
    description: 'Converts Markdown text to HTML. Useful for previewing content.',
    category: 'formatters',
    transform: async (input) => {
      return input
        .replace(/^###### (.+)$/gm, '<h6>$1</h6>')
        .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/^\- (.+)$/gm, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[h|l|p])(.+)$/gm, (m) => m ? m : '');
    },
  },
  sqlFormatNode: {
    label: 'SQL Formatter',
    description: 'Formats messy SQL queries locally. Your schema never leaves your browser.',
    category: 'formatters',
    transform: async (input) => {
      const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
        'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT INTO',
        'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE'];
      let formatted = input.trim();
      for (const kw of keywords) {
        formatted = formatted.replace(new RegExp(`\\b${kw}\\b`, 'gi'), `\n${kw}`);
      }
      return formatted.trim().split('\n').filter(l => l.trim()).join('\n');
    },
  },
  timestampNode: {
    label: 'Timestamp Convert',
    description: 'Converts Unix epoch timestamps to human-readable ISO-8601 and vice-versa.',
    category: 'utilities',
    transform: async (input) => {
      const trimmed = input.trim();
      if (/^\d+$/.test(trimmed)) {
        const ms = trimmed.length === 10 ? parseInt(trimmed) * 1000 : parseInt(trimmed);
        const d = new Date(ms);
        return JSON.stringify({ unix: parseInt(trimmed), iso: d.toISOString(), utc: d.toUTCString(), local: d.toLocaleString() }, null, 2);
      }
      const d = new Date(trimmed);
      if (isNaN(d.getTime())) throw new Error('Invalid date string or timestamp.');
      return JSON.stringify({ unix: Math.floor(d.getTime() / 1000), unixMs: d.getTime(), iso: d.toISOString(), utc: d.toUTCString() }, null, 2);
    },
  },
  curlParserNode: {
    label: 'cURL Parser',
    description: 'Paste a cURL command (from Chrome DevTools) to extract URL, headers, and body.',
    category: 'utilities',
    transform: async (input) => {
      const url = (input.match(/curl ['"]?([^'">\s]+)['"]?/) || [])[1] || '';
      const headers: Record<string, string> = {};
      const headerMatches = [...input.matchAll(/-H ['"]([^'"]+)['"]/g)];
      for (const m of headerMatches) {
        const [k, ...v] = m[1].split(': ');
        headers[k] = v.join(': ');
      }
      const bodyMatch = input.match(/--data(?:-raw)? ['"](.+?)['"]\s*(?:-|$)/s) || input.match(/--data(?:-raw)? '([\s\S]+?)'\s*$/);
      let body: any = bodyMatch?.[1] || null;
      try { if (body) body = JSON.parse(body); } catch { /* keep as string */ }
      return JSON.stringify({ url, headers, body }, null, 2);
    },
  },
  dataFakerNode: {
    label: 'Data Faker',
    description: 'Generates a JSON object with realistic fake data for testing (no server call).',
    category: 'utilities',
    configFields: [
      { key: 'count', label: 'Number of records', type: 'number', placeholder: '5' },
    ],
    transform: async (_input, data) => {
      const count = Math.min(Math.max(parseInt(data?.count || '5'), 1), 50);
      const firstNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi'];
      const lastNames = ['Smith', 'Jones', 'Taylor', 'Brown', 'Davis', 'Wilson', 'Moore'];
      const domains = ['gmail.com', 'outlook.com', 'company.io', 'dev.co'];
      const records = Array.from({ length: count }, (_, i) => {
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return {
          id: i + 1,
          name: `${first} ${last}`,
          email: `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`,
          age: 22 + Math.floor(Math.random() * 40),
          active: Math.random() > 0.3,
          createdAt: new Date(Date.now() - Math.random() * 1e10).toISOString(),
        };
      });
      return JSON.stringify(records, null, 2);
    },
  },

  // ── Crypto & Hashing ───────────────────────────────────────────────────────
  sha256HashNode: {
    label: 'SHA-256 Hash',
    description: 'Generates a SHA-256 hash using the native Web Crypto API.',
    category: 'crypto',
    transform: async (input) => {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    },
  },
  sha1HashNode: {
    label: 'SHA-1 Hash',
    description: 'Generates a SHA-1 hash (legacy). Use SHA-256 for security-sensitive work.',
    category: 'crypto',
    transform: async (input) => {
      const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(input));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    },
  },
  sha512HashNode: {
    label: 'SHA-512 Hash',
    description: 'Generates a strong SHA-512 hash using the Web Crypto API.',
    category: 'crypto',
    transform: async (input) => {
      const buf = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(input));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    },
  },
  jwtDecodeNode: {
    label: 'Decode JWT',
    description: 'Decodes the header and payload of a JSON Web Token. Never sent to a server.',
    category: 'crypto',
    transform: async (input) => {
      const parts = input.trim().split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT — must have 3 dot-separated parts.');
      const pad = (s: string) => s + '='.repeat((4 - s.length % 4) % 4);
      const header = JSON.parse(atob(pad(parts[0])));
      const payload = JSON.parse(atob(pad(parts[1])));
      const exp = payload.exp ? new Date(payload.exp * 1000).toISOString() : null;
      const iat = payload.iat ? new Date(payload.iat * 1000).toISOString() : null;
      const expired = payload.exp ? Date.now() > payload.exp * 1000 : null;
      return JSON.stringify({ header, payload, meta: { exp_human: exp, iat_human: iat, expired } }, null, 2);
    },
  },
  aesEncryptNode: {
    label: 'AES Encrypt',
    description: 'Encrypts text using AES-GCM with a secret key. 100% local via Web Crypto API.',
    category: 'crypto',
    configFields: [
      { key: 'secretKey', label: 'Secret Key (passphrase)', type: 'text', placeholder: 'my-secret-key' },
    ],
    transform: async (input, data) => {
      const passphrase = data?.secretKey || '';
      if (!passphrase) throw new Error('A secret key is required for encryption.');
      const enc = new TextEncoder();
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
      );
      const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(input));
      const toBase64 = (arr: Uint8Array) => btoa(String.fromCharCode(...arr));
      return JSON.stringify({ encrypted: toBase64(new Uint8Array(encrypted)), iv: toBase64(iv), salt: toBase64(salt) });
    },
  },
  aesDecryptNode: {
    label: 'AES Decrypt',
    description: 'Decrypts AES-GCM encrypted text using the same secret key.',
    category: 'crypto',
    configFields: [
      { key: 'secretKey', label: 'Secret Key (passphrase)', type: 'text', placeholder: 'my-secret-key' },
    ],
    transform: async (input, data) => {
      const passphrase = data?.secretKey || '';
      if (!passphrase) throw new Error('A secret key is required for decryption.');
      const { encrypted, iv: ivB64, salt: saltB64 } = JSON.parse(input);
      const fromBase64 = (b64: string) => Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: fromBase64(saltB64), iterations: 100000, hash: 'SHA-256' },
        keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
      );
      const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromBase64(ivB64) }, key, fromBase64(encrypted));
      return new TextDecoder().decode(decrypted);
    },
  },
  md5HashNode: {
    label: 'MD5 Hash',
    description: 'Generates an MD5 hash (common for legacy system integrations).',
    category: 'crypto',
    transform: async (input) => {
      const CryptoJS = (await import('crypto-js')).default;
      return CryptoJS.MD5(input).toString();
    },
  },
  bcryptHashNode: {
    label: 'Bcrypt Generator',
    description: 'Generates a Bcrypt hash with a configurable salt round.',
    category: 'crypto',
    configFields: [
      { key: 'saltRounds', label: 'Salt Rounds', type: 'number', placeholder: '10' },
    ],
    transform: async (input, data) => {
      const bcrypt = (await import('bcryptjs')).default;
      const rounds = Math.min(Math.max(parseInt(data?.saltRounds || '10'), 4), 14); // cap to prevent freezing
      const salt = bcrypt.genSaltSync(rounds);
      return bcrypt.hashSync(input, salt);
    },
  },
  bcryptVerifyNode: {
    label: 'Bcrypt Verifier',
    description: 'Verifies a plaintext input against an existing Bcrypt hash.',
    category: 'crypto',
    configFields: [
      { key: 'hash', label: 'Bcrypt Hash to Compare', type: 'text', placeholder: '$2a$10$...' },
    ],
    transform: async (input, data) => {
      const bcrypt = (await import('bcryptjs')).default;
      const hash = data?.hash || '';
      if (!hash) throw new Error('A Bcrypt hash is required for comparison.');
      const isValid = bcrypt.compareSync(input, hash);
      return JSON.stringify({ match: isValid, inputLength: input.length }, null, 2);
    },
  },
  diffCheckerNode: {
    label: 'Diff Checker',
    description: 'Compares the incoming pipeline data against a secondary text input.',
    category: 'utilities',
    configFields: [
      { key: 'compareText', label: 'Text to Compare Against (Input B)', type: 'textarea', placeholder: 'Paste the original text here...' },
    ],
    transform: async (input, data) => {
      const diff = await import('diff');
      const compareText = data?.compareText || '';
      const differences = diff.diffLines(compareText, input);
      return JSON.stringify(differences, null, 2);
    },
  },
};

export type NodeRegistryEntry = typeof nodeRegistry[string];

// Group nodes by category for the sidebar
export const nodesByCategory: Record<NodeCategory, string[]> = {
  text: [],
  encoders: [],
  formatters: [],
  crypto: [],
  utilities: [],
};

Object.entries(nodeRegistry).forEach(([type, config]) => {
  if (type !== 'inputNode' && type !== 'outputNode' && type !== 'fileInputNode') {
    nodesByCategory[config.category].push(type);
  }
});

export const categoryLabels: Record<NodeCategory, string> = {
  text: '✏️ Text',
  encoders: '🔄 Encoders',
  formatters: '📋 Formatters',
  crypto: '🔐 Crypto',
  utilities: '🛠️ Utilities',
};
