"use client";

import dynamic from "next/dynamic";
import { Suspense, memo, useCallback } from "react";
import { ToolComponentProps } from "@/types/component";
import { SkeletonWithProps } from "./lib/skeletons";

interface ToolComponentWrapperProps {
  pageUrl: string;
  queryParams: { [key: string]: string };
  hostname: string;
}

const ToolComponentWrapper = memo(
  ({ pageUrl, queryParams, hostname }: Readonly<ToolComponentWrapperProps>) => {
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
          loading: () => <SkeletonWithProps />,
          ssr: false,
        }
      ) as React.FC<ToolComponentProps>;

      return <Component hostname={hostname} queryParams={queryParams} />;
    }, [pageUrl, hostname, queryParams]);

    return (
      <Suspense fallback={<SkeletonWithProps />}>
        <ToolComponent />
      </Suspense>
    );
  }
);

ToolComponentWrapper.displayName = "ToolComponentWrapper";

export default ToolComponentWrapper;
