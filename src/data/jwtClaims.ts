export type JwtClaim = {
  id: string;
  name: string;
  fullName: string;
  description: string;
  type: string;
  example: string;
  securityNote?: string;
  rfcLink?: string;
};

export const jwtClaims: JwtClaim[] = [
  {
    id: "iss",
    name: "iss",
    fullName: "Issuer",
    description: "The 'iss' (issuer) claim identifies the principal that issued the JWT. The processing of this claim is generally application specific.",
    type: "StringOrUri",
    example: "https://auth.example.com",
    securityNote: "Always validate the issuer if you accept tokens from multiple providers.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1",
  },
  {
    id: "sub",
    name: "sub",
    fullName: "Subject",
    description: "The 'sub' (subject) claim identifies the principal that is the subject of the JWT. The claims in a JWT are normally statements about the subject.",
    type: "StringOrUri",
    example: "1234567890",
    securityNote: "The sub value is a case-sensitive string containing a StringOrURI value.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2",
  },
  {
    id: "aud",
    name: "aud",
    fullName: "Audience",
    description: "The 'aud' (audience) claim identifies the recipients that the JWT is intended for. Each principal intended to process the JWT MUST identify itself with a value in the audience claim.",
    type: "StringOrUriOrArray",
    example: "https://api.example.com",
    securityNote: "If the principal processing the claim does not identify itself with a value in the 'aud' claim when this claim is present, then the JWT MUST be rejected.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3",
  },
  {
    id: "exp",
    name: "exp",
    fullName: "Expiration Time",
    description: "The 'exp' (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.",
    type: "NumericDate",
    example: "1516239022",
    securityNote: "Tokens without an 'exp' claim never expire, which is a significant security risk. Always use short-lived tokens and refresh them.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4",
  },
  {
    id: "nbf",
    name: "nbf",
    fullName: "Not Before",
    description: "The 'nbf' (not before) claim identifies the time before which the JWT MUST NOT be accepted for processing.",
    type: "NumericDate",
    example: "1516239022",
    securityNote: "Make sure clock skew is considered when validating the 'nbf' claim (typically allowing a few minutes of leeway).",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5",
  },
  {
    id: "iat",
    name: "iat",
    fullName: "Issued At",
    description: "The 'iat' (issued at) claim identifies the time at which the JWT was issued. This claim can be used to determine the age of the JWT.",
    type: "NumericDate",
    example: "1516239022",
    securityNote: "Can be used to reject tokens that were issued before a password change or other security event.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6",
  },
  {
    id: "jti",
    name: "jti",
    fullName: "JWT ID",
    description: "The 'jti' (JWT ID) claim provides a unique identifier for the JWT. The identifier value MUST be assigned in a manner that ensures that there is a negligible probability that the same value will be accidentally assigned to a different data object.",
    type: "String",
    example: "b1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    securityNote: "Crucial for preventing replay attacks. Store used JTIs in a cache/database for the duration of the token's lifetime.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7",
  },
];
