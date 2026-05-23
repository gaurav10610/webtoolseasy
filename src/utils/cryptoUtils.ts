export type RsaKeySize = 1024 | 2048 | 4096;

export interface KeyPairResult {
  publicKeyPem: string;
  privateKeyPem: string;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function formatAsPem(base64Str: string, label: string): string {
  // Split into chunks of 64 characters
  const lines = base64Str.match(/.{1,64}/g) || [];
  return [
    `-----BEGIN ${label}-----`,
    ...lines,
    `-----END ${label}-----`
  ].join('\n');
}

export async function generateRsaKeyPair(size: RsaKeySize): Promise<KeyPairResult> {
  // Generate the key pair
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: size,
      publicExponent: new Uint8Array([1, 0, 1]), // 65537
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  );

  // Export Public Key to SPKI
  const spkiBuffer = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const spkiBase64 = arrayBufferToBase64(spkiBuffer);
  const publicKeyPem = formatAsPem(spkiBase64, "PUBLIC KEY");

  // Export Private Key to PKCS8
  const pkcs8Buffer = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  const pkcs8Base64 = arrayBufferToBase64(pkcs8Buffer);
  const privateKeyPem = formatAsPem(pkcs8Base64, "PRIVATE KEY");

  return {
    publicKeyPem,
    privateKeyPem
  };
}
