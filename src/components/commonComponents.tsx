import { DescriptionBlock } from "@/types/description";
import { isEmpty, isNil, map } from "lodash-es";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { AppNavigationConfig } from "@/types/config";
import { RelatedToolCard } from "./appCards";
import { AppChip, AppText } from "./lib/ui";

export function AppHeading({
  heading,
}: Readonly<{
  heading: string;
}>) {
  return (
    <section className="app-shell-section flex flex-col items-center gap-3 text-center">
      <AppText component="h1" variant="h1" className="!mb-0">
        {heading}
      </AppText>
      <AppText className="max-w-3xl !text-[var(--mui-palette-text-secondary)]">
        Privacy-first browser tools with a cleaner workflow, stronger visual
        consistency, and zero unnecessary redirects.
      </AppText>
    </section>
  );
}

export function RelatedTools({
  relatedToolsConfigs,
}: Readonly<{
  relatedToolsConfigs: AppNavigationConfig[];
}>) {
  return (
    <section className="app-shell-section flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between gap-3">
        <AppText component="h2" variant="h2">
          Related tools
        </AppText>
        <AppChip
          label={`${relatedToolsConfigs.length} suggestions`}
          size="small"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 w-full">
        {map(relatedToolsConfigs, (relatedToolConfig) => (
          <div key={relatedToolConfig.applicationId} className="w-full">
            <RelatedToolCard config={relatedToolConfig} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ToolDescription({
  descriptionData,
}: Readonly<{ descriptionData: DescriptionBlock[] }>) {
  return (
    <div className="flex flex-col w-full gap-4">
      {map(descriptionData, (descriptionBlock, index) => (
        <ToolDescriptionBlock
          key={`desc-${index}`}
          descriptionBlock={descriptionBlock}
        />
      ))}
    </div>
  );
}

function ToolDescriptionBlock({
  descriptionBlock,
}: Readonly<{
  descriptionBlock: DescriptionBlock;
}>) {
  return (
    <section className="app-shell-section flex flex-col w-full gap-3">
      <AppText
        component="h2"
        variant="h3"
        className="!text-[var(--mui-palette-primary-main)]"
      >
        {descriptionBlock.heading}
      </AppText>
      {!isNil(descriptionBlock.blockData) &&
        isEmpty(descriptionBlock.listData) && (
          <DescriptionDataBlockData blockData={descriptionBlock.blockData} />
        )}
      {!isNil(descriptionBlock.listData) &&
        isEmpty(descriptionBlock.blockData) && (
          <DescriptionDataListData listData={descriptionBlock.listData} />
        )}
      {!isNil(descriptionBlock.links) && (
        <DescriptionLinks links={descriptionBlock.links} />
      )}
    </section>
  );
}

function DescriptionLinks({
  links,
}: Readonly<{
  links: { url: string; displayText: string }[];
}>) {
  return (
    <div className="flex flex-col gap-2">
      {map(links, (link) => (
        <div key={link.url} className="flex flex-row gap-2">
          <KeyboardArrowRightIcon />
          <AppText
            href={link.url}
            component={"a"}
            color="primary"
            target="_blank"
            className="no-underline hover:underline"
          >
            {link.displayText}
          </AppText>
        </div>
      ))}
    </div>
  );
}

function DescriptionDataBlockData({
  blockData,
}: Readonly<{
  blockData: string[];
}>) {
  const parseMarkdownText = (text: string) => {
    // Convert **bold** to actual bold formatting
    const boldRegex = /\*\*(.*?)\*\*/g;
    // Convert `code` to code formatting
    const codeRegex = /`([^`]+)`/g;
    // Convert [link text](url) to actual links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    const parts = [];
    let keyCounter = 0;

    // First, find all patterns and their positions
    const patterns = [];

    // Find bold patterns
    let match;
    while ((match = boldRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "bold",
        content: match[1],
        fullMatch: match[0],
      });
    }

    // Find code patterns
    boldRegex.lastIndex = 0; // Reset regex
    while ((match = codeRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "code",
        content: match[1],
        fullMatch: match[0],
      });
    }

    // Find link patterns
    codeRegex.lastIndex = 0; // Reset regex
    while ((match = linkRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "link",
        content: match[1],
        url: match[2],
        fullMatch: match[0],
      });
    }

    // Sort patterns by start position
    patterns.sort((a, b) => a.start - b.start);

    // Process patterns in order
    let lastIndex = 0;
    patterns.forEach((pattern) => {
      // Add text before this pattern
      if (pattern.start > lastIndex) {
        const textBefore = text.slice(lastIndex, pattern.start);
        if (textBefore) parts.push(textBefore);
      }

      // Add the formatted pattern
      if (pattern.type === "bold") {
        parts.push(
          <strong key={`bold-${keyCounter++}`} style={{ fontWeight: 600 }}>
            {pattern.content}
          </strong>,
        );
      } else if (pattern.type === "code") {
        parts.push(
          <code
            key={`code-${keyCounter++}`}
            style={{
              backgroundColor: "#f5f5f5",
              padding: "2px 4px",
              borderRadius: "3px",
              fontFamily: "monospace",
              fontSize: "0.9em",
            }}
          >
            {pattern.content}
          </code>,
        );
      } else if (pattern.type === "link") {
        parts.push(
          <a
            key={`link-${keyCounter++}`}
            href={pattern.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            {pattern.content}
          </a>,
        );
      }

      lastIndex = pattern.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      if (remainingText) parts.push(remainingText);
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {map(blockData, (data, index) => (
        <AppText key={`block-${index}`} variant="body1" color="textSecondary">
          {parseMarkdownText(data)}
        </AppText>
      ))}
    </div>
  );
}

function DescriptionDataListData({
  listData,
}: Readonly<{
  listData: string[];
}>) {
  const parseMarkdownText = (text: string) => {
    // Convert **bold** to actual bold formatting
    const boldRegex = /\*\*(.*?)\*\*/g;
    // Convert `code` to code formatting
    const codeRegex = /`([^`]+)`/g;
    // Convert [link text](url) to actual links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    const parts = [];
    let keyCounter = 0;

    // First, find all patterns and their positions
    const patterns = [];

    // Find bold patterns
    let match;
    while ((match = boldRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "bold",
        content: match[1],
        fullMatch: match[0],
      });
    }

    // Find code patterns
    boldRegex.lastIndex = 0; // Reset regex
    while ((match = codeRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "code",
        content: match[1],
        fullMatch: match[0],
      });
    }

    // Find link patterns
    codeRegex.lastIndex = 0; // Reset regex
    while ((match = linkRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "link",
        content: match[1],
        url: match[2],
        fullMatch: match[0],
      });
    }

    // Sort patterns by start position
    patterns.sort((a, b) => a.start - b.start);

    // Process patterns in order
    let lastIndex = 0;
    patterns.forEach((pattern) => {
      // Add text before this pattern
      if (pattern.start > lastIndex) {
        const textBefore = text.slice(lastIndex, pattern.start);
        if (textBefore) parts.push(textBefore);
      }

      // Add the formatted pattern
      if (pattern.type === "bold") {
        parts.push(
          <strong key={`bold-${keyCounter++}`} style={{ fontWeight: 600 }}>
            {pattern.content}
          </strong>,
        );
      } else if (pattern.type === "code") {
        parts.push(
          <code
            key={`code-${keyCounter++}`}
            style={{
              backgroundColor: "#f5f5f5",
              padding: "2px 4px",
              borderRadius: "3px",
              fontFamily: "monospace",
              fontSize: "0.9em",
            }}
          >
            {pattern.content}
          </code>,
        );
      } else if (pattern.type === "link") {
        parts.push(
          <a
            key={`link-${keyCounter++}`}
            href={pattern.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            {pattern.content}
          </a>,
        );
      }

      lastIndex = pattern.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      if (remainingText) parts.push(remainingText);
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {map(listData, (data, index) => (
        <div key={`list-${index}`} className="flex flex-row gap-2 w-full">
          <KeyboardArrowRightIcon />
          <AppText variant="body1" color="textSecondary">
            {parseMarkdownText(data)}
          </AppText>
        </div>
      ))}
    </div>
  );
}
