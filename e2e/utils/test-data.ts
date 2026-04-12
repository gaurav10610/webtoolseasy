import { readdirSync } from "fs";
import { join } from "path";

let cachedTools: string[] | null = null;
let cachedBlogs: string[] | null = null;

export function getAllTools(): string[] {
  if (cachedTools) return cachedTools;

  const toolsDir = join(process.cwd(), "src/data/tools");
  const toolFiles = readdirSync(toolsDir).filter((file) =>
    file.endsWith(".ts"),
  );
  cachedTools = toolFiles.map((file) => file.replace(".ts", ""));
  return cachedTools;
}

export function getAllBlogs(): string[] {
  if (cachedBlogs) return cachedBlogs;

  const blogConfigDir = join(process.cwd(), "src/data/blog/config");
  const blogFiles = readdirSync(blogConfigDir).filter((file) =>
    file.endsWith(".ts"),
  );
  cachedBlogs = blogFiles.map((file) => file.replace(".ts", ""));
  return cachedBlogs;
}

export function getToolCount(): number {
  return getAllTools().length;
}

export function getBlogCount(): number {
  return getAllBlogs().length;
}
