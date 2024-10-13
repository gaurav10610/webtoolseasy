import { getRandomId } from "@/util/commonUtils";
import { ReactNode, Fragment } from "react";

interface FlexListProps {
  items: ReactNode[];
  flexGap?: string;
  isDirectionRow?: boolean;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  flexCenter?: boolean;
  alignCenter?: boolean;
  sx?: Record<string, unknown>;
  classList?: string[];
}

export function FlexList({
  items,
  isDirectionRow,
  flexGap,
  isFullWidth,
  isFullHeight,
  flexCenter,
  alignCenter,
  sx = {},
  classList = [],
}: Readonly<FlexListProps>) {
  const finalClassList = [
    isDirectionRow ? "row-display" : "column-display",
    isFullWidth ? "full-width" : "",
    isFullHeight ? "full-height" : "",
    alignCenter ? "flex-vr-center" : "",
    flexCenter ? "flex-hz-center" : "",
    ...classList,
  ].join(" ");

  const stylesObj = {
    gap: flexGap ? flexGap : "10px",
    ...sx,
  };
  return (
    <div className={finalClassList} style={stylesObj} key={getRandomId()}>
      {items.map((item) => (
        <Fragment key={getRandomId()}>{item}</Fragment>
      ))}
    </div>
  );
}
