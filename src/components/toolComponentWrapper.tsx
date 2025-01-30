"use client";

import dynamic from "next/dynamic";
import { ToolComponentProps } from "@/types/component";
import { SkeletonWithProps } from "./lib/skeletons";

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
      loading: () => <SkeletonWithProps />,
      ssr: false,
    }
  ) as React.FC<ToolComponentProps>;

  return (
    <ToolComponent hostname={process.env.HOSTNAME} queryParams={queryParams} />
  );
};

export default ToolComponentWrapper;
