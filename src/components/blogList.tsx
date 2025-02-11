import { BlogEntityOverview } from "@/types/domain-entities";
import { getRandomId } from "@/util/commonUtils";
import { Typography } from "@mui/material";
import { map } from "lodash-es";
import Link from "next/link";
import { PaperWithChildren } from "@/components/lib/papers";
import { ButtonWithHandler } from "@/components/lib/buttons";
import { SocialShareButtons } from "./socialShareButtons";
import { H1Heading } from "./baseComponents/headings";
import { PageMetadata } from "@/components/baseComponents/pageMetadata";

const BlogOverviewListItem = ({
  blogEntityOverview,
}: Readonly<{
  blogEntityOverview: BlogEntityOverview;
}>) => {
  return (
    <PaperWithChildren variant="elevation" elevation={3} className="w-full p-2">
      <Link
        href={`${blogEntityOverview.pageUrl}`}
        className="no-underline flex flex-col gap-2 w-full"
      >
        <Typography variant="body2" color="info">
          {blogEntityOverview.heading}
        </Typography>
        <PageMetadata
          updatedBy={blogEntityOverview.updatedBy}
          updatedAt={blogEntityOverview.updatedAt}
        />
      </Link>
    </PaperWithChildren>
  );
};

const AdminControls = () => {
  return (
    <div className="flex flex-col gap-4 w-full items-center p-3 rounded-md border-2 border-gray-300">
      <Typography variant="h5">Admin Controls</Typography>
      <div className="flex flex-row gap-2 w-full justify-end">
        <Link href={`/blog/add`}>
          <ButtonWithHandler buttonText="Add Page" size="small" />
        </Link>
      </div>
    </div>
  );
};

/**
 * @TODO - Change social share heading afterwards in this component
 * and in naukrinotify as well
 *
 * @param param0
 * @returns
 */
export default async function BlogList({
  blogList,
}: Readonly<{ blogList: BlogEntityOverview[] }>) {
  return (
    <div className="w-full flex flex-col gap-3">
      {process.env.NODE_ENV !== "production" && <AdminControls />}
      <H1Heading heading={"This is blog page!!"} />
      <SocialShareButtons
        key={getRandomId()}
        pageUrl={`${process.env.HOSTNAME}/blog`}
        heading={"This is heading"}
      />
      {map(blogList, (blogEntityOverview) => (
        <BlogOverviewListItem
          key={getRandomId()}
          blogEntityOverview={blogEntityOverview}
        />
      ))}
    </div>
  );
}
