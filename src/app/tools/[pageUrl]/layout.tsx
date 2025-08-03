import {
  ApplicationConfig,
  ApplicationIds,
  AppListConfig,
  AppNavigationConfig,
} from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import {
  AppHeading,
  RelatedTools,
  ToolDescription,
} from "@/components/commonComponents";
import * as appConfigJson from "@/data/apps.json";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import SidePanel from "@/components/sidePanel";
import { BaseToolsAds } from "@/components/baseAds";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structuredData";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ [key: string]: string }>;
}

interface ToolData {
  metadata: Metadata;
  descriptionData: DescriptionBlock[];
  componentConfig: ApplicationConfig;
}

/**
 * Dynamically imports tool data with error handling
 * @param pageUrl - The tool page URL
 * @returns Tool data or throws error
 */
async function getToolData(pageUrl: string): Promise<ToolData> {
  // Validate pageUrl to prevent loading invalid tool names
  if (
    !pageUrl ||
    pageUrl.includes(".js") ||
    pageUrl.includes(".mjs") ||
    pageUrl.includes(".")
  ) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Invalid tool pageUrl detected: ${pageUrl}`);
    }
    notFound();
  }

  try {
    const toolModule = await import(`@/data/tools/${pageUrl}`);

    // Validate that the module has required exports
    if (
      !toolModule.metadata ||
      !toolModule.descriptionData ||
      !toolModule.componentConfig
    ) {
      if (process.env.NODE_ENV === "development") {
        console.error(`Tool module missing required exports: ${pageUrl}`, {
          hasMetadata: !!toolModule.metadata,
          hasDescriptionData: !!toolModule.descriptionData,
          hasComponentConfig: !!toolModule.componentConfig,
        });
      }
      notFound();
    }

    return {
      metadata: toolModule.metadata,
      descriptionData: toolModule.descriptionData,
      componentConfig: toolModule.componentConfig,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Failed to load tool data for: ${pageUrl}`, error);
    }
    notFound();
  }
}

/**
 * generates meta tags for the page
 * @param props - page url params
 * @returns metadata for the page
 */
export async function generateMetadata(
  props: Readonly<LayoutProps>
): Promise<Metadata> {
  const params = await props.params;

  // Add detailed logging for debugging (dev only)
  if (process.env.NODE_ENV === "development") {
    console.log(`Generating metadata for pageUrl: "${params.pageUrl}"`);
  }

  // Check for invalid pageUrl patterns that might come from Pyodide
  if (!params.pageUrl || typeof params.pageUrl !== "string") {
    if (process.env.NODE_ENV === "development") {
      console.error(`Invalid pageUrl type:`, params.pageUrl);
    }
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found.",
    };
  }

  // Block known problematic file extensions
  const invalidPatterns = [".js", ".mjs", ".css", ".map", ".json"];
  if (invalidPatterns.some((pattern) => params.pageUrl.includes(pattern))) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Blocked invalid pageUrl pattern: "${params.pageUrl}"`);
    }
    return {
      title: "Invalid Tool Request",
      description: "The requested resource is not a valid tool.",
    };
  }

  try {
    const { metadata } = await getToolData(params.pageUrl);
    return metadata;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `Failed to generate metadata for: ${params.pageUrl}`,
        error
      );
    }
    // Return default metadata for fallback
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found.",
    };
  }
}

export default async function WebToolLayout(props: Readonly<LayoutProps>) {
  const params = await props.params;
  const { children } = props;

  // Add detailed logging and validation (dev only)
  if (process.env.NODE_ENV === "development") {
    console.log(`WebToolLayout called with pageUrl: "${params.pageUrl}"`);
  }

  // Early validation to prevent loading invalid tools
  if (!params.pageUrl || typeof params.pageUrl !== "string") {
    if (process.env.NODE_ENV === "development") {
      console.error(`Invalid pageUrl in layout:`, params.pageUrl);
    }
    notFound();
  }

  // Block file extensions and known problematic patterns
  const invalidPatterns = [
    ".js",
    ".mjs",
    ".css",
    ".map",
    ".json",
    ".wasm",
    ".data",
    "stackframe",
    "pyodide",
    "micropip",
    "distutils",
  ];

  if (invalidPatterns.some((pattern) => params.pageUrl.includes(pattern))) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Blocked invalid pageUrl in layout: "${params.pageUrl}"`);
    }
    notFound();
  }

  // Get tool data with error handling
  const { descriptionData, componentConfig } = await getToolData(
    params.pageUrl
  );

  const toolDescriptionData = descriptionData as DescriptionBlock[];
  const toolConfigData = componentConfig as ApplicationConfig;

  // Optimize related tools filtering and mapping
  const appListConfig = appConfigJson as AppListConfig;
  const relatedToolsConfigs: AppNavigationConfig[] = toolConfigData.relatedTools
    .filter((toolId: ApplicationIds) => toolId in appListConfig)
    .map((toolId: ApplicationIds) => appListConfig[toolId])
    .filter(Boolean); // Remove any undefined entries

  // Memoize the hostname URL
  const toolUrl = `${process.env.HOSTNAME}/tools/${params.pageUrl}`;

  // Get structured data from tool config
  const structuredData = toolConfigData.structuredData;

  return (
    <>
      {/* Structured Data */}
      {structuredData?.webApplication && (
        <StructuredData data={structuredData.webApplication} />
      )}
      {structuredData?.breadcrumb && (
        <StructuredData data={structuredData.breadcrumb} />
      )}
      {structuredData?.organization && (
        <StructuredData data={structuredData.organization} />
      )}
      {structuredData?.website && (
        <StructuredData data={structuredData.website} />
      )}

      <div className="w-full px-2 py-4">
        {/* Desktop Layout with 60% restriction */}
        <div className="hidden md:flex w-full max-w-none">
          {/* Left sidebar - 20% */}
          <div className="w-[20%] pr-2">
            <SidePanel
              className="w-full"
              appConfigJson={appListConfig}
              pageUrl={params.pageUrl}
            />
          </div>

          {/* Main content area - 60% */}
          <div className="w-[60%] px-2">
            <div className="flex flex-col gap-5 w-full max-w-full">
              <AppHeading heading={toolConfigData.mainHeading!} />
              <SocialShareButtons
                pageUrl={toolUrl}
                heading={toolConfigData.pageTitle}
              />
              <div className="flex flex-col gap-2 w-full max-w-full">
                {children}
              </div>
              {relatedToolsConfigs.length > 0 && (
                <RelatedTools relatedToolsConfigs={relatedToolsConfigs} />
              )}
              <ToolDescription descriptionData={toolDescriptionData} />
            </div>
          </div>

          {/* Right sidebar - 20% */}
          <div className="w-[20%] pl-2">
            <BaseToolsAds className="w-full" />
          </div>
        </div>

        {/* Mobile Layout - Full width */}
        <div className="flex md:hidden flex-col gap-5 w-full">
          <AppHeading heading={toolConfigData.mainHeading!} />
          <SocialShareButtons
            pageUrl={toolUrl}
            heading={toolConfigData.pageTitle}
          />
          <div className="flex flex-col gap-2 w-full">{children}</div>
          {relatedToolsConfigs.length > 0 && (
            <RelatedTools relatedToolsConfigs={relatedToolsConfigs} />
          )}
          <ToolDescription descriptionData={toolDescriptionData} />
          <BaseToolsAds className="w-full" />
        </div>
      </div>
    </>
  );
}
