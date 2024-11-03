import { DescriptionBlock } from "@/types/description";
import { getRandomId } from "@/util/commonUtils";
import Typography from "@mui/material/Typography";
import { isEmpty, isNil, map } from "lodash-es";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { AppNavigationConfig } from "@/types/config";
import { FlexList } from "./lib/flexComponents";
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
      sx={{
        fontSize: "2rem",
        textAlign: "center",
      }}
    >
      {heading}
    </Typography>
  );
}

export function RelatedTools({
  relatedToolsConfigs,
  isMobileView,
}: Readonly<{
  relatedToolsConfigs: AppNavigationConfig[];
  isMobileView: boolean;
}>) {
  return (
    <FlexList
      isFullWidth={true}
      items={[
        <Typography
          key={getRandomId()}
          variant="h2"
          fontSize={"inherit"}
          color="textPrimary"
        >
          Related Tools
        </Typography>,
        <FlexList
          key={getRandomId()}
          isFullWidth={true}
          isDirectionRow={!isMobileView}
          items={map(relatedToolsConfigs, (relatedToolConfig) => (
            <RelatedToolCard key={getRandomId()} config={relatedToolConfig} />
          ))}
        />,
      ]}
    />
  );
}

export function AppFollowButtons() {
  return (
    <FlexList
      key={getRandomId()}
      flexCenter={true}
      alignCenter={true}
      items={[
        <Typography key={getRandomId()} variant="h3" fontSize={"inherit"}>
          Follow us on
        </Typography>,
        <FlexList
          key={getRandomId()}
          isDirectionRow={true}
          items={[
            <Link
              key={getRandomId()}
              href="https://www.facebook.com/people/Webtoolseasy/100088911459047/"
              target="_blank"
            >
              <FacebookIcon fontSize="large" color="primary" />
            </Link>,
            <Link
              key={getRandomId()}
              href="https://www.linkedin.com/company/webtoolseasy/"
              target="_blank"
            >
              <LinkedInIcon fontSize="large" color="primary" />
            </Link>,
            <Link
              key={getRandomId()}
              href="https://twitter.com/webtoolseasy"
              target="_blank"
            >
              <XIcon fontSize="large" color="inherit" />
            </Link>,
          ]}
        />,
      ]}
    />
  );
}

export function PageTags({ tags }: Readonly<{ tags: string[] }>) {
  return (
    <FlexList
      key={getRandomId()}
      flexCenter={true}
      isDirectionRow={true}
      items={map(tags, (tag) => (
        <Tag label={tag} key={getRandomId()} color={"secondary"} />
      ))}
      sx={{ flexWrap: "wrap" }}
    />
  );
}

export function ToolDescription({
  descriptionData,
}: Readonly<{ descriptionData: DescriptionBlock[] }>) {
  return (
    <div className="column-display full-width base-flex-gap">
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
    <div
      key={getRandomId()}
      className="column-display inner-flex-gap full-width"
    >
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
    </div>
  );
}

function DescriptionDataBlockData({
  blockData,
}: Readonly<{
  blockData: string[];
}>) {
  return (
    <div
      key={getRandomId()}
      className="column-display inner-flex-gap full-width"
    >
      {map(blockData, (data) => (
        <Typography key={getRandomId()} variant="body1">
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
    <div
      key={getRandomId()}
      className="column-display inner-flex-gap full-width"
    >
      {map(listData, (data) => (
        <div
          key={getRandomId()}
          className="row-display inner-flex-gap full-width"
        >
          <KeyboardArrowRightIcon />
          <Typography key={getRandomId()} variant="body1">
            {data}
          </Typography>
        </div>
      ))}
    </div>
  );
}
