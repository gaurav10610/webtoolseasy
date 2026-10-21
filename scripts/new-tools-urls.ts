export interface NewToolUrl {
  url: string;
  createdAt: string;
}

export const newToolsUrls: NewToolUrl[] = [
  { url: "https://webtoolseasy.com/", createdAt: new Date().toISOString() },
  { url: "https://webtoolseasy.com/drop", createdAt: new Date().toISOString() },
  { url: "https://webtoolseasy.com/beam", createdAt: new Date().toISOString() },
  { url: "https://webtoolseasy.com/codepair", createdAt: new Date().toISOString() },
  { url: "https://webtoolseasy.com/studio", createdAt: new Date().toISOString() },
  { url: "https://webtoolseasy.com/tools", createdAt: new Date().toISOString() },
  { url: "https://webtoolseasy.com/blog", createdAt: new Date().toISOString() },
  { url: "https://webtoolseasy.com/sitemap.xml", createdAt: new Date().toISOString() },
];
