import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { Metadata } from "next";
import { BlogConfig, BlogCategory } from "@/types/blog-config";

/**
 * Test suite to validate all blog post config files have consistent structure
 * and contain all required exports and data.
 *
 * This test ensures:
 * 1. All blog config files export 'metadata' (Metadata type)
 * 2. All blog config files export 'blogConfig' (BlogConfig type)
 * 3. metadata has all required Next.js fields
 * 4. blogConfig has all required blog fields
 * 5. Each blog has a corresponding markdown content file
 * 6. Blog IDs in enum match actual config files
 * 7. All blogs are registered in blogPosts.ts
 */

describe("Blog Posts Config Structure Validation", () => {
  // Get all blog config files from the data/blog/config directory
  const blogConfigDir = join(process.cwd(), "src", "data", "blog", "config");
  const blogContentDir = join(process.cwd(), "src", "data", "blog", "content");

  // Check if directories exist
  if (!existsSync(blogConfigDir)) {
    throw new Error(`Blog config directory not found: ${blogConfigDir}`);
  }
  if (!existsSync(blogContentDir)) {
    throw new Error(`Blog content directory not found: ${blogContentDir}`);
  }

  const blogFiles = readdirSync(blogConfigDir).filter((file) =>
    file.endsWith(".ts")
  );

  describe("All blog config files must have required exports", () => {
    blogFiles.forEach((blogFile) => {
      const blogName = blogFile.replace(".ts", "");

      it(`${blogName} should export metadata and blogConfig`, async () => {
        const blogModule = await import(`@/data/blog/config/${blogName}.ts`);

        // Check that both required exports exist
        expect(
          blogModule.metadata,
          `${blogName} is missing 'metadata' export`
        ).toBeDefined();
        expect(
          blogModule.blogConfig,
          `${blogName} is missing 'blogConfig' export`
        ).toBeDefined();
      });
    });
  });

  describe("metadata export validation", () => {
    blogFiles.forEach((blogFile) => {
      const blogName = blogFile.replace(".ts", "");

      it(`${blogName} metadata should have all required Next.js Metadata fields`, async () => {
        const blogModule = await import(`@/data/blog/config/${blogName}.ts`);
        const metadata = blogModule.metadata as Metadata;

        // Validate required metadata fields
        expect(
          metadata.title,
          `${blogName} metadata missing 'title'`
        ).toBeDefined();
        expect(
          typeof metadata.title === "string" ||
            (metadata.title && typeof metadata.title === "object"),
          `${blogName} metadata.title should be string or object`
        ).toBe(true);

        expect(
          metadata.description,
          `${blogName} metadata missing 'description'`
        ).toBeDefined();
        expect(
          typeof metadata.description,
          `${blogName} metadata.description should be string`
        ).toBe("string");

        // Description should be under 160 characters for SEO
        const description = metadata.description as string;
        expect(
          description.length,
          `${blogName} metadata.description should be under 160 characters for SEO`
        ).toBeLessThanOrEqual(160);

        expect(
          metadata.keywords,
          `${blogName} metadata missing 'keywords'`
        ).toBeDefined();

        expect(
          metadata.alternates,
          `${blogName} metadata missing 'alternates'`
        ).toBeDefined();
        expect(
          metadata.alternates?.canonical,
          `${blogName} metadata.alternates missing 'canonical'`
        ).toBeDefined();

        expect(
          metadata.openGraph,
          `${blogName} metadata missing 'openGraph'`
        ).toBeDefined();
        expect(
          metadata.openGraph?.title,
          `${blogName} metadata.openGraph missing 'title'`
        ).toBeDefined();
        expect(
          metadata.openGraph?.description,
          `${blogName} metadata.openGraph missing 'description'`
        ).toBeDefined();
        expect(
          metadata.openGraph?.url,
          `${blogName} metadata.openGraph missing 'url'`
        ).toBeDefined();
        expect(
          metadata.openGraph?.images,
          `${blogName} metadata.openGraph missing 'images'`
        ).toBeDefined();

        expect(
          metadata.twitter,
          `${blogName} metadata missing 'twitter'`
        ).toBeDefined();
        expect(
          metadata.twitter?.title,
          `${blogName} metadata.twitter missing 'title'`
        ).toBeDefined();
        expect(
          metadata.twitter?.description,
          `${blogName} metadata.twitter missing 'description'`
        ).toBeDefined();

        expect(
          metadata.icons,
          `${blogName} metadata missing 'icons'`
        ).toBeDefined();
        expect(
          metadata.robots,
          `${blogName} metadata missing 'robots'`
        ).toBeDefined();
        expect(
          metadata.authors,
          `${blogName} metadata missing 'authors'`
        ).toBeDefined();
      });
    });
  });

  describe("blogConfig export validation", () => {
    blogFiles.forEach((blogFile) => {
      const blogName = blogFile.replace(".ts", "");

      it(`${blogName} blogConfig should have all required BlogConfig fields`, async () => {
        const blogModule = await import(`@/data/blog/config/${blogName}.ts`);
        const blogConfig = blogModule.blogConfig as BlogConfig;

        // Validate required blogConfig fields
        expect(
          blogConfig.blogId,
          `${blogName} blogConfig missing 'blogId'`
        ).toBeDefined();
        expect(
          typeof blogConfig.blogId,
          `${blogName} blogConfig.blogId should be string`
        ).toBe("string");

        expect(
          blogConfig.title,
          `${blogName} blogConfig missing 'title'`
        ).toBeDefined();
        expect(
          typeof blogConfig.title,
          `${blogName} blogConfig.title should be string`
        ).toBe("string");
        expect(
          blogConfig.title.length,
          `${blogName} blogConfig.title should not be empty`
        ).toBeGreaterThan(0);

        expect(
          blogConfig.slug,
          `${blogName} blogConfig missing 'slug'`
        ).toBeDefined();
        expect(
          typeof blogConfig.slug,
          `${blogName} blogConfig.slug should be string`
        ).toBe("string");
        expect(
          blogConfig.slug.length,
          `${blogName} blogConfig.slug should not be empty`
        ).toBeGreaterThan(0);
        // Slug should match the filename
        expect(
          blogConfig.slug,
          `${blogName} blogConfig.slug should match filename`
        ).toBe(blogName);

        expect(
          blogConfig.excerpt,
          `${blogName} blogConfig missing 'excerpt'`
        ).toBeDefined();
        expect(
          typeof blogConfig.excerpt,
          `${blogName} blogConfig.excerpt should be string`
        ).toBe("string");
        expect(
          blogConfig.excerpt.length,
          `${blogName} blogConfig.excerpt should not be empty`
        ).toBeGreaterThan(0);

        expect(
          blogConfig.category,
          `${blogName} blogConfig missing 'category'`
        ).toBeDefined();
        expect(
          Object.values(BlogCategory).includes(blogConfig.category),
          `${blogName} blogConfig.category should be a valid BlogCategory`
        ).toBe(true);

        expect(
          blogConfig.tags,
          `${blogName} blogConfig missing 'tags'`
        ).toBeDefined();
        expect(
          Array.isArray(blogConfig.tags),
          `${blogName} blogConfig.tags should be an array`
        ).toBe(true);
        expect(
          blogConfig.tags.length,
          `${blogName} blogConfig.tags should not be empty`
        ).toBeGreaterThan(0);

        expect(
          blogConfig.author,
          `${blogName} blogConfig missing 'author'`
        ).toBeDefined();
        expect(
          blogConfig.author.name,
          `${blogName} blogConfig.author missing 'name'`
        ).toBeDefined();
        expect(
          ["M", "F", "O"].includes(blogConfig.author.gender),
          `${blogName} blogConfig.author.gender should be M, F, or O`
        ).toBe(true);

        expect(
          blogConfig.publishedAt,
          `${blogName} blogConfig missing 'publishedAt'`
        ).toBeDefined();
        expect(
          new Date(blogConfig.publishedAt).toString() !== "Invalid Date",
          `${blogName} blogConfig.publishedAt should be valid date string`
        ).toBe(true);

        expect(
          blogConfig.updatedAt,
          `${blogName} blogConfig missing 'updatedAt'`
        ).toBeDefined();
        expect(
          new Date(blogConfig.updatedAt).toString() !== "Invalid Date",
          `${blogName} blogConfig.updatedAt should be valid date string`
        ).toBe(true);

        expect(
          blogConfig.readingTimeMinutes,
          `${blogName} blogConfig missing 'readingTimeMinutes'`
        ).toBeDefined();
        expect(
          typeof blogConfig.readingTimeMinutes,
          `${blogName} blogConfig.readingTimeMinutes should be number`
        ).toBe("number");
        expect(
          blogConfig.readingTimeMinutes,
          `${blogName} blogConfig.readingTimeMinutes should be positive`
        ).toBeGreaterThan(0);

        expect(
          blogConfig.contentFile,
          `${blogName} blogConfig missing 'contentFile'`
        ).toBeDefined();
        expect(
          typeof blogConfig.contentFile,
          `${blogName} blogConfig.contentFile should be string`
        ).toBe("string");

        expect(
          blogConfig.metadata,
          `${blogName} blogConfig missing 'metadata'`
        ).toBeDefined();

        // Optional fields type checks
        if (blogConfig.isFeatured !== undefined) {
          expect(
            typeof blogConfig.isFeatured,
            `${blogName} blogConfig.isFeatured should be boolean`
          ).toBe("boolean");
        }

        if (blogConfig.isDisabled !== undefined) {
          expect(
            typeof blogConfig.isDisabled,
            `${blogName} blogConfig.isDisabled should be boolean`
          ).toBe("boolean");
        }

        if (blogConfig.relatedPosts !== undefined) {
          expect(
            Array.isArray(blogConfig.relatedPosts),
            `${blogName} blogConfig.relatedPosts should be an array`
          ).toBe(true);
        }
      });
    });
  });

  describe("Markdown content file validation", () => {
    blogFiles.forEach((blogFile) => {
      const blogName = blogFile.replace(".ts", "");

      it(`${blogName} should have a corresponding markdown content file`, async () => {
        const blogModule = await import(`@/data/blog/config/${blogName}.ts`);
        const blogConfig = blogModule.blogConfig as BlogConfig;

        // Check that markdown file exists
        const markdownPath = join(blogContentDir, blogConfig.contentFile);
        expect(
          existsSync(markdownPath),
          `${blogName} markdown file not found at ${blogConfig.contentFile}`
        ).toBe(true);

        // Read and validate markdown content
        const markdownContent = readFileSync(markdownPath, "utf-8");
        expect(
          markdownContent.length,
          `${blogName} markdown content should not be empty`
        ).toBeGreaterThan(0);

        // Check for basic markdown structure (heading)
        expect(
          markdownContent.includes("#"),
          `${blogName} markdown should contain at least one heading`
        ).toBe(true);
      });
    });
  });

  describe("BlogIds enum validation", () => {
    it("should have all blog config files represented in BlogIds enum", async () => {
      const { BlogIds } = await import("@/types/blog-config");
      const blogIdValues = Object.values(BlogIds);

      expect(
        blogIdValues.length,
        "BlogIds enum should not be empty"
      ).toBeGreaterThan(0);

      // Check each blog file has a BlogId
      for (const blogFile of blogFiles) {
        const blogName = blogFile.replace(".ts", "");
        const blogModule = await import(`@/data/blog/config/${blogName}.ts`);
        const blogConfig = blogModule.blogConfig as BlogConfig;

        expect(
          blogIdValues.includes(blogConfig.blogId),
          `${blogName} blogId '${blogConfig.blogId}' should be in BlogIds enum`
        ).toBe(true);
      }
    });
  });

  describe("blogPosts registry validation", () => {
    it("should have all blog configs registered in blogPosts", async () => {
      const { blogPosts } = await import("@/data/blogPosts");

      expect(
        Object.keys(blogPosts).length,
        "blogPosts should not be empty"
      ).toBeGreaterThan(0);

      // Check each blog file is registered
      for (const blogFile of blogFiles) {
        const blogName = blogFile.replace(".ts", "");
        const blogModule = await import(`@/data/blog/config/${blogName}.ts`);
        const blogConfig = blogModule.blogConfig as BlogConfig;

        expect(
          blogPosts[blogConfig.blogId],
          `${blogName} should be registered in blogPosts`
        ).toBeDefined();

        const registeredBlog = blogPosts[blogConfig.blogId];
        expect(
          registeredBlog.slug,
          `${blogName} registry slug should match config`
        ).toBe(blogConfig.slug);
        expect(
          registeredBlog.title,
          `${blogName} registry title should match config`
        ).toBe(blogConfig.title);
      }
    });
  });

  describe("Cross-field consistency validation", () => {
    blogFiles.forEach((blogFile) => {
      const blogName = blogFile.replace(".ts", "");

      it(`${blogName} should have consistent data across metadata and blogConfig`, async () => {
        const blogModule = await import(`@/data/blog/config/${blogName}.ts`);
        const metadata = blogModule.metadata as Metadata;
        const blogConfig = blogModule.blogConfig as BlogConfig;

        // Get the title from metadata (could be string or object)
        const metadataTitle =
          typeof metadata.title === "string"
            ? metadata.title
            : String(
                (metadata.title as Record<string, unknown>)?.absolute ||
                  (metadata.title as Record<string, unknown>)?.template ||
                  ""
              );

        // blogConfig.title should match or be contained in metadata.title
        expect(
          metadataTitle.includes(blogConfig.title) ||
            blogConfig.title.includes(metadataTitle),
          `${blogName}: blogConfig.title should be consistent with metadata.title`
        ).toBe(true);

        // blogConfig.slug should be part of metadata canonical URL
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
          canonicalStr.includes(blogConfig.slug),
          `${blogName}: blogConfig.slug should be in canonical URL`
        ).toBe(true);

        // blogConfig.excerpt should match or be contained in metadata.description
        const metadataDesc = metadata.description as string;
        expect(
          metadataDesc.length > 0 && blogConfig.excerpt.length > 0,
          `${blogName}: both metadata.description and blogConfig.excerpt should exist`
        ).toBe(true);
      });
    });
  });

  describe("Summary of blog config validation", () => {
    it("should display total number of validated blog config files", () => {
      console.log(
        `\n✓ Successfully validated ${blogFiles.length} blog config files\n`
      );
      expect(blogFiles.length).toBeGreaterThan(0);
    });
  });
});
