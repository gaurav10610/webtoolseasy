# Security Policy

## Supported Versions

Security fixes are applied on the default branch and included in subsequent releases.

## Reporting a Vulnerability

Please do not open public GitHub issues for security vulnerabilities.

Send a private report with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any proof-of-concept details

Preferred contact:

- GitHub: open a private security advisory in this repository
- Maintainer: https://github.com/gaurav10610

## Response Expectations

- Initial triage target: within 7 days
- Status update target: within 14 days
- Fix timeline depends on severity and complexity

## Secrets and Sensitive Data

- Never commit API keys, private keys, or service account files.
- Use `.env.local` for local development secrets.
- Use deployment platform secret managers in production.

If a secret is accidentally committed:

1. Revoke or rotate it immediately.
2. Remove it from source control and history if required.
3. Document the incident and remediation steps.
