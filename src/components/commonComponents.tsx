import { DescriptionBlock } from "@/@types/description";
import { getRandomId } from "@/util/commonUtils";
import Typography from "@mui/material/Typography";
import { isEmpty, isNil, map } from "lodash-es";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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
