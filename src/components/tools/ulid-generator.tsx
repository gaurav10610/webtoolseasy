"use client";

import { ToolComponentProps } from "@/types/component";
import UuidV4Generator from "./uuid-v4-generator";

export default function UlidGenerator(props: Readonly<ToolComponentProps>) {
  return <UuidV4Generator {...props} />;
}
