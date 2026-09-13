import { BlogEntityOverview } from "@/types/domain-entities";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { find, isNil } from "lodash-es";

export async function saveJsonFile({
  folder,
  fileName,
  data,
}: Readonly<{
  folder: string;
  fileName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}>) {
  const filePath = `${process.cwd()}/src/data/${folder}/${fileName}.json`;

  if (existsSync(filePath)) {
    throw new Error("File already exist!");
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2));

  return { success: true };
}

export async function updateJsonFile({
  folder,
  fileName,
  data,
}: Readonly<{
  folder: string;
  fileName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}>) {
  const filePath = `${process.cwd()}/src/data/${folder}/${fileName}.json`;

  if (!existsSync(filePath)) {
    throw new Error("File Not Found!");
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2));

  if (data.isDisabled === "YES") {
    return { success: true };
  }

  const blogListPath = `${process.cwd()}/src/data/blogList.json`;
  const blogListData = readFileSync(blogListPath, "utf8");
  const blogListJson = JSON.parse(blogListData) as BlogEntityOverview[];

  const blogListEntry: BlogEntityOverview | undefined = find(
    blogListJson,
    (entry: { pageUrl: string }) => entry.pageUrl === `/${folder}/${fileName}`
  );

  if (isNil(blogListEntry)) {
    blogListJson.push({
      pageUrl: `/${folder}/${fileName}`,
      heading: data.heading,
      updatedAt: data.updatedAt,
      updatedBy: data.updatedBy,
    });
  } else {
    blogListEntry.heading = data.heading;
    blogListEntry.updatedAt = data.updatedAt;
    blogListEntry.updatedBy = data.updatedBy;
    blogListEntry.pageUrl = `/${folder}/${fileName}`;
  }

  writeFileSync(blogListPath, JSON.stringify(blogListJson, null, 2));

  return { success: true };
}
