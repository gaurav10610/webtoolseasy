export type NodeTransformFunction = (input: string, data?: Record<string, any>) => Promise<string>;

export type ConfigField = {
  key: string;
  label: string;
  type: 'text' | 'number';
  placeholder?: string;
};

export const nodeRegistry: Record<string, { label: string, description: string, configFields?: ConfigField[], transform?: NodeTransformFunction }> = {
  inputNode: {
    label: 'Input Text',
    description: 'Provide raw text or JSON data to start the pipeline.',
  },
  outputNode: {
    label: 'Output',
    description: 'Displays the final transformed output.',
  },
  jsonFormatNode: {
    label: 'Format JSON',
    description: 'Prettifies minified JSON. Validates JSON syntax.',
    transform: async (input) => JSON.stringify(JSON.parse(input), null, 2),
  },
  jsonMinifyNode: {
    label: 'Minify JSON',
    description: 'Compresses JSON by removing whitespace.',
    transform: async (input) => JSON.stringify(JSON.parse(input)),
  },
  base64EncodeNode: {
    label: 'Base64 Encode',
    description: 'Encodes text to Base64 format.',
    transform: async (input) => btoa(unescape(encodeURIComponent(input))),
  },
  base64DecodeNode: {
    label: 'Base64 Decode',
    description: 'Decodes Base64 text to plain text.',
    transform: async (input) => decodeURIComponent(escape(atob(input))),
  },
  urlEncodeNode: {
    label: 'URL Encode',
    description: 'Encodes URL components.',
    transform: async (input) => encodeURIComponent(input),
  },
  urlDecodeNode: {
    label: 'URL Decode',
    description: 'Decodes URL components.',
    transform: async (input) => decodeURIComponent(input),
  },
  htmlEncodeNode: {
    label: 'HTML Encode',
    description: 'Encodes characters to HTML entities.',
    transform: async (input) => {
      const el = document.createElement('div');
      el.innerText = input;
      return el.innerHTML;
    },
  },
  htmlDecodeNode: {
    label: 'HTML Decode',
    description: 'Decodes HTML entities back to characters.',
    transform: async (input) => {
      const el = document.createElement('div');
      el.innerHTML = input;
      return el.innerText || el.textContent || '';
    },
  },
  jwtDecodeNode: {
    label: 'Decode JWT',
    description: 'Decodes the header and payload of a JSON Web Token.',
    transform: async (input) => {
      const parts = input.trim().split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format (must have 3 parts separated by dots)');
      const header = JSON.parse(decodeURIComponent(escape(atob(parts[0]))));
      const payload = JSON.parse(decodeURIComponent(escape(atob(parts[1]))));
      return JSON.stringify({ header, payload }, null, 2);
    },
  },
  sha256HashNode: {
    label: 'SHA-256 Hash',
    description: 'Generates a SHA-256 hash of the input text.',
    transform: async (input) => {
      const msgBuffer = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },
  },
  lowercaseNode: {
    label: 'To Lowercase',
    description: 'Converts all text to lowercase.',
    transform: async (input) => input.toLowerCase(),
  },
  uppercaseNode: {
    label: 'To Uppercase',
    description: 'Converts all text to uppercase.',
    transform: async (input) => input.toUpperCase(),
  },
  regexReplaceNode: {
    label: 'Regex Replace',
    description: 'Replaces text using a regular expression.',
    configFields: [
      { key: 'regex', label: 'Regex Pattern', type: 'text', placeholder: '[a-z]+' },
      { key: 'flags', label: 'Regex Flags', type: 'text', placeholder: 'g, i, m' },
      { key: 'replacement', label: 'Replacement String', type: 'text', placeholder: 'new_word' },
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
};
