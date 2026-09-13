"use client";

import dynamic from "next/dynamic";
import { Suspense, memo, useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ToolComponentProps } from "@/types/component";
import { ToolPageSkeleton } from "./lib/skeletons";
import { decompressStringFromBase64 } from "@/util/commonUtils";

interface ToolComponentWrapperProps {
  pageUrl: string;
  queryParams?: { [key: string]: string };
  hostname: string;
}

function ToolComponentInner({
  pageUrl,
  hostname,
  initialQueryParams = {},
}: {
  pageUrl: string;
  hostname: string;
  initialQueryParams?: { [key: string]: string };
}) {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] =
    useState<{ [key: string]: string }>(initialQueryParams);

  useEffect(() => {
    let isMounted = true;
    async function parseParams() {
      if (!searchParams || searchParams.size === 0) {
        return;
      }
      const parsed: { [key: string]: string } = {};
      for (const [key, val] of searchParams.entries()) {
        try {
          parsed[key] = await decompressStringFromBase64(val);
        } catch {
          parsed[key] = val;
        }
      }
      if (isMounted) {
        setQueryParams(parsed);
      }
    }
    parseParams();
    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  const Component = useMemo(() => {
    return dynamic(
      () =>
        import(`@/components/tools/${pageUrl}.tsx`).catch((error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(`Failed to load tool component: ${pageUrl}`, error);
          }
          return {
            default: () => (
              <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-xl font-semibold text-red-700 mb-2">
                  Tool Not Found
                </h2>
                <p className="text-red-600 text-center">
                  The requested tool &ldquo;{pageUrl}&rdquo; could not be loaded.
                </p>
                <p className="text-sm text-red-500 mt-2">
                  Please check the URL or try refreshing the page.
                </p>
              </div>
            ),
          };
        }),
      {
        ssr: false,
        loading: () => <ToolPageSkeleton />,
      },
    ) as React.FC<ToolComponentProps>;
  }, [pageUrl]);

  return <Component hostname={hostname} queryParams={queryParams} />;
}

const ToolComponentWrapper = memo(
  ({ pageUrl, queryParams, hostname }: Readonly<ToolComponentWrapperProps>) => {
    return (
      <Suspense fallback={<ToolPageSkeleton />}>
        <ToolComponentInner
          pageUrl={pageUrl}
          hostname={hostname}
          initialQueryParams={queryParams}
        />
      </Suspense>
    );
  },
);

ToolComponentWrapper.displayName = "ToolComponentWrapper";

export default ToolComponentWrapper;
