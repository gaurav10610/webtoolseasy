import { join, map } from "lodash-es";
import blogList from "@/data/overviewList.json";
import BlogList from "@/components/blogList";

const pageTitle = "NaukriNotify - Blog";
const pageDescription = "NaukriNotify Blog";
const keywords: string[] = [];

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `${process.env.HOSTNAME}/blog`,
    },
    title: pageTitle,
    description: pageDescription,
    icons: "/app-icon1.svg",
    authors: {
      name: "Gaurav Kumar Yadav",
    },
    robots: "index, follow",
    metadataBase: new URL(process.env.HOSTNAME!),
    openGraph: {
      title: pageTitle,
      type: "website",
      url: `${process.env.HOSTNAME}/blog`,
      images: [`/screenshots/blog.png`],
      description: pageDescription,
      siteName: "NaukriNotify",
    },
    twitter: {
      card: "summary_large_image",
      site: "@naukrinotify",
      title: pageTitle,
      description: pageDescription,
      images: [`/screenshots/blog.png`],
    },
    keywords: join(
      map(keywords, (tag) => tag),
      ", "
    ),
  };
}

export default async function BlogListPage() {
  return <BlogList blogList={blogList} />;
}
