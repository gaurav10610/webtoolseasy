import { getJsonData } from "@/util/appDataUtils";
import parse, { DOMNode, domToReact } from "html-react-parser";
import "./blog.css";
import { Link, Typography } from "@mui/material";
import { ButtonWithHandler } from "@/components/lib/buttons";
import { BlogEntity } from "@/types/domain-entities";
import { join, map } from "lodash-es";
import fs from "fs";
import { SocialShareButtons } from "@/components/socialShareButtons";
import { H1Heading } from "@/components/baseComponents/headings";
import { PageMetadata } from "@/components/baseComponents/pageMetadata";

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ [key: string]: string }>;
  }>
) {
  const { pageUrl } = await props.params;
  const jsonData = (await getJsonData(`blog/${pageUrl}`)) as BlogEntity;

  return {
    alternates: {
      canonical: `${process.env.HOSTNAME}/blog/${pageUrl}`,
    },
    title: jsonData.pageMetadata.title,
    description: jsonData.pageMetadata.description,
    icons: "/favicon.png",
    authors: {
      name: "Gaurav Kumar Yadav",
    },
    robots: "index, follow",
    metadataBase: new URL(process.env.HOSTNAME!),
    openGraph: {
      title: jsonData.pageMetadata.title,
      type: "website",
      url: `${process.env.HOSTNAME}/blog/${pageUrl}`,
      images: [`/screenshots/blog/${pageUrl}.png`],
      description: jsonData.pageMetadata.description,
      siteName: "WebToolsEasy",
    },
    twitter: {
      card: "summary_large_image",
      site: "@webtoolseasy",
      title: jsonData.pageMetadata.title,
      description: jsonData.pageMetadata.title,
      images: [`/screenshots/blog/${pageUrl}.png`],
    },
    keywords: join(
      map(jsonData.tags, (tag) => tag),
      ", "
    ),
  };
}

const AdminControls = ({ pageUrl }: { pageUrl: string }) => {
  return (
    <div className="flex flex-col gap-4 w-full items-center p-3 rounded-md border-2 border-gray-300">
      <Typography variant="h5">Admin Controls</Typography>
      <div className="flex flex-row gap-2 w-full justify-end">
        <Link href={`${pageUrl}/edit`} target="_blank">
          <ButtonWithHandler buttonText="Edit Blog Page" size="small" />
        </Link>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const staticParams: { pageUrl: string }[] = [];
  const baseFolderPath = `${process.cwd()}/src/data/blog`;
  const files = fs.readdirSync(baseFolderPath);
  files.forEach((file) => {
    const pageUrl = file.replace(".json", "");
    staticParams.push({
      pageUrl,
    });
  });
  return staticParams;
}

export default async function BlogPage(
  props: Readonly<{
    params: Promise<{ [key: string]: string }>;
  }>
) {
  const { pageUrl } = await props.params;
  const jsonData = (await getJsonData(`blog/${pageUrl}`)) as BlogEntity;

  const options = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replace: (domNode: any) => {
      if (domNode.name === "body") {
        return (
          <>{domToReact(domNode.children as unknown as DOMNode[], options)}</>
        );
      }
    },
  };

  const parsedContent = parse(jsonData.html, options);

  return (
    <div className="w-full flex flex-col gap-3 blog-div">
      {process.env.NODE_ENV !== "production" && (
        <AdminControls pageUrl={jsonData.pageUrl} />
      )}
      <H1Heading heading={jsonData.heading} />
      <SocialShareButtons
        pageUrl={`${process.env.HOSTNAME}${jsonData.pageUrl}`}
        heading={jsonData.heading}
      />
      <PageMetadata
        updatedBy={jsonData.updatedBy}
        updatedAt={jsonData.updatedAt}
      />
      {parsedContent}
    </div>
  );
}
