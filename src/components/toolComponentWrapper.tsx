"use client";

import dynamic from "next/dynamic";
import { ToolComponentProps } from "@/types/component";
import { SkeletonWithProps } from "./lib/skeletons";

const ToolComponentWrapper = ({
  pageUrl,
  queryParams,
  hostname,
}: Readonly<{
  pageUrl: string;
  queryParams: { [key: string]: string };
  hostname: string;
}>) => {
  const ToolComponent = dynamic(
    () => import(`@/components/tools/${pageUrl}.tsx`),
    {
      loading: () => <SkeletonWithProps />,
      ssr: false,
    }
  ) as React.FC<ToolComponentProps>;

  return <ToolComponent hostname={hostname} queryParams={queryParams} />;
};

export default ToolComponentWrapper;
