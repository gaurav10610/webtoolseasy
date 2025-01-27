"use client";

import dynamic from "next/dynamic";
import { CircularLoader } from "./lib/loaders";
import { ToolComponentProps } from "@/types/component";

const ToolComponentWrapper = ({
  pageUrl,
  queryParams,
}: Readonly<{
  pageUrl: string;
  queryParams: { [key: string]: string };
}>) => {
  const ToolComponent = dynamic(
    () => import(`@/components/tools/${pageUrl}.tsx`),
    {
      loading: () => <CircularLoader color="secondary" />,
      ssr: false,
    }
  ) as React.FC<ToolComponentProps>;

  return (
    <ToolComponent hostname={process.env.HOSTNAME} queryParams={queryParams} />
  );
};

export default ToolComponentWrapper;
