import { DescriptionBlock } from "@/types/description";
import { getRandomId } from "@/util/commonUtils";
import Typography from "@mui/material/Typography";
import { isEmpty, isNil, map } from "lodash-es";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { AppNavigationConfig } from "@/types/config";
import { RelatedToolCard } from "./appCards";
import { Tag } from "./lib/tags";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import Link from "next/link";

export function AppHeading({
  heading,
}: Readonly<{
  heading: string;
}>) {
  return (
    <Typography
      key={getRandomId()}
      variant="h1"
      className="text-center !text-2xl md:!text-4xl"
    >
      {heading}
    </Typography>
  );
}

export function RelatedTools({
  relatedToolsConfigs,
}: Readonly<{
  relatedToolsConfigs: AppNavigationConfig[];
}>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography key={getRandomId()} variant="h2" fontSize={"inherit"}>
        Related Tools
      </Typography>
      <div className="flex flex-col md:flex-row gap-2 w-full">
        {map(relatedToolsConfigs, (relatedToolConfig) => (
          <RelatedToolCard key={getRandomId()} config={relatedToolConfig} />
        ))}
      </div>
    </div>
  );
}

export function AppFollowButtons() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <Typography key={getRandomId()} variant="h3" fontSize={"inherit"}>
        Follow us on
      </Typography>
      <div className="flex flex-row gap-2">
        <Link
          href="https://www.facebook.com/people/Webtoolseasy/100088911459047/"
          target="_blank"
        >
          <FacebookIcon fontSize="medium" color="primary" />
        </Link>
        <Link
          href="https://www.linkedin.com/company/webtoolseasy/"
          target="_blank"
        >
          <LinkedInIcon fontSize="medium" color="primary" />
        </Link>
        <Link href="https://twitter.com/webtoolseasy" target="_blank">
          <XIcon fontSize="medium" color="inherit" />
        </Link>
      </div>
    </div>
  );
}

export function PageTags({ tags }: Readonly<{ tags: string[] }>) {
  return (
    <div className="flex flex-row gap-2 justify-center flex-wrap">
      {map(tags, (tag) => (
        <Tag label={tag} key={getRandomId()} color={"secondary"} />
      ))}
    </div>
  );
}

export function ToolDescription({
  descriptionData,
}: Readonly<{ descriptionData: DescriptionBlock[] }>) {
  return (
    <div className="flex flex-col w-full gap-2">
      {map(descriptionData, (descriptionBlock) => (
        <ToolDescriptionBlock
          key={getRandomId()}
          descriptionBlock={descriptionBlock}
        />
      ))}
    </div>
  );
}

function ToolDescriptionBlock({
  descriptionBlock,
}: Readonly<{
  descriptionBlock: DescriptionBlock;
}>) {
  return (
    <div key={getRandomId()} className="flex flex-col w-full gap-2">
      <Typography variant="h3" fontSize={"inherit"} color="secondary">
        {descriptionBlock.heading}
      </Typography>
      {!isNil(descriptionBlock.blockData) &&
        isEmpty(descriptionBlock.listData) && (
          <DescriptionDataBlockData blockData={descriptionBlock.blockData} />
        )}
      {!isNil(descriptionBlock.listData) &&
        isEmpty(descriptionBlock.blockData) && (
          <DescriptionDataListData listData={descriptionBlock.listData} />
        )}
      {!isNil(descriptionBlock.links) && (
        <DescriptionLinks links={descriptionBlock.links} />
      )}
    </div>
  );
}

function DescriptionLinks({
  links,
}: Readonly<{
  links: { url: string; displayText: string }[];
}>) {
  return (
    <div className="flex flex-col gap-2">
      {map(links, (link) => (
        <div className="flex flex-row gap-2">
          <KeyboardArrowRightIcon />
          <Typography
            key={getRandomId()}
            href={link.url}
            component={"a"}
            color="primary"
            target="_blank"
            className="underline"
          >
            {link.displayText}
          </Typography>
        </div>
      ))}
    </div>
  );
}

function DescriptionDataBlockData({
  blockData,
}: Readonly<{
  blockData: string[];
}>) {
  return (
    <div key={getRandomId()} className="flex flex-col gap-2 w-full">
      {map(blockData, (data) => (
        <Typography key={getRandomId()} variant="body1" color="textSecondary">
          {data}
        </Typography>
      ))}
    </div>
  );
}

function DescriptionDataListData({
  listData,
}: Readonly<{
  listData: string[];
}>) {
  return (
    <div key={getRandomId()} className="flex flex-col gap-2 w-full">
      {map(listData, (data) => (
        <div key={getRandomId()} className="flex flex-row gap-2 w-full">
          <KeyboardArrowRightIcon />
          <Typography key={getRandomId()} variant="body1" color="textSecondary">
            {data}
          </Typography>
        </div>
      ))}
    </div>
  );
}
