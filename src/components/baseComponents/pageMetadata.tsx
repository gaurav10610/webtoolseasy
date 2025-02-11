import { CustomSvgIcon } from "../lib/icons";
import ManUserIcon from "@/data/icons/man-user.svg";
import WomenUserIcon from "@/data/icons/woman-user.svg";
import { UpdatedBy } from "@/types/domain-entities";
import { formatUpdatedAt } from "@/util/commonUtils";
import { Typography } from "@mui/material";

export function UpdatedByWithIcon({
  label = "Updated By:",
  updatedBy,
  className = "",
}: Readonly<{
  label?: string;
  updatedBy: UpdatedBy;
  className?: string;
}>) {
  return (
    <div className={className}>
      <CustomSvgIcon
        sx={{
          fontSize: "2rem",
        }}
      >
        {updatedBy.gender === "F" ? (
          <>
            <WomenUserIcon />
          </>
        ) : (
          <>
            <ManUserIcon />
          </>
        )}
      </CustomSvgIcon>
      <div className="flex flex-col">
        <Typography variant="caption">{label}</Typography>
        <Typography variant="caption" align="right" color="text.secondary">
          {updatedBy.name}
        </Typography>
      </div>
    </div>
  );
}

export function UpdatedAt({
  label = "Last Updated At:",
  updatedAt,
  className = "",
}: Readonly<{ label?: string; updatedAt: string; className?: string }>) {
  return (
    <div className={className}>
      <Typography variant="caption" align="right">
        {label}
      </Typography>
      <Typography variant="caption" align="right" color="text.secondary">
        {formatUpdatedAt(new Date(updatedAt))}
      </Typography>
    </div>
  );
}

export function PageMetadata({
  updatedBy,
  updatedAt,
}: Readonly<{ updatedBy: UpdatedBy; updatedAt: string }>) {
  return (
    <div className="flex flex-row w-full justify-between">
      <UpdatedByWithIcon
        updatedBy={updatedBy}
        className="flex flex-row gap-2"
      />
      <UpdatedAt updatedAt={updatedAt} className="flex flex-col" />
    </div>
  );
}
