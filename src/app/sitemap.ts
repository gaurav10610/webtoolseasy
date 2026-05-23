import { MetadataRoute } from 'next';

const DEVELOPER_TOOLS = [
  "/tools/api-tester",
  "/tools/json-to-zod",
  "/tools/svg-to-react",
  "/tools/regex-explainer",
  "/tools/cron-explainer",
  "/tools/jwt-debugger",
  "/tools/rsa-generator",
  "/tools/sqlite-studio",
  "/tools/log-explorer",
  "/tools/code-to-image",
  "/tools/dev-lens",
  "/tools/screen-recorder",
  "/tools/css-effects",
  "/tools/yaml-json-converter",
  "/tools/sql-formatter",
  "/tools/docker-compose",
  "/tools/id-generator",
  "/tools/base64-file",
  "/tools/bcrypt-generator",
  "/tools/color-a11y",
  "/tools/diff-checker",
  "/tools/css-grid-architect"
];

const MOCK_API_TEMPLATES = [
  "/mock-api/ecommerce-products",
  "/mock-api/user-profiles",
  "/mock-api/blog-posts",
  "/mock-api/real-estate"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://webtoolseasy.com';

  const tools = DEVELOPER_TOOLS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const mockApis = MOCK_API_TEMPLATES.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...tools,
    ...mockApis
  ];
}
