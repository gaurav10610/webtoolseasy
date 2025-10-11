This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Scripts: Share tools to social platforms

The repository includes a helper script that generates share URLs for every tool and can optionally post to social platforms when API credentials are provided via environment variables.

File: `scripts/share-tools.ts`

Usage:

1. Create a `.env` file in the project root (this file should be gitignored).

Example `.env`:

```
# Base URL used when building share links (defaults to http://localhost:3000)
SHARE_BASE_URL=https://your-site.com

# Optional: X/Twitter (v2) Bearer token for posting tweets
X_BEARER_TOKEN=YOUR_TWITTER_BEARER_TOKEN

# Optional: Facebook Page credentials (page access token + page id)
FB_PAGE_ACCESS_TOKEN=YOUR_FB_PAGE_ACCESS_TOKEN
FB_PAGE_ID=YOUR_FB_PAGE_ID

# Optional: LinkedIn credentials
LINKEDIN_ACCESS_TOKEN=YOUR_LINKEDIN_ACCESS_TOKEN
LINKEDIN_OWNER_URN=urn:li:person:XXXXXXXX

# Optional: Telegram bot credentials
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=@yourchannel_or_chatid
```

2. Run the script (no credentials required to only print share links):

```bash
node ./scripts/share-tools.ts
```

Sample console output (truncated):

```
Share tools script starting...

Tool: JavaScript Editor Online
 URL: https://your-site.com/tools/javascript-editor
 Share URLs:
	- facebook: https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fyour-site.com%2Ftools%2Fjavascript-editor
	- whatsapp: https://api.whatsapp.com/send?text=JavaScript%20Editor%20Online%20%E2%80%94%20https%3A%2F%2Fyour-site.com%2Ftools%2Fjavascript-editor
	- x: https://twitter.com/intent/tweet?text=JavaScript%20Editor%20Online&url=https%3A%2F%2Fyour-site.com%2Ftools%2Fjavascript-editor
	- linkedin: https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fyour-site.com%2Ftools%2Fjavascript-editor
	- telegram: https://t.me/share/url?url=https%3A%2F%2Fyour-site.com%2Ftools%2Fjavascript-editor&text=JavaScript%20Editor%20Online

... (other tools)

Done. Summary:
{}
```

Notes:
- The script only attempts to post via platform APIs when the corresponding credentials are present in env variables. It logs API responses for inspection.
- Use caution when posting programmatically — ensure tokens have appropriate scopes and follow platform rate limits and policies.
