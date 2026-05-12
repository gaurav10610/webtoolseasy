export async function loadToolConfig(toolName: string) {
  try {
    const config = await import(`@/data/tools/${toolName}`);
    return {
      metadata: config.metadata,
      componentConfig: config.componentConfig,
      descriptionData: config.descriptionData,
    };
  } catch (error) {
    throw new Error(`Failed to load tool config for ${toolName}: ${error}`);
  }
}

export async function loadBlogConfig(blogSlug: string) {
  try {
    const config = await import(`@/data/blog/config/${blogSlug}`);
    return {
      metadata: config.metadata,
      componentConfig: config.componentConfig,
      descriptionData: config.descriptionData,
    };
  } catch (error) {
    throw new Error(`Failed to load blog config for ${blogSlug}: ${error}`);
  }
}

interface ToolConfigModule {
  metadata?: unknown;
  componentConfig?: unknown;
  descriptionData?: unknown;
}

export function validateMetadataExports(config: ToolConfigModule): boolean {
  return (
    config.metadata !== undefined &&
    typeof config.metadata === "object" &&
    config.componentConfig !== undefined &&
    config.descriptionData !== undefined &&
    Array.isArray(config.descriptionData)
  );
}

export function validateToolConfig(
  config: ToolConfigModule,
  toolName: string,
): string[] {
  const errors: string[] = [];

  if (!config.metadata) {
    errors.push(`${toolName}: missing metadata export`);
  }

  if (!config.componentConfig) {
    errors.push(`${toolName}: missing componentConfig export`);
  }

  if (!Array.isArray(config.descriptionData)) {
    errors.push(`${toolName}: descriptionData should be an array`);
  }

  return errors;
}
