import {
  ApplicationConfig,
  ApplicationIds,
  AppNavigationConfig,
} from "@/types/config";
import { categoryConfigs } from "@/data/categories";
import { DescriptionBlock } from "@/types/description";
import {
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
        Object.entries(apps).filter(([, app]) =>
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

          <section className="flex w-full min-w-0 flex-col gap-4">
            {/* Frame 0 Compact Header: Breadcrumb + H1 + Privacy Badge */}
            <div className="flex flex-col gap-2 rounded-2xl border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] px-4 py-3 shadow-sm md:px-5 md:py-3.5">
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--mui-palette-text-secondary)]"
              >
                <Link href="/" className="transition-colors hover:text-[var(--mui-palette-primary-main)]">
                  Home
                </Link>
                <span>/</span>
                {currentCategoryConfig && (
                  <>
                    <Link
                      href={`/tools/category/${currentCategoryConfig.slug}`}
                      className="transition-colors hover:text-[var(--mui-palette-primary-main)]"
                    >
                      {currentCategoryConfig.name}
                    </Link>
                    <span>/</span>
                  </>
                )}
                <span className="font-medium text-[var(--mui-palette-text-primary)]">
                  {currentAppConfig?.displayText ?? toolConfigData.pageTitle}
                </span>
              </nav>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-lg font-bold tracking-tight text-[var(--mui-palette-text-primary)] sm:text-xl md:text-2xl">
                  {toolConfigData.mainHeading ?? currentAppConfig?.displayText ?? toolConfigData.pageTitle}
                </h1>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    100% Client-Side Private
                  </span>
                  <span className="hidden rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:text-sky-400 sm:inline-flex">
                    Zero Uploads
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Tool Canvas */}
            <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] p-4 shadow-sm md:p-5">
              <div className="flex w-full max-w-full flex-col gap-2">
                {children}
              </div>

              {/* Tool Canvas Footer Strip: Privacy Guarantee & Social Share */}
              <div className="mt-2 flex flex-col gap-3 border-t border-[var(--mui-palette-divider)] pt-3 text-xs text-[var(--mui-palette-text-secondary)] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-emerald-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>100% in-browser processing. Your data never leaves your device.</span>
                </div>
                <div className="shrink-0">
                  <SocialShareButtons
                    pageUrl={toolUrl}
                    heading={toolConfigData.pageTitle}
                  />
                </div>
              </div>
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
