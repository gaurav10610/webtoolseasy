import { describe, it, expect } from "vitest";
import { readdirSync } from "fs";
import { join } from "path";
import { Metadata } from "next";
import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";

/**
 * Test suite to validate all web tool data config files have consistent structure
 * and contain all required exports and data.
 *
 * This test ensures:
 * 1. All tool config files export 'metadata' (Metadata type)
 * 2. All tool config files export 'componentConfig' (ApplicationConfig type)
 * 3. All tool config files export 'descriptionData' (DescriptionBlock[])
 * 4. metadata has all required Next.js fields
 * 5. componentConfig has all required application fields
 * 6. descriptionData is a non-empty array
 */

describe("Web Tools Data Config Structure Validation", () => {
  // Get all tool config files from the data/tools directory
  const toolsDir = join(process.cwd(), "src", "data", "tools");
  const toolFiles = readdirSync(toolsDir).filter((file) =>
    file.endsWith(".ts")
  );

  describe("All tool config files must have required exports", () => {
    toolFiles.forEach((toolFile) => {
      const toolName = toolFile.replace(".ts", "");

      it(`${toolName} should export metadata, componentConfig, and descriptionData`, async () => {
        const toolModule = await import(`@/data/tools/${toolName}.ts`);

        // Check that all three required exports exist
        expect(
          toolModule.metadata,
          `${toolName} is missing 'metadata' export`
        ).toBeDefined();
        expect(
          toolModule.componentConfig,
          `${toolName} is missing 'componentConfig' export`
        ).toBeDefined();
        expect(
          toolModule.descriptionData,
          `${toolName} is missing 'descriptionData' export`
        ).toBeDefined();
      });
    });
  });

  describe("metadata export validation", () => {
    toolFiles.forEach((toolFile) => {
      const toolName = toolFile.replace(".ts", "");

      it(`${toolName} metadata should have all required Next.js Metadata fields`, async () => {
        const toolModule = await import(`@/data/tools/${toolName}.ts`);
        const metadata = toolModule.metadata as Metadata;

        // Validate required metadata fields
        expect(
          metadata.title,
          `${toolName} metadata missing 'title'`
        ).toBeDefined();
        expect(
          typeof metadata.title === "string" ||
            (metadata.title && typeof metadata.title === "object"),
          `${toolName} metadata.title should be string or object`
        ).toBe(true);

        expect(
          metadata.description,
          `${toolName} metadata missing 'description'`
        ).toBeDefined();
        expect(
          typeof metadata.description,
          `${toolName} metadata.description should be string`
        ).toBe("string");

        expect(
          metadata.keywords,
          `${toolName} metadata missing 'keywords'`
        ).toBeDefined();

        expect(
          metadata.alternates,
          `${toolName} metadata missing 'alternates'`
        ).toBeDefined();
        expect(
          metadata.alternates?.canonical,
          `${toolName} metadata.alternates missing 'canonical'`
        ).toBeDefined();

        expect(
          metadata.openGraph,
          `${toolName} metadata missing 'openGraph'`
        ).toBeDefined();
        expect(
          metadata.openGraph?.title,
          `${toolName} metadata.openGraph missing 'title'`
        ).toBeDefined();
        expect(
          metadata.openGraph?.description,
          `${toolName} metadata.openGraph missing 'description'`
        ).toBeDefined();
        expect(
          metadata.openGraph?.url,
          `${toolName} metadata.openGraph missing 'url'`
        ).toBeDefined();
        expect(
          metadata.openGraph?.images,
          `${toolName} metadata.openGraph missing 'images'`
        ).toBeDefined();

        expect(
          metadata.twitter,
          `${toolName} metadata missing 'twitter'`
        ).toBeDefined();
        expect(
          metadata.twitter?.title,
          `${toolName} metadata.twitter missing 'title'`
        ).toBeDefined();
        expect(
          metadata.twitter?.description,
          `${toolName} metadata.twitter missing 'description'`
        ).toBeDefined();

        expect(
          metadata.icons,
          `${toolName} metadata missing 'icons'`
        ).toBeDefined();
        expect(
          metadata.robots,
          `${toolName} metadata missing 'robots'`
        ).toBeDefined();
        expect(
          metadata.authors,
          `${toolName} metadata missing 'authors'`
        ).toBeDefined();
      });
    });
  });

  describe("componentConfig export validation", () => {
    toolFiles.forEach((toolFile) => {
      const toolName = toolFile.replace(".ts", "");

      it(`${toolName} componentConfig should have all required ApplicationConfig fields`, async () => {
        const toolModule = await import(`@/data/tools/${toolName}.ts`);
        const componentConfig = toolModule.componentConfig as ApplicationConfig;

        // Validate required componentConfig fields
        expect(
          componentConfig.mainHeading,
          `${toolName} componentConfig missing 'mainHeading'`
        ).toBeDefined();
        expect(
          typeof componentConfig.mainHeading,
          `${toolName} componentConfig.mainHeading should be string`
        ).toBe("string");
        if (componentConfig.mainHeading) {
          expect(
            componentConfig.mainHeading.length,
            `${toolName} componentConfig.mainHeading should not be empty`
          ).toBeGreaterThan(0);
        }

        expect(
          componentConfig.navigationUrl,
          `${toolName} componentConfig missing 'navigationUrl'`
        ).toBeDefined();
        expect(
          typeof componentConfig.navigationUrl,
          `${toolName} componentConfig.navigationUrl should be string`
        ).toBe("string");
        expect(
          componentConfig.navigationUrl.startsWith("/tools/"),
          `${toolName} componentConfig.navigationUrl should start with '/tools/'`
        ).toBe(true);

        expect(
          componentConfig.pageTitle,
          `${toolName} componentConfig missing 'pageTitle'`
        ).toBeDefined();
        expect(
          typeof componentConfig.pageTitle,
          `${toolName} componentConfig.pageTitle should be string`
        ).toBe("string");
        expect(
          componentConfig.pageTitle.length,
          `${toolName} componentConfig.pageTitle should not be empty`
        ).toBeGreaterThan(0);

        expect(
          componentConfig.tags,
          `${toolName} componentConfig missing 'tags'`
        ).toBeDefined();
        expect(
          Array.isArray(componentConfig.tags),
          `${toolName} componentConfig.tags should be an array`
        ).toBe(true);
        expect(
          componentConfig.tags.length,
          `${toolName} componentConfig.tags should not be empty`
        ).toBeGreaterThan(0);

        expect(
          componentConfig.relatedTools,
          `${toolName} componentConfig missing 'relatedTools'`
        ).toBeDefined();
        expect(
          Array.isArray(componentConfig.relatedTools),
          `${toolName} componentConfig.relatedTools should be an array`
        ).toBe(true);

        expect(
          componentConfig.structuredData,
          `${toolName} componentConfig missing 'structuredData'`
        ).toBeDefined();
        expect(
          typeof componentConfig.structuredData,
          `${toolName} componentConfig.structuredData should be object`
        ).toBe("object");
      });
    });
  });

  describe("descriptionData export validation", () => {
    toolFiles.forEach((toolFile) => {
      const toolName = toolFile.replace(".ts", "");

      it(`${toolName} descriptionData should be a non-empty array of DescriptionBlock`, async () => {
        const toolModule = await import(`@/data/tools/${toolName}.ts`);
        const descriptionData =
          toolModule.descriptionData as DescriptionBlock[];

        // Validate descriptionData structure
        expect(
          Array.isArray(descriptionData),
          `${toolName} descriptionData should be an array`
        ).toBe(true);
        expect(
          descriptionData.length,
          `${toolName} descriptionData should not be empty`
        ).toBeGreaterThan(0);

        // Validate each description block
        descriptionData.forEach((block, index) => {
          // heading is optional, but if present should be a string
          if (block.heading !== undefined) {
            expect(
              typeof block.heading,
              `${toolName} descriptionData[${index}].heading should be string when present`
            ).toBe("string");
          }

          // Each block should have either blockData, listData, or links
          const hasBlockData =
            block.blockData &&
            Array.isArray(block.blockData) &&
            block.blockData.length > 0;
          const hasListData =
            block.listData &&
            Array.isArray(block.listData) &&
            block.listData.length > 0;
          const hasLinks =
            block.links && Array.isArray(block.links) && block.links.length > 0;

          expect(
            hasBlockData || hasListData || hasLinks,
            `${toolName} descriptionData[${index}] should have either 'blockData', 'listData', or 'links'`
          ).toBe(true);

          if (hasBlockData) {
            block.blockData!.forEach((data, dataIndex) => {
              expect(
                typeof data,
                `${toolName} descriptionData[${index}].blockData[${dataIndex}] should be string`
              ).toBe("string");
              expect(
                data.length,
                `${toolName} descriptionData[${index}].blockData[${dataIndex}] should not be empty`
              ).toBeGreaterThan(0);
            });
          }

          if (hasListData) {
            block.listData!.forEach((data, dataIndex) => {
              expect(
                typeof data,
                `${toolName} descriptionData[${index}].listData[${dataIndex}] should be string`
              ).toBe("string");
              expect(
                data.length,
                `${toolName} descriptionData[${index}].listData[${dataIndex}] should not be empty`
              ).toBeGreaterThan(0);
            });
          }
        });
      });
    });
  });

  describe("Cross-field consistency validation", () => {
    toolFiles.forEach((toolFile) => {
      const toolName = toolFile.replace(".ts", "");

      it(`${toolName} should have consistent data across metadata and componentConfig`, async () => {
        const toolModule = await import(`@/data/tools/${toolName}.ts`);
        const metadata = toolModule.metadata as Metadata;
        const componentConfig = toolModule.componentConfig as ApplicationConfig;

        // Get the title from metadata (could be string or object)
        const metadataTitle =
          typeof metadata.title === "string"
            ? metadata.title
            : String(
                (metadata.title as Record<string, unknown>)?.absolute ||
                  (metadata.title as Record<string, unknown>)?.template ||
                  ""
              );

        // componentConfig.pageTitle should match or be contained in metadata.title
        expect(
          metadataTitle.includes(componentConfig.pageTitle) ||
            componentConfig.pageTitle.includes(metadataTitle),
          `${toolName}: componentConfig.pageTitle should be consistent with metadata.title`
        ).toBe(true);

        // componentConfig.navigationUrl should be part of metadata canonical URL
        const canonical = metadata.alternates?.canonical;
        const canonicalStr =
          typeof canonical === "string"
            ? canonical
            : canonical instanceof URL
            ? canonical.toString()
            : typeof canonical === "object" && canonical
            ? String((canonical as Record<string, unknown>).url || "")
            : "";

        expect(
          canonicalStr.includes(componentConfig.navigationUrl),
          `${toolName}: componentConfig.navigationUrl should match canonical URL`
        ).toBe(true);
      });
    });
  });

  describe("Summary of tool config validation", () => {
    it("should display total number of validated tool config files", () => {
      console.log(
        `\n✓ Successfully validated ${toolFiles.length} tool config files\n`
      );
      expect(toolFiles.length).toBeGreaterThan(0);
    });
  });
});
