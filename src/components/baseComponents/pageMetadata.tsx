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
      {updatedBy.gender === "F" ? (
        <WomenUserIcon
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium"
          focusable="false"
          aria-hidden="true"
          style={{
            userSelect: "none",
            width: "1em",
            height: "1em",
            display: "inline-block",
            fill: "currentColor",
            flexShrink: 0,
            transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            fontSize: "2rem",
          }}
        />
      ) : (
        <ManUserIcon
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium"
          focusable="false"
          aria-hidden="true"
          style={{
            userSelect: "none",
            width: "1em",
            height: "1em",
            display: "inline-block",
            fill: "currentColor",
            flexShrink: 0,
            transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            fontSize: "2rem",
          }}
        />
      )}
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
