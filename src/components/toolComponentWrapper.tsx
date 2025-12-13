"use client";

import dynamic from "next/dynamic";
import { Suspense, memo, useCallback, useEffect, useState } from "react";
import { ToolComponentProps } from "@/types/component";
import { ToolPageSkeleton } from "./lib/skeletons";
import { useSearchParams } from "next/navigation";
import { decompressStringFromBase64 } from "@/util/commonUtils";

interface ToolComponentWrapperProps {
  pageUrl: string;
  hostname: string;
}

const ToolComponentWrapper = memo(
  ({ pageUrl, hostname }: Readonly<ToolComponentWrapperProps>) => {
    const searchParams = useSearchParams();
    const [queryParams, setQueryParams] = useState<{ [key: string]: string }>(
      {}
    );

    useEffect(() => {
      const processParams = async () => {
        const params: { [key: string]: string } = {};
        if (searchParams) {
          for (const [key, value] of searchParams.entries()) {
            params[key] = await decompressStringFromBase64(value);
          }
        }
        setQueryParams(params);
      };
      processParams();
    }, [searchParams]);

    // Memoize the dynamic import to prevent recreation on re-renders
    const ToolComponent = useCallback(() => {
      const Component = dynamic(
        () =>
          import(`@/components/tools/${pageUrl}.tsx`).catch((error) => {
            if (process.env.NODE_ENV === "development") {
              console.error(`Failed to load tool component: ${pageUrl}`, error);
            }
            // Return a fallback component for failed imports
            return {
              default: () => (
                <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
                  <h2 className="text-xl font-semibold text-red-700 mb-2">
                    Tool Not Found
                  </h2>
                  <p className="text-red-600 text-center">
                    The requested tool &ldquo;{pageUrl}&rdquo; could not be
                    loaded.
                  </p>
                  <p className="text-sm text-red-500 mt-2">
                    Please check the URL or try refreshing the page.
                  </p>
                </div>
              ),
            };
          }),
        {
          loading: () => <ToolPageSkeleton />,
          ssr: false,
        }
      ) as React.FC<ToolComponentProps>;

      return <Component hostname={hostname} queryParams={queryParams} />;
    }, [pageUrl, hostname, queryParams]);

    return (
      <Suspense fallback={<ToolPageSkeleton />}>
        <ToolComponent />
      </Suspense>
    );
  }
);

ToolComponentWrapper.displayName = "ToolComponentWrapper";

export default ToolComponentWrapper;
