import {
  ApplicationConfig,
  ApplicationIds,
  AppNavigationConfig,
} from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import {
  AppHeading,
  RelatedTools,
  ToolDescription,
} from "@/components/commonComponents";
import { apps } from "@/data/apps";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import SidePanel from "@/components/sidePanel";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structuredData";
import { AppChip, AppText } from "@/components/lib/ui";

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
  props: Readonly<LayoutProps>,
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
    const { metadata, componentConfig } = await getToolData(params.pageUrl);
    return {
      ...metadata,
      title: metadata.title || componentConfig.pageTitle || "WebToolsEasy Tool",
      description:
        metadata.description ||
        componentConfig.mainHeading ||
        "The requested tool could not be found.",
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `Failed to generate metadata for: ${params.pageUrl}`,
        error,
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
    params.pageUrl,
  );

  const toolDescriptionData = descriptionData as DescriptionBlock[];
  const toolConfigData = componentConfig as ApplicationConfig;

  // Optimize related tools filtering and mapping
  const relatedToolsConfigs: AppNavigationConfig[] = toolConfigData.relatedTools
    .filter((toolId: ApplicationIds) => toolId in apps)
    .map((toolId: ApplicationIds) => apps[toolId])
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
      {structuredData?.faqPage && (
        <StructuredData data={structuredData.faqPage} />
      )}
      {structuredData?.howTo && <StructuredData data={structuredData.howTo} />}

      <div className="w-full py-2 md:py-4">
        <div className="grid w-full gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden xl:block xl:sticky xl:top-[92px] xl:self-start">
            <SidePanel
              className="w-full"
              appConfigJson={apps}
              pageUrl={params.pageUrl}
            />
          </aside>

          <section className="flex min-w-0 flex-col gap-5">
            <AppHeading heading={toolConfigData.mainHeading!} />

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0">
                <div className="flex flex-col gap-3 rounded-[24px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] p-4 shadow-sm md:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <AppChip
                      label="100% browser-based"
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                    <AppChip
                      label="No ads on tool pages"
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <AppChip
                      label="SEO-friendly content"
                      color="secondary"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <AppText className="!text-sm !text-[var(--mui-palette-text-secondary)]">
                    Use the tool immediately below with a wider workspace, more
                    consistent fullscreen behavior, and preserved page content.
                  </AppText>
                  <div className="flex flex-col gap-2 w-full max-w-full">
                    {children}
                  </div>
                </div>
              </div>

              <aside className="flex flex-col gap-4">
                <div className="rounded-[24px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] p-4 shadow-sm md:p-5">
                  <AppText component="h2" variant="h4" className="!mb-2">
                    Share or bookmark this tool
                  </AppText>
                  <AppText className="!mb-4 !text-sm !text-[var(--mui-palette-text-secondary)]">
                    Keep the current URL unchanged and share it directly with
                    teammates or users.
                  </AppText>
                  <SocialShareButtons
                    pageUrl={toolUrl}
                    heading={toolConfigData.pageTitle}
                  />
                </div>

                <div className="xl:hidden">
                  <SidePanel
                    className="w-full"
                    appConfigJson={apps}
                    pageUrl={params.pageUrl}
                  />
                </div>
              </aside>
            </div>

            {relatedToolsConfigs.length > 0 && (
              <RelatedTools relatedToolsConfigs={relatedToolsConfigs} />
            )}
            <ToolDescription descriptionData={toolDescriptionData} />
          </section>
        </div>
      </div>
    </>
  );
}
