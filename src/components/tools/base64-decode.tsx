"use client";

import { ToolComponentProps } from "@/types/component";
import Base64Encode from "./base64-encode";

export default function Base64Decode(props: Readonly<ToolComponentProps>) {
  // Render consolidated Base64 studio initialized in decode mode
  const mergedParams = {
    ...props.queryParams,
    mode: "decode",
  };

  return <Base64Encode {...props} queryParams={mergedParams} />;
}
