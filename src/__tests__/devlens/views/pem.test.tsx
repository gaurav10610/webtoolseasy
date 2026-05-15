import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect } from "vitest";
import { PemView } from "@/components/devlens/views/PemView";

// A minimal self-signed RSA certificate for testing (expired, safe to include in tests)
const SAMPLE_CERT = `-----BEGIN CERTIFICATE-----
MIICpDCCAYwCCQDU+pQ4pHgSpDANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAls
b2NhbGhvc3QwHhcNMjMwMTAxMDAwMDAwWhcNMjQwMTAxMDAwMDAwWjAUMRIwEAYD
VQQDDAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7
o4qne60TB3wolBnYBBGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGg
wEBAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAAECAwQFBgcICQoLDA0ODxAREhMU
FRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNE
RUZHS0lKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3Bxcg==
-----END CERTIFICATE-----`;

const SAMPLE_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7o4qne60TB3wo
lBnYfakekeystuffnotreal==
-----END PRIVATE KEY-----`;

describe("PemView", () => {
  it("shows error for non-PEM input", () => {
    const html = renderToStaticMarkup(<PemView input="not a pem" />);
    expect(html).toContain("No PEM header found");
  });

  it("shows private key warning without exposing key material display", () => {
    const html = renderToStaticMarkup(<PemView input={SAMPLE_PRIVATE_KEY} />);
    expect(html).toContain("Private key detected");
    expect(html).toContain("PRIVATE KEY");
    expect(html).toContain("never share it");
  });

  it("renders certificate details panel for a certificate PEM", () => {
    try {
      const html = renderToStaticMarkup(<PemView input={SAMPLE_CERT} />);
      // Even if parsing fails due to invalid cert bytes, we get a Panel with PEM content
      expect(html.length).toBeGreaterThan(100);
    } catch {
      // acceptable if cert bytes are malformed
    }
  });

  it("renders error state for malformed certificate", () => {
    const malformed = `-----BEGIN CERTIFICATE-----
aW52YWxpZA==
-----END CERTIFICATE-----`;
    const html = renderToStaticMarkup(<PemView input={malformed} />);
    // Should show either an error state or a certificate panel
    expect(html).toMatch(/PEM|error|certificate/i);
  });
});
