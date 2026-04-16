import {
  ApplicationConfig,
  ApplicationIds,
  AppNavigationConfig,
} from "@/types/config";
import { categoryConfigs } from "@/data/categories";
import { DescriptionBlock } from "@/types/description";
import {
  AppHeading,
  RelatedTools,
  ToolDescription,
} from "@/components/commonComponents";
import { apps } from "@/data/apps";
import { Metadata } from "next";
import Link from "next/link";
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
    const titleText =
      metadata.title || componentConfig.pageTitle || "WebToolsEasy Tool";
    return {
      ...metadata,
      title: { absolute: String(titleText) },
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

  const currentAppConfig = Object.values(apps).find(
    (appConfig) => appConfig.navigateUrl === `tools/${params.pageUrl}`,
  );
  const currentCategoryConfig = Object.values(categoryConfigs).find(
    (categoryConfig) =>
      currentAppConfig
        ? categoryConfig.toolIds.includes(
            currentAppConfig.applicationId as ApplicationIds,
          )
        : false,
  );

  // Memoize the hostname URL
  const toolUrl = `${process.env.HOSTNAME}/tools/${params.pageUrl}`;

  // Get structured data from tool config
  const structuredData = toolConfigData.structuredData;

  // Only pass tools from the current category to the SidePanel to prevent SEO topical dilution
  const categoryApps = currentCategoryConfig
    ? Object.fromEntries(
        Object.entries(apps).filter(([_, app]) =>
          currentCategoryConfig.toolIds.includes(
            app.applicationId as ApplicationIds,
          ),
        ),
      )
    : apps;

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
              appConfigJson={categoryApps}
              pageUrl={params.pageUrl}
            />
          </aside>

          <section className="flex w-full min-w-0 flex-col gap-5">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 rounded-[18px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-default)]/70 px-4 py-3"
            >
              <Link href="/" className="no-underline">
                <AppText className="!text-sm !font-medium !text-[var(--mui-palette-primary-main)]">
                  Home
                </AppText>
              </Link>
              <AppText className="!text-sm !text-[var(--mui-palette-text-secondary)]">
                /
              </AppText>
              {currentCategoryConfig && (
                <>
                  <Link
                    href={`/tools/category/${currentCategoryConfig.slug}`}
                    className="no-underline"
                  >
                    <AppText className="!text-sm !font-medium !text-[var(--mui-palette-primary-main)]">
                      {currentCategoryConfig.name}
                    </AppText>
                  </Link>
                  <AppText className="!text-sm !text-[var(--mui-palette-text-secondary)]">
                    /
                  </AppText>
                </>
              )}
              <AppText className="!text-sm !font-semibold">
                {currentAppConfig?.displayText ?? toolConfigData.pageTitle}
              </AppText>
            </nav>

            <AppHeading heading={toolConfigData.mainHeading!} />

            <div className="flex min-w-0 flex-col gap-4 rounded-[24px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] p-4 shadow-sm md:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <AppChip
                      label="100% browser-based"
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                    <AppChip
                      label="No signup required"
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <SocialShareButtons
                    pageUrl={toolUrl}
                    heading={toolConfigData.pageTitle}
                  />
                </div>
              </div>

              <div className="flex w-full max-w-full flex-col gap-2">
                {children}
              </div>
            </div>

            {relatedToolsConfigs.length > 0 && (
              <RelatedTools relatedToolsConfigs={relatedToolsConfigs} />
            )}
            <ToolDescription descriptionData={toolDescriptionData} />

            <div className="xl:hidden">
              <SidePanel
                className="w-full"
                appConfigJson={apps}
                pageUrl={params.pageUrl}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
