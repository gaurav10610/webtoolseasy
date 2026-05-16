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
    description:
      "The 'iss' (issuer) claim identifies the principal that issued the JWT. The processing of this claim is generally application specific.",
    type: "StringOrUri",
    example: "https://auth.example.com",
    securityNote:
      "Always validate the issuer if you accept tokens from multiple providers.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1",
  },
  {
    id: "sub",
    name: "sub",
    fullName: "Subject",
    description:
      "The 'sub' (subject) claim identifies the principal that is the subject of the JWT. The claims in a JWT are normally statements about the subject.",
    type: "StringOrUri",
    example: "1234567890",
    securityNote:
      "The sub value is a case-sensitive string containing a StringOrURI value.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2",
  },
  {
    id: "aud",
    name: "aud",
    fullName: "Audience",
    description:
      "The 'aud' (audience) claim identifies the recipients that the JWT is intended for. Each principal intended to process the JWT MUST identify itself with a value in the audience claim.",
    type: "StringOrUriOrArray",
    example: "https://api.example.com",
    securityNote:
      "If the principal processing the claim does not identify itself with a value in the 'aud' claim when this claim is present, then the JWT MUST be rejected.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3",
  },
  {
    id: "exp",
    name: "exp",
    fullName: "Expiration Time",
    description:
      "The 'exp' (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.",
    type: "NumericDate",
    example: "1516239022",
    securityNote:
      "Tokens without an 'exp' claim never expire, which is a significant security risk. Always use short-lived tokens and refresh them.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4",
  },
  {
    id: "nbf",
    name: "nbf",
    fullName: "Not Before",
    description:
      "The 'nbf' (not before) claim identifies the time before which the JWT MUST NOT be accepted for processing.",
    type: "NumericDate",
    example: "1516239022",
    securityNote:
      "Make sure clock skew is considered when validating the 'nbf' claim (typically allowing a few minutes of leeway).",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5",
  },
  {
    id: "iat",
    name: "iat",
    fullName: "Issued At",
    description:
      "The 'iat' (issued at) claim identifies the time at which the JWT was issued. This claim can be used to determine the age of the JWT.",
    type: "NumericDate",
    example: "1516239022",
    securityNote:
      "Can be used to reject tokens that were issued before a password change or other security event.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6",
  },
  {
    id: "jti",
    name: "jti",
    fullName: "JWT ID",
    description:
      "The 'jti' (JWT ID) claim provides a unique identifier for the JWT. The identifier value MUST be assigned in a manner that ensures that there is a negligible probability that the same value will be accidentally assigned to a different data object.",
    type: "String",
    example: "b1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    securityNote:
      "Crucial for preventing replay attacks. Store used JTIs in a cache/database for the duration of the token's lifetime.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7",
  },
  {
    id: "typ",
    name: "typ",
    fullName: "Type",
    description:
      "The 'typ' header parameter indicates the media type of the complete JWT and is often set to 'JWT'.",
    type: "String",
    example: "JWT",
    securityNote:
      "Do not rely on 'typ' alone for security decisions; always validate signature, issuer, audience, and expiry.",
    rfcLink: "https://datatracker.ietf.org/doc/html/rfc7519#section-5.1",
  },
  {
    id: "azp",
    name: "azp",
    fullName: "Authorized Party",
    description:
      "OIDC claim identifying the party to which the ID token was issued when the audience has multiple values.",
    type: "String",
    example: "web-client-id",
    securityNote:
      "Validate azp for multi-client systems to prevent token substitution between clients.",
  },
  {
    id: "nonce",
    name: "nonce",
    fullName: "Nonce",
    description:
      "OIDC value used to associate a client session with an ID token and mitigate replay attacks.",
    type: "String",
    example: "n-0S6_WzA2Mj",
    securityNote:
      "Nonce must be generated per auth request and verified on callback to prevent replay and mix-up attacks.",
  },
  {
    id: "auth_time",
    name: "auth_time",
    fullName: "Authentication Time",
    description:
      "OIDC timestamp indicating when end-user authentication occurred.",
    type: "NumericDate",
    example: "1715843001",
    securityNote:
      "Use auth_time to enforce recent authentication for sensitive actions.",
  },
  {
    id: "acr",
    name: "acr",
    fullName: "Authentication Context Class Reference",
    description:
      "OIDC claim indicating the authentication context level (for example MFA strength).",
    type: "String",
    example: "urn:mace:incommon:iap:silver",
    securityNote:
      "Use acr to verify expected assurance level before granting high-risk operations.",
  },
  {
    id: "amr",
    name: "amr",
    fullName: "Authentication Methods References",
    description:
      "OIDC claim listing methods used during authentication, such as pwd, otp, or mfa.",
    type: "Array<String>",
    example: '["pwd","otp"]',
    securityNote:
      "Check amr for MFA requirements in regulated or privileged workflows.",
  },
  {
    id: "scope",
    name: "scope",
    fullName: "Scope",
    description:
      "OAuth claim-like field commonly included in access tokens to represent granted permissions.",
    type: "String",
    example: "read:users write:users",
    securityNote:
      "Treat scope as authorization input and enforce least-privilege checks server-side.",
  },
  {
    id: "roles",
    name: "roles",
    fullName: "Roles",
    description:
      "Common custom claim listing role names assigned to a principal.",
    type: "Array<String>",
    example: '["admin","billing"]',
    securityNote:
      "Never trust roles from unsigned or weakly validated tokens. Validate issuer and signature first.",
  },
  {
    id: "permissions",
    name: "permissions",
    fullName: "Permissions",
    description:
      "Custom claim listing fine-grained actions a principal can perform.",
    type: "Array<String>",
    example: '["invoice.read","invoice.pay"]',
    securityNote:
      "Prefer explicit permissions over broad roles, and audit unexpected permission inflation.",
  },
  {
    id: "name",
    name: "name",
    fullName: "Full Name",
    description:
      "OIDC profile claim containing the end-user's full display name.",
    type: "String",
    example: "Alex Johnson",
    securityNote:
      "This is profile data only and should not be used as a stable identity key.",
  },
  {
    id: "given_name",
    name: "given_name",
    fullName: "Given Name",
    description: "OIDC profile claim containing the user's first name.",
    type: "String",
    example: "Alex",
  },
  {
    id: "family_name",
    name: "family_name",
    fullName: "Family Name",
    description: "OIDC profile claim containing the user's last name.",
    type: "String",
    example: "Johnson",
  },
  {
    id: "preferred_username",
    name: "preferred_username",
    fullName: "Preferred Username",
    description:
      "OIDC profile claim containing a shorthand username chosen by the user.",
    type: "String",
    example: "alexj",
    securityNote:
      "Do not use preferred_username as the immutable subject identifier; use sub.",
  },
  {
    id: "email",
    name: "email",
    fullName: "Email",
    description: "OIDC profile claim containing the user's email address.",
    type: "String",
    example: "alex@example.com",
    securityNote:
      "Email may change over time. Use sub for identity binding and email_verified for confidence.",
  },
  {
    id: "email_verified",
    name: "email_verified",
    fullName: "Email Verified",
    description:
      "OIDC claim indicating whether the email address was verified by the identity provider.",
    type: "Boolean",
    example: "true",
    securityNote:
      "Treat unverified emails as low trust for account recovery and privileged actions.",
  },
  {
    id: "phone_number",
    name: "phone_number",
    fullName: "Phone Number",
    description: "OIDC profile claim containing the user's phone number.",
    type: "String",
    example: "+14155552671",
  },
  {
    id: "phone_number_verified",
    name: "phone_number_verified",
    fullName: "Phone Number Verified",
    description:
      "OIDC claim indicating whether the phone number was verified by the identity provider.",
    type: "Boolean",
    example: "false",
  },
  {
    id: "locale",
    name: "locale",
    fullName: "Locale",
    description:
      "OIDC profile claim containing locale preference, typically in BCP47 format.",
    type: "String",
    example: "en-US",
  },
  {
    id: "zoneinfo",
    name: "zoneinfo",
    fullName: "Time Zone",
    description:
      "OIDC profile claim containing timezone information as an IANA time zone string.",
    type: "String",
    example: "America/Los_Angeles",
  },
  {
    id: "sid",
    name: "sid",
    fullName: "Session ID",
    description:
      "OIDC session management claim that identifies a login session at the provider.",
    type: "String",
    example: "08a5019c-17e1-4977-8f42-65a12843ea02",
    securityNote:
      "Use sid for coordinated logout and session revocation handling.",
  },
  {
    id: "at_hash",
    name: "at_hash",
    fullName: "Access Token Hash",
    description:
      "OIDC claim containing a hash of the access token, enabling token integrity checks in hybrid/implicit flows.",
    type: "String",
    example: "77QmUPtjPfzWtF2AnpK9RQ",
    securityNote:
      "Validate at_hash when using flows where ID token and access token are returned together.",
  },
  {
    id: "c_hash",
    name: "c_hash",
    fullName: "Authorization Code Hash",
    description:
      "OIDC claim containing a hash of the authorization code for integrity checks.",
    type: "String",
    example: "LDktKdoQak3Pk0cnXxCltA",
    securityNote:
      "Validate c_hash in hybrid flows to detect code substitution attacks.",
  },
  {
    id: "client_id",
    name: "client_id",
    fullName: "Client Identifier",
    description:
      "Common claim used to identify which OAuth client obtained the token.",
    type: "String",
    example: "web-dashboard-client",
    securityNote:
      "Ensure tokens are used only by their intended client application.",
  },
  {
    id: "tenant",
    name: "tenant",
    fullName: "Tenant",
    description:
      "Custom multi-tenant claim identifying organization or workspace scope.",
    type: "String",
    example: "acme-corp",
    securityNote:
      "Always verify tenant isolation server-side to avoid cross-tenant data leaks.",
  },
];
